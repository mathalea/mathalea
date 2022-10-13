/** @module textes (2d) */

/*

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% LES TEXTES %%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import Decimal from 'decimal.js/decimal.mjs'
import { colorToLatexOrHTML, ObjetMathalea2D, vide2d } from '../2dGeneralites'
import { context } from '../context'
import { stringNombre } from '../outils'
import { point } from './point'

/**
 * texteParPoint('mon texte',A) // Écrit 'mon texte' avec A au centre du texte
 * texteParPoint('mon texte',A,'gauche') // Écrit 'mon texte' à gauche de A (qui sera la fin du texte)
 * texteParPoint('mon texte',A,'droite') // Écrit 'mon texte' à droite de A (qui sera le début du texte)
 * texteParPoint('mon texte',A,45) // Écrit 'mon texte' centré sur A avec une rotation de 45°
 * Si mathOn est true, la chaine est traitée par texteParPoint mais avec une police se rapprochant de la police Katex (quelques soucis d'alignement des caractères sur certains navigateurs)
 * Si le texte commence et finit par des $ la chaine est traitée par latexParPoint
 * @author Rémi Angot
 */
export function TexteParPoint (texte, A, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false) {
  ObjetMathalea2D.call(this, { })
  this.color = colorToLatexOrHTML(color)
  this.contour = false
  this.taille = 10 * scale
  this.opacite = 1
  this.couleurDeRemplissage = this.color
  this.opaciteDeRemplissage = this.opacite
  if (typeof texte === 'number' || texte instanceof Decimal) texte = stringNombre(texte)
  this.bordures = [A.x - texte.length * 0.2, A.y - 0.4, A.x + texte.length * 0.2, A.y + 0.4]
  if (typeof texte !== 'string') {
    texte = String(texte)
  }
  if (texte.charAt(0) === '$') {
    A.positionLabel = 'above'
    this.svg = function (coeff) {
      return latexParPoint(texte.substr(1, texte.length - 2), A, this.color, texte.length * 8, 12, '', 6).svg(coeff)
    }
    this.tikz = function () {
      let code = ''
      if (typeof orientation === 'number') {
        let anchor = 'center'
        if (ancrageDeRotation === 'gauche') {
          anchor = 'west'
        }
        if (ancrageDeRotation === 'droite') {
          anchor = 'east'
        }
        code = `\\draw [color=${this.color[1]}] (${A.x},${A.y
            }) node[anchor = ${anchor}, rotate = ${-orientation}] {${texte}};`
      } else {
        let anchor = ''
        if (orientation === 'gauche') {
          anchor = `node[anchor = east,scale=${scale}]`
        }
        if (orientation === 'droite') {
          anchor = `node[anchor = west,scale=${scale}]`
        }
        if (orientation === 'milieu') {
          anchor = `node[anchor = center,scale=${scale}]`
        }
        code = `\\draw [color=${this.color[1]}] (${A.x},${A.y}) ${anchor} {${texte}};`
      }
      return code
    }
  } else {
    this.svg = function (coeff) {
      let code = ''; let style = ''
      if (mathOn) style = ' font-family= "Book Antiqua"; font-style= "italic" '
      if (this.contour) style += ` style="font-size: ${this.taille}px;fill: ${this.couleurDeRemplissage[0]};fill-opacity: ${this.opaciteDeRemplissage};stroke: ${this.color[0]};stroke-width: 0.5px;stroke-linecap: butt;stroke-linejoin:miter;stroke-opacity: ${this.opacite}" `
      else style += ` style="font-size:${this.taille}px;fill:${this.color[0]};fill-opacity:${this.opacite};${this.gras ? 'font-weight:bolder' : ''}" `
      if (typeof (orientation) === 'number') {
        code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
        )}" text-anchor = "${ancrageDeRotation}" dominant-baseline = "central" fill="${this.couleurDeRemplissage[0]
            }" transform="rotate(${orientation} ${A.xSVG(coeff)} ${A.ySVG(
              coeff
            )})" id="${this.id}" >${texte}</text>\n `
      } else {
        switch (orientation) {
          case 'milieu':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
                coeff
            )}" text-anchor="middle" dominant-baseline="central" fill="${this.couleurDeRemplissage[0]
                }" id="${this.id}" >${texte}</text>\n `
            break
          case 'gauche':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
                coeff
            )}" text-anchor="end" dominant-baseline="central" fill="${this.couleurDeRemplissage[0]
                }" id="${this.id}" >${texte}</text>\n `
            break
          case 'droite':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
                coeff
            )}" text-anchor="start" dominant-baseline="central" fill="${this.couleurDeRemplissage[0]
                }" id="${this.id}" >${texte}</text>\n `
            break
        }
      }
      return code
    }
    this.tikz = function () {
      let code = ''
      if (typeof orientation === 'number') {
        let anchor = 'center'
        if (ancrageDeRotation === 'gauche') {
          anchor = 'west'
        }
        if (ancrageDeRotation === 'droite') {
          anchor = 'east'
        }
        code = `\\draw [color=${this.color[1]}] (${A.x},${A.y
            }) node[anchor = ${anchor}, rotate = ${-orientation}] {${texte}};`
      } else {
        let anchor = ''
        if (orientation === 'gauche') {
          anchor = `node[anchor = east,scale=${scale}]`
        }
        if (orientation === 'droite') {
          anchor = `node[anchor = west,scale=${scale}]`
        }
        if (orientation === 'milieu') {
          anchor = `node[anchor = center,scale=${scale}]`
        }
        if (mathOn) {
          code = `\\draw [color=${this.color[1]},fill opacity = ${this.opacite}] (${A.x},${A.y}) ${anchor} {$${texte}$};`
        } else {
          code = `\\draw [color=${this.color[1]},fill opacity = ${this.opacite}] (${A.x},${A.y}) ${anchor} {${texte}};`
        }
      }
      return code
    }
  }
}
export function texteParPoint (texte, A, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false) {
  return new TexteParPoint(texte, A, orientation, color, scale, ancrageDeRotation, mathOn)
}

