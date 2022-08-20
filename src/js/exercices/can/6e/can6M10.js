import { pave } from '../../../modules/2d.js'
import { randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
export const titre = 'Volume de pavé droit'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '04/07/2022'

/*!
 * @author Jean-Claude Lhote
 *
 * Référence can6M10
 */
export default function VolumePaveSimple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.sup = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const l = randint(2, 5)
    const L = randint(2, 4)
    const h = randint(2, 6, [l, L])
    console.log(l, L, h)
    const pav = pave(L, l, h)
    this.question = `L'unité de longueur est le centimètre. Quel est le volume du pavé droit ci-dessous ?<br>
  ${mathalea2d({ xmin: -2, ymin: -2, xmax: 10, ymax: h + l * 0.5 }, pav)}`
    console.log(pav.svg(30))
    this.reponse = L * l * h
    this.correction = `Le volume de ce pavé droit est : $${L}\\text{cm}\\times ${l}\\text{cm}\\times ${h}\\text{cm}=${this.reponse}\\text{cm}^3$`
  }
}
