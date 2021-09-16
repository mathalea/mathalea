import Exercice from '../Exercice.js'
import { randint, choice, texNombrec, creerNomDePolygone } from '../../modules/outils.js'
import {
  mathalea2d, point, segment, latexParCoordonnees, milieu, polygoneAvecNom
} from '../../modules/2d.js'
export const titre = 'Recherche valeur avec Pythagore'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function RechercheValeurPythagore () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, A, B, C, objets, nom, pol

    switch (choice(['a', 'b'])) {
      case 'a':
        nom = creerNomDePolygone(3, ['Q'])
        a = randint(1, 5) * 2//
        A = point(0, 0, nom[0])
        B = point(4, 0, nom[1])
        C = point(1.58, 3.7, nom[2])
        pol = polygoneAvecNom(A, B, C)
        objets = []
        objets.push(segment(A, B), segment(B, C), segment(A, C))
        objets.push(pol[0], pol[1])
        objets.push(latexParCoordonnees(`${texNombrec(a)}`, milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'black', 20, 10, ''),
          latexParCoordonnees('x', milieu(A, C).x - 0.5, milieu(A, C).y, 'black', 20, 10, ''),
          latexParCoordonnees('x', milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''))
        this.question = `Déterminer $x$ pour que le triangle soit rectangle.<br>
      (donner le résultat sous la forme $\\sqrt{a}$)`
        this.question += mathalea2d({ xmin: -1, ymin: -1, xmax: 6, ymax: 5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
        this.correction = ` Le plus grand côté est $${a}$ (autrement il y aurait deux hypoténuses). On cherche $x$ tel que $x^2+x^2=${a}^2$, soit $2x^2=${a * a}$.<br>
      En divisant par $2$ chacun des membres, on obtient : $x^2=${a * a / 2}$.<br>
      Comme la valeur de $x$ cherchée est positive, on a  $x=\\sqrt{${texNombrec(a ** 2 / 2)}}$.
  <br>`

        this.reponse = `\\sqrt{${a ** 2 / 2}}`
        break
      case 'b':
        nom = creerNomDePolygone(3, ['Q'])
        a = choice([8, 18, 32, 50, 72, 98, 128, 162, 200])
        A = point(0, 0, nom[0])
        B = point(4, 0, nom[1])
        C = point(1.58, 3.7, nom[2])
        pol = polygoneAvecNom(A, B, C)
        objets = []
        objets.push(pol[0], pol[1])
        objets.push(segment(A, B), segment(B, C), segment(A, C))
        objets.push(latexParCoordonnees(`\\sqrt{${a}}`, milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'black', 20, 10, ''),
          latexParCoordonnees('x', milieu(A, C).x - 0.5, milieu(A, C).y, 'black', 20, 10, ''),
          latexParCoordonnees('x', milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''))

        this.question = 'Déterminer $x$ pour que le triangle soit rectangle.'
        this.question += mathalea2d({ xmin: -1, ymin: -1, xmax: 6, ymax: 5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
        this.correction = ` Le plus grand côté est $\\sqrt{${a}}$ (autrement il y aurait deux hypoténuses).
        On cherche $x$ tel que $x^2+x^2=\\sqrt{${a}}^2$, soit $2x^2=${a}$.<br>
      En divisant par $2$ chacun des membres, on obtient : $x^2=${a / 2}$.<br>
      Comme la valeur de $x$ cherchée est positive, on a  $x=\\sqrt{${texNombrec(a / 2)}}=${Math.sqrt(a / 2)}$.
  `

        this.reponse = Math.sqrt(a / 2)
        break
    }
  }
}
