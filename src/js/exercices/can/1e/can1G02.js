import CosEtsin from '../../1e/1G10.js'
export { interactifReady, interactifType } from '../../1e/1G10.js'
export const titre = 'Déterminer les valeurs remarquables du cosinus et sinus*'

export const dateDePublication = '01/06/2022'

/*!
 * @author Stéphane et cie
 */
export default function CosEtsinsCAN () {
  CosEtsin.call(this)
  this.nbQuestions = 1
  this.can = true
  this.sup = '3'
}
