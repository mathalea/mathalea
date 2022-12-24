import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'
export const titre = 'Traduire une expression par une phrase'
export const dateDeModificationImportante = '25/03/2022'

/**
 * @author Jean-Claude Lhote
 * Référence 5C11-1
 */
export const uuid = 'baa4b'
export const ref = '5C11-1'
export default function TraduireUneExpressionParUnePhrase () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 2
  this.titre = titre
  this.nbQuestions = 5
  this.sup4 = 1
  this.sup = NaN
  this.besoinFormulaire4Numerique = ['Niveau de difficulté', 4, '1 : de 1 à 3 opérations\n2 : de 2 à 3 opérations\n3 : jusqu\'à 4 opérations\n4 : opérations plus complexes']
}
