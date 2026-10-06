# Journal du projet

## Changement de pile (2026-10-06)

### Décision
Noa abandonne Shopify, l'application vidaXL Dropshipping et l'abonnement dropshipping vidaXL.

### Raison
Le projet doit se lancer sans aucun abonnement mensuel. Les seuls coûts acceptés sont le nom de domaine et les commissions sur les paiements encaissés. L'ancienne pile cumulait trois abonnements : le forfait Shopify, l'app (environ 29 $ par mois) et le compte dropshipping vidaXL (environ 30 € par mois).

### Nouvelle pile (CLAUDE.md section 2)
Site statique Astro, hébergement et fonctions serveur sur Cloudflare Pages (offre gratuite), paiement Stripe Checkout (commission par transaction uniquement), fournisseur CJ Dropshipping avec uniquement des produits en entrepôt européen, statistiques Cloudflare Web Analytics et Search Console, pas de base de données.

### Ce qui a été supprimé
Tout le travail de l'ancienne phase 0 (commit `1556ce9`) qui était propre à l'ancienne pile :
- le thème Shopify Horizon (assets, blocks, config, layout, locales, sections, snippets, templates) et sa licence ;
- le dossier scripts/ (client de l'API Admin Shopify, test de connexion, package.json, .env.example) ;
- docs/A_FAIRE_NOA.md (étapes Shopify et vidaXL, réécrit en phase 0 pour la nouvelle pile) ;
- docs/CONTENUS/ (remplacé par src/content/ dans la nouvelle structure) ;
- l'entrée .shopify/ du .gitignore.

### Ce qui est conservé
- Ce journal.
- Le .gitignore, sans ses lignes propres à Shopify. Il sera complété en phase 0.
- Les points business soulevés à l'ancienne phase 0, toujours valables : régime de TVA à préciser, concurrence de prix sur un même EAN dans Google Shopping, téléphone service client, médiateur, calendrier de saison.

## Phase 0 : socle Astro Cloudflare (2026-10-06)

### Ce qui est fait
- Projet **Astro 7.3.5** (dernière version stable sur npm à cette date) monté à la main, sans gabarit de démarrage, pour ne garder que le nécessaire. TypeScript en mode strict (`astro/tsconfigs/strict`). Aucun framework front.
- Dépendances : `astro` uniquement. Outils de développement : `wrangler` 4.147.0, `@astrojs/check`, `typescript`, `@cloudflare/workers-types`. Aucune dépendance payante, aucun service externe.
- Build 100 % statique (`output: 'static'`, URL avec slash final, format répertoire), sortie dans `dist/`.
- Pages Functions dans `functions/`, avec leur propre configuration TypeScript (types Workers). Une seule fonction pour l'instant, `GET /api/sante`, qui sert à vérifier le déploiement. Le paiement et le webhook arrivent en phase 3.
- Arborescence de CLAUDE.md section 8 : `src/` (pages, layouts, components, lib), `src/data/produits/`, `src/content/`, `functions/api/`, `scripts/`, `docs/`.
- **Schéma du catalogue** dans `src/content.config.ts` : chaque JSON produit est validé au build, et un produit mal formé fait échouer le build.
- Deux produits fictifs : `test-housse-salon-rectangulaire-200x140.json` et `test-housse-table-ronde-120.json`, avec `"test": true`, « PRODUIT TEST » dans le titre, en rupture et en `noindex`. Ils alimentent une page d'accueil provisoire et un gabarit produit minimal.
- `.gitignore` : node_modules, dist, .astro, .env, .dev.vars, .wrangler, fichiers système. `.dev.vars.example` liste STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET et SITE_URL.
- `docs/A_FAIRE_NOA.md` réécrit pour la nouvelle pile.

### Vérifications faites
- `npm run build` réussit. Le script lance `astro check` (0 erreur), puis `tsc` sur `functions/`, puis le build : 3 pages générées.
- `wrangler pages dev dist` en local, sans compte Cloudflare : `/api/sante` renvoie `{"ok":true}` et les pages produit répondent en 200.

### Décisions prises
- **Montants en centimes entiers** (`prix_vente_ttc_centimes`, `cout_produit_centimes`, `cout_envoi_centimes`), comme dans Stripe, pour éviter les erreurs d'arrondi.
- **Données inconnues à `null`**, jamais devinées. L'imperméabilité est une liste fermée : `etanche`, `hydrofuge` ou `non_communique`.
- **Champs ajoutés** par rapport à la liste de CLAUDE.md section 8 : `test` (pour exclure les produits fictifs du paiement en phase 3) et `entrepot` (pour tracer l'entrepôt européen CJ). Le coût est séparé en coût produit et coût d'envoi, comme dans la règle de prix.
- **Pas de wrangler.toml** : sa présence ferait du fichier la source de vérité de la configuration Pages, au détriment du tableau de bord. La configuration se fait dans l'interface Cloudflare, plus simple pour Noa. La date de compatibilité est passée en option au lancement local de wrangler.
- **`site` d'Astro fixé à `https://example.com`** en attendant le domaine. Il est à remplacer dès que le domaine est connu. Tout le site est en `noindex` d'ici là.
- **Sitemap et Web Analytics** : non ajoutés en phase 0, ils sont prévus en phase 3.
- **Catalogue côté fonctions** : en phase 3, la fonction de paiement devra lire les mêmes JSON que le site. La méthode sera choisie à ce moment-là (import JSON direct au bundling ou index généré au build).

### Ce qui reste
- Section 3 de CLAUDE.md à compléter.
- Fusion de la branche de travail dans `main` avant de connecter Cloudflare Pages.
- Test go/no-go du catalogue CJ en entrepôt européen (A_FAIRE_NOA.md, étape 0).

### Ce que Noa doit faire à la main
Voir `docs/A_FAIRE_NOA.md`, section « Avant la phase 1 ».

## Décisions de Noa après la phase 0 (2026-10-06)

### Intégré
- **CLAUDE.md section 3** (commit séparé, avec l'accord de Noa) :
  - société éditrice Agence ABS, SAS, 53 avenue de Colmar, 68200 Mulhouse (capital, SIREN, RCS, n° TVA et régime de TVA restent entre crochets) ;
  - téléphone obligatoire ;
  - médiateur obligatoire, facturé au dossier de préférence ;
  - règle de prix unique ;
  - livraison offerte et intégrée au prix ;
  - retours au siège, frais à la charge du client sauf produit défectueux ou erreur de notre part ;
  - aucun service d'envoi d'emails.
- **PHASES.md phase 3** : plus de frais de port dans Checkout. Le SKU CJ, la variante et la quantité sont portés par la session Stripe. Le webhook se limite à vérifier la signature et à journaliser.
- **docs/A_FAIRE_NOA.md** : étapes ajoutées pour l'objet social de la société (0 bis), le choix du médiateur (8), Cloudflare Email Routing (9) et les emails Stripe (10).

### Points d'interprétation à confirmer par Noa
- **Arrondi « à X,90 € »** : écrit « au X,90 € supérieur ». Arrondir vers le bas pourrait faire passer le prix sous la marge minimale.
- **Frais Stripe estimés** : ils dépendent du prix TTC final, qui dépend lui-même d'eux. Le script de la phase 2 utilisera une estimation majorante en paramètre (pourcentage plus part fixe, appliqués au prix TTC) et vérifiera la marge après arrondi.
- **Logs du webhook** : les logs des Pages Functions sont consultables en temps réel dans Cloudflare mais ne sont pas conservés durablement sur l'offre gratuite. La source de vérité des commandes reste Stripe.

### Non vérifié
- La liste officielle des médiateurs (economie.gouv.fr) et les sites des médiateurs étaient bloqués par le réseau de la session. Aucun médiateur n'est donc cité dans A_FAIRE_NOA.md, et Noa fait la vérification.
