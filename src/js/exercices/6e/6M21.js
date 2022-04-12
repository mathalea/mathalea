import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint } from '../../modules/outils.js'
import { afficheLongueurSegment, mathalea2d, point, polygone, segment } from '../../modules/2d.js'
export const titre = 'Puissances de 10 et préfixes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '12/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Aire d'assemblage de rectangles
 * @author Rémi Angot
 * Référence 6M21
*/
export default class PuissancesEtPrefixe extends Exercice {
  constructor () {
    super()
    this.consigne = 'Calculer l\'aire grisée.'
    this.nbQuestions = 2
    this.nbCols = 1
    this.nbColsCorr = 1
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const typesFigure = [1]
    const typeDeQuestions = combinaisonListes(typesFigure, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (typeDeQuestions[i] === 1) {
        const L = randint(5, 7)
        const l = randint(3, 5)
        const l2 = randint(1, 2)
        const A = point(0, 0)
        const B = point(L, 0)
        const C = point(L, l + l2)
        const D = point(L - l2, l + l2)
        const E = point(L - l2, l)
        const F = point(0, l)
        const G = point(L, l)
        const p = polygone(A, B, C, D, E, F)
        p.couleurDeRemplissage = 'gray'
        p.opaciteDeRemplissage = 0.2
        const sCorr = segment(E, G)
        sCorr.pointilles = true
        const c1 = afficheLongueurSegment(B, A)
        const c2 = afficheLongueurSegment(C, B)
        const c22 = afficheLongueurSegment(C, G)
        const c3 = afficheLongueurSegment(D, C)
        const c4 = afficheLongueurSegment(A, F)
        texte = mathalea2d({ xmin: -1, ymin: -1, xmax: L + 2, ymax: l + l2 + 1 }, p, c1, c2, c3, c4)
        texteCorr = mathalea2d({ xmin: -1, ymin: -1, xmax: L + 2, ymax: l + l2 + 1 }, p, c1, c22, c3, c4, sCorr)
        texteCorr += `$\\mathcal{A} = ${L}~\\text{cm} \\times ${l}~\\text{cm} + ${l2}~\\text{cm} \\times ${l2}~\\text{cm}= ${L * l}~\\text{cm}^2 + ${l2 * l2}~\\text{cm}^2 = ${L * l + l2 * l2}~\\text{cm}^2$`
      }
      if (this.questionJamaisPosee(i, i)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
