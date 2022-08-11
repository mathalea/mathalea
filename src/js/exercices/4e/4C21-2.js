import FabriqueAYohaku from '../beta/betaYohaku.js'
export const titre = 'Yahoku additif fractions niveau 1'
export const dateDePublication = '10/08/2022'
export { interactifReady, interactifType } from '../beta/betaYohaku.js'

export default function FabriqueAYohaku4CF2 () {
  FabriqueAYohaku.call(this)
  this.sup = 10
  this.sup2 = 1
  this.sup3 = 2
  this.sup4 = false
  this.type = 'fractions dénominateurs multiples'
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2Numerique = false
  this.besoinFormulaire3Numerique = false
  this.besoinFormulaire4CaseACocher = ['Avec aide (la présence d\'une valeur impose une solution unique)', false]
}
