/** @module horaires */

import { sp } from './contextSensitif'

/**
* @author Rémi Angot
* @Example
* //0h24 est accepté
*/
export function minToHoraire (minutes) {
  let nbHour = parseInt(minutes / 60)
  if (nbHour > 23) {
    nbHour = nbHour - 24
  }
  const nbminuteRestante = (minutes % 60)
  if (nbminuteRestante > 9) {
    return (nbHour + sp() + 'h' + sp() + nbminuteRestante)
  } else {
    return (nbHour + sp() + ' h' + sp() + '0' + nbminuteRestante)
  }
}

/**
  * @author Rémi Angot
  * @Example
  * //on écrira 24 minutes plutôt que 0h24
  */
export function minToHour (minutes) {
  let nbHour = parseInt(minutes / 60)
  if (nbHour > 23) {
    nbHour = nbHour - 24
  }
  const nbminuteRestante = (minutes % 60)
  if (nbHour === 0) {
    return (nbminuteRestante + sp() + 'min')
  } else {
    if (nbminuteRestante > 9) {
      return (nbHour + sp() + 'h' + sp() + nbminuteRestante)
    } else {
      return (nbHour + sp() + ' h' + sp() + '0' + nbminuteRestante)
    }
  }
}

/**
   * Renvoie un tableau de deux valeurs : le nombre d'heures dans un paquet de minutes ainsi que le nombre de minutes restantes.
  * @author Eric Elter
  * @example minToHeuresMinutes (127) renvoie [2,7] car 127min = 2h7min
  * @example minToHeuresMinutes (300) renvoie [5,0] car 300min = 6h
  * @example minToHeuresMinutes (1456) renvoie [24,16] car 1456min = 24h16min
  *
  */
export function minToHeuresMinutes (minutes) {
  return [parseInt(minutes / 60), (minutes % 60)]
}
