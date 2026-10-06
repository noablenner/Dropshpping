# PHASES.md : prompts à envoyer à Claude Code, un par un

Mode d'emploi : place CLAUDE.md et PHASES.md à la racine du repo. Envoie ensuite le prompt de chaque phase dans Claude Code, une phase à la fois. Attends la fin, vérifie, valide, puis passe à la suivante.

## PHASE 0 : mise en place du repo et du thème

```
Lis CLAUDE.md et PHASES.md en entier avant toute action.

Phase 0, mise en place :
1. Vérifie l'état du repo. S'il est vide, installe le thème officiel gratuit le plus récent de Shopify (Horizon s'il est disponible, sinon Dawn) depuis son dépôt GitHub officiel, sans modifier la structure standard d'un thème Shopify.
2. Crée les dossiers docs/ et scripts/, ainsi que docs/JOURNAL.md, docs/A_FAIRE_NOA.md et docs/CONTENUS/.
3. Crée un .gitignore qui exclut .env, node_modules et les fichiers système.
4. Crée scripts/package.json avec le minimum nécessaire pour appeler l'API Admin GraphQL de Shopify (fetch natif de Node, pas de dépendance inutile), plus un fichier scripts/.env.example qui liste les variables attendues : SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN, SHOPIFY_API_VERSION.
5. Dans docs/A_FAIRE_NOA.md, écris la liste exacte des actions manuelles nécessaires avant la phase 1, dans l'ordre, avec où cliquer : création de la boutique Shopify et choix de l'abonnement, achat et branchement du domaine, connexion de ce repo via l'intégration GitHub de Shopify (Boutique en ligne > Thèmes > Ajouter un thème > Se connecter depuis GitHub), inscription au programme dropshipping vidaXL, installation de l'application vidaXL Dropshipping, création d'une application personnalisée Shopify avec les scopes nécessaires aux scripts (produits, collections, contenu en ligne, métachamps, redirections) et récupération du token, activation de Shopify Payments, configuration de la TVA France.
6. Commit "phase 0 : socle du thème et documentation", mets à jour le journal, puis arrête-toi.
```

## PHASE 1 : recherche de mots-clés et carte des intentions

```
Lis CLAUDE.md. Phase 1, recherche de mots-clés.

Objectif : construire la carte des requêtes que le site doit cibler, sans inventer de volumes de recherche.

1. Pour chaque famille de produits de CLAUDE.md section 4, collecte les requêtes réelles des internautes français : suggestions de saisie semi-automatique Google (fr), questions "Autres questions posées", recherches associées, et formulations utilisées sur les fiches produits des grands sites concurrents. Explore systématiquement les déclinaisons par forme (rectangulaire, carrée, ronde, ovale, en L, d'angle), par dimension ("housse salon de jardin 200x140", "housse table ronde 120 cm", etc.), par usage (hiver, imperméable, anti UV, anti vent) et par modèle pour les barbecues et spas (marques et modèles les plus vendus en France).
2. Si un accès réseau échoue, dis le clairement et indique ce que tu n'as pas pu vérifier. N'invente jamais un volume : la colonne volume reste vide si aucune source fiable ne la donne.
3. Pour les 30 requêtes les plus importantes, analyse la première page de résultats : quels types de sites sont présents (marketplace, grande enseigne, site spécialisé, forum), et la page qui répond vraiment à la question est elle présente. Note un score de faiblesse de 1 (très concurrentiel) à 5 (résultats faibles, opportunité).
4. Regroupe les requêtes par intention et affecte chaque groupe à UNE page cible (une page = un groupe, jamais deux pages sur la même intention).
5. Livre docs/MOTS_CLES.csv avec les colonnes : requete, famille, forme, dimension, intention (transactionnelle / informationnelle / comparaison), page_cible, score_faiblesse, source, remarque.
6. Livre docs/SYNTHESE_MOTS_CLES.md : les 15 meilleures opportunités, les requêtes à éviter et pourquoi, les pages à créer en priorité.
7. Commit, journal, arrêt.
```

## PHASE 2 : correspondance catalogue et arborescence

