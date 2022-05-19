import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
export const titre = 'Ceci est le titre de l\'exercice BetaExosimpleMatthieu'

/**
 * Description didactique de l'exercice
 * @Matthieu_Devillers
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Ceci est la consigne (en gras) de l'exercice."
  this.introduction = "Ceci est l'introduction (pas en gras) de l'exercice"
  this.nbQuestionsModifiable = false // le nombre de questions est fixe dans cet exercice.
  // this.nbQuestions = 10;
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const a = randint(1, 10)
    const b = randint(20, 50)
    const question1 = `Combien fait ${a} + ${b} ?<br>`
    const question2 = `Combien fait ${a * 10} + ${b * 10} ?<br>`
    const correction1 = `${a} + ${b} = ${a + b}`
    const correction2 = `${a * 10} + ${b * 10} = ${a * 10 + b * 10}`
    this.listeQuestions.push(question1, question2)
    this.listeCorrections.push(correction1, correction2)
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}
