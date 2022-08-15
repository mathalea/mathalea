import { ExoRose } from '../6e/_Roses.js'
export const titre = 'Rose multiplicative relatifs'
export { interactifReady, interactifType } from '../6e/_Roses.js'
export const dateDePublication = '12/08/2022'

/**
 * Travailler les tables de multiplication autrement
 * @author Jean-Claude Lhote
 * Référence 4C10-9
 */

export default function RoseAdditive4R () { // c'est l'ExoRose zéro contenu dans _Roses.js
  ExoRose.call(this) // Héritage de la classe Exercice()
  this.operation = 'multiplication'
  this.typeDonnees = 'entiers relatifs'
}
