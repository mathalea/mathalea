import ExercicePourcentage from '../2e/2S10-2.js'
export const titre = 'Exprimer une proportion sous la forme d\'un pourcentage'
export { interactifReady, interactifType, amcReady, amcType } from '../2e/2S10-2.js'

export const dateDePublication = '04/04/2022'

export const ref = '5P14'
export const uuid = '4db23'
export default class ExercicePourcentage5e extends ExercicePourcentage {
  constructor () {
    super()
    this.titre = titre
    this.sup = 2
    this.besoinFormulaireNumerique = false
  }
}