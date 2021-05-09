import ArrondirUneValeur from '../6e/6N31-3.js'
export const titre = 'Arrondir une valeur arrondie comprenant un cosinus'

/**
 * Arrondir une racine carrée
 * @Auteur Mireille Gain, 9 mai 2021
 * référence 4G40-1
 */

export default function ArrondirUneValeur4e () {
  ArrondirUneValeur.call(this)
  this.titre = titre
  this.sup = 4
  this.sup2 = true
  this.besoinFormulaireNumerique = ['Type de nombre', 4, '1 : Nombre décimal\n 2 : Fraction\n 3 : Racine carrée\n 4 : Cosinus']
}