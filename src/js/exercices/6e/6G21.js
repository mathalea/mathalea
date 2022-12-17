import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, shuffle, combinaisonListes, calcul, creerNomDePolygone, stringNombre, texteEnCouleur } from '../../modules/outils.js'
import { point, pointAdistance, droite, droiteParPointEtPerpendiculaire, polygoneAvecNom, cercle, labelPoint, tracePoint, pointIntersectionLC, pointIntersectionCC, traceCompas, codageAngleDroit, afficheLongueurSegment, milieu, segment, codageSegments, texteSurSegment } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'

export const titre = 'Construire un triangle avec les instruments'

/**
 * Publié le 30/08/202
 * @author Jean-Claude Lhote (exercice) et Rémi Angot (animation Instrumenpoche)
 * @author Guironnet Refactoring et ajout des cas 4 à 10.
 * Référence 6G21 et 5G20-0
 * Modifié 2021/04/02
 */
export const uuid = 'e0bc9'
export const ref = '6G21'
export default function ConstruireUnTriangle () {
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 2
  this.nbCols = 1
  this.nbColsCorr = 1
  this.classe = 6
  this.typeExercice = 'IEP'
  this.besoinFormulaireNumerique = ['Type de constructions', 10, '1 : Trois longueurs\n2 : Angle droit et deux longueurs\n3 : Mélange (1 et 2)\n4 : Trois longueurs avec auto-vérification\n5 : Isocèle avec deux longueurs avec auto-vérification\n6 : Rectangle avec deux longueurs dont hypoténuse avec auto-vérification\n7 : Rectangle avec deux longueurs sans hypoténuse avec auto-vérification\n8 : Equilatéral avec auto-vérification\n9 : Mélange (5, 6, 7 ,8)\n10 : Mélange (4, 5, 6, 7 ,8)']
  this.sup = 3
  this.besoinFormulaire2CaseACocher = ['Ne pas montrer de schéma']
  this.sup2 = false

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let IEP
    let typesDeQuestionsDisponibles, A, B, C, CC, lAB, lBC, lAC, cA, cB, T, TT, dBC, dAB, objetsEnonce, objetsCorrection, paramsEnonce, paramsCorrection, nom, sommets
    if (this.classe === 6 || this.classe === 5) {
      switch (parseInt(this.sup)) {
        case 1 :
          typesDeQuestionsDisponibles = [1]
          break
        case 2 :
          typesDeQuestionsDisponibles = [2]
          break
        case 3 :
          typesDeQuestionsDisponibles = [1, 2]
          break
        case 4 :
          typesDeQuestionsDisponibles = [3]
          break
        case 5 :
          typesDeQuestionsDisponibles = [4]
          break
        case 6 :
          typesDeQuestionsDisponibles = [5]
          break
        case 7 :
          typesDeQuestionsDisponibles = [6]
          break
        case 8 :
          typesDeQuestionsDisponibles = [7]
          break
        case 9 :
          typesDeQuestionsDisponibles = [4, 5, 6, 7]
          break
        case 10 :
          typesDeQuestionsDisponibles = [3, 4, 5, 6, 7]
          break
        default :
          typesDeQuestionsDisponibles = [1, 2]
          break
      }
    } else typesDeQuestionsDisponibles = [1]
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let listeDeNomsDePolygones
    for (let i = 0, texte, texteCorr, verif, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (i % 5 === 0) listeDeNomsDePolygones = ['PQD']
      IEP = new Alea2iep()
      objetsEnonce = []
      objetsCorrection = []
      if (!this.sup2) {
        texte = 'Le triangle ci-dessous a été réalisé à main levée.<br>Construire ce triangle avec les instruments de géométrie en respectant les mesures indiquées.<br>'
      }
      texteCorr = 'Voici la construction que tu devais réaliser.<br>'
      nom = creerNomDePolygone(4, listeDeNomsDePolygones)
      listeDeNomsDePolygones.push(nom)
      sommets = []
      for (let i = 0; i < 3; i++) sommets.push(nom[i])
      sommets = shuffle(sommets)
      sommets.push(nom[3]) // milieu
      A = point(0, 0, sommets[0], 'left')
      switch (listeTypeDeQuestions[i]) {
        case 1: // triangle donné par trois longueurs
          lAC = randint(35, 45)
          lBC = calcul(randint(35, 45, lAC) / 10)
          lAB = calcul(randint(46, 60) / 10)
          lAC = calcul(lAC / 10)
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
          B.positionLabel = 'right'
          cA = cercle(A, lAC)
          cB = cercle(B, lBC)
          C = pointIntersectionCC(cA, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, 0) / 10, C.y + randint(-5, 5, 0) / 10, sommets[2])
          objetsEnonce.push(afficheLongueurSegment(B, A), texteSurSegment(`${stringNombre(segment(B, C).longueur, 1)} cm`, CC, B), texteSurSegment(`${stringNombre(segment(A, C).longueur, 1)} cm`, A, CC))
          objetsCorrection.push(traceCompas(A, C, 30, 'gray', 1, 2), traceCompas(B, C, 30, 'gray', 1, 2), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(A, C))
          if (this.sup2) {
            texte = `Construire un triangle $${sommets[0]}${sommets[1]}${sommets[2]}$ avec $${sommets[0]}${sommets[1]} = ${stringNombre(lAB)}~\\text{cm}$, $${sommets[1]}${sommets[2]} = ${stringNombre(lBC)}~\\text{cm}$ et $${sommets[0]}${sommets[2]} = ${stringNombre(lAC)}~\\text{cm}$.<br>`
          }
          texteCorr += 'Pour cette construction, nous avons utilisé le compas et la règle graduée.<br>'
          IEP.triangle3longueurs(sommets, lAB, lAC, lBC)
          break

        case 2: // triangle rectangle donné par longueur hypoténuse et un côté de l'angle droit.
          lAC = randint(70, 80) / 10
          lAB = calcul(randint(46, 60) / 10)
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
          cA = cercle(A, lAC)
          dAB = droite(A, B)
          dBC = droiteParPointEtPerpendiculaire(B, dAB)
          C = pointIntersectionLC(dBC, cA, sommets[2], 1)
          CC = point(C.x + randint(-5, 5, 0) / 10, C.y + randint(-5, 5, 0) / 10, sommets[2])

          objetsEnonce.push(afficheLongueurSegment(B, A), texteSurSegment(`${stringNombre(segment(A, C).longueur, 1)} cm`, CC, A), codageAngleDroit(A, B, CC))
          objetsCorrection.push(traceCompas(A, C, 30, 'gray', 1, 2), codageAngleDroit(A, B, C), afficheLongueurSegment(B, A), afficheLongueurSegment(C, A))
          if (this.sup2) {
            texte = `Construire un triangle $${sommets[0]}${sommets[1]}${sommets[2]}$ rectangle en $${sommets[1]}$ avec $${sommets[0]}${sommets[1]} = ${stringNombre(lAB)}~\\text{cm}$ et $${sommets[0]}${sommets[2]} = ${stringNombre(lAC)}~\\text{cm}$.<br>`
          }
          texteCorr += 'Pour cette construction, nous avons utilisé la règle graduée, l\'équerre et le compas.<br>'

          IEP.triangleRectangleCoteHypotenuse(sommets, lAB, lAC)
          break
        case 3: {
          // triangle quelconque donné par trois longueurs et auto-correction
          lAB = randint(2, 5) * 20 // paire seulement!
          let ok = false; let disSave = [0, 0, 0, 1000]; let dis
          for (let kk = 0; kk < 10 && !ok; kk++) {
            lBC = randint(30, 80, lAB)
            for (let jj = 0; jj < 30; jj++) {
              lAC = randint(Math.max(Math.abs(lAB - lBC) + 20, 30), Math.min(lAB + lBC - 20, 150))
              const m = Math.sqrt(lAC * lAC * 0.01 / 2 + lBC * lBC * 0.01 / 2 - lAB * lAB * 0.01 / 4)
              dis = [lAB, lBC, lAC, m - Math.floor(m * 10) * 0.1]
              if (dis[3] < 0.005) {
                // console.log('i:' + i + ':kk:' + kk + ':jj:' + jj + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB + ':d:' + m)
                // console.log('ok')
                disSave = dis
                ok = true
                break
              } else {
                // console.log('i:' + i + ':kk:' + kk + ':jj:' + jj + ':d:' + m + 'dmin:' + dis[3])
                // console.log('i:' + i + ':kk:' + kk + ':jj:' + jj + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB)
                if (dis[3] < disSave[3]) {
                  disSave = dis
                }
              }
            }
          }
          lAB = calcul(disSave[0] / 10)
          lBC = calcul(disSave[1] / 10)
          lAC = calcul(disSave[2] / 10)
          B = pointAdistance(A, lAB, randint(-10, 10), sommets[1])
          B.positionLabel = 'right'
          cA = cercle(A, lAC)
          cB = cercle(B, lBC)
          C = pointIntersectionCC(cA, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, 0) / 10, C.y + randint(-5, 5, 0) / 10, sommets[2])
          objetsEnonce.push(afficheLongueurSegment(B, A), texteSurSegment(`${stringNombre(segment(B, C).longueur, 1)} cm`, CC, B), texteSurSegment(`${stringNombre(segment(A, C).longueur, 1)} cm`, A, CC))
          objetsCorrection.push(traceCompas(A, C, 30, 'gray', 1, 2), traceCompas(B, C, 30, 'gray', 1, 2), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(A, C))
          const mil = labelPoint(milieu(A, B, sommets[3], 'above right'))
          mil.positionLabel = 'above right'
          objetsCorrection.push(mil, tracePoint(milieu(A, B)), segment(milieu(A, B), C, 'red'), codageSegments('||', 'red', milieu(A, B), B), codageSegments('||', 'red', milieu(A, B), A), afficheLongueurSegment(milieu(A, B), C, 'black', 0.5, 'cm', false, 2))
          if (this.sup2) {
            texte = `Construire un triangle $${sommets[0]}${sommets[1]}${sommets[2]}$ tel que $${sommets[0]}${sommets[1]} = ${stringNombre(lAB)}~\\text{cm}$, $${sommets[1]}${sommets[2]} = ${stringNombre(lBC)}~\\text{cm}$ et $${sommets[0]}${sommets[2]} = ${stringNombre(lAC)}~\\text{cm}$.<br>`
          }
          texte += `Puis placer le point $${sommets[3]}$ milieu de $[${sommets[0]}${sommets[1]}]$, tracer le segment $[${sommets[3]}${sommets[2]}]$ et mesurer la longueur de ce segment.<br>`
          verif = texteEnCouleur(`Auto-vérification : le segment $[${sommets[3]}${sommets[2]}]$ mesure environ ${stringNombre(segment(milieu(A, B), C).longueur, 2)} cm`) + '.<br>'
          texteCorr += 'Pour cette construction, nous avons utilisé le compas et la règle graduée.<br>'
          IEP.recadre(-1, Math.max(A.y, B.y, C.y) + 3)
          const [Ai, Bi, Ci] = IEP.triangle3longueurs(sommets.slice(0, 3), lAB, lAC, lBC, false)
          IEP.regleMontrer(Ai)
          IEP.regleRotation(Bi)
          IEP.pointCreer(milieu(Ai, Bi), { dx: 0, dy: -0.5, label: sommets[3] })
          IEP.regleMasquer()
          IEP.segmentCodage(Ai, milieu(Ai, Bi), { codage: 'X' })
          IEP.segmentCodage(Bi, milieu(Ai, Bi), { codage: 'X' })
          IEP.regleSegment(Ci, milieu(Ai, Bi))
          IEP.regleMasquer()
          IEP.crayonMasquer()
          IEP.textePoint(`${segment(Ci, milieu(Ai, Bi)).longueur} cm`, milieu(Ci, milieu(Ai, Bi)))
          break
        }
        case 4: {
          // triangle isocèle donné par deux longueurs et auto-correction
          let ok = false; let disSave = [0, 0, 0, 1000]; let dis
          for (let jj = 0; jj < 20; jj++) {
            lAB = randint(20, 50) * 2 // paire seulement!
            for (let kk = 0; kk < 20 && !ok; kk++) {
              lBC = randint(lAB / 2 + 20, 80, lAB)
              lAC = lBC
              const m = Math.sqrt(lAC * lAC * 0.01 / 2 + lBC * lBC * 0.01 / 2 - lAB * lAB * 0.01 / 4)
              dis = [lAB, lBC, lAC, m - Math.floor(m * 10) * 0.1]
              if (dis[3] < 0.005) {
                // console.log('i:' + i + ':kk:' + kk + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB + ':d:' + m)
                // console.log('ok')
                disSave = dis
                ok = true
                break
              } else {
                // console.log('i:' + i + ':kk:' + kk + ':d:' + m + 'dmin:' + (m - Math.floor(m * 10) * 0.1))
                // console.log('i:' + i + ':kk:' + kk + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB)
                if (dis[3] < disSave[3]) {
                  disSave = dis
                }
              }
            }
          }
          lAB = calcul(disSave[0] / 10)
          lBC = calcul(disSave[1] / 10)
          lAC = calcul(disSave[2] / 10)
          B = pointAdistance(A, lAB, randint(-10, 10), sommets[1])
          B.positionLabel = 'right'
          cA = cercle(A, lAC)
          cB = cercle(B, lBC)
          C = pointIntersectionCC(cA, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, 0) / 10, C.y + randint(-5, 5, 0) / 10, sommets[2])

          objetsEnonce.push(afficheLongueurSegment(B, A), texteSurSegment(`${stringNombre(segment(B, C).longueur, 1)} cm`, CC, B), texteSurSegment(`${stringNombre(segment(A, C).longueur, 1)} cm`, A, CC))
          objetsCorrection.push(traceCompas(A, C, 30, 'gray', 1, 2), traceCompas(B, C, 30, 'gray', 1, 2), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(A, C))
          const mil = labelPoint(milieu(A, B, sommets[3], 'above right'))
          mil.positionLabel = 'above right'
          objetsCorrection.push(mil, tracePoint(milieu(A, B)), segment(milieu(A, B), C, 'red'), codageSegments('||', 'red', milieu(A, B), B), codageSegments('||', 'red', milieu(A, B), A), afficheLongueurSegment(milieu(A, B), C, 'black', 0.5, 'cm', false, 2))
          if (this.sup2) {
            texte = `Construire un triangle $${sommets[0]}${sommets[1]}${sommets[2]}$ isocèle en $${sommets[2]}$ tel que ${randint(0, 1) === 0 ? `$${sommets[0]}${sommets[1]} = ${stringNombre(lAB)}~\\text{cm}$ et $${sommets[1]}${sommets[2]} = ${stringNombre(lBC)}~\\text{cm}$` : `$${sommets[1]}${sommets[2]} = ${stringNombre(lBC)}~\\text{cm}$ et $${sommets[0]}${sommets[1]} = ${stringNombre(lAB)}~\\text{cm}$`} .<br>`
          }
          texte += `Puis placer le point $${sommets[3]}$ milieu de $[${sommets[0]}${sommets[1]}]$, tracer le segment $[${sommets[3]}${sommets[2]}]$ et mesurer la longueur de ce segment.<br>`
          verif = texteEnCouleur(`Auto-vérification : le segment $[${sommets[3]}${sommets[2]}]$ mesure environ ${stringNombre(segment(milieu(A, B), C).longueur, 2)} cm`) + '.<br>'
          texteCorr += 'Pour cette construction, nous avons utilisé le compas et la règle graduée.<br>'
          IEP.recadre(-1, Math.max(A.y, B.y, C.y) + 3)
          const [Ai, Bi, Ci] = IEP.triangle3longueurs(sommets.slice(0, 3), lAB, lAC, lBC, false)
          IEP.regleMontrer(Ai)
          IEP.regleRotation(Bi)
          IEP.pointCreer(milieu(Ai, Bi), { dx: 0, dy: -0.5, label: sommets[3] })
          IEP.regleMasquer()
          IEP.segmentCodage(Ai, milieu(Ai, Bi), { codage: 'X' })
          IEP.segmentCodage(Bi, milieu(Ai, Bi), { codage: 'X' })
          IEP.regleSegment(Ci, milieu(Ai, Bi))
          IEP.regleMasquer()
          IEP.crayonMasquer()
          IEP.textePoint(`${segment(Ci, milieu(Ai, Bi)).longueur} cm`, milieu(Ci, milieu(Ai, Bi)))
          break
        }
        case 5: {
          // triangle rectangle avec deux longueurs et auto-correction
          let ok = false; let disSave = [0, 0, 0, 1000]; let dis
          for (let jj = 0; jj < 20; jj++) {
            lAB = randint(20, 50) * 2 // paire seulement!
            for (let kk = 0; kk < 20 && !ok; kk++) {
              lBC = randint(lAB / 2 + 5, 60, lAB) * 2
              lAC = Math.sqrt(lBC * lBC - lAB * lAB)
              dis = [lAB, lBC, lAC, lAC - Math.floor(lAC)]
              if (dis[3] < 0.005) {
                // console.log('i:' + i + ':kk:' + kk + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB + ':d:' + dis[3])
                // console.log('ok')
                disSave = dis
                ok = true
                break
              } else {
                // console.log('i:' + i + ':kk:' + kk + ':d:' + dis[3] + 'dmin:' + disSave[3])
                // console.log('i:' + i + ':kk:' + kk + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB)
                if (dis[3] < disSave[3]) {
                  disSave = dis
                }
              }
            }
          }
          lAB = calcul(disSave[0] / 10)
          lBC = calcul(disSave[1] / 10)
          lAC = calcul(disSave[2] / 10)
          B = pointAdistance(A, lAB, randint(-10, 10), sommets[1])
          B.positionLabel = 'right'
          cA = cercle(A, lAC)
          cB = cercle(B, lBC)
          C = pointIntersectionCC(cA, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, 0) / 10, C.y + randint(-5, 5, 0) / 10, sommets[2])

          objetsEnonce.push(afficheLongueurSegment(B, A), texteSurSegment(`${stringNombre(segment(B, C).longueur, 1)} cm`, CC, B), codageAngleDroit(B, A, CC))
          objetsCorrection.push(traceCompas(B, C, 30, 'gray', 1, 2), codageAngleDroit(B, A, C), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(A, C))
          const mil = labelPoint(milieu(C, B, sommets[3], 'left'))
          mil.positionLabel = 'left'
          objetsCorrection.push(mil, tracePoint(milieu(C, B)), segment(milieu(C, B), A, 'red'), codageSegments('||', 'red', milieu(B, C), C), codageSegments('||', 'red', milieu(C, B), B), afficheLongueurSegment(milieu(C, B), A, 'black', 0.5, 'cm', false, 2))
          if (this.sup2) {
            texte = `Construire un triangle $${sommets[0]}${sommets[1]}${sommets[2]}$ rectangle en $${sommets[0]}$ avec $${sommets[1]}${sommets[2]} = ${stringNombre(lBC)}~\\text{cm}$ et $${sommets[0]}${sommets[1]} = ${stringNombre(lAB)}~\\text{cm}$.<br>`
          }
          texte += `Puis placer le point $${sommets[3]}$ milieu de $[${sommets[1]}${sommets[2]}]$, tracer le segment $[${sommets[3]}${sommets[0]}]$ et mesurer la longueur de ce segment.<br>`
          verif = texteEnCouleur(`Auto-vérification : le segment $[${sommets[3]}${sommets[0]}]$ mesure environ ${stringNombre(segment(milieu(C, B), A).longueur, 2)} cm`) + '.<br>'
          texteCorr += 'Pour cette construction, nous avons utilisé la règle graduée, l\'équerre et le compas.<br>'

          IEP.recadre(-1, Math.max(A.y, B.y, C.y) + 3)
          const [Ai, Bi, Ci] = IEP.triangleRectangleCoteHypotenuse(sommets.slice(0, 3), lAB, lBC, false)
          IEP.regleMontrer(Ci)
          IEP.regleRotation(Bi)
          IEP.pointCreer(milieu(Ci, Bi), { dx: 0, dy: -0.5, label: sommets[3] })
          IEP.regleMasquer()
          IEP.segmentCodage(Ci, milieu(Ci, Bi), { codage: 'X' })
          IEP.segmentCodage(Bi, milieu(Ci, Bi), { codage: 'X' })
          IEP.regleSegment(Ai, milieu(Ci, Bi))
          IEP.regleMasquer()
          IEP.crayonMasquer()
          IEP.textePoint(`${segment(Ai, milieu(Ci, Bi)).longueur} cm`, milieu(Ai, milieu(Ci, Bi)))
          break
        }
        case 6: {
          // triangle rectangle avec deux longueurs sans hypoténuse et auto-correction
          let ok = false; let disSave = [0, 0, 0, 1000]; let dis
          for (let jj = 0; jj < 20; jj++) {
            lAB = randint(20, 50) * 2 // paire seulement!
            for (let kk = 0; kk < 20 && !ok; kk++) {
              lBC = randint(lAB / 2 + 5, 60, lAB) * 2
              lAC = Math.sqrt(lBC * lBC - lAB * lAB)
              dis = [lAB, lBC, lAC, lAC - Math.floor(lAC)]
              if (dis[3] < 0.005) {
                // console.log('i:' + i + ':kk:' + kk + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB + ':d:' + dis[3])
                // console.log('ok')
                disSave = dis
                ok = true
                break
              } else {
                // console.log('i:' + i + ':kk:' + kk + ':d:' + dis[3] + 'dmin:' + disSave[3])
                // console.log('i:' + i + ':kk:' + kk + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB)
                if (dis[3] < disSave[3]) {
                  disSave = dis
                }
              }
            }
          }
          lAB = calcul(disSave[0] / 10)
          lBC = calcul(disSave[1] / 10)
          lAC = calcul(disSave[2] / 10)
          B = pointAdistance(A, lAB, randint(-10, 10), sommets[1])
          B.positionLabel = 'right'
          cA = cercle(A, lAC)
          cB = cercle(B, lBC)
          C = pointIntersectionCC(cA, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, 0) / 10, C.y + randint(-5, 5, 0) / 10, sommets[2])

          objetsEnonce.push(afficheLongueurSegment(B, A), texteSurSegment(`${stringNombre(segment(A, C).longueur, 1)} cm`, A, CC), codageAngleDroit(B, A, CC))
          objetsCorrection.push(codageAngleDroit(B, A, C), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(A, C))
          const mil = labelPoint(milieu(C, B, sommets[3], 'left'))
          mil.positionLabel = 'left'
          objetsCorrection.push(mil, tracePoint(milieu(C, B)), segment(milieu(C, B), A, 'red'), codageSegments('||', 'red', milieu(B, C), C), codageSegments('||', 'red', milieu(C, B), B), afficheLongueurSegment(milieu(C, B), A, 'black', 0.5, 'cm', false, 2))
          if (this.sup2) {
            texte = `Construire un triangle $${sommets[0]}${sommets[1]}${sommets[2]}$ rectangle en $${sommets[0]}$ avec $${sommets[1]}${sommets[2]} = ${stringNombre(lBC)}~\\text{cm}$ et $${sommets[0]}${sommets[1]} = ${stringNombre(lAB)}~\\text{cm}$.<br>`
          }
          texte += `Puis placer le point $${sommets[3]}$ milieu de $[${sommets[1]}${sommets[2]}]$, tracer le segment $[${sommets[3]}${sommets[0]}]$ et mesurer la longueur de ce segment.<br>`
          verif = texteEnCouleur(`Auto-vérification : le segment $[${sommets[3]}${sommets[0]}]$ mesure environ ${stringNombre(segment(milieu(C, B), A).longueur, 2)} cm`) + '.<br>'
          texteCorr += 'Pour cette construction, nous avons utilisé la règle graduée et l\'équerre.<br>'

          IEP.recadre(-1, Math.max(A.y, B.y, C.y) + 3)
          const [Ai, Bi, Ci] = IEP.triangleRectangle2Cotes([sommets[1], sommets[0], sommets[2]], lAB, lAC, false)
          IEP.regleMontrer(Ai)
          IEP.regleRotation(Ci)
          IEP.pointCreer(milieu(Ai, Ci), { dx: 0, dy: -0.5, label: sommets[3] })
          IEP.regleMasquer()
          IEP.segmentCodage(Ci, milieu(Ci, Ai), { codage: 'X' })
          IEP.segmentCodage(Ai, milieu(Ci, Ai), { codage: 'X' })
          IEP.regleSegment(Bi, milieu(Ci, Ai))
          IEP.regleMasquer()
          IEP.crayonMasquer()
          IEP.textePoint(`${segment(Bi, milieu(Ai, Ci)).longueur} cm`, milieu(Bi, milieu(Ci, Ai)))
          break
        }
        case 7: {
          // triangle équilatéral et auto-correction
          let ok = false; let disSave = [0, 0, 0, 1000]; let dis
          const lastTest = []
          for (let jj = 0; jj < 50; jj++) {
            lAB = randint(20, 60, lastTest) * 2 // paire seulement!
            lastTest.push(lAB)
            for (let kk = 0; kk < 1 && !ok; kk++) {
              lBC = lAB
              lAC = lAB
              const m = Math.sqrt(lAC * lAC * 0.01 / 2 + lBC * lBC * 0.01 / 2 - lAB * lAB * 0.01 / 4)
              dis = [lAB, lBC, lAC, m - Math.floor(m * 10) * 0.1]
              if (dis[3] < 0.02) {
                // console.log('i:' + i + ':jj:' + jj + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB + ':d:' + m)
                // console.log('ok')
                disSave = dis
                ok = true
                break
              } else {
                // console.log('i:' + i + ':jj:' + jj + ':d:' + m + 'dmin:' + (m - Math.floor(m * 10) * 0.1))
                // console.log('i:' + i + ':jj:' + jj + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB)
                if (dis[3] < disSave[3]) {
                  disSave = dis
                }
              }
            }
          }
          lAB = calcul(disSave[0] / 10)
          lBC = calcul(disSave[1] / 10)
          lAC = calcul(disSave[2] / 10)
          B = pointAdistance(A, lAB, randint(-10, 10), sommets[1])
          B.positionLabel = 'right'
          cA = cercle(A, lAC)
          cB = cercle(B, lBC)
          C = pointIntersectionCC(cA, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, 0) / 10, C.y + randint(-5, 5, 0) / 10, sommets[2])

          objetsEnonce.push(afficheLongueurSegment(B, A), texteSurSegment(`${stringNombre(segment(B, C).longueur, 1)} cm`, CC, B), texteSurSegment(`${stringNombre(segment(A, C).longueur, 1)} cm`, A, CC))
          objetsCorrection.push(traceCompas(A, C, 30, 'gray', 1, 2), traceCompas(B, C, 30, 'gray', 1, 2), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(A, C))
          const mil = labelPoint(milieu(A, B, sommets[3], 'above right'))
          mil.positionLabel = 'above right'
          objetsCorrection.push(mil, tracePoint(milieu(A, B)), segment(milieu(A, B), C, 'red'), codageSegments('||', 'red', milieu(A, B), B), codageSegments('||', 'red', milieu(A, B), A), afficheLongueurSegment(milieu(A, B), C, 'black', 0.5, 'cm', false, 2))
          if (this.sup2) {
            texte = `Construire un triangle $${sommets[0]}${sommets[1]}${sommets[2]}$ équilatéral tel que $${sommets[0]}${sommets[1]} = ${stringNombre(lAB)}~\\text{cm}$.<br>`
          }
          texte += `Puis placer le point $${sommets[3]}$ milieu de $[${sommets[0]}${sommets[1]}]$, tracer le segment $[${sommets[3]}${sommets[2]}]$ et mesurer la longueur de ce segment.<br>`
          verif = texteEnCouleur(`Auto-vérification : le segment $[${sommets[3]}${sommets[2]}]$ mesure environ ${stringNombre(segment(milieu(A, B), C).longueur, 2)} cm`) + '.<br>'
          texteCorr += 'Pour cette construction, nous avons utilisé le compas et la règle graduée.<br>'
          IEP.recadre(-1, Math.max(A.y, B.y, C.y) + 3)
          const [Ai, Bi, Ci] = IEP.triangle3longueurs(sommets.slice(0, 3), lAB, lAC, lBC, false)
          IEP.regleMontrer(Ai)
          IEP.regleRotation(Bi)
          IEP.pointCreer(milieu(Ai, Bi), { dx: 0, dy: -0.5, label: sommets[3] })
          IEP.regleMasquer()
          IEP.segmentCodage(Ai, milieu(Ai, Bi), { codage: 'X' })
          IEP.segmentCodage(Bi, milieu(Ai, Bi), { codage: 'X' })
          IEP.regleSegment(Ci, milieu(Ai, Bi))
          IEP.regleMasquer()
          IEP.crayonMasquer()
          IEP.textePoint(`${segment(Ci, milieu(Ai, Bi)).longueur} cm`, milieu(Ci, milieu(Ai, Bi)))
          break
        }
      }
      T = polygoneAvecNom(A, B, C)
      TT = polygoneAvecNom(A, B, CC)
      objetsEnonce.push(TT[0], TT[1])
      objetsCorrection.push(T[0], T[1])
      paramsEnonce = { xmin: Math.min(A.x - 1, B.x - 1, CC.x - 1), ymin: Math.min(A.y - 1, B.y - 1, CC.y - 1), xmax: Math.max(A.x + 1, B.x + 1, CC.x + 1), ymax: Math.max(A.y + 1, B.y + 1, CC.y + 1), pixelsParCm: 30, scale: 0.6, mainlevee: true, amplitude: 0.3 }
      paramsCorrection = { xmin: Math.min(A.x - 1, B.x - 1, C.x - 2), ymin: Math.min(A.y - 1, B.y - 1, C.y - 2), xmax: Math.max(A.x + 1, B.x + 1, C.x + 2), ymax: Math.max(A.y + 1, B.y + 1, C.y + 2), pixelsParCm: 30, scale: 1 }

      if (!this.sup2) {
        texte += (context.vue === 'diap' ? '<center>' : '') + mathalea2d(paramsEnonce, objetsEnonce) + (context.vue === 'diap' ? '</center>' : '')
      }
      texteCorr += (context.vue === 'diap' ? '<center>' : '') + mathalea2d(paramsCorrection, objetsCorrection) + (context.vue === 'diap' ? '</center>' : '')
      texteCorr += verif
      texteCorr += IEP.htmlBouton(this.numeroExercice, i)

      if (this.questionJamaisPosee(i, lAB, lBC, lAC)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
