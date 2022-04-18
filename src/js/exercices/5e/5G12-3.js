import TrouverLaTransformations from '../4e/4G12-1.js'
export const titre = 'Identifier une transformation'
export { interactifReady, interactifType } from '../4e/4G12-1.js'
export const dateDePublication = '4/12/2021'

/*!
 * @author Jean-Claude Lhote
 * Créé le 4/12/2021
 * Référence 5G12-3 clone Symétries de 4G12-1
 */
export default function TrouverLaTransformations5e () {
  TrouverLaTransformations.call(this)
  this.titre = titre
  this.version = 1
  this.nbQuestions = 1
  this.besoinFormulaireNumerique = false
}
