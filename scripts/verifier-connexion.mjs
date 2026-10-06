// Vérifie que les identifiants fonctionnent. Lecture seule : ne modifie rien dans la boutique.
// Usage, depuis scripts/ : npm run verifier-connexion

import { graphql } from './lib/shopify-admin.mjs';

const donnees = await graphql(`{
  shop { name myshopifyDomain currencyCode }
  productsCount { count }
}`);

console.log(`Connexion OK : ${donnees.shop.name} (${donnees.shop.myshopifyDomain})`);
console.log(`Devise : ${donnees.shop.currencyCode}`);
console.log(`Produits : ${donnees.productsCount.count}`);
