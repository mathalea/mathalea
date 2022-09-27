
import { paveLPH3d } from '../../../modules/3d.js'
import { randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
export const titre = 'Volume de pavé droit par dénombrement de cubes unités'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '04/07/2022'

/*!
 * @author Jean-Claude Lhote
 *
 * Référence can6M11
 */
export const uuid = 'e332d'
export const ref = 'can6M11'
export default function VolumePaveCubes () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.sup = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const l = randint(2, 5)
    const L = randint(2, 4)
    const h = randint(2, 6, [l, L])
    const pav = paveLPH3d(0, 0, 0, 0.8, L, l, h)
    this.question = `Ce pavé droit est composé de cubes identiques. En prenant comme unité l'un de ces cubes, quel est le volume de ce pavé droit ?<br>
  ${mathalea2d({ xmin: 0, ymin: 0, xmax: 7, ymax: (h + l * 0.5) * 0.8 }, pav.c2d)}`
    this.reponse = L * l * h
    this.correction = `Le volume de ce pavé droit est : $${L}\\times ${l}\\times ${h}=${this.reponse}$`
  }
}
