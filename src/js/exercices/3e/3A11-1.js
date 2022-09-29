import ProblemesEvenementsRecurrents from '../4e/4A12.js'
export const titre = 'Résoudre des problèmes de conjonction de phénomènes'
export const interactifReady = true // pour définir qu'exercice peut s'afficher en mode interactif.
export const interactifType = 'mathLive'
export const amcReady = true // pour définir que l'exercice est exportable AMC
export const amcType = 'AMCHybride'

/**
 * Problèmes d'événements récurrents avec résolution à l'aide de décompositions en produits de facteurs premiers
 * @author Guillaume Valmont
 * Référence 3A11-1
 * 30/10/2021
 */
export const uuid = '80772'
export const ref = '3A11-1'
export default function ProblemesEvenementsRecurrents3e () {
  ProblemesEvenementsRecurrents.call(this)
  this.titre = titre
  this.sup = 2
}
