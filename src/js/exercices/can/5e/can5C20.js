import { randint, texNombre, texteEnCouleur, arrondi } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Soustraire deux décimaux*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '09/05/2022'
/*!
 * @author  Gilles Mora
 *
 *
 */
export const uuid = '0f007'
export const ref = 'can5C20'
export default function Soustraire2Decimaux2 () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const a = randint(2, 9)
    const b = randint(1, a - 1)
    const d1 = randint(1, 6)
    const d2 = randint(d1, 9)
    const c2 = randint(1, 9)
    this.question = `$${texNombre(a + d1 / 10, 1)}-${texNombre(b + d2 / 10 + c2 / 100, 2)}=$`
    this.correction = `$${texNombre(a + d1 / 10, 1)}-${texNombre(b + d2 / 10 + c2 / 100, 2)}=${texNombre(a + d1 / 10 - b - d2 / 10 - c2 / 100, 2)}$`
    this.reponse = arrondi(a + d1 / 10 - b - d2 / 10 - c2 / 100, 2)
    this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   On commence par soustraire les unités : $${texNombre(a + d1 / 10, 1)}-${b}=${texNombre(a + d1 / 10 - b, 1)}$.<br>
   Puis on soustrait la partie décimale de $${texNombre(a + d2 / 10 + c2 / 100, 2)}$ c'est-à-dire $${texNombre(d2 / 10 + c2 / 100, 2)}$.
    On obtient $${texNombre(a + d1 / 10 - b, 1)}-${texNombre(d2 / 10 + c2 / 100, 2)}=${texNombre(a + d1 / 10 - b - d2 / 10 - c2 / 100, 2)}$`)
  }
}