function TexteParPointEchelle (texte, A, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false, scaleFigure) {
  ObjetMathalea2D.call(this, { })
  this.color = colorToLatexOrHTML(color)
  this.contour = false
  this.taille = 10 * scale
  this.opacite = 1
  this.couleurDeRemplissage = colorToLatexOrHTML(color)
  this.opaciteDeRemplissage = this.opacite
  this.bordures = [A.x - texte.length * 0.2, A.y - 0.4, A.x + texte.length * 0.2, A.y + 0.4]
  if (texte.charAt(0) === '$') {
    this.svg = function (coeff) {
      return latexParPoint(texte.substr(1, texte.length - 2), A, this.color, texte.length * 8, 10, '', this.taille * 0.8).svg(coeff)
    }
    this.tikz = function () {
      let code = ''
      if (typeof orientation === 'number') {
        let anchor = 'center'
        if (ancrageDeRotation === 'gauche') {
          anchor = 'west'
        }
        if (ancrageDeRotation === 'droite') {
          anchor = 'east'
        }
        code = `\\draw [color=${this.color[1]}] (${A.x},${A.y
            }) node[anchor = ${anchor}, rotate = ${-orientation}] {${texte}};`
      } else {
        let anchor = ''
        if (orientation === 'gauche') {
          anchor = `node[anchor = east,scale=${scale * scaleFigure * 1.25}]`
        }
        if (orientation === 'droite') {
          anchor = `node[anchor = west,scale=${scale * scaleFigure * 1.25}]`
        }
        if (orientation === 'milieu') {
          anchor = `node[anchor = center,scale=${scale * scaleFigure * 1.25}]`
        }
        code = `\\draw [color=${this.color[1]}] (${A.x},${A.y}) ${anchor} {${texte}};`
      }
      return code
    }
  } else {
    this.svg = function (coeff) {
      let code = ''; let style = ''
      if (mathOn) style = ' font-family= "Book Antiqua"; font-style= "italic" '
      if (this.contour) style += ` style="font-size: ${this.taille}px;fill: ${this.couleurDeRemplissage[0]};fill-opacity: ${this.opaciteDeRemplissage};stroke: ${this.color[0]};stroke-width: 0.5px;stroke-linecap: butt;stroke-linejoin:miter;stroke-opacity: ${this.opacite}" `
      else style += ` style="font-size:${this.taille}px;fill:${this.color[0]};fill-opacity:${this.opacite};${this.gras ? 'font-weight:bolder' : ''}" `
      if (typeof (orientation) === 'number') {
        code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
        )}" text-anchor = "${ancrageDeRotation}" dominant-baseline = "central" fill="${this.color[0]
            }" transform="rotate(${orientation} ${A.xSVG(coeff)} ${A.ySVG(
              coeff
            )})" id="${this.id}" >${texte}</text>\n `
      } else {
        switch (orientation) {
          case 'milieu':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
                coeff
            )}" text-anchor="middle" dominant-baseline="central" fill="${this.color[0]
                }" id="${this.id}" >${texte}</text>\n `
            break
          case 'gauche':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
                coeff
            )}" text-anchor="end" dominant-baseline="central" fill="${this.color[0]
                }" id="${this.id}" >${texte}</text>\n `
            break
          case 'droite':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
                coeff
            )}" text-anchor="start" dominant-baseline="central" fill="${this.color[0]
                }" id="${this.id}" >${texte}</text>\n `
            break
        }
      }

      return code
    }
    this.tikz = function () {
      let code = ''
      if (mathOn) texte = '$' + texte + '$'
      if (typeof orientation === 'number') {
        let anchor = 'center'
        if (ancrageDeRotation === 'gauche') {
          anchor = 'west'
        }
        if (ancrageDeRotation === 'droite') {
          anchor = 'east'
        }
        code = `\\draw [color=${this.color[1]},fill opacity = ${this.opacite}] (${A.x},${A.y
            }) node[anchor = ${anchor},scale=${scale * scaleFigure * 1.25}, rotate = ${-orientation}] {${texte}};`
      } else {
        let anchor = ''
        if (orientation === 'gauche') {
          anchor = `node[anchor = east,scale=${scale * scaleFigure * 1.25}]`
        }
        if (orientation === 'droite') {
          anchor = `node[anchor = west,scale=${scale * scaleFigure * 1.25}]`
        }
        if (orientation === 'milieu') {
          anchor = `node[anchor = center,scale=${scale * scaleFigure * 1.25}]`
        }
        code = `\\draw [color=${this.color[1]},fill opacity = ${this.opacite}] (${A.x},${A.y}) ${anchor} {${texte}};`
      }
      return code
    }
  }
}
export function texteParPointEchelle (texte, A, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false, scaleFigure = 1) {
  return new TexteParPointEchelle(texte, A, orientation, color, scale, ancrageDeRotation, mathOn, scaleFigure)
}
export function texteParPositionEchelle (texte, x, y, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false, scaleFigure = 1) {
  return texteParPointEchelle(texte, point(x, y, '', 'center'), orientation, color, scale, ancrageDeRotation, mathOn, scaleFigure)
}
/**
   * texteParPosition('mon texte',x,y) // Écrit 'mon texte' avec le point de coordonnées (x,y) au centre du texte.
   *
   * texteParPosition('mon texte',x,y,'gauche') // Écrit 'mon texte' à gauche du point de coordonnées (x,y) (qui sera la fin du texte)
   *
   * texteParPosition('mon texte',x,y,'droite') // Écrit 'mon texte' à droite du point de coordonnées (x,y) (qui sera le début du texte)
   *
   * texteParPosition('mon texte',x,y,45) // Écrit 'mon texte'  centré sur le point de coordonnées (x,y) avec une rotation de 45°
   *
   * @param {string} texte // Le texte qu'on veut afficher
   * @param {number} x // L'abscisse de la position initiale du texte
   * @param {number} y // L'ordonnée de la position initiale du texte
   * @param {string} orientation=['milieu'] // Angle d'orientation du texte ou bien 'milieu', gauche' ou 'droite'. Voir exemple
   * @param {string} [color='black'] // Couleur du texte
   * @param {number} [scale=1] // Echelle du texte.
   * @param {string} [ancrageDeRotation='middle'] // Choix parmi 'middle', 'start' ou 'end'. En cas d'orientation avec un angle, permet de savoir où est le centre de la rotation par rapport au texte.
   * @param {string} [mathOn=false] // Ecriture dans le style de Latex.
   *
   * @author Rémi Angot
   */
