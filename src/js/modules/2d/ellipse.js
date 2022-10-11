
/**  Trace l'ellipse de centre O et de rayon rx et ry (la construction, dite “par réduction d’ordonnée”, montre que l'ellipse est la transformée de Newton de 2 cercles concentriques)
 * @param {Point} O Centre de l'ellipse
 * @param {number} rx Premier rayon de l'ellipse
 * @param {number} ry Second rayon de l'ellipse
 * @param {string} [color = 'black'] Couleur de l'ellipse : du type 'blue' ou du type '#f15929'
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {Point} centre Centre du cercle
 * @property {number} rx Premier rayon de l'ellipse
 * @property {number} ry Second rayon de l'ellipse
 * @property {string} color Couleur de l'ellipse. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurDeRemplissage Couleur de remplissage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opaciteDeRemplissage Opacité de l'ellipse si couleur de remplissage choisie.
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @author Rémi Angot
 * @class
 */

import { abs, random, round } from 'mathjs'
import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { longueur } from './calculs'
import { pattern } from './motif'
import { point } from './point'
import { homothetie, rotation } from './transformations'

// JSDOC Validee par EE Aout 2022
function Ellipse (O, rx, ry, color = 'black') {
  ObjetMathalea2D.call(this, { })
  this.color = colorToLatexOrHTML(color)
  this.centre = O
  this.rx = rx
  this.ry = ry
  this.couleurDeRemplissage = colorToLatexOrHTML('none')
  this.opaciteDeRemplissage = 1
  this.bordures = [O.x - rx, O.y - ry, O.x + rx, O.y + ry]
  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    switch (this.pointilles) {
      case 1:
        this.style += ' stroke-dasharray="6 10" '
        break
      case 2:
        this.style += ' stroke-dasharray="6 3" '
        break
      case 3:
        this.style += ' stroke-dasharray="3 2 6 2 " '
        break
      case 4:
        this.style += ' stroke-dasharray="1 2" '
        break
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
    }

    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    if (this.couleurDeRemplissage === '') {
      this.style += ' fill="none" '
    } else {
      this.style += ` fill="${this.couleurDeRemplissage[0]}" `
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
    }

    return `<ellipse cx="${O.xSVG(coeff)}" cy="${O.ySVG(coeff)}" rx="${rx * coeff}" ry="${ry * coeff}" stroke="${this.color[0]}" ${this.style} id="${this.id}" />`
  }
  this.tikz = function () {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    switch (this.pointilles) {
      case 1:
        tableauOptions.push(' dash dot ')
        break
      case 2:
        tableauOptions.push(' densely dash dot dot ')
        break
      case 3:
        tableauOptions.push(' dash dot dot ')
        break
      case 4:
        tableauOptions.push(' dotted ')
        break
      case 5:
        tableauOptions.push(' dashed ')
        break
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (this.opaciteDeRemplissage !== 1) {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (this.couleurDeRemplissage !== '' && this.couleurDeRemplissage[1] !== 'none') {
      tableauOptions.push(`preaction={fill,color = ${this.couleurDeRemplissage[1]}}`)
    }
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    return `\\draw${optionsDraw} (${O.x},${O.y}) ellipse (${rx}cm and ${ry}cm);`
  }
  this.svgml = function (coeff, amp) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }

    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }

    let code = `<path d="M ${O.xSVG(coeff) + rx * coeff} ${O.ySVG(coeff)} C ${O.xSVG(coeff) + rx * coeff} ${O.ySVG(coeff)}, `
    let compteur = 1
    for (let k = 1, variation; k < 181; k++) {
      variation = (random(0, 2) - 1) * amp / 10
      code += `${O.xSVG(coeff) + round((rx + variation) * Math.cos(2 * k * Math.PI / 180) * coeff, 2)} ${O.ySVG(coeff) + round((ry + variation) * Math.sin(2 * k * Math.PI / 180) * coeff, 2)}, `
      compteur++
    }
    if (compteur % 2 === 0) code += ` ${O.xSVG(coeff) + rx * coeff} ${O.ySVG(coeff)}, `
    code += ` ${O.xSVG(coeff) + rx * coeff} ${O.ySVG(coeff)} Z" stroke="${this.color[0]}" ${this.style}"/>`
    return code
  }
  this.tikzml = function (amp) {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`)
    optionsDraw = '[' + tableauOptions.join(',') + ']'

    const code = `\\draw${optionsDraw} (${O.x},${O.y}) ellipse (${rx}cm and ${ry}cm);`
    return code
  }
}

/**  Trace l'ellipse de centre O et de rayon rx et ry (la construction, dite “par réduction d’ordonnée”, montre que l'ellipse est la transformée de Newton de 2 cercles concentriques)
   * @param {Point} O Centre de l'ellipse
   * @param {number} rx Premier rayon de l'ellipse
   * @param {number} ry Second rayon de l'ellipse
   * @param {string} [color = 'black'] Couleur de l'ellipse : du type 'blue' ou du type '#f15929'
   * @example ellipse(M, 1, 3) // Trace, en noir, l'ellipse de centre M et de rayons 1 et 3
   * @example ellipse(M, 1, 3, 'red') // Trace, en rouge, l'ellipse de centre M et de rayons 1 et 3
   * @author Rémi Angot
   * @return {Ellipse}
   */
// JSDOC Validee par EE Aout 2022
export function ellipse (O, rx, ry, color = 'black') {
  return new Ellipse(O, rx, ry, color)
}
/**
   * @param {Point} centre centre de l'ellipse
   * @param {number} Rx rayon en X
   * @param {number} Ry rayon en Y
   * @param {string} hemisphere 'nord' pour tracer au dessus du centre, 'sud' pour tracer en dessous
   * @param {boolean | number} pointilles Si false, l'ar est en trait plein, sinon en pointillés
   * @param {boolean} rayon Si true, alors l'arc est fermé par un segment.
   * @param {string} color Facultatif, 'black' par défaut
   * @param {string} couleurDeRemplissage si 'none' alors pas de remplissage.
   * @param {number} opaciteDeRemplissage Transparence de remplissage de 0 à 1. Facultatif, 0.2 par défaut
   * @author Jean-Claude Lhote
   * @return {SemiEllipse} Objet SemiEllipse
   */
export function SemiEllipse ({ centre, Rx, Ry, hemisphere = 'nord', pointilles = false, rayon = false, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2 }) {
  ObjetMathalea2D.call(this, { })
  this.color = colorToLatexOrHTML(color)
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.opaciteDeRemplissage = opaciteDeRemplissage
  this.hachures = false
  this.couleurDesHachures = colorToLatexOrHTML('black')
  this.epaisseurDesHachures = 1
  this.distanceDesHachures = 10
  this.pointilles = pointilles
  const angle = hemisphere === 'nord' ? 180 : -180
  const M = point(centre.x + Rx, centre.y)
  const med = homothetie(rotation(M, centre, angle / 2), centre, Ry / Rx)

  let large = 0; let sweep = 0
  if (angle > 180) {
    sweep = 0 // option pour path : permet de savoir quel morceau de cercle tracé parmi les 2 possibles. Voir https://developer.mozilla.org/fr/docs/Web/SVG/Tutorial/Paths pour plus de détails
    large = 1 // option pour path : permet de savoir sur un morceau de cercle choisi, quel parcours prendre.
  } else if (angle < -180) {
    large = 1
    sweep = 1
  } else {
    large = 0
    sweep = 1 - (angle > 0)
  }
  const N = rotation(M, centre, angle)
  this.bordures = [Math.min(M.x, N.x, med.x) - 0.1, Math.min(M.y, N.y, med.y) - 0.1, Math.max(M.x, N.x, med.x) + 0.1, Math.max(M.y, N.y, med.y) + 0.1]
  if (rayon) {
    this.svg = function (coeff) {
      this.style = ''
      if (this.epaisseur !== 1) {
        this.style += ` stroke-width="${this.epaisseur}" `
      }

      switch (this.pointilles) {
        case 1:
          this.style += ' stroke-dasharray="6 10" '
          break
        case 2:
          this.style += ' stroke-dasharray="6 3" '
          break
        case 3:
          this.style += ' stroke-dasharray="3 2 6 2 " '
          break
        case 4:
          this.style += ' stroke-dasharray="1 2" '
          break
        case 5:
          this.style += ' stroke-dasharray="5 5" '
          break
      }

      if (this.hachures) {
        if (this.couleurDeRemplissage.length < 1) {
          this.couleurDeRemplissage = colorToLatexOrHTML('none')
        }

        return pattern({
          motif: this.hachures,
          id: this.id,
          distanceDesHachures: this.distanceDesHachures,
          epaisseurDesHachures: this.epaisseurDesHachures,
          couleurDesHachures: this.couleurDesHachures[0],
          couleurDeRemplissage: this.couleurDeRemplissage[0],
          opaciteDeRemplissage: this.opaciteDeRemplissage
        }) + `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${Rx * coeff} ${Ry * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${centre.xSVG(coeff)} ${centre.ySVG(coeff)} Z" stroke="${this.color[0]}"  ${this.style} id="${this.id}" fill="url(#pattern${this.id})" />`
      } else {
        if (this.opacite !== 1) {
          this.style += ` stroke-opacity="${this.opacite}" `
        }
        if (this.couleurDeRemplissage !== 'none') {
          this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
        }

        return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${Rx * coeff} ${Ry * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${centre.xSVG(coeff)} ${centre.ySVG(coeff)} Z" stroke="${this.color[0]}" fill="${this.couleurDeRemplissage[0]}" ${this.style}/>`
      }
    }
  } else {
    this.svg = function (coeff) {
      this.style = ''
      if (this.epaisseur !== 1) {
        this.style += ` stroke-width="${this.epaisseur}" `
      }

      switch (this.pointilles) {
        case 1:
          this.style += ' stroke-dasharray="6 10" '
          break
        case 2:
          this.style += ' stroke-dasharray="6 3" '
          break
        case 3:
          this.style += ' stroke-dasharray="3 2 6 2 " '
          break
        case 4:
          this.style += ' stroke-dasharray="1 2" '
          break
        case 5:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
      if (this.opacite !== 1) {
        this.style += ` stroke-opacity="${this.opacite}" `
      }
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `

      return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${Rx * coeff} ${Ry * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)}" stroke="${this.color[0]}" fill="${this.couleurDeRemplissage[0]}" ${this.style} id="${this.id}" />`
    }
  }
  this.tikz = function () {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    switch (this.pointilles) {
      case 1:
        tableauOptions.push(' dash dot ')
        break
      case 2:
        tableauOptions.push(' densely dash dot dot ')
        break
      case 3:
        tableauOptions.push(' dash dot dot ')
        break
      case 4:
        tableauOptions.push(' dotted ')
        break
      case 5:
        tableauOptions.push(' dashed ')
        break
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }

    if ((this.couleurDeRemplissage !== 'none' || this.couleurDeRemplissage !== '')) {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
      tableauOptions.push(`fill = ${this.couleurDeRemplissage[1]}`)
    }

    if (this.hachures) {
      tableauOptions.push(pattern({
        motif: this.hachures,
        id: this.id,
        distanceDesHachures: this.distanceDesHachures,
        couleurDesHachures: this.couleurDesHachures[1],
        couleurDeRemplissage: this.couleurDeRemplissage[1],
        opaciteDeRemplissage: this.opaciteDeRemplissage
      }))
    }
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    if (couleurDeRemplissage !== 'none') return `\\filldraw  ${optionsDraw} (${M.x},${M.y}) arc [start angle=0, end angle = ${angle}, x radius = ${Rx}, y radius = ${Ry}]; -- cycle ;`
    else return `\\draw${optionsDraw} (${M.x},${M.y}) arc [start angle=0, end angle = ${angle}, x radius = ${Rx}, y radius = ${Ry}];`
  }
  let code, P

  this.svgml = function (coeff, amp) {
    this.style = ''
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    this.style += ' fill="none" '
    code = `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} S ${M.xSVG(coeff)} ${M.ySVG(coeff)}, `
    let compteur = 1
    const r = longueur(centre, M)
    for (let k = 0, variation; abs(k) <= abs(angle) - 2; k += angle < 0 ? -2 : 2) {
      variation = (random(0, 2) - 1) / r * amp / 10
      P = rotation(homothetie(M, centre, 1 + variation), centre, k)
      code += `${round(P.xSVG(coeff), 2)} ${round(P.ySVG(coeff), 2)}, `
      compteur++
    }
    P = rotation(M, centre, angle)
    if (compteur % 2 === 0) code += `${P.xSVG(coeff)} ${P.ySVG(coeff)}, ` // Parce qu'on utilise S et non C dans le path
    code += `${P.xSVG(coeff)} ${P.ySVG(coeff)}`
    code += `" stroke="${this.color[0]}" ${this.style}/>`
    return code
  }

  this.tikzml = function (amp) {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }

    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`)

    optionsDraw = '[' + tableauOptions.join(',') + ']'
    if (this.couleurDeRemplissage[1] !== 'none') return `\\filldraw  ${optionsDraw} (${M.x},${M.y}) arc [start angle=0, end angle = ${angle}, x radius = ${Rx}, y radius = ${Ry}]; -- cycle ;`
    else return `\\draw${optionsDraw} (${M.x},${M.y}) arc [start angle=0, end angle = ${angle}, x radius = ${Rx}, y radius = ${Ry}];`
  }
}

/**
 * @param {Point} centre centre de l'ellipse
 * @param {number} Rx rayon en X
 * @param {number} Ry rayon en Y
 * @param {string} hemisphere 'nord' pour tracer au dessus du centre, 'sud' pour tracer en dessous
 * @param {boolean | number} pointilles Si false, l'ar est en trait plein, sinon en pointillés
 * @param {boolean} rayon Si true, alors l'arc est fermé par un segment.
 * @param {string} color Facultatif, 'black' par défaut
 * @param {string} couleurDeRemplissage si 'none' alors pas de remplissage.
 * @param {number} opaciteDeRemplissage Transparence de remplissage de 0 à 1. Facultatif, 0.2 par défaut
 * @author Jean-Claude Lhote
 * @return {SemiEllipse} Objet SemiEllipse
 */
export function semiEllipse ({ centre, Rx, Ry, hemisphere = 'nord', pointilles = false, rayon = false, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2 }) {
  return new SemiEllipse({ centre, Rx, Ry, hemisphere, pointilles, rayon, couleurDeRemplissage, color, opaciteDeRemplissage })
}
