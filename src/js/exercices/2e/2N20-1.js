import ListeDesDiviseurs5e from '../5e/5A10.js'
export const titre = 'Écrire la liste de tous les diviseurs d’un entier'
export { interactifReady, interactifType } from '../5e/5A10.js'
export const dateDeModifImportante = '28/10/2021'
/**
 * Clone de 5A10 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */
export default function ListeDesDiviseurs2nde () {
  ListeDesDiviseurs5e.call(this)
  this.sup = '3-3-3'
  this.sup2 = '8-10-12'
  this.sup3 = 12
}
