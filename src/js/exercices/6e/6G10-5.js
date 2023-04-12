import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, lettreDepuisChiffre, numAlpha } from '../../modules/outils.js'
import { point, tracePoint, pointSurSegment, pointIntersectionDD, labelPoint, droite, segment, grille, seyes, demiDroite } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC
export const titre = 'Tracer des droites, segments,...'
export const dateDePublication = '05/10/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Fonction générale pour construire des segments, droites et demi-droites
 * @author Mickael Guironnet
 */

export const uuid = '3dbda'
export const ref = '6G10-5'
export default class constructionElementaire extends Exercice {
//  'use strict'
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 1
    this.nbCols = 1
    this.nbColsCorr = 1
    this.sup = 1
    this.typeExercice = 'IEP'
    this.besoinFormulaireNumerique = [
      'Type de cahier',
      3,
      ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche'
    ]
  }

  nouvelleVersion () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, texte, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const anim = new Alea2iep()
      anim.equerreZoom(150)
      const objetsEnonce = []
      const objetsCorrection = []
      const indLettre = randint(1, 15)
      const A = point(randint(0, 3), randint(-8, -3), lettreDepuisChiffre(indLettre), 'above left')
      const B = point(randint(10, 11), randint(-4, 4, [-1, 0, 1]), lettreDepuisChiffre(indLettre + 1), 'above right')
      const d = droite(A, B, '', 'blue')
      const C = point(randint(2, 4, [A.x]), randint(3, 6, [A.y]), lettreDepuisChiffre(indLettre + 2), 'above left')
      const D = point(randint(6, 8), randint(-7, -6, [A.y]), lettreDepuisChiffre(indLettre + 3))
      const e = demiDroite(C, D, 'green', true)
      const f = segment(A, C, 'red')
      const E = pointIntersectionDD(droite(C, D), d, lettreDepuisChiffre(indLettre + 4), 'below right')
      const F = pointSurSegment(B, A, -1, lettreDepuisChiffre(indLettre + 5), 'below')
      const T = tracePoint(A, B, C, D)
      const Tc = tracePoint(E, F, 'red')
      T.tailleTikz = 0.3
      Tc.tailleTikz = 0.3
      objetsCorrection.push(T, Tc, labelPoint(A, B, C, D), labelPoint(E, F, 'red'), d, e, f)
      objetsEnonce.push(T, labelPoint(A, B, C, D))
      let correction = ''
      let enonce = ''
      let questind = 0
      if (context.isHtml) enonce += numAlpha(questind++) + ' Reproduire la figure ci-dessous.<br>'
      enonce +=
        numAlpha(questind++) +
        `Tracer $(${A.nom}${B.nom})$ en bleu.<br>`
      enonce +=
        numAlpha(questind++) +
        `Tracer $[${A.nom}${C.nom}]$ en rouge.<br>`
      enonce +=
        numAlpha(questind++) +
        `Tracer $[${C.nom}${D.nom})$ en vert.<br>`
      enonce +=
        numAlpha(questind++) +
        `Placer $${E.nom}$ le point d'intersection de $(${A.nom}${B.nom})$ et $[${C.nom}${D.nom})$.<br>`
      enonce +=
        numAlpha(questind++) +
        `Placer un point $${F.nom}$ tel que $${F.nom} \\notin [${A.nom}${B.nom}]$ et $${F.nom} \\in (${A.nom}${B.nom})$.<br>`
      const Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, F.x) - 1)
      const Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, F.x) + 1)
      const Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, F.y) - 1)
      const Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, F.y) + 1)
      anim.recadre(Xmin - 3, Ymax)
      anim.pointsCreer(A, B, C, D)
      anim.regleDroite(A, B, { couleur: 'blue' })
      anim.regleSegment(A, C, { couleur: 'red' })
      anim.regleDemiDroiteOriginePoint(C, D, { couleur: 'green' })
      anim.regleMasquer()
      anim.crayonMontrer(E)
      anim.pointCreer(E, { couleur: 'red' })
      anim.crayonMontrer(F)
      anim.pointCreer(F, { couleur: 'red' })
      let g, sc, carreaux
      if (this.sup < 3) g = grille(Xmin, Ymin, Xmax, Ymax, 'gray', 0.7)
      else g = ''
      if (parseInt(this.sup) === 2) {
        sc = 0.8
        carreaux = seyes(Xmin, Ymin, Xmax, Ymax)
      } else {
        sc = 0.5
        carreaux = ''
      }
      objetsEnonce.push(g, carreaux)
      objetsCorrection.push(g, carreaux)
      const ppc = 20
      enonce += '<br>' + mathalea2d(
        {
          xmin: Xmin,
          ymin: Ymin,
          xmax: Xmax,
          ymax: Ymax,
          pixelsParCm: ppc,
          scale: sc
        },
        objetsEnonce
      )
      correction += mathalea2d(
        {
          xmin: Xmin,
          ymin: Ymin,
          xmax: Xmax,
          ymax: Ymax,
          pixelsParCm: ppc,
          scale: sc
        },
        objetsCorrection
      )
      /** ********************** AMC Open *****************************/
      this.autoCorrection[i] = {}
      this.autoCorrection[i].options = { ordered: false }
      this.autoCorrection[i].enonce = enonce + '<br>'
      this.autoCorrection[i].propositions = [
        {
          texte: correction,
          statut: 3,
          sanscadre: true
        }
      ]
      // this.autoCorrection = [{ enonce: enonce + '<br>', propositions: [{ texte: correction, statut: 3, sanscadre: true }] }]
      /****************************************************/
      correction += anim.htmlBouton(this.numeroExercice, i)
      if (this.listeQuestions.indexOf(texte) === -1) {
      // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(enonce + '<br>')
        this.listeCorrections.push(correction + '<br>')
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
}
