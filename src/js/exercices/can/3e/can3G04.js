import { milieu } from '../../../modules/2d/barycentre.js'
import { point } from '../../../modules/2d/point.js'
import { polygoneAvecNom } from '../../../modules/2d/polygone.js'
import { segment } from '../../../modules/2d/segment.js'
import { texteParPosition } from '../../../modules/2d/textes.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { choice } from '../../../modules/outils/arrays.js'
import { randint } from '../../../modules/outils/entiers.js'
import { creerNomDePolygone } from '../../../modules/outils/strings.js'
import { texNombrec } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Rechercher une valeur avec le théorème de Pythagore'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can3G04
 * Date de publication sptembre 2021
*/
export const uuid = '85416'
export const ref = 'can3G04'
export default function RechercheValeurPythagore () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, A, B, C, objets, nom, pol

    switch (choice(['a', 'b'])) {
      case 'a':
        nom = creerNomDePolygone(3, ['QD'])
        a = randint(1, 5) * 2//
        A = point(0, 0, nom[0])
        B = point(4, 0, nom[1])
        C = point(1.58, 3.7, nom[2])
        pol = polygoneAvecNom(A, B, C)
        objets = []
        objets.push(segment(A, B), segment(B, C), segment(A, C))
        objets.push(pol[0], pol[1])
        objets.push(texteParPosition(`${texNombrec(a)}`, milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true),
          texteParPosition('x', milieu(A, C).x - 0.5, milieu(A, C).y, 'milieu', 'black', 1, 'middle', true),
          texteParPosition('x', milieu(A, B).x, milieu(A, B).y - 0.5, 'milieu', 'black', 1, 'middle', true))
        this.question = `Déterminer $x$ pour que le triangle soit rectangle.<br>

      (donner le résultat sous la forme $\\sqrt{a}$)<br>
      `
        this.question += mathalea2d({ xmin: -1, ymin: -1, xmax: 6, ymax: 5, pixelsParCm: 25, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)
        this.correction = ` Le plus grand côté est $${a}$ (autrement il y aurait deux hypoténuses). On cherche $x$ tel que $x^2+x^2=${a}^2$, soit $2x^2=${a * a}$.<br>
      En divisant par $2$ chacun des membres, on obtient : $x^2=${a * a / 2}$.<br>
      Comme la valeur de $x$ cherchée est positive, on a  $x=\\sqrt{${texNombrec(a ** 2 / 2)}}$.
  <br>`

        this.reponse = [`\\sqrt{${a ** 2 / 2}}`, `${Math.sqrt(a ** 2 / 2)}`]
        break
      case 'b':
        nom = creerNomDePolygone(3, ['QD'])
        a = choice([8, 18, 32, 50, 72, 98, 128, 162, 200])
        A = point(0, 0, nom[0])
        B = point(4, 0, nom[1])
        C = point(1.58, 3.7, nom[2])
        pol = polygoneAvecNom(A, B, C)
        objets = []
        objets.push(pol[0], pol[1])
        objets.push(segment(A, B), segment(B, C), segment(A, C))
        objets.push(texteParPosition(`$\\tiny{\\sqrt{${a}}}$`, milieu(B, C).x + 0.8 + 0, milieu(B, C).y + 1),
          texteParPosition('x', milieu(A, C).x - 0.5, milieu(A, C).y, 'milieu', 'black', 1, 'middle', true),
          texteParPosition('x', milieu(A, B).x, milieu(A, B).y - 0.5, 'milieu', 'black', 1, 'middle', true))

        this.question = `Déterminer $x$ pour que le triangle soit rectangle.<br>
        `
        this.question += mathalea2d({ xmin: -1, ymin: -1, xmax: 6, ymax: 5, pixelsParCm: 22, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)
        this.correction = ` Le plus grand côté est $\\sqrt{${a}}$ (autrement il y aurait deux hypoténuses).
        On cherche $x$ tel que $x^2+x^2=\\sqrt{${a}}^2$, soit $2x^2=${a}$.<br>
      En divisant par $2$ chacun des membres, on obtient : $x^2=${a / 2}$.<br>
      Comme la valeur de $x$ cherchée est positive, on a  $x=\\sqrt{${texNombrec(a / 2)}}=${Math.sqrt(a / 2)}$.
  `

        this.reponse = [Math.sqrt(a / 2), `\\sqrt{${a / 2}}`]
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = '$x=\\ldots$'
  }
}
