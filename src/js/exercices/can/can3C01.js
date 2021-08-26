import { choice, miseEnEvidence, randint, sp, texteEnCouleurEtGras } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Puissances de nombre entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export default function CalculPuissanceSimple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur10 inline'
  this.nouvelleVersion = function () {
    const a = choice([2, 3, 4])
    const b = randint(20, 50)
    const c = [['Le double', 'La moitié'], ['Le triple', 'Le tiers'], ['Le quadruple', 'Le quart']]
    if (choice([true, false])) {
      this.question = `${c[a - 2][0]} de ${a} ^ ${b} ? `
      this.reponse = b + 1
      this.correction = `${c[a - 2][0]} de ${a} ^ ${b} est ${a} ^ ${texteEnCouleurEtGras(b + 1)}`
    } else {
      this.question = `${c[a - 2][1]} de ${a} ^ ${b} ? `
      this.reponse = b - 1
      this.correction = `${c[a - 2][1]} de ${a} ^ ${b} est ${a} ^ ${texteEnCouleurEtGras(b - 1)}`
    }
    this.optionsChampTexte = { texte: `${sp(8)} ${a} ^ $\\ldots$`, texteApres: "(juste l'exposant)" }
  }
}
