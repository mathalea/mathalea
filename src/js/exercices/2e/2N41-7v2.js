import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texFraction } from '../../modules/outils.js'

export const titre = 'Factoriser avec les identités remarquables'

/**
 * Factoriser en utilisant les 3 identités remarquables
* @author Jean-Claude Lhote
* 2N41-7, ex 2L11
*/
export const uuid = '0bd00'
export const ref = '2N41-7v2'
export default function FactoriserIdentitesRemarquables2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Factoriser les expressions suivantes.'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 5
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const listeFractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
      [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
      [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1, 2, 3] // coef de x = 1
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = [4, 5, 6] // coef de x > 1
    } else { typesDeQuestionsDisponibles = [7, 8, 9] } // coef de x rationnel

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, a, b, fraction = [], ns, ds, typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      a = randint(1, 9)
      b = randint(2, 9)
      fraction = choice(listeFractions)
      ns = fraction[0]
      ds = fraction[1]
      switch (typesDeQuestions) {
        case 1:
          texte = `$x^2+${2 * a}x+${a * a}$` // (x+a)²
          texteCorr = `$x^2+${2 * a}x+${a * a}=x^2+2 \\times ${a} \\times x+${a}^2=(x+${a})^2$`
          break
        case 2:
          texte = `$x^2-${2 * a}x+${a * a}$` // (x-a)²
          texteCorr = `$x^2-${2 * a}x+${a * a}=x^2-2 \\times ${a} \\times x+${a}^2=(x-${a})^2$`
          break
        case 3:
          texte = `$x^2-${a * a}$` // (x-a)(x+a)
          texteCorr = `$x^2-${a * a}=x^2-${a}^2=(x-${a})(x+${a})$`
          break
        case 4:
          texte = `$${b * b}x^2+${2 * b * a}x+${a * a}$` // (bx+a)²  b>1
          texteCorr = `$${b * b}x^2+${2 * b * a}x+${a * a}=(${b}x)^2+2 \\times ${b}x \\times ${a} + ${a}^2=(${b}x+${a})^2$`
          break
        case 5:
          texte = `$${b * b}x^2-${2 * b * a}x+${a * a}$` // (bx-a)² b>1
          texteCorr = `$${b * b}x^2-${2 * b * a}x+${a * a}=(${b}x)^2-2 \\times ${b}x \\times ${a} + ${a}^2=(${b}x-${a})^2$`
          break
        case 6:
          texte = `$${b * b}x^2-${a * a}$` // (bx-a)(bx+a) b>1
          texteCorr = `$${b * b}x^2-${a * a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`
          break
        case 7:

          texte = `$${texFraction(ns * ns, ds * ds)}x^2+${texFraction(2 * ns * a, ds)}x+${a * a}$` // (kx+a)² k rationnel
          texteCorr = `$${texFraction(ns * ns, ds * ds)}x^2+${texFraction(ns * 2 * a, ds)}x+${a * a}=\\left(${texFraction(ns, ds)}x\\right)^2+2 \\times ${texFraction(ns, ds)}x \\times ${a} + ${a}^2=\\left(${texFraction(ns, ds)}x+${a}\\right)^2$`
          break
        case 8:
          texte = `$${texFraction(ns * ns, ds * ds)}x^2-${texFraction(2 * ns * a, ds)}x+${a * a}$` // (kx-a)² k rationnel
          texteCorr = `$${texFraction(ns * ns, ds * ds)}x^2-${texFraction(ns * 2 * a, ds)}x+${a * a}=\\left(${texFraction(ns, ds)}x\\right)^2-2 \\times ${texFraction(ns, ds)}x \\times ${a} + ${a}^2=\\left(${texFraction(ns, ds)}x-${a}\\right)^2$`
          break
        case 9:
          //  (bx-a)(bx+a) avec a entier et b rationnel simple
          texte = `$${texFraction(ns * ns, ds * ds)}x^2-${a * a}$` // b>1
          texteCorr = `$${texFraction(ns * ns, ds * ds)}x^2-${a * a}=\\left(${texFraction(ns, ds)}x\\right)^2-${a}^2=\\left(${texFraction(ns, ds)}x-${a}\\right)\\left(${texFraction(ns, ds)}x+${a}\\right)$`
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel']
}
