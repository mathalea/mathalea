import { ExoRose } from './_Roses.js'
export const titre = 'Rose multiplicative'
export { interactifReady, interactifType } from './_Roses.js'
export const dateDePublication = '12/08/2022'
/**
 * Travailler les tables de multiplication autrement
 * @author Jean-Claude Lhote
 * Référence 6C10-6
 */

export default function RoseMultiplicative () { // c'est l'ExoRose zéro contenu dans _Roses.js
  ExoRose.call(this) // Héritage de la classe Exercice()
  this.besoinFormulaire2Numerique = ['Nombre de facteurs entre 3 et 9', 9]
}
