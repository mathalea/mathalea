import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, arrondi, choisitLettresDifferentes, miseEnEvidence, numAlpha } from '../../modules/outils.js'
import { point, pointSurSegment, pointIntersectionDD, labelPoint, droite, droiteParPointEtParallele, rotation, similitude, codageAngle, longueur, angle } from '../../modules/2d.js'

export const titre = 'Déterminer des angles en utilisant les cas d\'égalité'

/**
 * Déterminer des angles en utilisant les cas d'égalités : opposés par le sommet, alternes-internes, correspondants...
 * ref 5G30-1
 * publié le 14/11/2020
 * @author Jean-Claude Lhote Inspiré d'exercices du manuel sésamath.
 */
export default function EgaliteDAngles () {
  'use strict'
  Exercice.call(this)
  this.sup = 1
  this.nbQuestions = 1
  if (context.isHtml) {
    this.spacing = 2
    this.spacingCorr = 3
  } else {
    this.spacing = 2
    this.spacingCorr = 2
  }
  this.nbCols = 1
  this.nbColsCorr = 1
  this.titre = titre
  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    // this.consigne = "Cet exercice est inspiré d'un exercice du manuel sésamath 5e"
    let figure = []; let choix
    const fig1 = function () {
      const objets = []; let enonce; let correction
      const noms = choisitLettresDifferentes(5, 'Q', true); let gras
      context.isHtml ? gras = '#f15929' : gras = 'black'
      const A = point(0, 0, noms[0], 'above left')
      let a = randint(45, 85)
      const ac = randint(8, 10)
      const ce = randint(7, 10, ac)
      const C = similitude(rotation(point(1, 0), A, randint(-45, 45)), A, a, ac, noms[2], 'left')
      const c = randint(45, 70)
      const E = similitude(A, C, c, ce / ac, noms[4], 'above right')
      const CA = droite(C, A)
      const CE = droite(C, E)
      const AE = droite(A, E, '', 'gray')
      AE.epaisseur = 2
      const B = pointSurSegment(A, C, randint(3, ac - 4), noms[1], 'above left')
      const BD = droiteParPointEtParallele(B, AE, '', 'gray')
      BD.epaisseur = 2
      const D = pointIntersectionDD(BD, CE, noms[3], 'above right')
      const m1 = codageAngle(E, A, C, 1, '', 'black', 2, 1, 'black', 0.1, true)
      const m2 = codageAngle(A, C, E, 1, '', 'black', 2, 1, 'black', 0.1, true)
      const l1 = labelPoint(A, B, C, D, E)
      const c1 = codageAngle(D, B, A, 1, '', 'blue', 2, 1, 'blue')
      const c2 = codageAngle(B, D, E, 1, '', 'orange', 2, 1, 'orange')
      const c3 = codageAngle(D, E, A, 1, '', 'green', 2, 1, 'green')
      const c4 = codageAngle(D, B, C, 1, '', 'pink', 2, 1, 'pink')
      const c5 = codageAngle(C, D, B, 1, '', 'red', 2, 1, 'red')
      objets.push(CA, CE, AE, BD, m1, m2, c1, c2, c3, c4, c5, l1)
      a = Math.round(angle(E, A, C))
      enonce = `Dans la figure ci-dessous,  les droites $(${noms[0]}${noms[4]})$ et $(${noms[1]}${noms[3]})$ sont parallèles.<br>`
      enonce += `On veut déterminer la mesure des angles du quadrilatère $${noms[0]}${noms[1]}${noms[3]}${noms[4]}$ (toutes les réponses doivent être justifiées).<br>`
      enonce += `${numAlpha(0)} Déterminer la mesure de l'angle $\\widehat{${noms[3]}${noms[1]}${noms[2]}}$.<br>`
      enonce += `${numAlpha(1)} En déduire la mesure de l'angle $\\widehat{${noms[0]}${noms[1]}${noms[3]}}$.<br>`
      enonce += `${numAlpha(2)} En utilisant la question ${numAlpha(0)}, déterminer la mesure de l'angle $\\widehat{${noms[1]}${noms[3]}${noms[2]}}$.<br>`
      enonce += `${numAlpha(3)} En déduire la mesure de l'angle $\\widehat{${noms[1]}${noms[3]}${noms[4]}}$.<br>`
      enonce += `${numAlpha(4)} En utilisant la question ${numAlpha(2)} déterminer la mesure de l'angle $\\widehat{${noms[3]}${noms[4]}${noms[0]}}$.<br>`
      enonce += `${numAlpha(5)} Vérifier la conjecture suivante : « La somme des angles d'un quadrilatère vaut 360°.»<br>`
      correction = `${numAlpha(0)} Comme les droites $(${noms[0]}${noms[4]})$ et $(${noms[1]}${noms[3]})$ sont parallèles, les angles correspondants $\\widehat{${noms[4]}${noms[0]}${noms[1]}}$ et $\\widehat{${noms[3]}${noms[1]}${noms[2]}}$ sont égaux, donc $\\widehat{${noms[3]}${noms[1]}${noms[2]}}$ mesure $${a}\\degree$.<br>`
      correction += `${numAlpha(1)} Les angles $\\widehat{${noms[0]}${noms[1]}${noms[3]}}$ et $\\widehat{${noms[3]}${noms[1]}${noms[2]}}$ sont adjacents supplémentaires, donc $\\widehat{${noms[0]}${noms[1]}${noms[3]}}$ mesure $180\\degree-${a}\\degree=${miseEnEvidence(180 - a, gras)}\\degree$.<br>`
      correction += `${numAlpha(2)} Dans un triangle, la somme des angles vaut $180\\degree$ donc $\\widehat{${noms[1]}${noms[3]}${noms[2]}}=180\\degree-\\widehat{${noms[3]}${noms[1]}${noms[2]}}-\\widehat{${noms[1]}${noms[2]}${noms[3]}}=180\\degree-${a}\\degree-${c}\\degree=${180 - a - c}\\degree$.<br>`
      correction += `${numAlpha(3)} Les angles $\\widehat{${noms[1]}${noms[3]}${noms[2]}}$ et $\\widehat{${noms[1]}${noms[3]}${noms[4]}}$ sont adjacents supplémentaires, donc $\\widehat{${noms[1]}${noms[3]}${noms[4]}}$ mesure $180\\degree-${180 - a - c}\\degree=${miseEnEvidence(a + c, gras)}\\degree$.<br>`
      correction += `${numAlpha(4)} Comme les droites $(${noms[0]}${noms[4]})$ et $(${noms[1]}${noms[3]})$ sont parallèles, les angles correspondants $\\widehat{${noms[1]}${noms[3]}${noms[2]}}$ et $\\widehat{${noms[3]}${noms[4]}${noms[0]}}$ sont égaux, donc $\\widehat{${noms[3]}${noms[4]}${noms[0]}}$ mesure $${miseEnEvidence(180 - a - c, gras)}\\degree$.<br>`
      correction += `${numAlpha(5)} La somme des angles du quadrilatère vaut donc : $${a}\\degree+${miseEnEvidence(180 - a, gras)}\\degree+${miseEnEvidence(a + c, gras)}\\degree+${miseEnEvidence(180 - a - c, gras)}\\degree=180\\degree+180\\degree=360\\degree$.<br>`
      correction += '$\\phantom{f}$ La conjecture est finalement vraie.'
      const params = { xmin: Math.min(A.x - 8, C.x - 8, E.x - 8), ymin: Math.min(A.y - 1, E.y - 1, C.y - 1), xmax: Math.max(E.x + 2, A.x + 2, C.x + 2), ymax: Math.max(C.y + 2, A.y + 2, E.y + 2), scale: 0.7 }

      return [objets, params, enonce, correction]
    }
    const fig2 = function () {
      const objets = []; let enonce; let correction
      const noms = choisitLettresDifferentes(5, 'Q', true)
      const A = point(0, 0, noms[0], 'above left')
      const B = rotation(point(randint(8, 10), randint(1, 3)), A, randint(-40, 40), noms[1], 'right')
      const ab = longueur(A, B)
      const ac = randint(6, 8)
      const a = randint(40, 60)
      const C = similitude(B, A, a, ac / ab, noms[2], 'above left')
      const CA = droite(C, A)
      const AB = droite(A, B)
      const D = pointSurSegment(A, B, ab / 2 + randint(-1, 1, 0) / 10, noms[3], 'below')
      const CE = droite(C, D)
      const cd = longueur(C, D)
      const ad = longueur(A, D)
      const E = pointSurSegment(C, D, cd * ab / ad, noms[4], 'below right')
      const BE = droite(B, E)
      const d = arrondi(angle(C, D, B), 0)
      const cA = codageAngle(D, A, C, 1, '', 'black', 2, 1, 'black', 0.2, true)
      const cD = codageAngle(C, D, B, 1, '', 'red', 2, 1, 'red', 0.2, true)
      const cE = codageAngle(D, E, B, 1, '', 'blue', 2, 1, 'blue', 0.2, true)
      const c4 = codageAngle(A, C, D, 1, '', 'green', 2, 1, 'green', 0.2)
      const c5 = codageAngle(B, D, E, 1, '', 'orange', 2, 1, 'orange', 0.2)
      const c6 = codageAngle(E, B, D, 1, '', 'pink', 2, 1, 'pink', 0.2)
      const c3 = codageAngle(A, D, C, 1, '', 'gray', 2, 1, 'gray', 0.2)
      const l1 = labelPoint(A, B, C, D, E)
      objets.push(CA, AB, CE, BE, cA, cD, cE, c3, c4, c5, c6, l1)
      enonce = 'La figure n\'est pas en vraie grandeur. Toutes les réponses devront être justifiées.<br>'
      enonce += `${numAlpha(0)} Déterminer la mesure de l'angle $\\widehat{${noms[0]}${noms[3]}${noms[2]}}$.<br>`
      enonce += `${numAlpha(1)} En déduire la mesure de l'angle $\\widehat{${noms[3]}${noms[2]}${noms[0]}}$.<br>`
      enonce += `${numAlpha(2)} Déterminer si les droites $(${noms[0]}${noms[2]})$ et $(${noms[4]}${noms[1]})$ sont parallèles.<br>`
      enonce += `${numAlpha(3)} Si on considère que les segments $[${noms[0]}${noms[2]}]$ et $[${noms[4]}${noms[1]}]$ sont de même longueur, Déterminer la nature du quadrilatère $${noms[0]}${noms[2]}${noms[1]}${noms[4]}$.<br>`
      correction = `${numAlpha(0)} Les angles $\\widehat{${noms[0]}${noms[3]}${noms[2]}}$ et $\\widehat{${noms[2]}${noms[3]}${noms[1]}}$ sont adjacents supplémentaires, donc $\\widehat{${noms[0]}${noms[3]}${noms[2]}}$ mesure $180\\degree-${d}\\degree=${180 - d}\\degree$.<br>`
      correction += `${numAlpha(1)} Dans un triangle, la somme des angles vaut $180\\degree$ donc $\\widehat{${noms[0]}${noms[2]}${noms[3]}}=180-\\widehat{${noms[3]}${noms[0]}${noms[2]}}-\\widehat{${noms[0]}${noms[3]}${noms[2]}}=180\\degree-${a}\\degree-${180 - d}\\degree=${-a + d}\\degree$.<br>`
      correction += `${numAlpha(2)} Pour les droites $(${noms[0]}${noms[2]})$ et $(${noms[4]}${noms[1]})$ coupées par la sécante $(${noms[2]}${noms[4]})$ les angles $\\widehat{${noms[0]}${noms[2]}${noms[3]}}$ et $\\widehat{${noms[1]}${noms[4]}${noms[3]}}$ sont des angles alternes-internes.<br>`
      correction += '$\\phantom{c/}$ Or, si des angles alternes-internes sont égaux, alors cela signifie que les droites coupées par la sécante sont parallèles.<br>'
      correction += `$\\phantom{c/}$ Les droites $(${noms[0]}${noms[2]})$ et $(${noms[4]}${noms[1]})$ sont donc parallèles.<br>`
      correction += `${numAlpha(3)} Les droites $(${noms[0]}${noms[2]})$ et $(${noms[4]}${noms[1]})$ sont parallèles et les segments $[${noms[0]}${noms[2]}]$ et $[${noms[4]}${noms[1]}]$ sont de même longueur.<br>`
      correction += '$\\phantom{c/}$ Or, un quadrilatère qui possède des côtés opposés parallèles et de même longueur est un parallèlogramme.<br>'
      correction += `$\\phantom{c/}$ Donc $${noms[0]}${noms[2]}${noms[1]}${noms[4]}$ est un parallèlogramme et $${noms[3]}$ est son centre.`
      const params = { xmin: Math.min(A.x, B.x, C.x, D.x, E.x) - 1, ymin: Math.min(A.y, B.y, C.y, D.y, E.y) - 1, xmax: Math.max(A.x, B.x, C.x, D.x, E.x) + 2, ymax: Math.max(A.y, B.y, C.y, D.y, E.y) + 2 }

      return [objets, params, enonce, correction]
    }
    if (this.sup === 3) { choix = randint(1, 2) } else { choix = parseInt(this.sup) }
    switch (choix) {
      case 1:
        figure = fig1()
        figure[2] += mathalea2d(figure[1], figure[0])
        break
      case 2:
        figure = fig2()
        figure[2] += mathalea2d(figure[1], figure[0])
        break
    }
    this.listeQuestions.push(figure[2])
    this.listeCorrections.push(figure[3])
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Numéro de figure', 3, '1 : Le trapèze\n2 : Le papillon\n3 : Au hasard']
}
