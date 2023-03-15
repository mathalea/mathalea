import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choisitLettresDifferentes, texNombre } from '../../modules/outils.js'
import { point, polygoneAvecNom, droite, segment, tracePoint, labelPoint, distancePointDroite, projectionOrtho, afficheLongueurSegment, codageAngleDroit } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
export const titre = 'Mesurer la distance d\'un point à une droite'

export const dateDePublication = '01/03/2023'

/**
 * Simple exercice de mesure de distance entre un point et une droite
 * @author Guillaume Valmont
 * Référence 6G53
*/
export const uuid = '29c3b'
export const ref = '6G53'
export default class MesurerDistancePointDroite extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 1
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const objetsEnonce = []
      const objetsCorrection = []
      const O = point(0, 0)
      const B = point(randint(-4, 4, [0]), randint(-3, 4, [0]))
      const d = droite(O, B, '(d)')
      let A = point(randint(-4, 4), randint(-3, 4), choisitLettresDifferentes(1, 'OH'))
      while (distancePointDroite(A, d) < 1) {
        A = point(randint(-4, 4), randint(-3, 4), choisitLettresDifferentes(1, 'OH'))
      }
      const traceA = tracePoint(A)
      traceA.taille = context.isHtml ? 2 : 1
      objetsEnonce.push(traceA, labelPoint(A), d)
      objetsCorrection.push(traceA, d)
      const H = projectionOrtho(A, d, 'H')
      if (A.y > H.y) H.positionLabel = 'below'
      const segmentAH = segment(A, H)
      segmentAH.pointilles = 5
      const AH = polygoneAvecNom(A, H)
      objetsCorrection.push(AH[0], AH[1], afficheLongueurSegment(A, H), codageAngleDroit(A, H, B))
      const xmin = -5
      const xmax = 5
      const ymin = -4
      const ymax = 5
      const paramsEnonce = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 1 }
      texteCorr = '' + mathalea2d(paramsEnonce, objetsCorrection) + '<br>'
      texteCorr += `Pour mesurer la distance entre le point $${A.nom}$ et la droite ($d$) :<br>
      - on utilise l'équerre pour tracer la perpendiculaire à la droite ($d$)) qui passe par le point $${A.nom}$<br>
      - si on nomme $${H.nom}$ le pied de la perpendiculaire, alors la distance entre le point $${A.nom}$ et la droite ($d$) est la longueur $${A.nom + H.nom} = ${texNombre(distancePointDroite(A, d), 1)} cm$`
      texte = `Mesurer la distance entre le point $${A.nom}$ et la droite ($d$).<br>`
      texte += mathalea2d(paramsEnonce, objetsEnonce)
      if (this.questionJamaisPosee(i, A.nom)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
