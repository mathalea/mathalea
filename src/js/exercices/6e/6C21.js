import DivisionsEuclidiennes from './6C11.js'
export { interactifReady } from './6C11.js'
export { interactifType } from './6C11.js'
export { amcReady } from './6C11.js'
export { amcType } from './6C11.js'
export const titre = 'Effectuer divisions euclidiennes - Niveau 2'

/**
 * @author Rémi Angot
 * référence 6C21
*/

export const uuid = 'bbcac'
export const ref = '6C21'
export default function DivisionsEuclidiennesNiv2 () {
  DivisionsEuclidiennes.call(this)
  this.sup = 2
  this.titre = titre
  this.tailleDiaporama = 3
}
