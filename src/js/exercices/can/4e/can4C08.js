import Exercice from '../../Exercice.js'
import { calcul, combinaisonListes, texNombre } from '../../../modules/outils.js'
export const titre = 'Calculer une somme de puissances de 10'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4C08
*/
export const uuid = '48334'
export const ref = 'can4C08'
export default function SommePuissancesDeDix () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = combinaisonListes([0, 1, 2, 3, 4, 5, 6], 3)
    this.question = `Calculer $10^${a[0]}+10^${a[1]}+10^${a[2]}$.`
    this.correction = `$10^${a[0]}+10^${a[1]}+10^${a[2]}=
    ${texNombre(10 ** a[0])}+${texNombre(10 ** a[1])}+${texNombre(10 ** a[2])}
    =${texNombre(10 ** a[0] + 10 ** a[1] + 10 ** a[2])}$`
    this.reponse = calcul(10 ** a[0] + 10 ** a[1] + 10 ** a[2])
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
