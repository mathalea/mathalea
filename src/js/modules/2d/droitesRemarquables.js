/** @module droites Remarquables */

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%% LES DROITES REMARQUABLES %%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import { ObjetMathalea2D } from '../2dGeneralites'
import { context } from '../context'
import { traceCompas } from './arc'
import { milieu } from './barycentre'
import { angleOriente, longueur } from './calculs'
import { codageAngle, codageAngleDroit, codageSegments } from './codages'
import { demiDroite } from './demiDroite'
import { droite } from './droites'
import { pointSurSegment } from './pointSur.js'
import { segment } from './segment'
import { tracePointSurDroite } from './tracePoint'
import { rotation, symetrieAxiale } from './transformations'

/**
 * Code le milieu d'un segment
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [mark='x'] Symbole posé sur les deux parties du segment
 * @param {boolean} [mil=true] Trace ou nom le point du milieu.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
export function CodageMilieu (A, B, color = 'black', mark = '×', mil = true) {
  if (longueur(A, B) < 0.1) window.notify('CodageMilieu : Points trop rapprochés pour créer ce codage', { A, B })
  ObjetMathalea2D.call(this, { })
  this.color = color
  const O = milieu(A, B)
  const d = droite(A, B)
  const M = tracePointSurDroite(O, d, this.color)
  const v = codageSegments(mark, this.color, A, O, O, B)
  let code = ''
  this.svg = function (coeff) {
    if (mil) code = M.svg(coeff) + '\n' + v.svg(coeff)
    else code = v.svg(coeff)
    code = `<g id="${this.id}">${code}</g>`
    return code
  }
  this.tikz = function () {
    if (mil) return M.tikz() + '\n' + v.tikz()
    else return v.tikz()
  }
}

/**
   * Code le milieu d'un segment
   * @param {Point} A Première extrémité du segment
   * @param {Point} B Seconde extrémité du segment
   * @param {string} [color = 'black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @param {string} [mark = 'x'] Symbole posé de part et d'autre du milieu du segment
   * @param {boolean} [mil = true] Trace ou nom le point du milieu.
   * @example codageMilieu(M,N) // Code, en noir, le milieu du segment[MN] avec les marques 'x', en plaçant le milieu
   * @example codageMilieu(M,N,'red','oo',false) // Code, en rouge, le milieu du segment[MN] avec les marques 'oo', sans placer le milieu.
   * @author Jean-Claude Lhote
   * @return {CodageMilieu}
   */
// JSDOC Validee par EE Juin 2022
export function codageMilieu (A, B, color = 'black', mark = '×', mil = true) {
  return new CodageMilieu(A, B, color, mark, mil)
}

/**
   * Trace la médiatrice d'un segment, en laissant éventuellement apparents les traits de construction au compas
   * @param {Point} A Première extrémité du segment
   * @param {Point} B Seconde extrémité du segment
   * @param {string} [nom = ''] Nom affichée de la droite
   * @param {string} [couleurMediatrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'
   * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @param {string} [couleurConstruction = 'black'] Couleur des traits de construction : du type 'blue' ou du type '#f15929'.
   * @param {boolean} [construction = false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
   * @param {boolean} [detail = false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
   * @param {string} [markmilieu = 'x'] Symbole posé sur les deux parties du segment
   * @param {string} [markrayons = '||'] Symbole posé sur les quatre rayons (si détail est true)
   * @param {number} [epaisseurMediatrice = 1] Epaisseur de la médiatrice
   * @param {number} [opaciteMediatrice = 1] Taux d'opacité de la médiatrice
   * @param {number} [pointillesMediatrice = 0] Si cette valeur est entre 1 et 5, la médiatrice est en pointillés
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
   * @property {string} couleurMediatrice Couleur de la médiatrice : du type 'blue' ou du type '#f15929'
   * @property {number} epaisseurMediatrice Epaisseur de la médiatrice
   * @property {number} opaciteMediatrice Taux d'opacité de la médiatrice
   * @property {number} pointillesMediatrice Si cette valeur est entre 1 et 5, la médiatrice est en pointillés
   * @property {string} couleurConstruction Couleur des traits de construction : du type 'blue' ou du type '#f15929'.
   * @class
   */
