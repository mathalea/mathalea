/** @module arc */

/** Trace un arc de cercle, connaissant une extrémité, son centre et la mesure de l'angle
 * @param {Point} M Extrémité de départ de l'arc
 * @param {Point} Omega Centre de l'arc
 * @param {number} angle Mesure de l'angle compris entre -360 et 360 (valeur négative = sens indirect)
 * @param {boolean} [rayon = false] Booléen. Si true, les rayons délimitant l'arc sont ajoutés.
 * @param {string} [couleurDeRemplissage = 'none'] Couleur ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {string} [color = 'black'] Couleur de l'arc ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage = 0.2] Opacité de remplissage de 0 à 1.
 * @param {string} [couleurDesHachures = 'none'] Couleur des hachures ou 'none' : du type 'blue' ou du type '#f15929' Si 'none', pas de hachures.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de l'arc ou 'none'. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurDeRemplissage Couleur ou 'none'. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opaciteDeRemplissage Opacité de remplissage de 0 à 1.
 * @property {string} hachures Hachures ou pas ?
 * @property {string} couleurDesHachures Couleur des hachures ou 'none'. À associer obligatoirement à colorToLatexOrHTML(). Si 'none' ou '', pas de hachures.
 * @property {number} [opacite = 1] Opacité du cercle de 0 à 1.
 * @property {number} [epaisseurDesHachures = 1] Epaisseur des hachures si couleur de hachures choisie.
 * @property {number} [distanceDesHachures = 10] Distance des hachures si couleur de remplissage choisie.
 * @property {number} [pointilles = 0] Type de pointillés choisis (entre 1 et 5). Si autre nombre, pas de pointillés.
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @author Jean-Claude Lhote
 * @class
 **/

import { abs, random, round } from 'mathjs'
import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { arrondi } from '../outils/nombres'
import { angleModulo, angleOriente, longueur } from './calculs'
import { droite } from './droites'
import { mediatrice } from './droitesRemarquables'
import { pattern } from './motif'
import { point } from './point'
import { homothetie, rotation } from './transformations'

// JSDOC Validee par EE Juin 2022
export function Arc (M, Omega, angle, rayon = false, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2, couleurDesHachures = 'none') {
  ObjetMathalea2D.call(this, { })
  this.color = colorToLatexOrHTML(color)
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.opaciteDeRemplissage = opaciteDeRemplissage
  this.opacite = 1
  this.hachures = couleurDesHachures !== 'none' && couleurDesHachures !== ''
  this.couleurDesHachures = colorToLatexOrHTML(couleurDesHachures)
  this.epaisseurDesHachures = 1
  this.distanceDesHachures = 10
  this.pointilles = 0
  const med = rotation(M, Omega, angle / 2)
  if (typeof (angle) !== 'number') {
    angle = angleOriente(M, Omega, angle)
  }
  const l = longueur(Omega, M); let large = 0; let sweep = 0
  const A = point(Omega.x + 1, Omega.y)
  const azimut = angleOriente(A, Omega, M)
  const anglefin = azimut + angle
  const angleSVG = angleModulo(angle)
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
  const N = rotation(M, Omega, angleSVG)
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
        }) + `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${l * coeff} ${l * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${Omega.xSVG(coeff)} ${Omega.ySVG(coeff)} Z" stroke="${this.color[0]}"  ${this.style} id="${this.id}" fill="url(#pattern${this.id})" />`
      } else {
        if (this.opacite !== 1) {
          this.style += ` stroke-opacity="${this.opacite}" `
        }
        if (this.couleurDeRemplissage === '' || this.couleurDeRemplissage === undefined) {
          this.style += ' fill="none" '
        } else {
          this.style += ` fill="${this.couleurDeRemplissage[0]}" `
          this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
        }
        return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${l * coeff} ${l * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${Omega.xSVG(coeff)} ${Omega.ySVG(coeff)} Z" stroke="${this.color[0]}" ${this.style}/>`
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
      if (this.couleurDeRemplissage === '' || this.couleurDeRemplissage === undefined) {
        this.style += ' fill="none" '
      } else {
        this.style += ` fill="${this.couleurDeRemplissage[0]}" `
        this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
      }
      return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${l * coeff} ${l * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style} id="${this.id}" />`
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
    if (rayon && (this.couleurDeRemplissage[1] !== 'none' && this.couleurDeRemplissage !== '')) {
      tableauOptions.push(`preaction={fill,color = ${this.couleurDeRemplissage[1]}}`)
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
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
    if (rayon) return `\\draw  ${optionsDraw} (${N.x},${N.y}) -- (${Omega.x},${Omega.y}) -- (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega, M)}) -- cycle ;`
    else return `\\draw${optionsDraw} (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega, M)}) ;`
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
    const r = longueur(Omega, M)
    for (let k = 0, variation; abs(k) <= abs(angle) - 2; k += angle < 0 ? -2 : 2) {
      variation = (random(0, 2) - 1) / r * amp / 10
      P = rotation(homothetie(M, Omega, 1 + variation), Omega, k)
      code += `${round(P.xSVG(coeff), 2)} ${round(P.ySVG(coeff), 2)}, `
      compteur++
    }
    P = rotation(M, Omega, angle)
    if (compteur % 2 === 0) code += `${P.xSVG(coeff)} ${P.ySVG(coeff)}, ` // Parce qu'on utilise S et non C dans le path
    code += `${P.xSVG(coeff)} ${P.ySVG(coeff)}`
    code += `" stroke="${color}" ${this.style}/>`
    return code
  }

  this.tikzml = function (amp) {
    let optionsDraw = []
    const tableauOptions = []
    const A = point(Omega.x + 1, Omega.y)
    const azimut = arrondi(angleOriente(A, Omega, M), 1)
    const anglefin = arrondi(azimut + angle, 1)
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

    return `\\draw${optionsDraw} (${M.x},${M.y}) arc (${azimut}:${anglefin}:${arrondi(longueur(Omega, M), 2)}) ;`
  }
}

