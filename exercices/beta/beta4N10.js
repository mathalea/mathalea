import Arrondir_une_valeur from '/Exercices/6e/6N31-3.js'
/**
 *
 * référence ?
 */
export default function Arrondir_une_valeur_4e() {
  Arrondir_une_valeur.call(this);
  this.sup = 3;
  this.titre = "Arrondir une valeur numérique";
  this.besoin_formulaire_numerique = ['Type de nombre', 3, `1 : Nombre décimal\n 2 : Fraction\n 3 : Racine carrée`];
}
