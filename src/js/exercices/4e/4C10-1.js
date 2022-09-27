import SigneProduitQuotientRelatifs from './4C10-0.js'

export const titre = 'Signe d\'un produit de nombres relatifs'
export { interactifReady, interactifType, amcReady, amcType } from './4C10-0.js'

/**
 * Signe du produit de relatifs
 * 4C10-1 fils de 4C10-0
 * @author Sébastien Lozano
 */
export const uuid = '4fd42'
export const ref = '4C10-1'
export default function SigneProduitRelatifs () {
  SigneProduitQuotientRelatifs.call(this)
  this.beta = ''// ici this.beta peut prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug
  this.exo = this.beta + '4C10-1'
  this.sup = 4
  this.nbQuestions = 3
  this.titre = titre
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    4,
    '1 : 2 facteurs\n2 : 3 facteurs\n3 : 4 facteurs\n4 : Mélange'
  ]
}
