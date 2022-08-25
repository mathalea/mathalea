import LectureDiagrammeBarre from '../6e/6S10.js'
export const titre = 'Lire un diagramme en barres'

export { interactifReady, interactifType } from '../6e/6S10.js'
export { amcReady, amcType } from '../6e/6S10.js'

/**
 * Lire un diagramme en barres
 * @author Guillaume Valmont
 * reference 5S11
 * Publié le 08/08/2021
 * Fix export interactif et AMC Sébastien LOZANO
 */
export default function LectureDiagrammeBarre5e () {
  LectureDiagrammeBarre.call(this)
  // this.titre = titre
  this.sup = 3
  this.sup2 = 2
}
