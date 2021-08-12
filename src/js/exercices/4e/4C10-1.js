import SigneProduitQuotientRelatifs from './4C10-0.js'

export const titre = 'Signe d’un produit de nombres relatifs'

/**
 * Signe du produit de relatifs
 * 4C10-1 fils de 4C10-0
 * @author Sébastien Lozano
 */
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
    '1 : Deux facteurs\n2 : Trois facteurs\n3 : Quatre facteurs\n4 : Mélange'
  ]
}
