import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, creerCouples, choice, texNombre, texNombre2, calcul } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'

export const amcReady = true
export const interactifReady = true
export const interactifType = 'qcm'
export const amcType = 'qcmMono' // type de question AMC

export const titre = 'Tables de multiplications et nombres décimaux'

/**
 * Multiplier deux nombres décimaux
 * @author Rémi Angot
 * Référence 6C10-3
 */
export default function ExerciceTablesMultiplicationsEtDecimaux (
  tablesParDefaut = '2-3-4-5-6-7-8-9'
) {
  // Multiplier deux nombres
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = tablesParDefaut
  this.titre = titre
  this.consigne = 'Calculer'
  this.spacing = 2
  this.tailleDiaporama = 100
  this.nbQuestions = 10

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (!this.sup) {
      // Si aucune table n'est saisie
      this.sup = '2-3-4-5-6-7-8-9'
    }
    let tables = []
    if (typeof this.sup === 'number') {
      // Si c'est un nombre c'est qu'il y a qu'une seule table
      tables[0] = this.sup
    } else {
      tables = this.sup.split('-') // Sinon on crée un tableau à partir des valeurs séparées par des ;
    }
    const couples = creerCouples(
      tables,
      [2, 3, 4, 5, 6, 7, 8, 9, 10],
      this.nbQuestions
    ) // Liste tous les couples possibles (2,3)≠(3,2)
    for (let i = 0, a, b, k1, k2, couple, texte, texteCorr; i < this.nbQuestions; i++) {
      this.autoCorrection[i] = {}
      a = couples[i][0]
      b = couples[i][1]
      couple = choice([[1, 10], [1, 100], [1, 1000], [10, 100], [10, 1000], [100, 100], [100, 1000]])
      k1 = couple[0]
      k2 = couple[1]
      a = calcul(a / k1)
      b = calcul(b / k2)
      if (a === 1) {
        a = 0.01
      }
      if (b === 1) {
        b = 0.1
      }
      texte =
        '$ ' + texNombre(a) + ' \\times ' + texNombre(b) + ' = \\dotfill $'
      texteCorr =
        '$ ' +
        texNombre(a) +
        ' \\times ' +
        texNombre(b) +
        ' = ' +
        texNombre(calcul(a * b)) +
        ' $'
      /**********************************/
      // QCM
      /**********************************/
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: `$${texNombre2(a * b)}$`,
          statut: true,
          feedback: 'Correct !'
        },
        {
          texte: `$${texNombre2(calcul(a * b / 10))}$`,
          statut: false,
          feedback: 'Compte le nombre de zéros dans chaque facteur'
        },
        {
          texte: `$${texNombre2(calcul(a * b * 10))}$`,
          statut: false,
          feedback: 'Compte le nombre de zéros dans chaque facteur'
        },
        {
          texte: `$${texNombre2(calcul(a * b / 100))}$`,
          statut: false,
          feedback: 'Compte le nombre de zéros dans chaque facteur'
        },
        {
          texte: `$${texNombre2(calcul(a * b * 100))}$`,
          statut: false,
          feedback: 'Compte le nombre de zéros dans chaque facteur'
        }
      ]
      this.autoCorrection[i].options = {
        ordered: false
      }
      if (this.interactif) {
        texte += propositionsQcm(this, i).texte
        // texteCorr += propositionsQcm(this.numeroExercice, i, tabrep, tabicone).texteCorr
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Choix des tables',
    'Nombres séparés par des tirets'
  ] // Texte, tooltip
}
