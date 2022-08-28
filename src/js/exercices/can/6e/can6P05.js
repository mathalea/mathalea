import AppliquerUnPourcentage from './can6P04.js'
export { interactifReady, interactifType, amcReady, amcType } from './can6P04.js'
export const titre = 'Appliquer un pourcentage (bis)'
export const dateDePublication = '13/11/2021'
/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6P04 Complété par des corrections de Gilles Mora
 */
export const uuid = 'a2bbc'
export const ref = 'can6P05'
export default function AppliquerUnPourcentageBis () {
  AppliquerUnPourcentage.call(this)
  this.bis = true
  this.tailleDiaporama = 2
}