export function texteParPosition (texte, x, y, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false) {
  return new TexteParPoint(texte, point(x, y), orientation, color, scale, ancrageDeRotation, mathOn)
}

/**
   * latexParPoint('\\dfrac{3}{5}',A,'black',12,20,"white") Ecrit la fraction 3/5 à l'emplacement du label du point A en noir, avec un fond blanc.
   * 12 est la largeur en pixels 20 la hauteur en pixels (utilisé à des fins de centrage). Pour un bon centrage sur A, il faut que A.positionLabel='center'.
   * si colorBackground="", le fond est transparent.
   * tailleCaracteres est à 8 par défaut et correspond à \footnotesize. tailleCaracteres va de 5 = \small à 20 = \huge
   * @author Rémi Angot
   */
export function latexParPoint (texte, A, color = 'black', largeur = 20, hauteur = 12, colorBackground = 'white', tailleCaracteres = 8) {
  let x; let y; const coeff = context.pixelsParCm
  const offset = 10 * Math.log10(tailleCaracteres)
  switch (A.positionLabel) {
    case 'above':
      x = A.x; y = A.y + offset / coeff
      break
    case 'below':
      x = A.x; y = A.y - offset / coeff
      break
    case 'left':
      x = A.x - offset / coeff; y = A.y
      break
    case 'right':
      x = A.x + offset / coeff; y = A.y
      break
    case 'above right':
      x = A.x + offset / coeff; y = A.y + offset / coeff
      break
    case 'above left':
      x = A.x - offset / coeff; y = A.y + offset / coeff
      break
    case 'below right':
      x = A.x + offset / coeff; y = A.y - offset / coeff
      break
    case 'below left':
      x = A.x - offset / coeff; y = A.y - offset / coeff
      break
    case 'center':
      x = A.x; y = A.y
      break
    default:
      x = A.x; y = A.y
      break
  }
  return latexParCoordonnees(texte, x, y, color, largeur, hauteur, colorBackground, tailleCaracteres)
}
/**
   * @param {String} texte Le code latex qui sera mis en mode math en ligne. Ex : '\\dfrac{4}{5}\\text{cm}'
   * @param {Number} x abscisse du point de centrage
   * @param {Number} y ordonnée du point de centrage
   * @param {String} [color] couleur
   * @param {Number} [largeur] Dimensions de la 'box' rectangulaire conteneur de la formule en pixels en considérant la taille de caractère 8='\footnotesize'
   * @param {Number} [hauteur] Idem pour la hauteur de la box. Prévoir 20 par exemple pour une fraction. Permet le centrage correct.
   * @param {String} [colorBackground] Couleur du fond de la box. Chaine vide pour un fond transparent.
   * @param {Number} [tailleCaracteres] Taille de la police utilisée de 5 = \small à 20=\huge... agit sur la box en en modifiant les paramètres hauteur et largeur
   */
