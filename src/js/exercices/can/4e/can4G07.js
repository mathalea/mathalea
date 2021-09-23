import Exercice from '../../Exercice.js'
import { randint, calcul, choice, texNombrec, creerNomDePolygone } from '../../../modules/outils.js'
import {
  mathalea2d, point, labelPoint, segment, codeSegments
} from '../../../modules/2d.js'
export const titre = 'Calcul d’une longueur avec Thalès (milieu)'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can4G07
 * Date de publication sptembre 2021
*/
export default function CalculLongueurThalesMilieu () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, A, B, C, D, E, objets, nom
    if (choice([true, false])) {
      nom = creerNomDePolygone(5, ['Q'])
      a = randint(1, 9) + randint(1, 5) / 10 + randint(1, 9) / 100

      A = point(0, 0, nom[0], 'below')
      B = point(6, 0, nom[1], 'below')
      C = point(5, 4, nom[2], 'C')
      D = point(2.5, 2, nom[3], 'D')
      E = point(3, 0, nom[4], 'below')
      objets = []
      objets.push(segment(A, B), segment(D, E), segment(A, C), segment(B, C),
        codeSegments('||', 'blue', A, D, D, C), labelPoint(A, B, C, D, E))

      this.question = `Sur cette figure, $(${nom[3]}${nom[4]})//(${nom[1]}${nom[2]})$.<br>
      $${nom[3]}${nom[4]}=${texNombrec(a)}$. <br>
      Calculer $${nom[1]}${nom[2]}$.`
      this.question += mathalea2d({ xmin: -1, ymin: -3, xmax: 8, ymax: 5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5 }, objets)
      this.correction = ` Les longueurs du triangle $${nom[0]}${nom[1]}${nom[2]}$ sont 2 fois plus grandes que les longueurs du triangle $${nom[0]}${nom[3]}${nom[4]}$.<br>
      Ainsi : $${nom[1]}${nom[2]}=2\\times $${nom[3]}${nom[4]}${nom[2]}$=2\\times ${texNombrec(a)}=${texNombrec(2 * a)}$.
  `

      this.reponse = calcul(2 * a)
    } else {
      nom = creerNomDePolygone(5, ['Q'])
      a = calcul((randint(1, 9) + randint(1, 5) / 10) * 2)
      A = point(0, 0, nom[0], 'below')
      B = point(6, 0, nom[1], 'below')
      C = point(5, 4, nom[2], 'C')
      D = point(2.5, 2, nom[3], 'D')
      E = point(3, 0, nom[4], 'below')
      objets = []
      objets.push(segment(A, B), segment(D, E), segment(A, C), segment(B, C),
        codeSegments('||', 'blue', A, D, D, C), labelPoint(A, B, C, D, E))

      this.question = `Sur cette figure, $(${nom[3]}${nom[4]})//(${nom[1]}${nom[2]})$.<br>
         $${nom[1]}${nom[2]}=${texNombrec(a)}$. <br>
         Calculer $${nom[3]}${nom[4]}$.`
      this.question += mathalea2d({ xmin: -1, ymin: -3, xmax: 8, ymax: 5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5 }, objets)
      this.correction = ` Les longueurs du triangle $${nom[0]}${nom[1]}${nom[2]}$ sont 2 fois plus grandes que les longueurs du triangle $${nom[0]}${nom[3]}${nom[4]}$.<br>
         Ainsi : $${nom[3]}${nom[4]}= ${nom[1]}${nom[2]} \\div 2 = ${texNombrec(a)}\\div 2 =${texNombrec(a / 2)}$.
     `

      this.reponse = calcul(a / 2)
    }
  }
}
