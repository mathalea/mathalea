import { ExoRose } from '../6e/_Roses.js'
export const titre = 'Rose multiplicative littéraux'
export { interactifReady, interactifType } from '../6e/_Roses.js'
export const dateDePublication = '12/08/2022'

/**
 * Travailler la double distribu
 * @author Jean-Claude Lhote
 * Référence 3L11-9
 */

export const uuid = '4963b'
export const ref = '3L11-9'
export default function RoseAdditive4L () { // c'est l'ExoRose zéro contenu dans _Roses.js
  ExoRose.call(this) // Héritage de la classe Exercice()
  this.operation = 'multiplication'
  this.typeDonnees = 'litteraux'
  this.besoinFormulaireNumerique = ['Valeur maximale (entre 10 et 30) des facteurs', 30]
  this.besoinFormulaire2Numerique = ['Nombre de facteur entre 3 et 5', 5]
}
