import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'// eslint-disable-next-line camelcase
import { listeQuestionsToContenu, combinaisonListes, choice, objet, randint, prenom } from '../../modules/outils.js'
export const titre = 'Exercice exemple'

/**
 * Résoudre un problème de proportionnalité avec linéarité via tableau
 * @Mireille Gain, 30 ami 2021
 * Référence 6P11-2
*/export default function ProportionnaliteParLineariteTableau () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'On considère que les situatoins suivantes, sauf cas flagrant, sont des situations de proportionnalité. <br>On demande de les résoudre sous forme d\'un tableau.'
  this.nbQuestions = 5
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['multiplication', 'division', 'unite'] // On crée 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    let np, cm, ng, o, p
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'multiplication':
          np = randint(1, 10)
          cm = randint(2, 7)
          ng = np * cm
          o = choice(objet)
          p = randint(2, 99) / 10
          texte = `${prenom()} achète ${np} ${o} pour ${p} €. Combien paierait-il pour en acheter ${ng} ? `
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'division':
          texte = `Question ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
        case 'unite': // Table de 200
          texte = `Question ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
