import { choice, randint, ecritureParentheseSiNegatif, ecritureAlgebrique } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une image par une fonction affine'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '13/10/2022'
/*!
 * @author Jean-Claude Lhote/Gilles Mora
  * Créé pendant l'été 2021
 * Référence can3F03
*/
export const uuid = 'cf55d'
export const ref = 'can3F03'
export default function CalculImageParFonctionAffine () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let nomF, x, n, m, y
    switch (choice([1, 2])) {
      case 1:
        x = randint(-9, 9, [0, 1, -1])
        n = choice([2, 4, 5])
        m = randint(2, 6, [n, n * 2, n * 3])
        nomF = choice(['f', 'g', 'h', 'u', 'v', 'w', 'p', 'm', 't', 'k'])
        this.question = `Soit $${nomF}$ la fonction définie par : $${nomF}(x)=${m}x+${n}$.<br>
        
        Quelle est l'image de $${x}$ par la fonction $${nomF}$ ?`
        this.correction = `$${nomF}(x)=${m}x+${n}$ donc ici on a : $${nomF}(${x})=${m}\\times ${ecritureParentheseSiNegatif(x)}+${n}=${m * x}+${n}=${m * x + n}$.`
        this.reponse = m * x + n
        break
      case 2:
        x = randint(-9, 9, [0, 1, -1])
        n = choice([2, 3, 5])
        m = randint(2, 6, [n, n * 2, n * 3])
        y = randint(-9, 9, [x, 0])
        nomF = choice(['f', 'g', 'h', 'u', 'v', 'w', 'p', 'm', 't', 'k'])
        this.question = `Soit $${nomF}$ la fonction définie par : $${nomF}(x)=\\dfrac{${m}}{${n}}x${ecritureAlgebrique(y)}$.<br>
            
            Quelle est l'image de $${n * x}$ par la fonction $${nomF}$ ?`
        this.correction = `$${nomF}(x)=\\dfrac{${m}}{${n}}x${ecritureAlgebrique(y)}$ donc ici on a : $${nomF}(${n * x})=\\dfrac{${m}}{${n}}\\times ${ecritureParentheseSiNegatif(n * x)}${ecritureAlgebrique(y)}=${m}\\times \\dfrac{${n * x}}{${n}}${ecritureAlgebrique(y)}=${m * x}${ecritureAlgebrique(y)}=${m * x + y}$.`
        this.reponse = m * x + y
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
