import Exercice from '../Exercice.js'
import { lettreDepuisChiffre, lettreMinusculeDepuisChiffre, listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { expTrinome } from '../../modules/fonctionsMaths.js'
export const titre = 'Exercice exemple'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestionsModifiable = false
  // this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let question1, question2

    question1 = `$${expTrinome(randint(-2, 2), lettreMinusculeDepuisChiffre(randint(1, 5)), randint(-2, 2))}$`
    question1 += '<br>'
    question2 = `$${expTrinome(randint(-2, 2), lettreMinusculeDepuisChiffre(randint(1, 5)), randint(-2, 2))}$`
    question2 += '<br>'

    const correction1 = 'texte de la correction 1'
    const correction2 = 'texte de la correction2'
    this.listeQuestions.push(question1, question2)
    this.listeCorrections.push(correction1, correction2)

    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}
