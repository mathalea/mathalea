import Exercice from '../../Exercice.js'
import { randint, choice, calcul, creerNomDePolygone, texNombre } from '../../../modules/outils.js'
import {
  // eslint-disable-next-line no-unused-vars
  mathalea2d, point, afficheMesureAngle, codageSegments, longueur, polygoneAvecNom
} from '../../../modules/2d.js'
import { tan } from '../../../modules/fonctionsMaths.js'
export const titre = 'Calculer un angle dans un triangle isocèle'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function AngleTriangleIsocele () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, A, B, C, objets, nom, pol, xmin, xmax, ymin, ymax

    switch (choice(['a', 'b'])) { //, 'b'
      case 'a':
        nom = creerNomDePolygone(3, ['QD'])
        a = randint(4, 16, 12) * 5
        A = point(0, 0, nom[0])
        B = point(5, 0, nom[1])
        C = point(2.5, 2.5 * tan(a), nom[2])
        pol = polygoneAvecNom(A, B, C)

        objets = []
        if (a > 60) {
          xmin = Math.min(A.x, B.x, C.x) - 2
          ymin = Math.min(A.y, B.y, C.y) - 2
          xmax = Math.max(A.x, B.x, C.x) + 2
          ymax = Math.max(A.y, B.y, C.y) + 2
          objets.push(pol[0], pol[1])
          objets.push(afficheMesureAngle(B, A, C, 'black', 1), codageSegments('||', 'blue', C, A, C, B))
          this.question = `Quelle est la mesure en degré de l'angle $\\widehat{${nom[2]}}$ ? <br>
        `
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 10, mainlevee: false, amplitude: 0.3, scale: 0.5, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: ' °' }
          this.correction = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
        Ainsi $\\widehat{${nom[2]}}=180°-2\\times ${a}°=${texNombre(180 - 2 * a)}°$
    <br>`
          this.reponse = calcul(180 - 2 * a)
        } else {
          xmin = Math.min(A.x, B.x, C.x) - 1
          ymin = Math.min(A.y, B.y, C.y) - 1.5
          xmax = Math.max(A.x, B.x, C.x) + 1
          ymax = Math.max(A.y, B.y, C.y) + 1.5
          objets.push(pol[0], pol[1])
          objets.push(afficheMesureAngle(B, A, C, 'black', 1), codageSegments('||', 'blue', C, A, C, B))
          this.question = `Quelle est la mesure en degré de l'angle $\\widehat{${nom[2]}}$ ? <br>
            `
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.3, scale: 0.3, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: ' °' }
          this.correction = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
            Ainsi $\\widehat{${nom[2]}}=180°-2\\times ${a}°=${texNombre(180 - 2 * a)}°$
        <br>`
          this.reponse = calcul(180 - 2 * a)
        }
        break
      case 'b':
        nom = creerNomDePolygone(3, ['QD'])
        a = randint(4, 16, 12) * 5
        A = point(0, 0, nom[0])
        B = point(5, 0, nom[1])
        C = point(2.5, 2.5 * tan(a), nom[2])
        pol = polygoneAvecNom(A, B, C)
        objets = []
        if (a > 60) {
          xmin = Math.min(A.x, B.x, C.x) - 2
          ymin = Math.min(A.y, B.y, C.y) - 2
          xmax = Math.max(A.x, B.x, C.x) + 2
          ymax = Math.max(A.y, B.y, C.y) + 3
          objets.push(pol[0], pol[1])
          objets.push(afficheMesureAngle(A, C, B, 'black', 2.5), codageSegments('||', 'blue', C, A, C, B))
          this.question = `Quelle est la mesure en degré de l'angle $\\widehat{${nom[1]}}$ ?<br> 
            `
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 10, mainlevee: false, amplitude: 0.3, scale: 0.3, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: ' °' }
          this.correction = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
          Ainsi $\\widehat{${nom[1]}}=(180-${(180 - 2 * a)})\\div 2=${texNombre(a)}$.
      <br>`
          this.reponse = a
        } else {
          xmin = Math.min(A.x, B.x, C.x) - 1
          ymin = Math.min(A.y, B.y, C.y) - 1
          xmax = Math.max(A.x, B.x, C.x) + 1
          ymax = Math.max(A.y, B.y, C.y) + 1
          objets.push(pol[0], pol[1])
          objets.push(afficheMesureAngle(A, C, B, 'black', 0.4), codageSegments('||', 'blue', C, A, C, B))
          this.question = `Quelle est la mesure en degré de l'angle $\\widehat{${nom[1]}}$ ?<br> 
              `
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 35, mainlevee: false, amplitude: 0.3, scale: 0.3, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: ' °' }
          this.correction = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
          Ainsi $\\widehat{${nom[1]}}=(180-${(180 - 2 * a)})\\div 2=${texNombre(a)}$.
      <br>`
          this.reponse = a
        }
        break
    }
  }
}
