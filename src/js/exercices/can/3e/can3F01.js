import { courbeSpline, mathalea2d, repere2 } from '../../../modules/2d'
import { splineCatmullRom } from '../../../modules/fonctionsMaths'
import { randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const titre = 'Lecture graphique'

/*!
 * @author Jean-Claude Lhote
 */
export default function ImageSpline () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const X = randint(-5, 5)
    const Y = []
    for (let x = -6; x <= 6; x++) {
      Y[x + 6] = randint(-4, 4)
    }
    const f = splineCatmullRom({ tabY: Y, x0: -6, step: 1 })
    const r = repere2({ xMin: -7, xMax: 7, yMin: -6, yMax: 6 })
    const c = courbeSpline(f, { repere: r, step: 0.1, color: 'red', xMin: -6, xMax: 6, traceNoeuds: true })
    this.reponse = f.image(X)
    this.question = `Quel est l'image de ${X} ?<br>${mathalea2d({ xmin: -7, xmax: 7, ymin: -6, ymax: 6 }, r, c)}`
    this.correction = `${X} a pour image ${f.image(X)}.`
  }
}
