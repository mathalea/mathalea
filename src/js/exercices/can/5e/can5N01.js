import { calcul, randint, texNombrec, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer la somme de nombres décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5N01
 */
export const uuid = 'f8f99'
export const ref = 'can5N01'
export default function SommeDecimale5e () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur25 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const d = randint(1, 9, [a, b, c])
    this.reponse = calcul(10 + (b + d) * 0.1 + c * 0.01)
    this.question = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}=$`
    this.correction = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}=${texNombrec(10 + (b + d) * 0.1 + c * 0.01)}$`
    this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    On fait la somme des parties entières des deux nombres : $${a}+${10 - a}=${10}$, puis on ajoute les parties décimales. <br>
    On obtient :<br>
$${texNombrec(b * 0.1 + c * 0.01)}+${texNombrec(d * 0.1)}=${texNombrec(b * 0.1 + c * 0.01 + d * 0.1)}$.<br>
Ainsi, $${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}=${texNombrec(10 + (b + d) * 0.1 + c * 0.01)}$.
    `)
  }
}
