import TransformationsDuPlanEtCoordonnees from '../3e/3G10-1.js'
export const titre = 'Trouver les coordonnées de l\'image d\'un point par une symétrie axiale ou centrale'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3G10-1.js'
export const dateDePublication = '28/10/2021'
/**
 * Transformations : symétrie centrale et repérage
 * @author Jean-Claude Lhote
 * référence 5G11-5 réglage de 3G10-1
 */
export const uuid = '2d2bb'
export const ref = '5G11-5'
export default function SymetriesEtCoordonnees5e () {
  TransformationsDuPlanEtCoordonnees.call(this)
  this.sup = 2
  this.sup2 = false
  this.besoinFormulaire = false
  this.besoinFormulaire2 = false
}
