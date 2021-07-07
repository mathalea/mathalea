import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'

export const titre = 'Traduire une expression par une phrase'

/**
 * @author Jean-Claude Lhote
 * Référence 5C11-1
 */
export default function TraduireUneExpressionParUnePhrase () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 2
  this.titre = titre
}
