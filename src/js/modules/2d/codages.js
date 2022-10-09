
/**
 * Code un angle droit
 * @param {Point} A Point sur un côté de l'angle droit
 * @param {Point} O Sommet de l'angle droit
 * @param {Point} B Point sur l'autre côté de l'angle droit
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'
 * @param {number} [d=0.4] Taille du codage de l'angle droit
 * @param {number} [epaisseur=0.5] Epaisseur du trait
 * @param {number} [opacite=1] Opacité du trait
 * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage=1] Taux d'opacité du remplissage entre 0 et 1
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {Point} depart Point sur un côté de l'angle droit
 * @property {Point} sommet Sommet de l'angle droit
 * @property {Point} arrivee Point sur l'autre côté de l'angle droit
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} taille Taille du codage de l'angle droit
 * @property {string} couleurDeRemplissage 'none' si on ne veut pas de remplissage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opaciteDeRemplissage Taux d'opacité du remplissage entre 0 et 1
 * @class
 */

import { isNumeric } from 'mathjs'
import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { context } from '../context'
import { nombreDeChiffresDe, stringNombre } from '../outils'
import { arc } from './arc'
import { milieu } from './barycentre'
import { angleOriente, longueur } from './calculs'
import { droite } from './droites'
import { mediatrice } from './droitesremarquables'
import { point } from './point'
import { pointSurSegment } from './pointsur'
import { polygone } from './polygone'
import { polyline } from './polyline'
import { Segment, segment } from './segment'
import { latexParPoint, TexteParPoint, texteParPoint, texteParPosition } from './textes'
import { rotation, similitude, translation } from './transformations'
import { vecteur } from './vecteur'