/** Trace un arc de cercle, connaissant une extrémité, son centre et la mesure de l'angle
   * @param {Point} M Extrémité de départ de l'arc
   * @param {Point} Omega Centre de l'arc
   * @param {number} angle Mesure de l'angle compris entre -360 et 360 (valeur négative = sens indirect)
   * @param {boolean} [rayon = false] Booléen. Si true, les rayons délimitant l'arc sont ajoutés.
   * @param {string} [couleurDeRemplissage = 'none'] Couleur ou 'none' : du type 'blue' ou du type '#f15929'
   * @param {string} [color = 'black'] Couleur de l'arc ou 'none' : du type 'blue' ou du type '#f15929'
   * @param {number} [opaciteDeRemplissage = 0.2] Opacité de remplissage de 0 à 1.
   * @param {string} [couleurDesHachures = 'none'] Couleur des hachures ou 'none' : du type 'blue' ou du type '#f15929' Si 'none', pas de hachures.
   * @example arc(M,0,35)
    // Trace l'arc en noir de centre 0, d'extrémité M et d'angle orienté 35° (sans remplissage et sans hachures)
   * @example arc(M,O,true,-40,'red','green',0.8,'white')
    // Trace l'arc en vert de centre 0, d'extrémité M et d'angle orienté -40°, rempli en rouge à 80 %, avec des hachures blanches
   * @return {Arc}
   * @author Jean-Claude Lhote
   */
// JSDOC Validee par EE Juin 2022
export function arc (M, Omega, angle, rayon = false, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2, couleurDesHachures = 'none') {
  return new Arc(M, Omega, angle, rayon, couleurDeRemplissage, color, opaciteDeRemplissage, couleurDesHachures)
}

/** Trace un arc de cercle, connaissant deux extrémités et la mesure de l'angle
   * @param {Point} M Première extrémité de l'arc
   * @param {Point} N Deuxième extrémité de l'arc
   * @param {number} angle Mesure de l'angle compris entre -360 et 360 (valeur négative = sens indirect)
   * @param {boolean} [rayon = false] Booléen. Si true, les rayons délimitant l'arc sont ajoutés.
   * @param {boolean} [couleurDeRemplissage = 'none'] Couleur ou 'none' : du type 'blue' ou du type '#f15929'
   * @param {string} [color = 'black'] Couleur de l'arc ou 'none' : du type 'blue' ou du type '#f15929'
   * @param {number} [opaciteDeRemplissage = 0.2] Opacité de remplissage de 0 à 1.
   * @param {string} [couleurDesHachures = 'none'] Couleur des hachures ou 'none' : du type 'blue' ou du type '#f15929' Si 'none', pas de hachures.
   * @example arcPointPointAngle(A,B,35)
    // Trace l'arc en noir d'extrémités A et B (dans cet ordre) et d'angle orienté 35° (sans remplissage et sans hachures)
   * @example arcPointPointAngle(A,B,true,-40,'red','green',0.8,'white')
    // Trace l'arc en vert d'extrémités A et B (dans cet ordre) et d'angle orienté -40°, rempli en rouge à 80 %, avec des hachures blanches
   * @return {Arc}
   * @author Jean-Claude Lhote
   */
// JSDOC Validee par EE Juin 2022
export function arcPointPointAngle (M, N, angle, rayon = false, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2, couleurDesHachures = 'none') {
  let anglerot
  if (angle < 0) anglerot = (angle + 180) / 2
  else anglerot = (angle - 180) / 2
  const d = mediatrice(M, N, 'black')
  d.isVisible = false
  const e = droite(N, M)
  e.isVisible = false
  const f = rotation(e, N, anglerot)
  f.isVisible = false
  const determinant = d.a * f.b - f.a * d.b
  const Omegax = (d.b * f.c - f.b * d.c) / determinant
  const Omegay = (f.a * d.c - d.a * f.c) / determinant
  const Omega = point(Omegax, Omegay)
  return new Arc(M, Omega, angle, rayon, couleurDeRemplissage, color, opaciteDeRemplissage)
}

/**
   * m = traceCompas(O, A, 20) trace un arc de cercle de centre O qui commence 10° avant A et finit 10° après.
   *@author Jean-Claude Lhote
   */
export function traceCompas (
  O,
  A,
  angle = 20,
  color = 'gray',
  opacite = 1.1,
  epaisseur = 1,
  pointilles = ''
) {
  const B = rotation(A, O, -angle / 2)
  const a = arc(B, O, angle, false)
  a.epaisseur = epaisseur
  a.opacite = opacite
  a.color = colorToLatexOrHTML(color)
  a.pointilles = pointilles
  return a
}
