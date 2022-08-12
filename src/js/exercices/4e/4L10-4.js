import { ExoRose } from '../6e/_Roses.js'
export const titre = 'Rose additive littéraux'
export { interactifReady, interactifType } from '../6e/_Roses.js'
export const dateDePublication = '12/08/2022'

/**
 * Travailler les réductions d'expressions littérales
 * @author Jean-Claude Lhote
 * Référence 4L10-4
 */

export default function RoseAdditive4L () { // c'est l'ExoRose zéro contenu dans _Roses.js
  ExoRose.call(this) // Héritage de la classe Exercice()
  this.operation = 'addition'
  this.typeDonnees = 'littéraux'
}
