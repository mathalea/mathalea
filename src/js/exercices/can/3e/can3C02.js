import { texNombrec, randint, sp } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Moyenne entière de trois décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3C02
*/
export default function MoyenneEntiereDeDecimaux () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.formatChampTexte = 'largeur25'
  this.nouvelleVersion = function () {
    this.reponse = randint(7, 15) // la moyenne attendue on la multiplie par 10 pour l'avoir en 1/10e
    const a = randint(4, this.reponse, [10, 20]) * 10 + randint(1, 9) // premier nombre à ajouter multiplié par 10 pour l'avoir en 1/10e
    let b, c
    do {
      b = randint(a, this.reponse * 30 - a, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]) // deuxième nombre x 10
      if ((a + b) % 10 === 0) {
        if (b % 10 === 1) {
          b += 3
        } else {
          b -= 1
        }
      }
      c = this.reponse * 30 - a - b
    } while (b < 0 || c < 0)
    this.question = `Calculer la moyenne des nombres :${sp(8)}${texNombrec(a / 10)}${sp(8)}${texNombrec(b / 10)}${sp(8)}${texNombrec(c / 10)}`
  }
}
