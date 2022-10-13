import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { semiEllipse } from './ellipse'
import { point } from './point'
import { segment } from './segment'
/** @module cone */

/**
 * Trace un cône
 * @param {Point} centre Centre de la base
 * @param {number} Rx Rayon sur l'axe des abscisses
 * @param {number} hauteur Distance verticale entre le centre et le sommet.
 * @param {string} [color = 'black'] Facultatif, 'black' par défaut
 * @param {string} [couleurDeRemplissage = 'none'] none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage = 0.2] Taux d'opacité du remplissage
 * @author Jean-Claude Lhote
 * @private
 */
function Cone ({ centre, Rx, hauteur, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2 }) {
  ObjetMathalea2D.call(this, { })
  const sommet = point(centre.x, centre.y + hauteur)
  this.sommet = sommet
  this.centre = centre
  this.color = color
  this.couleurDeRemplissage = couleurDeRemplissage
  this.opaciteDeRemplissage = opaciteDeRemplissage
  const objets = [
    semiEllipse({ centre, Rx, Ry: Rx / 3, hemisphere: 'nord', rayon: false, pointilles: 1, couleurDeRemplissage, color: this.color, opaciteDeRemplissage }),
    semiEllipse({ centre, Rx, Ry: Rx / 3, hemisphere: 'sud', rayon: false, pointilles: false, couleurDeRemplissage, color: this.color, opaciteDeRemplissage }),
    segment(point(centre.x + Rx, centre.y + 0.1), sommet, this.color),
    segment(point(centre.x - Rx, centre.y + 0.1), sommet, this.color)
  ]
  let xMin = 1000; let yMin = 1000; let yMax = -1000; let xMax = -1000
  for (const obj of objets) {
    xMin = Math.min(xMin, obj.bordures[0])
    yMin = Math.min(yMin, obj.bordures[1])
    xMax = Math.max(xMax, obj.bordures[2])
    yMax = Math.max(yMax, obj.bordures[3])
  }
  this.bordures = [xMin, yMin, xMax, yMax]
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      objet.color = colorToLatexOrHTML(this.color)
      code += objet.svg(coeff) + '\n'
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      objet.color = this.color
      code += objet.tikz() + '\n\t'
    }
    return code
  }
}

// Cette fonction donne un rendu correct que si la hauteur est suffisamment grande
export function cone ({ centre, Rx, hauteur, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2 }) {
  return new Cone({ centre, Rx, hauteur, couleurDeRemplissage, color, opaciteDeRemplissage })
}
