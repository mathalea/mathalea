import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'
export const titre = 'Traduire une expression par une phrase'

/**
 * @author Jean-Claude Lhote
 * Référence 5L10-3
 */
export const uuid = '458ae'
export const ref = '5L10-3'
export default function TraduireUneExpressionLitteraleParUnePhrase () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 2
  this.titre = titre
  this.litteral = true
  this.sup = 2
}
