/* global mathalea */
import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, choice, lettreDepuisChiffre, shuffle2tableaux } from '../../modules/outils.js'
import { point, labelPoint, rotation, mathalea2d, afficheMesureAngle, homothetie, demiDroite, texteParPoint, similitude, pointSurSegment } from '../../modules/2d.js'
import { gestionQcmInteractif, propositionsQcm } from '../../modules/gestionQcm.js'

export const amcReady = true

export const titre = 'Mesurer un angle'

/**
 * Construire un angle
 * @Auteur Jean-Claude Lhote
 * Référence 6G23
 */
export default function MesurerUnAngle () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 2
  this.nbQuestionsModifiable = true
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1
  this.video = 'TEzu9uky56M'
  this.qcmDisponible = true
  this.modeQcm = false

  this.nouvelleVersion = function (numeroExercice) {
    this.numeroExercice = numeroExercice
    this.sup = parseInt(this.sup)
    this.qcm = ['6G23-1', [], "Estimer la mesure d'un angle.", 1]
    let tabrep, tabicone
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let angle; let anglerot; let Apos; let Bpos; let Cpos; let p; let texte; let texteCorr; let A; let B; let C; let s2; let s1; let bis; const signes = []
    let labels, secteur, xMin, xMax, yMin, yMax, objetsEnonce, objetsCorrection, secteur0

    for (let i = 0; i < this.nbQuestions; i++) {
      signes.push(choice([-1, 1]))
      if (this.sup === 1) {
        angle = randint(2, 16, 9) * 10
      } else if (this.sup === 2) {
        angle = randint(4, 32, 18) * 5
      } else {
        angle = randint(20, 160, 90)
      }
      tabrep = [`$${angle}\\degree$`, `$${180 - angle}\\degree$`, `$${angle / 2}\\degree$`, `$${Math.round((180 + angle) / 2)}\\degree$`, '$180\\degree$', '$90\\degree$']
      tabicone = [1, 0, 0, 0, 0, 0]
      anglerot = randint(-180, 180)
      angle = signes[i] * angle
      p = [choice(['x', 'y', 'z', 't']), lettreDepuisChiffre(randint(1, 16)), choice(['s', 'u', 'v', 'w'])]
      if (this.modeQcm) {
        texte = `Estime la mesure de l'angle $\\widehat{${p[0] + p[1] + p[2]}}$ sans instrument.<br>`
      } else {
        texte = `Mesure l'angle $\\widehat{${p[0] + p[1] + p[2]}}$.<br>`
      }
      A = point(0, 0)
      B = point(6, 0)
      B = rotation(B, A, anglerot)

      // texte, A, orientation = "milieu", color = 'black', scale = 1, ancrageDeRotation = "middle", math_on = false
      Bpos = texteParPoint(p[0], similitude(A, homothetie(B, A, 0.95), signes[i] * 90, 0.1), 'milieu', 'black', 1, 'middle', true)
      s1 = demiDroite(A, B)
      C = rotation(B, A, angle)
      bis = rotation(B, A, angle / 2)
      Apos = texteParPoint(p[1], pointSurSegment(A, bis, -0.5), 'milieu', 'black', 1, 'middle', true)
      Cpos = texteParPoint(p[2], similitude(A, homothetie(C, A, 0.95), -signes[i] * 90, 0.1), 'milieu', 'black', 1, 'middle', true)
      s2 = demiDroite(A, C)
      labels = labelPoint(A, B, C)
      secteur = afficheMesureAngle(B, A, C)
      secteur0 = afficheMesureAngle(B, A, C, 'black', 1.5, ' ')
      texteCorr = ''
      xMin = Math.min(A.x, C.x, B.x) - 1
      xMax = Math.max(A.x, C.x, B.x) + 1
      yMin = Math.min(A.y, C.y, B.y) - 1
      yMax = Math.max(A.y, C.y, B.y) + 1
      mathalea.fenetreMathalea2d = [xMin, yMin, xMax, yMax]
      objetsEnonce = [s1, s2, labels, Apos, Bpos, Cpos, secteur0]
      objetsCorrection = [s1, s2, labels, Apos, Bpos, Cpos, secteur]
      texte += mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.8 }, objetsEnonce)
      texteCorr += mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objetsCorrection)
      /**********************************************/
      // Ajout pour AMC
      this.qcm[1].push([`${texte}\\\\ \n Réponses possibles : `,
        tabrep,
        tabicone])
      /********************************************/
      shuffle2tableaux(tabrep, tabicone)
      if (this.modeQcm && !mathalea.sortieAMC) {
        this.tableauSolutionsDuQcm[i] = tabicone
        texte += propositionsQcm(numeroExercice, i, tabrep, tabicone).texte
        texteCorr += propositionsQcm(numeroExercice, i, tabrep, tabicone).texteCorr
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  gestionQcmInteractif(this)
  this.besoinFormulaireNumerique = ['Précision de l\'angle', 3, '1 : Angle à 10°\n2 : Angle à 5°\n3 : Angle à 1°']
}
