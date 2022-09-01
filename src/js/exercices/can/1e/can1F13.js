import Exercice from '../../Exercice.js'
import { randint, choice, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Déterminer le coefficient directeur d’une tangente (fonctions de référence)'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '21/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
     * Modèle d'exercice très simple pour la course aux nombres
     * @author Gilles Mora
     * Référence
    */
export const uuid = '3c690'
export const ref = 'can1F13'
export default function CalculCoeffDir () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a; let f
    switch (choice([1, 1, 2, 2, 3, 3, 4])) { //
      case 1:// x^2
        a = randint(2, 15) * choice([-1, 1])

        this.question = `Déterminer le coefficient directeur de la tangente à la courbe représentative de la fonction carré au point d'abscisse $${a}$.
       
                 `

        this.correction = `Le coefficient directeur de la tangente au point d'abscisse $a$ est donné par le nombre dérivé $f'(a)$.<br>
        La fonction $f$ définie par $f(x)=x^2$ a pour fonction dérivée la fonction $f'$ définie par $f'(x)=2x$.<br>
        Comme $f'(${a})=2\\times ${ecritureParentheseSiNegatif(a)}=${2 * a}$, le coefficient directeur de la tangente au point d'abscisse $${a}$ est : $${2 * a}$. `

        this.reponse = 2 * a

        break
      case 2:// sqrt(x)
        a = randint(1, 25)

        this.question = `Déterminer le coefficient directeur de la tangente à la courbe représentative de la fonction racine carrée au point d'abscisse $${a}$.
        
         `

        this.correction = `Le coefficient directeur de la tangente au point d'abscisse $a$ est donné par le nombre dérivé $f'(a)$.<br>
        La fonction $f$ définie par $f(x)=\\sqrt{x}$ a pour fonction dérivée la fonction $f'$ définie par $f'(x)=\\dfrac{1}{2\\sqrt{x}}$.<br>

`
        if (a === 1 || a === 4 || a === 9 || a === 16 || a === 25) {
          f = new FractionX(1, Math.sqrt(a))
          this.correction += `Comme $f'(${a})=\\dfrac{1}{2\\sqrt{${a}}}=\\dfrac{1}{${2 * Math.sqrt(a)}}$, le coefficient directeur de la tangente au point d'abscisse $${a}$ est : $\\dfrac{1}{${2 * Math.sqrt(a)}}$.`
          this.reponse = [`\\dfrac{1}{2\\sqrt{${a}}}`, f.texFraction, 1 / (2 * Math.sqrt(a))]
        } else {
          this.correction += `Comme $f'(${a})=\\dfrac{1}{2\\sqrt{${a}}}$, le coefficient directeur de la tangente au point d'abscisse $${a}$ est : $\\dfrac{1}{2\\sqrt{${a}}}$.`
          this.reponse = [`\\dfrac{1}{2\\sqrt{${a}}}`, `\\dfrac{0,5}{\\sqrt{${a}}}`]
        }
        break
      case 3:// 1/x
        a = randint(1, 10) * choice([-1, 1])
        f = new FractionX(-1, a * a)
        this.question = `Déterminer le coefficient directeur de la tangente à la courbe représentative de la fonction inverse au point d'abscisse $${a}$.
        
         `

        this.correction = `Le coefficient directeur de la tangente au point d'abscisse $a$ est donné par le nombre dérivé $f'(a)$.<br>
        La fonction $f$ définie par $f(x)=\\dfrac{1}{x}$ a pour fonction dérivée la fonction $f'$ définie par $f'(x)=-\\dfrac{1}{x^2}$.<br>
Comme $f'(${a})=-\\dfrac{1}{${ecritureParentheseSiNegatif(a)}^2}=-\\dfrac{1}{${a * a}}$, le coefficient directeur de la tangente au point d'abscisse $${a}$ est : $-\\dfrac{1}{${a * a}}$`

        if (a === 1 || a === -1) {
          this.correction += '$=-1$.'

          this.reponse = [`\\dfrac{-1}{${a * a}}`, `-\\dfrac{1}{${a * a}}`, f, -1]
        } else {
          this.correction += '.'
          this.reponse = [`\\dfrac{-1}{${a * a}}`, `-\\dfrac{1}{${a * a}}`, f, -1]
        }

        break

      case 4:// x^3
        a = randint(1, 5) * choice([-1, 1])

        this.question = `Déterminer le coefficient directeur de la tangente à la courbe représentative de la fonction cube au point d'abscisse $${a}$.
       
                 `

        this.correction = `Le coefficient directeur de la tangente au point d'abscisse $a$ est donné par le nombre dérivé $f'(a)$.<br>
        La fonction $f$ définie par $f(x)=x^3$ a pour fonction dérivée la fonction $f'$ définie par $f'(x)=3x^2$.<br>
        Comme $f'(${a})=3\\times ${ecritureParentheseSiNegatif(a)}^2=${3 * a * a}$, le coefficient directeur de la tangente au point d'abscisse $${a}$ est : $${3 * a * a}$. `

        this.reponse = 3 * a * a

        break
    }
  }
}
