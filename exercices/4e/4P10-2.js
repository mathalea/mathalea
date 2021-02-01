import Eq_resolvantes_Thales from '../3e/3L13-2.js'
/** 
 * * Quatrieme proportionnelle dans un tableau du type 
 * ---------
 * | x | b |
 * ---------
 * | a | c |
 * --------- 
 * * numéro de l'exo ex : 4P10-2 fils de 3L13-2
 * * publication initiale le 15/12/2020
 * * modification le 11/01/2021
 * @author Sébastien Lozano
 */

export default function Tableaux_et_quatrieme_proportionnelle() {
  Eq_resolvantes_Thales.call(this);
  this.exo = `4P10-2`;
  this.titre = "Déterminer une quatrième proportionnelle dans un tableau";
  this.consigne = `Déterminer la quatrième proportionnelle dans les tableaux suivants.`;
  this.sup=1
};
