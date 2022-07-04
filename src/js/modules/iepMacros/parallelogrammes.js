/**
 ************************************************
 ************** PARALLELOGRAMMES ****************
 ************************************************
 */

import { translation2Points, longueur, pointSurSegment, similitude, pointAdistance, droite, homothetie } from '../2d.js'

/**
   * Trace un parallélogramme à partir de la donnée de 3 sommets consécutifs
   * @param {point} A
   * @param {point} B
   * @param {point} C
   * @param {string} nomD
   * @param {boolean} description
   * @param {boolean} csDejaTraces À true (par défaut), les 2 côtés seront faits immédiatement, sinon, on les tracera à la règle.
   */
export function parallelogramme3sommetsConsecutifs (A, B, C, nomD = '', description = true, csDejaTraces = true) {
  const D = translation2Points(C, B, A)
  D.nom = nomD
  const xMin = Math.min(A.x, B.x, C.x, D.x)
  const yMin = Math.min(A.y, B.y, C.y, D.y)
  // const xMax = Math.max(A.x, B.x, C.x, D.x)
  // const yMax = Math.max(A.y, B.y, C.y, D.y)
  this.traitRapide(A, B)
  this.traitRapide(B, C)
  this.pointCreer(A, A.nom, 0)
  this.pointCreer(B, B.nom, 0)
  this.pointCreer(C, C.nom, 0)
  this.textePosition(`${A.nom + B.nom + C.nom + D.nom} est un parallélogramme donc ses côtés opposés sont de même longueur.`, xMin - 1, yMin - 1)
  this.compasEcarter2Points(B, A)
  this.textePosition(`${B.nom + A.nom} = ${C.nom + D.nom}`, xMin - 1, yMin - 2)
  this.compasTracerArcCentrePoint(C, D)
  this.compasEcarter2Points(B, C)
  this.textePosition(`${B.nom + C.nom} = ${A.nom + D.nom}`, xMin - 1, yMin - 3)
  this.compasTracerArcCentrePoint(A, D, 10)
  this.pointCreer(D)
  this.compasMasquer()
  this.regleSegment(C, D)
  this.regleSegment(D, A)
  this.regleMasquer()
  this.crayonMasquer()
  this.segmentCodage(A, B, { codage: '///', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(D, C, { codage: '///', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(B, C, { codage: '//', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(A, D, { codage: '//', couleur: this.couleurCodage, tempo: 0 })
}
/**
     * Trace le parallélogramme ABCD de centre O à partir de [AB] et O.
     * @param {point} A
     * @param {point} B
     * @param {point} O
     * @param {string} nomC
     * @param {string} nomD
     * @param {boolean} description
     */
export function parallelogramme2sommetsConsecutifsCentre (A, B, O, nomC = '', nomD = '', description = true) {
  const C = translation2Points(O, A, O)
  C.nom = nomC
  const D = translation2Points(O, B, O)
  D.nom = nomD
  const nom = A.nom + B.nom + C.nom + D.nom
  if (longueur(A, C) > 12 || longueur(B, D) > 12) {
    this.regleModifierLongueur(30)
  }
  const xMin = Math.min(A.x, B.x, C.x, D.x)
  const yMin = Math.min(A.y, B.y, C.y, D.y)
  // const xMax = Math.max(A.x, B.x, C.x, D.x)
  // const yMax = Math.max(A.y, B.y, C.y, D.y)
  this.traitRapide(A, B)
  this.pointCreer(A, { tempo: 0 })
  this.pointCreer(B, { tempo: 0 })
  this.pointCreer(O, { tempo: 0 })
  if (description && nom.length === 4) {
    this.textePosition(`${A.nom + B.nom + C.nom + D.nom} est un parallélogramme donc ses diagonales se coupent en leur milieu.`, xMin - 1, yMin - 1)
  }
  this.pointilles = 5
  this.epaisseur = 1
  this.couleur = this.couleurTraitsDeConstruction
  this.regleDemiDroiteOriginePoint(A, O, { longueur: longueur(A, C) + 3 })
  this.regleMasquer()
  this.crayonMasquer()
  this.compasEcarter2Points(A, O)
  if (description && nom.length === 4) {
    this.textePosition(`${A.nom + O.nom} = ${O.nom + C.nom}`, xMin - 1, yMin - 2)
  }
  this.pointilles = false
  this.compasTracerArcCentrePoint(O, C)
  this.compasMasquer()
  this.pointilles = 5
  this.regleDemiDroiteOriginePoint(B, O, { longueur: longueur(B, D) + 3 })
  this.regleMasquer()
  this.crayonMasquer()
  this.pointilles = false
  this.compasEcarter2Points(B, O)
  if (description && nom.length === 4) {
    this.textePosition(`${B.nom + O.nom} = ${O.nom + D.nom}`, xMin - 1, yMin - 3)
  }
  this.compasTracerArcCentrePoint(O, D)
  this.compasMasquer()
  this.couleur = 'blue'
  this.epaisseur = 3
  this.pointCreer(D)
  this.regleSegment(A, D)
  this.regleSegment(D, C)
  this.regleSegment(C, B)
  this.regleMasquer()
  this.compasMasquer()
  this.crayonMasquer()
  this.segmentCodage(A, O, { codage: '//', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(O, C, { codage: '//', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(B, O, { codage: 'O', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(O, D, { codage: 'O', couleur: this.couleurCodage, tempo: 0 })
}
/**
     * Trace la parallélogramme ABCD de centre O en partant de [AD), [AB) et O (mais sans voir la position de B et D au départ)
     * @param {point} D
     * @param {point} A
     * @param {point} B
     * @param {point} O
     */
export function parallelogrammeAngleCentre (D, A, B, O) {
  const B1 = pointSurSegment(A, B, longueur(A, B) + 2)
  const D1 = pointSurSegment(A, D, longueur(A, D) + 2)
  const C = translation2Points(B, A, D)
  this.traitRapide(A, B1)
  this.traitRapide(A, D1)
  this.pointCreer(O, { tempo: 0 })
  this.pointCreer(A, { tempo: 0 })
  this.regleDemiDroiteOriginePoint(A, O, { couleur: this.couleurTraitsDeConstruction, epaisseur: 1, pointilles: 5 })
  this.pointilles = false
  this.regleMasquer()
  this.crayonMasquer()
  this.compasEcarter2Points(A, O)
  this.compasTracerArcCentrePoint(O, C, { couleur: this.couleurTraitsDeConstruction })
  this.compasMasquer()
  this.paralleleRegleEquerre2points3epoint(B1, A, C, { couleur: this.couleurTraitsDeConstruction, epaisseur: 1 })
  this.equerreMasquer()
  this.regleDroite(C, D, { couleur: this.couleurTraitsDeConstruction, epaisseur: 1 })
  this.paralleleRegleEquerre2points3epoint(A, D1, C, { couleur: this.couleurTraitsDeConstruction, epaisseur: 1 })
  this.equerreMasquer()
  this.regleDroite(C, B, { couleur: this.couleurTraitsDeConstruction, epaisseur: 1 })
  this.pointCreer(D, { tempo: 0 })
  this.pointCreer(B, { tempo: 0 })
  this.pointCreer(C, { tempo: 0 })
  this.regleSegment(B, C)
  this.regleSegment(C, D)
  this.regleMasquer()
  this.crayonMasquer()
}
/**
     * Macro pour placer le point M sur un segment [AB] tel que AM = n/d AB
     * @param {point} A
     * @param {point} B
     * @param {int} n numérateur
     * @param {int} d dénominateur
     * @param {object} options { distance: 1, monAngle: 40, nom: '', nommerGraduations: false }
     * @returns M
     */
export function partageSegment (A, B, n, d, { distance = 1, monAngle = 40, nom = '', nommerGraduations = false } = {}) {
  this.traitRapide(A, B)
  this.regleMasquerGraduations()
  this.regleMontrer(A)
  const y = similitude(B, A, monAngle, (Math.max(n, d) + 1) * distance / longueur(A, B))
  this.regleSegment(A, y)
  this.regleMasquer()
  this.crayonMasquer()
  const Ax = [A]
  for (let i = 1; i <= Math.max(n, d); i++) {
    Ax.push(pointAdistance(A, distance * i, monAngle + droite(A, B).angleAvecHorizontale))
    this.compasTracerArcCentrePoint(Ax[i - 1], Ax[i])
    if (nommerGraduations) this.pointCreer(Ax[i], { label: A.nom + '_' + i, dx: -1, dy: 0.5 })
  }
  this.compasMasquer()
  this.regleSegment(Ax[d], B)
  this.regleMasquer()
  this.crayonMasquer()
  const m = this.paralleleAuCompas(Ax[d], B, Ax[n])
  const M = homothetie(B, A, n / d)
  if (m.y > M.y) this.regleProlongerSegment(m, M, { longueur: 1 })
  this.regleSegment(A, M, { couleur: 'red', epaisseur: 3 })
  if (nom) this.pointCreer(M, { label: nom })
  this.regleMasquer()
  this.crayonMasquer()
  return M
}
