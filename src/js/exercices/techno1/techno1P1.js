import EcritureFractionnaire from '../5e/5N11-3.js'
export const titre = 'Écriture fractionnaire, écriture décimale, pourcentage'
export const dateDePublication = '19/06/2022'
export { interactifReady, interactifType } from '../5e/5N11-3.js'

/**
 * Clone de 5N11-3 pour les 1er
 * @author Rémi Angot
 */

export const uuid = 'c988f'
export const ref = 'techno1P1'
export default class EcritureFractionnaire1T extends EcritureFractionnaire {
  constructor () {
    super()
    this.sup = 1
  }
}
