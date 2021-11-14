import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, creerNomDePolygone, numAlpha } from '../../modules/outils.js'
import { point, tracePoint, pointSurDroite, pointIntersectionDD, labelPoint, droite, droiteVerticaleParPoint, droiteParPointEtPente, codageMediatrice, codageMilieu, segment, polygone, nommePolygone, rotation, symetrieAxiale, grille, seyes, mathalea2d, droiteHorizontaleParPoint, dessousDessus, aireTriangle } from '../../modules/2d.js'
import { context } from '../../modules/context.js'

/**
 * @author Jean-Claude Lhote
 * Fonction générale pour les exercices de construction de symétriques (centrale/axiale et points/triangles)
 * références  6G24-1, 6G24-2, 5G10-1, 5G10-2, 5G11-1 et 5G11-2
 * Permet une sortie html/pdf sur petits carreaux/gros carreaux/papier blanc
 * Relecture : Novembre 2021 par EE
 */

export default function ConstruireParSymetrie () {
  Exercice.call(this)
  this.titre = 'Construire par Symétrie...'
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = 1
  this.sup3 = 1
  this.figure = false
  const choisi3Points = function (d, lieu = ['dessus', 'dessous', 'sur']) {
    let A, B, C
    let count = 0; let probleme = false
    do {
      A = point(randint(-8, 8), randint(-8, 8))
      count++
    } while (dessousDessus(d, A) !== lieu[0] && count < 50)
    if (count === 50) {
      console.log('A pas trouvé', lieu[0])
      probleme = true
    }
    count = 0
    do {
      if (lieu[1] === 'sur') B = pointSurDroite(d, randint(-8, 8, [6, 0]))
      else B = point(randint(-8, 8, A.x), randint(-8, 8, A.y))
      count++
    } while (dessousDessus(d, B) !== lieu[1] && count < 50)
    if (count === 50) {
      console.log('B pas trouvé', lieu[1])
      probleme = true
    }
    count = 0
    do {
      if (lieu[2] === 'sur') C = pointSurDroite(d, randint(-8, 8, [0, 6]))
      C = point(randint(-8, 8, [A.x, B.x]), randint(-8, 8, [A.y, B.y]))
      count++
    } while (dessousDessus(d, C) !== lieu[2] && count < 50)
    if (count === 50) {
      console.log('C pas trouvé', lieu[2])
      probleme = true
    }
    if (!probleme) {
      return [A, B, C]
    } else {
      console.log(d)
      return false
    }
  }
  this.nouvelleVersion = function () {
    let lieux
    this.sup = parseInt(this.sup)
    this.sup3 = Number(this.sup3)
    if (this.sup3 === 1) lieux = choice([['dessus', 'dessus', 'dessus'], ['dessous', 'dessous', 'dessous']])
    else if (this.sup3 === 2) lieux = choice([['dessus', 'sur', 'dessus'], ['dessous', 'sur', 'dessus']])
    else lieux = choice([['dessus', 'dessous', 'dessus'], ['dessus', 'dessus', 'dessous']])
    let typesDeQuestionsDisponibles = []
    switch (this.sup) {
      case 1:
        if (this.figure) {
          typesDeQuestionsDisponibles = [4]
        } else {
          typesDeQuestionsDisponibles = [0]
        }
        break
      case 2:
        if (this.figure) {
          typesDeQuestionsDisponibles = [5]
        } else {
          typesDeQuestionsDisponibles = [1]
        }
        break
      case 3:
        if (this.figure) {
          typesDeQuestionsDisponibles = [6]
        } else {
          typesDeQuestionsDisponibles = [2]
        }
        break
      case 4:
        if (this.figure) {
          typesDeQuestionsDisponibles = [3, 4, 5]
        } else {
          typesDeQuestionsDisponibles = [0, 1, 2]
        }
        break
      case 5:
        if (this.figure) {
          typesDeQuestionsDisponibles = [7]
        } else {
          typesDeQuestionsDisponibles = [6]
        }
        break
      case 6:
        if (this.figure) {
          typesDeQuestionsDisponibles = [3, 4, 5, 7]
        } else {
          typesDeQuestionsDisponibles = [0, 1, 2, 6]
        }
        break
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
      let i = 0, cpt = 0, numQuestion;
      i < this.nbQuestions && cpt < 50;

    ) {
      objetsEnonce.length = 0
      objetsCorrection.length = 0
      switch (listeTypeDeQuestions[i]) {
        case 0: // symétrie d'axe horizontal ou vertical de points
          p1nom = creerNomDePolygone(5, 'PQ')
          k = choice([0, 2])
          A = point(0, 0, `${p1nom[0]}`, 'above')
          if (k === 0) d = droiteHorizontaleParPoint(A)
          else d = droiteVerticaleParPoint(A)
          B = pointSurDroite(d, 6, `${p1nom[1]}`, 'above')
          d.isVisible = true
          d.epaisseur = 1
          if (k === 2) {
            A.positionLabel = 'left'
            B.positionLabel = 'left'
          }
          if (k === 2) {
            if (this.sup3 === 1) lieux = choice([['gauche', 'gauche', 'gauche'], ['droite', 'droite', 'droite']])
            else if (this.sup3 === 2) lieux = choice([['gauche', 'sur', 'gauche'], ['droite', 'droite', 'sur']])
            else lieux = choice([['gauche', 'desssous', 'gauche'], ['droite', 'gauche', 'droite']])
          }
          do {
            [C, D, E] = choisi3Points(d, lieux)
          } while (aireTriangle(polygone(C, D, E)) < 7)
          C.nom = p1nom[2]
          C.positionLabel = 'above left'
          D.nom = p1nom[3]
          D.positionLabel = 'below right'
          E.nom = p1nom[4]
          E.positionLabel = 'left'
          CC = symetrieAxiale(C, d, `${p1nom[2]}'`, 'below left')
          DD = symetrieAxiale(D, d, `${p1nom[3]}'`, 'above right')
          EE = symetrieAxiale(E, d, `${p1nom[4]}'`, 'left')
          cC = codageMediatrice(C, CC, 'red', '|')
          cD = codageMediatrice(D, DD, 'blue', 'X')
          cE = codageMediatrice(E, EE, 'green', 'O')
          sC = segment(C, CC)
          sD = segment(D, DD)
          sE = segment(E, EE)
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
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 3) + ` Construire le point $${p1nom[4]}'$ symétrique de $${p1nom[4]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 4) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) + 1)

          correction = `Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(${p1nom[0]}${p1nom[1]})$.<br>`

          break
        case 1: // symétries axiales d'axes à 45° de points (6ème)
          p1nom = creerNomDePolygone(5, 'PQ')
          A = point(0, 0, `${p1nom[0]}`, 'above')
          k = choice([-1, 1])
          d = droiteParPointEtPente(A, k)
          B = pointSurDroite(d, 6, `${p1nom[1]}`, 'above')
          d.isVisible = true
          d.epaisseur = 1
          do {
            [C, D, E] = choisi3Points(d, lieux)
          } while (aireTriangle(polygone(C, D, E)) < 7)
          C.nom = p1nom[2]
          C.positionLabel = 'above left'
          D.nom = p1nom[3]
          D.positionLabel = 'below right'
          E.nom = p1nom[4]
          E.positionLabel = 'left'
          CC = symetrieAxiale(C, d, `${p1nom[2]}'`, 'below left')
          DD = symetrieAxiale(D, d, `${p1nom[3]}'`, 'above right')
          EE = symetrieAxiale(E, d, `${p1nom[4]}'`, 'left')
          cC = codageMediatrice(C, CC, 'red', '|')
          cD = codageMediatrice(D, DD, 'blue', 'X')
          cE = codageMediatrice(E, EE, 'green', 'O')
          sC = segment(C, CC)
          sD = segment(D, DD)
          sE = segment(E, EE)
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
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 3) + ` Construire le point $${p1nom[4]}'$ symétrique de $${p1nom[4]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 4) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) + 1)

          correction = `Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(${p1nom[0]}${p1nom[1]})$.<br>`

          break
        case 2: // Axe de symétrie légèrement penché (utilisation du quadrillage plus complexe)
          p1nom = creerNomDePolygone(5)
          A = point(0, randint(-1, 1), `${p1nom[0]}`, 'above')
          B = point(6, choice([-1, 1], A.y), `${p1nom[1]}`, 'above')
          d = droite(A, B)
          d.isVisible = true
          d.epaisseur = 1
          do {
            [C, D, E] = choisi3Points(d, lieux)
          } while (aireTriangle(polygone(C, D, E)) < 7)
          C.nom = p1nom[2]
          C.positionLabel = 'above left'
          D.nom = p1nom[3]
          D.positionLabel = 'below right'
          E.nom = p1nom[4]
          E.positionLabel = 'left'
          CC = symetrieAxiale(C, d, `${p1nom[2]}'`, 'below left')
          DD = symetrieAxiale(D, d, `${p1nom[3]}'`, 'above right')
          EE = symetrieAxiale(E, d, `${p1nom[4]}'`, 'left')
          cC = codageMediatrice(C, CC, 'red', '|')
          cD = codageMediatrice(D, DD, 'blue', 'X')
          cE = codageMediatrice(E, EE, 'green', 'O')
          sC = segment(C, CC)
          sD = segment(D, DD)
          sE = segment(E, EE)
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
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 3) + ` Construire le point $${p1nom[4]}'$ symétrique de $${p1nom[4]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 4) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) + 1)

          correction = `Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          break

        case 3: // symétrie axiale (Axe vertical ou horizontal) d'un triangle
          p1nom = creerNomDePolygone(5, 'PQ')
          A = point(0, 0, `${p1nom[0]}`, 'above')
          k = choice([0, 2])

          if (k === 0) d = droiteHorizontaleParPoint(A)
          else d = droiteVerticaleParPoint(A)
          B = pointSurDroite(d, 6, `${p1nom[1]}`, 'above')
          if (k === 2) {
            A.positionLabel = 'left'
            B.positionLabel = 'left'
          }
          if (k === 2) {
            if (this.sup3 === 1) lieux = choice([['gauche', 'gauche', 'gauche'], ['droite', 'droite', 'droite']])
            else if (this.sup3 === 2) lieux = choice([['gauche', 'sur', 'gauche'], ['droite', 'droite', 'sur']])
            else lieux = choice([['gauche', 'desssous', 'gauche'], ['droite', 'gauche', 'droite']])
          }
          d.isVisible = true
          d.epaisseur = 1
          do {
            [C, D, E] = choisi3Points(d, lieux)
          } while (aireTriangle(polygone(C, D, E)) < 7)
          C.nom = p1nom[2]
          C.positionLabel = 'above left'
          D.nom = p1nom[3]
          D.positionLabel = 'below right'
          E.nom = p1nom[4]
          E.positionLabel = 'left'
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
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le triangle  $${p1nom[2]}'${p1nom[3]}'${p1nom[4]}'$ symétrique de $${p1nom[2]}${p1nom[3]}${p1nom[4]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 2) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)
          correction = ''

          break
        case 4: // symetrie axiale (Axe à 45°) d'un triangle
          p1nom = creerNomDePolygone(5, 'PQ')
          A = point(0, 0, `${p1nom[0]}`, 'above')
          k = choice([-1, 1])

          d = droiteParPointEtPente(A, k)
          B = pointSurDroite(d, 6, `${p1nom[1]}`, 'above')
          if (k === 2) {
            A.positionLabel = 'left'
            B.positionLabel = 'left'
          }
          d.isVisible = true
          d.epaisseur = 1
          do {
            [C, D, E] = choisi3Points(d, lieux)
          } while (aireTriangle(polygone(C, D, E)) < 7)
          C.nom = p1nom[2]
          C.positionLabel = 'above left'
          D.nom = p1nom[3]
          D.positionLabel = 'below right'
          E.nom = p1nom[4]
          E.positionLabel = 'left'
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
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le triangle  $${p1nom[2]}'${p1nom[3]}'${p1nom[4]}'$ symétrique de $${p1nom[2]}${p1nom[3]}${p1nom[4]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 2) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)
          correction = ''
          break
        case 5: // symetrie axiale Axe légèrement penché
          p1nom = creerNomDePolygone(5)
          A = point(0, randint(-1, 1), `${p1nom[0]}`, 'above')
          B = point(6, choice([-1, 1]), `${p1nom[1]}`, 'above')
          d = droite(A, B)
          d.isVisible = true
          d.epaisseur = 1
          do {
            [C, D, E] = choisi3Points(d, lieux)
          } while (aireTriangle(polygone(C, D, E)) < 7)
          C.nom = p1nom[2]
          C.positionLabel = 'above left'
          D.nom = p1nom[3]
          D.positionLabel = 'below right'
          E.nom = p1nom[4]
          E.positionLabel = 'left'
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
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le triangle  $${p1nom[2]}'${p1nom[3]}'${p1nom[4]}'$ symétrique de $${p1nom[2]}${p1nom[3]}${p1nom[4]}$ par rapport à la droite $(${p1nom[0]}${p1nom[1]})$.<br>`
          enonce += numAlpha(numQuestion + 2) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)

          correction = ''
          break
        case 6: // 3 symétries centrales de points
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
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(numQuestion + 2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(numQuestion + 3) + ` Construire le point $${p1nom[0]}'$ symétrique de $${p1nom[0]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(numQuestion + 4) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, AA.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, AA.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, AA.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, AA.y, CC.y, DD.y) + 1)
          correction = ''
          break
        case 7: // Symétrie centrale de triangle
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
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le triangle  $${p1nom[0]}'${p1nom[2]}'${p1nom[3]}'$ symétrique de $${p1nom[0]}${p1nom[2]}${p1nom[3]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(numQuestion + 2) + ' Coder la figure.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)
          correction = ''
          break
      }
      console.log('La droite : ', d, 'le type de question : ', listeTypeDeQuestions[i])
      if (listeTypeDeQuestions[i] !== 3 && listeTypeDeQuestions !== 7) {
        console.log(p1nom[2], dessousDessus(d, C), p1nom[3], dessousDessus(d, D), p1nom[4], dessousDessus(d, E))
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
  this.besoinFormulaireNumerique = ['Type de questions', 6, '1 : Axe horizontal ou vertical\n2 : Axe oblique à 45°\n3 : Axe avec une légère pente\n4 : Toutes les symétries axiales\n5 : Symétrie centrale\n6 : Mélange']
  this.besoinFormulaire2Numerique = [
    'Type de cahier',
    3,
    ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche'
  ]
  this.besoinFormulaire3Numerique = ['Niveau de difficulté pour la symétrie Axiale', 3, '1 : Tous les points du même côté de l\'axe\n2 : Deux points du même côté et le troisième sur l\'axe\n3 : Deux points d\'un côté de l\'axe et le troisième de l\'autre côté']
}
