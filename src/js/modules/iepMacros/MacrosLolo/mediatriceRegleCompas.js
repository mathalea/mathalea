/*
  MathALEA2D
 @name      mediatriceRegleCompas.js
 @author    Loïc Geeraerts
 @license   MIT License - CC-BY-SA
 @homepage  À faire
 */



// anim.vitesse = 200
// anim.tempo = 0

export default function mediatrice (point1, point2, distance1 = 3, distance2 = 5) {
  const M = pointEquidistant(point1, point2, distance1)
  const N = pointEquidistant(point1, point2, distance2)

  anim.regleMasquerGraduations()
  // Je ne donne pas de référence à la droite car je ne m'en sers pas après
  anim.regleDroite(M, N, { couleur: 'noir' })
  anim.regleMasquer()
}
