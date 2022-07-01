import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, creerNomDePolygone } from '../../modules/outils.js'
import { point, labelPoint, segment, polygone, translation2Points, similitude, codageSegments, grille, seyes, mathalea2d } from '../../modules/2d.js'
/**
 * fonction servant à plusieurs exercice autour du cube et du pavé droit
 * références : 6G42 et 6G43
 * @author Jean-Claude Lhote
 */
export default function Solide6e () {
  'use strict'
  Exercice.call(this)
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = 1
  this.titre = ''
  this.nouvelleVersion = function () {
    let typesDeQuestionsDisponibles
    if (this.sup === 3) typesDeQuestionsDisponibles = [1, 2]
    else typesDeQuestionsDisponibles = [parseInt(this.sup)]

    if (this.type === 'vocabulaire') {
      for (let n = 0; n < typesDeQuestionsDisponibles.length; n++) { typesDeQuestionsDisponibles[n] += 2 }
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let Xmin, Xmax, Ymin, Ymax, ppc, sc

    if (parseInt(this.sup2) === 1) sc = 0.5
    else sc = 0.8

    let A; let B; let C; let D; let E; let F; let G; let H
    let AB; let BC; let CD; let DA; let EF; let FG; let GH; let HE; let AE; let BF; let CG; let DH
    let coeffpersp
    let codesseg = []
    let enonce
    let correction
    let carreaux; let g
    let objetsEnonce = []
    let objetsCorrection = []
    let p
    let listeDeNomsDePolygones
    for (
      let i = 0, texte, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (i % 2 === 0) listeDeNomsDePolygones = ['PQD']
      const nom = creerNomDePolygone(8, listeDeNomsDePolygones)
      listeDeNomsDePolygones.push(nom)
      const anglepersp = choice([30, 45, -30, -45, 150, 135, -150, -135])
      if (anglepersp % 10 === 0) coeffpersp = 0.6
      else coeffpersp = 0.4
      objetsCorrection = []
      objetsEnonce = []
      switch (listeTypeDeQuestions[i]) {
        case 1: // cube
          enonce = `${nom} est un cube.<br>`
          if (context.isHtml) enonce += ' Reproduire la figure ci-dessous sur le cahier.<br>'
          enonce += ' Repasse tous les segments de même longueur dans une même couleur.<br>'
          correction = `Le cube ${nom}.<br>`
          break

        case 2:
          enonce = `${nom} est un pavé droit.<br>`
          if (context.isHtml) enonce += ' Reproduire la figure ci-dessous sur le cahier.<br>'
          enonce += ' Repasse tous les segments de même longueur dans une même couleur.<br>'
          correction = `Le pavé droit ${nom}.<br>`
          break

        case 3:
          enonce = `${nom} est un cube.<br>`
          break

        case 4:
          enonce = `${nom} est un pavé droit.<br>`
          break
      }
      const aretesParalleles = [[[0, 1], [3, 2], [4, 5], [7, 6]], [[0, 3], [1, 2], [4, 7], [5, 6]], [[0, 4], [1, 5], [2, 6], [3, 7]]]
      const facesParalleles = [[[0, 1, 2, 3], [4, 5, 6, 7]], [[0, 4, 7, 3], [1, 5, 6, 2]], [[0, 1, 5, 4], [3, 2, 6, 7]]]
      const aretesPerp = [[[0, 1], [0, 4], [0, 3], [1, 5], [1, 2]], [[0, 4], [0, 1], [0, 3], [4, 5], [4, 7]], [[0, 3], [0, 1], [0, 4], [3, 2], [3, 7]], [[1, 2], [1, 0], [1, 5], [2, 3], [2, 6]], [[1, 5], [1, 0], [1, 2],
        [5, 4], [5, 6]], [[5, 4], [5, 1], [5, 6], [4, 0], [4, 7]], [[5, 6], [5, 1], [5, 4], [6, 2], [6, 7]],
      [[6, 2], [6, 5], [6, 7], [2, 1], [2, 3]], [[2, 3], [2, 1], [2, 6], [3, 0], [3, 7]], [[3, 7], [3, 2], [3, 0], [7, 4], [7, 6]], [[7, 4], [4, 0], [4, 5], [7, 3], [7, 6]], [[7, 6], [6, 2], [6, 5], [7, 3], [7, 4]]]
      const facesPerp = [[[0, 1, 2, 3], [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0], [0, 1, 5, 4]], [[1, 5, 6, 2], [0, 1, 2, 3], [2, 6, 7, 3], [5, 6, 7, 4], [1, 5, 4, 0]], [[0, 1, 5, 4], [1, 5, 6, 2], [4, 5, 6, 7], [0, 4, 7, 3], [0, 1, 2, 3]],
        [[4, 5, 6, 7], [0, 1, 5, 4], [1, 5, 6, 2], [2, 6, 7, 3], [0, 4, 7, 3]], [[0, 4, 7, 3], [0, 1, 2, 3], [0, 1, 5, 4], [4, 5, 6, 7], [3, 2, 6, 7]], [[3, 2, 6, 7], [0, 1, 2, 3], [1, 5, 6, 2], [4, 5, 6, 7], [0, 4, 7, 3]]]
      let k, l, s

      switch (randint(1, 4)) {
        case 1: // citer les arêtes parallèles à une arrête donnée
          [k, l, s] = [randint(0, 2), randint(0, 3), randint(0, 1)]
          enonce += `Citer toutes les arêtes parallèles à [$${nom[aretesParalleles[k][l][s]] + nom[aretesParalleles[k][l][(s + 1) % 2]]}$].<br>`
          correction = `Les arêtes parallèles à [$${nom[aretesParalleles[k][l][s]] + nom[aretesParalleles[k][l][(s + 1) % 2]]}$] sont [$${nom[aretesParalleles[k][(l + 1) % 4][s]] + nom[aretesParalleles[k][(l + 1) % 4][(s + 1) % 2]]}$], [$${nom[aretesParalleles[k][(l + 2) % 4][s]] + nom[aretesParalleles[k][(l + 2) % 4][(s + 1) % 2]]}$] et [$${nom[aretesParalleles[k][(l + 3) % 4][s]] + nom[aretesParalleles[k][(l + 3) % 4][(s + 1) % 2]]}$].<br>`
          break

        case 2: // citer la face parallèle à une face donnée
          [k, l, s] = [randint(0, 2), randint(0, 1), randint(0, 3)]
          enonce += `Quelle est la face parallèle à $${nom[facesParalleles[k][l][s]] + nom[facesParalleles[k][l][(s + 1) % 4]] + nom[facesParalleles[k][l][(s + 2) % 4]] + nom[facesParalleles[k][l][(s + 3) % 4]]}$ ?<br>`
          correction = `La face parallèle à $${nom[facesParalleles[k][l][s]] + nom[facesParalleles[k][l][(s + 1) % 4]] + nom[facesParalleles[k][l][(s + 2) % 4]] + nom[facesParalleles[k][l][(s + 3) % 4]]}$ est la face $${nom[facesParalleles[k][(l + 1) % 2][s]] + nom[facesParalleles[k][(l + 1) % 2][(s + 1) % 4]] + nom[facesParalleles[k][(l + 1) % 2][(s + 2) % 4]] + nom[facesParalleles[k][(l + 1) % 2][(s + 3) % 4]]}$.<br>`
          break

        case 3: // citer les arêtes perpendiculaires à une arête donnée
          [k, l, s] = [randint(0, 11), 0, randint(0, 1)]
          enonce += `Quelles sont les arêtes perpendiculaires à l'arête [$${nom[aretesPerp[k][l][s]] + nom[aretesPerp[k][l][(s + 1) % 2]]}$] ?<br>`
          correction = `Les arêtes perpendiculaires à l'arête [$${nom[aretesPerp[k][l][s]] + nom[aretesPerp[k][l][(s + 1) % 2]]}$] sont [$${nom[aretesPerp[k][1][s]] + nom[aretesPerp[k][1][(s + 1) % 2]]}$], [$${nom[aretesPerp[k][2][s]] + nom[aretesPerp[k][2][(s + 1) % 2]]}$], [$${nom[aretesPerp[k][3][s]] + nom[aretesPerp[k][3][(s + 1) % 2]]}$] et [$${nom[aretesPerp[k][4][s]] + nom[aretesPerp[k][4][(s + 1) % 2]]}$].`
          break

        case 4: // citer les faces perpendiculaires à une face donnée
          [k, l, s] = [randint(0, 5), 0, randint(0, 3)]
          enonce += `Quelles sont les faces perpendiculaires à la face $${nom[facesPerp[k][l][s]] + nom[facesPerp[k][l][(s + 1) % 4]] + nom[facesPerp[k][l][(s + 2) % 4]] + nom[facesPerp[k][l][(s + 3) % 4]]}$ ?<br>`
          correction = `Les faces perpendiculaires à la face $${nom[facesPerp[k][l][s]] + nom[facesPerp[k][l][(s + 1) % 4]] + nom[facesPerp[k][l][(s + 2) % 4]] + nom[facesPerp[k][l][(s + 3) % 4]]}$ `
          correction += `sont les faces $${nom[facesPerp[k][l + 1][s]] + nom[facesPerp[k][l + 1][(s + 1) % 4]] + nom[facesPerp[k][l + 1][(s + 2) % 4]] + nom[facesPerp[k][l + 1][(s + 3) % 4]]}$, `
          correction += `$${nom[facesPerp[k][l + 2][s]] + nom[facesPerp[k][l + 2][(s + 1) % 4]] + nom[facesPerp[k][l + 2][(s + 2) % 4]] + nom[facesPerp[k][l + 2][(s + 3) % 4]]}$, `
          correction += `$${nom[facesPerp[k][l + 3][s]] + nom[facesPerp[k][l + 3][(s + 1) % 4]] + nom[facesPerp[k][l + 3][(s + 2) % 4]] + nom[facesPerp[k][l + 3][(s + 3) % 4]]}$ et `
          correction += `$${nom[facesPerp[k][l + 4][s]] + nom[facesPerp[k][l + 4][(s + 1) % 4]] + nom[facesPerp[k][l + 4][(s + 2) % 4]] + nom[facesPerp[k][l + 4][(s + 3) % 4]]}$.`
          break
      }

      switch (listeTypeDeQuestions[i] % 2) {
        case 1:
          A = point(6, 0, nom[0], 'left')
          B = point(11, 0, nom[1], 'right')
          C = point(11, 5, nom[2], 'right')
          D = point(6, 5, nom[3], 'left')
          p = polygone(A, B, C, D)
          E = similitude(B, A, anglepersp, coeffpersp, nom[4], 'left')
          E.x = Math.round(E.x)
          E.y = Math.round(E.y)
          break

        case 0:
          A = point(5, 0, nom[0], 'left')
          B = point(9 + randint(1, 3), 0, nom[1], 'right')
          C = point(B.x, randint(3, 7), nom[2], 'right')
          D = point(A.x, C.y, nom[3], 'left')
          p = polygone(A, B, C, D)
          E = similitude(B, A, anglepersp, coeffpersp * randint(5, 12) / 10, nom[4], 'left')
          E.x = Math.round(E.x)
          E.y = Math.round(E.y)
          break
      }

      p = polygone(A, B, C, D)
      F = translation2Points(E, A, B, nom[5], 'right')
      G = translation2Points(F, B, C, nom[6], 'right')
      H = translation2Points(G, C, D, nom[7], 'left')
      AB = segment(A, B)
      BC = segment(B, C)
      CD = segment(C, D)
      DA = segment(D, A)
      EF = segment(E, F)
      FG = segment(F, G)
      GH = segment(G, H)
      HE = segment(H, E)
      AE = segment(A, E)
      BF = segment(B, F)
      CG = segment(C, G)
      DH = segment(D, H)
      AB.epaisseur = 2
      BC.epaisseur = 2
      CD.epaisseur = 2
      DA.epaisseur = 2
      EF.epaisseur = 2
      FG.epaisseur = 2
      GH.epaisseur = 2
      HE.epaisseur = 2
      AE.epaisseur = 2
      BF.epaisseur = 2
      CG.epaisseur = 2
      DH.epaisseur = 2
      AB.color = 'black'
      BC.color = 'black'
      CD.color = 'black'
      DA.color = 'black'
      EF.color = 'black'
      FG.color = 'black'
      GH.color = 'black'
      HE.color = 'black'
      AE.color = 'black'
      BF.color = 'black'
      CG.color = 'black'
      if (G.y < C.y && G.x < C.x) {
        CG.pointilles = 5
        CG.color = 'gray'
        CG.opacite = 0.7
        GH.pointilles = 5
        GH.color = 'gray'
        GH.opacite = 0.7
        FG.pointilles = 5
        FG.color = 'gray'
        FG.opacite = 0.7
      } else if (E.y > A.y && E.x > A.x) {
        AE.pointilles = 5
        EF.pointilles = 5
        HE.pointilles = 5
        AE.color = 'gray'
        EF.color = 'gray'
        HE.color = 'gray'
        AE.opacite = 0.7
        EF.opacite = 0.7
        HE.opacite = 0.7
      } else if (F.x < B.x && F.y > B.y) {
        BF.pointilles = 5
        FG.pointilles = 5
        EF.pointilles = 5
        BF.color = 'gray'
        FG.color = 'gray'
        EF.color = 'gray'
        BF.opacite = 0.7
        FG.opacite = 0.7
        EF.opacite = 0.7
      } else if (H.x > D.x && H.y < D.y) {
        DH.pointilles = 5
        GH.pointilles = 5
        HE.pointilles = 5
        DH.color = 'gray'
        GH.color = 'gray'
        HE.color = 'gray'
        DH.opacite = 0.7
        GH.opacite = 0.7
        HE.opacite = 0.7
      }
      Xmin = Math.min(A.x, E.x) - 1
      Ymin = Math.min(A.y, E.y) - 1
      Xmax = Math.max(B.x, F.x) + 2
      Ymax = Math.max(D.y, H.y) + 1
      ppc = 20

      if (this.sup2 < 3) g = grille(Xmin, Ymin, Xmax, Ymax, 'gray', 0.7)
      else g = ''
      if (parseInt(this.sup2) === 2) {
        carreaux = seyes(Xmin, Ymin, Xmax, Ymax)
        sc = 0.8
      } else {
        carreaux = ''
        sc = 0.5
      }
      objetsEnonce.push(AB, BC, CD, DA, EF, FG, GH, HE, AE, BF, CG, DH, labelPoint(A, B, C, D, E, F, G, H), p,
        g,
        carreaux
      )

      const params = {
        xmin: Xmin,
        ymin: Ymin,
        xmax: Xmax,
        ymax: Ymax,
        pixelsParCm: ppc,
        scale: sc
      }

      enonce += mathalea2d(params, objetsEnonce)
      if (listeTypeDeQuestions[i] === 1) {
        codesseg = [codageSegments('||', 'green', [A, B, C, D, A, E, F, G, H, E]), codageSegments('||', 'green', B, F, C, G, D, H)]
        AB.color = 'green'
        BC.color = 'green'
        CD.color = 'green'
        DA.color = 'green'
        EF.color = 'green'
        FG.color = 'green'
        GH.color = 'green'
        HE.color = 'green'
        AE.color = 'green'
        BF.color = 'green'
        CG.color = 'green'
        DH.color = 'green'
      } else {
        codesseg = [codageSegments('||', 'green', A, B, C, D, E, F, G, H), codageSegments('O', 'red', A, E, B, F, C, G, D, H), codageSegments('×', 'blue', D, A, B, C, F, G, H, E)]
        AB.color = 'green'
        BC.color = 'blue'
        CD.color = 'green'
        DA.color = 'blue'
        EF.color = 'green'
        FG.color = 'blue'
        GH.color = 'green'
        HE.color = 'blue'
        AE.color = 'red'
        BF.color = 'red'
        CG.color = 'red'
        DH.color = 'red'
      }

      objetsCorrection.push(AB, BC, CD, DA, EF, FG, GH, HE, AE, BF, CG, DH, labelPoint(A, B, C, D, E, F, G, H),
        g,
        carreaux
      )

      if (listeTypeDeQuestions[i] < 3) correction += mathalea2d(params, objetsCorrection, codesseg)

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
  this.besoinFormulaireNumerique = ['Type de solides', 3, ' 1 : Cubes\n 2 : Pavés droits\n 3 : Mélange']
  this.besoinFormulaire2Numerique = [
    'Type de cahier',
    3,
    ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche'
  ]
}
