import ExerciceAdditionnerOuSoustraireDesFractions5e from '../5e/5N20.js'

export const amcReady = true
export const interactifReady = true

export const amcType = 1 //type de question AMC 

export const titre = 'Additionner ou soustraire des fractions de même dénominateur'

export default function ExerciceAdditionnerFractions6e () {
  ExerciceAdditionnerOuSoustraireDesFractions5e.call(this)
  this.sup = 1
  this.sup2 = 3
  this.level = 6
  this.titre = titre
  this.besoinFormulaireNumerique2 = false
  this.interactifReady = interactifReady
  this.amcType = amcType
  this.amcReady = amcReady
}
