import ExerciceLabyrintheMultiples from '../6e/6C10-5.js'
export const titre = 'Labyrinthe de multiples'

/**
 * Lire des nombres déciamux sur une portion de droite graduée
 * Une question demande la forme décimale, une autre, la partie entière plus la fraction décimale, et une troisième demande une seule fraction décimale.
 * ref 6N23-2
 *
 * @author Jean-Claude Lhote
 */
export const uuid = '40ae0'
export const ref = 'c3C10-2'
export default function LabyrintheDeMultiplesCM () {
  ExerciceLabyrintheMultiples.call(this)
  this.niveau = 'CM'
  this.sup = 5
  this.sup2 = 10
  this.sup3 = 3
}
