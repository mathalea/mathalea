import { randint, texRacineCarree } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Nombre de solutions de l’équation $-x^2+a=b$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function EquationMoinsX2PlusAEgalB () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const a = randint(1, 30)
    const b = randint(1, 30)
    this.question = ` Combien de solutions réelles possède l'équation $-x^2+${a}=${b}$ ?<br>`
    if (a - b > 0) {
      this.correction = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
    $${a - b}$ étant strictement positif, cette équation a deux solutions : $${texRacineCarree(a - b)}$ et  $-${texRacineCarree(a - b)}$.`
      this.reponse = 2
    } else if (a - b === 0) {
      this.correction = `L'équation est équivalente à$-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
    cette équation a une seul solution réelle : 0.`
      this.reponse = 1
    } else if (a - b < 0) {
      this.correction = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
   Cette équation n'a pas de solution réelle car $${a - b}<0$.`
      this.reponse = 0
    }
  }
}
