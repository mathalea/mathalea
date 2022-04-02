import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texNombre } from '../../modules/outils.js'
import { Point } from '../../modules/m2d/elements/points/Point.js'
import { Figure } from '../../modules/m2d/Figure'
import { Polygon } from '../../modules/m2d/elements/lines/Polygon.js'
import { Cursor } from '../../modules/m2d/elements/measures/Cursor.js'
import { context } from '../../modules/context.js'
import { Grid } from '../../modules/m2d/elements/others/Grid.js'

export const titre = 'Caractériser une homothétie'

export default class CaracteriseHomothetie extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 1
    this.nbQuestionsModifiable = false
    this.nbCols = 1
    this.nbColsCorr = 1
    this.pasDeVersionLatex = false
    this.pas_de_version_HMTL = false
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    let texte
    let texteCorr
    const figure = new Figure({ pixelsPerUnit: 20 })
    const grille = new Grid(figure, { xMin: -10, xMax: 10, yMin: -6, yMax: 6, dx: 1, dy: 1 })
    const kAlea = randint(-15, 15, [0, 8]) / 10
    const A = new Point(figure, 0, 0, { snapToGrid: true })
    const O = new Point(figure, 2, -1, { temp: true })
    const M = new Point(figure, randint(-5, -4), randint(1, 3), { temp: true })
    const N = new Point(figure, randint(-7, -6), 2, { temp: true })
    const P = new Point(figure, -5, randint(-3, -1), { temp: true })
    const k = new Cursor(figure, 0, 4, { min: -3, max: 3, step: 0.1, length: 4, value: 0.8 })
    const poly0 = new Polygon(M, N, P)
    const poly1 = poly0.homothetie(A, k)
    const polySolution = poly0.homothetie(O, kAlea)
    poly1.color = 'grey'
    poly1.opacity = 0.3
    poly1.fill = 'grey'
    poly1.fillOpacity = 0.3
    polySolution.color = 'black'
    polySolution.opacity = 0.3
    polySolution.fill = 'green'
    polySolution.fillOpacity = 0.3
    poly0.color = 'black'
    poly0.fill = 'blue'
    poly0.opacity = 0.5
    poly0.fillOpacity = 0.5

    texte = 'Trouver le centre et le rapport de l\'homothétie<br>\n'
    if (context.isHtml) {
      texte += `<div id="maFigureExo${this.numeroExercice}"></div>\n`
    }
    texteCorr = `Le rapport d'homothétie est de $${texNombre(kAlea, 1)}$`
    texteCorr += ` et son centre a pour coordonnées $(${O.x} ; ${O.y})$.`
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)

    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
    if (context.isHtml) {
      document.addEventListener('exercicesAffiches', () => {
        const maFigure = document.getElementById(`maFigureExo${this.numeroExercice}`)
        console.log(maFigure)
        const svg = maFigure.getElementsByTagName('svg')
        console.log(svg.length)
        if (svg.length === 0) {
          maFigure.appendChild(figure.svg)
        } else {
          maFigure.removeChild(svg[0])
          maFigure.appendChild(figure.svg)
        }
      })
    }
  }
}
