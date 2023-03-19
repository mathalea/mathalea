import identitesCalculs from '../../3e/3L11-5.js'
export { interactifReady, interactifType } from '../../3e/3L11-5.js'

/**
 * * Calcul mental autour des identités remarquables
 * * Clone de 3L11-5
 * * numéro de l'exo ex : can2C04
 * * publié le  8/10/2021
 * @author Sébastien Lozano
 */

export const titre = 'Calculer avec les identités remarquables - simple'

export const uuid = '69522'
export const ref = 'can2C04'
export default function IdentitesCalculs2e () {
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.can = true
  this.canVersion = 'v1'
  this.consigne = ''
  identitesCalculs.call(this)
  this.nbQuestions = 1
}
