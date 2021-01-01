import Ecrire_nombres_entiers from '../6e/6N10.js'
/**
 * Lire un nombre / écrire un nombre : passer d'une écriture à une autre et inversement
 * On peut fixer la classe maximale : unités, miliers, millions, milliards
 * @Auteur Jean-Claude Lhote
 * Référence 6N10
 */
export default function Ecrire_entiers_cycle3() {
    Ecrire_nombres_entiers.call(this);
  this.titre= "Écrire un nombre en chiffres ou en lettres";
  this.sup2=0;
  this.sup = 1;
}

