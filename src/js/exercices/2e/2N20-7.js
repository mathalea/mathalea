import ppcmEngrenages from '../3e/3A13.js'
export const titre = 'Engrenages'
export const dateDeModifImportante = '14/11/2021'

/**
 * Clone de 3A11-3 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */

export default function ppcmEngrenages2nde () {
  ppcmEngrenages.call(this)
  this.sup = true
  this.besoinFormulaireCaseACocher = false
}
