import DeterminerDerniereOperationExpressionLitterale from '../5e/5L14-4.js'
export const titre = 'Déterminer si ces expressions sont des sommes, des différences, des produits ou des quotients'

/**
 * @author Guillaume Valmont
 * reference 4L16
 * Publié le 14/08/2021
 */
export const uuid = '68cda'
export const ref = '4L16'
export default function DeterminerStructureExpressionLitterale () {
  DeterminerDerniereOperationExpressionLitterale.call(this)
  this.titre = titre
  this.consigne = 'Déterminer si ces expressions sont des sommes, des différences, des produits ou des quotients.'
}
