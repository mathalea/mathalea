import { ExoRose } from '../6e/_Roses.js'
export const titre = 'Rose multiplicative littéraux'
export { interactifReady, interactifType } from '../6e/_Roses.js'
export const dateDePublication = '12/08/2022'

/**
 * Travailler la double distribu
 * @author Jean-Claude Lhote
 * Référence 3L11-9
 */

export default function RoseAdditive4L () { // c'est l'ExoRose zéro contenu dans _Roses.js
  ExoRose.call(this) // Héritage de la classe Exercice()
  this.operation = 'multiplication'
  this.typeDonnees = 'littéraux'
}