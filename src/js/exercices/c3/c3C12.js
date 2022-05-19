import DernierChiffre from '../6e/6C34.js'
export const titre = 'Dernier chiffre dun calcul'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/6C34.js'
/**
 *Clone de 6C34 pour les CM1-CM2
 *
 * @author Jean-Claude Lhote
 */
export default function DerbierChiffreC3 () {
  DernierChiffre.call(this)
  this.nbQuestions = 4
  this.version = 2
  this.besoinFormulaireNumerique = false
}
