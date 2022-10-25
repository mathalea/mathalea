import LireAbscisseDecimaleTroisFormes from '../6e/6N23-2.js'
export const titre = 'Lire abscisse décimale sous trois formes'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/6N23-2.js'
/**
 * Lire un nombre / écrire un nombre : passer d'une écriture à une autre et inversement
 * On peut fixer la classe maximale : unités, milliers, millions, milliards
 * @author Jean-Claude Lhote
 * Référence 6N10
 */
export const uuid = '2fa3b'
export const ref = 'c3N22'
export default function LireAbscisseDecimaleTroisFormesCM () {
  LireAbscisseDecimaleTroisFormes.call(this)
  this.titre = titre
  this.niveau = 'CM'
  this.sup = 1
}
