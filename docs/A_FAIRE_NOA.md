# À faire par Noa

Actions à faire dans les interfaces. Claude ne peut pas les faire et ne suppose jamais qu'elles sont faites. Cochez au fur et à mesure et signalez-le en début de session.

Règle de ce fichier : rien de ce qui suit ne demande d'abonnement. Si une interface vous propose une offre payante, un essai gratuit qui demande une carte bancaire ou un « plan Pro », refusez et prévenez Claude.

Les menus de Cloudflare, Stripe et CJ changent régulièrement. Si un libellé ne correspond pas exactement, cherchez l'équivalent le plus proche et notez l'écart pour Claude.

---

## Avant la phase 1

### 0. Test go/no-go sur CJ (à faire en premier, 30 minutes, gratuit)

CLAUDE.md section 5 le dit : si CJ ne couvre pas la priorité 1 en entrepôt européen, la niche est à revoir. Autant le savoir avant d'y passer du temps.
1. Créez le compte CJ (étape 6 ci-dessous).
2. Dans le catalogue CJ, cherchez « garden furniture cover », « patio furniture cover », « outdoor table cover » et « chair cover outdoor ». Appliquez le filtre d'entrepôt ou de pays d'expédition sur les pays européens (France, Allemagne, Pologne, Espagne, Italie, etc.).
3. Notez combien de produits distincts, avec des dimensions précises, sont réellement en stock en Europe. Envoyez à Claude 5 à 10 liens avec le coût produit et le coût d'envoi vers la France.
4. En dessous d'une quinzaine de housses de mobilier en stock en Europe, dites-le avant la phase 1.

### 0 bis. Société éditrice : Agence ABS (SAS)

1. Vérifiez dans les statuts (article « Objet ») et sur l'extrait Kbis que l'objet social couvre la **vente au détail en ligne** ou le commerce de marchandises à distance. Une formule large du type « toutes opérations commerciales » peut suffire, mais faites-le confirmer par votre expert-comptable.
2. Si l'objet ne couvre pas cette activité, il faut modifier les statuts (décision des associés, puis formalité au greffe). C'est payant, et à faire avant d'activer Stripe en réel.
3. Communiquez à Claude, pour CLAUDE.md section 3 : le capital, le SIREN, le RCS (ville et numéro), le n° de TVA intracommunautaire et le régime de TVA. La règle de prix suppose une TVA collectée à 20 %. Si ce n'est pas votre cas, prévenez avant la phase 2.
4. Le code APE et l'objet social seront aussi vérifiés par Stripe lors de l'activation du compte.

### 1. Acheter le nom de domaine (environ 10 € par an)

1. Choisissez le nom de marque et vérifiez qu'il est libre sur data.inpi.fr (classes 20, 22 et 24).
2. Achetez le domaine `.fr` chez un registrar français (OVHcloud, Gandi, Infomaniak…). Le registrar de Cloudflare ne propose pas, à ma connaissance, les domaines `.fr` : vérifiez sur leur site si vous préférez tout centraliser.
3. Refusez toutes les options payantes (hébergement, email payant, « protection premium »). Seul le domaine est nécessaire.
4. Ne touchez pas encore au DNS : ce sera l'étape 4.

### 2. Créer le compte Cloudflare (gratuit)

1. Allez sur dash.cloudflare.com/sign-up, créez le compte et validez l'email.
2. Activez la double authentification : Profil > Authentification. C'est le compte qui héberge le site et le paiement, il doit être protégé.
3. Restez sur l'offre Free. Aucune carte bancaire n'est nécessaire.

### 3. Connecter ce repo GitHub à Cloudflare Pages

Prérequis : le travail de Claude est sur la branche `claude/trusting-hypatia-8w2446`. Il doit d'abord être fusionné dans `main` (demandez à Claude d'ouvrir la pull request, puis fusionnez-la sur GitHub).

