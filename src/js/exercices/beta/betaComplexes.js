import Exercice from '../Exercice.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { complex, add, multiply } from 'mathjs'
export const titre = 'Exercice exemple Nombres complexes'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function TrucAvecDesComplexes () {
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

    const z1 = complex(2, 1)
    const z2 = complex('2i')
    this.introduction = `on donne $a = ${z1.toString()}$ et $b = ${z2.toString()}$`
    question1 = 'Calcule $a + b$'
    question2 = 'Calcule $a \\times b$'

    const correction1 = `$${z1.toString()} + ${z2.toString()} = ${add(z1, z2).toString()}$`
    const correction2 = `$(${z1.toString()}) \\times ${z2.toString()} = ${multiply(z1, z2).toString()}$`
    this.listeQuestions.push(question1, question2)
    this.listeCorrections.push(correction1, correction2)

    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}
