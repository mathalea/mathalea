import FabriqueAYohaku from '../beta/betaYohaku.js'
export const titre = 'Yahoku multiplicatif nombres relatifs niveau 1'
export const dateDePublication = '10/08/2022'
export { interactifReady, interactifType } from '../beta/betaYohaku.js'

export default function FabriqueAYohaku4R1 () {
  FabriqueAYohaku.call(this)
  this.sup = 10
  this.sup2 = 2
  this.sup3 = 2
  this.sup4 = false
  this.type = 'entiers relatifs'
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2Numerique = false
  this.besoinFormulaire3Numerique = false
  this.besoinFormulaire4CaseACocher = ['Avec aide (la présence d\'une valeur impose une solution unique)', false]
}
