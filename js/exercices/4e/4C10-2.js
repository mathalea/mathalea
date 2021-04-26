import Signe_produit_quotient_relatifs from './4C10-0.js'
/**
 * Signe du produit de relatifs
 * 4C10-2 fils de 4C10-0
 * @author Sébastien Lozano
 */
export default function Signe_quotient_relatifs() {
  Signe_produit_quotient_relatifs.call(this);
  this.titre = `Signe d'un quotient de nombres relatifs`;
  this.beta = ``;// ici this.beta peut prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug
  this.exo = this.beta + `4C10-2`;
  this.sup = 5;
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    5,
    "1 : quotient de deux nombres\n2 : quotient d'un nombre sur un produit de deux facteurs\n3 : quotient d'un produit de deux factueurs sur un nombre\n4 : Quotient de deux produits de deux facteurs\n5 : Mélange",
  ];
}

