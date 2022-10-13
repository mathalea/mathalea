/** @module point */

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%% LES POINTS %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import earcut from 'earcut'
import { longueur, polygone, polygoneToFlatArray, vecteur } from '../2d'
import { ObjetMathalea2D } from '../2dGeneralites'
import { egal, inferieurouegal, superieurouegal } from '../outils'
import { Cercle } from './cercle'
import { DemiDroite } from './demiDroite'
import { Droite } from './droites'
import { Segment } from './segment'

/**
 * A = point('A') //son nom
 * A = point(x,y) //ses coordonnées
 * A = point(x,y,'A') //ses coordonnées et son nom
 * A = point(x,y,'A',below') //ses coordonnées,son nom et la position de son label
 * @author Rémi Angot
 * @class
 */
export function Point (arg1, arg2, arg3, positionLabel = 'above') {
  ObjetMathalea2D.call(this, { classe: false })
  this.typeObjet = 'point'
  if (arguments.length === 1) {
    this.nom = arg1
  } else if (arguments.length === 2) {
    if (isNaN(arg1) || isNaN(arg2)) window.notify('Point : les coordonnées ne sont pas valides', { arg1, arg2 })
    this.x = arg1
    this.y = arg2
  } else {
    if (isNaN(arg1) || isNaN(arg2)) window.notify('Point : les coordonnées ne sont pas valides', { arg1, arg2 })
    this.x = arg1
    this.y = arg2
    this.nom = arg3
  }
  this.positionLabel = positionLabel
  this.bordures = [this.x, this.y, this.x, this.y]
  this.xSVG = function (coeff) {
    return this.x * coeff
  }
  this.ySVG = function (coeff) {
    return -this.y * coeff
  }
  if (!this.nom) {
    this.nom = ' ' // Le nom d'un point est par défaut un espace
    // On pourra chercher tous les objets qui ont ce nom pour les nommer automatiquement
  }

  /**
     * Teste l'appartenance d'un point à tout type de polygone (non convexe ou convexe). Pour info, la fonction utilise une triangulation du polygone réalisée par la librairie earcut Copyright (c) 2016, Mapbox.
     * @memberof Point
     * @param {Polygone} p Polygone dont on veut tester l'appartenance avec le point
     * @example M.estDansPolygone(p1) // Renvoie true si M appartient au polygone p1, false sinon
     * @author Jean-Claude Lhote
     * @return {boolean}
     */
  // JSDOC Validee par EE Aout 2022
  this.estDansPolygone = function (p) {
    const listeTriangles = earcut(polygoneToFlatArray(p))
    for (let i = 0; i < listeTriangles.length; i += 3) {
      if (this.estDansTriangle(p.listePoints[listeTriangles[i]], p.listePoints[listeTriangles[i + 1]], p.listePoints[listeTriangles[i + 2]])) return true
    }
    return false
  }

  /**
     * Teste l'appartenance d'un point dans un triangle
     * @memberof Point
     * @param {Point} A Premier sommet du triangle
     * @param {Point} B Deuxième sommet du triangle
     * @param {Point} C Troisième sommet du triangle
     * @example M.estDansTriangle(V, S, T) // Renvoie true si M appartient au triangle VST, false sinon
     * @author Eric Elter
     * @return {boolean}
     */
  // JSDOC Validee par EE Aout 2022
  this.estDansTriangle = function (A, B, C) {
    const vMA = vecteur(this, A)
    const vMB = vecteur(this, B)
    const vMC = vecteur(this, C)
    const x1 = vMB.x * vMC.y - vMB.y * vMC.x
    const x2 = vMC.x * vMA.y - vMC.y * vMA.x
    const x3 = vMA.x * vMB.y - vMA.y * vMB.x
    return (superieurouegal(x1, 0) && superieurouegal(x2, 0) && superieurouegal(x3, 0)) || (inferieurouegal(x1, 0) && inferieurouegal(x2, 0) && inferieurouegal(x3, 0))
  }

  /**
     * Teste l'appartenance d'un point à un polygone convexe
     * @memberof Point
     * @param {Polygone} p Polygone dont on veut tester l'appartenance avec le point
     * @example M.estDansPolygoneConvexe(p1) // Renvoie true si M appartient au polygone convexe p1, false sinon
     * @author Jean-Claude Lhote
     * @return {boolean}
     */
  // JSDOC Validee par EE Aout 2022
  this.estDansPolygoneConvexe = function (p) {
    const l = p.listePoints.length
    if (l === 3) {
      return this.estDansTriangle(...p.listePoints)
    } else {
      const A = p.listePoints[0]
      const B = p.listePoints[1]
      const C = p.listePoints[l - 1]
      const p2 = polygone(...p.listePoints.slice(1))
      if (this.estDansTriangle(A, B, C)) return true
      else return this.estDansPolygoneConvexe(p2)
    }
  }

  /**
     * Teste l'appartenance d'un point dans un quadrilatère
     * @memberof Point
     * @param {Point} A Premier sommet du quadrilatère
     * @param {Point} B Deuxième sommet du quadrilatère
     * @param {Point} C Troisième sommet du quadrilatère
     * @param {Point} D Quatrième sommet du quadrilatère
     * @example M.estDansQuadrilatere(F, G, H, I) // Renvoie true si M appartient au quadrilatère FGHI, false sinon
     * @author Eric Elter
     * @return {boolean}
     */
  // JSDOC Validee par EE Aout 2022
  this.estDansQuadrilatere = function (A, B, C, D) {
    return this.estDansTriangle(A, B, C) || this.estDansTriangle(A, C, D)
  }

  /**
     * Teste l'appartenance d'un point sur un segment, un cercle, une droite ou une demi-droite
     * @memberof Point
     * @param {Segment | Cercle | Droite | DemiDroite} objet Objet géométrique dont on veut tester si le point en fait partie
     * @example M.estSur(s) // Renvoie true si M appartient au segment s (au préalablement défini), false sinon
     * @return {boolean}
     */
  // JSDOC Validee par EE Aout 2022
  this.estSur = function (objet) {
    if (objet instanceof Droite) return (egal(objet.a * this.x + objet.b * this.y + objet.c, 0, 0.000001))
    if (objet instanceof Segment) {
      const prodvect = (objet.extremite2.x - objet.extremite1.x) * (this.y - objet.extremite1.y) - (this.x - objet.extremite1.x) * (objet.extremite2.y - objet.extremite1.y)
      const prodscal = (this.x - objet.extremite1.x) * (objet.extremite2.x - objet.extremite1.x) + (this.y - objet.extremite1.y) * (objet.extremite2.y - objet.extremite1.y)
      const prodscalABAB = (objet.extremite2.x - objet.extremite1.x) ** 2 + (objet.extremite2.y - objet.extremite1.y) ** 2
      return (egal(prodvect, 0, 0.00001) && superieurouegal(prodscal, 0) && inferieurouegal(prodscal, prodscalABAB))
    }
    if (objet instanceof DemiDroite) {
      const OM = vecteur(objet.extremite1, this)
      const vd = vecteur(objet.extremite1, objet.extremite2)
      const prodscal = OM.x * vd.x + OM.y * vd.y
      const prodvect = OM.x * vd.y - OM.y * vd.x
      return (egal(prodvect, 0, 0.000001) && superieurouegal(prodscal, 0, 0.000001))
    }
    if (objet instanceof Cercle) return egal(longueur(this, objet.centre), objet.rayon, 0.000001)
  }
}
/**
   * Crée un objet Point ayant les propriétés suivantes :
   * @param {number} x abscisse
   * @param {number} y ordonnée
   * @param {string} A son nom qui apparaîtra
   * @param {string} positionLabel Les possibilités sont : 'left', 'right', 'below', 'above', 'above right', 'above left', 'below right', 'below left'. Si on se trompe dans l'orthographe, ce sera 'above left' et si on ne précise rien, pour un point ce sera 'above'.
   * @return {Point}
   */
export function point (x, y, A, positionLabel = 'above') {
  return new Point(x, y, A, positionLabel)
}
