import Exercice from '../../Exercice.js'
import { calcul, combinaisonListes } from '../../../modules/outils.js'
export const titre = 'Somme de puissances de 10'
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
export default function SommePuissancesDeDix () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur25'
  this.nouvelleVersion = function () {
    const a = combinaisonListes([0, 1, 2, 3, 4, 5, 6, 7, 8], 3)
    this.question = `$10^${a[0]}+10^${a[1]}+10^${a[2]}$`
    this.correction = `$10^${a[0]}+10^${a[1]}+10^${a[2]}=${10 ** a[0]}+${10 ** a[1]}+${10 ** a[2]}=${10 ** a[0] + 10 ** a[1] + 10 ** a[2]}$`
    this.reponse = calcul(10 ** a[0] + 10 ** a[1] + 10 ** a[2])
  }
}
