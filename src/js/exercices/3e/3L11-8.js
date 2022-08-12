import FabriqueAYohaku from '../6e/Yohaku.js'
export const titre = 'Yahoku multiplicatif expressions littérales niveau 1'
export { interactifReady, interactifType } from '../6e/Yohaku.js'

export const dateDePublication = '10/08/2022'

export default function FabriqueAYohaku3L1 () {
  FabriqueAYohaku.call(this)
  this.sup = 10
  this.sup2 = 2
  this.sup3 = 2
  this.sup4 = false
  this.type = 'littéraux'
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2Numerique = false
  this.besoinFormulaire3Numerique = false
  this.besoinFormulaire4CaseACocher = ['Avec aide (la présence d\'une valeur impose une solution unique)', false]
}
