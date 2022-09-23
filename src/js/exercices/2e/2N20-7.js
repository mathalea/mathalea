import ppcmEngrenages from '../3e/3A10-4.js'
export const titre = 'Engrenages'
export const dateDeModifImportante = '14/11/2021'

/**
 * Clone de 3A10-4 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */

export const uuid = 'c3c84'
export const ref = '2N20-7'
export default function PpcmEngrenages2nde () {
  ppcmEngrenages.call(this)
  this.sup = true
  this.besoinFormulaireCaseACocher = false
}
