import { calcul, creerNomDePolygone, randint, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
import {
  mathalea2d, tracePoint, point, milieu, latexParCoordonnees, pointAdistance, longueur, cercle, pointIntersectionCC, polygoneAvecNom
} from '../../../modules/2d.js'
export const titre = 'Périmètre d’une figure'
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
  this.interactif = true
  this.formatChampTexte = 'largeur10 inline'
  this.nouvelleVersion = function () {
    const nom = creerNomDePolygone(4, ['Q'])
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
    if (!D) alert('PAs de point D')
    const objets = []
    const xmin = Math.min(A.x, B.x, C.x, D.x) - 1
    const ymin = Math.min(A.y, B.y, C.y, D.y) - 1
    const xmax = Math.max(A.x, B.x, C.x, D.x) + 1
    const ymax = Math.max(A.y, B.y, C.y, D.y) + 1
    const pol = polygoneAvecNom(A, B, C, D) // polygoneAvecNom s'occupe du placement des noms des sommets
    console.log('AB : ', c, '  BC : ', a, '  CD : ', d, '  AD : ', b, '  AC : ', longueur(A, C))

    objets.push(pol[0], pol[1], tracePoint(A, B, C, D)) // pol[0], c'est le tracé et pol[1] ce sont les labels
    objets.push(latexParCoordonnees(`${texNombrec(b)}\\text{m}`, milieu(A, D).x - 0.5, milieu(A, D).y, 'black', 20, 10, ''),
      latexParCoordonnees(`${texNombrec(a)}\\text{m}`, milieu(B, C).x + 0.5, milieu(B, C).y, 'black', 20, 10, ''),
      latexParCoordonnees(`${texNombrec(c)}\\text{m}`, milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''),
      latexParCoordonnees(`${texNombrec(d)}\\text{m}`, milieu(C, D).x, milieu(C, D).y + 0.5, 'black', 20, 10, ''))

    this.question = `Quel est le périmètre de ce quadrilatère $${nom}$ ?<br>` +
     mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: true, amplitude: 0.5, scale: 0.7 }, objets)
    this.reponse = a + b + c + d
    this.correction = ` Le périmètre est donné par : $${texNombrec(a)}+${texNombrec(b)}+${texNombrec(c)}+${texNombrec(d)}=${texNombrec(a + b + c + d)}$ cm.`
    this.optionsChampTexte = { texteApres: ' cm' }
  }
}
