import { courbeSpline, mathalea2d, repere2 } from '../../../modules/2d.js'
import { splineCatmullRom } from '../../../modules/fonctionsMaths'
import { randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const titre = 'Lire une image graphiquement'
/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3F01
*/
export default function ImageSpline () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
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
    this.question = `Quelle est l'image de $${X}$ ?<br>${mathalea2d({ xmin: -7, xmax: 7, ymin: -6, ymax: 6, pixelsParCm: 17, style: 'margin: auto' }, r, c)}`
    this.correction = `Pour lire l'image de $${X}$, on place la valeur de $${X}$ sur l'axe des abscisses (axe de lecture  des antécédents) et on lit 
    son image $${f.image(X)}$ sur l'axe des ordonnées (axe de lecture des images).`
  }
}
