import { calcul, creerNomDePolygone, randint, texNombrec, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
import {
  mathalea2d, tracePoint, point, milieu, texteParPosition, pointAdistance, longueur, cercle, pointIntersectionCC, polygoneAvecNom
} from '../../../modules/2d.js'
export const titre = 'Calculer le périmètre dune figure'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6M06
 */
export default function Perimetre () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1

  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const nom = creerNomDePolygone(4, ['QD'])
    const a = randint(3, 6)//
    const c = randint(3, 5) + randint(3, 9) / 10
    const A = point(0, 0, nom[0])
    const B = pointAdistance(A, c, 0, nom[1])
    const C = pointAdistance(B, a, randint(7, 11) * 10, nom[2])
    const l = Math.ceil(longueur(A, C) + 1)
    const b = Math.floor(l / 2)
    const d = calcul(l - b - c + Math.floor(c))
    const c1 = cercle(C, d)
    const c2 = cercle(A, b)
    const D = pointIntersectionCC(c1, c2, nom[3], 1)
    if (!D) alert('Pas de point D')
    const objets = []
    const xmin = Math.min(A.x, B.x, C.x, D.x) - 1
    const ymin = Math.min(A.y, B.y, C.y, D.y) - 1
    const xmax = Math.max(A.x, B.x, C.x, D.x) + 1
    const ymax = Math.max(A.y, B.y, C.y, D.y) + 1
    const pol = polygoneAvecNom(A, B, C, D) // polygoneAvecNom s'occupe du placement des noms des sommets

    objets.push(pol[0], pol[1], tracePoint(A, B, C, D)) // pol[0], c'est le tracé et pol[1] ce sont les labels
    objets.push(texteParPosition(`$${texNombrec(b)}\\text{m}$`, milieu(A, D).x - 0.5, milieu(A, D).y, 'milieu', 'black', 1, 'middle', true),
      texteParPosition(`$${texNombrec(a)}\\text{m}$`, milieu(B, C).x + 0.5, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true),
      texteParPosition(`$${texNombrec(c)}\\text{m}$`, milieu(A, B).x, milieu(A, B).y - 0.5, 'milieu', 'black', 1, 'middle', true),
      texteParPosition(`$${texNombrec(d)}\\text{m}$`, milieu(C, D).x, milieu(C, D).y + 0.5, 'milieu', 'black', 1, 'middle', true))

    this.question = `Quel est le périmètre de ce quadrilatère $${nom}$ ?<br>` +
     mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, mainlevee: true, amplitude: 0.5, scale: 0.5, style: 'margin: auto' }, objets)
    this.reponse = a + b + c + d
    this.correction = ` Le périmètre est : $${texNombrec(a + b + c + d)}$ m.`
    this.optionsChampTexte = { texteApres: ' m' }
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
   On doit calculer la somme des valeurs. On regroupe pour faciliter le calcul : <br>
   $\\underbrace{${texNombrec(a)}+${texNombrec(b)}}_{${texNombrec(a + b)}}+\\underbrace{${texNombrec(c)}+${texNombrec(d)}}_{${texNombrec(c + d)}}=${texNombrec(a + b + c + d)}$ m.`)
  }
}
