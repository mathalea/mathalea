import PavagesEtTransformations from './_Pavages_et_transformations.js'

export const titre = 'Trouver l’image d’une figure par une symétrie axiale dans un pavage carré'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Pavages_et_transformations.js'

/**
 * Exercice en html seulement. Symétrie axiale dans un pavage.
 * @author Jean-Claude Lhote
 * référence 6G25-2
 */
export default function PavagesEtSymetries () {
  PavagesEtTransformations.call(this)
  this.titre = titre
  this.sup = 1
  this.besoinFormulaireNumerique = false
}
