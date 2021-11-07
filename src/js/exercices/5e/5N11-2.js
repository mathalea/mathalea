import TableauxEtPourcentages from './_Tableaux_et_pourcentages.js'

export const titre = 'Tableaux et pourcentages - pourcentage constant'

/**
 * * Tableaux et pourcentages prix constant
 * * numéro de l'exo ex : 5N11-2 fils de 5N11-pere
 * * publication initiale le 28/11/2020
 * @author Sébastien Lozano
 */
export default function TableauxEtPourcentagesPourcentConstant () {
  this.exo = '5N11-2'
  this.titre = titre
  TableauxEtPourcentages.call(this)
};
