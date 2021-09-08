import { droiteGraduee2, mathalea2d } from '../../../modules/2d'
import { randint, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Suite sur une droite graduée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/*!
 * @author Jean-Claude Lhote
 * Date de publication septembre 2021
 * Référence can6N01
 */
export default function SuiteSurDroiteGraduee () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const a = randint(1, 6) // choix de la table = écart entre deux graduations
    const c = Math.floor(randint(10, 40) / a) * a // premier nombre.
    const maListe = []
    for (let i = 0; i < 3; i++) {
      maListe.push([c + a * i, texNombre(c + a * i)])
    }
    const d = droiteGraduee2({
      Unite: 3 / a,
      Min: c - a,
      Max: c + 3 * a,
      x: 0,
      y: 0,
      thickDistance: a,
      thickSec: false,
      thickOffset: 0,
      axeStyle: '->',
      pointListe: [[c + a * 3, 'A']],
      labelListe: maListe,
      pointCouleur: 'blue',
      pointStyle: 'x',
      labelsPrincipaux: false
    })
    this.reponse = c + 3 * a
    this.question = mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 2 }, d) + 'Quelle est l\'abscisse du point A ?'
    this.correction = `L'abscisse du point $A$ est $${c + 3 * a}$`
  }
}
