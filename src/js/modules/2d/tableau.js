import { ObjetMathalea2D } from '../2dGeneralites'
import { context } from '../context'
import { milieu } from './barycentre'
import { point } from './point'
import { polygone } from './polygone'
import { polyline } from './polyline'
import { segment } from './segment'
import { latexParCoordonnees, texteParPoint, texteParPosition } from './textes'

function flecheH (D, A, texte, h = 1) {
  const D1 = point(D.x, D.y + h)
  const A1 = point(A.x, A.y + h)
  const fleche = polyline(D, D1, A1)
  const eFleche = segment(A1, A)
  eFleche.styleExtremites = '->'
  const M = milieu(D1, A1)
  const objets = [fleche, eFleche]
  let t
  if (texte) {
    if (h > 0) {
      t = texteParPosition('$' + texte + '$', M.x, M.y + 0.5)
    } else {
      t = texteParPosition('$' + texte + '$', M.x, M.y - 0.8)
    }
    objets.push(t)
  }
  return objets
}

function flecheV (D, A, texte, h = 1) {
  const D1 = point(D.x + h, D.y)
  const A1 = point(A.x + h, A.y)
  const fleche = polyline(D, D1, A1)
  const eFleche = segment(A1, A)
  eFleche.styleExtremites = '->'
  const M = milieu(D1, A1)
  const objets = [fleche, eFleche]
  if (texte) {
    objets.push(texteParPoint(texte, point(M.x + h, M.y - 0.6), 'milieu', 'black', 'middle', true))
  }
  return objets
}

/**
   * Réalise un tableau typique des exercices de proportionnalité avec d'éventuelles flèches
   *
   * @author Rémi Angot
   */
function Tableau ({
  largeurTitre = 7,
  largeur = 3,
  hauteur = 2,
  nbColonnes = 3,
  origine = point(0, 0),
  ligne1 = [],
  ligne2 = [],
  flecheHaut = [], // [[1, 2, '\\times 6,4', 3], [2, 3, '\\div 6']]
  flecheBas = [],
  flecheDroite = false, // à remplacer par un string
  flecheDroiteSens = 'bas'
} = {}) {
  ObjetMathalea2D.call(this, { })
  if (ligne1 && ligne2) {
    nbColonnes = Math.max(ligne1.length, ligne2.length, nbColonnes)
  }
  const A = origine
  const B = point(A.x + largeurTitre + largeur * (nbColonnes - 1), A.y)
  const C = point(B.x, B.y + 2 * hauteur)
  const D = point(A.x, A.y + 2 * hauteur)
  // ABCD est le cadre extérieur (A en bas à gauche et B en bas à droite)
  const objets = []
  objets.push(polygone(A, B, C, D))
  objets.push(segment(point(A.x, A.y + hauteur), point(B.x, B.y + hauteur)))
  // trait horizontal au milieu
  let x = A.x + largeurTitre
  // x est l'abscisse de la première séparation verticale
  // Ecrit le texte dans les colonnes
  for (let i = 0; i < nbColonnes; i++) {
    objets.push(segment(point(x, A.y), point(x, C.y)))
    if (ligne1[i + 1]) objets.push(latexParCoordonnees(ligne1[i + 1], x + largeur / 2, A.y + 1.4 * hauteur))
    if (ligne2[i + 1]) objets.push(latexParCoordonnees(ligne2[i + 1], x + largeur / 2, A.y + 0.4 * hauteur))
    x += largeur
  }
  // Ecrit les titres
  if (ligne1[0]) {
    if (context.isHtml) {
      objets.push(latexParCoordonnees(ligne1[0], A.x + largeurTitre / 4, A.y + 1.4 * hauteur))
    } else {
      objets.push(latexParCoordonnees(ligne1[0], A.x + largeurTitre / 2, A.y + 1.4 * hauteur))// sortie LaTeX
    };
  }
  if (ligne2[0]) {
    if (context.isHtml) {
      objets.push(latexParCoordonnees(ligne2[0], A.x + largeurTitre / 4, A.y + 0.4 * hauteur))
    } else {
      objets.push(latexParCoordonnees(ligne2[0], A.x + largeurTitre / 2, A.y + 0.4 * hauteur))// sortie LaTeX
    };
  }
  for (const fleche of flecheHaut) {
    const Depart = point(A.x + largeurTitre + fleche[0] * largeur - 0.4 * largeur, A.y + 2.1 * hauteur)
    const Arrivee = point(A.x + largeurTitre + fleche[1] * largeur - 0.6 * largeur, A.y + 2.1 * hauteur)
    if (fleche[3]) {
      objets.push(...flecheH(Depart, Arrivee, fleche[2], fleche[3]))
    } else {
      objets.push(...flecheH(Depart, Arrivee, fleche[2]))
    }
  }
  for (const fleche of flecheBas) {
    const Depart = point(A.x + largeurTitre + fleche[0] * largeur - 0.4 * largeur, A.y - 0.1 * hauteur)
    const Arrivee = point(A.x + largeurTitre + fleche[1] * largeur - 0.6 * largeur, A.y - 0.1 * hauteur)
    let hFleche
    if (fleche[3]) {
      hFleche = -Math.abs(fleche[3])
    } else {
      hFleche = -1
    }
    objets.push(...flecheH(Depart, Arrivee, fleche[2], hFleche))
  }
  if (flecheDroite) {
    const Depart = point(A.x + largeurTitre + (nbColonnes - 1) * largeur + 0.2, A.y + 1.5 * hauteur)
    const Arrivee = point(A.x + largeurTitre + (nbColonnes - 1) * largeur + 0.2, A.y + 0.5 * hauteur)
    if (flecheDroiteSens === 'bas') {
      objets.push(...flecheV(Depart, Arrivee, flecheDroite))
    } else {
      objets.push(...flecheV(Arrivee, Depart, flecheDroite))
    }
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

export function tableau (...args) {
  return new Tableau(...args)
}