```
Lis CLAUDE.md, docs/MOTS_CLES.csv et docs/SYNTHESE_MOTS_CLES.md. Phase 2, arborescence.

Prérequis : Noa a importé les produits vidaXL dans Shopify (vérifie le dans docs/JOURNAL.md ou demande le). Si le token Admin est disponible en variable d'environnement, exporte la liste des produits importés (titre, SKU, EAN, dimensions, matériau, grammage, prix d'achat si disponible, stock) dans docs/CATALOGUE.csv. Sinon, demande à Noa un export CSV des produits Shopify.

1. Fais correspondre chaque produit aux groupes de requêtes de la phase 1. Une housse est "compatible" avec une dimension de meuble si elle la couvre avec une marge raisonnable : définis une règle de tolérance explicite (par exemple housse de 0 à 10 cm plus grande que le meuble sur chaque côté) et écris la dans docs/ARBORESCENCE.md.
2. Supprime de la cible toute page de dimension sans produit compatible.
3. Construis l'arborescence finale dans docs/ARBORESCENCE.md, avec pour chaque page : URL, type Shopify (collection automatique, page, article, produit), requête principale, requêtes secondaires, title (55 à 60 caractères max), meta description (150 à 155 caractères max), H1, liens internes entrants et sortants.
   Structure attendue :
   Accueil
   Collections par famille : /collections/housse-salon-de-jardin, /collections/housse-table-de-jardin, /collections/housse-barbecue, /collections/housse-spa-gonflable, etc.
   Collections par forme : /collections/housse-salon-de-jardin-rectangulaire, /collections/housse-salon-de-jardin-rond, /collections/housse-salon-de-jardin-en-l, etc.
   Collections par dimension, uniquement si produit compatible : /collections/housse-salon-de-jardin-200x140, etc.
   Guides : /pages/guide-mesure-housse-salon-de-jardin, /pages/comment-choisir-housse-mobilier-jardin
   Blog "Hivernage" : articles informationnels qui renvoient vers les collections.
   Pages légales et service client.
4. Définis le système de tags et de métachamps qui alimente les collections automatiques : par exemple forme:rectangulaire, dimension:200x140, famille:salon, plus des métachamps produit (longueur_cm, largeur_cm, hauteur_cm, diametre_cm, grammage_gm2, materiau, impermeabilite : hydrofuge ou étanche, fixation).
5. Écris scripts/creer-collections.mjs et scripts/taguer-produits.mjs qui appliquent ces tags et métachamps et créent les collections automatiques via l'API Admin GraphQL. Ces scripts ont un mode --dry-run par défaut qui affiche ce qui serait fait sans rien modifier. Le mode réel nécessite --apply.
6. Lance uniquement le dry-run, colle le résultat dans le journal, commit, arrête toi. Noa valide avant tout --apply.
```

## PHASE 3 : thème, gabarits et SEO technique

```
Lis CLAUDE.md et docs/ARBORESCENCE.md. Phase 3, thème et SEO technique.

1. Identité visuelle sobre et rassurante : palette naturelle (vert sauge ou anthracite, beige, blanc), une seule police lisible chargée proprement, logo texte provisoire avec le nom de marque. Pas d'animation lourde.
2. Gabarit collection : H1 propre, court texte d'introduction au dessus des produits (2 à 3 phrases, depuis un métachamp de collection), filtres par forme, dimension et matériau, grille produits, puis sous la grille un contenu long (guide, tableau de correspondance des dimensions, FAQ) alimenté par métachamp, et des liens vers les collections voisines (dimensions proches, autres formes).
3. Gabarit produit : titre orienté requête ("Housse salon de jardin rectangulaire 200 x 140 x 85 cm, polyéthylène hydrofuge"), tableau des dimensions, bloc "compatible avec les meubles de X à Y cm" calculé depuis les métachamps, matériau et niveau d'imperméabilité exprimés honnêtement, délai de livraison, retours 14 jours, FAQ courte, produits complémentaires (sangles, spray, housses de chaises).
4. Données structurées JSON-LD valides : Organization et WebSite sur l'accueil, BreadcrumbList partout, Product avec Offer (prix, devise EUR, disponibilité, GTIN depuis l'EAN, MerchantReturnPolicy, OfferShippingDetails), CollectionPage et ItemList sur les collections, Article sur le blog, FAQPage seulement là où une vraie FAQ visible existe. Pas de AggregateRating tant qu'il n'y a pas de vrais avis.
5. Fil d'Ariane visible sur toutes les pages sauf l'accueil.
6. Balises : un seul H1 par page, title et meta description gérés via les champs SEO Shopify, balise canonique correcte, y compris sur les URL de produits vues dans une collection (Shopify crée des doublons /collections/x/products/y : les liens internes doivent pointer vers /products/y).
7. Performance : images en WebP via le CDN Shopify avec srcset et largeur adaptée, lazy loading sauf pour l'image principale, aucune application ni script tiers inutile, CSS et JS minimaux. Objectif Lighthouse mobile performance supérieure ou égale à 90 sur accueil, collection et produit.
8. Accessibilité : contrastes suffisants, attributs alt descriptifs, navigation clavier, libellés de formulaires.
9. robots.txt.liquid : garde le comportement par défaut de Shopify, ajoute seulement l'exclusion des URL de filtres et de tri si elles génèrent du contenu dupliqué.
10. Teste le thème avec Shopify CLI (shopify theme check) et corrige tous les avertissements. Commit, journal, arrêt.
```

