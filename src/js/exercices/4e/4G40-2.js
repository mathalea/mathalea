import ArrondirUneValeur from '../4e/4G20-4.js'
export const titre = 'Arrondir une valeur comprenant un cosinus'

/**
 * Arrondir un cosinus
 * @Auteur Mireille Gain, 2 juillet 2021
 * référence 4G40-2
 */

export default function ArrondirUneValeur4e () {
  ArrondirUneValeur.call(this)
  this.titre = titre
  this.sup = 2
  this.sup2 = true
  this.spacing = 3
  this.besoinFormulaireNumerique = false
}