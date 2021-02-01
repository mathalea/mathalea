import Signe_produit_quotient_relatifs from './4C10-0.js'
/**
 * Signe du produit de relatifs
 * 4C10-1 fils de 4C10-0
 * @author Sébastien Lozano
 */
export default function Signe_produit_relatifs() {
  Signe_produit_quotient_relatifs.call(this);
  this.beta = ``;// ici this.beta peut prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug
  this.exo = this.beta + `4C10-1`;
  this.sup = 4;
  this.titre = `Signe d'un produit de nombres relatifs`;
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    4,
    "1 : deux facteurs\n2 : trois facteurs\n3 : quatre facteurs\n4 : Mélange",
  ];
}

