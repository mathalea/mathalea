import SerieDeTransformations from '../4e/4G12.js'
export const titre = 'Trouver les symétries successives dans un damiers'
export { interactifReady, interactifType, amcReady, amcType } from '../4e/4G12.js'
export const dateDePublication = '4/12/2021'

/*!
 * @author Jean-Claude Lhote
 * Créé le 4/12/2021
 * Référence 5G12-2 clone Symétrie axiale de 4G12
 */
export const uuid = 'dbc1d'
export const ref = '5G12-2'
export default function SerieDeTransformations5e () {
  SerieDeTransformations.call(this)
  this.titre = titre
  this.version = 2
  this.nbQuestions = 1
  this.besoinFormulaireNumerique = false
}
