import { calcul, choice, randint, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Complément à 1'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6C20
 */
export default function ComplementAUn () {
  Exercice.call(this)
  this.nbQuestions = 1
    this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    let a
    switch (choice([1, 2, 3])) {
      case 1:
        a = calcul(randint(2, 9) / 10)
        break
      case 2:
        a = calcul(randint(2, 9) / 100)
        break
      case 3:
        a = calcul(randint(2, 9) / 1000)
        break
    }
    this.question = `$1-${texNombrec(a)}=$`
    this.correction = `$1-${texNombrec(a)}=${texNombrec(1 - a)}$`
    this.reponse = calcul(1 - a)
  }
}
