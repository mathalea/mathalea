Les courses aux nombres sont les exercices les plus simples à coder !

Imaginée par [l’Unité INSERM-CEA de Neuroimagerie Cognitive](http://www.unicog.org/), un centre de recherche de pointe en cognition mathématique, la Course aux Nombres est à l'origine destiné aux enfants de 4 à 8 ans, en particulier ceux atteints de dyscalculie. ([voir sur le site officiel](https://www.lacourseauxnombres.com/nr/home.php?lang=fr))

Suite à la mesure 12 du rapport VILLANI-TOROSSIAN qui incite à développer les automatismes de calcul à tous les âges et dans tous les domaines, de plus en plus d'académies s'emparent de ce principe et organisent des concours pour les cycles 2, 3 et 4 comme [l'académie de Strasbourg](https://www.ac-strasbourg.fr/pedagogie/mathematiques/competitions/can/) et [l'académie de Lyon](https://maths.enseigne.ac-lyon.fr/spip/spip.php?article732).

MathALEA s'est aussi lancé dans la course ! (lol)

Les exercices dédiés aux courses aux nombres sont disponibles avec les autres dans le [générateur d'exercices](https://coopmaths.fr/mathalea.html)

### <a id="1" href="#1">#</a> Comment créer un exercice de Course aux Nombres en 6 étapes
#### <a id="2" href="#2">#</a>**Étape 1 : Récupérer la référence**
* Consulter [la liste des can existantes](https://coopmaths.slack.com/archives/C02B8339SH3/p1642609032007900?thread_ts=1642608738.007500&cid=C02B8339SH3)
* Vérifier que l'exercice qu'on veut créer n'existe pas encore
* Ajouter une ligne concernant l'exercice qu'on veut créer
* Noter la `RÉFÉRENCE` pour la suite

#### <a id="3" href="#3">#</a>**Étape 2 : Créer sa branche**
Saisir les commandes suivantes dans un terminal en modifiant votre nom et la `RÉFÉRENCE` de l'exercice de CaN que vous voulez créer :
* `git checkout master` (on se place sur le `master`)
* `git pull` (on le met à jour)
* `git checkout -b monNom-RÉFÉRENCE` (on le copie pour créer notre nouvelle branche avec la syntaxe NomDeLaPersonne-ReferenceDeLExercice)

**Remarque importante**

Pour que les exercices dédiés aux courses aux nombres soient rangés au bon endroit dans le générateur d'exercice, il est impératif que le nom du fichier commence par `can`.

#### <a id="4" href="#4">#</a> **Étape 3 : Créer le fichier**
* Copier le modèle `src/js/exercices/beta/betaModèle00_simple_Course_au_Nombres.js` ou un exercice existant de CaN déjà présent dans le dossier `src/js/exercices/can/`
* Le coller dans le dossier `src/js/exercices/can` et le renommer avec la `RÉFÉRENCE` choisie.

#### <a id="5" href="#5">#</a> **Étape 4 : Le rendre accessible**
* lancer un `pnpm run build:dicos` dans le terminal pour ajouter votre nouvel exercice au dictionnaire des exercices.

#### <a id="6" href="#6">#</a> **Étape 5 : Coder l'exercice**
* Mettre votre énoncé dans `this.question`
* Mettre votre correction dans `this.correction`
* Mettre la réponse attendue dans `this.reponse`
* Tester l'exercice en lançant dans un terminal `pnpm start`

Par défaut, on compare des expressions littérales ou des nombres. Si vous voulez comparer autre chose (textes, fractions, longueurs par exemple, vous pouvez voir comment faire [ici](https://coopmaths.fr/documentation/tutorial-Rendre_un_exercice_interactif_simple.html#14))
#### <a id="7" href="#7">#</a> **Étape 6 : Partager l'exercice**
Pour partager votre travail et le rendre accessible aux autres, vous pouvez saisir la commande suivante dans un terminal :
* `git push origin nomDeLaBranche` (le nomDeLaBranche est le nom que vous avez choisi à [l'étape 1](#2))
* Nous en parler sur le Slack dans le canal #mathalea_programmation_exercices !
