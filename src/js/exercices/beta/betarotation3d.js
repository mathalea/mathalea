import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2d.js'
import { point3d, polygone3d, rotation3d, droite3d } from '../../modules/3d.js'
import { texcolors } from '../../modules/outils.js'

export const titre = 'Rotation 3d de polygones'
/**
 * @author Jean-Claude Lhote
 * essais en vue de faire des animations de patrons de solides
 */
export default function betaRotation3d () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.spacing = 2
  this.nbQuestions = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const objets = []
    const O = point3d(0, 0, 0)
    const C = point3d(0, -2, 0)
    const A = point3d(0, 5, 0)
    const B = point3d(0, 0, 7)
    const P = polygone3d([C, A, B], 'black')
    const Axex = droite3d(O, point3d(1, 0, 0))
    const Axey = droite3d(O, point3d(0, 1, 0))
    const Axez = droite3d(O, point3d(0, 0, 1))
    const p = []
    Axex.p2d.isVisible = true
    Axey.p2d.isVisible = true
    Axez.p2d.isVisible = true
    for (let a = 0; a <= 360; a += 10) {
      p.push(rotation3d(P, Axey, a, texcolors(a)))
    }
    console.log(p[1].p2d)
    for (let k = 0; k < p.length; k++) {
      for (let j = 0; j < p[k].p2d.length; j++) {
        objets.push(p[k].p2d[j])
      }
    }
    objets.push(Axex.p2d, Axey.p2d, Axez.p2d)
    this.contenu = mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.7 }, objets)
  }
};
