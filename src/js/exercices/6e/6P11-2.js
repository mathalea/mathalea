import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, choice, objet, randint, prenom, texPrix, texNombre } from '../../modules/outils.js'
export const titre = 'Résoudre des problèmes de proportionnalité linétaire dans un tableau'

/**
 * Résoudre un problème de proportionnalité avec linéarité via tableau
 * @Mireille Gain, 30 ami 2021
 * Référence 6P11-2
*/export default function ProportionnaliteParLineariteTableau () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'On considère que les situations suivantes, sauf cas flagrant, sont des situations de proportionnalité. <br>On demande de les résoudre sous forme d\'un tableau.'
  this.nbQuestions = 5
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 4 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = [1, 1, 1, 1, 4]
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = [2, 2, 2, 2, 4]
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = [3, 3, 3, 3, 4]
    } else if (this.sup === 4) {
      typeDeQuestionsDisponibles = [1, 2, 3, 4]
    }

    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    let np, cm, ng, o, pp, pg, pu, tp
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 1: // multiplication
          np = randint(1, 10)
          cm = randint(2, 7)
          ng = np * cm
          pp = randint(2, 99) / 10
          pg = cm * pp
          o = choice([objet()])
          texte = `${prenom()} achète ${np} ${o} pour ${texPrix(pp)} €. Combien faudrait-il payer pour en acheter ${ng} ? `
          texteCorr = `${texPrix(pg)} €`
          break
        case 2: // division
          np = randint(1, 10)
          cm = randint(2, 7)
          ng = np * cm
          pp = randint(2, 99) / 10
          pg = cm * pp
          o = choice([objet()])
          texte = `${prenom()} achète ${ng} ${o} pour ${texPrix(pg)} €. Combien faudrait-il payer pour en acheter ${np} ? `
          texteCorr = `${texPrix(pp)} €`
          break
        case 3: // passage par l'unité
          pu = (1, 19) / 10
          np = randint(2, 10)
          pp = pu * np
          ng = randint(2, 10, np)
          pg = pu * ng
          o = choice([objet()])
          texte = `${prenom()} achète ${np} ${o} pour ${texPrix(pp)} €. Combien faudrait-il payer pour en acheter ${ng} ? `
          texteCorr = `${texPrix(pg)} €`
          break
        case 4: // Non proportionnalité
          tp = randint(120, 165) / 100
          np = randint(10, 14)
          cm = randint(2, 5)
          ng = np * cm
          texte = `${prenom()} mesure ${texNombre(tp)} m à ${np} ans. Quelle sera sa taille à ${ng} ans ?`
          texteCorr = 'On ne peut pas savoir car la taille n\'est pas proportionnelle à l\'âge.'
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Multiplication\n2 : Division\n3 : Passage par l\'unité\n4 : Mélange des trois']
}
