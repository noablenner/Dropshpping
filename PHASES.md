# PHASES.md : prompts à envoyer à Claude Code, un par un

Mode d'emploi : CLAUDE.md et PHASES.md à la racine du repo. Pour chaque phase, écris simplement "Exécute la PHASE X de PHASES.md". Attends la fin, vérifie, valide, puis passe à la suivante.

## PHASE 0 : socle technique

```
Lis CLAUDE.md et PHASES.md en entier.

Phase 0, socle :
1. Initialise un projet Astro (dernière version stable) avec TypeScript strict, sans framework front lourd. Aucune dépendance payante ni service externe non listé dans CLAUDE.md section 2.
2. Configure le build pour Cloudflare Pages : sortie statique pour toutes les pages, Pages Functions dans functions/ pour l'API. Ajoute wrangler en dépendance de développement pour tester localement.
3. Crée l'arborescence décrite dans CLAUDE.md section 8, avec deux produits fictifs clairement marqués TEST dans src/data/produits/ pour faire tourner les gabarits.
4. Crée .gitignore (node_modules, dist, .env, .dev.vars, .wrangler) et .dev.vars.example listant STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SITE_URL.
5. Rédige docs/A_FAIRE_NOA.md avec les étapes exactes, dans l'ordre : achat du domaine, création du compte Cloudflare gratuit, connexion de ce repo GitHub à Cloudflare Pages (commande de build, dossier de sortie), branchement du domaine, création du compte Stripe en mode test et récupération des clés de test, création du compte CJ Dropshipping gratuit, ajout des variables d'environnement dans Cloudflare Pages.
6. Vérifie que npm run build passe. Commit "phase 0 : socle Astro Cloudflare", journal, arrêt.
```

## PHASE 1 : recherche de mots-clés

```
Lis CLAUDE.md. Phase 1, recherche de mots-clés.

1. Pour chaque famille de produits (CLAUDE.md section 5), collecte les requêtes réelles des internautes français : saisie semi automatique Google en français, questions "Autres questions posées", recherches associées, formulations des fiches produits concurrentes. Décline par forme (rectangulaire, carrée, ronde, ovale, en L, d'angle), par dimension, par usage (hiver, imperméable, anti UV, anti vent) et par modèle pour barbecues et spas.
2. Si un accès réseau échoue, dis le et précise ce qui n'a pas pu être vérifié. N'invente jamais un volume de recherche : colonne vide si aucune source fiable.
3. Pour les 30 requêtes principales, analyse la première page de résultats : types de sites présents, présence ou non d'une page qui répond vraiment à la question. Score de faiblesse de 1 (très concurrentiel) à 5 (opportunité).
4. Une intention = une page cible, jamais deux pages sur la même intention.
5. Livre docs/MOTS_CLES.csv (requete, famille, forme, dimension, intention, page_cible, score_faiblesse, source, remarque) et docs/SYNTHESE_MOTS_CLES.md (15 meilleures opportunités, requêtes à éviter, pages prioritaires).
6. Commit, journal, arrêt.
```

## PHASE 2 : catalogue fournisseur et arborescence

```
Lis CLAUDE.md, docs/MOTS_CLES.csv et docs/SYNTHESE_MOTS_CLES.md. Phase 2, catalogue et arborescence.

1. Récupère les produits sélectionnés par Noa sur CJ Dropshipping : via l'API CJ si Noa a fourni une clé en variable d'environnement, sinon à partir d'un export ou d'une liste de liens produits fournie par Noa. Ne garde que les variantes en stock dans un entrepôt européen, et note pour chacune le coût produit, les frais et délais d'envoi vers la France.
2. Écris scripts/importer-catalogue.mjs qui transforme ces données en un fichier JSON par produit dans src/data/produits/, en appliquant la règle de prix de CLAUDE.md section 3. Écris scripts/controler-catalogue.mjs qui refuse tout produit sans dimensions, sans image, sans coût, ou avec une marge inférieure au minimum.
3. Si moins de 15 produits de priorité 1 sont disponibles en entrepôt européen, arrête toi et préviens Noa avant d'aller plus loin.
4. Définis la règle de compatibilité housse et meuble (par exemple housse de 0 à 10 cm plus grande que le meuble sur chaque côté) et écris la dans docs/ARBORESCENCE.md.
5. Fais correspondre produits et groupes de requêtes. Supprime toute page de dimension sans produit compatible.
6. Construis l'arborescence finale dans docs/ARBORESCENCE.md : pour chaque page, URL, type (accueil, famille, forme, dimension, produit, guide, article, légal), requête principale, requêtes secondaires, title (60 caractères max), meta description (155 caractères max), H1, liens internes entrants et sortants.
   URLs courtes et en français : /housse-salon-de-jardin/, /housse-salon-de-jardin/rectangulaire/, /housse-salon-de-jardin/200x140/, /produit/[slug]/, /guide/mesurer-housse-salon-de-jardin/, /conseils/[slug]/.
7. Commit, journal, arrêt.
```

