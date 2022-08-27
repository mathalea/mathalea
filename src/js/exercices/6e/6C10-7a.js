import FabriqueAYohaku from './Yohaku.js'
export const titre = 'Yahoku additif niveau 1'
export const dateDePublication = '10/08/2022'
export { interactifReady, interactifType } from '../6e/Yohaku.js'

export const uuid = '26bb9'
export const ref = '6C10-7a'
export default function FabriqueAYohaku6A () {
  FabriqueAYohaku.call(this)
  this.sup = 10
  this.sup2 = 1
  this.sup3 = 2
  this.sup4 = false
  this.type = 'entiers'
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2Numerique = false
  this.besoinFormulaire3Numerique = false
  this.besoinFormulaire4CaseACocher = ['Avec aide (la présence d\'une valeur impose une solution unique)', false]
}
