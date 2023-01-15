import { choice } from '../../modules/outils.js'
import Transformations from '../6e/_Transformations.js'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Transformations.js'
export const titre = 'Trouver l\'image d\'un point par une homothétie ou une rotation'
export const dateDeModifImportante = '15/01/2023' //  Par EE

/**
 * Transformations : trouver un point numéroté par une homothétie ou une rotation
 * @author Jean-Claude Lhote
 * référence 3G10-2
 */

export const uuid = 'd5f34'
export const ref = '3G10-2'
export default function Transformations3e () {
  Transformations.call(this)
  this.sup = choice(['5-6-9', '5-6-10', '5-9-10', '6-9-10'])
  this.titre = titre
}
