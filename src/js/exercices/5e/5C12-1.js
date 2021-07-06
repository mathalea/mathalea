import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'

export const titre = 'Traduire une phrase par une expression et la calculer'

/**
 * @author Jean-Claude Lhote
 * Référence 5C12-1
 */
export default function TraduireUnePhraseParUneExpressionEtCalculer () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 3
  this.titre = titre
}
