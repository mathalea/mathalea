import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, creerNomDePolygone, numAlpha } from '../../modules/outils.js'
import { point, tracePoint, pointSurDroite, pointIntersectionDD, labelPoint, droite, droiteVerticaleParPoint, droiteParPointEtPente, codageMediatrice, codageMilieu, segment, polygone, nommePolygone, rotation, symetrieAxiale, grille, seyes, mathalea2d } from '../../modules/2d.js'

/**
 * @author Jean-Claude Lhote
 * Fonction générale pour les exercices de construction de symétriques (centrale/axiale et points/triangles)
 * références  6G24-1, 6G24-2, 5G10-1, 5G10-2, 5G11-1 et 5G11-2
 * Permet une sortie html/pdf sur petits carreaux/gros carreaux/papier blanc
 */

export default function ConstruireParSymetrie () {
  Exercice.call(this)
  this.titre = 'Construire par Symétrie...'
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 2
  this.sup2 = 1
  this.figure = false
  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    let typesDeQuestionsDisponibles
    if (this.sup === 3) { // Symétrie axiale ou centrale
      if (this.figure === false) typesDeQuestionsDisponibles = [0, 1, 2] // points
      else typesDeQuestionsDisponibles = [3, 4, 5]
    } else { // triangle
      if (this.figure === false) typesDeQuestionsDisponibles = [parseInt(this.sup)] // Le choix 1 ou 2 : points
      else typesDeQuestionsDisponibles = [parseInt(this.sup) + 3] // figures
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let Xmin, Xmax, Ymin, Ymax, sc
    if (parseInt(this.sup2) === 2) sc = 0.8
    else sc = 0.5

    let A; let AA; let cA; let sA
    let B
    let C; let CC; let cC; let sC; let sCE
    let D; let DD; let cD; let sD; let sDE
    let E; let EE; let cE; let sE; let sED
    let sEC; let inter
    let d; let enonce
    let correction
    let g
    let carreaux
    let k
    const objetsEnonce = []
    const objetsCorrection = []
    let p1; let p2; let p1nom
    for (
      let i = 0, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      objetsEnonce.length = 0
      objetsCorrection.length = 0
      switch (listeTypeDeQuestions[i]) {
        case 0: // 3 symétries axiales simples de points (6ème)
          p1nom = creerNomDePolygone(5, 'PQ')
          A = point(0, 0, `${p1nom[0]}`, 'above')
          k = choice([-1, 0, 1, 2])

          if (k < 2) d = droiteParPointEtPente(A, k)
          else d = droiteVerticaleParPoint(A)
          B = pointSurDroite(d, 6, `${p1nom[1]}`, 'above')
          d.isVisible = true
          d.epaisseur = 1
          if (k === 2) {
            A.positionLabel = 'left'
            B.positionLabel = 'left'
          }
          C = point(randint(2, 3), randint(3, 4), `${p1nom[2]}`, 'above left')
          D = point(randint(3, 5), randint(-4, -3), `${p1nom[3]}`, 'below right')
          // dB = droiteParPointEtPerpendiculaire(B, d);
          E = point(randint(6, 7), randint(5, 6), `${p1nom[4]}`, 'left')
          // F = point(E.x+1,5-B.y,'F','above left');
          CC = symetrieAxiale(C, d, `${p1nom[2]}'`, 'below left')
          DD = symetrieAxiale(D, d, `${p1nom[3]}'`, 'above right')
          EE = symetrieAxiale(E, d, `${p1nom[4]}'`, 'left')
          // FF=symetrieAxiale(F,d,'F'','below left')
          cC = codageMediatrice(C, CC, 'red', '|')
          cD = codageMediatrice(D, DD, 'blue', 'X')
          cE = codageMediatrice(E, EE, 'green', 'O')
          // cF=codageMediatrice(F,FF,'purple','V')
          sC = segment(C, CC)
          sD = segment(D, DD)
          sE = segment(E, EE)
          // sF=segment(F,FF)
          sCE = droite(CC, EE, '', 'gray')
          sCE.pointilles = true
          sED = droite(EE, D, '', 'gray')
          sED.pointilles = true
          sDE = droite(DD, E, '', 'gray')
          sDE.pointilles = true
          sEC = droite(C, E, '', 'gray')
          sEC.pointilles = true

          objetsCorrection.push(d, tracePoint(A, B, C, D, E, CC, DD, EE), labelPoint(A, B, C, D, E, CC, DD, EE), cC, cD, cE, sC, sD, sE, sED, sDE, sCE, sEC)
          objetsEnonce.push(tracePoint(A, B, C, D, E), labelPoint(A, B, C, D, E), d)
          enonce = numAlpha(0) + ' Reproduire la figure ci-dessous.<br>'
          enonce += numAlpha(1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(3) + ` Construire le point $${p1nom[4]}'$ symétrique de $${p1nom[4]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(5) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) + 1)

          correction = `Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(${p1nom[0]}${p1nom[1]})$<br>`

          break
        case 1: // 3 symétries axiales de points
          p1nom = creerNomDePolygone(5)
          A = point(0, randint(-1, 1), `${p1nom[0]}`, 'above')
          B = point(6, randint(-1, 1, A.y), `${p1nom[1]}`, 'above')
          d = droite(A, B)
          d.isVisible = true
          d.epaisseur = 1
          C = point(randint(2, 3), randint(3, 4), `${p1nom[2]}`, 'above left')
          D = point(randint(10, 13), randint(-4, -3), `${p1nom[3]}`, 'below right')
          // dB = droiteParPointEtPerpendiculaire(B, d);
          E = point(randint(6, 8), randint(-8, -5), `${p1nom[4]}`, 'left')
          // F = point(E.x+1,5-B.y,'F','above left');
          CC = symetrieAxiale(C, d, `${p1nom[2]}'`, 'below left')
          DD = symetrieAxiale(D, d, `${p1nom[3]}'`, 'above right')
          EE = symetrieAxiale(E, d, `${p1nom[4]}'`, 'left')
          // FF=symetrieAxiale(F,d,'F'','below left')
          cC = codageMediatrice(C, CC, 'red', '|')
          cD = codageMediatrice(D, DD, 'blue', 'X')
          cE = codageMediatrice(E, EE, 'green', 'O')
          // cF=codageMediatrice(F,FF,'purple','V')
          sC = segment(C, CC)
          sD = segment(D, DD)
          sE = segment(E, EE)
          // sF=segment(F,FF)
          sCE = segment(CC, EE, 'gray')
          sCE.pointilles = true
          sED = segment(EE, D, 'gray')
          sED.pointilles = true
          sDE = segment(DD, E, 'gray')
          sDE.pointilles = true
          sEC = segment(C, E, 'gray')
          sEC.pointilles = true

          objetsCorrection.push(d, tracePoint(A, B, C, D, E, CC, DD, EE), labelPoint(A, B, C, D, E, CC, DD, EE), cC, cD, cE, sC, sD, sE, sED, sDE, sCE, sEC)
          objetsEnonce.push(tracePoint(A, B, C, D, E), labelPoint(A, B, C, D, E), d)
          enonce = numAlpha(0) + ' Reproduire la figure ci-dessous.<br>'
          enonce += numAlpha(1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(3) + ` Construire le point $${p1nom[4]}'$ symétrique de $${p1nom[4]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(5) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) + 1)

          correction = `Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(${p1nom[0]}${p1nom[1]})$<br>`
          break
        case 2: // 3 symétries centrales de points
          p1nom = creerNomDePolygone(4)
          A = point(0, randint(-1, 4), `${p1nom[0]}`, 'left')
          B = point(7, randint(-1, 1, A.y), `${p1nom[1]}`, 'above')
          C = point(randint(2, 3), randint(-4, -2), `${p1nom[2]}`, 'left')
          D = point(randint(10, 13), randint(-6, -5), `${p1nom[3]}`, 'below right')
          CC = rotation(C, B, 180, `${p1nom[2]}'`, 'right')
          DD = rotation(D, B, 180, `${p1nom[3]}'`, 'above left')
          AA = rotation(A, B, 180, `${p1nom[0]}'`, 'right')
          cC = codageMilieu(C, CC, 'red', '|', false)
          cD = codageMilieu(D, DD, 'blue', '||', false)
          cA = codageMilieu(A, AA, 'green', '|||', false)
          sC = segment(C, CC)
          sD = segment(D, DD)
          sA = segment(A, AA)

          objetsCorrection.push(tracePoint(A, C, D, CC, DD, AA), labelPoint(A, B, C, D, CC, DD, AA), cC, cD, cA, sC, sD, sA)
          objetsEnonce.push(tracePoint(A, B, C, D), labelPoint(A, B, C, D))
          enonce = numAlpha(0) + ' Reproduire la figure ci-dessous.<br>'
          enonce += numAlpha(1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(3) + ` Construire le point $${p1nom[0]}'$ symétrique de $${p1nom[0]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(4) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, AA.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, AA.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, AA.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, AA.y, CC.y, DD.y) + 1)
          correction = ''
          break

        case 3: // symétrie axiale simple d'un triangle
          p1nom = creerNomDePolygone(5, 'PQ')
          A = point(0, 0, `${p1nom[0]}`, 'above')
          k = choice([-1, 0, 1, 2])

          if (k < 2) d = droiteParPointEtPente(A, k)
          else d = droiteVerticaleParPoint(A)
          B = pointSurDroite(d, 6, `${p1nom[1]}`, 'above')
          d.isVisible = true
          d.epaisseur = 1
          C = point(randint(2, 3), randint(3, 4), `${p1nom[2]}`, 'above left')
          D = point(randint(3, 5), randint(-4, -3), `${p1nom[3]}`, 'below right')
          // dB = droiteParPointEtPerpendiculaire(B, d);
          E = point(randint(6, 7), randint(5, 6), `${p1nom[4]}`, 'left')
          p1 = polygone(C, D, E)
          p2 = symetrieAxiale(p1, d)
          p2.listePoints[0].nom = `${p1nom[2]}'`
          p2.listePoints[1].nom = `${p1nom[3]}'`
          p2.listePoints[2].nom = `${p1nom[4]}'`
          CC = nommePolygone(p1)
          DD = nommePolygone(p2)
          cC = codageMediatrice(p1.listePoints[0], p2.listePoints[0], 'red', '|')
          cD = codageMediatrice(p1.listePoints[1], p2.listePoints[1], 'blue', 'X')
          cE = codageMediatrice(p1.listePoints[2], p2.listePoints[2], 'green', 'O')
          sC = segment(p1.listePoints[0], p2.listePoints[0], 'red')
          sD = segment(p1.listePoints[1], p2.listePoints[1], 'blue')
          sE = segment(p1.listePoints[2], p2.listePoints[2], 'green')
          sCE = droite(p1.listePoints[2], p1.listePoints[1], '', 'gray')
          sCE.pointilles = true
          sED = droite(p2.listePoints[2], p2.listePoints[1], '', 'gray')
          sED.pointilles = true
          objetsCorrection.push(d, tracePoint(A, B), labelPoint(A, B), cC, cD, cE, sC, sD, sE, CC, DD, p1, p1.sommets, p2, p2.sommets, sCE, sED)
          objetsEnonce.push(d, tracePoint(A, B), labelPoint(A, B), CC, p1)
          enonce = numAlpha(0) + 'Reproduire la figure ci-dessous.<br>'
          enonce += numAlpha(1) + ` Construire le triangle  $${p1nom[2]}'${p1nom[3]}'${p1nom[4]}'$ symétrique de $${p1nom[2]}${p1nom[3]}${p1nom[4]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(2) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)
          correction = ''

          break
        case 4: // symetrie axiale d'un triangle
          p1nom = creerNomDePolygone(5)

          A = point(0, randint(-1, 1), `${p1nom[0]}`, 'above')
          B = point(6, randint(-1, 1, A.y), `${p1nom[1]}`, 'above')
          d = droite(A, B)
          d.isVisible = true
          d.epaisseur = 1
          C = point(randint(2, 3), randint(3, 4), `${p1nom[2]}`, 'above left')
          D = point(randint(10, 13), randint(-4, -2), `${p1nom[3]}`, 'below right')
          E = point(randint(6, 8), randint(-8, -6), `${p1nom[4]}`, 'left')
          p1 = polygone(C, D, E)
          p2 = symetrieAxiale(p1, d)
          p2.listePoints[0].nom = `${p1nom[2]}'`
          p2.listePoints[1].nom = `${p1nom[3]}'`
          p2.listePoints[2].nom = `${p1nom[4]}'`
          CC = nommePolygone(p1)
          DD = nommePolygone(p2)
          cC = codageMediatrice(p1.listePoints[0], p2.listePoints[0], 'red', '|')
          cD = codageMediatrice(p1.listePoints[1], p2.listePoints[1], 'blue', 'X')
          cE = codageMediatrice(p1.listePoints[2], p2.listePoints[2], 'green', 'O')
          sC = segment(p1.listePoints[0], p2.listePoints[0], 'red')
          sD = segment(p1.listePoints[1], p2.listePoints[1], 'blue')
          sE = segment(p1.listePoints[2], p2.listePoints[2], 'green')
          sCE = droite(p1.listePoints[2], p1.listePoints[1], '', 'gray')
          sCE.pointilles = true
          sED = droite(p2.listePoints[2], p2.listePoints[1], '', 'gray')
          sED.pointilles = true
          inter = pointIntersectionDD(sCE, sED)
          objetsCorrection.push(d, tracePoint(A, B), labelPoint(A, B), cC, cD, cE, sC, sD, sE, CC, DD, p1, p2, sCE, sED)
          objetsEnonce.push(d, tracePoint(A, B), labelPoint(A, B), CC, p1)
          enonce = numAlpha(0) + 'Reproduire la figure ci-dessous.<br>'
          enonce += numAlpha(1) + ` Construire le triangle  $${p1nom[2]}'${p1nom[3]}'${p1nom[4]}'$ symétrique de $${p1nom[2]}${p1nom[3]}${p1nom[4]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(2) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(inter.x, A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(inter.x, A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(inter.y, A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(inter.y, A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)

          correction = `Contrôler la figure en vérifiant que les côtés des deux triangles se coupent bien sur la droite $(${p1nom[0]}${p1nom[1]})$<br>`
          break
        case 5:
          p1nom = creerNomDePolygone(4)
          A = point(0, randint(-1, 4), `${p1nom[0]}`, 'left')
          B = point(7, randint(-1, 1, A.y), `${p1nom[1]}`, 'above')
          C = point(randint(2, 3), randint(-6, -4), `${p1nom[2]}`, 'left')
          D = point(randint(10, 13), randint(-6, -5), `${p1nom[3]}`, 'below right')
          p1 = polygone(A, C, D)
          p2 = rotation(p1, B, 180)
          p2.listePoints[0].nom = `${p1nom[0]}'`
          p2.listePoints[1].nom = `${p1nom[2]}'`
          p2.listePoints[2].nom = `${p1nom[3]}'`
          CC = nommePolygone(p1)
          DD = nommePolygone(p2)
          cC = codageMilieu(p1.listePoints[0], p2.listePoints[0], 'red', '|', false)
          cD = codageMilieu(p1.listePoints[1], p2.listePoints[1], 'blue', 'X', false)
          cA = codageMilieu(p1.listePoints[2], p2.listePoints[2], 'green', 'O', false)
          sA = segment(p1.listePoints[0], p2.listePoints[0], 'red')
          sC = segment(p1.listePoints[1], p2.listePoints[1], 'blue')
          sD = segment(p1.listePoints[2], p2.listePoints[2], 'green')

          objetsCorrection.push(tracePoint(B), labelPoint(B), cC, cD, cA, sC, sD, sA, DD, CC, p1, p2)
          objetsEnonce.push(tracePoint(B), labelPoint(B), CC, p1)
          enonce = numAlpha(0) + 'Reproduire la figure ci-dessous.<br>'
          enonce += numAlpha(1) + ` Construire le triangle  $${p1nom[0]}'${p1nom[2]}'${p1nom[3]}'$ symétrique de $${p1nom[0]}${p1nom[2]}${p1nom[3]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(2) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)
          correction = ''
          break
      }

      const params = {
        xmin: Xmin,
        ymin: Ymin,
        xmax: Xmax,
        ymax: Ymax,
        pixelsParCm: 20,
        scale: sc
      }
      if (this.sup2 < 3) g = grille(Xmin, Ymin, Xmax, Ymax, 'gray', 0.7)
      else g = ''
      if (parseInt(this.sup2) === 2) {
        k = 0.8
        carreaux = seyes(Xmin, Ymin, Xmax, Ymax)
      } else {
        k = 0.5
        carreaux = ''
      }
      objetsEnonce.push(g, carreaux)
      objetsCorrection.push(g, carreaux)
      enonce += mathalea2d(params
        ,
        objetsEnonce
      )
      correction += mathalea2d(
        params,
        objetsCorrection
      )
      if (this.listeQuestions.indexOf(enonce) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(enonce + '<br>')
        this.listeCorrections.push(correction + '<br>')
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de questions', 4, '0 : symétries axiales simples\n 1 : Symétrie axiale\n 2 : Symétrie centrale\n 3 : Mélange']
  this.besoinFormulaire2Numerique = [
    'Type de cahier',
    3,
    '1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche'
  ]
}