// JSDOC Validee par EE Juin 2022
function Mediatrice (
  A,
  B,
  nom = '',
  couleurMediatrice = 'red',
  color = 'blue',
  couleurConstruction = 'black',
  construction = false,
  detail = false,
  markmilieu = '×',
  markrayons = '||',
  epaisseurMediatrice = 1,
  opaciteMediatrice = 1,
  pointillesMediatrice = 0
) {
  if (longueur(A, B) < 0.1) window.notify('ConstructionMediatrice : Points trop rapprochés pour créer cet objet', { A, B })
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.couleurMediatrice = couleurMediatrice
  this.epaisseurMediatrice = epaisseurMediatrice
  this.opaciteMediatrice = opaciteMediatrice
  this.pointillesMediatrice = pointillesMediatrice
  this.couleurConstruction = couleurConstruction
  const O = milieu(A, B)
  const m = rotation(A, O, 90)
  const n = rotation(A, O, -90)
  const M = pointSurSegment(O, m, longueur(A, B) * 0.785)
  const N = pointSurSegment(O, n, longueur(A, B) * 0.785)
  const d = droite(M, N, nom, this.couleurMediatrice)
  if (arguments.length < 5) {
    return d
  } else {
    d.isVisible = false
    d.epaisseur = this.epaisseurMediatrice
    d.opacite = this.opaciteMediatrice
    d.pointilles = this.pointillesMediatrice
    const objets = [d]
    if (construction) {
      const arcm1 = traceCompas(A, M, 20, this.couleurConstruction)
      const arcm2 = traceCompas(B, M, 20, this.couleurConstruction)
      const arcn1 = traceCompas(A, N, 20, this.couleurConstruction)
      const arcn2 = traceCompas(B, N, 20, this.couleurConstruction)
      arcm1.isVisible = false
      arcm2.isVisible = false
      arcn1.isVisible = false
      arcn2.isVisible = false
      const codage = codageMediatrice(A, B, this.color, markmilieu)
      codage.isVisible = false
      objets.push(arcm1, arcm2, arcn1, arcn2, d, codage)
    }
    if (detail) {
      const sAM = segment(A, M, this.couleurConstruction)
      sAM.pointilles = 5
      const sBM = segment(B, M, this.couleurConstruction)
      sBM.pointilles = 5
      const sAN = segment(A, N, this.couleurConstruction)
      sAN.pointilles = 5
      const sBN = segment(B, N, this.couleurConstruction)
      sBN.pointilles = 5
      const codes = codageSegments(markrayons, this.color, A, M, B, M, A, N, B, N)
      objets.push(sAM, sBM, sAN, sBN, codes)
    }
    this.svg = function (coeff) {
      let code = ''
      for (const objet of objets) {
        code += '\n\t' + objet.svg(coeff)
      }
      code = `<g id="${this.id}">${code}</g>`
      return code
    }
    this.tikz = function () {
      let code = ''
      for (const objet of objets) {
        code += '\n\t' + objet.tikz()
      }
      return code
    }
    this.svgml = function (coeff, amp) {
      let code = ''
      for (const objet of objets) {
        if (typeof (objet.svgml) === 'undefined') code += '\n\t' + objet.svg(coeff)
        else code += '\n\t' + objet.svgml(coeff, amp)
      }
      return code
    }
    this.tikzml = function (amp) {
      let code = ''
      for (const objet of objets) {
        if (typeof (objet.tikzml) === 'undefined') code += '\n\t' + objet.tikz()
        else code += '\n\t' + objet.tikzml(amp)
      }
      return code
    }
  }
}

/**
   * Trace la médiatrice d'un segment, en laissant éventuellement apparents les traits de construction au compas
   * @param {Point} A Première extrémité du segment
   * @param {Point} B Seconde extrémité du segment
   * @param {string} [nom=''] Nom affichée de la droite
   * @param {string} [couleurMediatrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'
   * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @param {string} [couleurConstruction='black'] Couleur des traits de construction : du type 'blue' ou du type '#f15929'.
   * @param {boolean} [construction=false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
   * @param {boolean} [detail=false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
   * @param {string} [markmilieu='x'] Symbole posé sur les deux parties du segment
   * @param {string} [markrayons='||'] Symbole posé sur les quatre rayons (si détail est true)
   * @param {number} [epaisseurMediatrice = 1] Epaisseur de la médiatrice
   * @param {number} [opaciteMediatrice = 1] Taux d'opacité de la médiatrice
   * @param {number} [pointillesMediatrice = 0] Si cette valeur est entre 1 et 5, la médiatrice est en pointillés
   * @example mediatrice(M,N)
   * // Trace, en rouge, la médiatrice du segment[MN], d'épaisseur 1, avec une opacité de 100 % sans autre option
   * @example mediatrice(M,N,'d','blue')
   * // Trace, en bleu, la médiatrice du segment[MN], d'épaisseur 1, avec une opacité de 100 % et qui s'appelle 'd'
   * @example mediatrice(M,N,'','blue','red','green',true,true,'OO','XX',2,0.5,3)
   * // Trace, en bleu, la médiatrice du segment[MN], d'épaisseur 2, avec une opacité de 50 % sans nom
   * // Les traits de construction sont dessinés en vert avec la marque 'OO' pour le segment initial et la marque 'XX' pour les rayons, toutes ces marques étant rouge.
   * @author Rémi Angot {amendée par Eric Elter en juin 2022}
   * @return {Mediatrice}
  */
