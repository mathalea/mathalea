import { nombreAvecEspace, randint } from '../outils.js'
import { cercle, droite, droiteParPointEtPerpendiculaire, homothetie, longueur, point, pointAdistance, pointIntersectionDD, pointIntersectionLC, pointSurSegment, rotation, triangle2points2longueurs } from '../2d.js'

/**
   * Macro de construction d'un triangle à partir de ses 3 dimensions. Le premier point aura pour coordonnées (6,0).
   * @param {string} ABC Une chaine de caractère de 3 lettre
   * @param {*} AB Distance entre le 1er et le 2e sommet
   * @param {*} AC Distance entre le 1er et le 3e sommet
   * @param {*} BC Distance entre le 2e et le 3e sommet
   * @param {boolean} description Affichage d'un texte descriptif des étapes de la construction
   * @return {array} [A, B, C] les 3 sommets du triangle (objets MathALEA2D)
   */
export const triangle3longueurs = function (ABC, AB, AC, BC, description = true) {
  const A = point(6, 0)
  const B = pointAdistance(A, AB, randint(-20, 20))
  const p = triangle2points2longueurs(A, B, AC, BC)
  const C = p.listePoints[2]
  if (ABC.length !== 3) {
    description = false
  } else {
    A.nom = ABC[0]
    B.nom = ABC[1]
    C.nom = ABC[2]
  }

  if (description) this.textePosition(`${A.nom + B.nom} = ${nombreAvecEspace(AB)} cm`, 0, -2)
  this.pointCreer(A)
  // this.regleRotation(droite(A,B).angleAvecHorizontale)
  // this.regleMontrer(A)
  this.regleSegment(A, B)
  this.pointCreer(B)
  this.crayonMasquer()
  if (description) this.textePosition(`${A.nom + C.nom} = ${nombreAvecEspace(AC)} cm donc ${C.nom} appartient au cercle de centre ${A.nom} et de rayon ${nombreAvecEspace(AC)} cm.`, 0, -3)
  this.couleur = 'forestgreen'
  this.epaisseur = 2
  this.compasMontrer(A)
  this.compasEcarterAvecRegle(AC)
  this.compasTracerArcCentrePoint(A, C, 40)
  if (description) this.textePosition(`${B.nom + C.nom} = ${nombreAvecEspace(BC)} cm donc ${C.nom} appartient au cercle de centre ${B.nom} et de rayon ${nombreAvecEspace(BC)} cm.`, 0, -4)
  this.compasDeplacer(B)
  this.compasEcarterAvecRegle(BC)
  this.compasTracerArcCentrePoint(B, C)
  this.compasMasquer()
  this.couleur = 'blue'
  this.epaisseur = 3
  if (description) this.textePosition(`Le point ${C.nom} est à une intersection des deux cercles.`, 0, -5)
  this.pointCreer(C)
  this.regleSegment(B, C)
  this.regleSegment(C, A)
  this.crayonMasquer()
  this.regleMasquer()
  return [A, B, C]
}
/**
     * Macro de construction d'un triangle rectangle (l'angle droit est le 2e point dans l'ordre du nom)
     *  à partir de la donnée de la longueur d'un côté et de la longueur de l'hypoténuse.
     *  Le premier sommet aura pour coordonnées (6, 0)
     * @param {string} ABC Une chaine de caractère de 3 lettre
     * @param {*} AB Distance entre le 1er et le 2e sommet
     * @param {*} AC Distance entre le 1er et le 3e sommet (hypoténuse)
     * @param {boolean} description Affichage d'un texte descriptif des étapes de la construction
     * @return {array} [A, B, C] les 3 sommets du triangle (objets MathALEA2D)
     */
