import Exercice from '../../Exercice.js'
import { randint, calcul, choice, ecritureParentheseSiNegatif, abs } from '../../../modules/outils.js'
export const titre = 'Calcul divers avec carrés/priorité opératoire'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Référence can3C06
 * Date de publication
*/
export default function CalculDivers1 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c
    switch (choice(['a', 'b'])) {
      case 'a':
        a = randint(2, 9)
        b = randint(2, 9)
        c = randint(-9, 9, 0)
        this.question = `$${a}-${b}\\times ${ecritureParentheseSiNegatif(c)}$`
        this.correction = `$${a}-${b}\\times ${ecritureParentheseSiNegatif(c)}=${a}-${ecritureParentheseSiNegatif(b * c)}=${a - b * c}$.`
        this.reponse = calcul(a - b * c)
        break
      case 'b':
        a = randint(-10, -1)
        this.question = ` $(${a})^2+${abs(a)}^2=$.`
        this.correction = `$(${a})^2+${abs(a)}^2=${a * a}+${a * a}=${2 * a * a}$.`
        this.reponse = calcul(2 * a * a)
        break
    }
  }
}
