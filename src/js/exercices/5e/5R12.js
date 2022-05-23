import ReperagePointDuPlan from './5R12-2.js'
export const titre = 'Déterminer les coordonnées (positives) d\'un point'

/**
 * Lire les coordonnées d'un point du quart de plan positif avec une précision allant de l'unité à 0,25.
 * @author Jean-Claude Lhote
 * référence 5R12
 */
export default function ReperagePointDuQuartDePlan () {
  ReperagePointDuPlan.call(this)
  this.titre = titre
  this.quartDePlan = true
}