1. Dans le tableau de bord Cloudflare : Workers & Pages > Create (Créer) > onglet **Pages** > Connect to Git (Connecter à Git). Si l'interface propose d'abord de créer un « Worker », cherchez le lien vers Pages : le projet utilise **Pages**, pas Workers.
2. Autorisez l'application Cloudflare sur GitHub, en limitant l'accès au seul repo `noablenner/Dropshpping`.
3. Choisissez le repo, puis renseignez :
   - Nom du projet : le nom de la marque en minuscules (il donne l'adresse provisoire `nom.pages.dev`) ;
   - Branche de production : `main` ;
   - Préréglage de framework (Framework preset) : `Astro` ;
   - Commande de build : `npm run build` ;
   - Dossier de sortie (Build output directory) : `dist` ;
   - Variable d'environnement de build : `NODE_VERSION` = `22`.
4. Cliquez sur « Save and Deploy ». Le premier build doit réussir et afficher une page « Site en construction ».
5. Testez `https://nom.pages.dev/api/sante/` : la page doit afficher `{"ok":true}`. Cela prouve que les fonctions serveur sont actives.
6. Conseillé : Settings > Builds > Branch control, limitez les déploiements de prévisualisation (preview) aux branches utiles. L'offre gratuite autorise 500 builds par mois, ce qui est largement suffisant, mais inutile de les gaspiller.

### 4. Brancher le domaine

1. Cloudflare > Add a domain (Ajouter un domaine), saisissez votre domaine et choisissez l'offre **Free**.
2. Cloudflare affiche deux serveurs de noms (nameservers). Chez votre registrar, remplacez les serveurs DNS du domaine par ces deux-là.
3. Attendez l'email de Cloudflare confirmant que le domaine est actif (de quelques minutes à 24 h).
4. Workers & Pages > votre projet > Custom domains > Set up a custom domain : ajoutez `www.votre-domaine.fr`, puis `votre-domaine.fr`. Cloudflare crée les enregistrements DNS et le certificat HTTPS tout seul.
5. Choisissez une version principale (avec ou sans `www`) et dites-la à Claude : il réglera l'URL canonique et la redirection de l'autre version.
6. Mettez le domaine dans CLAUDE.md section 3.

### 5. Créer le compte Stripe en mode test

1. Créez le compte sur dashboard.stripe.com/register, pays France.
2. **N'activez pas encore le compte** (pas de SIREN, pas d'IBAN). Le mode test fonctionne sans activation. L'activation pour les vrais paiements se fera à la phase 7, après validation.
3. Restez en mode test (bouton « Mode test » ou « Sandbox » en haut du tableau de bord) : Développeurs > Clés API.
4. Notez la **clé secrète de test** (elle commence par `sk_test_`). La clé publiable (`pk_test_`) n'est pas utile : le site redirige vers la page de paiement hébergée par Stripe.
5. Le secret de webhook (`whsec_...`) sera créé en phase 3, quand l'adresse du webhook existera. Rien à faire pour l'instant.
6. Tarifs : Stripe ne prélève aucun abonnement, seulement une commission par paiement. Notez le tarif affiché sur stripe.com/fr/pricing pour les cartes européennes : il entre dans le calcul de marge (CLAUDE.md section 3).

### 6. Créer le compte CJ Dropshipping (gratuit)

1. Créez le compte sur cjdropshipping.com. L'inscription est gratuite et sans abonnement.
2. Ne connectez **aucune boutique** (Shopify, WooCommerce…) : le site n'en utilise pas. Les commandes seront passées à la main au lancement.
3. Ne payez rien et ne commandez pas de stock. Certains services CJ (stockage en entrepôt, sourcing privé) sont facturés : on n'en utilise aucun.
4. La clé API CJ ne servira qu'en phase 2, et seulement si vous choisissez cette méthode. Ne la donnez pas dans le chat.

### 7. Ajouter les variables d'environnement dans Cloudflare Pages

