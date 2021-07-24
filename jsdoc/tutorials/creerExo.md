Un exercice est un objet de la classe Exercice. Il a plusieurs attributs (son titre, son énoncé, sa correction...) et une méthode `nouvelleVersion()` qui crée un énoncé aléatoire.

Le nom d'un exercice commence par la référence correspondante du [référentiel de CoopMaths](https://coopmaths.fr/pdf/CoopMaths-Referentiel.pdf). Si un exercice de la même référence existe déjà, ajouter un tiret suivi d'un nombre.

Les réglages appliqués par défaut sont dans `src/js/exercices/Exercice.js`.


# Attributs des exercices

* `this.titre` : chaîne de caractère sans point à la fin  
* `this.consigne` : chaîne de caractères de préférence à l'infinitif et sans point à la fin
* `this.consigneCorrection` : chaîne de caractères en général vide qui précèdera la correction.
* `this.listeQuestions` : liste de chaînes de caractères avec chacune des questions. Chaque question est définie par la méthode this.nouvelleVersion puis `listeDeQuestionToContenu(this)` mettra en forme `this.contenu` et `this.contenuCorrection` suivant `context` (sortie HTML ? diaporama ?...)
* `this.listeCorrections` : idem avec la correction
* `this.contenu` : chaîne de caractères avec tout l'énoncé de l'exercice
* `this.contenuCorrection` : chaîne de caractères avec toute la correction de l'exercice
* `this.nbQuestions` : nombre de questions par défaut (récupéré dans l'url avec le paramètre `n`)
* `this.nbCols` : nombre de colonnes pour la sortie LaTeX de l'énoncé (environnement multicols)
* `this.nbColsCorr` : nombre de colonnes pour la sortie LaTeX de l'énoncé (environnement multicols)
* `this.spacing` : interligne
* `this.spacingCorr` : interligne de la correction
* `this.beamer` : booléen pour savoir si la sortie devra être un diaporama beamer
* `this.besoinFormulaireNumerique` : false par défaut pour ne pas ajouter de formulaire qui modifie la valeur de `this.sup`, sinon `this.besoinFormulaireNumerique = [texte, max, tooltip facultatif];` pour créer un formulaire numérique
* `this.besoinFormulaireTexte = false` par défaut pour ne pas ajouter de formulaire qui modifie la valeur de `this.sup`, sinon `this.besoinFormulaireTexte = [texte,tooltip];`
* `this.besoinFormulaireCaseACocher = false` par défaut pour ne pas ajouter de formulaire qui modifie la valeur de `this.sup`, sinon `this.besoinFormulaireCaseACocher = [texte];`
* De la même manière on a `this.besoinFormulaire2Numerique` ou `this.besoinFormulaire3Numerique` pour changer `this.sup2` ou `this.sup3`
* `this.consigneModifiable` : booléen pour déterminer si la consigne est modifiable en ligne dans la sortie LaTeX
* `this.nbQuestionsModifiable` : booléen pour déterminer si le nombre de questions est modifiable en ligne
* `this.nbColsModifiable` : booléen pour déterminer si le nombre de colonnes est modifiable en ligne dans la sortie LaTeX
* `this.nbColsCorrModifiable`  : booléen pour déterminer si le nombre de colonnes de la correction est modifiable en ligne dans la sortie LaTeX
* `this.spacingModifiable` : booléen pour déterminer si l'espacement est modifiable en ligne dans la sortie LaTeX
* `this.spacingCorrModifiable`  : booléen pour déterminer si l'espacement est modifiable en ligne dans la sortie LaTeX
* `this.correctionDetaillee` : permet d'avoir 2 types de corrections (récupéré dans l'url avec le paramètre cd)
* `this.video`: : chaine de caractère pour un complément numérique (id Youtube, url, code iframe...)
  
   	
# Méthode

`this.nouvelleVersion = function(){}` c'est dans cette fonction que l'on détermine les valeurs numériques, l'énoncé et la correction d'un exercice.

# Exemple

Voici le code d'un exercice très simple où il faudra ajouter 9 à un entier entre 1 et 99 qui ne soit pas un multiple de 10.

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


## Exercice LaTeX ou exercice HTML ?


Les exercices peuvent être affichés dans le navigateur (sous forme classique <https://coopmaths.fr/mathalea.html> ou en diaporama chronométré <https://coopmaths.fr/cm.html>) ou compilés en pdf à partir des sources en LaTeX (<https://coopmaths.fr/mathalealatex.html>).

Un booléen `context.isHtml` est défini sur chaque page qui utilise MathALEA car tous les codes LaTeX ne peuvent pas être affichés dans les navigateurs par KaTeX (voir les [limitations](https://katex.org/docs/supported.html)). Suivant la valeur de ce booléen le code LaTeX pourra être différent.
étrie dynamique) et d'autres que en mode LaTeX (ceux qui nécessitent des macros comme pour le calcul posé ou les droites graduées).


### Variante des exercices

Afin de pouvoir appeler un exercice avec une modification (de son niveau de difficulté, de son titre...), on peut en définir une variante.

```js
function Reglages6M23(){
	ExerciceConversionsAires.call(this);
	this.sup = 3;
	this.nbColsCorr = 1;
}
```

Ainsi, on appellera l'exercice sur les conversions d'aire en imposant le niveau 3 de difficulté et en ayant qu'une seule colonne dans la correction.


## Plusieurs types de questions

Voici un exemple d'exercices avec un hasard finement contrôlé.

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