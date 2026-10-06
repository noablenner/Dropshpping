// @ts-check
import { defineConfig } from 'astro/config';

// Site 100 % statique. Les fonctions serveur (paiement, webhook) vivent dans functions/
// et sont servies par Cloudflare Pages Functions, pas par Astro.
export default defineConfig({
  // URL publique du site, utilisée pour les URL canoniques et le sitemap.
  // À remplacer par le vrai domaine dès qu'il est acheté (CLAUDE.md section 3).
  site: 'https://example.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
