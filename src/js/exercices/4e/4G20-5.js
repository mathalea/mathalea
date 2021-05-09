import ArrondirUneValeur from '../6e/6N31-3.js'
export const titre = 'Trouver la valeur arrondie d’une racine carrée'

/**
 * Arrondir une racine carrée
 * @Auteur Mireille Gain, 13 avril 2021
 * référence 4G20-5
 */

export default function ArrondirUneValeur4e () {
  ArrondirUneValeur.call(this)
  this.titre = titre
  this.sup = 3
  this.sup2 = true
  this.besoinFormulaireNumerique = ['Type de nombre', 3, '1 : Nombre décimal\n 2 : Fraction\n 3 : Racine carrée']
}
