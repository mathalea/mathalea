import ProblemesEnEquation from '../3e/3L13-3.js'
export const titre = 'Mettre un problème en équation et le résoudre'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3L13-3.js'

export const dateDePublication = '04/04/2022'
export const dateDeModifImportante = '05/04/2023'

/**
 * @author Guillaume Valmont
 * reference 4L13-2
 */
export const uuid = '5ca1e'
export const ref = '4L13-2'
export default class ProblemesEnEquation4e extends ProblemesEnEquation {
  constructor () {
    super()
    this.titre = titre
    this.sup = '1-2-3-4-5-6-7-8-9'
  }
}
