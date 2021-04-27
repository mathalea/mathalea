import Arrondir_une_valeur from '../6e/6N31-3.js'
/**
 * Arrondir une racine carrée
 * @Auteur Mireille Gain, 13 avril 2021
 * référence 4G20-5
 */

export default function Arrondir_une_valeur_4e() {
  Arrondir_une_valeur.call(this);
  this.titre = "Trouver la valeur arrondie d'une racine carrée";
  this.sup = 3;
  this.sup2 = true;
  this.besoin_formulaire_numerique = ['Type de nombre', 3, `1 : Nombre décimal\n 2 : Fraction\n 3 : Racine carrée`];
}
