import Exercice from '../Exercice.js'
import { splineCatmullRom } from '../../modules/fonctionsMaths.js'
import { courbeSpline, mathalea2d, repere2 } from '../../modules/2d.js'
import { arrondi } from '../../modules/outils.js'
export const titre = 'Nom de l\'exercice'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
 * Date de publication
*/
export default function NomExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    // const listeNoeuds = []
    // for (let i = -5; i < 5; i += 0.5) {
    //  listeNoeuds.push([i, Math.sin(i) / (6 + i)])
    // }
    //   const listeNoeuds = [[-5, 1], [0, 0], [5, 1]]
    const tabY = [1, 0, -2, 0, 2, 1, 0, -2, 1, 1, 0]
    const r = repere2({ xMin: -4, xMax: 4, yMin: -5, yMax: 5, xUnite: 3 })
    const f = splineCatmullRom(tabY, -5, 1)
    const c = courbeSpline(f, { repere: r, step: 0.1 })
    for (let x = -4; x < 4; x += 0.2) {
      console.log('(', arrondi(x, 1), ';', arrondi(f.image(x), 2), ')')
    }
    this.contenu = mathalea2d({ xmin: -13, xmax: 13, ymin: -10, ymax: 10 }, r, c)
  }
}
