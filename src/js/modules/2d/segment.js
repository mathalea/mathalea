/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES SEGMENTS %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { context } from '../context'
import { randint } from '../outils'
import { angleOriente, longueur } from './calculs'
import { Cercle } from './cercle'
import { Droite, droite } from './droites'
import { point, Point } from './point'
import { pointIntersectionDD, pointIntersectionLC, pointSurSegment } from './pointSur.js'
import { rotation } from './transformations'

/**
 * s = segment(A, B) //Segment d'extrémités A et B
 * s = segment(A,B,'blue') //Segment d'extrémités A et B et de couleur bleue
 * s = segment(x1,y1,x2,y2) //Segment défini par les coordonnées des deux extrémités
 * s = segment(x1,y1,x2,y2,'blue') //Segment défini par les coordonnées des deux extrémités et de couleur bleue
 * @class
 * @author Rémi Angot
 */
export function Segment (arg1, arg2, arg3, arg4, color, styleExtremites = '') {
  ObjetMathalea2D.call(this, { })

  /**
   * Teste si un segment coupe un cercle, une droite, une demi-cercle ou un autre segment
   * @memberof Segment
   * @param {Segment | Droite | DemiDroite | Cercle} objet Objet géométrique dont on veut tester l'intersection avec le segment
   * @example s1.estSecant(d1) // Renvoie true si s1 est sécant avec d1, false sinon
   * @author Jean-Claude Lhote
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  this.estSecant = function (objet) {
    const ab = droite(this.extremite1, this.extremite2)
    if (objet instanceof Cercle) {
      const P1 = pointIntersectionLC(ab, objet, '', 1)
      const P2 = pointIntersectionLC(ab, objet, '', 2)
      return ((P1 instanceof Point(arg1, arg2, arg3) && P1.estSur(this)) || (P2 instanceof Point && P2.estSur(this)))
    }
    let I
    if (objet instanceof Droite) {
      I = pointIntersectionDD(ab, objet)
    } else {
      const cd = droite(objet.extremite1, objet.extremite2)
      I = pointIntersectionDD(ab, cd)
    }
    if (!I) return false
    else return I.estSur(objet) && I.estSur(this)
  }

  this.typeObjet = 'segment'
  this.styleExtremites = styleExtremites
  this.tailleExtremites = 4
  if (arguments.length === 2) {
    if (isNaN(arg1.x) || isNaN(arg1.y) || isNaN(arg2.x) || isNaN(arg2.y)) window.notify('Segment : (attendus : A et B) les arguments de sont pas des points valides', { arg1, arg2 })
    this.x1 = arg1.x
    this.y1 = arg1.y
    this.x2 = arg2.x
    this.y2 = arg2.y
  } else if (arguments.length === 3) {
    if (isNaN(arg1.x) || isNaN(arg1.y) || isNaN(arg2.x) || isNaN(arg2.y)) window.notify('Segment : (attendus : A, B et "couleur") les arguments de sont pas des points valides', { arg1, arg2 })
    this.x1 = arg1.x
    this.y1 = arg1.y
    this.x2 = arg2.x
    this.y2 = arg2.y
    this.color = colorToLatexOrHTML(arg3)
  } else if (arguments.length === 4) {
    if (isNaN(arg3)) {
      this.x1 = arg1.x
      this.y1 = arg1.y
      this.x2 = arg2.x
      this.y2 = arg2.y
      this.color = colorToLatexOrHTML(arg3)
      this.styleExtremites = arg4
    } else {
      if (isNaN(arg1) || isNaN(arg2) || isNaN(arg3) || isNaN(arg4)) window.notify('Segment : (attendus : x1, y1, x2 et y2) les arguments de sont pas des nombres valides', { arg1, arg2 })
      this.x1 = arg1
      this.y1 = arg2
      this.x2 = arg3
      this.y2 = arg4
    }
  } else {
    // Au moins 5 arguments
    if (isNaN(arg1) || isNaN(arg2) || isNaN(arg3) || isNaN(arg4)) window.notify('Segment : (attendus : x1, y1, x2, y2 et "couleur") les arguments de sont pas des nombres valides', { arg1, arg2 })
    this.x1 = arg1
    this.y1 = arg2
    this.x2 = arg3
    this.y2 = arg4
    this.color = colorToLatexOrHTML(color)
    this.styleExtremites = styleExtremites
  }
  this.bordures = [Math.min(this.x1, this.x2) - 0.2, Math.min(this.y1, this.y2) - 0.2, Math.max(this.x1, this.x2) + 0.2, Math.max(this.y1, this.y2) + 0.2]
  this.extremite1 = point(this.x1, this.y1)
  this.extremite2 = point(this.x2, this.y2)
  this.longueur = Math.sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2)
  this.angleAvecHorizontale = angleOriente(
    point(this.x1 + 1, this.y1),
    this.extremite1,
    this.extremite2
  )

  this.codeExtremitesSVG = function (coeff) {
    let code = ''
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const h = this.tailleExtremites
    if (this.styleExtremites.length > 1) {
      if (this.styleExtremites.substr(-1) === '|') {
        // si ça termine par | on le rajoute en B
        const M = pointSurSegment(B, A, h * this.epaisseur / context.pixelsParCm)
        const B1 = rotation(M, B, 90)
        const B2 = rotation(M, B, -90)
        code += `<line x1="${B1.xSVG(coeff)}" y1="${B1.ySVG(
          coeff
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
      }
      if (this.styleExtremites.substr(-1) === '>') {
        // si ça termine par > on rajoute une flèche en B
        const M = pointSurSegment(B, A, h * this.epaisseur / context.pixelsParCm)
        const B1 = rotation(B, M, 90)
        const B1EE = pointSurSegment(B, rotation(B, M, 90), -this.epaisseur / 2 / context.pixelsParCm)
        const B2 = rotation(B, M, -90)
        const B2EE = pointSurSegment(B, rotation(B, M, -90), this.epaisseur / 2 / context.pixelsParCm)
        code += `<line x1="${B1EE.xSVG(coeff)}" y1="${B1EE.ySVG(
          coeff
        )}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${B2EE.xSVG(coeff)}" y1="${B2EE.ySVG(
          coeff
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color[0]}" stroke-width="${this.epaisseur}" />`
      }
      if (this.styleExtremites.substr(-1) === '<') {
        // si ça termine par < on rajoute une flèche inversée en B
        const M = pointSurSegment(B, A, -h * this.epaisseur / context.pixelsParCm)
        const B1 = rotation(B, M, 90)
        const B2 = rotation(B, M, -90)
        code += `<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff
        )}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
      }
      if (this.styleExtremites[0] === '<') {
        // si ça commence par < on rajoute une flèche en A
        const M = pointSurSegment(A, B, h * this.epaisseur / context.pixelsParCm)
        const A1 = rotation(A, M, 90)
        const A1EE = pointSurSegment(A, rotation(A, M, 90), -this.epaisseur / 2 / context.pixelsParCm)
        const A2 = rotation(A, M, -90)
        const A2EE = pointSurSegment(A, rotation(A, M, -90), this.epaisseur / 2 / context.pixelsParCm)
        code += `<line x1="${A1EE.xSVG(coeff)}" y1="${A1EE.ySVG(
          coeff
        )}" x2="${A1.xSVG(coeff)}" y2="${A1.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${A2EE.xSVG(coeff)}" y1="${A2EE.ySVG(
          coeff
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
      }
      if (this.styleExtremites[0] === '>') {
        // si ça commence par > on rajoute une flèche inversée en A
        const M = pointSurSegment(A, B, -h * this.epaisseur / context.pixelsParCm)
        const A1 = rotation(A, M, 90)
        const A2 = rotation(A, M, -90)
        code += `<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff
        )}" x2="${A1.xSVG(coeff)}" y2="${A1.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
      }
      if (this.styleExtremites[0] === '|') {
        // si ça commence par | on le rajoute en A
        const N = pointSurSegment(A, B, h * this.epaisseur / context.pixelsParCm)
        const A1 = rotation(N, A, 90)
        const A2 = rotation(N, A, -90)
        code += `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(
          coeff
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
      }
    }
    return code
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
    let code = this.codeExtremitesSVG(coeff)
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)

    code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(coeff)}" x2="${B.xSVG(
      coeff
    )}" y2="${B.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style} />`

    if (this.styleExtremites.length > 0) {
      code = `<g id="${this.id}">${code}</g>`
    } else {
      code = code.replace('/>', `id="${this.id}" />`)
    }

    return code
  }

  this.tikz = function () {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color =${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
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

    if (this.styleExtremites.length > 1) {
      tableauOptions.push(this.styleExtremites)
    }
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    return `\\draw${optionsDraw} (${this.x1},${this.y1})--(${this.x2},${this.y2});`
  }
  this.svgml = function (coeff, amp) {
    this.style = 'fill="none"'
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }

    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const l = longueur(A, B)
    const dx = (B.xSVG(coeff) - A.xSVG(coeff)) / l / 2; const dy = (B.ySVG(coeff) - A.ySVG(coeff)) / l / 2
    let code = `<path d="M ${A.xSVG(coeff)}, ${A.ySVG(coeff)} Q ${Math.round(A.xSVG(coeff), 0)}, ${A.ySVG(coeff)} `
    let p = 1
    for (let k = 0; k < 2 * l + 0.25; k += 0.5) {
      p++
      code += `${Math.round(A.xSVG(coeff) + k * dx + randint(-2, 2, 0) * amp)}, ${Math.round(A.ySVG(coeff) + k * dy + randint(-2, 2, 0) * amp)} `
    }
    if (p % 2 === 1) code += ` ${Math.round(B.xSVG(coeff), 0)}, ${B.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style}/>`
    else code += ` ${Math.round(B.xSVG(coeff), 0)}, ${B.ySVG(coeff)} ${B.xSVG(coeff)}, ${B.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style}/>`
    code += this.codeExtremitesSVG(coeff)
    return code
  }
  this.tikzml = function (amp) {
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color =${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (this.styleExtremites.length > 1) {
      tableauOptions.push(this.styleExtremites)
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`)
    optionsDraw = '[' + tableauOptions.join(',') + ']'

    const code = `\\draw${optionsDraw} (${A.x},${A.y})--(${B.x},${B.y});`
    return code
  }
}
/**
 * @param {...args} args Points ou coordonnées + couleur facultative en dernier
 * @example segment(A,B,'blue') // Segment [AB] de couleur bleu
 * @example segment(x1,y1,x2,y2,'#f15929') // Segment dont les extrémités sont respectivement (x1,y1) et (x2,y2), de couleur orange (#f15929)
 * @author Rémi Angot
 */

export function segment (...args) {
  return new Segment(...args)
}

/**
 * @param {...args} args Points ou coordonnées
 * @param {string} color Facultatif
 * @example segmentAvecExtremites(A,B,'blue')
 * @example segmentAvecExtremites(x1,y1,x2,y2,'#f15929')
 * @author Rémi Angot
 */
export function segmentAvecExtremites (...args) {
  const s = segment(...args)
  s.styleExtremites = '|-|'
  return s
}
