import Exercice from '../../Exercice.js'
import { randint, creerNomDePolygone, texNombrec, texteEnCouleur } from '../../../modules/outils.js'
import {
  mathalea2d, point, latexParCoordonnees, pointAdistance, longueur, polygoneAvecNom, milieu, codageAngleDroit
} from '../../../modules/2d.js'
export const titre = 'Calcul d’un côté avec Pythagore'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can4G04
 * Date de publication sptembre 2021
*/
export default function CalculCotePythagore () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.interactif = true
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const nom = creerNomDePolygone(3, ['Q'])
    const a = randint(1, 5)//
    const b = randint(6, 10)//

    const A = point(0, 0, nom[0])
    const B = pointAdistance(A, a, 0, nom[1])
    const C = pointAdistance(B, Math.sqrt(b ** 2 - a ** 2), 90, nom[2])
    const pol = polygoneAvecNom(A, B, C) // polygoneAvecNom s'occupe du placement des noms des sommets
    console.log('AB : ', a, '  BC : ', b, '  AC : ', longueur(A, C))
    const objets = []
    const xmin = Math.min(A.x, B.x, C.x) - 1
    const ymin = Math.min(A.y, B.y, C.y) - 1
    const xmax = Math.max(A.x, B.x, C.x) + 1
    const ymax = Math.max(A.y, B.y, C.y) + 1

    objets.push(pol[0], pol[1], codageAngleDroit(A, B, C)) // pol[0], c'est le tracé et pol[1] ce sont les labels
    objets.push(latexParCoordonnees(`${texNombrec(b)}`, milieu(A, C).x - 0.2, milieu(A, C).y + 0.3, 'black', 20, 10, ''),
      latexParCoordonnees(`${texNombrec(a)}`, milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, '')
    )
    this.question = `Sur cette figure, déterminer la valeur exacte de $${nom[1]}${nom[2]}$.<br>`
    this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.3, scale: 0.7 }, objets)
    this.correction = ` On utilise le théorème de Pythagore dans le triangle $${nom[0]}${nom[1]}${nom[2]}$,  rectangle en $${nom[1]}$.<br>
      On obtient :<br>
      $\\begin{aligned}
        ${nom[0]}${nom[1]}^2+${nom[1]}${nom[2]}^2&=${nom[0]}${nom[2]}^2\\\\
        ${nom[1]}${nom[2]}^2&=${nom[0]}${nom[2]}^2-${nom[0]}${nom[1]}^2\\\\
        ${nom[1]}${nom[2]}^2&=${b}^2-${a}^2\\\\
        ${nom[1]}${nom[2]}^2&=${b ** 2}-${a ** 2}\\\\
        ${nom[1]}${nom[2]}^2&=${b ** 2 - a ** 2}\\\\
        ${nom[1]}${nom[2]}&=\\sqrt{${b ** 2 - a ** 2}}
        \\end{aligned}$
        `
    // this.reponse = calcul(b ** 2 - a ** 2)
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    La longueur $${nom[1]}${nom[2]}$ est donnée par la racine carrée de la différence des carrés de $${b}$ et de $${a}$.<br>
    Cette différence vaut $${b ** 2}-${a ** 2}=${b ** 2 - a ** 2}$. <br>
    La valeur cherchée est donc : $\\sqrt{${b ** 2 - a ** 2}}$.
      `)
    this.reponse = [`\\sqrt{${b ** 2 - a ** 2}}`, `${Math.sqrt(b ** 2 - a ** 2)}`]
  }
}
