import DivisionsEuclidiennes from '../6e/6C11.js'
export const titre = 'Divisions euclidiennes'

/**
 * Lire des nombres déciamux sur une portion de droite graduée
 * Une question demande la forme décimale, une autre, la partie entière plus la fraction décimale, et une troisième demande une seule fraction décimale.
 * ref 6N23-2
 *
 * @author Jean-Claude Lhote
 */
export default function DivisionCycle3 () {
  DivisionsEuclidiennes.call(this)
  this.sup = 0
}
