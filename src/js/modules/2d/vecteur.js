/** @module vecteur */

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES VECTEURS %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import { ObjetMathalea2D } from '../2dGeneralites'
import { milieu } from './barycentre'
import { point } from './point'
import { segment } from './segment'
import { texteParPosition } from './textes'
import { rotation, similitude, translation } from './transformations'

/**
 * v = vecteur('V') // son nom
 * v = vecteur(x,y) // ses composantes
 * v = vecteur(A,B) // son origine et son extrémité (deux Points)
 * v = vecteur(x,y,'v') // son nom et ses composantes.
 * v.representant(E,'blue') // Dessine le vecteur v issu de E, en bleu.
 * Commenter toutes les méthodes possibles
 * @author Jean-Claude Lhote et Rémi Angot
 */
export function Vecteur (arg1, arg2, nom = '') {
  ObjetMathalea2D.call(this, { })
  if (arguments.length === 1) {
    this.nom = arg1
  } else {
    if (typeof arg1 === 'number') {
      this.x = arg1
      this.y = arg2
    } else {
      this.x = arg2.x - arg1.x
      this.y = arg2.y - arg1.y
    }
    this.nom = nom
  }
  this.norme = function () {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
  this.oppose = function () {
    this.x = -this.x
    this.y = -this.y
  }
  this.xSVG = function (coeff) {
    return this.x * coeff
  }
  this.ySVG = function (coeff) {
    return -this.y * coeff
  }
  this.representant = function (A, color = 'black') {
    const B = point(A.x + this.x, A.y + this.y)
    const s = segment(A, B, color, '|->')
    return s
  }
  this.representantNomme = function (A, nom, taille = 1, color = 'black') {
    let s, angle, v
    const B = point(A.x + this.x, A.y + this.y)
    const M = milieu(A, B)
    s = segment(A, B, color)
    angle = s.angleAvecHorizontale
    v = similitude(this, A, 90, 0.5 / this.norme())
    if (Math.abs(angle) > 90) {
      s = segment(B, A, color)
      angle = s.angleAvecHorizontale
      v = similitude(this, A, -90, 0.5 / this.norme())
    }
    const N = translation(M, v)
    return nomVecteurParPosition(nom, N.x, N.y, taille, 0, color)
  }
}
/**
   * @example v = vecteur('V') // son nom
   * @example v = vecteur(x,y) // ses composantes
   * @example v = vecteur(A,B) // son origine et son extrémité (deux Points)
   * @example v = vecteur(x,y,'v') // son nom et ses composantes.
   * @author Jean-Claude Lhote et Rémi Angot
   */
export function vecteur (arg1, arg2, nom = '') {
  return new Vecteur(arg1, arg2, nom)
}
/**
   * @author Jean-Claude Lhote le 31/01/2021
   * crée un nom de vecteur avec sa petite flèche
   * l'angle formé par avec l'horizontale est à donner comme argument, par défaut c'est 0
   * la taille impactera le nom et la flèche en proportion.
   * (x,y) sont les coordonnées du centre du nom.
   */
function NomVecteurParPosition (nom, x, y, taille = 1, angle = 0, color = 'black') {
  ObjetMathalea2D.call(this, { })
  this.nom = nom
  this.x = x
  this.y = y
  this.color = color
  this.angle = angle
  this.taille = taille
  const objets = []
  const t = texteParPosition(this.nom, this.x, this.y, -this.angle, this.color, this.taille, 'middle', true)
  const M = point(this.x, this.y)
  const P = point(M.x + 0.25 * this.nom.length, M.y)
  const M0 = similitude(P, M, 90 + this.angle, 2 / this.nom.length)
  const M1 = rotation(translation(M0, vecteur(P, M)), M0, this.angle)
  const M2 = rotation(M1, M0, 180)
  const s = segment(M1, M2, this.color)
  s.styleExtremites = '->'
  s.tailleExtremites = 3
  objets.push(t, s)
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
export function nomVecteurParPosition (nom, x, y, taille = 1, angle = 0, color = 'black') {
  return new NomVecteurParPosition(nom, x, y, taille, angle, color)
}
