import LireUneAbscisseAvecZoom from '../6e/6N23-3.js'
export const titre = 'Lire abscisse décimale avec zoom'

/**
 * Lire un nombre décimal jusqu'au millième graĉe à un système de zoom successifs
 * L'abscisse est à donner sous trois formes.
 * ref 6N23-3
 * Publié le 13/11/2020
 * @author Jean-Claude Lhote
 */
export default function lireUneAbscisseAvecZoomCM () {
  LireUneAbscisseAvecZoom.call(this)
  this.niveau = 'CM'
  this.sup = 1
}
