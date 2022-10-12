import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const titre = 'Déterminer le signe d\'une puissance'
export const interactifReady = true
export const interactifType = 'qcm'
export const dateDePublication = '30/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Déterminer le signe d'une puissance, on choisira la possibilité d'avoir un nombre positif ou négatif et un
 * exposant positif ou négatif
 * @author Delphine David
 * Référence 4C37
*/
export const uuid = '67432'
export const ref = '4C37'
export default class SignePuissance extends Exercice {
  constructor () {
    super()
    this.consigne = 'Déterminer le signe des expressions suivantes.'
    this.nbQuestions = 5
    this.nbCols = 1
    this.nbColsCorr = 1
    this.interactif = false
    this.interactifReady = interactifReady
    this.interactifType = interactifType
    this.amcType = amcType
    this.amcReady = amcReady
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let listeTypeDeQuestions = ['a^n', '-a^n', '(-a)^n', '-(-a)^n']
    listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    let a = 0
    let n = 0
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 'a^n':
          a = randint(2, 9)
          n = randint(-9, 9, [-1, 0, 1])
          texte = `$${a}^{${n}}$`
          texteCorr = `$${a}^{${n}}$ est positif car $${a}$ est positif.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: 'Positif',
              statut: true
            },
            {
              texte: 'Négatif',
              statut: false
            }
          ]
          break
        case '-a^n':
          a = randint(2, 9)
          n = 2 * randint(1, 4) // permet de n'avoir que des exposant positif, cas intéressant ici
          texte = `$-${a}^{${n}}$`
          texteCorr = `$-${a}^{${n}}$ est négatif. Attention il n'y a pas de parenthèses autour de $-${a}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: 'Positif',
              statut: false
            },
            {
              texte: 'Négatif',
              statut: true
            }
          ]
          break
        case '(-a)^n':
          a = randint(2, 9)
          n = randint(-9, 9, [-1, 0, 1])
          texte = `$(-${a})^{${n}}$`
          if (n % 2 === 0) {
            texteCorr = `$(-${a})^{${n}}$ est positif car l'exposant est pair.`
            this.autoCorrection[i] = {}
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: 'Positif',
                statut: true
              },
              {
                texte: 'Négatif',
                statut: false
              }
            ]
          } else {
            texteCorr = `$(-${a})^{${n}}$ est négatif car l'exposant est impair.`
            this.autoCorrection[i] = {}
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: 'Positif',
                statut: false
              },
              {
                texte: 'Négatif',
                statut: true
              }
            ]
          }
          break
        case '-(-a)^n':
          a = randint(2, 9)
          n = randint(-9, 9, [-1, 0, 1])
          texte = `$-(-${a})^{${n}}$`
          if (n % 2 === 0) {
            texteCorr = `$-(-${a})^{${n}}$ est négatif. L'exposant est pair donc $(-${a})^{${n}}$ est positif et son opposé est négatif.`
            this.autoCorrection[i] = {}
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: 'Positif',
                statut: false
              },
              {
                texte: 'Négatif',
                statut: true
              }
            ]
          } else {
            texteCorr = `$-(-${a})^{${n}}$ est positif. L' exposant est impair donc $(-${a})^{${n}}$ est négatif et son opposé est positif.`
            this.autoCorrection[i] = {}
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: 'Positif',
                statut: true
              },
              {
                texte: 'Négatif',
                statut: false
              }
            ]
          }
          break
      }
      if (this.interactif) {
        texte += propositionsQcm(this, i).texte
      }
      if (this.questionJamaisPosee(i, n)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
