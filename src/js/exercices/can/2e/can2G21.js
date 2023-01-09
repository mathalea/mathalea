import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import {
  point, texteParPosition, tracePoint, repere
} from '../../../modules/2d.js'
import { randint, choice, texNombre, arrondi } from '../../../modules/outils.js'
export const titre = 'Lire les coordonnées d\'un point dans un repère'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '04/01/2023'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2G21
 *
*/
export const uuid = '21bc0'
export const ref = 'can2G21'
export default function LectureCoordonnees () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const k2 = choice([3, 4, 5])
    const k1 = choice([3, 4, 5])
    const b = randint(-5, 5) / k2
    const a = randint(-8, 8) / k1
    const r = repere({
      xUnite: 1,
      yUnite: 1,
      xMin: -3,
      xMax: 3,
      yMin: -2,
      yMax: 2,
      thickHauteur: 0.1,
      yLabelEcart: 0.4,
      xLabelEcart: 0.3,
      xLabelMin: -2,
      yLabelMin: -1,
      xLabelMax: 2,
      yLabelMax: 1,
      axeXStyle: '->',
      axeYStyle: '->',
      grilleSecondaire: true,
      grilleSecondaireXDistance: 1 / k1,
      grilleSecondaireYDistance: 1 / k2,
      grilleSecondaireYMin: -2,
      grilleSecondaireYMax: 2,
      grilleSecondaireXMin: -3,
      grilleSecondaireXMax: 3
    })

    const A = point(a, b)
    const o = texteParPosition('O', -0.2, -0.2, 'milieu', 'black', 1)
    const traceA = tracePoint(A, 'red') // Variable qui trace les points avec une croix
    traceA.taille = 3
    traceA.epaisseur = 2
    this.question = `Donner les coordonnées du point.<br>
    `
    if (this.interactif) { this.question += 'Respecter les notations.<br>' }
    this.question += mathalea2d({ xmin: -3, xmax: 3, ymin: -2, ymax: 2, scale: 1, pixelsParCm: 50 }, r, o, traceA)
    this.correction = 'L\'abscisse du point se lit sur l\'axe horizontal.'
    if (k1 === 3) {
      if (a * k1 === 3 || a * k1 === -3 || a * k1 === 6 || a * k1 === -6) { this.correction += ` On lit $${texNombre(a, 2)}$.<br>` } else {
        this.correction += ` L'unité (sur l'axe des abscisses) est divisée en $${k1}$. <br>
      Le point a pour abscisse $\\dfrac{${arrondi(a * k1, 0)}}{${k1}}$.<br>`
      }
    } else {
      this.correction += `L'unité (sur l'axe des abscisses) est divisée en $${k1}$. <br>
    Le point a pour abscisse $\\dfrac{${arrondi(a * k1, 0)}}{${k1}}=${texNombre(a, 2)}$.<br>`
    }

    this.correction += 'L\'ordonnée du point  se lit sur l\'axe vertical.'
    if (k2 === 3) {
      if (b * k2 === 3 || b * k2 === -3 || b * k2 === 6 || b * k2 === -6) { this.correction += ` On lit $${texNombre(a, 2)}$.<br>` } else {
        this.correction += ` L'unité (sur l'axe des ordonnées) est divisée en $${k2}$. <br>
      Le point a pour ordonnée $\\dfrac{${arrondi(b * k2, 0)}}{${k2}}$.<br>`
      }
    } else {
      this.correction += ` L'unité (sur l'axe des ordonnées) est divisée en $${k2}$. <br>
    Le point a pour ordonnée $\\dfrac{${arrondi(b * k2, 0)}}{${k2}}=${texNombre(b, 2)}$.<br>`
    }

    this.reponse = [`(\\dfrac{${arrondi(a * k1, 0)}}{${k1}};\\dfrac{${arrondi(b * k2, 0)}}{${k2}})`,
    `(${arrondi(a, 2)};${arrondi(b, 2)})`, `(\\dfrac{${arrondi(a * k1, 0)}}{${k1}};${arrondi(b, 2)})`,
    `(${arrondi(a, 2)};\\dfrac{${arrondi(b * k2, 0)}}{${k2}})`]

    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
