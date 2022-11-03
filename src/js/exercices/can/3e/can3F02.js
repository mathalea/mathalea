import { choice, randint, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une image par une fonction linéaire'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '13/10/2022'
/*!
 * @author Jean-Claude Lhote/Gilles Mora
  * Créé pendant l'été 2021
 * Référence can3F10-2
*/
export const uuid = 'c3468'
export const ref = 'can3F02'
export default function CalculImageParFonctionLineaire () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let nomF, x, n, m
    switch (choice([1, 2])) {
      case 1:
        x = randint(-10, 10, [-1, 0, 1])
        m = randint(-9, 9, [-1, 0, 1])
        nomF = choice(['f', 'g', 'h', 'u', 'v', 'w', 'p', 'm', 't', 'k'])
        this.question = `Soit $${nomF}$ la fonction définie par : $${nomF}(x)=${m}x$.<br>
        
        Quelle est l'image de $${x}$ par la fonction $${nomF}$ ?`
        this.correction = `$${nomF}(x)=${m}x$ donc ici on a : $${nomF}(${x})=${m} \\times ${ecritureParentheseSiNegatif(x)}=${m * x}$.`
        this.reponse = m * x
        break
      case 2:
        x = randint(-9, 9, [0, 1, -1])
        n = choice([2, 3, 5])
        m = randint(2, 6, [n, n * 2, n * 3])
        nomF = choice(['f', 'g', 'h', 'u', 'v', 'w', 'p', 'm', 't', 'k'])
        this.question = `Soit $${nomF}$ la fonction définie par : $${nomF}(x)=\\dfrac{${m}}{${n}}x$.<br>
            
            Quelle est l'image de $${n * x}$ par la fonction $${nomF}$ ?`
        this.correction = `$${nomF}(x)=\\dfrac{${m}}{${n}}x$ donc ici on a : $${nomF}(${n * x})=\\dfrac{${m}}{${n}} \\times ${ecritureParentheseSiNegatif(n * x)}=${m}\\times \\dfrac{${n * x}}{${n}}=${m}\\times ${ecritureParentheseSiNegatif(x)}=${m * x}$.`
        this.reponse = m * x
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
