import Pavages_et_transformations from './_Pavages_et_transformations.js'

export const titre = 'Trouver l’image d’une figure par une symétrie axiale dans un pavage carré'

/**
 * Exercice en html seulement. Symétrie axiale dans un pavage.
 * @Auteur Jean-Claude Lhote
 * référence 6G25-2
 */
export default function Pavages_et_symetries() {
  Pavages_et_transformations.call(this);
  this.titre = titre;
  this.sup = 1;
  this.besoin_formulaire_numerique = false;
}
