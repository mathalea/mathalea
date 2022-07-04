import Exercice from '../../4e/4C37.js'
export { interactifReady, interactifType } from '../../4e/4C37.js'
export const titre = 'Déterminer le signe d’une puissance'

export const dateDePublication = '04/07/2022'

/*!
 * @author Delphine David (reprise de 4C37)
 */
export default class SignePuissance extends Exercice {
  constructor () {
    super()
    this.consigne = 'Déterminer le signe de l’expression :'
    this.nbQuestions = 1
    this.can = true
  }
}