## PHASE 4 : rédaction des contenus commerciaux

```
Lis CLAUDE.md, docs/ARBORESCENCE.md et docs/CATALOGUE.csv. Phase 4, contenus commerciaux.

1. Fiches produits : réécris chaque fiche à partir des données fournisseur. Structure : une phrase d'accroche utile (à quoi sert la housse et pour quel meuble), les points clés, le tableau des dimensions, "pour quels meubles", "entretien et conseils de pose", "ce qu'il faut savoir" (honnêteté sur l'étanchéité et le vent, conseils pour éviter la condensation). Entre 200 et 400 mots, sans remplissage. Aucune donnée inventée.
2. Collections : pour chaque collection, une introduction de 2 à 3 phrases et un contenu de bas de page de 300 à 700 mots selon l'importance de la requête : comment mesurer, tableau des tailles disponibles et des meubles correspondants, choix du matériau, FAQ de 3 à 5 vraies questions issues de la phase 1.
3. Accueil : proposition de valeur claire en haut ("Trouvez la housse à la bonne taille pour votre mobilier de jardin"), accès par forme, accès par dimension, guide de mesure, réassurance (livraison, retours, paiement sécurisé, service client), courte section éditoriale sur l'hivernage.
4. Guide de mesure : page complète avec schémas (SVG créés pour le projet), méthode pour chaque forme, règle de marge, erreurs fréquentes, tableau de correspondance, liens vers chaque collection de forme.
5. Tous les textes sont enregistrés dans docs/CONTENUS/ (un fichier par page, avec title, meta description, H1, intro, contenu) avant toute publication.
6. Écris scripts/publier-contenus.mjs (dry-run par défaut, --apply pour publier) qui pousse descriptions, champs SEO et métachamps dans Shopify.
7. Fais toi même une relecture critique : orthographe, répétitions, cannibalisation entre pages, promesses non vérifiées. Liste les corrections faites dans le journal. Commit, arrêt.
```

## PHASE 5 : blog hivernage et maillage interne

```
Lis CLAUDE.md, docs/MOTS_CLES.csv et docs/ARBORESCENCE.md. Phase 5, contenu informationnel.

1. Rédige 8 articles qui ciblent les requêtes informationnelles les plus solides de la phase 1, par exemple : comment hiverner son salon de jardin, faut il couvrir un salon de jardin en résine tressée l'hiver, comment éviter la moisissure sous une housse, comment protéger son barbecue l'hiver, hivernage d'un spa gonflable, comment mesurer son salon de jardin pour une housse, housse ou bâche : que choisir, protéger sa pompe à chaleur l'hiver. Adapte la liste aux données réelles de la phase 1.
2. Chaque article : 900 à 1 500 mots, réponse directe dans les premières lignes, sous titres qui reprennent les questions réelles, conseils concrets, aucune affirmation technique non sourcée, 2 à 4 liens internes contextuels vers les collections et le guide de mesure, un encart produit en fin d'article.
3. Maillage : chaque collection reçoit au moins 3 liens internes depuis d'autres pages. Chaque page de dimension est reliée aux dimensions voisines et à sa collection de forme. Produis docs/MAILLAGE.md avec la matrice des liens et vérifie qu'aucune page n'est orpheline.
4. Script de publication en dry-run, commit, arrêt.
```

