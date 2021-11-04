import { calcul, choice, randint, texNombrec } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Lire l\'heure'
export const dateDePublication = '4/11/2021'
export const interactifReady = true
export const interactifType = 'mathLive'
/*!
 * @author Jean-Claude Lhote
 * Créé le 4/11/2021
 * Référence canc3D01
 */
export default function LireHeure () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.typeExercice = 'simple'
  this.formatInteractif = 'texte'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const prefixes = [[10, 'd'], [100, 'c'], [1000, 'm'], [10, 'da'], [100, 'h'], [1000, 'k']]
    const unite = choice(['g', 'm'])
    const typeDeQuestion = randint(0, 5)
    const a = randint(1, 9)
    switch (typeDeQuestion) {
      case 0:
      case 1:
      case 2:
        this.question = `$${a}$${unite} $= ${texNombrec(a * prefixes[typeDeQuestion][0])}$ ${this.interactif ? '' : '$\\ldots$'}`
        this.reponse = `${prefixes[typeDeQuestion][1]}${unite}`
        this.correction = `$${a}$${unite} $= ${texNombrec(a * prefixes[typeDeQuestion][0])}$ ${prefixes[typeDeQuestion][1]}${unite}`
        break
      case 3:
      case 4:
      case 5:
        this.question = `$${a}$${unite} $= ${texNombrec(a / prefixes[typeDeQuestion][0])}$ ${this.interactif ? '' : '$\\ldots$'}`
        this.reponse = `${prefixes[typeDeQuestion][1]}${unite}`
        this.correction = `$${a}$${unite} $= ${texNombrec(a / prefixes[typeDeQuestion][0])}$ ${prefixes[typeDeQuestion][1]}${unite}`
        break
    }
  }
}
