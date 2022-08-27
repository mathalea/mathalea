import FabriqueAYohaku from '../6e/Yohaku.js'
export const titre = 'Yahoku additif expressions littérales niveau 1'
export const dateDePublication = '10/08/2022'
export { interactifReady, interactifType } from '../6e/Yohaku.js'

export const uuid = '4c5da'
export const ref = '4L10-3'
export default function FabriqueAYohaku4L1 () {
  FabriqueAYohaku.call(this)
  this.sup = 10
  this.sup2 = 1
  this.sup3 = 2
  this.sup4 = false
  this.type = 'littéraux'
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2Numerique = false
  this.besoinFormulaire3Numerique = false
  this.besoinFormulaire4CaseACocher = ['Avec aide (la présence d\'une valeur impose une solution unique)', false]
}
