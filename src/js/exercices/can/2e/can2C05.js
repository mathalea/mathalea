import identitesCalculs from '../../3e/3L11-5.js'
export { interactifReady, interactifType } from '../../3e/3L11-5.js'

/**
 * * Calcul mental autour des identités remarquables
 * * Clone de 3L11-5
 * * numéro de l'exo ex : can2C05
 * * publié le  10/10/2021
 * @author Sébastien Lozano
 */

export const titre = 'Calculer avec les identités remarquables - Guidé'

export const uuid = 'c0f74'
export const ref = 'can2C05'
export default function IdentitesCalculs2e () {
  identitesCalculs.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.can = true
  this.canVersion = 'v2'
  this.consigne = ''
}
