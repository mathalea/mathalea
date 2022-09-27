import PavagesEtTransformations from '../6e/_Pavages_et_transformations.js'
export const titre = 'Symétrique d\'une figure dans un pavage'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Pavages_et_transformations.js'

/**
 * Exercice en html seulement. Symétrie centrale dans un pavage.
 * @author Jean-Claude Lhote
 * référence 5G12-1
 */
export const uuid = '261bf'
export const ref = '5G12-1'
export default function PavagesEtDemiTour () {
  PavagesEtTransformations.call(this)
  this.titre = titre
  this.level = 5
  this.besoinFormulaireNumerique = false
}
