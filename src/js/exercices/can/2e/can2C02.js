import Exercice from '../../Exercice.js'
import { randint, calcul, choice } from '../../../modules/outils.js'
export const titre = 'Calcul différence de deux carrés'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Créé pendant l'été 2021
 * Référence can2C02
 * Date de publication
*/
export default function CalculAstucieuxAvecDifferenceCarre () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(15, 40)
    const b = a + 1
    if (choice([true, false])) {
      this.question = `$${b}^2-${a}^2=....$`
      this.correction = `$${b}^2-${a}^2=(${b}-${a})(${b}+${a})=${b ** 2 - a ** 2}$.`
      this.reponse = calcul(b ** 2 - a ** 2)
    } else {
      this.question = `$${a}^2-${b}^2=....$`
      this.correction = `$${a}^2-${b}^2=(${a}-${b})(${a}+${b})=${a ** 2 - b ** 2}$.`
      this.reponse = calcul(a ** 2 - b ** 2)
    }
  }
}