## PHASE 3 : site, gabarits et SEO technique

```
Lis CLAUDE.md et docs/ARBORESCENCE.md. Phase 3, site et SEO technique.

1. Identité sobre et rassurante : palette naturelle (vert sauge ou anthracite, beige, blanc), une police lisible auto hébergée, logo texte provisoire. Pas d'animation lourde, JavaScript minimal.
2. Toutes les pages sont générées depuis src/data/produits/ et src/content/ : familles, formes et dimensions générées uniquement quand des produits correspondent.
3. Gabarit liste (famille, forme, dimension) : H1, introduction de 2 à 3 phrases, filtres légers, grille produits, puis contenu long (guide, tableau des correspondances, FAQ), liens vers dimensions voisines et autres formes.
4. Gabarit produit : titre orienté requête, galerie, prix TTC, mention "Livraison offerte en France métropolitaine", délai de livraison, tableau des dimensions, bloc "compatible avec les meubles de X à Y cm" calculé depuis les données, matériau et imperméabilité exprimés honnêtement, retours 14 jours, FAQ courte, produits complémentaires.
5. Panier et paiement : panier côté navigateur (localStorage, protégé par try/catch), bouton de commande qui appelle functions/api/checkout. Cette fonction relit le catalogue, vérifie chaque produit et recalcule les prix, puis crée une session Stripe Checkout (adresse de livraison France, aucun frais de port puisque la livraison est offerte et intégrée au prix, acceptation des CGV obligatoire, email du client obligatoire pour le reçu Stripe). Chaque ligne de la session porte le SKU CJ, la variante et la quantité (nom du produit et métadonnées), pour que Noa trouve dans le tableau de bord Stripe tout ce qu'il faut pour passer la commande chez CJ. Pages /commande/merci/ et /commande/annulee/.
6. functions/api/stripe-webhook : vérifie la signature Stripe (refus et code 400 si elle est invalide), puis journalise l'événement (identifiant de session, montant, SKU CJ et quantités) dans les logs Cloudflare. Rien de plus : aucun envoi d'email, aucun service d'envoi. Le client reçoit le reçu Stripe et Noa reçoit les notifications de paiement de Stripe (réglages à décrire dans docs/A_FAIRE_NOA.md). La source de vérité des commandes reste le tableau de bord Stripe. Au lancement, Noa passe les commandes CJ à la main. L'automatisation viendra en phase 8.
7. SEO technique : un H1 par page, title et meta uniques, canonique sur chaque page, sitemap.xml généré, robots.txt, fil d'Ariane visible, page 404 utile, URLs sans paramètres indexables.
8. Données structurées JSON-LD valides : Organization et WebSite (accueil), BreadcrumbList (partout), Product avec Offer (prix EUR, disponibilité, GTIN si EAN disponible, MerchantReturnPolicy, OfferShippingDetails), CollectionPage et ItemList (listes), Article (conseils), FAQPage seulement si une FAQ visible existe. Aucune note ni avis tant qu'il n'y a pas de vrais avis.
9. Performance : images optimisées par Astro (formats modernes, tailles adaptées), lazy loading sauf image principale. Objectif Lighthouse mobile supérieur ou égal à 95 sur accueil, liste et produit.
10. Accessibilité : contrastes, alt descriptifs, navigation clavier, libellés de formulaires.
11. Teste un paiement complet en mode test Stripe en local avec wrangler. Commit, journal, arrêt.
```

## PHASE 4 : contenus commerciaux

```
Lis CLAUDE.md et docs/ARBORESCENCE.md. Phase 4, contenus commerciaux.

1. Fiches produits réécrites (200 à 400 mots) : accroche utile, points clés, dimensions, pour quels meubles, pose et entretien, ce qu'il faut savoir (étanchéité réelle, vent, condensation). Aucune donnée inventée.
2. Pages liste : introduction de 2 à 3 phrases, contenu de bas de page de 300 à 700 mots selon l'importance de la requête (comment mesurer, tailles disponibles et meubles correspondants, choix du matériau, FAQ de 3 à 5 vraies questions de la phase 1).
3. Accueil : proposition de valeur claire, accès par forme, accès par dimension, guide de mesure, réassurance (livraison, retours, paiement sécurisé, contact), courte section sur l'hivernage.
4. Guide de mesure complet avec schémas SVG créés pour le projet, méthode par forme, règle de marge, erreurs fréquentes, tableau de correspondance.
5. Relecture critique : orthographe, répétitions, cannibalisation, promesses non vérifiées. Liste les corrections dans le journal. Commit, arrêt.
```

