import Exercice from '../../Exercice.js'
import { randint, choice, calcul, creerNomDePolygone, texNombre } from '../../../modules/outils.js'
import {
  mathalea2d, point, pointAdistance, labelPoint, segment, milieu, texteParPosition
} from '../../../modules/2d.js'
export const titre = 'Calculer une longueur avec le théorème de Thalès'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can3G03
 * Date de publication sptembre 2021
*/
export default function CalculLongueurThales2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let nom, a, b, c, k, A, B, C, D, E, xmin, xmax, ymin, ymax, objets
    if (choice([true, false])) {
      nom = creerNomDePolygone(5, ['QD'])
      k = choice([1.5, 2, 2.5])
      b = randint(2, 5) * 2//
      a = k * b
      c = randint(2, 6, b)//

      A = point(0, 0, nom[0], 'above')
      B = pointAdistance(A, b, -30, nom[1], 'below')
      C = pointAdistance(B, c, 110, nom[2], 'above')

      D = pointAdistance(A, a, 150, nom[3], 'above')
      E = pointAdistance(D, k * c, -70, nom[4], 'below')

      // pol = polygoneAvecNom(A, D, C)
      xmin = Math.min(A.x, B.x, C.x, D.x, E.x) - 2
      ymin = Math.min(A.y, B.y, C.y, D.y, E.y) - 2
      xmax = Math.max(A.x, B.x, C.x, D.x, E.x) + 2
      ymax = Math.max(A.y, B.y, C.y, D.y, E.y) + 2
      objets = []
      objets.push(segment(B, D), segment(D, E), segment(C, E), segment(B, C), labelPoint(A, B, C, D, E))
      objets.push(texteParPosition(`${texNombre(b)}`, milieu(A, B).x, milieu(A, B).y - 0.7, 'milieu', 'black', 1, 'middle', true),
        texteParPosition(`${texNombre(c)}`, milieu(B, C).x + 0.5, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true),
        texteParPosition(`${texNombre(a)}`, milieu(A, D).x + 0.5, milieu(A, D).y + 0.5, 'milieu', 'black', 1, 'middle', true))
      this.question = `Les droites $(${nom[1]}${nom[2]})$ et $(${nom[3]}${nom[4]})$ sont parallèles.
        Calculer $${nom[3]}${nom[4]}$.<br>`
      this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 8, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
      this.correction = ` Le triangle $${nom[0]}${nom[3]}${nom[4]}$ est un agrandissement du triangle $${nom[0]}${nom[1]}${nom[2]}$.<br>
    Le coefficient d'agrandissement est  donné par :  $\\dfrac{${nom[0]}${nom[3]}}{${nom[0]}${nom[1]}}=\\dfrac{${texNombre(a)}}{${b}}=${texNombre(a / b)}$.<br>
    On en déduit que les longueurs du triangle $${nom[0]}${nom[3]}${nom[4]}$ sont $${texNombre(a / b)}$ fois plus grandes que les longueurs du triangle $${nom[0]}${nom[1]}${nom[2]}$. <br>
        Ainsi, $${nom[3]}${nom[4]}=${texNombre(a / b)}\\times ${c}=${texNombre(a * c / b)}$.
                  <br>`
      this.reponse = calcul(a * c / b)
    } else {
      nom = creerNomDePolygone(5, ['QD'])
      k = choice([1.5, 2, 2.5])
      b = randint(2, 5) * 2//
      a = k * b
      c = randint(2, 6, b)//

      A = point(0, 0, nom[0], 'above')
      B = pointAdistance(A, c, -30, nom[1], 'below')
      C = pointAdistance(B, b, 110, nom[2], 'above')

      D = pointAdistance(A, k * c, 150, nom[3], 'above')
      E = pointAdistance(D, a, -70, nom[4], 'below')

      // pol = polygoneAvecNom(A, D, C)
      xmin = Math.min(A.x, B.x, C.x, D.x, E.x) - 2
      ymin = Math.min(A.y, B.y, C.y, D.y, E.y) - 2
      xmax = Math.max(A.x, B.x, C.x, D.x, E.x) + 2
      ymax = Math.max(A.y, B.y, C.y, D.y, E.y) + 2
      objets = []
      objets.push(segment(B, D), segment(D, E), segment(C, E), segment(B, C), labelPoint(A, B, C, D, E))
      objets.push(texteParPosition(`${texNombre(b)}`, milieu(B, C).x + 0.5, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true),
        texteParPosition(`${texNombre(c)}`, milieu(A, B).x, milieu(A, B).y - 0.5, 'milieu', 'black', 1, 'middle', true),
        texteParPosition(`${texNombre(a)}`, milieu(D, E).x - 0.8, milieu(D, E).y, 'milieu', 'black', 1, 'middle', true))
      this.question = `Les droites $(${nom[1]}${nom[2]})$ et $(${nom[3]}${nom[4]})$ sont parallèles. Calculer $${nom[3]}${nom[0]}$.<br>`
      this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 8, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
      this.correction = ` Le triangle $${nom[0]}${nom[3]}${nom[4]}$ est un agrandissement du triangle $${nom[0]}${nom[1]}${nom[2]}$.<br>
       Le coefficient d'agrandissement est  donné par : $\\dfrac{${nom[3]}${nom[4]}}{${nom[2]}${nom[1]}}=\\dfrac{${texNombre(a)}}{${b}}=${texNombre(a / b)}$.<br>
       On en déduit que les longueurs du triangle $${nom[0]}${nom[3]}${nom[4]}$ sont $${texNombre(a / b)}$ fois plus grandes que les longueurs du triangle $${nom[0]}${nom[1]}${nom[2]}$. <br>
           Ainsi, $${nom[3]}${nom[0]}=${texNombre(a / b)}\\times ${c}=${texNombre(a * c / b)}$.
                     <br>`
      this.reponse = calcul(a * c / b)
    }
  }
}
