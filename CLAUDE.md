# CLAUDE.md : contexte permanent du projet

Ce fichier est lu à chaque session. Il décrit le projet, les contraintes et la façon de travailler. Ne le modifie qu'avec l'accord explicite de Noa.

## 1. Le projet en une phrase

Boutique e-commerce française en dropshipping, spécialisée dans l'hivernage et la protection du jardin et de la terrasse, avec comme produit d'appel les housses de protection pour mobilier de jardin classées par dimension exacte. Acquisition uniquement par SEO naturel et par les fiches gratuites Google Shopping.

## 2. Contrainte budgétaire absolue : zéro abonnement

Le projet se lance sans aucun outil payant au mois. Seuls coûts acceptés : le nom de domaine (environ 10 € par an) et les commissions prélevées sur chaque paiement encaissé. Avant d'ajouter un service, une librairie hébergée ou une API, vérifie qu'il est gratuit pour un usage commercial et que la limite gratuite suffit au lancement. Sinon, trouve une alternative ou demande à Noa.

Pile technique imposée :
1. Site statique Astro, code dans ce repo GitHub.
2. Hébergement Cloudflare Pages (offre gratuite, usage commercial autorisé), déploiement automatique à chaque push sur main.
3. Fonctions serveur nécessaires (création de session de paiement, webhook) en Cloudflare Pages Functions, dans l'offre gratuite.
4. Paiement Stripe Checkout : aucun abonnement, commission par transaction uniquement. Les prix sont TOUJOURS recalculés côté serveur depuis le catalogue, jamais repris du navigateur.
5. Fournisseur : CJ Dropshipping, compte gratuit, uniquement des produits en stock dans un entrepôt européen.
6. Statistiques : Cloudflare Web Analytics (gratuit, sans cookie) et Google Search Console. Aucun traceur publicitaire, donc pas de bandeau cookies nécessaire tant que ça reste vrai.
7. Pas de base de données au lancement : le catalogue vit dans le repo (fichiers de données), les commandes vivent dans Stripe.

## 3. Paramètres du projet (à compléter par Noa avant la phase 1)

Nom de marque : [NOM DE MARQUE]
Domaine : [DOMAINE.fr]
Société éditrice : [RAISON SOCIALE, forme, capital, SIREN, adresse du siège, RCS, n° TVA intracommunautaire]
Directeur de publication : [NOM]
Email de contact : [EMAIL]
Téléphone service client : [TÉLÉPHONE ou "non communiqué"]
Médiateur de la consommation : [NOM ET URL DU MÉDIATEUR]
Règle de prix : prix de vente TTC = (coût produit CJ + frais d'envoi CJ depuis l'entrepôt UE) × [COEFFICIENT, ex. 1,8], arrondi à X,90 €, marge brute minimale de [X] € par commande après commission Stripe
Frais de livraison affichés au client : [ex. offerts dès X €, sinon X €]
Délai de livraison annoncé : [ex. 4 à 8 jours ouvrés], toujours plus long que le délai réel constaté
Pays de vente : France métropolitaine uniquement au lancement

## 4. Positionnement

Le site répond à une question précise : quelle housse choisir pour mon salon, ma table, mon barbecue, mon spa, et comment bien hiverner mon extérieur. Chaque page doit aider à choisir (bonne dimension, bonne forme, bon matériau) mieux que les grandes enseignes et marketplaces, qui se contentent de lister des produits.

Ton : français naturel, clair, expert sans jargon, vouvoiement, phrases courtes. Aucun superlatif creux, aucune fausse urgence, aucun faux compteur de stock, aucun faux avis.

## 5. Univers produits (ordre de priorité)

Priorité 1, le cœur : housses pour salon de jardin (rectangulaire, carrée, ronde, en L, lounge), housses pour table de jardin, housses pour chaises empilables, housses pour bain de soleil.
Priorité 2, le complément de panier : housses de barbecue et plancha, housses de spa gonflable, sangles et tendeurs anti vent.
Priorité 3, l'élargissement hivernage : bâches d'hivernage pour piscine hors sol, voiles d'hivernage pour plantes, housses de pompe à chaleur et de climatiseur extérieur, housses de coussins.

Aucun produit hors de cet univers. Si le catalogue CJ en entrepôt européen ne couvre pas correctement la priorité 1, le signaler immédiatement à Noa au lieu de forcer : la niche serait à revoir.

## 6. Règles non négociables

Véracité : ne jamais inventer une caractéristique produit (dimension, grammage, matériau, étanchéité). Toute donnée technique vient du fournisseur. Si elle manque, l'écrire comme manquante et la signaler. Ne jamais écrire "100 % étanche" sans garantie du fournisseur.
Contenu unique : aucune description copiée du fournisseur ou d'un concurrent.
Pas de pages vides : une page de dimension n'existe que si au moins un produit réellement compatible existe, avec un contenu propre. Pas de pages générées en masse sans produit.
Secrets : aucune clé (Stripe, CJ, Cloudflare) dans le repo. Variables d'environnement Cloudflare uniquement, .env dans .gitignore, clés Stripe de test tant que Noa n'a pas validé le passage en production.
Sécurité paiement : le serveur vérifie chaque identifiant produit et recalcule chaque prix depuis le catalogue. Le webhook Stripe vérifie la signature.
Images : uniquement les visuels fournis par le fournisseur pour la revente, ou créés pour le projet. Jamais d'images de concurrents.
Légal : droit français de la consommation respecté (voir PHASES.md, phase 6).

## 7. Façon de travailler

Le projet avance par phases définies dans PHASES.md, une à la fois.
Au début de chaque phase : relire ce fichier, faire le point sur l'état du repo, annoncer le plan en quelques lignes.
À la fin de chaque phase : commit clair, mise à jour de docs/JOURNAL.md (fait, décisions, reste à faire), puis arrêt et attente de validation.
Toute action à faire par Noa dans une interface (Cloudflare, Stripe, CJ, registrar, Google) va dans docs/A_FAIRE_NOA.md avec les étapes exactes. Ne jamais supposer qu'elle est faite.
Doute business (prix, marge, marque, promesse client) : demander. Doute technique : l'option la plus simple et la plus standard.
Le code est livré complet, jamais de fichiers à moitié écrits.

## 8. Structure du repo

src/ : site Astro (pages, layouts, composants).
src/data/produits/ : un fichier JSON par produit, source de vérité du catalogue (identifiant, SKU CJ, variante, EAN si disponible, titre, slug, dimensions, matériau, grammage, imperméabilité, fixation, coût, prix de vente, poids, images, tags forme, dimension, famille, disponibilité).
src/content/ : textes rédigés (collections, guides, articles, pages légales) en Markdown.
functions/ : Cloudflare Pages Functions (api/checkout, api/stripe-webhook).
scripts/ : scripts Node (import du catalogue CJ, calcul des prix, génération du flux Google Shopping, contrôles).
docs/ : JOURNAL.md, A_FAIRE_NOA.md, MOTS_CLES.csv, ARBORESCENCE.md, MAILLAGE.md, SUIVI_30_JOURS.md.

## 9. Objectifs mesurables

Semaine 1 après lancement : pages indexées dans Search Console, flux Merchant Center approuvé, produits visibles dans l'onglet Shopping.
Semaines 2 à 6 : premières impressions et clics sur les requêtes "housse + forme + dimension".
Suivi : pages indexées, impressions, clics, position moyenne par groupe de requêtes, conversion, panier moyen, marge réelle par commande.
