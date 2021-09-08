import Exercice from '../Exercice.js'
import { choice, texFraction, texFractionReduite, simplificationDeFractionAvecEtapes, texteEnCouleur } from '../../modules/outils.js'
import {
  mathalea2d, point, segmentAvecExtremites,
  codeSegments, labelPoint, latexParCoordonnees
} from '../../modules/2d.js'
export const titre = 'milieu entre 1 et fraction avec graphique'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function MilieuEntre1EtFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.nouvelleVersion = function () {
    const listeFractions1 = [
      [10, 3], [5, 4], [7, 4], [10, 7], [11, 7], [12, 7], [9, 7], [13, 7], [11, 8], [11, 9], [7, 6], [12, 11], [4, 3],
      [7, 5], [13, 7], [13, 9], [13, 11], [13, 12], [14, 11]
    ] // Couples de nombres premiers entre eux >1
    let objets
    const fraction = choice(listeFractions1)
    const n = fraction[0]
    const d = fraction[1]
    const A = point(0, 0, '1', 'below')
    const B = point(4, 0, 'I', 'below')
    const C = point(8, 0)
    objets = []
    objets.push(segmentAvecExtremites(A, B), segmentAvecExtremites(B, C), labelPoint(B), codeSegments('||', 'blue', A, B, B, C))
    objets.push(latexParCoordonnees('1', 0, -0.5, 'black', 20, 10, ''),
      latexParCoordonnees(`${texFraction(n, d)}`, 8, -0.5, 'black', 20, 10, ''))
    this.question = 'Quelle est l\'abscisse du point $I$ sous forme de fraction irréductible ?<br>'
    this.question += mathalea2d({ xmin: -1, ymin: -2, xmax: 10, ymax: 2, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
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
