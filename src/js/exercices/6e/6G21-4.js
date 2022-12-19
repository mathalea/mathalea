import TracerQuadrilatèresParticuliers from './6G13.js'

export const titre = 'Tracer des losanges ou des parallélogrammes et auto-vérification'
export const dateDePublication = '19/12/2022'

/**
 * Tracer des losanges ou des parallélogrammes et auto-vérification
 *
 * @author Mickael Guironnet
 */

export default class ConstruireLosangesOuParallélogrammes extends TracerQuadrilatèresParticuliers {
  constructor () {
    super()
    this.titre = titre
    this.sup = 10
    this.nbQuestions = 6
  }
}
