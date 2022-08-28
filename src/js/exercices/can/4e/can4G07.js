import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, calcul, choice, texNombrec, creerNomDePolygone } from '../../../modules/outils.js'
import {
  point, labelPoint, segment, codageSegments
} from '../../../modules/2d.js'
export const titre = 'Calculer une longueur avec le théorème de Thalès (milieu)'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can4G07
 * Date de publication septembre 2021
*/
export const uuid = 'ae712'
export const ref = 'can4G07'
export default function CalculLongueurThalesMilieu () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, A, B, C, D, E, objets, nom
    if (choice([true, false])) {
      nom = creerNomDePolygone(5, ['QD'])
      a = randint(1, 9) + randint(1, 5) / 10 + randint(1, 9) / 100

      A = point(0, 0, nom[0], 'below')
      B = point(6, 0, nom[1], 'below')
      C = point(5, 4, nom[2], 'C')
      D = point(2.5, 2, nom[3], 'D')
      E = point(3, 0, nom[4], 'below')
      objets = []
      objets.push(segment(A, B), segment(D, E), segment(A, C), segment(B, C),
        codageSegments('||', 'blue', A, D, D, C), labelPoint(A, B, C, D, E))

      this.question = `$(${nom[3]}${nom[4]})//(${nom[1]}${nom[2]})$ et  
      $${nom[3]}${nom[4]}=${texNombrec(a)}$.
      Calculer $${nom[1]}${nom[2]}$.<br>
     `
      this.question += mathalea2d({ xmin: -1, ymin: -1, xmax: 8, ymax: 5, pixelsParCm: 18, mainlevee: false, amplitude: 0.5, style: 'margin: auto' }, objets)
      this.correction = ` Les longueurs du triangle $${nom[0]}${nom[1]}${nom[2]}$ sont 2 fois plus grandes que les longueurs du triangle $${nom[0]}${nom[3]}${nom[4]}$.<br>
      Le triangle $${nom[0]}${nom[1]}${nom[2]}$ est un agrandissement du triangle $${nom[0]}${nom[3]}${nom[4]}$.<br>
      Ainsi : $${nom[1]}${nom[2]}=2\\times ${nom[3]}${nom[4]}=2\\times ${texNombrec(a)}=${texNombrec(2 * a)}$.
  `

      this.reponse = calcul(2 * a)
    } else {
      nom = creerNomDePolygone(5, ['QD'])
      a = calcul((randint(1, 9) + randint(1, 5) / 10) * 2)
      A = point(0, 0, nom[0], 'below')
      B = point(6, 0, nom[1], 'below')
      C = point(5, 4, nom[2], 'C')
      D = point(2.5, 2, nom[3], 'D')
      E = point(3, 0, nom[4], 'below')
      objets = []
      objets.push(segment(A, B), segment(D, E), segment(A, C), segment(B, C),
        codageSegments('||', 'blue', A, D, D, C), labelPoint(A, B, C, D, E))

      this.question = `$(${nom[3]}${nom[4]})//(${nom[1]}${nom[2]})$ et 
       $${nom[1]}${nom[2]}=${texNombrec(a)}$. 
         Calculer $${nom[3]}${nom[4]}$.<br>`
      this.question += mathalea2d({ xmin: -1, ymin: -1, xmax: 8, ymax: 5, pixelsParCm: 18, mainlevee: false, amplitude: 0.5, style: 'margin: auto' }, objets)
      this.correction = ` Les longueurs du triangle $${nom[0]}${nom[3]}${nom[4]}$ sont 2 fois plus petites que les longueurs du triangle $${nom[0]}${nom[1]}${nom[2]}$.<br>
      Le triangle $${nom[0]}${nom[3]}${nom[4]}$ est une réduction du triangle $${nom[0]}${nom[1]}${nom[2]}$. <br>
            Ainsi : $${nom[3]}${nom[4]}= ${nom[1]}${nom[2]} \\div 2 = ${texNombrec(a)}\\div 2 =${texNombrec(a / 2)}$.
     `

      this.reponse = calcul(a / 2)
    }
  }
}
