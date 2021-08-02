Les courses aux nombres sont les exercices les plus simples à coder !

Imaginée par [l’Unité INSERM-CEA de Neuroimagerie Cognitive](http://www.unicog.org/), un centre de recherche de pointe en cognition mathématique, la Course aux Nombres est à l'origine destiné aux enfants de 4 à 8 ans, en particulier ceux atteints de dyscalculie. ([voir sur le site officiel](https://www.lacourseauxnombres.com/nr/home.php?lang=fr))

Suite à la mesure 12 du rapport VILLANI-TOROSSIAN qui incite à développer les automatismes de calcul à tous les âges et dans tous les domaines, de plus en plus d'académies s'emparent de ce principe et organisent des concours pour les cycles 2, 3 et 4 comme [l'académie de Strasbourg](https://www.ac-strasbourg.fr/pedagogie/mathematiques/competitions/can/) et [l'académie de Lyon](https://maths.enseigne.ac-lyon.fr/spip/spip.php?article732).

MathALEA s'est aussi lancé dans la course ! (lol)

Vous pouvez consulter l'exercice de course aux nombres de niveau 6e [ici](https://coopmaths.fr/mathalea.html?ex=6C3CaN,n=30,i=1&v=l)

### Comment ajouter des questions à une course aux nombres existante en 5 étapes
Nous prendrons ici pour exemple le fichier de course aux nombres de 6ème (`src/js/exercices/6e/6C3CaN.js`) mais c'est la même chose pour les autres :
* `src/js/exercices/c3/c3C3CaN.js`

#### <a id="Etape1"></a>**Étape 1 : Créer sa branche**
Saisir les commandes suivantes dans un terminal en modifiant votre nom et le nom du fichier de la CaN (Course aux Nombres) que vous voulez modifier :
* `git checkout master` (on se place sur le `master`)
* `git pull` (on le met à jour)
* `git checkout -b monNom-6C3CaN` (on le copie pour créer notre nouvelle branche avec la syntaxe NomDeLaPersonne-ReferenceDeLExercice)

#### **Étape 2 : Déclarer la question**
* Ouvrir le fichier concerné (`src/js/exercices/6e/6C3CaN.js` dans notre cas)
* Autour de la centième ligne, vous verrez plein de questions de la forme :
```js
    'q26', // Appliquer un pourcentage
```
* Dupliquez la dernière question (copier-coller) et modifiez la.
* N'oubliez pas d'ajouter une virgule après ce qui est maintenant l'avant-dernière question.

#### **Étape 3 : La rendre accessible**
* À la toute fin du fichier, dupliquez la dernière question (en prenant soin de ne pas copier l'accent grave) et modifiez la.

#### **Étape 4 : Coder la question**
* En remontant un peu dans le fichier, vous verrez plusieurs blocs de code compris entre `case 'qXX' :` et `break`
* Dupliquez le dernier bloc, du `case 'qXX' :` au `break` et codez votre exercice à l'intérieur !
* Pour tester votre question, lancez `pnpm start` dans un terminal (CTRL+J ou CMD+` pour l'ouvrir) (il suffit de ne le lancer qu'une seule fois, la page se met à jour à chaque fois que vous enregistrerez votre fichier !)
* Vous remarquerez que dans les paramètres de l'exercice concerné, vous pouvez choisir le numéro de la question (le numéro de VOTRE question ! ;)

#### **Étape 5 : Partager la question**
Pour partager votre travail et le rendre accessible aux autres, vous pouvez saisir la commande suivante dans un terminal :
* `git push origin nomDeLaBranche` (le nomDeLaBranche est le nom que vous avez choisi à [l'étape 1](#Etape1))