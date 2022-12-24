import ExerciceDevelopper from '../3e/3L11.js'

/**
 * Développer en utilisant la distributivité simple
 * refactoring : héritage de 3L11 pour éviter de dupliquer le code
 * @author Rémi Angot
 * 4L10 et 3L11
 */
export const uuid = '71dd8'
export const ref = '4L10'
export const titre = 'Utiliser la simple distributivité'
export default function ExerciceDevelopper4e () {
  ExerciceDevelopper.call(this)
  this.sup = 3 // difficulté
  this.sup2 = 1 // consigne
  this.sup3 = 7 // forme de développement
}
