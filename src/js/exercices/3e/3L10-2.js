import OpposeExpression from '../3e/3L10.js'

export const titre = 'Supprimer les parenthèses puis réduire l\'expression (niveau 2)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCHybride'
export const amcReady = true

export const dateDePublication = '28/11/2022'
/**
 * Donner l'opposé d'une expression.
 *
 * Ajout des différents cas de 4 à 10 par Mickael Guironnet
 * @author Mickael Guironnet
 * 3L10-2
 */
export const uuid = 'c88ba'
export const ref = '3L10-2'
export default class ReduireExpressionComplexe extends OpposeExpression {
  constructor () {
    super()
    this.titre = titre
    this.sup = '5-6-7-8-9-10'
  }
}
