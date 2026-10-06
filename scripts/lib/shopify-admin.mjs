// Client minimal pour l'API Admin GraphQL de Shopify, basé sur le fetch natif de Node.
// Les identifiants viennent uniquement des variables d'environnement (voir scripts/.env.example).

const domaine = process.env.SHOPIFY_STORE_DOMAIN;
const version = process.env.SHOPIFY_API_VERSION;

function exiger(nom, valeur) {
  if (!valeur) {
    throw new Error(`Variable d'environnement manquante : ${nom}. Voir scripts/.env.example.`);
  }
}

let tokenEnCache = null;

// Retourne le token permanent s'il existe, sinon en obtient un via le client credentials grant
// (token valable 24 h, réservé aux apps du Dev Dashboard installées sur une boutique de la même organisation).
async function obtenirToken() {
  if (process.env.SHOPIFY_ADMIN_TOKEN) return process.env.SHOPIFY_ADMIN_TOKEN;
  if (tokenEnCache) return tokenEnCache;

  exiger('SHOPIFY_CLIENT_ID (ou SHOPIFY_ADMIN_TOKEN)', process.env.SHOPIFY_CLIENT_ID);
  exiger('SHOPIFY_CLIENT_SECRET (ou SHOPIFY_ADMIN_TOKEN)', process.env.SHOPIFY_CLIENT_SECRET);

  const reponse = await fetch(`https://${domaine}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
    }),
  });
  if (!reponse.ok) {
    throw new Error(`Échec de l'obtention du token (HTTP ${reponse.status}) : ${await reponse.text()}`);
  }
  const donnees = await reponse.json();
  tokenEnCache = donnees.access_token;
  return tokenEnCache;
}

export async function graphql(requete, variables = {}) {
  exiger('SHOPIFY_STORE_DOMAIN', domaine);
  exiger('SHOPIFY_API_VERSION', version);

  const token = await obtenirToken();
  const reponse = await fetch(`https://${domaine}/admin/api/${version}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query: requete, variables }),
  });
  if (!reponse.ok) {
    throw new Error(`Erreur HTTP ${reponse.status} : ${await reponse.text()}`);
  }
  const resultat = await reponse.json();
  if (resultat.errors) {
    throw new Error(`Erreur GraphQL : ${JSON.stringify(resultat.errors, null, 2)}`);
  }
  return resultat.data;
}