// JSDOC Validee par EE Juin 2022
export function mediatrice (A, B, nom = '', couleurMediatrice = 'red', color = 'blue', couleurConstruction = 'black', construction = false, detail = false, markmilieu = '×', markrayons = '||', epaisseurMediatrice = 1, opaciteMediatrice = 1, pointillesMediatrice = 0) {
  if (arguments.length < 5) return new Mediatrice(A, B, nom, couleurMediatrice)
  else return new Mediatrice(A, B, nom, couleurMediatrice, color, couleurConstruction, construction, detail, markmilieu, markrayons, epaisseurMediatrice, opaciteMediatrice, pointillesMediatrice)
}

/**
   * Code la médiatrice d'un segment
   * @param {Point} A Première extrémité du segment
   * @param {Point} B Seconde extrémité du segment
   * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @param {string} [mark='x'] Symbole posé sur les deux parties du segment
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
   * @author  Rémi Angot
   * @class
   */
// JSDOC Validee par EE Juin 2022
function CodageMediatrice (A, B, color = 'black', mark = '×') {
  if (longueur(A, B) < 0.1) window.notify('CodageMediatrice : Points trop rapprochés pour créer ce codage', { A, B })
  ObjetMathalea2D.call(this, { })
  this.color = color
  const O = milieu(A, B)
  const M = rotation(A, O, 90)
  const c = codageAngleDroit(M, O, B, this.color)
  const v = codageSegments(mark, this.color, A, O, O, B)
  c.isVisible = false
  v.isVisible = false
  this.svg = function (coeff) {
    const code = `<g id="${this.id}">${c.svg(coeff) + '\n' + v.svg(coeff)}</g>`
    return code
  }
  this.tikz = function () {
    return c.tikz() + '\n' + v.tikz()
  }
  this.svgml = function (coeff, amp) {
    return c.svgml(coeff, amp) + '\n' + v.svg(coeff)
  }
  this.tikzml = function (amp) {
    return c.tikzml(amp) + '\n' + v.tikz()
  }
}

/**
   * Code la médiatrice d'un segment
   * @param {Point} A Première extrémité du segment
   * @param {Point} B Seconde extrémité du segment
   * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @param {string} [mark='x'] Symbole posé sur les deux parties du segment
   * @example codageMediatrice(M,N) // Code, en noir, la médiatrice du segment[MN] avec les marques 'x'
   * @example codageMediatrice(M,N,'red','oo') // Code, en rouge, la médiatrice du segment[MN] avec les marques 'oo'
   * @author  Rémi Angot
   * @return {CodageMediatrice}
   */
// JSDOC Validee par EE Juin 2022
export function codageMediatrice (A, B, color = 'black', mark = '×') {
  return new CodageMediatrice(A, B, color, mark)
}

/**
   * Trace la bissectrice d'un angle, en laissant éventuellement apparents les traits de construction au compas
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} O Sommet de l'angle
   * @param {Point} B Point sur l'autre côté de l'angle
   * @param {string} [couleurBissectrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'. Si 'none' ou '', pas de hachures.
   * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @param {string} [couleurConstruction = 'black'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'. Si 'none' ou '', pas de hachures.
   * @param {boolean} [construction=false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
   * @param {boolean} [detail=false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
   * @param {string} [mark='×'] Symbole posé sur les arcs
   * @param {number} [tailleLosange = 5] Longueur d'un côté du losange de construction
   * @param {number} [epaisseurBissectrice = 1] Epaisseur de la bissectrice
   * @param {number} [opaciteBissectrice = 1] Taux d'opacité de la bissectrice
   * @param {number} [pointillesBissectrice = 0] Si cette valeur est entre 1 et 5, la bissectrice est en pointillés
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} couleurBissectrice Couleur de la médiatrice : du type 'blue' ou du type '#f15929'. Si 'none' ou '', pas de hachures.
   * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
   * @property {string} couleurConstruction Couleur de la médiatrice. À associer obligatoirement à colorToLatexOrHTML(). Si 'none' ou '', pas de hachures.
   * @property {string} mark Symbole posé sur les arcs
   * @property {number} tailleLosange Longueur d'un côté du losange de construction
   * @property {number} epaisseurBissectrice Epaisseur de la bissectrice
   * @property {number} opaciteBissectrice Taux d'opacité de la bissectrice
   * @property {number} pointillesBissectrice Si cette valeur est entre 1 et 5, la bissectrice est en pointillés
   * @author Rémi Angot (amendée par Eric Elter en juin 2022)
   * @class
   */