export const triangleRectangleCoteHypotenuse = function (ABC, AB, AC, description = true) { // Triangle rectangle en B
  const A = point(6, 0)
  const B = pointAdistance(A, AB, randint(-20, 20))
  const dAB = droite(A, B)
  dAB.isVisible = false
  const dBC = droiteParPointEtPerpendiculaire(B, dAB)
  dBC.isVisible = false
  const cAC = cercle(A, AC)
  cAC.isVisible = false
  const C = pointIntersectionLC(dBC, cAC)
  const c = homothetie(C, B, 1.2)
  if (ABC.length !== 3) {
    description = false
  } else {
    A.nom = ABC[0]
    B.nom = ABC[1]
    C.nom = ABC[2]
  }

  if (longueur(A, C) > 8) this.equerreZoom(150)
  if (description) this.textePosition(`${A.nom + B.nom} = ${nombreAvecEspace(AB)} cm`, 0, -2)
  this.equerreRotation(dAB.angleAvecHorizontale)
  this.pointCreer(A)
  this.regleSegment(A, B)
  this.pointCreer(B)
  if (description) this.textePosition(`${A.nom + B.nom + C.nom} est un triangle rectangle en ${B.nom} donc ${C.nom} appartient à la perpendiculaire à (${A.nom + B.nom}) passant par ${B.nom}.`, 0, -3)
  this.equerreMontrer(A)
  this.equerreDeplacer(B)
  this.tracer(c)
  this.equerreMasquer()
  this.codageAngleDroit(A, B, C)
  this.crayonMasquer()
  if (description) this.textePosition(`${A.nom + C.nom} = ${nombreAvecEspace(AC)} cm donc ${C.nom} appartient au cercle de centre ${A.nom} et de rayon ${nombreAvecEspace(AC)} cm.`, 0, -4)
  this.compasMontrer(A)
  this.compasEcarterAvecRegle(AC)
  this.couleur = 'forestgreen'
  this.epaisseur = 2
  this.compasTracerArcCentrePoint(A, C)
  this.couleur = 'blue'
  this.epaisseur = 2
  if (description) this.textePosition(`${C.nom} est à une intersection de la perpendiculaire et du cercle.`, 0, -5)
  this.crayonMontrer(C)
  this.pointCreer(C)
  this.compasMasquer()
  this.regleSegment(A, C)
  this.regleMasquer()
  this.crayonMasquer()
  return [A, B, C]
}

/**
     * Macro de construction d'un triangle rectangle (l'angle droit est le 2e point dans l'ordre du nom)
     *  à partir de la donnée de la longueur des deux côtés de l'angle droit.
     *  Le premier sommet aura pour coordonnées (6, 0)
     * @param {string} ABC Une chaine de caractère de 3 lettre
     * @param {*} AB Distance entre le 1er et le 2e sommet
     * @param {*} AC Distance entre le 1er et le 3e sommet (hypoténuse)
     * @param {boolean} description Affichage d'un texte descriptif des étapes de la construction
     * @return {array} [A, B, C] les 3 sommets du triangle (objets MathALEA2D)
     */
export const triangleRectangle2Cotes = function (ABC, AB, BC, description = true) { // Triangle rectangle en B
  const A = point(6, 0)
  const B = pointAdistance(A, AB, randint(-20, 20))
  const dAB = droite(A, B)
  dAB.isVisible = false
  const dBC = droiteParPointEtPerpendiculaire(B, dAB)
  dBC.isVisible = false
  const cBC = cercle(B, BC)
  cBC.isVisible = false
  const C = pointIntersectionLC(dBC, cBC)
  const c = homothetie(C, B, 1.2)
  if (ABC.length !== 3) {
    description = false
  } else {
    A.nom = ABC[0]
    B.nom = ABC[1]
    C.nom = ABC[2]
  }

  if (longueur(A, C) > 8) this.equerreZoom(150)
  if (description) this.textePosition(`${A.nom + B.nom} = ${nombreAvecEspace(AB)} cm`, 0, -2)
  this.equerreRotation(dAB.angleAvecHorizontale)
  this.pointCreer(A)
  this.regleSegment(A, B)
  this.pointCreer(B)
  if (description) this.textePosition(`${A.nom + B.nom + C.nom} est un triangle rectangle en ${B.nom} donc ${C.nom} appartient à la perpendiculaire à (${A.nom + B.nom}) passant par ${B.nom}.`, 0, -3)
  this.equerreMontrer(A)
  this.equerreDeplacer(B)
  this.tracer(c)
  this.equerreMasquer()
  this.codageAngleDroit(A, B, C)
  if (description) this.textePosition(`${B.nom + C.nom} = ${nombreAvecEspace(BC)} cm donc ${C.nom} est à ${nombreAvecEspace(BC)} cm de ${B.nom} sur la perpendiculaire à (${A.nom + B.nom}) passant par ${B.nom}.`, 0, -4)
  this.regleMontrer(B)
  this.regleRotation(C)
  this.crayonDeplacer(C)
  this.pointCreer(C)
  this.couleur = 'blue'
  this.epaisseur = 2
  this.compasMasquer()
  this.regleSegment(A, C)
  this.regleMasquer()
  this.crayonMasquer()

  return [A, B, C]
}
/**
     * Macro de construction d'un triangle à partir d'une longueur et des 2 angles adajcents au côté connu. Le premier point aura pour coordonnées (6,0).
     * @param {string} ABC Une chaine de caractère de 3 lettre
     * @param {*} AB Distance entre le 1er et le 2e sommet
     * @param {*} BAC Angle au 1er sommet
     * @param {*} CBA Angle au 2e sommet
     * @param {boolean} description Affichage d'un texte descriptif des étapes de la construction
     * @return {array} [A, B, C] les 3 sommets du triangle (objets MathALEA2D)
     */
