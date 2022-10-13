import { afficheLongueurSegment, codageAngleDroit } from '../../../modules/2d/codages.js'
import { point } from '../../../modules/2d/point.js'
import { pointAdistance } from '../../../modules/2d/pointSur.js'
import { polygoneAvecNom } from '../../../modules/2d/polygone.js'
import { segment } from '../../../modules/2d/segment.js'
import { rotation, similitude } from '../../../modules/2d/transformations.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { choice } from '../../../modules/outils/arrays.js'
import { randint } from '../../../modules/outils/entiers.js'
import { creerNomDePolygone } from '../../../modules/outils/strings.js'
import Exercice from '../../Exercice.js'
export const titre = 'Utiliser la trigonométrie'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can3G05
 * Date de publication
*/
export const uuid = 'c6b9c'
export const ref = 'can3G05'
export default function Trigo () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const listeTriplet = [
      [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 35, 37], [9, 40, 41], [11, 60, 61]
    ] // triplets Pythagore
    const triplet = choice(listeTriplet)
    const nom = creerNomDePolygone(3, ['QD'])
    const a = triplet[0]
    const b = triplet[1]
    const c = triplet[2]
    const A = point(0, 0, nom[0])
    const alpha = randint(0, 135)
    const B = rotation(pointAdistance(A, a, 0), A, alpha, nom[1])
    const C = similitude(A, B, 90, b / a, nom[2])
    const pol = polygoneAvecNom(A, B, C)
    const xmin = Math.min(A.x, B.x, C.x) - 0.1 * c
    const ymin = Math.min(A.y, B.y, C.y) - 0.1 * c
    const xmax = Math.max(A.x, B.x, C.x) + 0.1 * c
    const ymax = Math.max(A.y, B.y, C.y) + 0.1 * c
    const objets = []
    objets.push(segment(A, B), segment(B, C), segment(A, C), codageAngleDroit(A, B, C))
    objets.push(afficheLongueurSegment(A, B, 'black', 0.5, ''), afficheLongueurSegment(B, C, 'black', 0.5, ''), afficheLongueurSegment(C, A, 'black', 0.5, ''))
    objets.push(pol[0], pol[1])
    switch (choice(['a', 'b', 'c', 'd', 'e', 'f'])) { //, 'b'
      case 'a':

        this.question = `$\\cos\\widehat{${nom[2]}}=$<br>
        (Sous forme d'une fraction irréductible)<br>`
        this.question += mathalea2d({
          xmin: xmin,
          ymin: ymin,
          xmax: xmax,
          ymax: ymax,
          pixelsParCm: 170 / c,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.7,
          style: 'margin: auto'
        }, objets)
        this.correction = ` Dans le triangle $${nom[0]}${nom[1]}${nom[2]}$ rectangle en $${nom[1]}$, on a : <br>
        $\\cos\\widehat{${nom[2]}}=\\dfrac{\\text{Côté adjacent à } \\widehat{${nom[2]}}}{\\text{Hypoténuse}}=\\dfrac{${b}}{${c}}.$
      <br>`

        this.reponse = `\\dfrac{${b}}{${c}}`
        break
      case 'b':

        this.question = `$\\sin\\widehat{${nom[2]}}=$<br>
        (Sous forme d'une fraction irréductible)<br>`
        this.question += mathalea2d({
          xmin: xmin,
          ymin: ymin,
          xmax: xmax,
          ymax: ymax,
          pixelsParCm: 170 / c,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.7,
          style: 'margin: auto'
        }, objets)
        this.correction = ` Dans le triangle $${nom[0]}${nom[1]}${nom[2]}$ rectangle en $${nom[1]}$, on a : <br>
        $\\sin\\widehat{${nom[2]}}=\\dfrac{\\text{Côté opposé à } \\widehat{${nom[2]}}}{\\text{Hypoténuse}}=\\dfrac{${a}}{${c}}.$
      <br>`

        this.reponse = `\\dfrac{${a}}{${c}}`
        break
      case 'c':

        this.question = `$\\tan\\widehat{${nom[2]}}=$<br>
        (Sous forme d'une fraction irréductible)<br>`
        this.question += mathalea2d({
          xmin: xmin,
          ymin: ymin,
          xmax: xmax,
          ymax: ymax,
          pixelsParCm: 170 / c,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.7,
          style: 'margin: auto'
        }, objets)
        this.correction = ` Dans le triangle $${nom[0]}${nom[1]}${nom[2]}$ rectangle en $${nom[1]}$, on a : <br>
        $\\tan\\widehat{${nom[2]}}=\\dfrac{\\text{Côté opposé à } \\widehat{${nom[2]}}}{\\text{Côté adjacent à } \\widehat{${nom[2]}}}=\\dfrac{${a}}{${b}}.$
      <br>`

        this.reponse = `\\dfrac{${a}}{${b}}`
        break
      case 'd':

        this.question = `$\\cos\\widehat{${nom[0]}}=$<br>
        (Sous forme d'une fraction irréductible)<br>`
        this.question += mathalea2d({
          xmin: xmin,
          ymin: ymin,
          xmax: xmax,
          ymax: ymax,
          pixelsParCm: 170 / c,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.7,
          style: 'margin: auto'
        }, objets)
        this.correction = ` Dans le triangle $${nom[0]}${nom[1]}${nom[2]}$ rectangle en $${nom[1]}$, on a : <br>
        $\\cos\\widehat{${nom[0]}}=\\dfrac{\\text{Côté adjacent à } \\widehat{${nom[0]}}}{\\text{Hypoténuse}}=\\dfrac{${a}}{${c}}.$
      <br>`

        this.reponse = `\\dfrac{${a}}{${c}}`
        break
      case 'e':

        this.question = `$\\sin\\widehat{${nom[0]}}=$<br>
        (Sous forme d'une fraction irréductible)<br>`
        this.question += mathalea2d({
          xmin: xmin,
          ymin: ymin,
          xmax: xmax,
          ymax: ymax,
          pixelsParCm: 170 / c,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.7,
          style: 'margin: auto'
        }, objets)
        this.correction = ` Dans le triangle $${nom[0]}${nom[1]}${nom[2]}$ rectangle en $${nom[1]}$, on a :<br> 
        $\\sin\\widehat{${nom[0]}}=\\dfrac{\\text{Côté opposé à } \\widehat{${nom[0]}}}{\\text{Hypoténuse}}=\\dfrac{${b}}{${c}}.$
      <br>`

        this.reponse = `\\dfrac{${b}}{${c}}`
        break
      case 'f':

        this.question = `$\\tan\\widehat{${nom[0]}}=$<br>
        (Sous forme d'une fraction irréductible)<br>`
        this.question += mathalea2d({
          xmin: xmin,
          ymin: ymin,
          xmax: xmax,
          ymax: ymax,
          pixelsParCm: 170 / c,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.7,
          style: 'margin: auto'
        }, objets)
        this.correction = ` Dans le triangle $${nom[0]}${nom[1]}${nom[2]}$ rectangle en $${nom[0]}$, on a : <br>
        $\\tan\\widehat{${nom[0]}}=\\dfrac{\\text{Côté opposé à } \\widehat{${nom[0]}}}{\\text{Côté adjacent à } \\widehat{${nom[0]}}}=\\dfrac{${b}}{${a}}.$
      <br>`

        this.reponse = `\\dfrac{${b}}{${a}}`
        break
    }
  }
}
