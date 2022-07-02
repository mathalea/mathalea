import { randint, texNombre, texteEnCouleur, arrondi } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Soustraire deux décimaux'
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
export default function Soustraire2Decimaux () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const a = randint(2, 15)
    const b = randint(1, a - 1)
    const d1 = randint(1, 6)
    const d2 = randint(d1, 9)

    this.question = `$${texNombre(a + d1 / 10, 1)}-${texNombre(b + d2 / 10, 1)}=$`
    this.correction = `$${texNombre(a + d1 / 10, 1)}-${texNombre(b + d2 / 10, 1)}=${texNombre(a + d1 / 10 - b - d2 / 10, 1)}$`
    this.reponse = arrondi(a + d1 / 10 - b - d2 / 10, 1)
    this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   On commence par soustraire les unités : $${texNombre(a + d1 / 10, 1)}-${b}=${texNombre(a - b + d1 / 10, 1)}$.<br>
    Puis les dixièmes : $${texNombre(a - b + d1 / 10, 1)}-${texNombre(d2 / 10)}=${texNombre(a + d1 / 10 - b - d2 / 10, 1)}$`)
  }
}
