import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, lettreDepuisChiffre, contraindreValeur, combinaisonListes } from '../../modules/outils.js'
import { point, labelPoint, rotation, mathalea2d, afficheMesureAngle, homothetie, demiDroite, texteParPoint, similitude, pointSurSegment } from '../../modules/2d.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'

export const amcReady = true
export const amcType = 'qcmMono' // QCM
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Mesurer un angle sans rapporteur sur l\'énoncé'

/**
 * Construire un angle
 * @author Jean-Claude Lhote
 * Référence 6G23
 */
export default function MesurerUnAngle () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 2
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = false
  this.video = 'TEzu9uky56M'

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let delta, arrondiA10Pres
    let angle; let anglerot; let Apos; let Bpos; let Cpos; let p; let texte; let texteCorr; let A; let B; let C; let s2; let s1; let bis; const signes = []
    let labels, secteur, xMin, xMax, yMin, yMax, objetsEnonce, objetsCorrection, secteur0
    let typeDeQuestions
    this.sup = contraindreValeur(1, 4, this.sup, 1)
    if (this.sup < 4) typeDeQuestions = [this.sup]
    else typeDeQuestions = [1, 2, 3]
    const listeTypeDeQuestion = combinaisonListes(typeDeQuestions, this.nbQuestions)

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on évite d'avoir deux propositions différentes de 2° (comme 69° et 71°)
      do {
        signes.push(choice([-1, 1]))
        switch (listeTypeDeQuestion[i]) {
          case 1 : angle = randint(1, 17, 9) * 10
            break
          case 2 : angle = randint(1, 8) * 10 + randint(0, 1) * 90 + 5
            break
          case 3 : angle = randint(1, 16) * 10 + randint(1, 9)
            break
        }
        arrondiA10Pres = Math.round(angle / 10) * 10
        delta = Math.round(Math.abs(angle / 10 - Math.round(angle / 10)) * 10)
      } while (delta === 1)

      anglerot = randint(-4, 4, 0) * 5
      angle = signes[i] * angle
      p = [choice(['x', 'y', 'z', 't']), lettreDepuisChiffre(randint(1, 16)), choice(['s', 'u', 'v', 'w'])]
      if (!this.sup2) {
        texte = `Estimer la mesure de l'angle $\\widehat{${p[0] + p[1] + p[2]}}$ sans instrument.<br>`
      } else {
        texte = `Mesurer l'angle $\\widehat{${p[0] + p[1] + p[2]}}$.<br>`
      }
      A = point(0, 0)
      B = point(6, 0)
      B = rotation(B, A, anglerot)

      // texte, A, orientation = "milieu", color = 'black', scale = 1, ancrageDeRotation = "middle", mathOn = false
      Bpos = texteParPoint(p[0], similitude(A, homothetie(B, A, 0.95), signes[i] * 90, 0.1), 'milieu', 'black', 1.5, 'middle', true)
      s1 = demiDroite(A, B)
      C = rotation(B, A, angle)
      bis = rotation(B, A, angle / 2)
      Apos = texteParPoint(p[1], pointSurSegment(A, bis, -0.5), 'milieu', 'black', 1.5, 'middle', true)
      Cpos = texteParPoint(p[2], similitude(A, homothetie(C, A, 0.95), -signes[i] * 90, 0.1), 'milieu', 'black', 1.5, 'middle', true)
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
      texte += mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objetsEnonce)
      texteCorr += mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.6 }, objetsCorrection)
      this.autoCorrection[i] = {}
      this.autoCorrection[i].enonce = `${texte}\n`
      if (!this.sup2) {
        this.autoCorrection[i].propositions = [
          {
            texte: `$${Math.abs(angle)}\\degree$`,
            statut: true
          },
          {
            texte: `$${(Math.abs(angle) + 45) % 180}\\degree$`,
            statut: false
          },
          {
            texte: `$${(Math.abs(angle) + 90) % 180}\\degree$`,
            statut: false
          },
          {
            texte: `$${(Math.abs(angle) + 135) % 180}\\degree$`,
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
      } else {
        this.autoCorrection[i].propositions = [
          {
            texte: `$${Math.abs(angle)}\\degree$`,
            statut: true
          },
          {
            texte: `$${180 - Math.abs(angle)}\\degree$`,
            statut: false
          },
          {
            texte: `$${Math.round(Math.abs(angle) / 2)}\\degree$`,
            statut: false
          },
          {
            texte: `$${this.interactif ? Math.abs(angle) + 20 : arrondiA10Pres > angle ? arrondiA10Pres + delta : arrondiA10Pres - delta}\\degree$`,
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
      }
      this.autoCorrection[i].options = {
        ordered: false,
        lastChoice: 6
      }
      if (!context.isAmc) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }
      if (this.questionJamaisPosee(i, angle)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Précision de l\'angle', 4, '1 : Angle à 10°\n2 : Angle à 5°\n3 : Angle à 1°\n 4 : mélange']
  this.besoinFormulaire2CaseACocher = ['Utilisation du rapporteur', false]
}
