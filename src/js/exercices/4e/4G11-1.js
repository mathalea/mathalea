import PavagesEtTransformations from '../6e/_Pavages_et_transformations.js'

export const titre = 'Trouver l’image d’une figure par une translation dans un pavage'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Pavages_et_transformations.js'

/**
 * Exercice en html seulement. Translations dans un pavage.
 * @author Jean-Claude Lhote
 * référence 4G11-1
 */
export default function PavagesEtTranslation () {
  PavagesEtTransformations.call(this)
  this.titre = titre
  this.level = 4
  this.besoinFormulaireNumerique = false
}
