import listerDiviseursParDecompositionFacteursPremiers from '../3e/3A11-3.js'
export const titre = 'Compter/lister les diviseurs dun entier à partir de sa décomposition en facteurs premiers'
export const dateDeModifImportante = '14/11/2021'

/**
 * Clone de 3A11-3 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */

export default function listerDiviseursParDecompositionFacteursPremiers2nde () {
  listerDiviseursParDecompositionFacteursPremiers.call(this)
  this.sup = true
  this.besoinFormulaireCaseACocher = false
}
