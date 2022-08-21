import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, creerNomDePolygone, texNombrec, texteEnCouleur, extraireRacineCarree, texRacineCarree } from '../../../modules/outils.js'
import {
  point, pointAdistance, polygoneAvecNom, codageAngleDroit, texteParPosition, milieu
} from '../../../modules/2d.js'
export const titre = 'Calculer un côté avec le théorème de Pythagore'
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
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const nom = creerNomDePolygone(3, ['QD'])
    const a = randint(2, 5)//
    const b = randint(6, 10)//
    const c2 = b ** 2 - a ** 2
    const A = point(0, 0, nom[0])
    const B = pointAdistance(A, a, -90, nom[1])
    const C = pointAdistance(B, Math.sqrt(c2), 0, nom[2])
    const pol = polygoneAvecNom(A, B, C) // polygoneAvecNom s'occupe du placement des noms des sommets
    const objets = []
    const xmin = Math.min(A.x, B.x, C.x) - 1
    const ymin = Math.min(A.y, B.y, C.y) - 1
    const xmax = Math.max(A.x, B.x, C.x) + 1
    const ymax = Math.max(A.y, B.y, C.y) + 1

    const reduction = extraireRacineCarree(c2)
    const reductible = (reduction[0] !== 1)

    objets.push(pol[0], pol[1], codageAngleDroit(A, B, C)) // pol[0], c'est le tracé et pol[1] ce sont les labels
    // texteParPosition(`${texNombrec(a)}`, milieu(C, A).x, milieu(A, B).y + 0.2, 'milieu', 'black', 1, 'middle', true)
    objets.push(texteParPosition(`${texNombrec(b)}`, milieu(C, A).x, milieu(C, A).y + 0.4, 'milieu', 'black', 1, 'middle', true),
      texteParPosition(`${texNombrec(a)}`, milieu(B, A).x - 0.3, milieu(B, A).y + 0.2, 'milieu', 'black', 1, 'middle', true)
    )
    // objets.push(latexParPoint(`${texNombrec(b)}`, similitude(C, A, 4, 0.5, '', 'center'), 'black', 20, 10, ''),
    //  latexParPoint(`${texNombrec(a)}`, similitude(B, A, -10, 0.5, '', 'center'), 'black', 20, 10, '')
    // )
    this.question = `Sur cette figure, déterminer la valeur exacte de $${nom[1]}${nom[2]}$.<br>`
    this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 25, mainlevee: false, amplitude: 0.3, scale: 0.5, style: 'margin: auto' }, objets)
    this.correction = ` On utilise le théorème de Pythagore dans le triangle $${nom[0]}${nom[1]}${nom[2]}$,  rectangle en $${nom[1]}$.<br>
      On obtient :<br>
      $\\begin{aligned}\n
        ${nom[0]}${nom[1]}^2+${nom[1]}${nom[2]}^2&=${nom[0]}${nom[2]}^2\\\\\n
        ${nom[1]}${nom[2]}^2&=${nom[0]}${nom[2]}^2-${nom[0]}${nom[1]}^2\\\\\n
        ${nom[1]}${nom[2]}^2&=${b}^2-${a}^2\\\\\n
        ${nom[1]}${nom[2]}^2&=${b ** 2}-${a ** 2}\\\\\n
        ${nom[1]}${nom[2]}^2&=${c2}\\\\\n
        ${nom[1]}${nom[2]}&=\\sqrt{${c2}}
        ${reductible ? '\\\\\n' + nom[1] + nom[2] + '&=' + texRacineCarree(c2) : ''}
        \n\\end{aligned}$
        `
    // this.reponse = calcul(b ** 2 - a ** 2)
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    La longueur $${nom[1]}${nom[2]}$ est donnée par la racine carrée de la différence des carrés de $${b}$ et de $${a}$.<br>
    Cette différence vaut $${b ** 2}-${a ** 2}=${c2}$. <br>
    La valeur cherchée est donc : $\\sqrt{${c2}}${reductible ? '=' + texRacineCarree(c2) : ''}$.`)
    this.reponse = [`\\sqrt{${c2}}`, `${Math.sqrt(c2)}`, texRacineCarree(c2)]
  }
}
