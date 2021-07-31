# Comment créer un exercice en 10 étapes
Toutes les commandes qui commencent par `git` peuvent aussi être faites par une interface graphique (VSC, GitKraken ou GitHub Desktop).
Il n'y a pas d'interférence entre eux donc vous pouvez sans problème faire certaines étapes en lignes de commande et d'autres avec une interface graphique c'est comme vous préférez.
1. Commencer par se placer sur le master et le mettre à jour : saisir `git checkout master` puis `git pull` dans un terminal.
2. Trouver à quelle [référence](https://coopmaths.fr/pdf/CoopMaths-Referentiel.pdf) l'exercice qu'on veut créer peut être rattaché.
3. Créer une nouvelle branche en partant d'une copie du master et en respectant la syntaxe NomDeLaPersonne-ReferenceDeLExercice-PrecisionEventuelle : `git checkout -b Nom-Reference-Precision`
4. Copier l'un des [modèles](#Modèles) présents dans le dossier `src/js/exercices/_Modèles_d'exercices`, le renommer avec la bonne [référence](https://coopmaths.fr/pdf/CoopMaths-Referentiel.pdf) et le placer dans le dossier du niveau correspondant. (Si un exercice avec cette référence existe déjà, ajouter un tiret et incrémenter. Par exemple, si je veux créer 5A11 et qu'un exercice 5A11 existe déjà, je le nomme 5A11-1 et si 5A11-1 existe déjà, je le nomme 5A11-2 etc.)
5. Modifier les informations servant au référencement (dans les premières lignes du fichier, de l'export du titre à l'export de la fonction)
6. Lancer `pnpm build:dicos` dans un terminal pour ajouter son exercice à la liste des exercices (il faudra le refaire si vous changez le nom du fichier, le titre ou l'un de ces paramètres : amcReady, amcType, interactifReady, interactifType)
7. Le [programmer](#Programmer) et le tester en lançant dans un terminal `pnpm start`
8. Enregistrer régulièrement son travail et faire un **commit** à chaque étape du projet : `git commit -am "Premier niveau de difficulté"`
9. Le partager avec les autres : `git push origin nomDeLaBranche`
10. Une fois l'exercice terminé, faire un **Pull Request** via [github](https://github.com/mathalea/mathalea/branches) ou son interface graphique préférée (GitKraken ou GitHub Desktop).

## <a id="Modèles"></a> Modèles présents dans le dossier`src/js/exercices/_Modèles_d'exercices`
**A MODIFIER**
- src/js/beta/betaExemple1Type.js // Un même type de question répété 
- src/js/beta/betaExemple.js // Les questions peuvent être très différentes et leur nombre est fixé
- src/js/beta/betaExemple1TypeCalculLettre.js // Un même type de question répété  mais présenté A=..., B=...
- src/js/beta/betaExemple3Types.js // On créé 3 types de questions  qui seront alternés (et que l'on peut pondérer)

## <a id="Programmer"></a> Programmer_un_exercice
Un exercice est un objet de la classe Exercice (d'où le `import Exercice` en début de fichier et le `Exercice.call` au début de la fonction exportée).
Il a plusieurs [attributs](#Attributs) (son titre, son énoncé, sa correction...) et a une fonction `nouvelleVersion()` qui crée un énoncé aléatoire.

On peut partager le code en 3 parties :
1. l'en-tête (juqu'à la ligne `export default function ...`)
2. le paramétrage des valeurs par défaut (jusqu'à la ligne `this.nouvelleVersion = function () {`)
3. le code de l'exercice en lui-même (l'intérieur de la fonction `nouvelleVersion()`)
**AJOUTER UNE CAPTURE D'ÉCRAN COMMENTÉE**

### 1. L'en-tête
```javascript
import Exercice from '../Exercice.js' // Un exercice commence toujours pas cette ligne. Elle sert à importer la classe Exercice avec tous ses attributs qu'on modifiera dans la deuxième partie
import { randint, texSymbole } from '../../modules/outils.js' // On peut ensuite importer d'autres choses. outils.js regorge de fonctions très utiles déjà créées par d'autres avant vous ! Si vous avez besoin de faire quelque chose, jetez-y un oeil ! Quelqu'un l'a déjà probablement fait pour vous ! Cherchez texSymbole dans la barre de recherche en haut à gauche de cette page pour voir ce que peut bien faire cette fonction ?

export const titre = 'Résoudre une inéquation produit'  // Après les importations, on exporte le titre de notre exercice.

/**
 * Résoudre une inéquation produit                      // On décrit ensuite ce que fera notre exercice,
 * * Type 1 : (x+a)(x+b)<0
 * * Type 2 : (x+a)(x+b)(x+c)<0
 * * Type 3 : (ax+b)(cx+d)<0
 * * Type 4 : (ax+b)(cx+d)(ex+f)<0
 * * Type 5 : (ax+b)²(cx+d)<0
 * * Tous les types
 * @author Guillaume Valmont                            // on précise l'auteur,
 * 2L14-1                                               // la référence de l'exercice,
 * 17/07/2021                                           // et la date de publication une fois l'exercice publié !
 */
export default function ExerciceInequationProduit () {  // On clôture cette première partie par exporter la fonction par défaut qui contiendra le reste du code.
```
### 2. Le paramétrage des valeurs par défaut
``` javascript
  Exercice.call(this) // La deuxième partie commence toujours par cette ligne pour récupérer toutes les propriétés de la classe Exercice.
  this.consigne = 'Résoudre les inéquations suivantes' // On définit alors les valeurs par défaut de notre exercice,
  this.nbQuestions = 1 // comme par exemple le nombre de questions par défaut.
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'] // On peut aussi intégrer un paramètre modifiable par l'utilisateur !
  // L'ensemble des attributs disponibles ainsi que leur réglage par défaut sont dans src/js/exercices/Exercice.js et ci-dessous dans la partie "Attributs des exercices".
  this.nouvelleVersion = function () { // Le paramétrage des valeurs par défaut se termine par cette ligne qui signe le début de la programmation de l'exercice en lui-même !
```
### 3. Le code de l'exercice en lui-même
``` javascript
    this.listeQuestions = [] // On commence par créer les emplacements qui vont contenir toutes les questions et les réponses.
    this.listeCorrections = []
    const typeQuestionsDisponibles = ['type1', 'lapin', 'type3'] // Dans cet exemple, on va programmer trois types de questions disponibles.
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Cette ligne très utile permet que tous les types de questions soient posés mais à chaque fois dans un ordre différent !
    for (let i = 0, texte, texteCorr, difficulte, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Laissez cette ligne telle quelle où i+1 correspond au numéro de la question.
      if (this.sup.toString() === '1') {
        difficulte = 'facile'
      } else if (this.sup.toString() === '2') {
        difficulte = 'difficile'
      }
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          texte = `Question ${difficulte} ${i + 1} de type 1` // texte contiendra le texte de la question
          texteCorr = `Correction ${i + 1} de type 1` // texteCorr contientdra le texte de la correction
          break
        case 'lapin': // Les types de questions peuvent être n'importe quelle chaîne de caractère !
          texte = `Question ${difficulte} ${i + 1} de type lapin` // Utiliser ` pour délimiter les chaînes de caractères permet d'insérer facilement des variables grâce à ${ }
          texteCorr = `Correction ${i + 1} de type lapin` 
          break
        case 'type3':
          texte = `Question ${difficulte} $\\frac{2}{5}$ de type 3` // On peut aussi utiliser du LateX en l'entourant de symboles $ et en prenant soin de doubler les \
          texteCorr = `Correction $\\cfrac{${i + 1}}{5}$ de type 3` // On peut aussi intégrer des variables dans le LateX !
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Cette condition permet de ne prendre en compte la question que si elle n'a pas encore été posée !
        this.listeQuestions.push(texte) // Dans ce cas, on ajoute la question,
        this.listeCorrections.push(texteCorr) // ainsi que la correction.
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
```
**Remarque :**
L'extension ESLint permet de repérer les erreurs et améliorer la mise en forme de votre document (avec les règles de [StandardJS](https://standardjs.com)). Voir Affichages > Problèmes pour une description des erreurs et `CTRL+MAJ+P` ou `CMD+MAJ+P`  puis `ESLint: Fix all auto-fixable Problems` pour améliorer la typographie et le style de votre code.

## Exemple d'un exercice simple où il faut ajouter 9 à un entier entre 1 et 99 qui ne soit pas un multiple de 10
```js
// On importe les fonctions définies dans des fichiers externes
import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, modalTexteCourt } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'

export const titre = 'Ajouter 9'
export const amcReady = true // Il a une sortie AMC
export const interactifReady = true // C'est un exercice qui peut être interactif
export const interactifType = 'numerique'
export const amcType = 'AMCNum'

export default function Ajouter9 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.amcReady = amcReady 
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Calculer'
  this.nbQuestions = 10
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 100

  this.nouvelleVersion = function (numeroExercice) {
    this.boutonAide = modalTexteCourt(numeroExercice, 'Ajouter 9 revient à ajouter 10 et à soustraire 1.')
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, texteCorr, a, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on déclare les variables utilisées dans la boucle
	  // i correspond au numéro de la question -1
	  // cpt est un compteur de fois où on génère une question déjà posées
	  // pour éviter une boucle infinie, on limite à 50 le nombre d'essais pour générer une question jamais posée
      a = randint(0, 9) * 10 + randint(1, 9)
      // on choisit un nombre au hasard qui a entre 0 et 9 comme chiffre des dizaines et entre 1 et 9 comme chiffre des unités
      texte = `$ ${a} + 9 = $`
      // énoncé 
	  // ${a} permet de récupérer la valeur de a dans un littéral de gabarit définit entre accents graves
      texteCorr = `$ ${a} + 9 = ${a + 9} $`
      setReponse(this, i, a + 9)
      // Sauvegarde la réponse numérique pour la version interactive ou la sortie AMC
      if (this.interactif) texte += ajouteChampTexte(this, i)

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
```
Le résultat est visible sur <http://coopmaths.fr/exCM005>

## Exemple d'un exercice avec plusieurs types de questions
```js
this.nouvelleVersion = function(){
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées

		let typeDeQuestionsDisponibles = [1,2,3,4] // À noter que l'on aurait pu faire [1,1,1,2] pour avoir 3 questions de type 1 et 1 question de type 2
		let listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		
		for (let i = 0, texte, texteCorr, cpt=0, a, b, c, d,e ,f, g, x, y; i < this.nbQuestions && cpt<50; ) {
			typeDeQuestions = listeTypeDeQuestions[i];
			switch (typeDeQuestions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
				case 1 : // xxx * xx,x chiffres inférieurs à 5
					a = randint(2,5)*100+randint(2,5)*10+randint(2,5)
                                        // Il n'y a que des entiers JS gèrera très bien le calcul
					b = calcul(randint(2,5)*10+randint(2,5)+randint(2,5)/10)
                                        // Dès qu'il y a des nombres décimaux JS peut faire des erreurs
                                        // d'où l'utilisation de la fonction calcul qui s'appuiera sur Algebrite
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
                        // Les nombres étant définis, il ne reste plus qu'à écrire l'énoncé
			texte = `$${texNombre(a)}\\times${texNombre(b)}$`;
			sortieHtml ? texteCorr = `$${texNombre(a)}\\times${texNombre(b)}=${texNombre(a*b)}$` : texteCorr =`$\\opmul[decimalsepsymbol={,}]{${a}}{${b}}$`;
                        // La correction en mode HTML avec le résultat en ligne
                        // et celle en mode LaTeX qui appelle la macro qui posera le calcul
					
			
			if (this.listeQuestions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;	
		}
		listeDeQuestionToContenu(this);
	}
```

## Exercice LaTeX ou exercice HTML ?
Les exercices peuvent être affichés dans le navigateur (sous forme classique <https://coopmaths.fr/mathalea.html> ou en diaporama chronométré <https://coopmaths.fr/cm.html>) ou compilés en pdf à partir des sources en LaTeX (<https://coopmaths.fr/mathalealatex.html>).

Un booléen `context.isHtml` est défini sur chaque page qui utilise MathALEA car tous les codes LaTeX ne peuvent pas être affichés dans les navigateurs par KaTeX (voir les [limitations](https://katex.org/docs/supported.html)). Suivant la valeur de ce booléen le code LaTeX pourra être différent.

## Variante des exercices
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

## <a id="Attributs"></a> Liste exhaustive des attributs des exercices
#### Autour de l'exercice
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
#### Construction de l'exercice
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
  // this.qcm=["Quels sont les nombres pairs ?",[7,12,34,25,18],[0,1,1,0,1]] =>["La question",[les réponses],[bonne=1 et mauvaise=0]]
```
#### Mise en forme de l'exercice
``` javascript
  this.spacing = 1 // Interligne des questions
  this.spacingCorr = 1 // Interligne des réponses
```
#### Gestion de la sortie LateX
``` javascript
  this.pasDeVersionLatex = false // booléen qui indique qu'une sortie LateX est impossible.
  this.listePackages = [] // string ou liste de string avec le nom des packages spécifiques à ajouter dans le préambule.
  this.consigneModifiable = true // booléen pour déterminer si la consigne est modifiable en ligne dans la sortie LaTeX.
  this.nbQuestionsModifiable = true // booléen pour déterminer si le nombre de questions est modifiable en ligne.
  this.nbCols = 2 // Nombre de colonnes pour la sortie LaTeX des questions (environnement multicols).
  this.nbColsCorr = 2 // Nombre de colonnes pour la sortie LaTeX des réponses (environnement multicols).
  this.nbColsModifiable = true // booléen pour déterminer si le nombre de colonnes est modifiable en ligne dans la sortie LaTeX.
  this.nbColsCorrModifiable = true // booléen pour déterminer si le nombre de colonnes de la correction est modifiable en ligne dans la sortie LaTeX.
  this.spacingModifiable = true // booléen pour déterminer si l'espacement est modifiable en ligne dans la sortie LaTeX.
  this.spacingCorrModifiable = true // booléen pour déterminer si l'espacement est modifiable en ligne dans la sortie LaTeX.
  // this.vspace = -1 //Ajoute un \vspace{-1cm} avant l'énoncé ce qui peut être pratique pour des exercices avec des figures.
```
#### Gestion de la sortie autre que LateX
``` javascript
  this.beamer = false // booléen pour savoir si la sortie devra être un diaporama beamer
  this.tailleDiaporama = 50 // Taille en pixels pour le calcul chronométré.
```
#### Paramètres
``` javascript
  this.nbQuestions = 10 // Nombre de questions par défaut (récupéré dans l'url avec le paramètre `,n=`)
  this.correctionDetailleeDisponible = false // booléen qui indique si une correction détaillée est disponible.
  this.correctionDetaillee = true // booléen indiquant si la correction détaillée doit être affiché par défaut (récupéré dans l'url avec le paramètre `,cd=`).
  this.video = '' // Chaine de caractère pour un complément numérique (id Youtube, url, code iframe...).
  // Interactivité
  this.interactif = false // Exercice sans saisie utilisateur par défaut.
  this.interactifObligatoire = false // Certains exercices sont uniquement des QCM et n'ont pas de version non interactive.
  // QCM
  this.qcm = false // Pour les exercices de type QCM : contient un tableau.
  this.qcmDisponible = false // Pour ajouter une case à cocher Mode QCM qui permet de changer le statut de this.modeQcm.
  this.modeQcm = false // Pour choisir la version QCM ou la version classique (false = version classique).
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
```
#### Exercice avec des dépendances particulières
``` javascript
  // this.typeExercice = 'MG32' // Pour charger MathGraph32.
  this.mg32Editable = false // Les figures MG32 ne sont pas interactives par défaut.
  // this.dimensionsDivMg32 = [500, 450] // Dimensions du SVG créé par MathGraph32.
  // this.typeExercice = 'Scratch' // Pour charger Scratchblocks.
  // this.typeExercice = 'IEP' // Pour charger InstrumEnPoche.
  // this.typeExercice = 'dnb' // Ce n’est pas un exercice aléatoire il est traité différemment. Les exercices DNB sont des images pour la sortie Html et du code LaTeX statique pour la sortie latex.
  // this.typeExercice = 'XCas' // Pour charger le JavaScript de XCas.
```
