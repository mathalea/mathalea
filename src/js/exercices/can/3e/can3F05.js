
import { choice } from '../../../modules/outils/arrays.js'
import { ecritureAlgebrique } from '../../../modules/outils/ecritures.js'
import { randint } from '../../../modules/outils/entiers.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer un antécédent par fonction affine'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '13/10/2022'
/*!
 * @author Jean-Claude Lhote/Gilles Mora
  * Créé pendant l'été 2021
 * Référence can3C04
*/
export const uuid = '83a8a'
export const ref = 'can3F05'
export default function CalculAntecedentAffine () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const x = randint(-9, 9, [0, 1, -1])
    const m = randint(-9, 9, [0, 1, -1])
    const y = randint(-9, 9, [x, 0])
    const nomF = choice(['f', 'g', 'h', 'u', 'v', 'w', 'p', 'm', 't', 'k'])
    this.question = `Soit $${nomF}$ la fonction définie par : $${nomF}(x)=${m}x${ecritureAlgebrique(y)}$.<br>
        
        Quel est l'antécédent de $${m * x + y}$ par la fonction $${nomF}$ ?`
    this.correction = `L'antécédent de $${m * x + y}$ est le nombre $x$ qui a pour image $${m * x + y}$. On cherche donc $x$ tel que : <br>
        
   $${m}x${ecritureAlgebrique(y)}=${m * x + y}$ <br>Soit $x=\\dfrac{${m * x + y}${ecritureAlgebrique(-y)}}{${m}}=${x}$.`
    this.reponse = x

    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
