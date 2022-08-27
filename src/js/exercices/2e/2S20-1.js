import calculEffectifFrequence from '../3e/3S12.js'
export const titre = 'Calculer des effectifs et des fréquences'
export { interactifReady, interactifType } from '../3e/3S12.js'
// export { amcReady, amcType } from '../3e/3S12.js'

/**
 * Clone de 3S12 pour les 2nde
 *
 * @author Sébastien LOZANO
 */
export const uuid = 'dc3d2'
export const ref = '2S20-1'
export default function calculEffectifFrequence2nde () {
  calculEffectifFrequence.call(this)
}
