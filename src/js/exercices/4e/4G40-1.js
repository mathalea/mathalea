import ArrondirUneValeur from '../6e/6N31-3.js'
export const titre = 'Encadrer puis arrondir une valeur comprenant un cosinus'

/**
 * Encadrer puis arrondir un cosinus
 * @Auteur Mireille Gain, 9 mai 2021
 * référence 4G40-1
 */

export default function ArrondirUneValeur4e () {
  ArrondirUneValeur.call(this)
  this.titre = titre
  this.sup = 4
  this.sup2 = true
  this.spacing = 3
  this.besoinFormulaireNumerique = false
}
