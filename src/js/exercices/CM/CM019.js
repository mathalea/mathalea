import Exercice from '../Exercice.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { TrouverSolutionMathador } from '../../modules/outils/mathador.js'
export const titre = 'Générateur de compte est bon'
export const amcReady = true
export const interactifReady = false
export const amcType = 'AMCOpen'

/**
 * Générateur de tirages pour un compte est bon avec en correction la solution mathador (4 opérations différentes).
 * @author Jean-Claude Lhote
 * référence CM019
 */

export const uuid = '1e528'
export const ref = 'CM019'
export default function LeCompteEstBonV3 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne =
    'Écrire un calcul égal au nombre cible en utilisant les 5 nombres, 4 opérations différentes et éventuellement des parenthèses.'
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 30
  this.sup2 = 70
  let maxSolution = 70

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let solutionMathador = []
    let tirage, solution, expression
    let minSolution = parseInt(this.sup)
    maxSolution = parseInt(this.sup2)
    if (minSolution > maxSolution) {
      minSolution = maxSolution
      this.sup = this.sup2
    }
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      this.autoCorrection[i] = {}
      solutionMathador = TrouverSolutionMathador(minSolution, maxSolution)
      tirage = solutionMathador[0]
      solution = solutionMathador[1]
      expression = solutionMathador[3]

      texte = `Le tirage est le suivant : $${tirage[0]}~;~${tirage[1]}~;~${tirage[2]}~;~${tirage[3]}~;~${tirage[4]}$ <br>La cible est : $${solution}$`
      texteCorr = `Pour le tirage $${tirage[0]}~;~${tirage[1]}~;~${tirage[2]}~;~${tirage[3]}~;~${tirage[4]}$ et pour la cible $${solution}$, la solution est : $${expression}=${solution}$ `
      texteCorr += `ou $${solutionMathador[4]}$.<br>`
      texteCorr += 'En effet : <br>'
      for (let j = 0; j < 4; j++) {
        texteCorr += `$${solutionMathador[2][j]}$<br>`
      }
      if (this.questionJamaisPosee(i, ...solutionMathador)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        this.autoCorrection[i] = { enonce: texte, propositions: [{ texte: texteCorr, statut: 4, feedback: '' }] }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Limite inférieure', maxSolution]
  this.besoinFormulaire2Numerique = ['Limite supérieure', 100]
}
