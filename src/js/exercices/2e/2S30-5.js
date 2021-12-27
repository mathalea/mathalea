import CalculProbaExperience2Epreuves3e from '../3e/3S21.js'
export { dateDePublication, interactifReady, interactifType, amcType, amcReady } from '../3e/3S21.js'

/**
 * * Calcul de probabilités
 * * variante de 3S21 avec des urnes déséquilibrées
 * * Réf : 2S30-5
 * * publié le  28/12/2021
 * @author Jean-Claude Lhote
 */

export const titre = 'Expérience aléatoire à deux épreuves'

export default function identitesCalculs2e () {
  CalculProbaExperience2Epreuves3e.call(this)
  this.tailleDiaporama = 2
  this.niveau = 2
  this.sup = true
  this.sup2 = true
}
