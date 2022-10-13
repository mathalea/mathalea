import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { segment, segmentAvecExtremites } from '../../../modules/2d/segment.js'
import { point } from '../../../modules/2d/point.js'
import { simplificationDeFractionAvecEtapes, texFraction, texFractionReduite } from '../../../modules/outils/arrayFractions.js'
import { texteParPosition } from '../../../modules/2d/textes.js'
import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { milieu } from '../../../modules/2d/barycentre.js'
import { codageSegments } from '../../../modules/2d/codages.js'
import { stringNombre } from '../../../modules/outils/stringNombre.js'
export const titre = 'Calculer le "milieu" entre 1 et une fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can3C07
 * Date de publication sptembre 2021
*/
export const uuid = '5da59'
export const ref = 'can2C09'
export default function MilieuEntre1EtFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const listeFractions1 = [
      [10, 3], [5, 4], [7, 4], [10, 7], [11, 7], [12, 7], [9, 7], [13, 7], [11, 8], [11, 9], [7, 6], [12, 11], [4, 3],
      [7, 5], [13, 7], [13, 9], [13, 11], [13, 12], [14, 11]
    ] // Couples de nombres premiers entre eux >1
    const fractionR = choice(listeFractions1)
    const n = fractionR[0]
    const d = fractionR[1]
    const A = point(0, 0, '1', 'below')
    const C = point(randint(8, 12), 0)
    const B = milieu(A, C, 'M', 'below')
    const objets = []
    objets.push(segmentAvecExtremites(A, B), segmentAvecExtremites(B, C), codageSegments('||', 'blue', A, B, B, C))
    objets.push(texteParPosition(`${stringNombre(1)}`, 0, -0.6))
    objets.push(texteParPosition(`${stringNombre(n)}`, C.x, C.y - 0.5))
    objets.push(segment(point(C.x - 0.3, C.y - 0.8), point(C.x + 0.3, C.y - 0.8)))
    objets.push(texteParPosition('M', B.x, B.y - 0.5))
    // objets.push(texteParPosition(`---`,C.x ,C.y-0.7))
    objets.push(texteParPosition(`${stringNombre(d)}`, C.x, C.y - 1.1))
    // objets.push(latexParCoordonnees(fraction(n, d).texFraction, C.x, -1, 'black', 20, 20, 'white', 6))
    //, labelPoint(B)

    this.question = 'Donner l\'abscisse du point $M$ sous forme d’une fraction irréductible.<br>'
    this.question += mathalea2d({
      xmin: -1,
      ymin: -2,
      xmax: C.x + 1,
      ymax: 1,
      pixelsParCm: 30,
      mainlevee: false,
      amplitude: 0.4,
      scale: 0.7,
      style: 'margin: auto'
    }, objets)
    this.correction = `On calcule la moyenne de $1$ et $${texFraction(n, d)}$ :<br>  
    $x_I=\\dfrac{1+${texFraction(n, d)}}{2}=
    \\dfrac{${texFraction(d, d)}+${texFraction(n, d)}}{2}=
        ${texFraction(n + d, d)}\\times \\dfrac{1}{2}=
        ${texFraction(d + n, 2 * d)} ${simplificationDeFractionAvecEtapes(d + n, 2 * d)}$ <br><br>`
    this.correction += texteEnCouleur(` Mentalement : <br>
        On calcule d'abord  $1+${texFraction(n, d)}$ en n'oubliant pas que $1=\\dfrac{${d}}{${d}}$, puis on multiplie le résultat par $\\dfrac{1}{2}$. `)

    this.reponse = texFractionReduite(d + n, 2 * d)
  }
}
