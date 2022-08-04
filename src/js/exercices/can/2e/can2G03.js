import Exercice from '../../Exercice.js'
import { randint, choice, calcul, creerNomDePolygone, texNombrec } from '../../../modules/outils.js'
import {
  mathalea2d, point, texteParPosition, pointAdistance, polygoneAvecNom, milieu, codageAngleDroit, similitude
} from '../../../modules/2d.js'
export const titre = 'Calculer l’hypoténuse avec le théorème de Pythagore'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2G03
 * Date de publication septembre 2021
*/
export default function CalculHypotenusePythagore () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  let a, b
  this.nouvelleVersion = function () {
    const nom = creerNomDePolygone(3, ['QD'])
    a = randint(2, 7)//
    b = randint(3, 7)//
    const A = point(0, 0, nom[0])
    const B = pointAdistance(A, a, randint(0, 45), nom[1])
    const C = similitude(A, B, 90, b / a, nom[2])
    const pol = polygoneAvecNom(A, B, C) // polygoneAvecNom s'occupe du placement des noms des sommets
    const objets = []
    const xmin = Math.min(A.x, B.x, C.x) - 1
    const ymin = Math.min(A.y, B.y, C.y) - 1
    const xmax = Math.max(A.x, B.x, C.x) + 1
    const ymax = Math.max(A.y, B.y, C.y) + 1
    switch (choice(['a', 'b'])) {
      case 'a':
        objets.push(pol[0], pol[1], codageAngleDroit(A, B, C)) // pol[0], c'est le tracé et pol[1] ce sont les labels
        objets.push(texteParPosition('x', milieu(A, C).x, milieu(A, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
          texteParPosition(`${texNombrec(a)}`, milieu(A, B).x, milieu(A, B).y + 0.2, 'milieu', 'black', 1, 'middle', true),
          texteParPosition(`${texNombrec(b)}`, milieu(B, C).x + 0.2, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true)
        )
        this.question = 'Sur cette figure $x=\\sqrt{a}$ avec $a=$<br>'
        this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 22, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)
        this.correction = ` En utilisant le théorème de Pythagore, on a :<br>
        $${nom[0]}${nom[1]}^2+${nom[1]}${nom[2]}^2=${nom[0]}${nom[2]}^2$, soit
        $${a}^2+${b}^2=x^2$, d'où $x=\\sqrt{${a}^2+${b}^2}=\\sqrt{${a ** 2 + b ** 2}}$
       <br>
       Ainsi, $a=${a ** 2 + b ** 2}$.`
        this.reponse = calcul(a ** 2 + b ** 2)
        break
      case 'b':
        a = randint(1, 10)//
        b = randint(2, 10, [4, 9])//
        if (a ** 2 + b === 9 || a ** 2 + b === 16 || a ** 2 + b === 25 || a ** 2 + b === 36 || a ** 2 + b === 49) {
          this.question = `$${nom[0]}${nom[1]}${nom[2]}$ est un triangle rectangle en $${nom[0]}$.<br>
        $${nom[0]}${nom[1]}=${a}$ ; $${nom[0]}${nom[2]}=\\sqrt{${b}}$. Calculer $${nom[1]}${nom[2]}$ .<br>
        (donner le résultat sous la forme $\\sqrt{a}$ ou d'un nombre entier le cas échéant)`
          this.correction = ` En utilisant le théorème de Pythagore dans $${nom[0]}${nom[1]}${nom[2]}$ rectangle en $${nom[0]}$, on obtient :<br>
               $${nom[0]}${nom[1]}^2+${nom[0]}${nom[2]}^2=${nom[1]}${nom[2]}^2$, <br>
               soit $${a}^2+\\sqrt{${b}}^2=${nom[1]}${nom[2]}^2$, d'où $${nom[1]}${nom[2]}^2=${a * a + b}$ soit $${nom[1]}${nom[2]}=\\sqrt{${a * a + b}}=${Math.sqrt(a * a + b)}$.
             <br>`
          this.reponse = calcul(Math.sqrt(a ** 2 + b))
        } else {
          this.question = `$${nom[0]}${nom[1]}${nom[2]}$ est un triangle rectangle en $${nom[0]}$.<br>
          $${nom[0]}${nom[1]}=${a}$ ; $${nom[0]}${nom[2]}=\\sqrt{${b}}$. Calculer $${nom[1]}${nom[2]}$ .<br>
          (donner le résultat sous la forme $\\sqrt{a}$ ou d'un nombre entier le cas échéant)`
          this.correction = ` En utilisant le théorème de Pythagore dans $${nom[0]}${nom[1]}${nom[2]}$ rectangle en $${nom[0]}$, on obtient :<br>
                 $${nom[0]}${nom[1]}^2+${nom[0]}${nom[2]}^2=${nom[1]}${nom[2]}^2$, <br>
                 soit $${a}^2+\\sqrt{${b}}^2=${nom[1]}${nom[2]}^2$, d'où $${nom[1]}${nom[2]}^2=${a * a + b}$ soit $${nom[1]}${nom[2]}=\\sqrt{${a * a + b}}$.
               <br>`
          this.reponse = `\\sqrt{${a ** 2 + b}}`
        }
        break
    }
  }
}