export const triangle1longueur2angles = function (NOM, AB, BAC, CBA, description = true, mesure = false) {
  const angle = randint(-20, 20)
  const a1 = BAC
  const a2 = CBA
  const A = point(6, 0)
  const B = pointAdistance(A, AB, angle)
  const D = pointAdistance(A, 5.2, a1 + angle)
  const D2 = pointSurSegment(A, D, 10)
  const D1 = pointSurSegment(D, D2, 0.4)
  const E = pointAdistance(B, 3, 180 - a2 + angle)
  const E2 = pointSurSegment(B, E, 10)
  const E1 = pointSurSegment(E, E2, -0.4)
  const F = pointAdistance(B, 5.2, 180 - a2 + angle)
  const F1 = pointSurSegment(F, E2, 0.4)
  const d = rotation(droite(A, B), A, a1)
  D.isVisible = false
  const d2 = rotation(droite(B, A), B, -a2)
  d2.isVisible = false
  const C = pointIntersectionDD(d, d2)
  if (NOM.length !== 3) {
    description = false
  } else {
    A.nom = NOM[0]
    B.nom = NOM[1]
    C.nom = NOM[2]
  }
  this.couleur = 'blue'
  this.epaisseur = 3
  this.pointCreer(A)
  if (description) this.textePosition(`On trace le côté [${A.nom + B.nom}] de ${nombreAvecEspace(AB)} cm.`, 0, -4)
  this.regleSegment(A, B)
  this.pointCreer(B)
  this.couleur = 'grey'
  this.epaisseur = 1
  this.rapporteurMontrer(A)
  this.rapporteurDeplacer(A)
  this.rapporteurRotation(angle)
  if (description) this.textePosition(`On place un repère à ${a1} degrés pour tracer la demi-droite [${A.nom + C.nom}).`, 0, -5)
  this.epaisseur = 3
  this.trait(D, D1, 20)
  this.epaisseur = 1
  this.rapporteurMasquer()
  this.regleSegment(A, D2)
  this.regleMasquer()
  this.angleCodage(B, A, C)
  this.rapporteurMontrer(A)
  this.rapporteurDeplacer(B)
  if (description) this.textePosition(`On place un repère à ${a2} degrés pour tracer la demi-droite [${B.nom + C.nom}).`, 0, -6)
  this.epaisseur = 3
  this.trait(E, E1, 10)
  this.trait(F, F1, 20)
  this.epaisseur = 1
  this.rapporteurMasquer()
  this.regleMontrer(B)
  this.regleSegment(B, E2)
  this.angleCodage(C, B, A)
  this.pointCreer(C)
  // this.pointNommer(C, C.nom, -0.5, 1)
  this.couleur = 'blue'
  this.epaisseur = 3
  this.regleSegment(B, C)
  this.regleSegment(C, A)
  this.regleMasquer()
  this.crayonMasquer()
  if (description && mesure) this.textePosition(`On peut mesurer ${A.nom + C.nom} ≈ ${nombreAvecEspace(longueur(A, C, 1))} cm et ${B.nom + C.nom} ≈ ${nombreAvecEspace(longueur(B, C, 1))} cm.`, 0, -7)

  return [A, B, C]
}
/**
     * Macro de construction d'un triangle à partir des longueurs des deux côtés d'un angle Le premier point a pour coordonnées (6,0).
     * @param {string} ABC Une chaine de caractère de 3 lettre
     * @param {*} AB Distance entre le 1er et le 2e sommet
     * @param {*} AC Distance entre le 1er et le 3e sommet
     * @param {*} BAC Angle au 1er sommet
     * @param {boolean} description Affichage d'un texte descriptif des étapes de la construction
     * @return {array} [A, B, C] les 3 sommets du triangle (objets MathALEA2D)
     */
