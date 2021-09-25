import { calcul, choice, miseEnEvidence, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Compléter un volume au litre'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Publié le 15/09/2021
 * Référence can6M07
 */
export default function CompleterVolumeAuLitre () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1

  this.nouvelleVersion = function () {
    let a
    switch (choice(['a', 'b', 'c', 'd'])) {
      case 'a':
        a = randint(2, 8) * 10
        this.question = `$${a}$ cL$ + \\ldots$ cL$ = 1$ L`
        this.correction = `$${a}$ cL$ + ${miseEnEvidence(100 - a)}$ cL = 1$ L`
        this.reponse = calcul(100 - a)
        break
      case 'b':
        a = randint(2, 8) * 10
        this.question = `$\\ldots$ cL$ + ${a}$ cL$ = 1$ L`
        this.correction = `$${miseEnEvidence(100 - a)}$ cL$ + ${a}$ cL$ = 1$ L`
        this.reponse = calcul(100 - a)
        break
      case 'c':
        a = randint(20, 80)
        this.question = `$${a * 10}$ mL$ + \\ldots$ mL$ = 1$ L`
        this.correction = `$${a * 10}$ mL$ + ${miseEnEvidence(1000 - a * 10)}$ mL$ = 1$ L`
        this.reponse = calcul(1000 - a * 10)
        break
      case 'd':
        a = randint(20, 80)
        this.question = `$\\ldots$ mL$ + ${a * 10}$ mL$ = 1$ L`
        this.correction = `$${miseEnEvidence(1000 - a * 10)}$ mL$ + ${a * 10}$ mL$ = 1$ L`
        this.reponse = calcul(1000 - a * 10)
        break
    }
  }
}
