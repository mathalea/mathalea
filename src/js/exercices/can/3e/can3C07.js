import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, texNombrec, calcul, texNum } from '../../../modules/outils.js'
import { point, segmentAvecExtremites, codageSegments, labelPoint, texteParPosition } from '../../../modules/2d.js'
export const titre = 'Calculer l’abscisse d’un milieu'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can3C07
 * Date de publication sptembre 2021
*/
export const dateDeModifImportante = '06/12/2021'
export default function MilieuEntre1EtFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 5)
    const c = randint(1, 9)
    const b = calcul(a + c + randint(1, 9, 5) / 5)
    const A = point(0, 0, '1', 'below')
    const B = point(4, 0, 'M', 'below')
    const C = point(8, 0)
    const objets = []
    objets.push(segmentAvecExtremites(A, B), segmentAvecExtremites(B, C), labelPoint(B), codageSegments('||', 'blue', A, B, B, C))
    objets.push(texteParPosition(`$${texNum(a)}$`, 0, -1, 'milieu', 'black', 1, 'middle', true)
    )
    objets.push(texteParPosition(`$${texNum(b)}$`, 8, -1, 'milieu', 'black', 1, 'middle', true)
    )
    this.question = 'Donner l\'abscisse du point $M$ sous forme décimale.<br>'
    this.question += mathalea2d({
      xmin: -1,
      ymin: -2,
      xmax: 10,
      ymax: 1,
      pixelsParCm: 20,
      mainlevee: false,
      amplitude: 0.5,
      scale: 0.7,
      style: 'margin: auto'
    }, objets)
    this.question += '<br>'
    this.correction = `On calcule la moyenne de $${texNombrec(a)}$ et $${texNombrec(b)}$ :<br>  
    $x_M=\\dfrac{${texNombrec(a)}+${texNombrec(b)}}{2}=
    \\dfrac{${texNombrec(a + b)}}{2}=${texNombrec((a + b) / 2)}$`

    this.reponse = (a + b) / 2
  }
}
// fractionParPosition({ x: 8, y: -0.5, fraction: fraction(n, d) })
// ${texFraction(n, d)}
