import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, creerCouples, randint, choice, texNombre, texNombre2, calcul } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'
export const amcReady = true
export const amcType =1 //type de question AMC 
export const interactifReady = true

export const titre = 'Tables de multiplications et multiples de 10'

/**
 * Les 2 facteurs peuvent terminer par aucun, 1, 2 ou 3 zéros
 * @Auteur Rémi Angot
* Référence 6C10-2
 */
export default function ExerciceTablesMultiplicationsEtMultiplesDe10 (
  tablesParDefaut = '2-3-4-5-6-7-8-9'
) {
  // Multiplier deux nombres
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = tablesParDefaut
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.titre = titre
  this.consigne = 'Calculer'
  this.spacing = 2
  this.tailleDiaporama = 100

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    let tables = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (!this.sup) {
      // Si aucune table n'est saisie
      this.sup = '2-3-4-5-6-7-8-9'
    }
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
    for (
      let i = 0, a, b, k1, k2, texte, texteCorr, melange;
      i < this.nbQuestions;
      i++
    ) {
      this.autoCorrection[i] = {}
      a = couples[i][0]
      b = couples[i][1]
      if (a > 1) {
        k1 = choice([1, 10, 100, 1000])
      } else {
        k1 = choice([10, 100, 1000])
      }
      k2 = choice([1, 10, 100, 1000])
      a = k1 * a
      b = k2 * b
      melange = randint(0, 1)
      if (melange === 1) {
        // échange a et b pour que les multiplications ne soient pas toujours dans le même ordre (surtout lorsque tables n'a qu'un seul élément)
        const c = a
        a = b
        b = c
      }
      texte =
        '$ ' + texNombre(a) + ' \\times ' + texNombre(b) + ' = \\dotfill $'
      texteCorr =
        '$ ' +
        texNombre(a) +
        ' \\times ' +
        texNombre(b) +
        ' = ' +
        texNombre(a * b) +
        ' $'

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
        ordered: false,
        lastChoice: 5
      }
      if (this.interactif) {
        texte += propositionsQcm(this, i).texte
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
    if (context.isAmc) {
      this.amc = [this, this.id]
    }
  }
  this.besoinFormulaireTexte = [
    'Choix des tables',
    'Nombres séparés par des tirets'
  ] // Texte, tooltip
}
