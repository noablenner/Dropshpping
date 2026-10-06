# À faire par Noa

Actions manuelles à faire dans les interfaces. Claude ne peut pas les faire et ne suppose jamais qu'elles sont faites. Cochez au fur et à mesure et signalez-le en début de session.

Les libellés de menus sont ceux de l'admin Shopify en français à la date d'écriture (octobre 2026). Shopify les renomme parfois : si un libellé ne correspond pas exactement, cherchez l'équivalent le plus proche et signalez l'écart.

---

## Avant la phase 1

### 0. Décisions à prendre avant de cliquer (bloquant)

- [ ] Compléter la section 2 de CLAUDE.md, au minimum : nom de marque, domaine, structure juridique et **régime de TVA** (franchise en base ou assujetti). Le régime de TVA change le calcul des prix, la configuration des taxes Shopify et les mentions légales.
- [ ] Vérifier que le nom de marque est libre : recherche sur la base INPI (data.inpi.fr) en classes 20, 22 et 24, et disponibilité du domaine .fr.

### 1. Créer la boutique Shopify et choisir l'abonnement

1. Aller sur shopify.com/fr, cliquer sur « Démarrer l'essai gratuit », créer le compte avec l'email professionnel du projet.
2. Pays de la boutique : France. Devise : EUR.
3. Noter le domaine technique attribué (`xxxx.myshopify.com`). Il servira de `SHOPIFY_STORE_DOMAIN` pour les scripts.
4. Abonnement : Paramètres > Forfait > choisir le forfait. **Basic suffit au lancement** : collections automatiques, métachamps, blog, API et intégration GitHub y sont tous disponibles. Ne prenez pas un forfait supérieur avant d'avoir des ventes.
5. Tant que la boutique n'est pas prête, laissez la page protégée par mot de passe : Boutique en ligne > Préférences > Protection par mot de passe. Ne la retirez qu'à la phase 7.

### 2. Acheter et brancher le domaine

Option simple : acheter le domaine directement chez Shopify (Paramètres > Domaines > Acheter un domaine). Le DNS est alors configuré automatiquement.

Option registrar externe (OVHcloud, Gandi, etc.), souvent moins chère et plus facile à garder si vous quittez Shopify :
1. Acheter le domaine .fr chez le registrar.
2. Dans Shopify : Paramètres > Domaines > Connecter un domaine existant, saisir le domaine.
3. Chez le registrar, dans la zone DNS : enregistrement **A** de `@` vers `23.227.38.65`, et enregistrement **CNAME** de `www` vers `shops.myshopify.com`. Supprimer les anciens enregistrements A et AAAA de `@` s'il en existe.
4. Revenir dans Shopify > Domaines, cliquer sur « Vérifier la connexion ». La propagation peut prendre jusqu'à 48 h.
5. Définir le domaine comme domaine principal, avec la version `www` ou sans `www` (choisissez une fois pour toutes). Vérifiez que le certificat SSL apparaît comme actif.

Les valeurs DNS ci-dessus sont celles que Shopify publie habituellement. Fiez-vous à celles qu'affiche votre admin Shopify si elles diffèrent.

### 3. Connecter ce repo GitHub au thème

Prérequis : le travail de la phase 0 doit être fusionné dans la branche `main` du repo (Claude travaille sur une branche à part). Demandez à Claude d'ouvrir la pull request si besoin.

1. Boutique en ligne > Thèmes > Ajouter un thème > Se connecter depuis GitHub.
2. Autoriser l'application Shopify sur votre compte GitHub, en limitant l'accès au seul repo `noablenner/Dropshpping`.
3. Choisir le repo, puis la branche **`main`**.
4. Le thème apparaît dans la bibliothèque. Ne le publiez pas encore : la boutique est protégée par mot de passe et le thème sera retravaillé en phase 3.

À savoir : la synchronisation fonctionne dans les deux sens. Toute modification faite dans l'éditeur de thème Shopify crée un commit sur `main`. Pour éviter les conflits, **ne modifiez pas le thème dans l'éditeur Shopify** pendant que Claude travaille dessus, ou prévenez-le avant.

Les dossiers `docs/` et `scripts/` ne font pas partie d'un thème Shopify. La synchronisation GitHub les ignore normalement. Si Shopify affiche une erreur à cause d'eux, notez le message exact et transmettez-le à Claude.

### 4. S'inscrire au programme dropshipping vidaXL

1. Sur le site vidaXL, ouvrir la rubrique dropshipping (pied de page, section partenaires ou B2B), puis créer un compte dropshipping pour la France avec les informations de votre société.
2. **Avant de payer**, récupérer et envoyer à Claude :
   - le coût de l'abonnement dropshipping (les sources publiques mentionnent 30 € par mois, à confirmer) ;
   - les prix d'achat sur 5 à 10 housses de la priorité 1, **frais de port inclus**, à comparer avec les prix publics des mêmes produits sur vidaxl.fr, Amazon et Google Shopping ;
   - la politique de retour pour un client dropshipping : adresse de retour, qui paie le port, délai ;
   - les délais d'expédition réels vers la France, Corse comprise ;
   - la question de savoir si le colis ou la facture porte le nom vidaXL.
