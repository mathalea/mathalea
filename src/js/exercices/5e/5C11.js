import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'
export const titre = 'Traduire une phrase par une expression'
export const dateDeModificationImportante = '25/03/2022'
/**
 * @author Jean-Claude Lhote
 * Référence 5C11
 */
export default function TraduireUnePhraseParUneExpression () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 1
  this.sup = false
  this.sup2 = false
  this.titre = titre
  this.nbQuestions = 5
  this.sup4 = 1
  this.besoinFormulaire4Numerique = ['Niveau de difficulté', 4, '1 : 2-2-1\n2 : 1-2-2\n3 : 0-2-2-1\n4 : 0-1-1-1-1']
}
