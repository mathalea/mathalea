import { choice } from '../../../modules/outils/arrays.js'
import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { calcul, texNombre } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Recomposer un entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6N01
 */
export const uuid = '5cffb'
export const ref = 'can6N01'
export default function RecomposerEntier () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(2, 5)
    const b = randint(2, 9)
    const c = randint(2, 9)
    this.reponse = calcul(a * 1000 + b * 10 + c * 100)
    if (choice([true, false])) {
      this.question = `Calculer $${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100$.`
      this.correction = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100 =${texNombre(this.reponse)}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
    On décompose le calcul (milliers, centaines puis dizaines) : <br>
    $\\bullet$ $${texNombre(a)}\\times 1000=${texNombre(a * 1000)}$.<br>
    $\\bullet$ $${texNombre(c)}\\times 100=${texNombre(c * 100)}$.<br>
    $\\bullet$ $${texNombre(b)}\\times 10=${texNombre(b * 10)}$.<br>
    Ainsi,  <br>
    $\\begin{aligned}
  ${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100 &=${texNombre(a * 1000)}+${texNombre(c * 100)}+${texNombre(b * 10)}\\\\
  &=${texNombre(this.reponse)}
  \\end{aligned}$.`)
    } else {
      this.question = `Calculer $ ${texNombre(c)}\\times 100+ ${texNombre(b)}\\times 10 + ${texNombre(a)}\\times 1000$.`
      this.correction = `$ ${texNombre(c)}\\times 100+ ${texNombre(b)}\\times 10 + ${texNombre(a)}\\times 1000  =${texNombre(this.reponse)}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
  On décompose le calcul (milliers, centaines puis dizaines) : <br>
  $\\bullet$ $${texNombre(a)}\\times 1000=${texNombre(a * 1000)}$.<br>
  $\\bullet$ $${texNombre(c)}\\times 100=${texNombre(c * 100)}$.<br>
  $\\bullet$ $${texNombre(b)}\\times 10=${texNombre(b * 10)}$.<br>
  Ainsi, <br>$\\begin{aligned}
  ${texNombre(c)}\\times 100+ ${texNombre(b)}\\times 10 + ${texNombre(a)}\\times 1000 &=${texNombre(a)}\\times 1000 + ${texNombre(c)}\\times 100 + ${texNombre(b)}\\times 10\\\\
  & =${texNombre(a * 1000)}+${texNombre(c * 100)}+${texNombre(b * 10)}\\\\
  &=${texNombre(this.reponse)}
  \\end{aligned}$. `)
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
