export const titre = 'Fractions égales et égalité des produits en croix 4e'

// eslint-disable-next-line import/first
import EqResolvantesThales from '../5e/5N14-3.js'
export { amcReady, amcType } from '../5e/5N14-3.js'
export { interactifReady, interactifType } from '../5e/5N14-3.js'

export const dateDePublication = '24/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Clone de 5N14-3 pour les 4e
 * 5N14-3 sort du niveau 5e
 * @author Sébastien Lozano
 */

export const uuid = '7f2be'
export const ref = '4C20-2'
export default function EqResolvantesThales4e () {
  EqResolvantesThales.call(this)
  this.niveau = '4e'
}
