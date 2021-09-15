import { choice, miseEnEvidence, randint, sp } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Puissances de nombre entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can3C01
 */
export default function CalculPuissanceSimple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.formatChampTexte = 'largeur10 inline'
  this.nouvelleVersion = function () {
    const a = choice([2, 3, 4])
    const b = randint(20, 50)
    const c = [['Le double', 'La moitié'], ['Le triple', 'Le tiers'], ['Le quadruple', 'Le quart']]
    if (choice([true, false])) {
      this.question = `${c[a - 2][0]} de $${a}^{${b}}$ ? ${sp(8)} $${a}^{\\ldots}$`
      this.reponse = b + 1
      this.correction = `${c[a - 2][0]} de $${a}^{${b}}$ est $${a}^{${miseEnEvidence(b + 1)}}$`
    } else {
      this.question = `${c[a - 2][1]} de .$${a}^{${b}}$ ? ${sp(8)} $${a}^{\\ldots}$`
      this.reponse = b - 1
      this.correction = `${c[a - 2][1]} de $${a}^{${b}}$ est $${a}^{${miseEnEvidence(b - 1)}}$`
    }
    this.optionsChampTexte = { texteApres: "(juste l'exposant)" }
  }
}
