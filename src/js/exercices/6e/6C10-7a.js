import FabriqueAYohaku from '../beta/betaYohaku.js'
export const titre = 'Yahoku additif niveau 1'
export default function FabriqueAYohaku6A () {
  FabriqueAYohaku.call(this)
  this.sup = 10
  this.sup2 = 1
  this.sup3 = 2
  this.sup4 = false
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2Numerique = false
  this.besoinFormulaire3Numerique = false
  this.besoinFormulaire4CaseACocher = ['Avec aide', false]
}
