Ce tutoriel vous donnera les clés pour créer la grande majorité des exercices.

Si vous ne voulez pas d'un truc trop lourd et voulez apporter votre contribution avec un moindre effort, vous pouvez aussi regarder comment ajouter des questions à une [Course aux Nombres](https://coopmaths.fr/documentation/tutorial-Course_aux_nombres.html) !

- [<a id="les_10_etapes_pour_creer_un_exercice" href="#les_10_etapes_pour_creer_un_exercice">1. Les 10 étapes pour créer un exercice</a>](#1-les-10-étapes-pour-créer-un-exercice)
- [<a id="modeles" href="#modeles">2. Modèles présents dans le dossier`src/js/exercices/beta`</a>](#2-modèles-présents-dans-le-dossiersrcjsexercicesbeta)
- [<a id="syntaxe_commit" href="#syntaxe_commit">3. Syntaxe des commit à respecter</a>](#3-syntaxe-des-commit-à-respecter)
- [<a id="programmer_un_exercice" href="#programmer_un_exercice">4. Programmer un exercice</a>](#4-programmer-un-exercice)
  - [<a id="en-tete" href="#en-tete">4. 1. L'en-tête</a>](#4-1-len-tête)
  - [<a id="parametrage_valeurs_par_defaut" href="#parametrage_valeurs_par_defaut">4. 2. Le paramétrage des valeurs par défaut</a>](#4-2-le-paramétrage-des-valeurs-par-défaut)
  - [<a id="code_de_lexercice" href="#code_de_lexercice">4. 3. Le code de l'exercice en lui-même</a>](#4-3-le-code-de-lexercice-en-lui-même)
  - [<a id="exercice_complet" href="#exercice_complet">4. 4. L'exercice complet dont le résultat est visible sur http://coopmaths.fr/exCM005</a>](#4-4-lexercice-complet-dont-le-résultat-est-visible-sur-httpcoopmathsfrexcm005)
  - [<a id="exercice_plusieurs_questions" href="#exercice_plusieurs_questions">4. 5. Exemple d'un exercice avec plusieurs types de questions visible sur http://coopmaths.fr/ex6C30</a>](#4-5-exemple-dun-exercice-avec-plusieurs-types-de-questions-visible-sur-httpcoopmathsfrex6c30)
- [<a id="latex_ou_html" href="#latex_ou_html">5. Exercice LaTeX ou exercice HTML ?</a>](#5-exercice-latex-ou-exercice-html-)
- [<a id="variante" href="#variante">6. Variante des exercices</a>](#6-variante-des-exercices)
- [<a id="liste_exhaustive_attributs" href="#liste_exhaustive_attributs">7. Liste exhaustive des attributs des exercices</a>](#7-liste-exhaustive-des-attributs-des-exercices)
    - [<a id="attributs_autour_de_lexercice" href="#attributs_autour_de_lexercice">7. 1. Autour de l'exercice</a>](#7-1-autour-de-lexercice)
    - [<a id="attributs_construction_de_lexercice" href="#attributs_construction_de_lexercice">7. 2. Construction de l'exercice</a>](#7-2-construction-de-lexercice)
    - [<a id="attributs_mise_en_forme_de_lexercice" href="#attributs_mise_en_forme_de_lexercice">7. 3. Mise en forme de l'exercice</a>](#7-3-mise-en-forme-de-lexercice)
    - [<a id="attributs_sortie_latex" href="#attributs_sortie_latex">7. 4. Gestion de la sortie LateX</a>](#7-4-gestion-de-la-sortie-latex)
    - [<a id="attributs_sortie_autre_que_latex" href="#attributs_sortie_autre_que_latex">7. 5. Gestion de la sortie autre que LateX</a>](#7-5-gestion-de-la-sortie-autre-que-latex)
    - [<a id="attributs_parametres" href="#attributs_parametres">7. 6. Paramètres</a>](#7-6-paramètres)
    - [<a id="dependances_particulieres" href="#dependances_particulieres">7. 7. Exercice avec des dépendances particulières</a>](#7-7-exercice-avec-des-dépendances-particulières)
- [<a id="liste_exhaustive_fonctions" href="#liste_exhaustive_fonctions">8. Liste exhaustive des fonctions des exercices</a>](#8-liste-exhaustive-des-fonctions-des-exercices)
## <a id="les_10_etapes_pour_creer_un_exercice" href="#les_10_etapes_pour_creer_un_exercice">1. Les 10 étapes pour créer un exercice</a>
Toutes les commandes qui commencent par `git` peuvent aussi être faites par une interface graphique (VSC, GitKraken ou GitHub Desktop).
Il n'y a pas d'interférence entre eux donc vous pouvez sans problème faire certaines étapes en lignes de commande et d'autres avec une interface graphique c'est comme vous préférez.

Les interfaces graphiques peuvent être plus faciles à prendre en main et permettent de faire très facilement des tâches très compliquées.

Les lignes de commande nécessitent des "anti-sèches" au début mais ont les avantages d'avoir la même "interface" pour tout le monde et d'être "bavardes" en cas de problème, ce qui facilite grandement les échanges et les dépannages entre nous. D'autant plus qu'en cliquant sur [Utiliser_git_en_ligne_de_commandes](https://coopmaths.fr/documentation/tutorial-Utiliser_git_en_ligne_de_commandes.html) dans menu de gauche, vous aurez accès à des anti-sèches et à des solutions à différents messages d'erreur que vous pouvez rencontrer !

1. Commencer par se placer sur la branche master (locale) et la mettre à jour : saisir `git checkout master` puis `git pull` dans un terminal. [(GitKraken)](img/GitKraken-1.png)
2. Trouver à quelle [référence](https://coopmaths.fr/pdf/CoopMaths-Referentiel.pdf) l'exercice qu'on veut créer peut être rattaché.
3. Créer une nouvelle branche locale en partant du master (local) et en respectant la syntaxe NomDeLaPersonne-ReferenceDeLExercice-PrecisionEventuelle : `git checkout -b Nom-Reference-Precision` [(GitKraken)](img/GitKraken-2.png)
4. Copier l'un des [modèles](#modeles) présents dans le dossier `src/js/exercices/beta`, le renommer avec la bonne [référence](https://coopmaths.fr/pdf/CoopMaths-Referentiel.pdf) et le placer dans le dossier du niveau correspondant. (Si un exercice avec cette référence existe déjà, ajouter un tiret et incrémenter. Par exemple, si je veux créer 5A11 et qu'un exercice 5A11 existe déjà, je le nomme 5A11-1 et si 5A11-1 existe déjà, je le nomme 5A11-2 etc.)
5. Modifier les informations servant au référencement (dans les premières lignes du fichier, de l'export du titre à l'export de la fonction)
6. Enregistrer puis lancer `pnpm build:dicos` dans un terminal pour ajouter son exercice à la liste des exercices (il faudra le refaire si vous changez le nom du fichier, le titre ou l'un de ces paramètres : amcReady, amcType, interactifReady, interactifType)
7. Le [programmer](#programmer_un_exercice) et le tester en lançant dans un terminal `pnpm start` (Attention à ne pas oublier de modifier la ligne `if (this.questionJamaisPosee(i, a, b, c, d)` à la fin du fichier en fonction des données de l'énoncé, sinon le `pnpm start` ne fonctionnera pas).

    De plus, si vous avez un message d'erreur concernant l'absence de modules comme celui-ci,
    
    ![(erreur pnpm start)](img/ErreurPnpm_start1.png)
    
    lancez `pnpm i` ou bien `pnpm update` pour mettre à jour certains modules, puis refaites `pnpm start`.

8. Enregistrer régulièrement son travail et faire un **commit** à chaque étape du projet en [respectant la syntaxe](#syntaxe_commit) : faire `git add .` la première fois pour ajouter le nouveau fichier aux fichiers suivis puis **commit** à chaque étape avec `git commit -am "ex: Ajout de 4A10 Reconnaître un nombre premier"`[(GitKraken)](img/GitKraken-4.png) (si cet écran n'apparaît pas, le faire apparaître [comme ceci](img/GitKraken-3.png))
9.  Le partager avec les autres : `git push origin nomDeLaBranche` (GitKraken [Partie 1](img/GitKraken-5.png) [Partie 2](img/GitKraken-6.png))
10. Une fois l'exercice terminé, faire un **Pull Request** via [github](https://github.com/mathalea/mathalea/branches) ou son interface graphique préférée (GitKraken [Partie 1](img/GitKraken-7.png) [Partie 2](img/GitKraken-8.png)).

## <a id="modeles" href="#modeles">2. Modèles présents dans le dossier`src/js/exercices/beta`</a>
- betaModele00_simple_Course_au_Nombres
- betaModèle10_simple_question-reponse
- betaModèle11_paramétrable (simple question-reponse paramétrable)
- betaModèle20_plusieurs_types_de_questions
- betaModèle21_paramétrables (plusieurs questions paramétrables)
- betaModèle30_constructions_géométriques
- betaModèle31_paramétrables (constructions géométriques paramétrables)
- betaModèle32_cliqueFigure
- betaModèle40_tableau_proportionnalite
- betaModèle41_tableau_signes_variations
Pour rentre un des modèles interactif, consulter le guide [Rendre_un_exercice_interactif_simple](https://coopmaths.fr/documentation/tutorial-Rendre_un_exercice_interactif_simple.html) dans le panneau de gauche

## <a id="syntaxe_commit" href="#syntaxe_commit">3. Syntaxe des commit à respecter</a>
Afin d'avoir un changelog (notes de mises à jour) généré automatiquement, chaque **commit** doit être correctement préfixé.

Le nom de chaque **commit** doit commencer par un mot clé suivi immédiatement par deux points (sans espace).

Les mots clés sont les suivants :
- `ex:` pour signaler l'ajout d’un exercice
- `fix:` pour signaler la réparation d’un bug
- `feat:` pour signaler l'ajout d’une fonctionnalité
- `chore:` pour signaler une modification du moteur
- `docs:` pour signaler une mise à jour de la documentation
- `lint:` pour signaler une amélioration “esthétique” du code
- `perf:` pour signaler une amélioration des performances
- `style:` pour signaler une amélioration visuelle ou typographique

## <a id="programmer_un_exercice" href="#programmer_un_exercice">4. Programmer un exercice</a> 
Un exercice est un objet de la classe Exercice (d'où le `import Exercice` en début de fichier et le `Exercice.call` au début de la fonction exportée).
Il a plusieurs [attributs](#11) (son titre, son énoncé, sa correction...) et a une fonction `nouvelleVersion()` qui crée un énoncé aléatoire.

On peut partager le code en 3 parties :
1. l'en-tête (juqu'à la ligne `export default function ...`)
2. le paramétrage des valeurs par défaut (jusqu'à la ligne `this.nouvelleVersion = function () {`)
3. le code de l'exercice en lui-même (l'intérieur de la fonction `nouvelleVersion()`)

![](img/Structure-exo.png)

### <a id="en-tete" href="#en-tete">4. 1. L'en-tête</a>
```javascript
import Exercice from '../Exercice.js' // Un exercice commence toujours pas cette ligne. Elle sert à importer la classe Exercice avec tous ses attributs qu'on modifiera dans la deuxième partie
import { listeQuestionsToContenu, randint } from '../../modules/outils.js' // On peut ensuite importer d'autres choses. outils.js regorge de fonctions très utiles déjà créées par d'autres avant vous ! Si vous avez besoin de faire quelque chose, jetez-y un oeil ! Quelqu'un l'a déjà probablement fait pour vous !
// Cherchez randint dans la barre de recherche en haut à gauche de cette page pour voir ce que peut bien faire cette fonction ?
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js' // Dans notre cas, on importe le nécessaire pour rendre un exercice interactif

export const titre = 'Ajouter 9'   // Après les importations, on exporte le titre de notre exercice.
export const amcReady = true // Si on prévoit une sortie AMC (Auto Multiple Choice), on écrit cette ligne
export const interactifReady = true // Si on prévoit que notre exercice soit interactiv, on écrit cette ligne
export const interactifType = 'numerique' // On précise le type d'interactivité
export const amcType = 'AMCNum' // Ainsi que le type d'AMC

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9 // On décrit ensuite ce que fera notre exercice,
 * @author Rémi Angot                              // on précise l'auteur,
 * Référence CM005                                 // la référence de l'exercice, 
*/
export default function Ajouter9 () { // On clôture cette première partie par exporter la fonction par défaut qui contiendra le reste du code.
```
### <a id="parametrage_valeurs_par_defaut" href="#parametrage_valeurs_par_defaut">4. 2. Le paramétrage des valeurs par défaut</a>
``` javascript
  Exercice.call(this) // La deuxième partie commence toujours par cette ligne pour récupérer toutes les propriétés de la classe Exercice.
  this.consigne = 'Calculer' // On définit alors les valeurs par défaut de notre exercice comme la consigne,
  this.nbQuestions = 10      // ou encore le nombre de questions par défaut.
  // L'ensemble des attributs disponibles ainsi que leur réglage par défaut sont dans src/js/exercices/Exercice.js et ci-dessous dans la partie "Attributs des exercices".

  this.nouvelleVersion = function (numeroExercice) { // Le paramétrage des valeurs par défaut se termine par cette ligne qui signe le début de la programmation de l'exercice en lui-même !
```
### <a id="code_de_lexercice" href="#code_de_lexercice">4. 3. Le code de l'exercice en lui-même</a>
``` javascript
    this.listeQuestions = []   // On commence par créer les emplacements qui vont contenir toutes les questions,
    this.listeCorrections = [] // et les corrections.

    for (let i = 0, texte, texteCorr, a, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on déclare les variables utilisées dans la boucle
	  // i correspond au numéro de la question -1
	  // cpt est un compteur de fois où on génère une question déjà posée
	  // pour éviter une boucle infinie, on limite à 50 le nombre d'essais pour générer une question jamais posée
      a = randint(0, 9) * 10 + randint(1, 9) // on choisit un nombre au hasard qui a entre 0 et 9 comme chiffre des dizaines et entre 1 et 9 comme chiffre des unités
      texte = `$ ${a} + 9 = $` // Énoncé
      // Dans une chaîne de caractères délimitée par des accents graves ` on peut lire le contenu de variables en utilisant ${ }
      // On peut aussi intéger du LateX en encadrant notre code LateX par des symboles $ et en prenant soin de double les \
      // Dans cette ligne, on utilise du LateX pour afficher "le contenu de la variable a + 9 = "
      texteCorr = `$ ${a} + 9 = ${a + 9} $` // Correction
      setReponse(this, i, a + 9) // Cette ligne sert à paramétrer la réponse attendue dans la version interactive ou la sortie AMC.
      if (this.interactif) texte += ajouteChampTexte(this, i) // Si c'est la version interactive, on ajoute un champ texte.
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, a)) { // <- ici, la seule variable qui diffère est a
        this.listeQuestions.push(texte)                // si c'est le cas, on ajoute l'énoncé,
        this.listeCorrections.push(texteCorr)          // et la correction.
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
```
**Remarque :**
L'extension ESLint permet de repérer les erreurs et améliorer la mise en forme de votre document (avec les règles de [StandardJS](https://standardjs.com)). Voir Affichages > Problèmes pour une description des erreurs et `CTRL+MAJ+P` ou `CMD+MAJ+P` puis `ESLint: Fix all auto-fixable Problems` pour améliorer la typographie et le style de votre code.

### <a id="exercice_complet" href="#exercice_complet">4. 4. L'exercice complet dont le résultat est visible sur [http://coopmaths.fr/exCM005](http://coopmaths.fr/exCM005)</a>
Essayez de voir si vous le comprenez ! En cas de besoin, vous pouvez remonter pour voir les commentaires ;)
```js
import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'

export const titre = 'Ajouter 9'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'numerique'
export const amcType = 'AMCNum'

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @author Rémi Angot
 * Référence CM005
*/
export default function Ajouter9 () {
  Exercice.call(this)
  this.consigne = 'Calculer'
  this.nbQuestions = 10

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []

    for (let i = 0, texte, texteCorr, a, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(0, 9) * 10 + randint(1, 9)
      texte = `$ ${a} + 9 = $`
      texteCorr = `$ ${a} + 9 = ${a + 9} $`
      setReponse(this, i, a + 9)
      if (this.interactif) texte += ajouteChampTexte(this, i)
      if (this.questionJamaisPosee(i, a)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
```

### <a id="exercice_plusieurs_questions" href="#exercice_plusieurs_questions">4. 5. Exemple d'un exercice avec plusieurs types de questions visible sur [http://coopmaths.fr/ex6C30](http://coopmaths.fr/ex6C30)</a>
```js
this.nouvelleVersion = function(){
  this.listeQuestions = []
  this.listeCorrections = []

  let typeDeQuestionsDisponibles = [1,2,3,4] // À noter que l'on aurait pu faire [1,1,1,2] pour avoir 3 questions de type 1 et 1 question de type 2
  let listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

  for (let i = 0, texte, texteCorr, cpt=0, a, b; i < this.nbQuestions && cpt<50; ) {
    typeDeQuestions = listeTypeDeQuestions[i];
    switch (typeDeQuestions){ // Cas par cas, on définit le type de nombres que l'on souhaite
                              // Combien de chiffres ? Quelles valeurs ?
      case 1 : // xxx * xx,x chiffres inférieurs à 5
        a = randint(2,5)*100+randint(2,5)*10+randint(2,5) // Il n'y a que des entiers JS gèrera très bien le calcul
        b = calcul(randint(2,5)*10+randint(2,5)+randint(2,5)/10) // Dès qu'il y a des nombres décimaux JS peut faire des erreurs d'où l'utilisation de la fonction calcul qui s'appuiera sur Algebrite
        break ;
      case 2 : // xx,x * x,x 
        a = calcul(randint(2,9)*10+randint(2,9)+randint(2,9)/10)
        b = calcul(randint(6,9)+randint(6,9)/10)
        break ;
      case 3 : // x,xx * x0x 
        a = calcul(randint(2,9)+randint(2,9)/10+randint(2,9)/100)
        b = calcul(randint(2,9)*100+randint(2,9))
        break ;
      case 4 : // 0,xx * x,x 
        a = calcul(randint(2,9)/10+randint(2,9)/100)
        b = calcul(randint(2,9)+randint(2,9)/10)
        break ;
    }
    texte = `$${texNombre(a)}\\times${texNombre(b)}$` // Les nombres étant définis, il ne reste plus qu'à écrire l'énoncé
    texteCorr = `$${texNombre(a)}\\times${texNombre(b)}=${texNombre(a*b)}$` // et la correction
    if (this.questionJamaisPosee(i, a, b)) {
      this.listeQuestions.push(texte);
      this.listeCorrections.push(texteCorr);
      i++;
    }
    cpt++;	
  }
  listeDeQuestionToContenu(this);
}
```

## <a id="latex_ou_html" href="#latex_ou_html">5. Exercice LaTeX ou exercice HTML ?</a>
Les exercices peuvent être affichés dans le navigateur sous forme classique [https://coopmaths.fr/mathalea.html](https://coopmaths.fr/mathalea.html) ou compilés en pdf à partir des sources en LaTeX [https://coopmaths.fr/mathalea.html?v=latex](https://coopmaths.fr/mathalea.html?v=latex).

Un booléen `context.isHtml` est défini sur chaque page qui utilise MathALEA car tous les codes LaTeX ne peuvent pas être affichés dans les navigateurs par KaTeX (voir les [limitations](https://katex.org/docs/supported.html)). Suivant la valeur de ce booléen le code LaTeX pourra être différent.

## <a id="variante" href="#variante">6. Variante des exercices</a>
Afin de pouvoir appeler un exercice avec une modification (de son niveau de difficulté, de son titre...), on peut en définir une variante.

Le code ci-dessous permet par exemple d'intégrer l'exercice 3A11 en 4ème sous la référence 4A10 avec le paramètres `sup2 = false` et en conservant l'interactivité et l'exportabilité AMC.
```js
import PremierOuPas from '../3e/3A11.js'
export const titre = 'Nombre premier ou pas'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3A11.js'

/**
 * @author Guillaume Valmont
 * reference 4A10
 */
export default function PremierOuPas4e () {
  PremierOuPas.call(this)
  this.titre = titre
  this.sup2 = false
}

```

## <a id="liste_exhaustive_attributs" href="#liste_exhaustive_attributs">7. Liste exhaustive des attributs des exercices</a>
#### <a id="attributs_autour_de_lexercice" href="#attributs_autour_de_lexercice">7. 1. Autour de l'exercice</a>
``` javascript
  this.titre = '' // Chaîne de caractère sans point à la fin. C'est le titre de l'exercice qui sera affiché avec la référence dans le générateur d'exercices.
  this.boutonAide = false // Bouton en haut à droite des questions permettant d'afficher un pdf, texte, image, vidéo, contenu d'un autre site en "pop-up" via les fonctions modalXXXXXXX de outils.js.
  // Ci-dessous des exemples d'utilisation du this.boutonAide.
  // Noter que pour récupérer le numeroExercice dont il est question, au lieu d'écrire "this.nouvelleVersion = function () {" comme d'habitude, on écrit "this.nouvelleVersion = function (numeroExercice) {".
  // this.boutonAide = modalImage(numeroExercice, urlImage, titre, labelBouton = 'Illustration', icone = 'image')
  // this.boutonAide = modalPdf(numeroExercice, urlPdf, titre='Aide', labelBouton = 'Aide - PDF', icone = 'file pdf')
  // this.boutonAide = modalTexteCourt(numeroExercice, texte, labelBouton = 'Aide', icone = 'info circle')
  // this.boutonAide = modalTexteLong(numeroExercice, titre, texte, labelBouton = 'Aide', icone = 'info circle')
  // this.boutonAide = modalUrl(numeroExercice, url, labelBouton = 'Aide', icone) pour afficher le contenu de url dans un iframe
  // this.boutonAide = modalVideo(numeroExercice, urlVideo, titre, labelBouton, icone)
  // this.boutonAide = modalYoutube(numeroExercice, idYoutube, titre, labelBouton = 'Aide - Vidéo', icone = 'youtube')
```
#### <a id="attributs_construction_de_lexercice" href="#attributs_construction_de_lexercice">7. 2. Construction de l'exercice</a>
``` javascript
  this.consigne = '' // Chaîne de caractère qui apparaît en gras au-dessus des questions de préférence à l'infinitif et sans point à la fin.
  this.consigneCorrection = '' // Chaîne de caractère en général vide qui apparaît au-dessus des corrections.
  this.introduction = '' // Texte qui n'est pas forcément en gras et qui apparaît entre la consigne et les questions.
  this.listeQuestions = [] // Liste de chaînes de caractères avec chacune correspondant à une question. Chaque question est définie par la méthode this.nouvelleVersion puis `listeDeQuestionToContenu(this)` mettra en forme `this.contenu` et `this.contenuCorrection` suivant `context` (sortie HTML ?...)
  this.listeCorrections = [] // Idem avec la correction.
  this.contenu = '' // Chaîne de caractères avec tout l'énoncé de l'exercice construit à partir de `this.listeQuestions` suivant le `context`
  this.contenuCorrection = '' // Idem avec la correction
  this.autoCorrection = [] // Liste des objets par question pour correction interactive || export AMC.
  this.tableauSolutionsDuQcm = [] // Pour sauvegarder les solutions des QCM.
```
#### <a id="attributs_mise_en_forme_de_lexercice" href="#attributs_mise_en_forme_de_lexercice">7. 3. Mise en forme de l'exercice</a>
``` javascript
  this.spacing = 1 // Interligne des questions
  this.spacingCorr = 1 // Interligne des réponses
```
#### <a id="attributs_sortie_latex" href="#attributs_sortie_latex">7. 4. Gestion de la sortie LateX</a>
``` javascript
  this.pasDeVersionLatex = false // booléen qui indique qu'une sortie LateX est impossible.
  this.listePackages = [] // string ou liste de string avec le nom des packages spécifiques à ajouter dans le préambule.
  this.consigneModifiable = true // booléen pour déterminer si la consigne est modifiable en ligne dans la sortie LaTeX. (&v=latex)
  this.nbQuestionsModifiable = true // booléen pour déterminer si le nombre de questions est modifiable en ligne dans la sortie LateX. (&v=latex)
  this.nbCols = 2 // Nombre de colonnes pour la sortie LaTeX des questions (environnement multicols).
  this.nbColsCorr = 2 // Nombre de colonnes pour la sortie LaTeX des réponses (environnement multicols).
  this.nbColsModifiable = true // booléen pour déterminer si le nombre de colonnes est modifiable en ligne dans la sortie LaTeX. (&v=latex)
  this.nbColsCorrModifiable = true // booléen pour déterminer si le nombre de colonnes de la correction est modifiable en ligne dans la sortie LaTeX. (&v=latex)
  this.spacingModifiable = true // booléen pour déterminer si l'espacement est modifiable en ligne dans la sortie LaTeX. (&v=latex)
  this.spacingCorrModifiable = true // booléen pour déterminer si l'espacement est modifiable en ligne dans la sortie LaTeX. (&v=latex)
  // this.vspace = -1 //Ajoute un \vspace{-1cm} avant l'énoncé ce qui peut être pratique pour des exercices avec des figures.
```
#### <a id="attributs_sortie_autre_que_latex" href="#attributs_sortie_autre_que_latex">7. 5. Gestion de la sortie autre que LateX</a>
``` javascript
  this.beamer = false // booléen pour savoir si la sortie devra être un diaporama beamer
  this.tailleDiaporama = 1 // Facteur par lequel multiplier la police pour la vue 'diap'
```
#### <a id="attributs_parametres" href="#attributs_parametres">7. 6. Paramètres</a>
``` javascript
  this.nbQuestions = 10 // Nombre de questions par défaut (récupéré dans l'url avec le paramètre `,n=`)
  this.correctionDetailleeDisponible = false // booléen qui indique si une correction détaillée est disponible.
  this.correctionDetaillee = true // booléen indiquant si la correction détaillée doit être affiché par défaut (récupéré dans l'url avec le paramètre `,cd=`).
  this.video = '' // Chaine de caractère pour un complément numérique (id Youtube, url, code iframe...).
  // Interactivité
  this.interactif = false // Exercice sans saisie utilisateur par défaut.
  this.interactifObligatoire = false // Certains exercices sont uniquement des QCM et n'ont pas de version non interactive.
  // Ajoute un formulaire de paramétrage par l'utilisateur récupéré via this.sup ou dans le paramètre d'url ',s='
  this.besoinFormulaireNumerique = false // Sinon this.besoinFormulaireNumerique = [texte, max, tooltip facultatif]
  this.besoinFormulaireTexte = false // Sinon this.besoinFormulaireTexte = [texte, tooltip]
  this.besoinFormulaireCaseACocher = false // Sinon this.besoinFormulaireCaseACocher = [texte]
  // Ajoute un formulaire de paramétrage par l'utilisateur récupéré via this.sup2 ou dans le paramètre d'url ',s2='
  this.besoinFormulaire2Numerique = false // Sinon this.besoinFormulaire2Numerique = [texte, max, tooltip facultatif]
  this.besoinFormulaire2Texte = false // Sinon this.besoinFormulaire2Texte = [texte, tooltip]
  this.besoinFormulaire2CaseACocher = false // Sinon this.besoinFormulaire2CaseACocher = [texte]
  // Ajoute un formulaire de paramétrage par l'utilisateur récupéré via this.sup3 ou dans le paramètre d'url ',s3='
  this.besoinFormulaire3Numerique = false // Sinon this.besoinFormulaire3Numerique = [texte, max, tooltip facultatif]
  this.besoinFormulaire3Texte = false // Sinon this.besoinFormulaire3Texte = [texte, tooltip]
  this.besoinFormulaire3CaseACocher = false // Sinon this.besoinFormulaire3CaseACocher = [texte]
  // Ajoute un formulaire de paramétrage par l'utilisateur récupéré via this.sup4 ou dans le paramètre d'url ',s4='
  this.besoinFormulaire4Numerique = false // Sinon this.besoinFormulaire4Numerique = [texte, max, tooltip facultatif]
  this.besoinFormulaire4Texte = false // Sinon this.besoinFormulaire4Texte = [texte, tooltip]
  this.besoinFormulaire4CaseACocher = false // Sinon this.besoinFormulaire4CaseACocher = [texte]

```
#### <a id="dependances_particulieres" href="#dependances_particulieres">7. 7. Exercice avec des dépendances particulières</a>
``` javascript
  // this.typeExercice = 'MG32' // Pour charger MathGraph32.
  this.mg32Editable = false // Les figures MG32 ne sont pas interactives par défaut.
  // this.dimensionsDivMg32 = [500, 450] // Dimensions du SVG créé par MathGraph32.
  // this.typeExercice = 'Scratch' // Pour charger Scratchblocks.
  // this.typeExercice = 'IEP' // Pour charger InstrumEnPoche.
  // this.typeExercice = 'dnb' // Ce n’est pas un exercice aléatoire il est traité différemment. Les exercices DNB sont des images pour la sortie Html et du code LaTeX statique pour la sortie latex.
  // this.typeExercice = 'XCas' // Pour charger le JavaScript de XCas qui provient de https://www-fourier.ujf-grenoble.fr/~parisse/giac_fr.html
  // this.typeExercice = 'simple' // Pour les exercices plus simples destinés aux courses aux nombres

  this.listeArguments = [] // Variable servant à comparer les exercices pour ne pas avoir deux exercices identiques
```
## <a id="liste_exhaustive_fonctions" href="#liste_exhaustive_fonctions">8. Liste exhaustive des fonctions des exercices</a>
``` javascript
  /**
   * Fonction qui est appellée pour chaque exercice
   * @param {number} numeroExercice numéro de l'exercice utilisé pour avoir des identifiants uniques pour associer un champ avec le bon exercice (pour l'interactivité par exemple)
   */
  this.nouvelleVersion = function (numeroExercice) {}

  /**
   * Compare chaque nouvelle version d'un exercice aux précédentes pour s'assurer de ne pas avoir deux exercices identiques
   * @param {int} i indice de la question
   * @param  {...any} args toutes les variables pertinentes qui "résumeraient" la question
   * @returns {boolean} true si la question n'a jamais été posée
   */
  this.questionJamaisPosee = function (i, ...args) {}
```