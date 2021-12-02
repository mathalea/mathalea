import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'

export const titre = 'Rendre entier le dénominateur d\'une fraction.'

/**
 * 2N32-3, ex 2N11
 * @author Stéphane Guyon
 */
export default function Rendreentier () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = 'Rendre entier le dénominateur d\'une fraction.'
  this.consigne = ' Ecrire la fraction proposée avec un dénominateur entier :'
  this.nbQuestions = 1
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, a, b, c, d, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 11)
      b = randint(2, 11, [4, 8, 9])
      c = randint(-7, 7, [0, 1])
      if (this.sup === 1) { texte = ` $A=\\dfrac{ ${a} }{\\sqrt{${b}}} $ ` }
      texteCorr = `Pour lever l'irrationnalité du dénominateur, il suffit de multiplier le numérateur et le dénomibateir de la fraction par $\\sqrt{${b}}$`
      texteCorr += `$A=\\dfrac{ ${a} \\times \\sqrt{${b}} {\\sqrt{${b}} \\times \\sqrt{${b}}} $`
      if (this.sup === 2) { texte = `$A=\\dfrac{ ${a} }{${c}+\\sqrt{${b}}} $ ` }
      texteCorr = `Pour lever l'rrrrr du dénominateur, il suffit de multiplier le numérateur et le dénomibateir de la fraction par $\\sqrt{${b}}$`

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Dénominateur racine (a)\n2 : Dénominateur a+\\sqrt{b}']
}