## PHASE 6 : légal, confiance et service client

```
Lis CLAUDE.md. Phase 6, conformité et confiance.

Rédige dans docs/LEGAL/, puis prépare la publication dans Shopify, les pages suivantes conformes au droit français, en utilisant les paramètres de CLAUDE.md section 2 et en laissant entre crochets toute information manquante :
1. Mentions légales (éditeur, directeur de publication, hébergeur Shopify, contact).
2. Conditions générales de vente : identité du vendeur, prix TTC, commande, paiement, livraison et délais, droit de rétractation de 14 jours avec ses modalités et le formulaire type de rétractation, garantie légale de conformité et garantie des vices cachés avec les textes requis, médiateur de la consommation, droit applicable.
3. Politique de retour et de remboursement, cohérente avec les CGV et avec la réalité du fournisseur (adresse et frais de retour à confirmer par Noa).
4. Politique de confidentialité RGPD et gestion des cookies via l'outil de consentement natif de Shopify.
5. Pages Livraison, FAQ service client, Contact, À propos (honnête : boutique spécialisée, pas de faux récit de fabrication).
6. Footer avec liens vers toutes ces pages et moyens de paiement.
Signale explicitement à Noa que ces textes doivent être relus, et liste les points à confirmer. Commit, arrêt.
```

## PHASE 7 : Google Shopping, Search Console et lancement

```
Lis CLAUDE.md et docs/JOURNAL.md. Phase 7, lancement.

1. Vérifie que chaque produit est prêt pour Google Merchant Center : titre optimisé (type de produit + forme + dimensions + matériau), description propre, GTIN (EAN), marque, état neuf, prix, disponibilité, catégorie Google produit adaptée, poids, image principale sur fond neutre, politique de retour et frais de livraison configurés. Produis docs/MERCHANT_CHECKLIST.csv avec un statut par produit et corrige ce qui peut l'être par script.
2. Écris dans docs/A_FAIRE_NOA.md les étapes exactes : installation de l'application Google & YouTube dans Shopify, liaison Merchant Center, activation des fiches gratuites, déclaration de la politique de retour et de livraison dans Merchant Center, validation du domaine dans Google Search Console (propriété de domaine via DNS), envoi du sitemap /sitemap.xml, import du site dans Bing Webmaster Tools depuis Search Console, demande d'indexation manuelle des 20 pages prioritaires.
3. Checklist de recette avant mise en ligne, exécutée et documentée : parcours d'achat complet en mode test, emails transactionnels en français, affichage mobile, liens cassés (aucun), title et meta uniques, une seule H1, données structurées valides (sans erreur dans le test des résultats enrichis), Lighthouse sur les 3 gabarits, redirections, page 404 utile, mot de passe de la boutique retiré seulement après validation de Noa.
4. Produis docs/SUIVI_30_JOURS.md : ce qu'il faut regarder à J+3, J+7, J+14, J+30 dans Search Console et Merchant Center, et quelles actions déclencher selon les résultats (pages non indexées, requêtes avec impressions mais sans clics, produits refusés).
5. Commit "phase 7 : prêt pour lancement", arrêt.
```

## PHASE 8 : itérations après lancement (à relancer chaque semaine)

```
Lis CLAUDE.md et docs/JOURNAL.md. Phase 8, itération hebdomadaire.

Noa te fournit les exports de la semaine (Search Console : requêtes et pages, Merchant Center : performances et erreurs, Shopify : commandes). À partir de ces données uniquement :
1. Identifie les requêtes avec impressions mais position entre 8 et 30 : renforce la page cible (contenu, FAQ, liens internes entrants).
2. Identifie les requêtes nouvelles sans page dédiée : propose une page uniquement si un produit compatible existe.
3. Améliore les titles et meta descriptions des pages à fort nombre d'impressions et faible taux de clic.
4. Corrige les erreurs Merchant Center.
5. Propose au maximum 5 actions prioritaires, réalise celles validées par Noa, commit, journal, arrêt.
```
