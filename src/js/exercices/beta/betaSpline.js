import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { repere } from '../../modules/2d/reperes.js'
import { courbe } from '../../modules/2d/courbes.js'
import { splineCatmullRom } from '../../modules/fonctionsMaths.js'
export const titre = 'Nom de l\'exercice'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
 * Date de publication
*/
export default function BetaModeleSpline () {
  Exercice.call(this) // Héritage de la classe Exercice()

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const r = repere({ xMin: -5, xMax: 5, yMin: -5, yMax: 5, xUnite: 2, yUnite: 2 })

    const tabY = [1, 0, -0, -2, 0, 1, 2, 1, 0, 1, -1] // Voici les ordonnées successives par lesquelles passera la courbe à partir de x0, puis x0 + step, ...
    const f = splineCatmullRom({ tabY: tabY, x0: -5, step: 1 }) // le tableau des ordonnées successives = tabY, x0 = -5, step = 1.
    const F = x => f.image(x) // On crée une fonction de x f.image(x) est une fonction polynomiale par morceaux utilisée dans courbeSpline()
    // const c = courbeSpline(f, { repere: r, step: 0.1 }) // Une première façon de tracer la courbe.
    const c2 = courbe(F, { repere: r, step: 0.1, color: 'red' }) // F peut ainsi être utilisée dans courbe.

    this.contenu = mathalea2d({ xmin: -15, xmax: 15, ymin: -10, ymax: 10 }, r, c2)
    for (let i = 0; i < tabY.length; i++) {
      this.contenu += `(${-5 + i};${tabY[i]}), `
    }
  }
}
