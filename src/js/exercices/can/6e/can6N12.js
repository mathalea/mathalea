import sommmeFractionsDecimales from '../../6e/6N10-6.js'
export { interactifReady, interactifType, amcType, amcReady } from '../../6e/6N10-6.js'
export const titre = 'Donner le résultat de ce calcul en écriture décimale'

export const dateDePublication = '20/01/2022'

/*!
 * @author Eric Elter
 * Créé le 20/01/2022
 * Référence can6N12
 */
export default function sommmeFractionsDecimalesCAN () {
  sommmeFractionsDecimales.call(this)
  this.nbQuestions = 1
  this.can = true
  this.sup = '3-4'
  this.sup2 = 1
}
