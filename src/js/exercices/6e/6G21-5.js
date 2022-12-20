import TracerQuadrilatèresParticuliers from './6G13.js'

export const titre = 'Tracer des quadrilatères particuliers et auto-vérification'
export const dateDePublication = '19/12/2022'

/**
 * Tracer des quadrilatères particuliers et auto-vérification
 *
 * @author Mickael Guironnet
 */

export default class ConstruireUnLosangeOuParallélogrammes extends TracerQuadrilatèresParticuliers {
  constructor () {
    super()
    this.titre = titre
    this.sup = 11
    this.nbQuestions = 10
  }
}
