import PavagesEtTransformations from '../6e/_Pavages_et_transformations.js'

export const titre = 'Trouver l’image d’une figure par une rotation de 90 degrés dans un pavage'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Pavages_et_transformations.js'

/**
 * Exercice en html seulement. Rotationss dans un pavage.
 * @author Jean-Claude Lhote
 * référence 3G12-1
 */
export default function PavagesEtRotation () {
  PavagesEtTransformations.call(this)
  this.titre = titre
  this.level = 3
}
