/*
  MathALEA2D
 @name      pointEquidistant.js
 @author    Loïc Geeraerts
 @license   MIT License - CC-BY-SA
 @homepage  À faire
 */
import { longueur, point, milieu, rotation, pointSurSegment } from '../2d'
import Alea2iep from '../Alea2iep'

const anim = new Alea2iep()

const A = point(4, 1, 'A')
anim.pointCreer(A, { dx: -1, tempo: 0 })
anim.pointMasquer(A)

const B = point(8, 0, 'B')
anim.pointCreer(B, { dx: 1, dy: 1, tempo: 0 })
anim.pointMasquer(B)
// Je ne donne pas de références à ce segment car je ne m'en sers pas après
anim.traitRapide(A, B)

// pointEquidistant(A, B)
// pointEquidistant(A, B, -4)
pointEquidistant(A, B, -5)
pointEquidistant(A, B, longueur(A, B) / 2) // bug car trop long

export default function pointEquidistant (point1, point2, distance = 3, options = { longueurArc1: 5, longueurArc2: 8 }) {
  const O = milieu(point1, point2)
  const A1 = rotation(point1, O, Math.sign(distance) * -90)
  // const k = Math.sign(distance) * Math.sqrt(distance ** 2 - longueur(point1, O))
  const k = Math.sqrt(distance ** 2 - longueur(point1, O))
  const result = pointSurSegment(O, A1, k) // Point équidistant
  //* **************** Début traçage ************
  // Je ne donne pas de références aux arcs car je ne m'en sers pas après
  anim.compasMontrer()
  anim.compasDeplacer(point1)
  anim.compasEcarter(longueur(point1, result))
  anim.compasTracerArcCentrePoint(point1, result, { delta: options.longueurArc1 })
  anim.compasTracerArcCentrePoint(point2, result, { delta: options.longueurArc2 })
  anim.compasMasquer()
  //* **************** Fin traçage ************

  return result
}