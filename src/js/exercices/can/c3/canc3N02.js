import { droiteGraduee } from '../../../modules/2d.js'
import { randint, texNombre, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
export const titre = 'Trouver un nombre sur une droite graduée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Date de publication septembre 2021
 * Référence can6N01
 */
export const uuid = 'fc190'
export const ref = 'canc3N02'
export default function SuiteSurDroiteGraduee () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = randint(1, 6) // choix de la table = écart entre deux graduations
    const c = Math.floor(randint(10, 40) / a) * a // premier nombre.
    const maListe = []
    for (let i = 0; i < 3; i++) {
      maListe.push([c + a * i, texNombre(c + a * i)])
    }
    const d = droiteGraduee({
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
    this.question = mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 2, scale: 0.6, style: 'margin: auto' }, d) + '<br>Quel est le nombre écrit sous le point A ?'
    this.correction = `${texteEnCouleur('Comme les graduations vont de ' + a)} ${texteEnCouleur('en ' + a)} ${texteEnCouleur(', le nombre écrit sous le point $A$ correspond à ')} ${texteEnCouleur(c + 2 * a)} ${texteEnCouleur(' + ' + a)} ${texteEnCouleur('donc c\'est ' + texNombre(c + 3 * a) + '.')}`
  }
}
