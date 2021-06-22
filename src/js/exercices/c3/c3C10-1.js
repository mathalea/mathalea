import TablesDeMultiplications from '../6e/_Tables_de_multiplications.js'
export const titre = 'Tables de multiplications'

/**
 * Lire des nombres déciamux sur une portion de droite graduée
 * Une question demande la forme décimale, une autre, la partie entière plus la fraction décimale, et une troisième demande une seule fraction décimale.
 * ref 6N23-2
 *
 * @author Jean-Claude Lhote
 */
export default function TablesDeMultiplicationsCM () {
  TablesDeMultiplications.call(this)
  this.titre = titre
  this.sup2 = 1
}
