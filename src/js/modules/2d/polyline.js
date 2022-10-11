
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES LIGNES BRISÉES %%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { segment } from './segment'

/**
 * polyline(A,B,C,D,E) //Trace la ligne brisée ABCDE
 *
 * @author Rémi Angot
 */
function Polyline (...points) {
  ObjetMathalea2D.call(this, { })
  if (Array.isArray(points[0])) {
    // Si le premier argument est un tableau
    this.listePoints = points[0]
    this.color = colorToLatexOrHTML(points[1])
  } else {
    this.listePoints = points
    this.color = colorToLatexOrHTML('black')
  }
  let xmin = 1000
  let xmax = -1000
  let ymin = 1000
  let ymax = -1000
  for (const unPoint of this.listePoints) {
    if (unPoint.typeObjet !== 'point') window.notify('Polyline : argument invalide', { ...points })
    xmin = Math.min(xmin, unPoint.x)
    xmax = Math.max(xmax, unPoint.x)
    ymin = Math.min(ymin, unPoint.y)
    ymax = Math.max(ymax, unPoint.y)
  }
  this.bordures = [xmin, ymin, xmax, ymax]
  this.nom = ''
  if (points.length < 15) {
    // Ne nomme pas les lignes brisées trop grandes (pratique pour les courbes de fonction)
    for (const point of points) {
      this.nom += point.nom
    }
  }
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
    let binomeXY = ''
    for (const point of this.listePoints) {
      binomeXY += `${point.x * coeff},${-point.y * coeff} `
    }
    return `<polyline points="${binomeXY}" fill="none" stroke="${this.color[0]}" ${this.style} id="${this.id}" />`
  }
  this.tikz = function () {
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

    let optionsDraw = []
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    let binomeXY = ''
    for (const point of this.listePoints) {
      binomeXY += `(${point.x},${point.y})--`
    }
    binomeXY = binomeXY.substr(0, binomeXY.length - 2)
    return `\\draw${optionsDraw} ${binomeXY};`
  }
  this.svgml = function (coeff, amp) {
    let code = ''; let s
    for (let k = 1; k < this.listePoints.length; k++) {
      s = segment(this.listePoints[k - 1], this.listePoints[k], this.color)
      s.epaisseur = this.epaisseur
      s.opacite = this.opacite
      code += s.svgml(coeff, amp)
    }
    return code
  }
  this.tikzml = function (amp) {
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
    tableauOptions.push(`decorate,decoration={random steps , segment length=3pt, amplitude = ${amp}pt}`)

    let optionsDraw = []
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    let binomeXY = ''
    for (const point of this.listePoints) {
      binomeXY += `(${point.x},${point.y})--`
    }
    binomeXY = binomeXY.substr(0, binomeXY.length - 2)
    return `\\draw${optionsDraw} ${binomeXY};`
  }
}
/**
   * Trace une ligne brisée
   * @example polyline(A,B,C,D,E) // Trace la ligne brisée ABCDE en noir
   * @example polyline([A,B,C,D,E],'blue') // Trace la ligne brisée ABCDE en bleu
   * @example polyline([A,B,C,D,E],'#f15929') // Trace la ligne brisée ABCDE en orange (code couleur HTML : #f15929)
   * @author Rémi Angot
   */
export function polyline (...args) {
  return new Polyline(...args)
}
