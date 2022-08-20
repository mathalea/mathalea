import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, calcul, creerNomDePolygone, texNombrec } from '../../../modules/outils.js'
import {
  point, texteParPosition, pointAdistance, polygoneAvecNom, milieu, codageAngleDroit
} from '../../../modules/2d.js'
export const titre = 'Calculer une longueur avec le théorème de Pythagore'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2G02
 * Date de publication septembre 2021
*/
export default function CalculCotePythagore () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const nom = creerNomDePolygone(3, ['QD'])
    const a = randint(1, 5)//
    const b = randint(6, 10)//
    const A = point(0, 0, nom[0])
    const B = pointAdistance(A, a, 90, nom[1])
    const C = pointAdistance(B, Math.sqrt(b ** 2 - a ** 2), 0, nom[2])
    const pol = polygoneAvecNom(A, B, C) // polygoneAvecNom s'occupe du placement des noms des sommets
    const objets = []
    const xmin = Math.min(A.x, B.x, C.x) - 1
    const ymin = Math.min(A.y, B.y, C.y) - 1
    const xmax = Math.max(A.x, B.x, C.x) + 1
    const ymax = Math.max(A.y, B.y, C.y) + 1

    objets.push(pol[0], pol[1], codageAngleDroit(A, B, C)) // pol[0], c'est le tracé et pol[1] ce sont les labels
    objets.push(texteParPosition(`${texNombrec(b)}`, milieu(A, C).x + 0.2, milieu(A, C).y - 0.3, 'milieu', 'black', 1, 'middle', true),
      texteParPosition(`${texNombrec(a)}`, milieu(A, B).x - 0.3, milieu(A, B).y, 'milieu', 'black', 1, 'middle', true),
      texteParPosition('x', milieu(B, C).x, milieu(B, C).y + 0.3, 'milieu', 'black', 1, 'middle', true)
    )
    this.question = 'Sur cette figure $x=\\sqrt{a}$ avec $a=$<br>'
    this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 25, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)
    this.correction = ` En utilisant le théorème de Pythagore, on a :<br>
        $${nom[0]}${nom[1]}^2+${nom[1]}${nom[2]}^2=${nom[0]}${nom[2]}^2$, soit
        $${nom[1]}${nom[2]}^2=${nom[0]}${nom[2]}^2-${nom[0]}${nom[1]}^2$. <br>
        On en déduit : $x^2=${b}^2-${a}^2$, d'où $x=\\sqrt{${b}^2-${a}^2}=\\sqrt{${b ** 2 - a ** 2}}$
       <br>
       Ainsi, $a=${b ** 2 - a ** 2}$.`
    this.reponse = calcul(b ** 2 - a ** 2)
  }
}
