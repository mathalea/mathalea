import { ExoRose } from '../6e/_Roses.js'
export const titre = 'Résoudre une Rose multiplicative avec des fractions'
export { interactifReady, interactifType } from '../6e/_Roses.js'
export const dateDePublication = '12/08/2022'

/**
 * Travailler les multiplications de fractions
 * @author Jean-Claude Lhote
 * Référence 4C22-4
 */

export const uuid = '4713e'
export const ref = '4C22-4'
export default function RoseAdditive4F () { // c'est l'ExoRose zéro contenu dans _Roses.js
  ExoRose.call(this) // Héritage de la classe Exercice()
  this.operation = 'multiplication'
  this.typeDonnees = 'fractions positives'
  this.besoinFormulaire2Numerique = ['Nombre de facteur entre 3 et 5', 5]
}
