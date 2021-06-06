/* eslint-disable camelcase */

import PerimetreOuAireDeCarresRectanglesTriangles from './6M11-1.js'
import { amcReady, interactifReady, amcType, interactifType } from './6M11-1.js'
export const titre = 'Aires carrés, rectangles et triangles rectangles'
export { amcReady, interactifReady, amcType, interactifType } from './6M11-1.js'

/**
 * Un carré, un rectangle et un triangle rectangle sont tracés.
 *
 * Il faut calculer les aires
 *
 * Pas de version LaTeX
 * @author Rémi Angot
 * Référence 6M11-1
 */
export default function AireCarresRectanglesTriangles () {
  PerimetreOuAireDeCarresRectanglesTriangles.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.ref = '6M11'
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactif = false
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = "Calculer l'aire des 3 figures suivantes"
}
