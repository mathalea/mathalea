import { choice } from '../../modules/outils.js'
import Transformations from '../6e/_Transformations.js'

export const titre = 'Trouver l\'image d\'un point par une symétrie axiale'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Transformations.js'

/** */
// 5G10
export const uuid = 'da157'
export const ref = '5G10'
export default function SymetrieAxiale5e () {
  Transformations.call(this)
  this.sup = choice(['1-2-3', '1-2-4', '2-3-4', '1-3-4'])
  this.titre = titre
}
