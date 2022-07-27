import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'

export const titre = 'Écrire le nombre proposé sous la forme $a\\sqrt{b}$'

/**
 * 2N32-3, ex 2N11
 * @author Stéphane Guyon
 */
export default function ExtraireUnCarreParfaitDUneRacineCarree () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = 'Écrire le nombre proposé sous la forme $a\\sqrt{b}$'
  this.consigne = ' Écrire le nombre proposé sous la forme $a\\sqrt{b}$ où $a$ est un entier et $b$ le plus petit entier possible:'
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 2 //

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, a, b, c, d, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 11)
      b = a * a
      c = randint(2, 7, [4])
      d = c * b
      if (this.sup === 1) { texte = `Écrire $\\sqrt{ ${d} } $ sous la forme $a\\sqrt{ ${c} } $ où $a$ est un entier:` }
      texteCorr = `On cherche le plus grand carré parfait diviseur de ${d}, c'est ${b}.
                            On a donc la décomposition : $${d}=${c} \\times ${b}=${c} \\times ${a}^{2}$ qui permet d'écrire que
                            $\\sqrt{${d}}=\\sqrt{${a}^{2} \\times ${c} }=${a}\\times \\sqrt{${c}}$`
      if (this.sup === 2) { texte = `Écrire $\\sqrt{ ${d} } $ sous la forme $a\\sqrt{ b } $ où $a$ est un entier et $b$ le plus petit entier possible:` }
      texteCorr = `On cherche le plus grand carré parfait diviseur de ${d}, c'est ${b}.
                            On a donc la décomposition : $${d}=${c} \\times ${b}=${c} \\times ${a}^{2}$ qui permet d'écrire que
                            $\\sqrt{${d}}=\\sqrt{${a}^{2} \\times ${c} }=${a}\\times \\sqrt{${c}}$`
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : En donnat la racine carrée unité\n2 : Sans indication']
}
