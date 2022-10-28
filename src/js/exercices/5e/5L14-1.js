import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'
export const titre = 'Calculer une expression littérale pour les valeurs données en détaillant les calculs'

/**
 * @author Jean-Claude Lhote
  * Référence 5L14-1
*/
export const uuid = '1abc6'
export const ref = '5L14-1'
export default function CalculerUneExpressionLitterale () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 4
  this.titre = titre
  this.litteral = true
  this.sup4 = 4
}
