import Exercice from '../Exercice.js'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, listeQuestionsToContenu, pgcd, randint } from '../../modules/outils.js'

export const titre = 'Rendre entier le dénominateur d\'une fraction.'

/**
 * 2N32-3, ex 2N11
 * @author Stéphane Guyon
 */
export default function Rendreentier () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = 'Rendre entier le dénominateur d\'une fraction.'
  this.consigne = ' Rendre entier le dénominateur de chaque fraction ci-dessous :'
  this.nbQuestions = 1
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 2 //

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, a, b, c, d, n, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 11)
      b = randint(2, 11, [4, 8, 9])
      c = randint(-7, 7, [0, 1])
      d = randint(-7, 7, [-1, 0, 1])
      if (this.sup === 1) {
        texte = ` $A=\\dfrac{ ${a} }{\\sqrt{${b}}} $ `
        texteCorr = `Pour lever l'irrationnalité du dénominateur, il suffit de multiplier le numérateur et le dénominateur de la fraction par $\\sqrt{${b}}$`
        texteCorr += `<br>$A=\\dfrac{ ${a} }{\\sqrt{${b}}}=\\dfrac{ ${a} \\times \\sqrt{${b}}} {\\sqrt{${b}} \\times \\sqrt{${b}}} $`
        texteCorr += `<br>Au final, $A=\\dfrac{ ${a} \\sqrt{${b}}} {${b}} $`
        n = pgcd(a, b)
        if (n !== 1) {
          if (b === n && a === n) { texteCorr += `<br>Ou encore : $A=\\sqrt{${b}} $` }
          if (b === n && a !== n) { texteCorr += `<br>Ou encore : $A= ${a / n} \\sqrt{${b}} $` }
          if (b !== n && a === n) { texteCorr += `<br>Ou encore : $A= \\dfrac{ \\sqrt{${b}}} {${b / n}}$` }
          if (b !== n && a !== n) { texteCorr += `<br>Ou encore : $A= \\dfrac{ ${a / n} \\sqrt{${b}}} {${b / n}}$` }
        }
      }
      if (this.sup === 2) {
        texte = `$A=\\dfrac{ ${a} }{${c}${ecritureAlgebrique(d)}\\sqrt{${b}}} $ `
        texteCorr = 'Pour lever l\'irrationnalité du dénominateur d\'une fraction,  la stratégie consiste à utiliser sa "quantité conjuguée" pour faire apparaître l\'identité remarquable $a^2-b^2$.'
        texteCorr += '<br>Ici, il faut donc multiplier le numérateur et le dénominateur de la fraction par '
        texteCorr += `par  $ ${c}${ecritureAlgebrique(-d)}\\sqrt{${b}}$<br>`
        texteCorr += `<br>$A=\\dfrac{ ${a} }{${c}${ecritureAlgebrique(d)}\\sqrt{${b}}}=\\dfrac{ ${a}\\times (${c}${ecritureAlgebrique(-d)}\\sqrt{${b}}) }{(${c}${ecritureAlgebrique(-d)}\\sqrt{${b}})(${c}${ecritureAlgebrique(d)}\\sqrt{${b}})}$`
        texteCorr += `<br>On obtient donc : $A=\\dfrac{ ${a * c} ${ecritureAlgebrique(-a * d)}\\sqrt{${b}}}{(${c})^2-\\left(${d}\\sqrt{${b}}\\right)^2}$ `
        texteCorr += `<br>D'où : $A=\\dfrac{ ${a * c} ${(-a * d)}\\sqrt{${b}}}{${c * c}-(${d * d}\\times${b})}=\\dfrac{ ${a * c} ${(-a * d)}\\sqrt{${b}}}{${c * c}-${d * d * b}}$ `

        n = pgcd(a * c, -a * d, c * c - d * d * b)
        if (n === 1) {
          texteCorr += `<br>Au final: $A=\\dfrac{ ${a * c} ${(-a * d)}\\sqrt{${b}}}{${c * c - d * d * b}}$ `
          if (c * c - d * d * b < 0) { texteCorr += `<br>Ou encore : $A=\\dfrac{ ${-a * c} ${(a * d)}\\sqrt{${b}}}{${-c * c + d * d * b}}$ ` }
        }
        if (n !== 1) {
          texteCorr += `<br>Donc $A=\\dfrac{ ${a * c} ${(-a * d)}\\sqrt{${b}}}{${c * c - d * d * b}}$ <br> `
          texteCorr += `<br>Au final $A=\\dfrac{ ${a * c / n} ${ecritureAlgebriqueSauf1(-a * d / n)}\\sqrt{${b}}}{${c * c / n - d * d * b / n}}$ `
          if (c * c - d * d * b < 0) { texteCorr += `<br>Ou encore $A=\\dfrac{ ${-a * c / n} ${ecritureAlgebriqueSauf1(a * d / n)}\\sqrt{${b}}}{${-c * c / n + d * d * b / n}}$ ` }
        }
      }
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
