import Exercice from '../../Exercice.js'
import { randint, choice, creerNomDePolygone } from '../../../modules/outils.js'
import { afficheLongueurSegment, codeAngle, mathalea2d, point, pointAdistance, polygoneAvecNom } from '../../../modules/2d.js'
export const titre = 'Calcul d’une longueur d’un côté avec Pythagore '
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4G01
*/
export default function LongueurPythagore () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const triplet = choice([
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
      [9, 12, 15],
      [12, 16, 20],
      [15, 20, 25],
      [18, 24, 30]
    ])
    const nom = creerNomDePolygone(3, 'Q')
    const A = point(0, 0, nom[0])
    const B = pointAdistance(A, triplet[1], 0, nom[1]) // triplet[1] sera la longueur c
    const C = pointAdistance(B, triplet[0], 90, nom[2]) // triplet[0] sera la longueur a
    const pol = polygoneAvecNom(A, B, C) // donc triplet[2] sera la longueur b
    const lc = afficheLongueurSegment(B, A)
    const la = afficheLongueurSegment(C, B)
    const lb = afficheLongueurSegment(A, C)
    const [a, b, c] = triplet
    const objets = []
    switch (randint(0, 2)) {
      case 0:
        objets.push(pol[0], pol[1], la, lb, codeAngle(A, B, C))
        this.question = mathalea2d({ xmin: -2, xmax: B.x + 2, ymin: -2, ymax: C.y + 2, pixelsParCm: 10 * b / (B.x + 4), scale: 6 * b / (B.x + 4) }, objets) + '<br>'
        this.question += `Calculer la longueur $${nom[0]}${nom[1]}$.`
        this.correction = `$${nom[0]}${nom[1]}^2=${nom[0]}${nom[2]}^2-${nom[1]}${nom[2]}^2$, soit $${nom[0]}${nom[1]}^2=${c}^2-${a}^2=${c ** 2}-${a ** 2}=${c ** 2 - a ** 2}$.<br>On en déduit que $${nom[0]}${nom[1]}=${b}$ cm.`
        this.reponse = b
        break
      case 1:
        objets.push(pol[0], pol[1], lc, lb, codeAngle(A, B, C))
        this.question = mathalea2d({ xmin: -2, xmax: B.x + 2, ymin: -2, ymax: C.y + 2, pixelsParCm: 10 * b / (B.x + 4), scale: 6 * b / (B.x + 4) }, objets) + '<br>'
        this.question += `Calculer la longueur $${nom[1]}${nom[2]}$.`
        this.correction = `$${nom[1]}${nom[2]}^2=${nom[0]}${nom[2]}^2-${nom[0]}${nom[1]}^2$, soit $${nom[1]}${nom[2]}^2=${c}^2-${b}^2=${c ** 2}-${b ** 2}=${c ** 2 - b ** 2}$.<br>On en déduit que $${nom[0]}${nom[1]}=${a}$ cm.`
        this.reponse = a
        break
      case 2:
        objets.push(pol[0], pol[1], la, lc, codeAngle(A, B, C))
        this.question = mathalea2d({ xmin: -2, xmax: B.x + 2, ymin: -2, ymax: C.y + 2, pixelsParCm: 10 * b / (B.x + 4), scale: 6 * b / (B.x + 4) }, objets) + '<br>'
        this.question += `Calculer la longueur $${nom[1]}${nom[2]}$.`
        this.correction = `$${nom[0]}${nom[2]}^2=${nom[0]}${nom[1]}^2+${nom[1]}${nom[2]}^2$, soit $${nom[0]}${nom[2]}^2=${b}^2+${a}^2=${b ** 2}+${a ** 2}=${a ** 2 + b ** 2}$.<br>On en déduit que $${nom[0]}${nom[2]}=${c}$ cm.`
        this.reponse = c
        break
    }
  }
}