// JSDOC Validee par EE Juin 2022
function Bissectrice (
  A,
  O,
  B,
  couleurBissectrice = 'red',
  color = 'blue',
  couleurConstruction = 'black',
  construction = false,
  detail = false,
  mark = '×',
  tailleLosange = 5,
  epaisseurBissectrice = 1,
  opaciteBissectrice = 1,
  pointillesBissectrice = ''
) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.tailleLosange = tailleLosange
  this.mark = mark
  this.couleurBissectrice = couleurBissectrice
  this.epaisseurBissectrice = epaisseurBissectrice
  this.couleurConstruction = couleurConstruction
  this.opaciteBissectrice = opaciteBissectrice
  this.pointillesBissectrice = pointillesBissectrice
  if (longueur(A, O) < 0.001 || longueur(O, B) < 0.001) window.notify('Bissectrice : points confondus', { A, O, B })
  // Construction de la bissectrice
  const demiangle = angleOriente(A, O, B) / 2
  const m = pointSurSegment(O, A, 3)
  const X = rotation(m, O, demiangle)
  const d = demiDroite(O, X, this.couleurBissectrice)
  // Fin de construction de la bissectrice
  if (arguments.length < 5) {
    return d
  } else {
    d.epaisseur = this.epaisseurBissectrice
    d.opacite = this.opaciteBissectrice
    d.pointilles = this.pointillesBissectrice
    const objets = [d]
    const M = pointSurSegment(O, A, this.tailleLosange)
    const N = pointSurSegment(O, B, this.tailleLosange)
    const dMN = droite(M, N)
    dMN.isVisible = false
    const P = symetrieAxiale(O, dMN)
    if (construction || detail) {
      if (!M.estSur(segment(O, A))) {
        const sOM = segment(O, M, this.couleurConstruction)
        objets.push(sOM)
      }
      if (!N.estSur(segment(O, B))) {
        const sON = segment(O, N, this.couleurConstruction)
        objets.push(sON)
      }
      if (construction) {
        const codage = codageBissectrice(A, O, B, this.color, mark)
        const tNP = traceCompas(N, P, 20, this.couleurConstruction)
        const tMP = traceCompas(M, P, 20, this.couleurConstruction)
        const tOM = traceCompas(O, M, 20, this.couleurConstruction)
        const tON = traceCompas(O, N, 20, this.couleurConstruction)
        objets.push(codage, tNP, tMP, tOM, tON)
      }
      if (detail) {
        const sMP = segment(M, P, this.couleurConstruction)
        const sNP = segment(N, P, this.couleurConstruction)
        sMP.pointilles = 5
        sNP.pointilles = 5
        const codes = codageSegments(this.mark, this.color, O, M, M, P, O, N, N, P)
        objets.push(sMP, sNP, codes)
      }
    }

    this.svg = function (coeff) {
      let code = ''
      for (const objet of objets) {
        code += '\n\t' + objet.svg(coeff)
      }
      return code
    }
    this.tikz = function () {
      let code = ''
      for (const objet of objets) {
        code += '\n\t' + objet.tikz()
      }
      return code
    }
  }
}

