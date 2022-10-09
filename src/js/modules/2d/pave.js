/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%% 3D EN PERSPECTIVE CAVALIERES %%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import { ObjetMathalea2D } from '../2dGeneralites'
import { afficheCoteSegment } from './codages'
import { point } from './point'
import { pointAdistance } from './pointsur'
import { polygone } from './polygone'
import { segment } from './segment'
import { translation } from './transformations'
import { vecteur } from './vecteur'

/**
 *
 * @param {int} Longueur
 * @param {int} largeur
 * @param {int} profondeur
 *
 */
function Pave (L = 10, l = 5, h = 5, origine = point(0, 0), cote = true, angleDeFuite = 30, coefficientDeFuite = 0.5) {
  ObjetMathalea2D().call(this, { })
  const objets = []
  const A = origine; const B = point(A.x + L, A.y); const C = point(B.x, B.y + l); const D = point(A.x, A.y + l)
  const p = polygone(A, B, C, D)
  const E = pointAdistance(A, h * coefficientDeFuite, angleDeFuite)
  const F = translation(B, vecteur(A, E))
  const G = translation(C, vecteur(A, E))
  const H = translation(D, vecteur(A, E))
  const sAE = segment(A, E)
  const sBF = segment(B, F)
  const sCG = segment(C, G)
  const sDH = segment(D, H)
  const sEF = segment(E, F)
  const sFG = segment(F, G)
  const sGH = segment(G, H)
  const sHE = segment(H, E)
  sAE.pointilles = 5
  sEF.pointilles = 5
  sHE.pointilles = 5

  objets.push(p, sAE, sBF, sCG, sDH, sEF, sFG, sGH, sHE)
  if (cote) {
    objets.push(afficheCoteSegment(segment(B, A), '', 1))
    objets.push(afficheCoteSegment(segment(A, D), '', 1))
    objets.push(afficheCoteSegment(segment(F, B), h + ' cm', 1))
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      objet.color = this.color
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

export function pave (...args) {
  return new Pave(...args)
}
