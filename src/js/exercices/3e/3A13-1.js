import DivisionsEuclidiennes from '../6e/6C11.js'
export const titre = 'Poser divisions euclidiennes'
export const dateDePublication = '14/09/2022'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Poser et effectuer les divisions euclidiennes suivantes puis donner l'égalité fondamentale correspondante.
 * Ref 3A13-1
 *
 * @author Eric Elter
 */

export const uuid = '8741f'
export const ref = '3A13-1'
export default function DivisionsEuclidiennes3e () {
  DivisionsEuclidiennes.call(this)
  this.sup = 2
}