/**
   * Trace la bissectrice d'un angle, en laissant éventuellement apparents les traits de construction au compas
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} O Sommet de l'angle
   * @param {Point} B Point sur l'autre côté de l'angle
   * @param {string} [couleurBissectrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929' Si 'none' ou '', pas de hachures.
   * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @param {string} [couleurConstruction = 'black'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929' Si 'none' ou '', pas de hachures.
   * @param {boolean} [construction=false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
   * @param {boolean} [detail=false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
   * @param {string} [mark='×'] Symbole posé sur les arcs
   * @param {number} [tailleLosange = 5] Longueur d'un côté du losange de construction
   * @param {number} [epaisseurBissectrice = 1] Epaisseur de la bissectrice
   * @param {number} [opaciteBissectrice = 1] Taux d'opacité de la bissectrice
   * @param {number} [pointillesBissectrice = 0] Si cette valeur est entre 1 et 5, la bissectrice est en pointillés
   * @example bissectrice(N,R,J)
   * // Trace, en rouge, la bissectrice de l'angle NRJ, d'épaisseur 1 et d'opacité 100 %, sans autre option
   * @example bissectrice(N,R,J,'blue')
   * // Trace, en bleu, la bissectrice de l'angle NRJ, d'épaisseur 1 et d'opacité 100 %, sans autre option
   * @example bissectrice(N,R,J,'blue','red','green',true,true,'||',6,2,0.5,3)
   * // Trace, en rouge, la bissectrice de l'angle NRJ, d'épaisseur 1 et d'opacité 100 %. Les traits de construction sont dessinés en vert avec les marques '||' en rouge.
   * @author Rémi Angot (amendée par Eric Elter en juin 2022)
   * @return {Bissectrice}
   */
// JSDOC Validee par EE Juin 2022
export function bissectrice (A, O, B, couleurBissectrice = 'red', color = 'blue', couleurConstruction = 'black', construction = false, detail = false, mark = '×', tailleLosange = 5, epaisseurBissectrice = 1, opaciteBissectrice = 1, pointillesBissectrice = '') {
  return new Bissectrice(A, O, B, couleurBissectrice, color, couleurConstruction, construction, detail, mark, tailleLosange, epaisseurBissectrice, opaciteBissectrice, pointillesBissectrice)
}

/**
   * Code la bissectrice d'un angle
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} O Sommet de l'angle
   * @param {Point} B Point sur l'autre côté de l'angle
   * @param {string} [color = 'black'] Couleur de la bissectrice : du type 'blue' ou du type '#f15929'
   * @param {string} [mark = 'x'] Symbole posé sur les arcs
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} color Couleur de la bissectrice. À associer obligatoirement à colorToLatexOrHTML().
   * @property {string} mark Symbole posé sur les arcs
   * @property {Point} centre Sommet de l'angle
   * @property {Point} depart Point sur un côté de l'angle (équivalent au point A)
   * @author Jean-Claude Lhote
   * @class
   */
// JSDOC Validee par EE Juin 2022
function CodageBissectrice (A, O, B, color = 'black', mark = 'x') {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.mark = mark
  this.centre = O
  this.depart = pointSurSegment(O, A, 1.5)
  const demiangle = angleOriente(A, O, B) / 2
  const lieu = rotation(this.depart, O, demiangle)

  this.svg = function (coeff) {
    const a1 = codageAngle(pointSurSegment(this.centre, this.depart, 30 / coeff), O, demiangle, 30 / coeff, this.mark, this.color, 1, 1)
    const a2 = codageAngle(pointSurSegment(this.centre, lieu, 30 / coeff), O, demiangle, 30 / coeff, this.mark, this.color, 1, 1)
    return (
      a1.svg(coeff) +
        '\n' +
        a2.svg(coeff) +
        '\n'
    )
  }
  this.tikz = function () {
    const a1 = codageAngle(pointSurSegment(this.centre, this.depart, 1.5 / context.scale), O, demiangle, 1.5 / context.scale, this.mark, this.color, 1, 1)
    const a2 = codageAngle(pointSurSegment(this.centre, lieu, 1.5 / context.scale), O, demiangle, 1.5 / context.scale, this.mark, this.color, 1, 1)
    return a1.tikz() + '\n' + a2.tikz() + '\n'
  }
}

/**
   * Code la bissectrice d'un angle
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} O Sommet de l'angle
   * @param {Point} B Point sur l'autre côté de l'angle
   * @param {string} [color = 'black'] Couleur de la bissectrice : du type 'blue' ou du type '#f15929'
   * @param {string} [mark='x'] Symbole posé sur les arcs
   * @example codagebissectrice(M,N,P) // Code, en noir, la bissectrice de l'angle MNP avec les marques 'x'
   * @example codagebissectrice(M,N,P,'red','oo') // Code, en rouge, la bissectrice de l'angle MNP avec les marques 'oo'
   * @author Jean-Claude Lhote
   * @return {CodageBissectrice}
   */
// JSDOC Validee par EE Juin 2022
export function codageBissectrice (A, O, B, color = 'black', mark = 'x') {
  return new CodageBissectrice(A, O, B, color, mark)
}
