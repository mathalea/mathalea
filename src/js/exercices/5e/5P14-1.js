import ExercicePourcentage from '../2e/2S10-2.js'
export const titre = 'Appliquer un pourcentage'
export { interactifReady, interactifType, amcReady, amcType } from '../2e/2S10-2.js'

export const dateDePublication = '04/04/2022'

export const ref = '5P14-1'
export const uuid = '542be'
export default class ExercicePourcentage5e extends ExercicePourcentage {
  constructor () {
    super()
    this.titre = titre
    this.sup = 1
    this.besoinFormulaireNumerique = false
  }
}