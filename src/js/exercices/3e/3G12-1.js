import PavagesEtTransformations from '../6e/_Pavages_et_transformations.js'

export const titre = 'Trouver l\'image d\'une figure par une rotation de 90 degrés dans un pavage'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Pavages_et_transformations.js'
export const dateDeModifImportante = '15/01/2023' //  Par EE

/**
 * Rotations dans un pavage.
 * @author Jean-Claude Lhote
 * référence 3G12-1
 */
export const uuid = '034f1'
export const ref = '3G12-1'
export default function PavagesEtRotation () {
  PavagesEtTransformations.call(this)
  this.titre = titre
  this.level = 3
  this.besoinFormulaireNumerique = false
}
