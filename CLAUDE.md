# CLAUDE.md : contexte permanent du projet

Ce fichier est lu à chaque session. Il décrit le projet, les règles non négociables et la façon de travailler. Ne le modifie qu'avec l'accord explicite de Noa.

## 1. Le projet en une phrase

Boutique e-commerce française en dropshipping, spécialisée dans l'hivernage et la protection du jardin et de la terrasse, avec comme produit d'appel les housses de protection pour mobilier de jardin classées par dimension exacte. L'acquisition se fait uniquement par SEO naturel et par les fiches gratuites Google Shopping.

## 2. Paramètres du projet (à compléter par Noa avant la phase 1)

Nom de marque : [NOM DE MARQUE]
Domaine : [DOMAINE.fr]
Société éditrice : [RAISON SOCIALE, forme, capital, SIREN, adresse du siège, RCS, n° TVA intracommunautaire]
Directeur de publication : [NOM]
Email de contact : [EMAIL]
Téléphone service client : [TÉLÉPHONE ou "non communiqué"]
Médiateur de la consommation : [NOM ET URL DU MÉDIATEUR]
Plateforme : Shopify, thème lié à ce repo GitHub via l'intégration GitHub de Shopify
Fournisseur principal : vidaXL (programme dropshipping, application Shopify vidaXL Dropshipping)
Règle de prix : prix de vente TTC = coût fournisseur TTC × [COEFFICIENT, ex. 1,8], arrondi à X,90 €, marge brute minimale de [X] € par commande
Frais de livraison affichés au client : [ex. offerts dès X €, sinon X €]
Délai de livraison annoncé : [ex. 3 à 6 jours ouvrés], toujours un peu plus long que le délai fournisseur réel
Pays de vente : France métropolitaine uniquement au lancement

## 3. Positionnement

Le site n'est pas un catalogue de plus. Il répond à une question précise : quelle housse choisir pour mon salon, ma table, mon barbecue, mon spa, et comment bien hiverner mon extérieur. Chaque page doit aider à choisir (bonne dimension, bonne forme, bon matériau) mieux que Leroy Merlin, Kaufland ou Amazon, qui se contentent de lister des produits.

Ton : français naturel, clair, expert sans jargon, vouvoiement, phrases courtes. Aucun superlatif creux ("incroyable", "révolutionnaire"). Aucune fausse urgence, aucun faux compteur de stock, aucun faux avis.

## 4. Univers produits (ordre de priorité)

Priorité 1, le cœur : housses pour salon de jardin (rectangulaire, carrée, ronde, en L / d'angle, lounge), housses pour table de jardin, housses pour chaises empilables, housses pour bain de soleil.
Priorité 2, le complément de panier : housses de barbecue et plancha, housses de spa gonflable, sangles et tendeurs anti-vent, sprays imperméabilisants si disponibles.
Priorité 3, l'élargissement hivernage : bâches d'hivernage pour piscine hors-sol, voiles d'hivernage pour plantes, housses de pompe à chaleur et de climatiseur extérieur, housses de coussins et coffres de rangement.

On n'ajoute aucun produit hors de cet univers. La cohérence thématique fait partie de la stratégie SEO.

## 5. Règles non négociables

Véracité : ne jamais inventer une caractéristique produit (dimension, grammage, matériau, étanchéité). Toute donnée technique vient de l'import fournisseur. Si une donnée manque, l'écrire comme manquante et la signaler à Noa. Ne jamais écrire "100 % étanche" si le fournisseur ne le garantit pas : beaucoup de housses sont seulement hydrofuges, il faut le dire.
Marque fournisseur : ne pas mettre en avant le nom vidaXL dans les titres, les URL ni les textes marketing. Le champ "vendor" de Shopify peut rester tel qu'importé pour le flux Google si nécessaire, à valider avec Noa.
Contenu unique : aucune description copiée du fournisseur ou d'un concurrent. Chaque fiche est réécrite.
Pas de pages vides : une page de dimension n'existe que si au moins un produit réellement compatible existe, avec un contenu propre à cette dimension. Pas de pages générées en masse pour des tailles sans produit (risque de pénalité "doorway pages").
Secrets : aucun token, clé API ou mot de passe dans le repo. Variables d'environnement uniquement, et .env dans .gitignore.
Légal : respect du droit français de la consommation (voir PHASES.md, phase 6).
Images : uniquement les visuels fournis par le fournisseur dans le cadre de son programme, ou des visuels créés pour le projet. Jamais d'images récupérées chez un concurrent.

## 6. Façon de travailler

Le projet avance par phases définies dans PHASES.md. Une phase à la fois.
Au début de chaque phase : relire ce fichier, faire le point sur l'état du repo, annoncer le plan de la phase en quelques lignes.
À la fin de chaque phase : commit propre avec un message clair, mise à jour de docs/JOURNAL.md (ce qui est fait, décisions prises, ce qui reste, ce que Noa doit faire à la main), puis arrêt et attente de validation.
Si une action doit être faite par Noa dans une interface (admin Shopify, vidaXL, Google Merchant Center, Search Console, registrar), l'écrire clairement dans docs/A_FAIRE_NOA.md avec les étapes exactes, au lieu de supposer qu'elle est faite.
En cas de doute sur une décision business (prix, marge, marque, promesse client), demander. En cas de doute technique, choisir l'option la plus simple et la plus standard Shopify.
Le code est livré complet, jamais de fichiers à moitié écrits avec "reste inchangé".

## 7. Structure du repo

Le repo contient le thème Shopify (structure standard : assets, config, layout, locales, sections, snippets, templates) plus un dossier docs/ et un dossier scripts/.
docs/ : JOURNAL.md, A_FAIRE_NOA.md, MOTS_CLES.csv, ARBORESCENCE.md, CONTENUS/ (textes rédigés, un fichier par page), LEGAL/.
scripts/ : scripts Node utilisant l'API Admin Shopify (création de collections, pages, articles, métachamps, redirections), lancés uniquement avec un token fourni par variable d'environnement.

## 8. Objectifs mesurables

Semaine 1 après lancement : toutes les pages indexées dans Search Console, flux Merchant Center approuvé sans erreur, produits visibles dans l'onglet Shopping.
Semaines 2 à 6 : premières impressions et clics sur les requêtes "housse + forme + dimension".
Indicateurs suivis : pages indexées, impressions, clics, position moyenne par groupe de requêtes, taux de conversion, panier moyen, marge par commande.
