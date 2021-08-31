import { randint, texNombrec } from '../../modules/outils'
import Exercice from '../Exercice'
import {
  mathalea2d, tracePoint, point, milieu, segment, latexParCoordonnees
} from '../../modules/2d.js'
export const titre = 'Périmètre d’une figure'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora
 */
export default function Perimetre () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur10 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 3)//
    const b = randint(4, 7)//
    const n = randint(7, 12)
    const c = randint(1, 6) + randint(3, 9) / 10
    const d = n - c
    const A = point(0, 0, 'P')
    const B = point(7, 1, 'Q', 'below')
    const C = point(6.5, 4, 'R')
    const D = point(2, 5, 'R')
    const objets = []
    objets.push(segment(A, B), segment(B, C), segment(C, D), segment(D, A), tracePoint(A, B, C, D))
    objets.push(latexParCoordonnees(`${texNombrec(b)}\\text{m}`, milieu(A, D).x - 0.5, milieu(A, D).y, 'black', 20, 10, ''),
      latexParCoordonnees(`${texNombrec(a)}\\text{m}`, milieu(B, C).x + 0.5, milieu(B, C).y, 'black', 20, 10, ''),
      latexParCoordonnees(`${texNombrec(c)}\\text{m}`, milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''),
      latexParCoordonnees(`${texNombrec(d)}\\text{m}`, milieu(C, D).x, milieu(C, D).y + 0.5, 'black', 20, 10, ''))

    this.question = 'Quel est le périmètre de cette figure ?<br>' +
     mathalea2d({ xmin: -1, ymin: -1, xmax: 8, ymax: 6, pixelsParCm: 30, mainlevee: true, amplitude: 0.5, scale: 0.7 }, objets)
    this.reponse = a + b + c + d
    this.correction = ` Le périmètre est donné par : $${texNombrec(a)}+${texNombrec(b)}+${texNombrec(c)}+${texNombrec(d)}=${texNombrec(a + b + c + d)}$ cm.`
    this.optionsChampTexte = { texteApres: ' cm' }
  }
}