## PHASE 5 : conseils hivernage et maillage

```
Lis CLAUDE.md, docs/MOTS_CLES.csv et docs/ARBORESCENCE.md. Phase 5, contenus informationnels.

1. Rédige 8 articles sur les requêtes informationnelles les plus solides de la phase 1 (exemples à adapter : hiverner son salon de jardin, couvrir un salon en résine tressée l'hiver, éviter la moisissure sous une housse, protéger son barbecue l'hiver, hivernage d'un spa gonflable, mesurer son salon pour une housse, housse ou bâche, protéger sa pompe à chaleur).
2. Chaque article : 900 à 1 500 mots, réponse directe dès les premières lignes, sous titres issus des vraies questions, conseils concrets, 2 à 4 liens internes contextuels, encart produit en fin d'article.
3. Maillage : chaque page liste reçoit au moins 3 liens internes. Chaque dimension est reliée à ses voisines et à sa forme. Livre docs/MAILLAGE.md et un script qui vérifie qu'aucune page n'est orpheline et qu'aucun lien n'est cassé.
4. Commit, journal, arrêt.
```

## PHASE 6 : légal et confiance

```
Lis CLAUDE.md. Phase 6, conformité.

Rédige, en laissant entre crochets toute information manquante :
1. Mentions légales (éditeur, directeur de publication, hébergeur Cloudflare, contact).
2. CGV : vendeur, prix TTC, commande, paiement, livraison et délais, droit de rétractation de 14 jours avec ses modalités et le formulaire type, garantie légale de conformité et garantie des vices cachés avec les mentions requises, médiateur de la consommation, droit applicable.
3. Politique de retour et remboursement cohérente avec les CGV et avec les conditions réelles de CJ (adresse et frais de retour à confirmer par Noa).
4. Politique de confidentialité RGPD (données traitées par Stripe et Cloudflare, durée de conservation, droits). Confirme qu'aucun cookie non essentiel n'est déposé, sinon ajoute un bandeau de consentement conforme.
5. Pages Livraison, FAQ, Contact (formulaire sans service payant ou simple lien email), À propos honnête.
6. Footer avec liens vers ces pages. Liste pour Noa les points à faire relire. Commit, arrêt.
```

## PHASE 7 : Google Shopping, Search Console et lancement

```
Lis CLAUDE.md et docs/JOURNAL.md. Phase 7, lancement.

1. Écris scripts/flux-google.mjs qui génère au build un flux produits /flux-google.xml au format Google Merchant Center : id, titre optimisé, description, lien, image, prix, disponibilité, état neuf, GTIN si disponible sinon identifier_exists à false, marque, catégorie Google produit, poids, frais de livraison France.
2. Dans docs/A_FAIRE_NOA.md : création du compte Merchant Center gratuit, validation du site, ajout du flux par URL avec récupération quotidienne, activation des fiches gratuites, déclaration de la politique de retour et de livraison, propriété de domaine dans Search Console par DNS Cloudflare, envoi du sitemap, import dans Bing Webmaster Tools, demande d'indexation des 20 pages prioritaires, passage de Stripe en mode production.
3. Recette documentée : parcours d'achat complet en test, emails Stripe en français, affichage mobile, liens cassés (zéro), titles et metas uniques, données structurées sans erreur, Lighthouse sur les 3 gabarits, 404, sécurité du checkout (essai de modification de prix côté navigateur refusé).
4. docs/SUIVI_30_JOURS.md : quoi regarder à J+3, J+7, J+14, J+30 et quelles actions déclencher.
5. Commit "phase 7 : prêt pour lancement", arrêt. Le passage en clés Stripe de production se fait seulement après validation de Noa.
```

## PHASE 8 : itérations hebdomadaires

```
Lis CLAUDE.md et docs/JOURNAL.md. Phase 8, itération.

À partir des exports fournis par Noa (Search Console, Merchant Center, commandes Stripe) uniquement :
1. Renforce les pages en position 8 à 30 qui ont des impressions.
2. Propose une nouvelle page uniquement pour une requête nouvelle avec un produit compatible.
3. Améliore titles et metas des pages à fort affichage et faible taux de clic.
4. Corrige les erreurs Merchant Center.
5. Quand le volume de commandes le justifie, propose l'automatisation gratuite du passage de commande chez CJ via leur API depuis le webhook Stripe.
6. Maximum 5 actions prioritaires, réalise celles validées, commit, journal, arrêt.
```
