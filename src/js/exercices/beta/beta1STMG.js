import Exercice from '../../Exercice.js'
import { randint, calcul, choice, texNombrec } from '../../../modules/outils.js'
export const titre = 'Proportions'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function Proportion () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur25 inline'
  this.optionsChampTexte = { texteApres: ' €' }
  this.nouvelleVersion = function () {
    let a, b
    switch (choice(['a'])) { //,
      case 'a':
        a = randint(5, 25)*5
         b = randint(1, 15)*5
        this.question = `Calculer $${b}\\%$ de $${a}$  <br> `
        this.correction = `Calculer $${b}\\% d'un nombre, c'est le multiplier par $\\dfrac{${b}}{100}$.
      <br>    Ainsi, $${b}\\%$  de $${a}$ est égal à $\\dfrac{${b}}{100}\\times ${a}=\\dfrac{${b}*${a}}{100}$<br>
                 <br> ce qui donne ${texNombrec(b * a / 100)}.`
        this.reponse = calcul(b * a / 100)
        break
    }
  }
}