export const triangle2longueurs1angle = function (NOM, AB, AC, BAC, description = true, mesure = false) {
  const angle = randint(-20, 20)
  const a1 = BAC
  const A = point(6, 0)
  const B = pointAdistance(A, AB, angle)
  const D = pointAdistance(A, 5.2, a1 + angle)
  const D2 = pointSurSegment(A, D, 10)
  const D1 = pointSurSegment(D, D2, 0.4)
  const C = pointSurSegment(A, D2, AC)
  if (NOM.length !== 3) {
    description = false
  } else {
    A.nom = NOM[0]
    B.nom = NOM[1]
    C.nom = NOM[2]
  }
  this.couleur = 'blue'
  this.epaisseur = 3
  this.pointCreer(A)
  if (description) this.textePosition(`On trace le côté [${A.nom + B.nom}] de ${nombreAvecEspace(AB)} cm.`, 0, -4)
  this.regleSegment(A, B)
  this.pointCreer(B)
  this.couleur = 'grey'
  this.epaisseur = 1
  this.rapporteurMontrer(A)
  this.rapporteurDeplacer(A)
  this.rapporteurRotation(angle)
  if (description) this.textePosition(`On place un repère à ${a1} degrés pour tracer la demi-droite [${A.nom + C.nom}).`, 0, -5)
  this.epaisseur = 3
  this.trait(D, D1, 20)
  this.epaisseur = 1
  this.rapporteurMasquer()
  this.regleSegment(A, D2)
  this.angleCodage(B, A, C)
  this.rapporteurMasquer()
  if (description) this.textePosition(`On place le point ${C.nom} sur la demi-droite [${A.nom + C.nom}) à ${AC} cm de ${A.nom}.`, 0, -6)
  this.epaisseur = 3
  this.couleur = 'blue'
  this.crayonDeplacer(C)
  this.pointCreer(C)
  this.regleSegment(A, C)
  this.crayonMasquer()
  if (description) this.textePosition(`On trace le côté [${B.nom + C.nom}].`, 0, -7)
  this.regleMontrer(C)
  this.crayonMontrer(C)
  this.regleSegment(C, B)
  this.regleMasquer()
  this.crayonMasquer()
  return [A, B, C]
}

/**
     * Trace un triangle équilatéral à partir de la donnée de 2 points
     * @param {point} A
     * @param {point} B
     * @param {string} nomC
     * @return {array} [A, B, C]
     */
export const triangleEquilateral2Sommets = function (A, B, nomC = '') {
  const C = rotation(B, A, 60)
  C.nom = nomC
  this.traitRapide(A, B)
  this.pointCreer(A, A.nom, 0)
  this.pointCreer(B, B.nom, 0)
  this.compasEcarter2Points(A, B)
  this.compasTracerArcCentrePoint(A, C)
  this.compasTracerArcCentrePoint(B, C)
  this.pointCreer(C)
  this.compasMasquer()
  this.regleSegment(A, C)
  this.regleSegment(C, B)
  this.regleMasquer()
  this.crayonMasquer()
  this.segmentCodage(A, B)
  this.segmentCodage(A, C)
  this.segmentCodage(B, C)
  return [A, B, C]
}
/**
     * Trace un triangle équilatéral à partir de la donnée de la longueur du côté. Le premier point a pour coordonnées (6;0)
     * @param {string} NOM
     * @param {number} AB
     * @return {array} [A, B, C]
     */

export const triangleEquilateral = function (NOM, AB) {
  const A = point(6, 0)
  const B = pointAdistance(A, AB, randint(-20, 20))
  const C = rotation(B, A, 60)
  if (NOM.length === 3) {
    A.nom = NOM[0]
    B.nom = NOM[1]
    C.nom = NOM[2]
  }
  this.regleSegment(A, B)
  this.pointCreer(A)
  this.pointCreer(B)
  this.compasEcarter2Points(A, B)
  this.compasTracerArcCentrePoint(A, C)
  this.compasTracerArcCentrePoint(B, C)
  this.pointCreer(C)
  this.compasMasquer()
  this.regleSegment(A, C)
  this.regleSegment(C, B)
  this.regleMasquer()
  this.crayonMasquer()
  this.segmentCodage(A, B)
  this.segmentCodage(A, C)
  this.segmentCodage(B, C)
  return [A, B, C]
}
