import ExerciceTablesAdditions from '../6e/6C10-4.js'
export const titre = 'Tables daddition'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/6C10-4.js'

/**
 * Lire des nombres déciamux sur une portion de droite graduée
 * Une question demande la forme décimale, une autre, la partie entière plus la fraction décimale, et une troisième demande une seule fraction décimale.
 * ref 6N23-2
 *
 * @author Jean-Claude Lhote
 */
export default function TablesAdditionsCycle3 () {
  ExerciceTablesAdditions.call(this, 10)
}
