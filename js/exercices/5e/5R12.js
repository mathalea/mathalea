import Reperage_point_du_plan from './5R12-2.js'
/**
 * Lire les coordonnées d'un point du quart de plan positif avec une précision allant de l'unité à 0,25.
 * @Auteur Jean-Claude Lhote
 * référence 5R12
 */
export default function Reperage_point_du_quart_de_plan() {
  Reperage_point_du_plan.call(this);
  this.titre = "Déterminer les coordonnées (positives) d'un point";
  this.quart_de_plan = true;
}
