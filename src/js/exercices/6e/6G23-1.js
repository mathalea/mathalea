import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, lettreDepuisChiffre } from '../../modules/outils.js'
import { point, labelPoint, rotation, mathalea2d, afficheMesureAngle, homothetie, demiDroite, texteParPoint, similitude, pointSurSegment } from '../../modules/2d.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'

export const amcReady = true
export const amcType = 1 // QCM 
export const interactifReady = true
export const interactifType = 'qcm'



export const titre = 'Mesurer un angle'

/**
 * Construire un angle
 * @author Jean-Claude Lhote
 * Référence 6G23
 */
export default function MesurerUnAngle () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestions = 2
  this.nbQuestionsModifiable = true
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1
  this.video = 'TEzu9uky56M'

  this.nouvelleVersion = function (numeroExercice) {
    this.sup = parseInt(this.sup)
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
      anglerot = randint(-180, 180)
      angle = signes[i] * angle
      p = [choice(['x', 'y', 'z', 't']), lettreDepuisChiffre(randint(1, 16)), choice(['s', 'u', 'v', 'w'])]
      if (this.interactif) {
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
      context.fenetreMathalea2d = [xMin, yMin, xMax, yMax]
      objetsEnonce = [s1, s2, labels, Apos, Bpos, Cpos, secteur0]
      objetsCorrection = [s1, s2, labels, Apos, Bpos, Cpos, secteur]
      texte += mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.8 }, objetsEnonce)
      texteCorr += mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objetsCorrection)
      this.autoCorrection[i] = {}
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: `$${Math.abs(angle)}\\degree$`,
          statut: true
        },
        {
          texte: `$${Math.abs(180 - angle)}\\degree$`,
          statut: false
        },
        {
          texte: `$${Math.abs(angle / 2)}\\degree$`,
          statut: false
        },
        {
          texte: `$${Math.abs(Math.round((180 + angle) / 2))}\\degree$`,
          statut: false
        },
        {
          texte: '$180\\degree$',
          statut: false
        },
        {
          texte: '$90\\degree$',
          statut: false
        }
      ]
      this.autoCorrection[i].options = {
        ordered: false,
        lastChoice: 6
      }
      if (this.interactif) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Précision de l\'angle', 3, '1 : Angle à 10°\n2 : Angle à 5°\n3 : Angle à 1°']
}
