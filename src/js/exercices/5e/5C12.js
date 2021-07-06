import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'

export const titre = 'Calculer une expression numérique en détaillant les calculs'

/**
 * @author Jean-Claude Lhote
 * Référence 5C12
 */
export default function CalculerUneExpressionNumerique () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 4
  this.titre = titre
}