// JSDOC Validee par EE Juin 2022
function CodageAngleDroit (A, O, B, color = 'black', d = 0.4, epaisseur = 0.5, opacite = 1, couleurDeRemplissage = 'none', opaciteDeRemplissage = 1) {
  ObjetMathalea2D().call(this, { })
  this.sommet = O
  this.depart = A
  this.arrivee = B
  this.taille = d
  this.color = color
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.opaciteDeRemplissage = opaciteDeRemplissage

  this.svg = function (coeff) {
    const a = pointSurSegment(this.sommet, this.depart, this.taille * 20 / coeff)
    const b = pointSurSegment(this.sommet, this.arrivee, this.taille * 20 / coeff)
    let o = {}
    let result = {}
    if (angleOriente(this.depart, this.sommet, this.arrivee) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    if (this.couleurDeRemplissage === 'none') result = polyline([a, o, b], this.color)
    else {
      result = polygone([this.sommet, a, o, b], this.color)
      result.couleurDeRemplissage = this.couleurDeRemplissage
      result.opaciteDeRemplissage = this.opaciteDeRemplissage
    }
    result.isVisible = false
    result.epaisseur = epaisseur
    result.opacite = opacite
    this.id = result.id
    return result.svg(coeff)
  }
  this.tikz = function () {
    const a = pointSurSegment(this.sommet, this.depart, this.taille / context.scale)
    const b = pointSurSegment(this.sommet, this.arrivee, this.taille / context.scale)
    let o = {}
    let result = {}
    if (angleOriente(this.depart, this.sommet, this.arrivee) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    if (this.couleurDeRemplissage === 'none') return polyline([a, o, b], this.color).tikz()
    else {
      result = polygone([this.sommet, a, o, b], this.color)
      result.couleurDeRemplissage = this.couleurDeRemplissage
      result.opaciteDeRemplissage = this.opaciteDeRemplissage
      result.isVisible = false
      result.epaisseur = epaisseur
      result.opacite = opacite
      return result.tikz()
    }
  }
  this.svgml = function (coeff, amp) {
    const a = pointSurSegment(this.sommet, this.depart, this.taille * 20 / coeff)
    const b = pointSurSegment(this.sommet, this.arrivee, this.taille * 20 / coeff)
    let o = {}
    if (angleOriente(A, this.sommet, B) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    return polyline([a, o, b], this.color).svgml(coeff, amp)
  }
  this.tikzml = function (amp) {
    const a = pointSurSegment(this.sommet, this.depart, this.taille / context.scale)
    const b = pointSurSegment(this.sommet, this.arrivee, this.taille / context.scale)
    let o = {}
    if (angleOriente(A, this.sommet, B) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    return polyline([a, o, b], this.color).tikzml(amp)
  }
}

/**
   * Code un angle droit
   * @param {Point} A Point sur un côté de l'angle droit
   * @param {Point} O Sommet de l'angle droit
   * @param {Point} B Point sur l'autre côté de l'angle droit
   * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'
   * @param {number} [d=0.4] Taille du codage de l'angle droit
   * @param {number} [epaisseur=0.5] Epaisseur du trait
   * @param {number} [opacite=1] Opacité du trait
   * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
   * @param {number} [opaciteDeRemplissage=1] Taux d'opacité du remplissage
   * @example codageAngleDroit(A,J,T)
   * // Trace un codage d'angle droit pour l'angle direct AJT, de couleur noire, de taille 0,4, d'épaisseur 0,5 avec une opacité de 100 %, sans remplissage
   * @example codageAngleDroit(A,J,T,'pink',1,0.2,0.6,'blue',0.2)
   * // Trace un codage d'angle droit pour l'angle direct AJT, de couleur rose, de taille 1, d'épaisseur 0,2 avec une opacité de 60 %, rempli en bleu avec une opacité de 20%.
   * @return {CodageAngleDroit}
   * @author Rémi Angot
   */
// JSDOC Validee par EE Juin 2022
export function codageAngleDroit (A, O, B, color = 'black', d = 0.4, epaisseur = 0.5, opacite = 1, couleurDeRemplissage = 'none', opaciteDeRemplissage = 1) {
  return new CodageAngleDroit(A, O, B, color, d, epaisseur, opacite, couleurDeRemplissage, opaciteDeRemplissage)
}

/**
   * Affiche la longueur de [AB] au dessus si A est le point le plus à gauche sinon au dessous.
   * @param  {Point} A Première extrémité du segment
   * @param  {Point} B Seconde extrémité du segment
   * @param  {string} [color='black'] Couleur de la longueur affichée : du type 'blue' ou du type '#f15929'.
   * @param  {number} [d=0.5] Distance entre l'affichage de la longueur et le segment.
   * @param  {string} [unite='cm'] Affiche cette unité après la valeur numérique de la longueur.
   * @param  {boolean} [horizontal=false] Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} color Couleur de la longueur affichée. À associer obligatoirement à colorToLatexOrHTML().
   * @author Rémi Angot
   * @class
   */
// JSDOC Validee par EE Juin 2022
function AfficheLongueurSegment (A, B, color = 'black', d = 0.5, unite = 'cm', horizontal = false) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  const O = milieu(A, B)
  const M = rotation(A, O, -90)
  const s = segment(A, B)
  let angle
  s.isVisible = false
  const l = stringNombre(s.longueur, 1)
  const longueurSeg = `${l}${unite !== '' ? ' ' + unite : ''}`
  this.distance = horizontal ? (d - 0.1 + longueurSeg.length / 10) : d
  if (horizontal) {
    angle = 0
  } else if (B.x > A.x) {
    angle = -s.angleAvecHorizontale
  } else {
    angle = 180 - s.angleAvecHorizontale
  }
  this.svg = function (coeff) {
    const N = pointSurSegment(O, M, (this.distance * 20) / coeff)
    return texteParPoint(longueurSeg, N, angle, this.color, 1, 'middle', false).svg(coeff)
  }
  this.tikz = function () {
    const N = pointSurSegment(O, M, this.distance / context.scale)
    return texteParPoint(longueurSeg, N, angle, this.color, 1, 'middle', false).tikz()
  }
}

/**
   * Affiche la longueur de [AB] au dessus si A est le point le plus à gauche sinon au dessous.
   * @param  {Point} A Première extrémité du segment
   * @param  {Point} B Seconde extrémité du segment
   * @param  {string} [color='black'] Couleur affichée de la longueur affichée : du type 'blue' ou du type '#f15929'.
   * @param  {number} [d=0.5] Distance entre l'affichage de la longueur et le segment.
   * @param  {string} [unite='cm'] Affiche cette unité après la valeur numérique de la longueur.
   * @param  {boolean} [horizontal=false] Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
   * @example  afficheLongueurSegment(A,B)
   * // Affiche la longueur du segment [AB] (en noir, à 0,5 "cm" du segment, complétée par l'unité cm et parallèlement au segment).
   * @example  afficheLongueurSegment(A,B,'blue',1,'mm',true)
   * // Affiche la longueur du segment [AB], en bleu, à 1 "cm" du segment, complétée par l'unité mm et horizontalement.
   * @return {AfficheLongueurSegment}
   * @author Rémi Angot
   */
// JSDOC Validee par EE Juin 2022
export function afficheLongueurSegment (A, B, color = 'black', d = 0.5, unite = 'cm', horizontal = false) {
  return new AfficheLongueurSegment(A, B, color, d, unite, horizontal)
}

/**
   * texteSurSegment('mon texte',A,B) // Écrit un texte au milieu de [AB] au dessus si A est le point le plus à gauche sinon en dessous, ou alors horizontalement
   *
   * @author Rémi Angot
   */
function TexteSurSegment (texte, A, B, color = 'black', d = 0.5, horizontal = false) {
  ObjetMathalea2D.call(this, { })
  if (longueur(A, B) < 0.1) window.notify('TexteSurSegment : Points trop proches pour cette fonction', { A, B })
  this.color = color
  this.extremite1 = A
  this.extremite2 = B
  this.texte = texte
  this.distance = horizontal ? (d - 0.1 + (isNumeric(this.texte) ? nombreDeChiffresDe(this.texte) : this.texte.length) / 10) : d
  const O = milieu(this.extremite1, this.extremite2)
  const M = rotation(this.extremite1, O, -90)
  const s = segment(this.extremite1, this.extremite2)
  let angle
  const pos = pointSurSegment(O, M, this.distance)
  const space = 0.2 * this.texte.length
  this.bordures = [pos.x - space, pos.y - space, pos.x + space, pos.y + space]
  if (horizontal) {
    angle = 0
  } else if (this.extremite2.x > this.extremite1.x) {
    angle = -s.angleAvecHorizontale
    angle = -s.angleAvecHorizontale
  } else {
    angle = 180 - s.angleAvecHorizontale
    angle = 180 - s.angleAvecHorizontale
  }
  this.svg = function (coeff) {
    const N = pointSurSegment(O, M, this.distance * 20 / coeff)
    return texteParPoint(this.texte, N, angle, this.color, 1, 'middle', true).svg(coeff)
  }
  this.tikz = function () {
    const N = pointSurSegment(O, M, this.distance / context.scale)
    return texteParPoint(this.texte, N, angle, this.color, 1, 'middle', true).tikz()
  }
}
/**
   * Écrit un texte au milieu de [AB] au dessus si A est le point le plus à gauche sinon au dessous ou bien horizontal
   * @param {string} texte
   * @param {Point} A
   * @param {Point} B
   * @param {string} [color='black'] Code couleur HTML accepté
   * @param {number} [d=0.5] Distance à la droite.
   * @param {boolean} [horizontal=false] Si true, alors le texte est horizontal, sinon le texte est parallèle au segment
   * @return {object} LatexParCoordonnees si le premier caractère est '$', TexteParPoint sinon
   * @author Rémi Angot
   */
export function texteSurSegment (...args) {
  return new TexteSurSegment(...args)
}

/**
   * texteSurArc(texte, A, B, angle) // Écrit un texte au milieu de l'arc AB, au dessus si A est le point le plus à gauche sinon au dessous
   *
   * @author Rémi Angot et Frédéric Piou
   */
function TexteSurArc (texte, A, B, angle, color = 'black', d = 0.5, horizontal = false) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.extremite1 = A
  this.extremite2 = B
  this.distance = -d
  this.texte = texte
  let anglerot
  if (angle < 0) anglerot = (angle + 180) / 2
  else anglerot = (angle - 180) / 2
  const d1 = mediatrice(A, B)
  d1.isVisible = false
  const e = droite(A, B)
  e.isVisible = false
  const f = rotation(e, B, anglerot)
  f.isVisible = false
  const determinant = d1.a * f.b - f.a * d1.b
  const Omegax = (d1.b * f.c - f.b * d1.c) / determinant
  const Omegay = (f.a * d1.c - d1.a * f.c) / determinant
  const Omega = point(Omegax, Omegay)
  const s = segment(this.extremite1, this.extremite2)
  s.isVisible = false
  const p = rotation(A, Omega, angle / 2)
  const pos = pointSurSegment(p, Omega, this.distance)
  const space = 0.2 * texte.length
  this.bordures = [pos.x - space, pos.y - space, pos.x + space, pos.y + space]
  this.svg = function (coeff) {
    const N = pointSurSegment(p, Omega, this.distance * 20 / coeff)
    if (this.extremite2.x > this.extremite1.x) {
      angle = -s.angleAvecHorizontale
    } else {
      angle = 180 - s.angleAvecHorizontale
    }
    if (this.texte.charAt(0) === '$') {
      return latexParPoint(this.texte.substr(1, this.texte.length - 2), N, this.color, this.texte * 8, 12, '').svg(coeff)
    } else {
      return texteParPoint(this.texte, N, horizontal ? 0 : angle, this.color).svg(coeff)
    }
  }
  this.tikz = function () {
    const N = pointSurSegment(p, Omega, this.distance / context.scale)
    if (this.extremite2.x > this.extremite1.x) {
      angle = -s.angleAvecHorizontale
    } else {
      angle = 180 - s.angleAvecHorizontale
    }
    return texteParPoint(this.texte, N, angle, this.color).tikz()
  }
}
/**
   * Écrit un texte au "milieu" de l'arc AB au dessus si A est le point le plus à gauche sinon en dessous
   * @param {string} texte Texte à afficher (éviter les $$ pour les affichages diaporama)
   * @param {Point} A Extrémité de l'arc
   * @param {Point} B Extrémité de l'arc
   * @param {number} angle Angle au centre
   * @param {string} [color='black'] Code couleur HTML accepté
   * @param {number} [d=0.5] Distance à la droite.
   * @param {boolean} [horizontal = false] Décide si le texte est horizontal ou pas, quelle que soit la valeur de angle.
   * @return {object} LatexParCoordonnees si le premier caractère est '$', TexteParPoint sinon
   * @author Rémi Angot et Frédéric Piou
   */
export function texteSurArc (texte, A, B, angle, color = 'black', d = 0.5, horizontal = false) {
  return new TexteSurArc(texte, A, B, angle, color, d, horizontal)
}

/**
   * Affiche la mesure de l'angle ABC arrondie au degré près
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} B Sommet de l'angle
   * @param {Point} C Point sur l'autre côté de l'angle
   * @param {string} [color='black'] Couleur de la mesure de l'angle : du type 'blue' ou du type '#f15929'.
   * @param {number} [distance=1.5] Taille de l'angle
   * @param {string} [label=''] Si vide, alors affiche la mesure de l'angle sinon affiche ce label.
   * @param {Object} parametres À saisir entre accolades
   * @param {number} [parametres.ecart=0.5] Distance entre l'arc et sa mesure
   * @param {boolean} [parametres.saillant=true] True si on veut l'angle saillant, false si on veut l'angle rentrant.
   * @param {string} [parametres.colorArc='black']  Couleur de l'arc  : du type 'blue' ou du type '#f15929'.
   * @param {boolean} [parametres.rayon=false] True pour fermer l'angle, par deux rayons (en vue de colorier l'intérieur).
   * @param {string} [parametres.couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'.
   * @param {number} [parametres.opaciteDeRemplissage=0.5] Taux d'opacité du remplissage entre 0 et 1
   * @param {number} [parametres.arcEpaisseur=1] Epaisseur de l'arc
   * @param {boolean} [parametres.mesureEnGras=false] True pour mettre en gras la mesure affichée
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {Point} depart Point sur un côté de l'angle
   * @property {Point} sommet Sommet de l'angle
   * @property {Point} arrivee Point sur l'autre côté de l'angle
   * @property {number} distance Taille de l'angle
   * @property {number} ecart Distance entre l'arc et sa mesure
   * @property {boolean} saillant True si on veut l'angle saillant, false si on veut l'angle rentrant.
   * @property {number} epaisseur Epaisseur de l'arc
   * @class
   */
// JSDOC Validee par EE Juin 2022
function AfficheMesureAngle (A, B, C, color = 'black', distance = 1.5, label = '', { ecart = 0.5, mesureEnGras = false, saillant = true, colorArc = 'black', rayon = false, couleurDeRemplissage = 'none', opaciteDeRemplissage = 0.5, arcEpaisseur = 1 } = {}) {
  ObjetMathalea2D.call(this, { })
  this.depart = A
  this.arrivee = C
  this.sommet = B
  this.distance = distance
  const angle = saillant ? angleOriente(this.depart, this.sommet, this.arrivee) : angleOriente(this.depart, this.sommet, this.arrivee) > 0 ? angleOriente(this.depart, this.sommet, this.arrivee) - 360 : 360 + angleOriente(this.depart, this.sommet, this.arrivee)
  this.ecart = ecart
  this.saillant = saillant
  this.epaisseur = arcEpaisseur
  this.svg = function (coeff) {
    const M = pointSurSegment(this.sommet, this.depart, this.distance)
    const N = rotation(pointSurSegment(this.sommet, M, this.distance + this.ecart * 20 / coeff), this.sommet, angle / 2, '', 'center')
    let mesureAngle
    if (label !== '') {
      mesureAngle = label
    } else {
      mesureAngle = Math.round(this.saillant ? angle(this.depart, this.sommet, this.arrivee) : 360 - angle(this.depart, this.sommet, this.arrivee)) + '°'
    }
    const mesure = texteParPoint(mesureAngle, N, 'milieu', color, 1, 'middle', true)
    const marque = arc(M, B, angle, rayon, couleurDeRemplissage, colorArc, opaciteDeRemplissage)
    mesure.contour = mesureEnGras
    mesure.couleurDeRemplissage = colorToLatexOrHTML(color)
    marque.epaisseur = this.epaisseur
    return '\n' + mesure.svg(coeff) + '\n' + marque.svg(coeff)
  }
  this.tikz = function () {
    const M = pointSurSegment(this.sommet, this.depart, this.distance)
    const N = rotation(pointSurSegment(this.sommet, M, this.distance + this.ecart), this.sommet, angle / 2, '', 'center')
    let mesureAngle
    if (label !== '') {
      mesureAngle = label
    } else {
      mesureAngle = Math.round(this.saillant ? angle(this.depart, this.sommet, this.arrivee) : 360 - angle(this.depart, this.sommet, this.arrivee)) + '\\degree'
    }
    const mesure = texteParPoint(mesureAngle, N, 'milieu', color, 1, 'middle', true)
    const marque = arc(M, B, angle, rayon, couleurDeRemplissage, colorArc, opaciteDeRemplissage)
    mesure.contour = mesureEnGras
    mesure.couleurDeRemplissage = colorToLatexOrHTML(color)
    marque.epaisseur = this.epaisseur
    return '\n' + mesure.tikz() + '\n' + marque.tikz()
  }
}
/**
   * Affiche la mesure de l'angle ABC arrondie au degré près
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} B Sommet de l'angle
   * @param {Point} C Point sur l'autre côté de l'angle
   * @param {string} [color='black'] Couleur de la mesure de l'angle : du type 'blue' ou du type '#f15929'.
   * @param {number} [distance=1.5] Rayon de l'arc de cercle.
   * @param {string} [label=''] Si vide, alors affiche la mesure de l'angle sinon affiche ce label.
   * @param {Object} parametres À saisir entre accolades
   * @param {number} [parametres.ecart=0.5] Distance entre l'arc et sa mesure
   * @param {boolean} [parametres.saillant=true] True si on veut l'angle saillant, false si on veut l'angle rentrant.
   * @param {string} [parametres.colorArc='black']  Couleur de l'arc  : du type 'blue' ou du type '#f15929'.
   * @param {boolean} [parametres.rayon=false] True pour fermer l'angle, par deux rayons (en vue de colorier l'intérieur).
   * @param {string} [parametres.couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'.
   * @param {number} [parametres.opaciteDeRemplissage=0.5] Taux d'opacité du remplissage entre 0 et 1
   * @param {number} [parametres.arcEpaisseur=1] Epaisseur de l'arc
   * @param {boolean} [parametres.mesureEnGras=false] True pour mettre en gras la mesure affichée
   * @example afficheMesureAngle(M,N,O)
   * // Affiche la mesure de l'angle MNO (en noir, avec un arc de rayon 1,5 "cm").
   * @example afficheMesureAngle(M,N,O,'red',2,'pop',{ecart:1,saillant:false,colorArc:'blue',rayon:true,couleurDeRemplissage:'#f15929',opaciteDeRemplissage:0.8,arcEpaisseur:2,mesureEnGras:true})
   * // Affiche le label pop en gras et rouge, sur l'angle rentrant MNO, avec un arc bleu, epais de 2 et de rayon 2 "cm", à 1 "cm" de l'arc rempli en orange avec une opacité de 80%, cerné par ses rayons.
   * @return {AfficheMesureAngle}
   */
// JSDOC Validee par EE Juin 2022
export function afficheMesureAngle (A, B, C, color = 'black', distance = 1.5, label = '', { ecart = 0.5, mesureEnGras = false, saillant = true, colorArc = 'black', rayon = false, couleurDeRemplissage = 'none', opaciteDeRemplissage = 0.5, arcEpaisseur = 1 } = {}) {
  return new AfficheMesureAngle(A, B, C, color, distance, label, { ecart, mesureEnGras, saillant, colorArc, rayon, couleurDeRemplissage, opaciteDeRemplissage, arcEpaisseur })
}

/**
   * Affiche la côte d'un segment sous la forme d'une flèche à double sens et d'une valeur associée.
   * @param {Segment} s Segment pour lequel on affiche la côte
   * @param {string} [Cote=''] Si '', alors la longueur en cm est affichée, sinon c'est cette valeur qui s'affiche (et cela peut être une variable).
   * @param {number} [positionCote = 0.5] Position de la flèche par rapport au segment. Valeur négative ou positive selon la position voulue.
   * @param {string} [couleurCote='black'] Couleur de la flèche  : du type 'blue' ou du type '#f15929'.
   * @param {number} [epaisseurCote=1] Epaisseur de la flèche.
   * @param {number} [positionValeur=0.5] Position de la valeur par rapport à la flèche. Valeur négative ou positive selon la position voulue.
   * @param {string} [couleurValeur='black']  Couleur de la valeur indiquée : du type 'blue' ou du type '#f15929'.
   * @param {boolean} [horizontal=false]  Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @author Jean-Claude Lhote
   * @class
   */
// JSDOC Validee par EE Juin 2022
function AfficheCoteSegment (
  s,
  Cote = '',
  positionCote = 0.5,
  couleurCote = 'black',
  epaisseurCote = 1,
  positionValeur = 0.5,
  couleurValeur = 'black',
  horizontal = false
) {
  ObjetMathalea2D.call(this, { })
  const positionCoteSVG = positionCote * 20 / context.pixelsParCm
  const positionCoteTIKZ = positionCote / context.scale

  this.svg = function (coeff) {
    let valeur
    const A = s.extremite1
    const B = s.extremite2
    const v = similitude(vecteur(A, B), A, 90, positionCoteSVG / s.longueur)
    const cote = segment(translation(A, v), translation(B, v), couleurCote)
    if (longueur(A, B) > 1) cote.styleExtremites = '<->'
    else cote.styleExtremites = '>-<'
    cote.epaisseur = epaisseurCote
    if (Cote === '') {
      valeur = afficheLongueurSegment(
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        positionValeur,
        'cm',
        horizontal
      )
    } else {
      valeur = texteSurSegment(
        Cote,
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        positionValeur,
        horizontal
      )
    }
    return '\n\t' + cote.svg(coeff) + '\n\t' + valeur.svg(coeff)
  }

  this.tikz = function () {
    let valeur
    const A = s.extremite1
    const B = s.extremite2
    const v = similitude(vecteur(A, B), A, 90, positionCoteTIKZ / s.longueur)
    const cote = segment(translation(A, v), translation(B, v), couleurCote)
    if (longueur(A, B) > 1) cote.styleExtremites = '<->'
    else cote.styleExtremites = '>-<'
    cote.epaisseur = epaisseurCote
    if (Cote === '') {
      valeur = afficheLongueurSegment(
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        positionValeur
      )
    } else {
      valeur = texteSurSegment(
        Cote,
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        positionValeur
      )
    }
    return '\n\t' + cote.tikz() + '\n\t' + valeur.tikz()
  }
}
/**
   * Affiche la côte d'un segment sous la forme d'une flèche à double sens et d'une valeur associée.
   * @param {Segment} s Segment pour lequel on affiche la côte
   * @param {string} [Cote=''] Si '', alors la longueur en cm est affichée, sinon c'est cette valeur qui s'affiche (et cela peut être une variable).
   * @param {number} [positionCote = 0.5] Position de la flèche par rapport au segment. Valeur négative ou positive selon la position voulue.
   * @param {string} [couleurCote='black'] Couleur de la flèche  : du type 'blue' ou du type '#f15929'.
   * @param {number} [epaisseurCote=1] Epaisseur de la flèche.
   * @param {number} [positionValeur=0.5] Position de la valeur par rapport à la flèche. Valeur négative ou positive selon la position voulue.
   * @param {string} [couleurValeur='black']  Couleur de la valeur indiquée : du type 'blue' ou du type '#f15929'.
   * @param {boolean} [horizontal=false]  Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
   * @example afficheCoteSegment(s)
   * // Affiche la côte du segment s (avec une flèche noire d\'épaisseur 1 "cm", placée 0.5 "cm" sous le segment, avec la longueur du segment, en cm, écrite en noir, 0,5 "cm" au-dessus, et parallèle au segment.
   * @example afficheCoteSegment(s,'x',-1,'red',2,1,'blue',true)
   * // Affiche la côte du segment s, avec une flèche rouge d\'épaisseur 2 "cm", placée 1 "cm" sous le segment, avec le texte 'x' écrit en bleu, 1 "cm" au-dessus, et horizontalement.
   * @return {AfficheCoteSegment}
   * @author Jean-Claude Lhote
   */
// JSDOC Validee par EE Juin 2022

export function afficheCoteSegment (s, Cote = '', positionCote = 0.5, couleurCote = 'black', epaisseurCote = 1, positionValeur = 0.5, couleurValeur = 'black', horizontal = false) {
  return new AfficheCoteSegment(s, Cote, positionCote, couleurCote, epaisseurCote, positionValeur, couleurValeur, horizontal)
}

/**
   * Code un segment
   * @param {Point} A Première extrémité du segment
   * @param {Point} B Seconde extrémité du segment
   * @param {string} [mark='||'] Symbole posé sur le segment
   * @param {string} [color='black'] Couleur du symbole : du type 'blue' ou du type '#f15929'
   * @example codageSegment(H,K) // Code le segment [HK] avec la marque noire '||'
   * @example codageAngle(H,K,'x','green') // Code le segment [HK] avec la marque verte 'x'
   * @author Rémi Angot
   * @return {TexteParPoint}
   */
// JSDOC Validee par EE Juin 2022
export function codageSegment (A, B, mark = '||', color = 'black') {
  const O = milieu(A, B)
  const s = segment(A, B)
  s.isVisible = false
  let angle
  if (B.x > A.x) {
    angle = -parseInt(s.angleAvecHorizontale)
  } else {
    angle = -parseInt(s.angleAvecHorizontale) + 180
  }
  return new TexteParPoint(mark, O, angle, color)
}

/**
   * Code plusieurs segments de la même façon
   * @param {string} [mark = '||'] Symbole posé sur le segment
   * @param {string} [color = 'black'] Couleur du symbole : : du type 'blue' ou du type '#f15929'
   * @param  {Point|Point[]|Segment} args Les segments différement codés.
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @author Rémi Angot
   * @class
   */
// JSDOC Validee par EE Juin 2022
function CodageSegments (mark = '||', color = 'black', ...args) {
  ObjetMathalea2D.call(this, { })
  this.svg = function (coeff) {
    let code = ''
    if (Array.isArray(args[0])) {
      // Si on donne une liste de points
      for (let i = 0; i < args[0].length - 1; i++) {
        const codage = codageSegment(args[0][i], args[0][i + 1], mark, color)
        codage.isVisible = false
        code += codage.svg(coeff)
        code += '\n'
      }
      const codage = codageSegment(args[0][args[0].length - 1], args[0][0], mark, color)
      codage.isVisible = false
      code += codage.svg(coeff)
      code += '\n'
    } else if (args[0] instanceof Segment) {
      for (let i = 0; i < args.length; i++) {
        const codage = codageSegment(args[i].extremite1, args[i].extremite2, mark, color)
        codage.isVisible = false
        code += codage.svg(coeff)
        code += '\n'
      }
    } else {
      for (let i = 0; i < args.length; i += 2) {
        const codage = codageSegment(args[i], args[i + 1], mark, color)
        codage.isVisible = false
        code += codage.svg(coeff)
        code += '\n'
      }
    }
    code = `<g id="${this.id}">${code}</g>`
    return code
  }
  this.tikz = function () {
    let code = ''
    if (Array.isArray(args[0])) {
      // Si on donne une liste de points
      for (let i = 0; i < args[0].length - 1; i++) {
        code += codageSegment(args[0][i], args[0][i + 1], mark, color).tikz()
        code += '\n'
      }
      code += codageSegment(
        args[0][args[0].length - 1],
        args[0][0],
        mark,
        color
      ).tikz()
      code += '\n'
    } else if (args[0].constructor === Segment) {
      for (let i = 0; i < args.length; i++) {
        code += codageSegment(
          args[i].extremite1,
          args[i].extremite2,
          mark,
          color
        ).tikz()
        code += '\n'
      }
    } else {
      for (let i = 0; i < args.length; i += 2) {
        code += codageSegment(args[i], args[i + 1], mark, color).tikz()
        code += '\n'
      }
    }
    return code
  }
}

/**
   * Code plusieurs segments de la même façon
   * @param {string} [mark = '||'] Symbole posé sur le segment
   * @param {string} [color = 'black'] Couleur du symbole : : du type 'blue' ou du type '#f15929'
   * @param  {Points|Point[]|Segments} args Les segments différement codés. Voir exemples.
   * @example codageSegments('×','blue',A,B, B,C, C,D) // Code les segments [AB], [BC] et [CD] avec une croix bleue
   * @example codageSegments('×','blue',[A,B,C,D]) // Code les segments [AB], [BC], [CD] et [DA] (attention, chemin fermé, pratique pour des polygones pas pour des lignes brisées)
   * @example codageSegments('×','blue',s1,s2,s3) // Code les segments s1, s2 et s3 avec une croix bleue
   * @example codageSegments('×','blue',p.listePoints) // Code tous les segments du polygone avec une croix bleue
   * @author Rémi Angot
   * @return {CodageSegments}
   */
// JSDOC Validee par EE Juin 2022
export function codageSegments (mark = '||', color = 'black', ...args) {
  return new CodageSegments(mark, color, ...args)
}

/**
   * Code un angle
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} O Sommet de l'angle
   * @param {number|Point} angle Mesure de l'angle ou nom d'un point sur l'autre côté de l'angle
   * @param {number} [taille=0.8] Taille de l'angle
   * @param {string} [mark=''] Marque sur l'angle
   * @param {string} [color='black'] Couleur de l'angle : du type 'blue' ou du type '#f15929'
   * @param {number} [epaisseur=1] Epaisseur du tracé de l'angle
   * @param {number} [opacite=1] Opacité de la couleur du tracé de l'angle
   * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
   * @param {number} [opaciteDeRemplissage=0.2] Opacité de la couleur de remplissage de l'angle
   * @param {boolean} [mesureOn=false] Affichage de la mesure de l'angle
   * @param {boolean} [noAngleDroit=false] Pour choisir si on veut que l'angle droit soit marqué par un carré ou pas
   * @param {string} [texteACote=''] Pour mettre un texte à côté de l'angle à la place de la mesure de l'angle
   * @param {number} [tailleTexte=1] Pour choisir la taille du texte à côté de l'angle
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {Point} debut Point sur un côté de l'angle
   * @property {Point} centre Sommet de l'angle
   * @property {number|Point} angle Mesure de l'angle ou nom d'un point sur l'autre côté de l'angle
   * @property {number} taille Taille de l'angle
   * @property {string} mark Marque sur l'angle
   * @property {string} color Couleur de l'angle. À associer obligatoirement à colorToLatexOrHTML().
   * @property {number} epaisseur Epaisseur du tracé de l'angle
   * @property {number} opacite Opacité de la couleur du tracé de l'angle
   * @property {string} couleurDeRemplissage À associer obligatoirement à colorToLatexOrHTML(). 'none' si on ne veut pas de remplissage.
   * @property {number} opaciteDeRemplissage Opacité de la couleur de remplissage de l'angle
   * @author Jean-Claude Lhote
   * @class
   */
// JSDOC Validee par EE Juin 2022
function CodageAngle (debut, centre, angle, taille = 0.8, mark = '', color = 'black', epaisseur = 1, opacite = 1, couleurDeRemplissage = 'none', opaciteDeRemplissage = 0.2, mesureOn = false, texteACote = '', tailleTexte = 1) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.debut = debut
  this.centre = centre
  this.taille = taille
  this.mark = mark
  this.epaisseur = epaisseur
  this.opacite = opacite
  this.couleurDeRemplissage = couleurDeRemplissage
  this.opaciteDeRemplissage = opaciteDeRemplissage
  this.angle = angle
  this.svg = function (coeff) {
    let code = ''
    const objets = []
    const depart = pointSurSegment(this.centre, this.debut, this.taille * 20 / context.pixelsParCm)
    const P = rotation(depart, this.centre, this.angle / 2)
    const M = pointSurSegment(this.centre, P, this.taille + 0.6 * 20 / coeff)
    const d = droite(this.centre, P)
    d.isVisible = false
    const mesure = Math.round(Math.abs(angle)) + '°'
    const arcangle = arc(depart, this.centre, this.angle, this.couleurDeRemplissage !== 'none', this.couleurDeRemplissage, this.color)
    arcangle.isVisible = false
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = this.opaciteDeRemplissage
    objets.push(arcangle)
    if (this.mark !== '') {
      const t = texteParPoint(mark, P, 90 - d.angleAvecHorizontale, this.color)
      t.isVisible = false
      objets.push(t)
    }
    if (mesureOn && texteACote === '') {
      const t = texteParPoint(mesure, M, 'milieu', this.color)
      t.isVisible = false
      objets.push(t)
    }
    if (texteACote !== '') {
      const texteACOTE = texteParPoint(texteACote, M, 'milieu', this.color, tailleTexte)
      objets.push(texteACOTE)
    }
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    if (objets.length > 1) {
      code = `<g id="${this.id}">${code}</g>`
    } else {
      this.id = arcangle.id // Dans le cas où il n'y a pas de groupe, on récupère l'id
    }
    return code
  }

  this.svgml = function (coeff, amp) {
    let code = ''
    const depart = pointSurSegment(this.centre, this.debut, this.taille * 20 / context.pixelsParCm)
    const P = rotation(depart, this.centre, this.angle / 2)
    const M = pointSurSegment(this.centre, P, taille + 0.6 * 20 / coeff)
    const mesure = Math.round(Math.abs(angle)) + '°'
    const d = droite(this.centre, P)
    d.isVisible = false
    const arcangle = arc(depart, this.centre, this.angle, false, this.couleurDeRemplissage, this.color)
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = this.opaciteDeRemplissage
    if (this.mark !== '') code += texteParPoint(mark, P, 90 - d.angleAvecHorizontale, this.color).svg(coeff) + '\n'
    if (mesureOn && texteACote === '') code += texteParPoint(mesure, M, 'milieu', this.color).svg(coeff) + '\n'
    if (texteACote !== '') code += texteParPoint(texteACote, M, 'milieu', this.color, tailleTexte).svg(coeff) + '\n'
    code += arcangle.svgml(coeff, amp)
    return code
  }
  this.tikz = function () {
    let code = ''
    const depart = pointSurSegment(this.centre, this.debut, this.taille / context.scale)
    const P = rotation(depart, this.centre, this.angle / 2)
    const M = pointSurSegment(this.centre, P, taille + 0.6 / context.scale)
    const mesure = Math.round(Math.abs(angle)) + '°'
    const d = droite(this.centre, P)
    d.isVisible = false
    const arcangle = arc(depart, this.centre, this.angle, this.couleurDeRemplissage !== 'none', this.couleurDeRemplissage, this.color)
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = this.opaciteDeRemplissage
    if (this.mark !== '') code += texteParPoint(mark, P, 90 - d.angleAvecHorizontale, this.color).tikz() + '\n'
    if (mesureOn && texteACote === '') code += texteParPoint(mesure, M, 'milieu', this.color).tikz() + '\n'
    if (texteACote !== '') code += texteParPoint(texteACote, M, 'milieu', this.color, tailleTexte).tikz() + '\n'
    code += arcangle.tikz()
    return code
  }
  this.tikzml = function (amp) {
    let code = ''
    const depart = pointSurSegment(this.centre, this.debut, this.taille / context.scale)
    const M = rotation(depart, this.centre, this.angle / 2)
    const mesure = Math.round(Math.abs(angle)) + '°'
    const d = droite(this.centre, M)
    d.isVisible = false
    const arcangle = arc(depart, this.centre, this.angle, false, this.couleurDeRemplissage, this.color)
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = this.opaciteDeRemplissage
    if (this.mark !== '') code += texteParPoint(mark, M, 90 - d.angleAvecHorizontale, this.color).tikz() + '\n'
    if (mesureOn && texteACote === '') code += texteParPoint(mesure, M, 'milieu', this.color).tikz() + '\n'
    if (texteACote !== '') code += texteParPoint(texteACote, M, 'milieu', this.color, tailleTexte).tikz() + '\n'
    code += arcangle.tikzml(amp)
    return code
  }
}

/**
   * Code un angle
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} O Sommet de l'angle
   * @param {number|Point} angle Mesure de l'angle ou nom d'un point sur l'autre côté de l'angle
   * @param {number} [taille=0.8] Taille de l'angle
   * @param {string} [mark=''] Marque sur l'angle
   * @param {string} [color='black'] Couleur de l'angle : du type 'blue' ou du type '#f15929'
   * @param {number} [epaisseur=1] Epaisseur du tracé de l'angle
   * @param {number} [opacite=1] Opacité de la couleur du tracé de l'angle
   * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
   * @param {number} [opaciteDeRemplissage=0.2] Opacité de la couleur de remplissage de l'angle
   * @param {boolean} [mesureOn=false] Affichage de la mesure de l'angle
   * @param {boolean} [noAngleDroit=false] Pour choisir si on veut que l'angle droit soit marqué par un carré ou pas
   * @param {string} [texteACote=''] Pour mettre un texte à côté de l'angle à la place de la mesure de l'angle
   * @param {number} [tailleTexte=1] Pour choisir la taille du texte à côté de l'angle
   * @example codageAngle(H,K,30)
   * // Code l'angle de centre K, avec H sur un côté de l'angle et avec 30° comme mesure d'angle orienté,
   * // en noir, avec une épaisseur de 1, une opacité de 100 %, un rayon d'arc de 0,8, sans autre option.
   * @example codageAngle(H,K,G)
   * // Code l'angle HKG, en noir, avec une épaisseur de 1, une opacité de 100 %, un rayon d'arc de 0,8, sans autre option.
   * @example codageAngle(H,K,G,2,'x','red',0.5,0.2,'blue',0.8,true,true)
   * // Code l'angle HKG, en rouge, avec une épaisseur de 0.5 et une opacité de 20 %, rempli en bleu avec une opacité de 80 %
   * // avec un arc de cercle de rayon 2, avec une marque 'x' sur l'angle, en affichant la mesure de l'angle et sans faire apparaître d'angle droit le cas échéant.
   * @example codageAngle(H,K,G,2,'x','red',0.5,0.2,'blue',0.8,true,true,'?',2)
   * // Code l'angle HKG, en rouge, avec une épaisseur de 0.5 et une opacité de 20 %, rempli en bleu avec une opacité de 80 %
   * // avec un arc de cercle de rayon 2, avec une marque 'x' sur l'angle, en affichant le texte '?' d'une taille de 2 et sans faire apparaître d'angle droit le cas échéant.
   * @author Jean-Claude Lhote
   * @return {CodageAngle|CodageAngleDroit}
   */
// JSDOC Validee par EE Juin 2022
export function codageAngle (A, O, angle, taille = 0.8, mark = '', color = 'black', epaisseur = 1, opacite = 1, couleurDeRemplissage = 'none', opaciteDeRemplissage = 0.2, mesureOn = false, noAngleDroit = false, texteACote = '', tailleTexte = 1) {
  if (typeof (angle) !== 'number') {
    angle = angleOriente(A, O, angle)
  }
  if ((angle === 90 || angle === -90) && !noAngleDroit) {
    return new CodageAngleDroit(A, O, rotation(A, O, angle), color, taille, epaisseur, opacite, couleurDeRemplissage, opaciteDeRemplissage)
  } else return new CodageAngle(A, O, angle, taille, mark, color, epaisseur, opacite, couleurDeRemplissage, opaciteDeRemplissage, mesureOn, texteACote, tailleTexte)
}

function NomAngleParPosition (nom, x, y, color, s) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  objets.push(texteParPosition(nom, x, y, 'milieu', color, 1, 'middle', true))
  const s1 = segment(x - 0.6, y + 0.4 - s / 10, x + 0.1, y + 0.4 + s / 10, color)
  const s2 = segment(x + 0.1, y + 0.4 + s / 10, x + 0.8, y + 0.4 - s / 10, color)
  objets.push(s1, s2)
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
export function nomAngleSaillantParPosition (nom, x, y, color) {
  return new NomAngleParPosition(nom, x, y, color, 1)
}
export function nomAngleRentrantParPosition (nom, x, y, color) {
  return new NomAngleParPosition(nom, x, y, color, -1)
}
