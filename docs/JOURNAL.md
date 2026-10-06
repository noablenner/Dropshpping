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
