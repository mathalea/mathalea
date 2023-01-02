import { mathalea2d } from '../../modules/2dGeneralites.js'
import { point3d, polygone3d, pyramide3d } from '../../modules/3d.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
export const titre = 'Bonne année...'
export const interactifType = 'mathLive'
export const interactifReady = true

export const dateDePublication = '03/05/2022'

/**
 *
 * Calculer un angle à partir de figures simples
 * Ref 6G23-5
 * @author Eric Elter
 * Publié le 03/05/2021
 */
export const uuid = '8f5f5'
export const ref = 'FichierDeTests'
export default function CalculedddrUnAngle () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, paramsEnonce; i < this.nbQuestions; i++) {
      texte = ''
      texteCorr = ''
      // On prépare la figure...
      const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      const A = point3d(1, 0, 0)
      const B = point3d(4, 0, 0)
      const C = point3d(1, 6, 0)
      const D = point3d(1, 0, -5)
      const F = point3d(2, 2, 0)
      const p = polygone3d([A, C, B])
      const solide = pyramide3d(p, D, 'red', F, true, 'blue', true, false)
      // const v = vecteur3d(0, 2, 0)
      // const solide = cone3d(A, D, v, 'red', true, 'green', 'gray')
      objetsEnonce.push(solide.c2d)

      paramsEnonce = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: false, amplitude: 0.5 }
      texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)
      paramsEnonce = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 0.5 }
      texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)

      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      listeQuestionsToContenu(this)
    }
  }
}
