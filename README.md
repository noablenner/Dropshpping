# Boutique housses et hivernage du jardin

Site Astro statique hébergé sur Cloudflare Pages, paiement Stripe Checkout, fournisseur CJ Dropshipping (entrepôts européens). Contexte et règles : `CLAUDE.md`. Plan de travail : `PHASES.md`. Historique : `docs/JOURNAL.md`.

## Commandes

- `npm install` : installe les dépendances (Node 22.12 ou plus récent).
- `npm run dev` : serveur de développement Astro.
- `npm run build` : contrôle des types puis build statique dans `dist/`.
- `npm run preview` : sert `dist/` et les fonctions de `functions/` en local avec wrangler (variables dans `.dev.vars`, voir `.dev.vars.example`).
