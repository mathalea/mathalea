
/**  Nomme les points passés en argument, le nombre d'arguments n'est pas limité.
 * @param  {...any} args Points mis à la suite
 * @param {string} [color = 'black'] Couleur des points : du type 'blue' ou du type '#f15929'
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur des points. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} taille Taille de la boite contenant le nom des points
 * @property {number} largeur Largeur de la boite contenant le nom des points
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @author Rémi Angot
 * @class
 */

import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { latexParCoordonnees, texteParPosition } from './textes'

// JSDOC Validee par EE Septembre 2022
function LabelPoint (...points) {
  ObjetMathalea2D().call(this, { })
  if (!this.taille) this.taille = 10
  if (!this.largeur) this.largeur = 10
  if (typeof points[points.length - 1] === 'string') {
    this.color = colorToLatexOrHTML(points[points.length - 1])
    points.length--
  } else this.color = colorToLatexOrHTML('black')
  let xmin = 1000
  let xmax = -1000
  let ymin = 1000
  let ymax = -1000
  let lePoint
  for (const unPoint of points) {
    if (unPoint.typeObjet !== 'point3d' && unPoint.typeObjet !== 'point') window.notify('LabelPoint : argument invalide', { ...points })
    lePoint = unPoint.typeObjet === 'point' ? unPoint : unPoint.c2d
    xmin = Math.min(xmin, lePoint.x - lePoint.positionLabel.indexOf('left') !== -1 ? 1 : 0)
    xmax = Math.max(xmax, lePoint.x + lePoint.positionLabel.indexOf('right') !== -1 ? 1 : 0)
    ymin = Math.min(ymin, lePoint.y - lePoint.positionLabel.indexOf('below') !== -1 ? 1 : 0)
    ymax = Math.max(ymax, lePoint.y + lePoint.positionLabel.indexOf('above') !== -1 ? 1 : 0)
  }
  this.bordures = [xmin, ymin, xmax, ymax]
  this.svg = function (coeff) {
    let code = ''; let x; let y, A
    if (Array.isArray(points[0])) {
      // Si le premier argument est un tableau
      this.listePoints = points[0]
    } else {
      this.listePoints = points
    }
    for (const unPoint of this.listePoints) {
      if (unPoint.typeObjet === 'point3d') {
        A = unPoint.c2d
      } else {
        A = unPoint
      }
      x = A.x
      y = A.y
      switch (A.positionLabel) {
        case 'left':
          code += texteParPosition(A.nom, x - 10 / coeff, y, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'right':
          code += texteParPosition(A.nom, x + 10 / coeff, y, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'below':
          code += texteParPosition(A.nom, x, y - 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'above':
          code += texteParPosition(A.nom, x, y + 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'above left':
          code += texteParPosition(A.nom, x - 10 / coeff, y + 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'above right':
          code += texteParPosition(A.nom, x + 10 / coeff, y + 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'below left':
          code += texteParPosition(A.nom, x - 10 / coeff, y - 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'below right':
          code += texteParPosition(A.nom, x + 10 / coeff, y - 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        default:
          code += texteParPosition(A.nom, x, y, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
      }
    }
    code = `<g id="${this.id}">${code}</g>`
    return code
  }
  this.tikz = function () {
    let code = ''; let A
    let style = ''
    if (this.color[0] !== 'black') {
      style = `,color=${this.color[1]}`
    }
    for (const unPoint of points) {
      if (unPoint.typeObjet === 'point3d') {
        A = unPoint.c2d
      } else {
        A = unPoint
      }
      code += `\t\\draw (${A.x},${A.y}) node[${A.positionLabel}${style}] {$${A.nom}$};\n`
    }
    return code
  }
}

/**  Nomme les points passés en argument, le nombre d'arguments n'est pas limité.
   * @param  {...any} args Points mis à la suite
   * @param {string} [color = 'black'] Couleur des points : du type 'blue' ou du type '#f15929'
   * @example labelPoint(A,B,C) // Retourne le nom des points A, B et C en noir
   * @example labelPoint(A,B,C,'red') // Retourne le nom des points A, B et C en rouge
   * @example labelPoint(A,B,C,'#f15929') // Retourne le nom des points A, B et C en orange (code couleur HTML : #f15929)
   * @author Rémi Angot
   * @return {LabelPoint}
   */
// JSDOC Validee par EE Septembre 2022
export function labelPoint (...args) {
  return new LabelPoint(...args)
}

/**
   * Associe à tous les points passés en paramètre, son label, défini préalablement en Latex. Par exemple, si besoin de nommer le point A_1.
   * @param {number} [distance=1.5] Taille de l'angle
   * @param {string} [label=''] Si vide, alors affiche la mesure de l'angle sinon affiche ce label.
   * @param {Object} parametres À saisir entre accolades
   * @param {Point|Point[]} [parametres.points = []] Point ou tableau de points
   * @param {string} [parametres.color = 'black'] Couleur du label : du type 'blue' ou du type '#f15929'
   * @param {number} [parametres.taille = 8] Taille du label
   * @param {number} [parametres.largeur = 10] Largeur en pixels du label à des fins de centrage
   * @param {number} [parametres.hauteur = 10] Hauteur en pixels du label à des fins de centrage
   * @param {string} [parametres.couleurDeRemplissage=''] Couleur de fond de ce label : du type 'blue' ou du type '#f15929'
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} color Couleur du label. À associer obligatoirement à colorToLatexOrHTML().
   * @property {number} taille Taille du label
   * @property {number} largeur Largeur en pixels du label à des fins de centrage
   * @property {number} hauteur Hauteur en pixels du label à des fins de centrage
   * @property {string} couleurDeRemplissage Couleur de fond de ce label. À associer obligatoirement à colorToLatexOrHTML().
   * @author Rémi Angot et Jean-Claude Lhote
   * @class
   */
// JSDOC Validee par EE Juin 2022
function LabelLatexPoint ({ points = [], color = 'black', taille = 8, largeur = 10, hauteur = 10, couleurDeRemplissage = '' } = {}) {
  ObjetMathalea2D.call(this, { })
  this.taille = taille
  this.largeur = largeur
  this.hauteur = hauteur
  this.couleurDeRemplissage = couleurDeRemplissage
  this.color = color

  const offset = 0.25 * Math.log10(this.taille) // context.pixelsParCm ne correspond pas forcément à la valeur utilisée par mathalea2d... cela peut entrainer un trés léger écart
  let x
  let y
  let A
  const objets = []
  if (Array.isArray(points[0])) {
    // Si le premier argument est un tableau
    this.listePoints = points[0]
  } else {
    this.listePoints = points
  }
  for (const unPoint of this.listePoints) {
    if (unPoint.typeObjet === 'point3d') {
      A = unPoint.c2d
    } else {
      A = unPoint
    }
    x = A.x
    y = A.y
    switch (A.positionLabel) {
      case 'left':
        objets.push(latexParCoordonnees(A.nom, x - offset, y, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'right':
        objets.push(latexParCoordonnees(A.nom, x + offset, y, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'below':
        objets.push(latexParCoordonnees(A.nom, x, y - offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'above':
        objets.push(latexParCoordonnees(A.nom, x, y + offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'above right':
        objets.push(latexParCoordonnees(A.nom, x + offset, y + offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'below left':
        objets.push(latexParCoordonnees(A.nom, x - offset, y - offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'below right':
        objets.push(latexParCoordonnees(A.nom, x + offset, y - offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      default:
        objets.push(latexParCoordonnees(A.nom, x - offset, y + offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
    }
  }

  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += objet.svg(coeff) + '\n'
    }
    code = `<g id="${this.id}">${code}</g>`
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += objet.tikz() + '\n'
    }
    return code
  }
}

/**
   * Associe à tous les points passés en paramètre, son label, défini préalablement en Latex. Par exemple, si besoin de nommer le point A_1.
   * @param {number} [distance=1.5] Taille de l'angle
   * @param {string} [label=''] Si vide, alors affiche la mesure de l'angle sinon affiche ce label.
   * @param {Object} parametres À saisir entre accolades
   * @param {Point|Point[]} [parametres.points] Point ou tableau de points
   * @param {string} [parametres.color = 'black'] Couleur du label : du type 'blue' ou du type '#f15929'
   * @param {number} [parametres.taille = 8] Taille du label
   * @param {number} [parametres.largeur = 10] Largeur en pixels du label à des fins de centrage
   * @param {number} [parametres.hauteur = 10] Hauteur en pixels du label à des fins de centrage
   * @param {string} [parametres.couleurDeRemplissage=''] Couleur de fond de ce label : du type 'blue' ou du type '#f15929'
   * @author Rémi Angot et Jean-Claude Lhote
   * @return {LabelLatexPoint}
   */
// JSDOC Validee par EE Juin 2022
export function labelLatexPoint ({ points, color = 'black', taille = 8, largeur = 10, hauteur = 10, background = '' } = {}) {
  return new LabelLatexPoint({ points: points, color: color, taille: taille, largeur: largeur, hauteur: hauteur, background: background })
}
