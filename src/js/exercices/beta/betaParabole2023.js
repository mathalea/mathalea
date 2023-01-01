import Exercice from '../Exercice.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { repere, courbe, segment, rotation, point, cercle, texteParPosition, latexParCoordonnees } from '../../modules/2d.js'
import { mathalea2d } from '../../modules/2dGeneralites'
export const titre = 'Question parabolique'

export default function betaparabole2023 () {
  Exercice.call(this)
  this.nouvelleVersion = function () {
    debugger
    const rep = repere({ xMin: -3, xMax: 3, yMin: -1, yMax: 10, axeXisVisible: false, axeYisVisible: false, grille: false })
    const f = x => (x ** 2) / 0.5
    const c = courbe(f, { repere: rep, xMin: -3, xMax: 3, step: 0.1, epaisseur: 1 })
    const centre1 = point(0, 3.75)
    const centre2 = point(0, 6.95)
    const c1 = cercle(centre1, 1.35, 'purple')
    const c2 = cercle(centre2, 1.85, 'purple')
    const axeX = segment(-3, 0, 3, 0)
    const axeY = segment(0, -1, 0, 10)
    axeX.epaisseur = 0.3
    axeY.epaisseur = 0.3
    const x1 = 1.33
    const x2 = 1.825
    const rayon1 = segment(centre1, rotation(point(x1, f(x1)), centre1, 160), 'red')
    const rayon2 = segment(centre2, rotation(point(x2, f(x2)), centre2, 40), 'red')
    const texte1 = texteParPosition('2022', -0.4, 4.3, 'milieu', 'red', 0.7, 'middle', true)
    const texte2 = texteParPosition('r = ?', 0.4, 7.7, 'milieu', 'red', 0.8, 'middle', true)
    const texte3 = latexParCoordonnees('y=x^2', 1, 1, 'black', 0, 20, '', 6)
    this.listeQuestions.push(mathalea2d({ xmin: -3, xmax: 3, ymin: -1, ymax: 10, pixelsParCm: 30, scale: 1 }, rep, c, axeX, axeY, c1, c2, rayon1, rayon2, texte1, texte2, texte3))
    this.listeCorrections.push('')
    listeQuestionsToContenu(this)
  }
}
