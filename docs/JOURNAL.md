# Journal du projet

## Phase 0 : socle du thème et documentation (2026-10-06)

### Ce qui est fait
- Le repo ne contenait que CLAUDE.md, PHASES.md et README.md : aucun thème.
- Installation du thème officiel gratuit **Horizon 4.2.0** de Shopify, copié depuis le dépôt officiel `github.com/Shopify/horizon` (commit `5acd1b6`, 21 septembre 2026). Les dossiers standard (assets, blocks, config, layout, locales, sections, snippets, templates) sont repris tels quels, sans aucune modification. Horizon fournit nativement les locales `fr.json` et `fr.schema.json`.
- La licence du thème est conservée dans `LICENSE-HORIZON.md`. Elle autorise l'usage du code uniquement pour des thèmes Shopify, ce qui correspond à notre cas.
- Le README d'Horizon n'a pas été copié, pour ne pas écraser le README du projet.
- Création de `docs/` (JOURNAL.md, A_FAIRE_NOA.md, CONTENUS/) et de `scripts/`.
- `.gitignore` : exclut `.env` et ses variantes (sauf `.env.example`), `node_modules/`, `.shopify/`, les fichiers système et d'éditeur, et les logs.
- `scripts/package.json` : module ES, aucune dépendance, Node 20.6 ou plus récent (nécessaire pour `--env-file`).
- `scripts/.env.example` : liste SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN et SHOPIFY_API_VERSION, plus SHOPIFY_CLIENT_ID et SHOPIFY_CLIENT_SECRET (voir les décisions ci-dessous).
- `scripts/lib/shopify-admin.mjs` : client GraphQL minimal avec fetch natif.
- `scripts/verifier-connexion.mjs` : test de connexion en lecture seule. Syntaxe vérifiée avec `node --check`, et le message d'erreur en cas de variable manquante a été vérifié. Il n'a pas été testé contre une vraie boutique, faute de boutique et d'identifiants.

### Décisions prises
- **Horizon plutôt que Dawn** : c'est le thème officiel gratuit le plus récent, conformément à PHASES.md.
- **Authentification des scripts** : depuis le 1er janvier 2026, Shopify ne permet plus de créer d'application personnalisée depuis l'admin. Les nouvelles apps passent par le Dev Dashboard, qui fournit un Client ID et un Client secret. On obtient ensuite un token valable 24 h via le « client credentials grant ». Le client accepte donc deux modes : un SHOPIFY_ADMIN_TOKEN permanent s'il existe, sinon l'échange automatique des identifiants. Cela s'écarte de la lettre de PHASES.md, étape 5 de la phase 0, mais respecte son intention. Point à confirmer à la première connexion réelle : le corps exact de la requête de token (la documentation shopify.dev n'était pas accessible depuis la session).
- **Version d'API par défaut : 2026-07**, à aligner sur la version stable la plus récente au moment des premiers scripts.

### Ce qui reste
- Section 2 de CLAUDE.md entièrement à compléter (voir les points signalés à Noa).
- Fusion de la branche de travail dans `main` avant la connexion GitHub de Shopify.
- `shopify theme check` n'a pas été lancé en phase 0 : le thème est l'original non modifié, et le contrôle est prévu en phase 3.

### Ce que Noa doit faire à la main
Voir `docs/A_FAIRE_NOA.md`, section « Avant la phase 1 ».
