import Exercice from '../../Exercice.js'
import { randint, calcul, choice } from '../../../modules/outils.js'
export const titre = 'Calcul avec +/-99 ou +/-999'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Référence
 * Date de publication
*/
export default function CalculAvec99 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a
    switch (choice(['a', 'b', 'c', 'd', 'e'])) {
      case 'a':
        a = calcul(randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9))
        this.question = `Calculer $${a}+99$.`
        this.correction = `$${a}+99=${a + 99}$.`
        this.reponse = calcul(a + 99)
        break
      case 'b':
        a = calcul(randint(1, 9) * 1000 + randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9))
        this.question = `Calculer $${a}+999$.`
        this.correction = `$${a}+999=${a + 999}$.`
        this.reponse = calcul(a + 999)
        break

      case 'c':
        a = calcul(randint(1, 9) * 1000 + randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9))
        this.question = `Calculer $${a}-999$.`
        this.correction = `$${a}-999=${a - 999}$.`
        this.reponse = calcul(a - 999)
        break
      case 'd':
        a = calcul(randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9))
        this.question = `Calculer $${a}-99$.`
        this.correction = `$${a}-99=${a - 99}$.`
        this.reponse = calcul(a - 99)
        break
      case 'e':
        a = calcul(randint(1, 9) * 1000 + randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9))
        this.question = `Calculer $${a}+99$.`
        this.correction = `$${a}+99=${a + 99}$.`
        this.reponse = calcul(a + 99)
        break
    }
  }
}
