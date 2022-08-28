import MultiplierDecimauxPar101001000 from '../6e/6C30-1.js'
export const titre = 'Multiplier un nombre entier (ou décimal) par 10, 100 ou 1 000'
export const amcReady = true
export const amcType = 'AMCNum' // Question numérique
export const interactifReady = true
export const interactifType = 'mathLive'

// Gestion de la date de publication initiale
export const dateDePublication = '12/12/2021'

/**
 * @author Eric Elter
 * Référence c3C10-3
 * Date décembre 2021
 */
export const uuid = 'f92e1'
export const ref = 'c3C10-3'
export default function MultiplierDecimauxPar101001000CM () {
  MultiplierDecimauxPar101001000.call(this)
  this.titre = titre
  this.sup = 1 // Par défaut, pas de fractions
  this.sup3 = false // Peu importe ici, car pas de décimaux par défaut
  this.sup4 = true // Par défaut, que des entiers
}
