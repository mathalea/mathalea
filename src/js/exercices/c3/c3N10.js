import EcrireNombresEntiers from '../6e/6N10.js'
export const titre = 'Écrire un nombre en chiffres ou en lettres'

/**
 * Lire un nombre / écrire un nombre : passer d'une écriture à une autre et inversement
 * On peut fixer la classe maximale : unités, miliers, millions, milliards
 * @author Jean-Claude Lhote
 * Référence 6N10
 */
export const uuid = '85618'
export const ref = 'c3N10'
export default function EcrireEntiersCycle3 () {
  EcrireNombresEntiers.call(this)
  this.sup2 = 0
  this.sup = 1
}
