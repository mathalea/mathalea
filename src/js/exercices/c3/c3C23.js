import ExerciceAdditionnerOuSoustraireDesFractions5e from '../5e/5N20.js'
export const titre = 'Additionner des fractions simples'
export { interactifReady, interactifType, amcReady, amcType } from '../5e/5N20.js'
/**
 *Clone de 5N20 pour les CM1-CM2
 *
 * @author Jean-Claude Lhote
 */
export default function MultiplierDecimauxPar101001000C3 () {
  ExerciceAdditionnerOuSoustraireDesFractions5e.call(this)
  this.nbQuestions = 4
  this.sup = 1
  this.sup2 = 1
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2Numerique = false
}
