import { codeSegments, droite, labelPoint, mathalea2d, point, segment, segmentAvecExtremites, tracePointSurDroite } from '../../../modules/2d.js'
import { calcul, randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Résoudre un problème de longueurs (inverse)'
export const dateDePublication = '2/11/2021'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/*!
 * @author Jean-Claude Lhote
 * Créé le 7/11/2021
 * Référence can6G04
 */
export default function ProblemesDeLongueursInverse () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' cm' }
  this.nouvelleVersion = function () {
    const objets = []
    const pointsSurDE = []
    const pointsSurAB = []
    const b = randint(2, 5)
    const a = randint(2, 8 - b)
    const c = randint(2, 9)
    const A = point(0, 0, 'A', 'below')
    const B = point(16, 0, 'B', 'below')
    const AB = segmentAvecExtremites(A, B)
    objets.push(labelPoint(A, B), AB)
    const dd = droite(A, B)
    for (let i = 1; i < b; i++) {
      pointsSurAB.push(point(i * 16 / b, 0), point(i * 16 / b, 0))
      objets.push(tracePointSurDroite(pointsSurAB[2 * (i - 1)], dd))
    }
    pointsSurAB[2 * (b - 2)].nom = 'C'
    pointsSurAB[2 * (b - 2)].positionLabel = 'below'
    objets.push(codeSegments('//', 'red', A, ...pointsSurAB, B))
    const D = point((b - 1) * 16 / b, 2, 'D', 'above')
    const x = D.x
    const E = point(16, 2, 'E', 'above')
    const l = E.x - D.x
    const F = point(x + (a - 1) * l / a, 2, 'F', 'above')
    const DE = segmentAvecExtremites(D, E)
    const d = droite(D, E)
    objets.push(DE, labelPoint(D, E, pointsSurAB[2 * (b - 2)]))
    for (let i = 1; i < a; i++) {
      pointsSurDE.push(point(x + i * l / a, 2), point(x + i * l / a, 2))
      objets.push(tracePointSurDroite(pointsSurDE[2 * (i - 1)], d))
    }
    const s1 = segment(pointsSurAB[pointsSurAB.length - 1], D)
    const s2 = segment(B, E)
    s1.pointilles = 2
    s1.color = 'green'
    s2.pointilles = 2
    s2.color = 'green'
    const abc = calcul(a * b * c)
    const ac = calcul(a * c)
    objets.push(labelPoint(F), codeSegments('O', 'blue', D, ...pointsSurDE, E), s1, s2)
    this.question = `Sachant que $AB=${calcul(a * b * c)}$ cm et que $CB=DE$, détermine $FE$.<br>` + mathalea2d({ xmin: -0.5, ymin: -1, xmax: 16.5, ymax: 3.5, scale: 0.5, style: 'margin: auto' }, objets)
    this.reponse = c
    this.correction = `Commme $CB=\\dfrac{AB}{${b}}$, alors $CB=\\dfrac{${abc}\\text{ cm}}{${b}}=${ac}$ cm.<br><br>Comme $DE=CB=${ac}$ cm et $FE=\\dfrac{DE}{${a}}$, alors $FE=\\dfrac{${ac}\\text{ cm}}{${a}}=${c}$ cm.`
  }
}
