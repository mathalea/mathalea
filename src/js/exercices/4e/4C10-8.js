import FabriqueAYohaku from '../6e/_Yohaku.js'
export const titre = 'Résoudre un Yohaku multiplicatif nombres relatifs niveau 1'
export const dateDePublication = '10/08/2022'
export { interactifReady, interactifType } from '../6e/_Yohaku.js'

export const uuid = '2fbc0'
export const ref = '4C10-8'
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
