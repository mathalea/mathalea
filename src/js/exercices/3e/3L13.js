import ExerciceEquation1 from '../4e/4L20.js'
export { interactifReady, interactifType, amcReady, amcType, titre } from '../4e/4L20.js'

/**
 * Équation du premier degré
 * * Type 1 : x+a=b ou ax=b
 * * Type 2 : ax+b=c
 * * Type 3 : ax+b=cx+d
 * * Tous les types
 * @author Rémi Angot
 * 4L20 et 3L13
 */
export const uuid = 'f239f'
export const ref = '3L13'
export default function ExerciceEquation3e () {
  ExerciceEquation1.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.sup2 = 4
  this.tailleDiaporama = 3
}
