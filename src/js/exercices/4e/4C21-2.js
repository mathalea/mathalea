import FabriqueAYohaku from '../6e/Yohaku.js'
export const titre = 'Yahoku additif fractions niveau 1'
export const dateDePublication = '10/08/2022'
export { interactifReady, interactifType } from '../6e/Yohaku.js'

export const uuid = '1a61d'
export const ref = '4C21-2'
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
