import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { calcul } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Multiplier un nombre pair par 5'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C02
 */
export const uuid = '5c1b3'
export const ref = 'can6C02'
export default function NombrePairFois5 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(11, 49, [20, 30, 40, 15, 25, 35, 45]) * 2
    this.reponse = calcul(a * 5)
    this.question = `Calculer $${a}\\times 5$.`
    // Selon le cas l'endroit d'ajout peut différer
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    this.correction = `$${a}\\times 5 = ${this.reponse}$`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Pour multiplier par $5$, on peut :  <br>
    $\\bullet$ ou bien d'abord multiplier par $10$, puis diviser par $2$ :<br>
    $${a}\\times 5 = (${a} \\times 10)\\div 2  = ${calcul(a * 10)}\\div 2=${this.reponse}$.<br>
    $\\bullet$ ou bien d'abord diviser  par $2$, puis multiplier  par $10$ :<br>$${a}\\times 5 = (${a}\\div 2 ) \\times 10 = ${calcul(a / 2)}\\times 10=${this.reponse}$.`)
  }
}
