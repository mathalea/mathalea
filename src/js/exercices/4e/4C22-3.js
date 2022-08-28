import FabriqueAYohaku from '../6e/Yohaku.js'
export const titre = 'Yohaku multiplicatif fractions niveau 1'
export const dateDePublication = '10/08/2022'
export { interactifReady, interactifType } from '../6e/Yohaku.js'

export const uuid = 'ee808'
export const ref = '4C22-3'
export default function FabriqueAYohaku4CF2 () {
  FabriqueAYohaku.call(this)
  this.sup = 10
  this.sup2 = 2
  this.sup3 = 2
  this.sup4 = false
  this.type = 'fractions positives dénominateurs premiers'
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2Numerique = false
  this.besoinFormulaire3Numerique = false
  this.besoinFormulaire4CaseACocher = ['Avec aide (la présence d\'une valeur impose une solution unique)', false]
}
