import EqResolvantesThales from '../3e/3L13-2.js'
export const titre = 'Déterminer une quatrième proportionnelle dans un tableau'

export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModificationImportante = '04/04/2022'
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

export const uuid = 'a6b5b'
export const ref = '4P10-2'
export default function TableauxEtQuatriemeProportionnelle () {
  EqResolvantesThales.call(this)
  this.exo = '4P10-2'
  this.titre = titre
  this.consigne = 'Déterminer la quatrième proportionnelle dans les tableaux suivants.'
  this.sup = 1
};
