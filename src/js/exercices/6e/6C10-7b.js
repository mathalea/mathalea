import FabriqueAYohaku from './_Yohaku.js'
export const titre = 'Résoudre un Yohaku multiplicatif niveau 1'
export const dateDePublication = '10/08/2022'
export { interactifReady, interactifType } from './_Yohaku.js'
export const uuid = '08680'
export const ref = '6C10-7b'
export default function FabriqueAYohaku6B () {
  FabriqueAYohaku.call(this)
  this.sup = 10
  this.sup2 = 2
  this.sup3 = 2
  this.sup4 = false
  this.type = 'entiers'
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2Numerique = false
  this.besoinFormulaire3Numerique = false
  this.besoinFormulaire4CaseACocher = ['Avec aide (la présence d\'une valeur impose une solution unique)', false]
}
