import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, creerNomDePolygone, texNombre, stringNombre, texteEnCouleur } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, polygoneRegulier, codageAngleDroit, pointAdistance, droiteParPointEtPerpendiculaire, droite, pointIntersectionLC, polygone, segment, texteSurSegment, milieu, afficheLongueurSegment, cercle, pointIntersectionCC } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'
export const titre = 'Tracer des carrés et des rectangles de longueurs données'

export const dateDePublication = '10/09/2022'

/**
 * Simple construction de rectangles et de carrés dont les longueur des côtés sont données avec pour autocorrection une vérification des mesures des diagonales.
 * @author Guillaume Valmont
 * Référence 6G13
*/
export const uuid = '2203a'
export const ref = '6G13'
export default class TracerCarresRectangleslongueurDonnees extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 4

    this.besoinFormulaireNumerique = ['Figure à tracer', 11, '1 : Carré\n2 : Rectangle\n3 : Carré (une diagonale)\n4 : Rectangle (une diagonale)\n5 : Losange (un côté et une diagonale)\n6 Losange (2 diagonales)\n7 : Parallélogramme\n8 : Mélange (1, 2)\n9 : mélange (1, 2, 3, 4)\n10 : Mélange (5, 6, 7)\n11 : Mélange (tous les cas)']
    this.sup = 8
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    let typesDeQuestionsDisponibles = ['Carré', 'Rectangle']
    if (this.sup === 1) typesDeQuestionsDisponibles = ['Carré']
    if (this.sup === 2) typesDeQuestionsDisponibles = ['Rectangle']
    if (this.sup === 3) typesDeQuestionsDisponibles = ['Carré1diag']
    if (this.sup === 4) typesDeQuestionsDisponibles = ['Rectangle1diag']
    if (this.sup === 5) typesDeQuestionsDisponibles = ['Losange']
    if (this.sup === 6) typesDeQuestionsDisponibles = ['Losange2diag']
    if (this.sup === 7) typesDeQuestionsDisponibles = ['Parallélogramme']
    if (this.sup === 8) typesDeQuestionsDisponibles = ['Carré', 'Rectangle']
    if (this.sup === 9) typesDeQuestionsDisponibles = ['Carré', 'Rectangle', 'Carré1diag', 'Rectangle1diag']
    if (this.sup === 10) typesDeQuestionsDisponibles = ['Losange', 'Losange2diag', 'Parallélogramme']
    if (this.sup === 11) typesDeQuestionsDisponibles = ['Carré', 'Rectangle', 'Carré1diag', 'Rectangle1diag', 'Losange', 'Losange2diag', 'Parallélogramme']

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const objetsCorrection = []
      const nomPoly = creerNomDePolygone(4)
      const A = point(0, 0, nomPoly.charAt(0), 'below left')
      let B, C, D, naturePoly, figure
      switch (listeTypeDeQuestions[i]) {
        case 'Carré': {
          naturePoly = 'carré'
          let ok = false; let disSave = [0, 0, 1000]; const old = []; let dis
          for (let jj = 0; jj < 20 && !ok; jj++) {
            const cote = randint(20, 50, old) * 2 // paire seulement!
            old.push(cote / 2)
            const diagonale = cote / Math.sqrt(2)
            const m = diagonale * 0.1 - Math.floor(diagonale /* * 0.1 * 10 */) * 0.1
            dis = [diagonale, cote, m]
            if (dis[2] < 0.005) {
              disSave = dis
              ok = true
              break
            } else {
              if (dis[2] < disSave[2]) {
                disSave = dis
              }
            }
          }
          B = point(dis[1] / 10, 0, nomPoly.charAt(1), 'below right')
          figure = polygoneRegulier(A, B, 4)
          C = point(figure.listePoints[2].x, figure.listePoints[2].y, nomPoly.charAt(2), 'above right')
          D = point(figure.listePoints[3].x, figure.listePoints[3].y, nomPoly.charAt(3), 'above left')
          break
        }

        case 'Carré1diag': {
          naturePoly = 'carré'
          let ok = false; let disSave = [0, 0, 1000]; const old = []; let dis
          for (let jj = 0; jj < 20 && !ok; jj++) {
            const diagonale = randint(25, 50, old) * 2 // paire seulement!
            old.push(diagonale / 2)
            const cote = diagonale / Math.sqrt(2)
            const m = cote * 0.1 - Math.floor(cote /* * 0.1 * 10  */) * 0.1
            dis = [diagonale, cote, m]
            if (dis[2] < 0.005) {
              disSave = dis
              ok = true
              break
            } else {
              if (dis[2] < disSave[2]) {
                disSave = dis
              }
            }
          }
          B = point(dis[1] / 10, 0, nomPoly.charAt(1), 'below right')
          figure = polygoneRegulier(A, B, 4)
          C = point(figure.listePoints[2].x, figure.listePoints[2].y, nomPoly.charAt(2), 'above right')
          D = point(figure.listePoints[3].x, figure.listePoints[3].y, nomPoly.charAt(3), 'above left')
          break
        }

        case 'Rectangle': {
          naturePoly = 'rectangle'
          let ok = false; let disSave = [0, 0, 0, 1000]; const old = []; let dis
          for (let jj = 0; jj < 20; jj++) {
            const lAB = randint(22, 45, old) * 2 // paire seulement!
            old.push(lAB / 2)
            for (let kk = 0; kk < 20 && !ok; kk++) {
              const lAC = randint(35, 60, lAB)
              const lBC = Math.sqrt(lAC * lAC + lAB * lAB)
              dis = [lAB, lBC, lAC, lBC * 0.1 - Math.floor(lBC /** 0.1 * 10 */) * 0.1]
              if (dis[3] < 0.005) {
                disSave = dis
                ok = true
                break
              } else {
                if (dis[3] < disSave[3]) {
                  disSave = dis
                }
              }
            }
          }
          B = point(dis[0] / 10, 0, nomPoly.charAt(1), 'below right')
          C = pointAdistance(B, dis[1] / 10, 90, nomPoly.charAt(2))
          D = pointAdistance(C, dis[0] / 10, 180, nomPoly.charAt(3))
          figure = polygone(A, B, C, D)
          break
        }

        case 'Rectangle1diag': {
          naturePoly = 'rectangle'
          let ok = false; let disSave = [0, 0, 0, 1000]; const old = []; let dis
          for (let jj = 0; jj < 20; jj++) {
            const lAB = randint(22, 45, old) * 2 // paire seulement!
            old.push(lAB / 2)
            for (let kk = 0; kk < 20 && !ok; kk++) {
              const lBC = randint(lAB + 5, 100)
              const lAC = Math.sqrt(lBC * lBC - lAB * lAB)
              dis = [lAB, lBC, lAC, lAC * 0.1 - Math.floor(lAC /** 0.1 * 10 */) * 0.1]
              if (dis[3] < 0.005) {
                disSave = dis
                ok = true
                break
              } else {
                if (dis[3] < disSave[3]) {
                  disSave = dis
                }
              }
            }
          }

          const diagonale = disSave[1] / 10
          B = point(dis[0] / 10, 0, nomPoly.charAt(1), 'below right')

          C = pointIntersectionLC(droiteParPointEtPerpendiculaire(B, droite(A, B)), cercle(A, diagonale), nomPoly[3], 1)
          C.positionLabel = 'above right'

          D = pointIntersectionLC(droiteParPointEtPerpendiculaire(A, droite(A, B)), cercle(B, diagonale), nomPoly[1], 1)
          D.positionLabel = 'above left'
          figure = polygone(A, B, C, D)
          break
        }

        case 'Losange': {
          naturePoly = 'losange'
          // triangle isocèle donné par deux longueurs et auto-correction
          let ok = false; let disSave = [0, 0, 0, 1000]; const old = []; let dis
          for (let jj = 0; jj < 20; jj++) {
            const base = randint(20, 50, old) * 2 // paire seulement!
            old.push(base / 2)
            for (let kk = 0; kk < 20 && !ok; kk++) {
              const cote = randint(base / 2 + 20, 80, base)
              const diagonale2 = 2 * Math.sqrt(cote * cote * 0.01 / 2 + cote * cote * 0.01 / 2 - base * base * 0.01 / 4)
              dis = [base, cote, cote, diagonale2 - Math.floor(diagonale2 * 10) * 0.1]
              if (dis[3] < 0.005) {
                disSave = dis
                ok = true
                break
              } else {
                if (dis[3] < disSave[3]) {
                  disSave = dis
                }
              }
            }
          }
          const diagonale = disSave[0] / 10
          const cote = disSave[1] / 10
          C = pointAdistance(A, diagonale, randint(-10, 10), nomPoly[2])
          C.positionLabel = 'right'
          const cA = cercle(A, cote)
          const cB = cercle(C, cote)
          B = pointIntersectionCC(cA, cB, nomPoly[1], 2)
          B.positionLabel = 'below'
          D = pointIntersectionCC(cA, cB, nomPoly[3], 1)
          D.positionLabel = 'above'
          figure = polygone(A, B, C, D)
          break
        }
        case 'Losange2diag' : {
          naturePoly = 'losange'
          // triangle rectangle avec deux longueurs et auto-correction
          let ok = false; let disSave = [0, 0, 0, 1000]; const old = []; let dis
          for (let jj = 0; jj < 10; jj++) {
            const lAB = randint(15, 30, old) * 2
            old.push(lAB)
            for (let kk = 0; kk < 20 && !ok; kk++) {
              const lAC = randint(15, 30, lAB) * 2
              const lBC = Math.sqrt(lAC * lAC + lAB * lAB)
              dis = [lAB, lBC, lAC, lAC * 0.1 - Math.floor(lAC /* 0.1 * 10 */) * 0.1]
              if (dis[3] < 0.005) {
                disSave = dis
                ok = true
                break
              } else {
                if (dis[3] < disSave[3]) {
                  disSave = dis
                }
              }
            }
          }
          const diagonale1 = 2 * disSave[0] / 10
          const diagonale2 = 2 * disSave[2] / 10
          C = pointAdistance(A, diagonale1, randint(-10, 10), nomPoly[2])
          C.positionLabel = 'right'
          B = pointIntersectionLC(droiteParPointEtPerpendiculaire(milieu(A, C), droite(A, C)), cercle(milieu(A, C), diagonale2 / 2), nomPoly[1], 2)
          B.positionLabel = 'below'
          D = pointIntersectionLC(droiteParPointEtPerpendiculaire(milieu(A, C), droite(A, C)), cercle(milieu(A, C), diagonale2 / 2), nomPoly[3], 1)
          D.positionLabel = 'above'
          figure = polygone(A, B, C, D)
          break
        }
        case 'Parallélogramme' : {
          naturePoly = 'parallélogramme'
          // triangle quelconque donné par trois longueurs et auto-correction
          const lAB = randint(25, 45) * 2 // paire seulement!
          let ok = false; let disSave = [0, 0, 0, 1000]; const old = []; let dis
          old.push(lAB)
          for (let kk = 0; kk < 10 && !ok; kk++) {
            const lBC = randint(30, 80, old)
            old.push(lBC)
            for (let jj = 0; jj < 30; jj++) {
              const lAC = randint(Math.max(Math.abs(lAB - lBC) + 20, 30), Math.min(lAB + lBC - 20, 150))
              const m = Math.sqrt(lAC * lAC * 0.01 / 2 + lBC * lBC * 0.01 / 2 - lAB * lAB * 0.01 / 4)
              dis = [lAB, lBC, lAC, m - Math.floor(m * 10) * 0.1]
              if (dis[3] < 0.005) {
                disSave = dis
                console.log('i:' + i + ':kk:' + kk + ':jj:' + jj + ':d:' + m + 'dmin:' + dis[3])
                console.log('OK i:' + i + ':kk:' + kk + ':jj:' + jj + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB)
                ok = true
                break
              } else {
                if (dis[3] < disSave[3]) {
                  console.log('i:' + i + ':kk:' + kk + ':jj:' + jj + ':d:' + m + 'dmin:' + dis[3])
                  console.log('i:' + i + ':kk:' + kk + ':jj:' + jj + ':a:' + lBC + ':b:' + lAC + ':c:' + lAB)
                  disSave = dis
                }
              }
            }
          }
          const diagonale1 = disSave[0] / 10
          const cote1 = disSave[1] / 10
          const cote2 = disSave[2] / 10
          C = pointAdistance(A, diagonale1, randint(-10, 10), nomPoly[2])
          C.positionLabel = 'right'
          D = pointIntersectionCC(cercle(A, cote1), cercle(C, cote2), nomPoly[3], 1)
          D.positionLabel = 'above'
          B = pointIntersectionCC(cercle(A, cote2), cercle(C, cote1), nomPoly[1], 2)
          B.positionLabel = 'below'
          figure = polygone(A, B, C, D)
          break
        }
      }
      const aA = listeTypeDeQuestions[i] === 'Carré' || listeTypeDeQuestions[i] === 'Rectangle' ? codageAngleDroit(B, A, D, 'red', 0.7, 1, 0.6, 'red', 0.2) : null
      const aB = listeTypeDeQuestions[i] === 'Carré' || listeTypeDeQuestions[i] === 'Rectangle' ? codageAngleDroit(A, B, C, 'red', 0.7, 1, 0.6, 'red', 0.2) : null
      const aC = listeTypeDeQuestions[i] === 'Carré' || listeTypeDeQuestions[i] === 'Rectangle' ? codageAngleDroit(B, C, D, 'red', 0.7, 1, 0.6, 'red', 0.2) : null
      const aD = listeTypeDeQuestions[i] === 'Carré' || listeTypeDeQuestions[i] === 'Rectangle' ? codageAngleDroit(C, D, A, 'red', 0.7, 1, 0.6, 'red', 0.2) : null
      const aE = listeTypeDeQuestions[i] === 'Losange2diag' || listeTypeDeQuestions[i] === 'Carré1diag' ? codageAngleDroit(C, milieu(A, C), D, 'red', 0.7, 1, 0.6, 'red', 0.2) : null
      const segmentAC = segment(A, C, 'blue')
      const segmentBC = segment(B, D, 'blue')
      const traces2 = tracePoint(A, B, C, D)
      const labels2 = labelPoint(A, B, C, D)
      figure.epaisseur = 2
      objetsCorrection.push(traces2, labels2, figure, aA, aB, aC, aD, aE, segmentAC, segmentBC)
      if (listeTypeDeQuestions[i] === 'Rectangle' || listeTypeDeQuestions[i] === 'Carré') {
        objetsCorrection.push(afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(D, C), afficheLongueurSegment(A, D))
        const txt = texteSurSegment(`${A.nom}${C.nom}≃${stringNombre(segment(A, C).longueur, 1)} cm`, milieu(A, C), C, 'blue')
        txt.mathOn = false
        txt.scale = 1.2
        objetsCorrection.push(txt)
      }
      if (listeTypeDeQuestions[i] === 'Carré1diag') {
        const txt = texteSurSegment(`${A.nom}${C.nom}=${stringNombre(segment(A, C).longueur, 1)} cm`, milieu(A, C), C)
        txt.mathOn = false
        const txt2 = texteSurSegment(`${B.nom}${D.nom}=${stringNombre(segment(B, D).longueur, 1)} cm`, milieu(B, D), D)
        txt2.mathOn = false
        const txt3 = texteSurSegment(`${D.nom}${C.nom}≃${stringNombre(segment(D, C).longueur, 1)} cm`, D, C, 'blue')
        txt3.mathOn = false
        txt3.scale = 1.2
        objetsCorrection.push(txt, txt2, txt3)
      }
      if (listeTypeDeQuestions[i] === 'Rectangle1diag') {
        objetsCorrection.push(afficheLongueurSegment(B, A))
        const txt = texteSurSegment(`${A.nom}${C.nom}=${stringNombre(segment(A, C).longueur, 1)} cm`, milieu(A, C), C)
        txt.mathOn = false
        const txt3 = texteSurSegment(`${B.nom}${C.nom}≃${stringNombre(segment(B, C).longueur, 1)} cm`, C, B, 'blue')
        txt3.mathOn = false
        txt3.scale = 1.2
        objetsCorrection.push(txt, txt3)
      }
      if (listeTypeDeQuestions[i] === 'Losange') {
        objetsCorrection.push(afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(D, C), afficheLongueurSegment(A, D))
        const txt = texteSurSegment(`${A.nom}${C.nom}=${stringNombre(segment(A, C).longueur, 1)} cm`, milieu(A, C), C)
        txt.mathOn = false
        const txt2 = texteSurSegment(`${B.nom}${D.nom}≃${stringNombre(segment(B, D).longueur, 1)} cm`, milieu(B, D), D, 'blue')
        txt2.mathOn = false
        txt2.scale = 1.2
        objetsCorrection.push(txt, txt2)
      }
      if (listeTypeDeQuestions[i] === 'Losange2diag') {
        const txt = texteSurSegment(`${A.nom}${C.nom}=${stringNombre(segment(A, C).longueur, 1)} cm`, milieu(A, C), C)
        txt.mathOn = false
        const txt2 = texteSurSegment(`${B.nom}${D.nom}=${stringNombre(segment(B, D).longueur, 1)} cm`, milieu(B, D), D)
        txt2.mathOn = false
        const txt3 = texteSurSegment(`${D.nom}${C.nom}≃${stringNombre(segment(D, C).longueur, 1)} cm`, D, C, 'blue')
        txt3.mathOn = false
        txt3.scale = 1.2
        objetsCorrection.push(txt, txt2, txt3)
      }
      if (listeTypeDeQuestions[i] === 'Parallélogramme') {
        const txt = texteSurSegment(`${A.nom}${C.nom}=${stringNombre(segment(A, C).longueur, 1)} cm`, milieu(A, C), C)
        txt.mathOn = false
        const txt2 = texteSurSegment(`${B.nom}${D.nom}≃${stringNombre(segment(B, D).longueur, 1)} cm`, milieu(A, C), B, 'blue')
        txt2.mathOn = false
        txt2.scale = 1.2
        objetsCorrection.push(txt, afficheLongueurSegment(A, D), afficheLongueurSegment(D, C), txt2)
      }

      const anim = new Alea2iep()
      if (listeTypeDeQuestions[i] === 'Rectangle' || listeTypeDeQuestions[i] === 'Carré') {
        anim.recadre(-segment(A, B).longueur, segment(B, C).longueur) // Déplace l'origine du repère (à mettre en premier obligatoirement)
        anim.pointCreer(A, { dx: -0.5, dy: -0.5, label: nomPoly.charAt(0) }) // On déplace les labels des points avec dx et dy
        anim.regleMontrer(A)
        anim.regleSegment(A, B)
        anim.pointCreer(B, { dx: 0.2, dy: -0.5, label: nomPoly.charAt(1) })
        anim.regleMasquer()
        anim.equerreMontrer(B)
        anim.equerreRotation(90)
        anim.crayonMontrer(B)
        anim.tracer(pointAdistance(B, segment(B, C).longueur + 2, 90))
        anim.equerreMasquer()
        anim.codageAngleDroit(A, B, C)
        anim.regleMontrer()
        anim.regleDeplacer(B)
        anim.regleRotation(90)
        anim.crayonMontrer()
        anim.crayonDeplacer(C)
        anim.pointCreer(C, { dx: 0.2, dy: 0.8, label: nomPoly.charAt(2), tempo: 10 })
        anim.crayonMasquer()
        anim.regleMasquer()
        anim.equerreRotation(90)
        anim.equerreMontrer(C)
        anim.crayonMontrer()
        anim.tracer(pointAdistance(C, segment(C, D).longueur + 2, -180))
        anim.codageAngleDroit(B, C, D)
        anim.equerreMasquer()
        anim.regleDeplacer(C)
        anim.regleMontrer()
        anim.regleRotation(180)
        anim.crayonDeplacer(D)
        anim.pointCreer(D, { dx: -0.5, dy: 0.8, label: nomPoly.charAt(3) })
        anim.regleSegment(D, A)
        anim.regleMasquer()
        anim.crayonMasquer()
      } else if (listeTypeDeQuestions[i] === 'Rectangle1diag') {
        anim.recadre(-segment(A, B).longueur, segment(B, C).longueur) // Déplace l'origine du repère (à mettre en premier obligatoirement)
        anim.pointCreer(A, { dx: -0.5, dy: -0.5, label: nomPoly.charAt(0) }) // On déplace les labels des points avec dx et dy
        anim.regleMontrer(A)
        anim.regleSegment(A, B)
        anim.pointCreer(B, { dx: 0.2, dy: -0.5, label: nomPoly.charAt(1) })
        anim.regleMasquer()

        anim.equerreMontrer(B)
        anim.equerreRotation(90)
        anim.crayonMontrer(B)
        anim.tracer(pointAdistance(B, segment(B, C).longueur + 2, 90))
        anim.equerreMasquer()
        anim.codageAngleDroit(A, B, C)

        anim.compasMontrer(A)
        anim.compasEcarterAvecRegle(segment(A, C).longueur)
        anim.regleMasquer()
        anim.compasTracerArcCentrePoint(A, C, 40)
        anim.compasMasquer()

        anim.crayonMontrer(C)
        anim.pointCreer(C, { dx: 0.2, dy: +0.5, label: nomPoly.charAt(2) })

        anim.equerreMontrer(C)
        anim.equerreRotation(90)
        anim.crayonMontrer(C)
        anim.tracer(pointAdistance(C, segment(A, C).longueur + 2, 180))
        anim.equerreMasquer()

        anim.compasMontrer(C)
        anim.compasEcarterAvecRegle(segment(A, B).longueur)
        anim.regleMasquer()
        anim.compasTracerArcCentrePoint(C, D, 40)
        anim.compasMasquer()
        anim.codageAngleDroit(B, C, D)

        anim.crayonMontrer(D)
        anim.pointCreer(D, { dx: -0.2, dy: +0.5, label: nomPoly.charAt(3) })
        anim.regleSegment(A, D)
        anim.regleMasquer()
        anim.crayonMasquer()
        anim.textePoint(`${nomPoly.charAt(1)}${nomPoly.charAt(2)} ≃ ${stringNombre(segment(B, C).longueur, 3, true)} cm`, milieu(B, C))
      } else if (listeTypeDeQuestions[i] === 'Losange' || listeTypeDeQuestions[i] === 'Parallélogramme') {
        anim.recadre(-segment(A, B).longueur, segment(B, D).longueur / 2) // Déplace l'origine du repère (à mettre en premier obligatoirement)
        anim.pointCreer(A, { dx: -0.5, dy: -0.5, label: nomPoly.charAt(0) }) // On déplace les labels des points avec dx et dy
        anim.regleMontrer(A)
        anim.regleSegment(A, C)
        anim.pointCreer(C, { dx: 0.2, dy: -0.5, label: nomPoly.charAt(2) })

        anim.compasMontrer(A)
        anim.compasEcarterAvecRegle(segment(A, B).longueur)
        anim.regleMasquer()
        anim.compasTracerArcCentrePoint(A, B, 40)
        anim.compasEcarterAvecRegle(segment(C, B).longueur)
        anim.regleMasquer()
        anim.compasTracerArcCentrePoint(C, B, 40)
        anim.compasMasquer()

        anim.crayonMontrer()
        anim.pointCreer(B, { dx: 0.2, dy: -0.5, label: nomPoly.charAt(1) })
        anim.regleSegment(A, B)
        anim.regleSegment(C, B)
        anim.crayonMasquer()
        anim.regleMasquer()

        anim.compasMontrer(A)
        anim.compasEcarterAvecRegle(segment(A, D).longueur)
        anim.regleMasquer()
        anim.compasTracerArcCentrePoint(A, D, 40)

        anim.compasMontrer(C)
        anim.compasEcarterAvecRegle(segment(C, D).longueur)
        anim.regleMasquer()
        anim.compasTracerArcCentrePoint(C, D, 40)
        anim.compasMasquer()

        anim.crayonMontrer()
        anim.pointCreer(D, { dx: 0.2, dy: +0.5, label: nomPoly.charAt(3) })
        anim.regleSegment(A, D)
        anim.regleSegment(C, D)
        anim.crayonMasquer()
        anim.regleMasquer()

        anim.regleSegment(B, D)
        anim.regleMasquer()
        anim.textePoint(`${nomPoly.charAt(1)}${nomPoly.charAt(3)} ≃ ${stringNombre(segment(B, D).longueur, 3, true)} cm`, milieu(B, D))
      } else if (listeTypeDeQuestions[i] === 'Losange2diag' || listeTypeDeQuestions[i] === 'Carré1diag') {
        anim.recadre(-segment(A, B).longueur, segment(B, D).longueur) // Déplace l'origine du repère (à mettre en premier obligatoirement)
        anim.pointCreer(A, { dx: -0.5, dy: -0.5, label: nomPoly.charAt(0) }) // On déplace les labels des points avec dx et dy
        anim.regleMontrer(A)
        anim.regleSegment(A, C)
        anim.pointCreer(C, { dx: 0.2, dy: -0.5, label: nomPoly.charAt(2) })

        anim.regleMontrer(A)
        anim.regleRotation(segment(A, C).angleAvecHorizontale)
        anim.crayonMontrer(milieu(A, C))
        anim.pointCreer(milieu(A, C))
        anim.regleMasquer()

        anim.equerreMontrer(milieu(A, C))
        anim.equerreRotation(segment(A, C).angleAvecHorizontale)
        anim.crayonMontrer(milieu(A, C))
        anim.tracer(pointAdistance(milieu(A, C), segment(B, D).longueur / 2 + 2, segment(A, C).angleAvecHorizontale + 90))
        anim.equerreMasquer()

        anim.regleMontrer()
        anim.regleSegment(pointAdistance(milieu(A, C), segment(B, D).longueur / 2 + 2, segment(A, C).angleAvecHorizontale + 270), pointAdistance(milieu(A, C), segment(B, D).longueur / 2 + 2, segment(A, C).angleAvecHorizontale + 90))
        anim.regleMasquer()

        anim.crayonMontrer(milieu(A, C))
        anim.codageAngleDroit(C, milieu(A, C), D)

        anim.regleMontrer(milieu(A, C))
        anim.regleRotation(segment(A, C).angleAvecHorizontale + 90)
        anim.crayonMontrer(D)
        anim.pointCreer(D, { dx: 0.2, dy: +0.5, label: nomPoly.charAt(3) })

        anim.regleDeplacer(milieu(A, C))
        anim.regleRotation(segment(A, C).angleAvecHorizontale + 90 + 180)
        anim.crayonMontrer(B)
        anim.pointCreer(B, { dx: 0.2, dy: -0.5, label: nomPoly.charAt(1) })

        anim.regleDeplacer(A)
        anim.regleSegment(A, B)
        anim.regleDeplacer(B)
        anim.regleSegment(B, C)
        anim.regleDeplacer(D)
        anim.regleSegment(D, C)
        anim.regleDeplacer(A)
        anim.regleSegment(A, D)
        anim.regleMasquer()
        anim.crayonMasquer()

        anim.textePoint(`${nomPoly.charAt(3)}${nomPoly.charAt(2)} ≃ ${stringNombre(segment(A, B).longueur, 3, true)} cm`, milieu(D, C))
      }

      texte = `Construire le ${naturePoly} $${nomPoly}$`
      if (listeTypeDeQuestions[i] === 'Rectangle' || listeTypeDeQuestions[i] === 'Carré') texte += ` avec $${A.nom + B.nom} = ${texNombre(segment(A, B).longueur, 2)}~\\text{cm}$`
      if (listeTypeDeQuestions[i] === 'Rectangle') texte += ` et $${B.nom + C.nom} = ${texNombre(segment(B, C).longueur, 2)}~\\text{cm}$`
      if (listeTypeDeQuestions[i] === 'Losange') texte += ` avec $${A.nom + B.nom} = ${texNombre(segment(A, B).longueur, 2)}~\\text{cm}$ et $${A.nom + C.nom} = ${texNombre(segment(A, C).longueur, 2)}~\\text{cm}$`
      if (listeTypeDeQuestions[i] === 'Losange2diag') texte += ` avec $${A.nom + C.nom} = ${texNombre(segment(A, C).longueur, 2)}~\\text{cm}$ et $${B.nom + D.nom} = ${texNombre(segment(B, D).longueur, 2)}~\\text{cm}$`
      if (listeTypeDeQuestions[i] === 'Carré1diag') texte += ` avec $${A.nom + C.nom} = ${texNombre(segment(A, C).longueur, 2)}~\\text{cm}$`
      if (listeTypeDeQuestions[i] === 'Rectangle1diag') texte += ` avec $${A.nom + B.nom} = ${texNombre(segment(A, B).longueur, 2)}~\\text{cm}$ et $${A.nom + C.nom} = ${texNombre(segment(A, C).longueur, 2)}~\\text{cm}$`
      if (listeTypeDeQuestions[i] === 'Parallélogramme') texte += ` avec $${A.nom + C.nom} = ${texNombre(segment(A, C).longueur, 2)}~\\text{cm}$, $${A.nom + D.nom} = ${texNombre(segment(A, D).longueur, 2)}~\\text{cm}$ et $${D.nom + C.nom} = ${texNombre(segment(D, C).longueur, 2)}~\\text{cm}$`
      texte += '.<br>'
      // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
      const xmin = Math.min(A.x, B.x, C.x, D.x) - 2
      const xmax = Math.max(A.x, B.x, C.x, D.x) + 2
      const ymin = Math.min(A.y, B.y, C.y, D.y) - 2
      const ymax = Math.max(A.y, B.y, C.y, D.y) + 2
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      const paramsCorrection = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 1 }
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr = mathalea2d(paramsCorrection, objetsCorrection)
      if (listeTypeDeQuestions[i] === 'Rectangle' || listeTypeDeQuestions[i] === 'Carré') texteCorr += `<br><br>${texteEnCouleur(`Pour l'auto-correction, on peut vérifier que $[${A.nom + C.nom}]$ et $[${B.nom + D.nom}]$ mesurent bien tous les deux $${texNombre(segment(A, C).longueur, 2)}~\\text{cm}$`)}.<br>`
      if (listeTypeDeQuestions[i] === 'Losange') texteCorr += `<br><br>${texteEnCouleur(`Pour l'auto-correction, on peut vérifier que $[${B.nom + D.nom}]$ mesure environ $${texNombre(segment(B, D).longueur, 2)}~\\text{cm}$`)}.<br>`
      if (listeTypeDeQuestions[i] === 'Losange2diag' || listeTypeDeQuestions[i] === 'Carré1diag') texteCorr += `<br><br>${texteEnCouleur(`Pour l'auto-correction, on peut vérifier que tous les côtés du ${naturePoly} mesure environ $${texNombre(segment(A, B).longueur, 2)}~\\text{cm}$`)}.<br>`
      if (listeTypeDeQuestions[i] === 'Rectangle1diag') texteCorr += `<br><br>${texteEnCouleur(`Pour l'auto-correction, on peut vérifier que $[${B.nom + C.nom}]$ mesure environ $${texNombre(segment(B, C).longueur, 2)}~\\text{cm}$`)}.<br>`
      if (listeTypeDeQuestions[i] === 'Parallélogramme') texteCorr += `<br><br>${texteEnCouleur(`Pour l'auto-correction, on peut vérifier que $[${B.nom + D.nom}]$ mesure environ $${texNombre(segment(B, D).longueur, 2)}~\\text{cm}$`)}.<br>`
      texteCorr += anim.htmlBouton(numeroExercice, i)

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, segment(A, B).longueur, segment(B, C).longueur)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        // Dans cet exercice, on n'utilise pas a, b, c et d mais A, B, C et D alors remplace-les !
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
