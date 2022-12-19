import TracerQuadrilatèresParticuliers from './6G13.js'

export const titre = 'Tracer des carrés et rectangles et auto-vérification'
export const dateDePublication = '19/12/2022'

/**
 * Tracer des des carrés et rectangles et auto-vérification
 *
 * @author Mickael Guironnet
 */

export default class ConstruireCarréOuRectangles extends TracerQuadrilatèresParticuliers {
  constructor () {
    super()
    this.titre = titre
    this.sup = 9
    this.nbQuestions = 6
  }
}