function LatexParCoordonnees (texte, x, y, color, largeur, hauteur, colorBackground, tailleCaracteres) {
  ObjetMathalea2D.call(this, { })
  this.x = x
  this.y = y
  this.largeur = largeur * Math.log10(2 * tailleCaracteres)
  this.hauteur = hauteur * Math.log10(tailleCaracteres)
  this.colorBackground = colorToLatexOrHTML(colorBackground)
  this.color = colorToLatexOrHTML(color)
  this.texte = texte
  this.tailleCaracteres = tailleCaracteres
  this.bordures = [x - this.texte.length * 0.2, y - 0.02 * this.hauteur, x + this.texte.length * 0.2, y + 0.02 * this.hauteur]
  let taille
  if (this.tailleCaracteres > 19) taille = '\\huge'
  else if (this.tailleCaracteres > 16) taille = '\\LARGE'
  else if (this.tailleCaracteres > 13) taille = '\\Large'
  else if (this.tailleCaracteres > 11) taille = '\\large'
  else if (this.tailleCaracteres < 6) taille = '\\tiny'
  else if (this.tailleCaracteres < 8) taille = '\\scriptsize'
  else if (this.tailleCaracteres < 9) taille = '\\footnotesize'
  else if (this.tailleCaracteres < 10) taille = '\\small'
  else taille = '\\normalsize'
  this.svg = function (coeff) {
    const demiLargeur = this.largeur / 2
    const centrage = 0.4 * context.pixelsParCm * Math.log10(tailleCaracteres)
    if (this.colorBackground !== '') {
      return `<foreignObject style=" overflow: visible; line-height: 0;" x="${this.x * coeff - demiLargeur}" y="${-this.y * coeff - centrage - this.hauteur / 2}"  width="${this.largeur}" height="${this.hauteur}" id="${this.id}" ><div style="margin:auto;width:${this.largeur}px;height:${this.hauteur}px;position:fixed!important; text-align:center">
      $\\colorbox{${this.colorBackground[0]}}{$${taille} \\color{${this.color[0]}}{${this.texte}}$}$</div></foreignObject>`
    } else {
      return `<foreignObject style=" overflow: visible; line-height: 0;" x="${this.x * coeff - demiLargeur}" y="${-this.y * coeff - centrage - this.hauteur / 2}"  width="${this.largeur}" height="${this.hauteur}" id="${this.id}" ><div style="width:${this.largeur}px;height:${this.hauteur}px;position:fixed!important; text-align:center">
        $${taille} \\color{${this.color[0]}}{${this.texte}}$</div></foreignObject>`
    }
  }

  this.tikz = function () {
    let code
    if (this.colorBackground !== '') {
      code = `\\draw (${x},${y}) node[anchor = center] {\\colorbox ${this.colorBackground[1]}{${taille}  \\color${this.color[1]}{$${texte}$}}};`
    } else {
      code = `\\draw (${x},${y}) node[anchor = center] {${taille} \\color${this.color[1]}{$${texte}$}};`
    };
    return code
  }
}

export function latexParCoordonnees (texte, x, y, color = 'black', largeur = 50, hauteurLigne = 20, colorBackground = 'white', tailleCaracteres = 8) {
  if (texte === '') return vide2d()
  else return new LatexParCoordonnees(texte, x, y, color, largeur, hauteurLigne, colorBackground, tailleCaracteres)
}
