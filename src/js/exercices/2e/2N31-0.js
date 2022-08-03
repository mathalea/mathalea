import PuissanceDunNombre from '../4e/4C35.ts'
export const titre = 'Puissances : écriture décimale ou fractionnaire'
export const dateDePublication = '14/06/2022'
export { interactifReady, interactifType } from '../4e/4C35.ts'

/**
 * Clone de 4C35 pour les 2nde
 * @author Rémi Angot
 */

export default class PuissanceDunNombre2e extends PuissanceDunNombre {
  constructor () {
    super()
    this.sup = true
  }
}