À faire une fois l'étape 5 terminée.
1. Workers & Pages > votre projet > Settings > Variables and Secrets (Variables d'environnement).
2. Pour l'environnement **Production** et pour **Preview**, ajoutez :
   - `STRIPE_SECRET_KEY` : la clé `sk_test_...`, de type **Secret** (chiffré), pas en texte clair ;
   - `SITE_URL` : `https://www.votre-domaine.fr`, sans slash final (en attendant le domaine : `https://nom.pages.dev`) ;
   - `STRIPE_WEBHOOK_SECRET` : à ajouter en phase 3.
3. Enregistrez, puis relancez un déploiement (Deployments > Retry deployment) pour que les variables soient prises en compte.
4. Ne collez jamais ces clés dans le chat, dans un fichier du repo ou dans un commit.

### 8. Choisir le médiateur de la consommation (obligatoire, coût accepté)

Préférence : un médiateur **facturé au dossier**, plutôt qu'une adhésion annuelle ou pluriannuelle.
1. Ouvrez la liste officielle des médiateurs référencés par la CECMC (Commission d'évaluation et de contrôle de la médiation de la consommation) : site economie.gouv.fr, rubrique « Médiation de la consommation » > « Vous êtes un professionnel » > « Choisir un médiateur de la consommation » > « Médiateurs référencés ». La liste existe aussi par secteur d'activité.
2. Ne retenez que les médiateurs compétents pour le secteur **« Vente en ligne, vente à distance »** ou multisectoriels. Un médiateur qui ne figure pas sur cette liste ne remplit pas l'obligation légale.
3. Pour chaque candidat, ouvrez sa page tarifs et notez :
   - frais d'adhésion ou d'inscription (montant et durée) ;
   - prix par dossier, et s'il est dû même quand le consommateur abandonne ou que la demande est jugée irrecevable ;
   - médiation à distance possible (email, visioconférence) ;
   - date de mise à jour de la page tarifs.
4. Choisissez le moins cher à l'usage pour quelques litiges par an. Si aucun n'est facturé uniquement au dossier, prenez la plus petite adhésion assortie d'un prix par dossier bas.
5. Signez la convention et gardez-en une copie.
6. Donnez à Claude le nom exact, l'adresse postale et l'URL du site du médiateur : ces trois informations doivent figurer dans les CGV (phase 6).

Claude n'a pas pu consulter la liste officielle ni les sites des médiateurs depuis sa session (accès réseau bloqué). Aucun nom n'est donc cité ici : la vérification vous revient.

### 9. Recevoir les emails sur le domaine (Cloudflare Email Routing, gratuit)

À faire après l'étape 4 (domaine actif sur Cloudflare).
1. Cloudflare > votre domaine > Email > Email Routing > Activer (Get started).
2. Créez l'adresse personnalisée `contact@votre-domaine.fr`, avec pour destination votre adresse personnelle (Gmail par exemple). Validez l'email de vérification envoyé à cette adresse.
3. Acceptez l'ajout automatique des enregistrements DNS (MX et SPF) proposé par Cloudflare.
4. Testez en écrivant à `contact@votre-domaine.fr` depuis une autre adresse.
5. **Limite à connaître** : Email Routing ne sert qu'à recevoir. Vos réponses partiront de votre adresse personnelle, sauf à configurer plus tard un service d'envoi. On n'en utilise aucun au lancement (décision du 2026-10-06).
6. Mettez cette adresse dans CLAUDE.md section 3 (email de contact).

### 10. Activer les emails Stripe (reçu client et notification de paiement)

C'est ce qui remplace tout service d'envoi d'emails au lancement.
1. **Reçu client** : Stripe > Paramètres > Emails clients (Customer emails) > activer « Paiements réussis » (Successful payments).
2. **Notification pour vous** : Stripe > Paramètres > Profil personnel (ou Équipe) > Notifications par email > activer « Paiements réussis » et « Litiges » (Disputes).
3. Paramètres > Informations publiques sur l'entreprise : nom de marque, email de support (`contact@votre-domaine.fr`), téléphone de support, URL du site. Ces informations apparaissent sur le reçu et la page de paiement.
4. Paramètres > Image de marque (Branding) : couleurs et logo provisoire, à faire en phase 3.
5. À savoir : **en mode test, Stripe n'envoie pas automatiquement les reçus aux clients**. Le test de la phase 3 se vérifiera dans le tableau de bord Stripe (aperçu du reçu), pas dans une boîte mail. Vérifiez ce comportement en phase 7 avec un vrai petit paiement.
6. Pour passer une commande chez CJ, ouvrez le paiement dans Stripe > Paiements : le SKU CJ, la variante, la quantité et l'adresse de livraison y figurent (mis en place en phase 3).

---

Quand tout est fait : complétez la section 3 de CLAUDE.md, cochez les cases ci-dessus, puis lancez la phase 1. La phase 1 (mots-clés) n'a besoin que du test go/no-go de l'étape 0 : les autres étapes peuvent avancer en parallèle, mais la section 3 doit être complète avant la phase 6 (légal).
