import ExerciceEquationASolutionEntiere from '../4e/4L20-0.js'

export { interactifReady, interactifType, amcReady, amcType, titre } from '../4e/4L20-0.js'

/**
 * Équation du premier degré
 * * Type 1 : x+a=b ou ax=b
 * * Type 2 : ax+b=c
 * * Type 3 : ax+b=cx+d
 * * Tous les types
 * @author Rémi Angot
 * 4L20 et 3L13
 */
export default function EquationPremierDegreSolutionsEntieres () {
  ExerciceEquationASolutionEntiere.call(this) // Héritage de la classe Exercice()

  this.sup = true // Avec des nombres relatifs
  this.sup2 = 4 // Choix du type d'équation
  this.nbQuestions = 6
  this.tailleDiaporama = 3
}