3. Garder les identifiants et la clé API vidaXL hors du repo.

### 5. Installer l'application vidaXL Dropshipping

1. Boutique en ligne > Apps (ou le Shopify App Store) : chercher « vidaXL Dropshipping ». L'app est éditée par Woosa.
2. Installer et connecter le compte vidaXL avec les identifiants de l'étape 4.
3. **N'importez pas encore de catégories entières.** L'import se fera en phase 2 de façon ciblée, uniquement dans l'univers produit de CLAUDE.md section 4. Un import massif hors thème casse la cohérence SEO.
4. À savoir : l'app est payante (29 $ par mois après 30 jours d'essai d'après sa fiche, à vérifier) et notée 2,1 sur 5 sur environ 17 avis au moment de l'écriture. Lisez les avis négatifs avant de lancer l'essai : ils portent souvent sur la synchronisation des stocks et des commandes, et c'est précisément ce qui vous coûtera du SAV.

### 6. Créer l'application pour les scripts et récupérer les identifiants

**Changement important par rapport à PHASES.md :** depuis le 1er janvier 2026, Shopify ne permet plus de créer une « application personnalisée » depuis l'admin (Paramètres > Applications > Développer des applications). Il faut passer par le **Dev Dashboard**. Le principe ne change pas, seul le chemin est différent.

1. Ouvrir le Dev Dashboard : dans l'admin Shopify, cliquer sur le nom de la boutique en haut à droite, puis « Dev Dashboard ». Ou aller directement sur dev.shopify.com/dashboard.
2. Apps > Créer une app (Create app) > Démarrer depuis le Dev Dashboard. Nom : `scripts-seo`.
3. Dans la configuration de l'app, section accès / scopes de l'API Admin, cocher :
   - `write_products` (produits, variantes, collections, métachamps produit ; inclut la lecture) ;
   - `write_publications` (publier les collections sur la boutique en ligne) ;
   - `write_content` (articles de blog, pages) ;
   - `write_online_store_pages` (pages) ;
   - `write_online_store_navigation` (redirections d'URL et menus) ;
   - `read_inventory` (stock, pour l'export catalogue de la phase 2).
   Si l'un de ces noms n'existe pas dans la liste, notez celui qui s'en rapproche le plus et prévenez Claude.
4. Publier une version de l'app, puis l'installer sur votre boutique.
5. Dans les paramètres de l'app (Settings), récupérer le **Client ID** et le **Client secret**. Avec le flux « client credentials », les scripts obtiennent un token valable 24 h à partir de ces deux valeurs. Le code gère déjà ce cas (`scripts/lib/shopify-admin.mjs`).
6. Sur votre machine, copier `scripts/.env.example` en `scripts/.env` et remplir `SHOPIFY_STORE_DOMAIN` (le domaine `.myshopify.com`), `SHOPIFY_CLIENT_ID` et `SHOPIFY_CLIENT_SECRET`. **Ne collez jamais ces valeurs dans le chat, dans un commit ou dans un fichier du repo.** Le fichier `.env` est exclu par `.gitignore`.
7. Test en lecture seule, depuis le dossier `scripts/` : `npm run verifier-connexion` (Node 20.6 ou plus récent). Le script doit afficher le nom de la boutique.
8. Si Claude travaille dans une session cloud, les variables se définissent dans les paramètres de l'environnement de la session et non dans le chat.

### 7. Activer Shopify Payments

Prérequis : la société existe (SIREN) et dispose d'un compte bancaire professionnel.
1. Paramètres > Paiements > Activer Shopify Payments.
2. Renseigner le type d'entreprise, le SIREN, l'adresse, le représentant légal, l'IBAN, puis la pièce d'identité demandée.
3. Activer 3-D Secure (obligatoire en Europe, normalement automatique), puis cartes bancaires, Apple Pay et Google Pay.
4. Désactiver le moyen de paiement manuel s'il est activé par défaut.
5. Laisser le mode test actif jusqu'à la recette de la phase 7.

### 8. Configurer la TVA France

1. Paramètres > Taxes et droits > France : activer la collecte et saisir le numéro de TVA intracommunautaire.
2. Paramètres > Taxes et droits > cocher « Tous les prix incluent les taxes » : en B2C en France, les prix doivent être affichés TTC.
3. Vérifier que les frais de livraison sont aussi soumis à la TVA (option « Facturer les taxes sur les frais de livraison »).
4. **Cas de la franchise en base de TVA (micro-entreprise sous le seuil) :** ne pas activer la collecte. La mention « TVA non applicable, art. 293 B du CGI » devra figurer sur les factures. Dites-le à Claude, parce que cela change la règle de prix de CLAUDE.md.
5. Le régime de TVA est une décision fiscale. Faites-la valider par votre expert-comptable.

---

Quand tout est fait : mettez à jour la section 2 de CLAUDE.md, cochez les cases ci-dessus, et lancez la phase 1. La phase 1 (mots-clés) n'a pas besoin des étapes 4 à 8 et peut démarrer dès que la section 2 est complétée.
