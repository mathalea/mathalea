import exerciceComparerDeuxFractions from '../../5e/5N14.js'
export { interactifReady, interactifType, amcType, amcReady } from '../../5e/5N14.js'
export const titre = 'Comprarer deux fractions (dénominateurs multiples)'
export const dateDePublication = '04/11/2022'

/*!
 * @author Remi Angot repris par Gilles Mora pour une question can
 * Créé le 04/01/2022
 * Référence can6C43
 */
export default function ExerciceComparerDeuxFractionsCAN (max = 11) {
  exerciceComparerDeuxFractions.call(this)
  this.nbQuestions = 1
  this.can = true
}
