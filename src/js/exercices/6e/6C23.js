import Exercice_additionner_ou_soustraire_des_fractions_5e from '../5e/5N20.js'

export const amcReady = true
export const amcType = 1 // type de question AMC

export const titre = 'Additionner ou soustraire des fractions de même dénominateur'

export default function Exercice_additionner_des_fractions_6e () {
  Exercice_additionner_ou_soustraire_des_fractions_5e.call(this)
  this.sup = 1
  this.sup2 = 3
  this.level = 6
  this.titre = titre
  this.besoinFormulaireNumerique2 = false
}
