import CalculsFractionsSimples from '../c3/c3C23.js'
export const amcType = 'AMCNum'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Additionner ou soustraire des fractions de même dénominateur'

export const uuid = '64422'
export const ref = '6C23'
export default function ExerciceAdditionnerFractions6e () {
  CalculsFractionsSimples.call(this)
  this.sup = 4
  this.besoinFormulaireNumerique = ['Opérations', 5, '1 : Additions uniquement\n2 : Soustractions uniquement\n3: Multiplications par un entier uniquement\n4: Additions et soustractions\n5: Additions, soustractions ou multiplications par un entier']
}
