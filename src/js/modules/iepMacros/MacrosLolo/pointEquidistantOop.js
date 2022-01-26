/*
  MathALEA2D
 @name      pointEquidistantOop.js
 @author    Loïc Geeraerts
 @license   MIT License - CC-BY-SA
 @homepage  À faire
 */
import { longueur, milieu, rotation, pointSurSegment, point } from '../2d'
// import Alea2iep from '../../js/modules/Alea2iep'
import * as anim from '../Alea2iep'

export class PointEquidistant {
  constructor (point1, point2, distance = 3, options = { longueurArc1: 5, longueurArc2: 8 }) {
    this.point1 = point1
    this.point2 = point2
    this.arc1 = null
    this.arc2 = null
    this.options = options
    this.visibilite = false
    const O = milieu(point1, point2)
    const A1 = rotation(point1, O, Math.sign(distance) * -90)
    // const k = Math.sign(distance) * Math.sqrt(distance ** 2 - longueur(point1, O))
    const k = Math.sqrt(distance ** 2 - longueur(point1, O))
    const result = pointSurSegment(O, A1, k) // Point équidistant
    return result
  }

  afficher () {
    anim.pointCreer(this, { dx: 1, dy: 1, tempo: 0 })
  }

  cacher () {
    anim.pointMasquer(this) // Le point disparait mais le nom reste
  }

  afficherNom () {
    // On pourrait faire aussi monPoint.nom.cacher() avec un objet Nom et faire hériter PointEquidistant de Nom.
    // Il faudra aller voir le code source de point pour ne pas réinventer la roue.

  }

  cacherNom () {

  }

  tracerArcs () {
    //* **************** Début traçage ***********
    anim.compasMontrer()
    anim.compasDeplacer(this.point1)
    anim.compasEcarter(longueur(this.point1, this))
    this.arc1 = anim.compasTracerArcCentrePoint(this.point1, this, { delta: this.options.longueurArc1 })
    this.arc1 = anim.compasTracerArcCentrePoint(this.point2, this, { delta: this.options.longueurArc2 })
    anim.compasMasquer()
    //* **************** Fin traçage ************
  }

  cacherArcs () {
    anim.traitMasquer(this.arc1)
    anim.traitMasquer(this.arc2)
  }
}

const monPoint = new PointEquidistant(point(4, 1, 'A'), point(6, 2, 'B'))
monPoint.tracerArcs()

console.log('lolo')

