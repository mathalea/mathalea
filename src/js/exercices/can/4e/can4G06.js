import Exercice from '../../Exercice.js'
import { randint, choice, calcul, creerNomDePolygone, texNombrec } from '../../../modules/outils.js'
import {
  mathalea2d, point, latexParCoordonnees, pointAdistance, polygoneAvecNom, labelPoint, segmentAvecExtremites, droite, segment, milieu
} from '../../../modules/2d.js'
export const titre = 'Calcul d’une longueur avec Thalès'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can4G06
 * Date de publication sptembre 2021
*/
export default function CalculLongueurThales () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let nom, a, b, c, k, A, B, C, D, E, G, H, xmin, xmax, ymin, ymax, objets, pol
    if (choice([true, false])) {
      nom = creerNomDePolygone(5, ['Q'])
      k = choice([1.5, 2, 2.5])
      b = randint(2, 5)//
      a = k * b
      c = randint(2, 5, b)//

      A = point(0, 0, nom[0], 'below right')
      B = pointAdistance(A, b, 40, nom[1])
      D = pointAdistance(A, a, 40, nom[3])
      C = pointAdistance(D, k * c, -40, nom[2], 'below right')
      E = pointAdistance(B, c, -40, nom[4], 'below right')
      G = pointAdistance(A, 0.7, 120)
      H = pointAdistance(D, 0.7, 120)
      pol = polygoneAvecNom(A, D, C)
      xmin = Math.min(A.x, B.x, C.x, D.x, E.x) - 1
      ymin = Math.min(A.y, B.y, C.y, D.y, E.y) - 1
      xmax = Math.max(A.x, B.x, C.x, D.x, E.x) + 1
      ymax = Math.max(A.y, B.y, C.y, D.y, E.y) + 1
      objets = []
      objets.push(pol[0]) //, pol[1]
      objets.push(droite(A, B), segment(B, E), droite(A, C), segment(D, C), segmentAvecExtremites(G, H), labelPoint(A, B, C, D, E))
      objets.push(latexParCoordonnees(`${texNombrec(a)}`, milieu(G, H).x, milieu(G, H).y + 0.75, 'black', 20, 10, ''),
        latexParCoordonnees(`${texNombrec(b)}`, milieu(A, B).x, milieu(A, B).y + 0.25, 'black', 20, 10, ''), latexParCoordonnees(`${texNombrec(c)}`, milieu(B, E).x, milieu(B, E).y + 0.2, 'black', 20, 10, ''))
      this.question = `Sur cette figure les droites $(${nom[1]}${nom[4]})$ et $(${nom[3]}${nom[2]})$ sont parallèles.<br>
        Calculer $${nom[3]}${nom[2]}$.`
      this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 2 }, objets)
      this.correction = ` Le triangle $${nom[0]}${nom[3]}${nom[2]}$ est un agrandissement du triangle $${nom[0]}${nom[3]}${nom[2]}$.<br>
    Le coefficient d'agrandissment est  donné par : $\\dfrac{${nom[0]}${nom[3]}}{${nom[0]}${nom[1]}}=\\dfrac{${texNombrec(a)}}{${b}}=${texNombrec(a / b)}$.<br>
    On en déduit que les longueurs du triangle $${nom[0]}${nom[3]}${nom[2]}$ sont $${texNombrec(a / b)}$ fois plus grandes que les longueurs du triangle $${nom[0]}${nom[1]}${nom[4]}$. <br>
        Ainsi, $${nom[3]}${nom[2]}=${texNombrec(a / b)}\\times ${c}=${texNombrec(a * c / b)}$.
                  <br>`
      this.reponse = calcul(a * c / b)
    } else {
      nom = creerNomDePolygone(5, ['Q'])
      k = choice([1.5, 2, 2.5])
      a = randint(2, 5)//
      b = randint(2, 5, a)//

      A = point(0, 0, nom[0], 'below right')
      B = pointAdistance(A, a, 40, nom[1])
      D = pointAdistance(A, k * a, 40, nom[3])
      C = pointAdistance(D, k * b, -40, nom[2], 'below right')
      E = pointAdistance(B, b, -40, nom[4], 'below right')
      pol = polygoneAvecNom(A, D, C)
      xmin = Math.min(A.x, B.x, C.x, D.x, E.x) - 1
      ymin = Math.min(A.y, B.y, C.y, D.y, E.y) - 1
      xmax = Math.max(A.x, B.x, C.x, D.x, E.x) + 1
      ymax = Math.max(A.y, B.y, C.y, D.y, E.y) + 1
      objets = []
      objets.push(pol[0]) //, pol[1]
      objets.push(droite(A, B), segment(B, E), droite(A, C), segment(D, C), labelPoint(A, B, C, D, E))
      objets.push(latexParCoordonnees(`${texNombrec(a)}`, milieu(A, B).x, milieu(A, B).y + 0.25, 'black', 20, 10, ''),
        latexParCoordonnees(`${texNombrec(k * b)}`, milieu(D, C).x + 0.5, milieu(D, C).y, 'black', 20, 10, ''),
        latexParCoordonnees(`${texNombrec(b)}`, milieu(B, E).x + 0.5, milieu(B, E).y, 'black', 20, 10, ''))
      this.question = `Sur cette figure les droites $(${nom[1]}${nom[4]})$ et $(${nom[3]}${nom[2]})$ sont parallèles.<br>
       Calculer $${nom[0]}${nom[3]}$.`
      this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 2 }, objets)
      this.correction = ` Le triangle $${nom[0]}${nom[3]}${nom[2]}$ est un agrandissement du triangle $${nom[0]}${nom[3]}${nom[2]}$.<br>
   Le coefficient d'agrandissment est  donné par : $\\dfrac{${nom[2]}${nom[3]}}{${nom[1]}${nom[4]}}=\\dfrac{${texNombrec(k * b)}}{${b}}=${texNombrec(k)}$.<br>
   On en déduit que les longueurs du triangle $${nom[0]}${nom[3]}${nom[2]}$ sont $${texNombrec(a / b)}$ fois plus grandes que les longueurs du triangle $${nom[0]}${nom[1]}${nom[4]}$. <br>
       Ainsi, $${nom[0]}${nom[3]}=${texNombrec(k)}\\times ${a}=${texNombrec(k * a)}$.
                 <br>`
      this.reponse = calcul(k * a)
    }
  }
}
