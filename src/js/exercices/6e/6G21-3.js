import ConstruireUnTriangle from './6G21.js'

export const titre = 'Construire un triangle particulier avec les instruments et auto-vérification'
export const dateDePublication = '17/12/2022'

/**
 * Construire un triangle quelconque avec les instruments et auto-vérification
 *
 * @author Mickael Guironnet
 */
export const uuid = 'e1e64'
export const ref = '6G21-3'
export default class ConstruireUnTriangleParticulier extends ConstruireUnTriangle {
  constructor () {
    super()
    this.titre = titre
    this.sup = 9
    this.nbQuestions = 6
  }
}
