import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choisitLettresDifferentes, choice } from '../../modules/outils.js'
import { pave3d, point3d } from '../../modules/3d.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { labelPoint, longueur, pointSurSegment, segment, tracePoint, translation, vecteur } from '../../modules/2d.js'
export const titre = 'Construire la section d\'un plan dans un un pavé droit'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC

export const dateDePublication = '07/11/2022'

/**
 * Construire une section dans un un pavé droit
 * @author Eric Elter
 */

export default function ConstruireSectionPaveDroit () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, objetsEnonce, A, B, D, E, Y, Z, YCorr, ZCorr, areteY, areteZ, s1, s2, s3, s4, s5, solideDessine, nomSolide, placeDuPoint1, placeDuPoint2, enonceFigure, sommetsPave, areteParallele,
      L, p, choixProfondeur, choixAreteParallele, h, traceTesPoints, choix, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      objetsEnonce = []
      context.anglePerspective = choice([-30, -60, 30, 60])
      // context.anglePerspective = -30

      L = randint(5, 20)
      h = randint(5, 20, [L])
      p = randint(5, 20, [L, h])
      A = point3d(0, 0, 0)
      B = point3d(L, 0, 0)
      D = point3d(0, 0, h)
      choixProfondeur = choice([p, -p])
      E = point3d(0, choixProfondeur, 0)

      nomSolide = choisitLettresDifferentes(8, 'OQWXD').join('')
      solideDessine = pave3d(A, B, D, E, 'blue', true, nomSolide)
      objetsEnonce.push(...solideDessine.c2d)
      sommetsPave = solideDessine.sommets

      placeDuPoint1 = (5 + randint(2, 3) * choixProfondeur / p) / 10
      placeDuPoint2 = (5 - randint(2, 3) * choixProfondeur / p) / 10

      choix = randint(1, 3)
      choix = 3

      switch (choix) {
        case 1 : // Parallèle à arête verticale - Cas 1
          Z = pointSurSegment(sommetsPave[2].c2d, sommetsPave[3].c2d, placeDuPoint1 * longueur(sommetsPave[2].c2d, sommetsPave[3].c2d), choisitLettresDifferentes(1, 'OQWXD' + nomSolide))
          areteZ = nomSolide[3] + nomSolide[2]
          Y = pointSurSegment(sommetsPave[6].c2d, sommetsPave[7].c2d, placeDuPoint2 * longueur(sommetsPave[6].c2d, sommetsPave[7].c2d), choisitLettresDifferentes(1, 'OQWXD' + nomSolide + Z.nom))
          areteY = nomSolide[7] + nomSolide[6]
          ZCorr = translation(Z, vecteur(sommetsPave[2].c2d, sommetsPave[1].c2d))
          YCorr = translation(Y, vecteur(sommetsPave[2].c2d, sommetsPave[1].c2d))
          if (choice([false, true])) choixAreteParallele = [1, 2]
          else choixAreteParallele = [0, 3]
          break
        case 2 : // Parallèle à arête verticale - Cas 2
          Z = pointSurSegment(sommetsPave[2].c2d, sommetsPave[3].c2d, placeDuPoint1 * longueur(sommetsPave[2].c2d, sommetsPave[3].c2d), choisitLettresDifferentes(1, 'OQWXD' + nomSolide))
          areteZ = nomSolide[3] + nomSolide[2]
          placeDuPoint2 = randint(2, 8) / 10
          if (placeDuPoint1 > 0.5) {
            Y = pointSurSegment(sommetsPave[2].c2d, sommetsPave[6].c2d, placeDuPoint2 * longueur(sommetsPave[2].c2d, sommetsPave[6].c2d), choisitLettresDifferentes(1, 'OQWXD' + nomSolide + Z.nom))
            areteY = nomSolide[2] + nomSolide[6]
          } else {
            Y = pointSurSegment(sommetsPave[3].c2d, sommetsPave[7].c2d, placeDuPoint2 * longueur(sommetsPave[3].c2d, sommetsPave[7].c2d), choisitLettresDifferentes(1, 'OQWXD' + nomSolide + Z.nom))
            areteY = nomSolide[7] + nomSolide[3]
          }
          ZCorr = translation(Z, vecteur(sommetsPave[2].c2d, sommetsPave[1].c2d))
          YCorr = translation(Y, vecteur(sommetsPave[2].c2d, sommetsPave[1].c2d))
          if (choice([false, true])) choixAreteParallele = [1, 2]
          else choixAreteParallele = [0, 3]
          break
        case 3 : // Parallèle à l'arête horizontale de la face de devant - Cas 1
          placeDuPoint2 = randint(2, 8) / 10
          Z = pointSurSegment(sommetsPave[1].c2d, sommetsPave[2].c2d, placeDuPoint1 * longueur(sommetsPave[1].c2d, sommetsPave[2].c2d), choisitLettresDifferentes(1, 'OQWXD' + nomSolide), 'right')
          areteZ = nomSolide[1] + nomSolide[2]
          Y = pointSurSegment(sommetsPave[2].c2d, sommetsPave[6].c2d, placeDuPoint2 * longueur(sommetsPave[2].c2d, sommetsPave[6].c2d), choisitLettresDifferentes(1, 'OQWXD' + nomSolide + Z.nom), 'right')
          areteY = nomSolide[2] + nomSolide[6]
          ZCorr = translation(Z, vecteur(sommetsPave[1].c2d, sommetsPave[0].c2d))
          YCorr = translation(Y, vecteur(sommetsPave[1].c2d, sommetsPave[0].c2d))
          if (choice([false, true])) choixAreteParallele = [0, 1]
          else choixAreteParallele = [2, 3]
          break
      }

      areteParallele = nomSolide[choixAreteParallele[1]] + nomSolide[choixAreteParallele[0]]
      traceTesPoints = tracePoint(Z, Y, '#f15929')
      traceTesPoints.epaisseur = 2
      traceTesPoints.taille = 5

      enonceFigure = (context.isAmc ? '' : '<br>') + mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce, traceTesPoints, labelPoint(Z, Y)) + '<br>'
      texte += enonceFigure
      texte += context.isAmc ? '' : 'Reproduire cette figure. '
      texte += `Sachant que ${Z.nom} est sur l'arête [${areteZ}] et que ${Y.nom} est sur l'arête [${areteY}], `
      texte += `tracer la section du pavé droit ${nomSolide} par un plan passant par les points ${Z.nom} et ${Y.nom} et parallèle à l'arête [${areteParallele}].`
      s1 = segment(Z, Y, '#f15929')
      s1.epaisseur = 2
      s2 = segment(Z, ZCorr, '#f15929')
      s2.epaisseur = 2
      s3 = segment(ZCorr, YCorr, '#f15929')
      s2.epaisseur = 2
      s4 = segment(YCorr, Y, '#f15929')
      s4.epaisseur = 2
      s5 = segment(sommetsPave[choixAreteParallele[0]].c2d, sommetsPave[choixAreteParallele[1]].c2d, 'green')
      s5.epaisseur = 3

      switch (choix) {
        case 1 : // Parallèle à arête verticale - Cas 1
          if (!sommetsPave[7].visible || !sommetsPave[6].visible) {
            s1.pointilles = 2
            s4.pointilles = 2
          } else {
            s3.pointilles = 2
            s4.pointilles = 2
          }
          break
        case 2 : // Parallèle à arête verticale - Cas 2
          if (!sommetsPave[6].visible) {
            s1.pointilles = 2
          } else if (!sommetsPave[7].visible) {
            s2.pointilles = 2
            s1.pointilles = 2
          } else {
            s3.pointilles = 2
          }
          break
        case 3 : // Parallèle à l'arête horizontale de la face de devant - Cas 1
          if (!sommetsPave[6].visible || !sommetsPave[5].visible) {
            s1.pointilles = 2
          } else if (!sommetsPave[7].visible) {
            s3.pointilles = 2
            s4.pointilles = 2
          } else {
            s3.pointilles = 2
          }
          break
      }
      enonceFigure = (context.isAmc ? '' : '<br>') + mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce, traceTesPoints, labelPoint(Z, Y, ZCorr, YCorr), s1, s2, s3, s4, s5) + '<br>'
      texteCorr += enonceFigure

      if (this.questionJamaisPosee(i, nomSolide)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [{
              texte: texteCorr,
              statut: 0,
              sanscadre: true
            }
            ]
          }
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
