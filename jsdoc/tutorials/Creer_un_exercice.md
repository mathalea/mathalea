Ce tutoriel vous donnera les clés pour créer la grande majorité des exercices.

Si vous ne voulez pas d'un truc trop lourd et voulez apporter votre contribution avec un moindre effort, vous pouvez aussi regarder comment ajouter des questions à une [Course aux Nombres](https://coopmaths.fr/documentation/tutorial-Course_aux_nombres.html) !
# <a id="1" href="#1">#</a> Comment créer un exercice en 10 étapes
Toutes les commandes qui commencent par `git` peuvent aussi être faites par une interface graphique (VSC, GitKraken ou GitHub Desktop).
Il n'y a pas d'interférence entre eux donc vous pouvez sans problème faire certaines étapes en lignes de commande et d'autres avec une interface graphique c'est comme vous préférez.

Les interfaces graphiques peuvent être plus faciles à prendre en main et permettent de faire très facilement des tâches très compliquées.

Les lignes de commande nécessitent des "anti-sèches" au début mais ont les avantages d'avoir la même "interface" pour tout le monde et d'être "bavardes" en cas de problème, ce qui facilite grandement les échanges et les dépannages entre nous. D'autant plus qu'en cliquant sur [Utiliser_git_en_ligne_de_commandes](https://coopmaths.fr/documentation/tutorial-Utiliser_git_en_ligne_de_commandes.html) dans menu de gauche, vous aurez accès à des anti-sèches et à des solutions à différents messages d'erreur que vous pouvez rencontrer !

1. Commencer par se placer sur le master et le mettre à jour : saisir `git checkout master` puis `git pull` dans un terminal.
2. Trouver à quelle [référence](https://coopmaths.fr/pdf/CoopMaths-Referentiel.pdf) l'exercice qu'on veut créer peut être rattaché.
3. Créer une nouvelle branche en partant d'une copie du master et en respectant la syntaxe NomDeLaPersonne-ReferenceDeLExercice-PrecisionEventuelle : `git checkout -b Nom-Reference-Precision`
4. Copier l'un des [modèles](#2) présents dans le dossier `src/js/exercices/_Modèles_d'exercices`, le renommer avec la bonne [référence](https://coopmaths.fr/pdf/CoopMaths-Referentiel.pdf) et le placer dans le dossier du niveau correspondant. (Si un exercice avec cette référence existe déjà, ajouter un tiret et incrémenter. Par exemple, si je veux créer 5A11 et qu'un exercice 5A11 existe déjà, je le nomme 5A11-1 et si 5A11-1 existe déjà, je le nomme 5A11-2 etc.)
5. Modifier les informations servant au référencement (dans les premières lignes du fichier, de l'export du titre à l'export de la fonction)
6. Enregistrer puis lancer `pnpm build:dicos` dans un terminal pour ajouter son exercice à la liste des exercices (il faudra le refaire si vous changez le nom du fichier, le titre ou l'un de ces paramètres : amcReady, amcType, interactifReady, interactifType)
7. Le [programmer](#3) et le tester en lançant dans un terminal `pnpm start` (Attention à ne pas oublier de modifier la ligne `if (this.questionJamaisPosee(i, a, b, c, d)` à la fin du fichier en fonction des données de l'énoncé, sinon le `pnpm start` ne fonctionnera pas).
8. Enregistrer régulièrement son travail et faire un **commit** à chaque étape du projet : faire `git add .` la première fois pour ajouter le nouveau fichier aux fichiers suivis puis **commit** à chaque étape avec `git commit -am "Premier niveau de difficulté"`
9. Le partager avec les autres : `git push origin nomDeLaBranche`
10. Une fois l'exercice terminé, faire un **Pull Request** via [github](https://github.com/mathalea/mathalea/branches) ou son interface graphique préférée (GitKraken ou GitHub Desktop).

## <a id="2" href="#2">#</a> Modèles présents dans le dossier`src/js/exercices/beta`
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
## <a id="3" href="#3">#</a> Programmer un exercice
Un exercice est un objet de la classe Exercice (d'où le `import Exercice` en début de fichier et le `Exercice.call` au début de la fonction exportée).
Il a plusieurs [attributs](#11) (son titre, son énoncé, sa correction...) et a une fonction `nouvelleVersion()` qui crée un énoncé aléatoire.

On peut partager le code en 3 parties :
1. l'en-tête (juqu'à la ligne `export default function ...`)
2. le paramétrage des valeurs par défaut (jusqu'à la ligne `this.nouvelleVersion = function () {`)
3. le code de l'exercice en lui-même (l'intérieur de la fonction `nouvelleVersion()`)

![](img/Structure-exo.png)

### <a id="4" href="#4">#</a> 1. L'en-tête
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
 * 01/01/2021                                      // et la date de publication une fois l'exercice publié !
*/
export default function Ajouter9 () { // On clôture cette première partie par exporter la fonction par défaut qui contiendra le reste du code.
```
### <a id="5" href="#5">#</a> 2. Le paramétrage des valeurs par défaut
``` javascript
  Exercice.call(this) // La deuxième partie commence toujours par cette ligne pour récupérer toutes les propriétés de la classe Exercice.
  this.consigne = 'Calculer' // On définit alors les valeurs par défaut de notre exercice comme la consigne,
  this.nbQuestions = 10      // ou encore le nombre de questions par défaut.
  // L'ensemble des attributs disponibles ainsi que leur réglage par défaut sont dans src/js/exercices/Exercice.js et ci-dessous dans la partie "Attributs des exercices".

  this.nouvelleVersion = function (numeroExercice) { // Le paramétrage des valeurs par défaut se termine par cette ligne qui signe le début de la programmation de l'exercice en lui-même !
```
### <a id="6" href="#6">#</a> 3. Le code de l'exercice en lui-même
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

## <a id="7" href="#7">#</a> L'exercice complet dont le résultat est visible sur [http://coopmaths.fr/exCM005](http://coopmaths.fr/exCM005)
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
 * 01/01/2021
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

## <a id="8" href="#8">#</a> Exemple d'un exercice avec plusieurs types de questions visible sur [http://coopmaths.fr/ex6C30](http://coopmaths.fr/ex6C30)
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

## <a id="9" href="#9">#</a> Exercice LaTeX ou exercice HTML ?
Les exercices peuvent être affichés dans le navigateur (sous forme classique <https://coopmaths.fr/mathalea.html> ou en diaporama chronométré <https://coopmaths.fr/cm.html>) ou compilés en pdf à partir des sources en LaTeX (<https://coopmaths.fr/mathalealatex.html>).

Un booléen `context.isHtml` est défini sur chaque page qui utilise MathALEA car tous les codes LaTeX ne peuvent pas être affichés dans les navigateurs par KaTeX (voir les [limitations](https://katex.org/docs/supported.html)). Suivant la valeur de ce booléen le code LaTeX pourra être différent.

## <a id="10" href="#10">#</a> Variante des exercices
Afin de pouvoir appeler un exercice avec une modification (de son niveau de difficulté, de son titre...), on peut en définir une variante.

Le code ci-dessous permet par exemple d'intégrer l'exercice 5S12 en 4ème sous la référence 4S10 avec les paramètres `sup = 3`, `sup2 = 2` et `sup3 = 1`.
```js
import ConstruireUnDiagramme from '../5e/5S12.js'
export const titre = 'Construire un diagramme'

/**
 * @author Guillaume Valmont
 * reference 4S10
 */
export default function ConstruireUnDiagramme4e () {
  ConstruireUnDiagramme.call(this)
  this.titre = titre
  this.sup = 3
  this.sup2 = 2
  this.sup3 = 1
  
}
```

## <a id="11" href="#11">#</a> Liste exhaustive des attributs des exercices
#### <a id="12" href="#12">#</a> Autour de l'exercice
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
#### <a id="13" href="#13">#</a> Construction de l'exercice
``` javascript
  this.consigne = '' // Chaîne de caractère qui apparaît en gras au-dessus des questions de préférence à l'infinitif et sans point à la fin.
  this.consigneCorrection = '' // Chaîne de caractère en général vide qui apparaît au-dessus des corrections.
  this.introduction = '' // Texte qui n'est pas forcément en gras et qui apparaît entre la consigne et les questions.
  this.listeQuestions = [] // Liste de chaînes de caractères avec chacune correspondant à une question. Chaque question est définie par la méthode this.nouvelleVersion puis `listeDeQuestionToContenu(this)` mettra en forme `this.contenu` et `this.contenuCorrection` suivant `context` (sortie HTML ? diaporama ?...)
  this.listeCorrections = [] // Idem avec la correction.
  this.contenu = '' // Chaîne de caractères avec tout l'énoncé de l'exercice construit à partir de `this.listeQuestions` suivant le `context`
  this.contenuCorrection = '' // Idem avec la correction
  this.autoCorrection = [] // Liste des objets par question pour correction interactive || export AMC.
  this.tableauSolutionsDuQcm = [] // Pour sauvegarder les solutions des QCM.
```
#### <a id="14" href="#14">#</a> Mise en forme de l'exercice
``` javascript
  this.spacing = 1 // Interligne des questions
  this.spacingCorr = 1 // Interligne des réponses
```
#### <a id="15" href="#15">#</a> Gestion de la sortie LateX
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
#### <a id="16" href="#16">#</a> Gestion de la sortie autre que LateX
``` javascript
  this.beamer = false // booléen pour savoir si la sortie devra être un diaporama beamer
  this.tailleDiaporama = 50 // Taille en pixels pour le calcul chronométré.
```
#### <a id="17" href="#17">#</a> Paramètres
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
#### <a id="18" href="#18">#</a> Exercice avec des dépendances particulières
``` javascript
  // this.typeExercice = 'MG32' // Pour charger MathGraph32.
  this.mg32Editable = false // Les figures MG32 ne sont pas interactives par défaut.
  // this.dimensionsDivMg32 = [500, 450] // Dimensions du SVG créé par MathGraph32.
  // this.typeExercice = 'Scratch' // Pour charger Scratchblocks.
  // this.typeExercice = 'IEP' // Pour charger InstrumEnPoche.
  // this.typeExercice = 'dnb' // Ce n’est pas un exercice aléatoire il est traité différemment. Les exercices DNB sont des images pour la sortie Html et du code LaTeX statique pour la sortie latex.
  // this.typeExercice = 'XCas' // Pour charger le JavaScript de XCas qui provient de https://www-fourier.ujf-grenoble.fr/~parisse/giac_fr.html
```
