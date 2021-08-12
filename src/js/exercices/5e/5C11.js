import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'

export const titre = 'Traduire une phrase par une expression'

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
}
