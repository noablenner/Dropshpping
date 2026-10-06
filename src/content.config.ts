import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Catalogue : un fichier JSON par produit dans src/data/produits/ (CLAUDE.md section 8).
// Toute donnée inconnue du fournisseur vaut null : on ne l'invente jamais.
// Les montants sont en centimes d'euro (entiers), comme dans Stripe.
const produits = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/data/produits' }),
  schema: z.object({
    test: z.boolean().default(false),
    sku_cj: z.string(),
    variante: z.string().nullable(),
    ean: z.string().regex(/^\d{8,14}$/).nullable(),
    titre: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    dimensions: z.object({
      longueur_cm: z.number().positive().nullable(),
      largeur_cm: z.number().positive().nullable(),
      hauteur_cm: z.number().positive().nullable(),
      diametre_cm: z.number().positive().nullable(),
    }),
    materiau: z.string().nullable(),
    grammage_gm2: z.number().positive().nullable(),
    impermeabilite: z.enum(['etanche', 'hydrofuge', 'non_communique']),
    fixation: z.string().nullable(),
    cout_produit_centimes: z.number().int().nonnegative().nullable(),
    cout_envoi_centimes: z.number().int().nonnegative().nullable(),
    prix_vente_ttc_centimes: z.number().int().positive(),
    poids_kg: z.number().positive().nullable(),
    images: z.array(z.string()),
    entrepot: z.string().nullable(),
    tags: z.object({
      famille: z.string(),
      forme: z.string().nullable(),
      dimension: z.string().nullable(),
    }),
    disponibilite: z.enum(['en_stock', 'rupture']),
  }),
});

export const collections = { produits };
