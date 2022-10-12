import Exercice from '../Exercice.js'
import { pgcd, randint } from '../../modules/outils/entiers.js'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1 } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texFractionReduite } from '../../modules/outils/arrayFractions.js'
import { abs } from '../../modules/outils/nombres.js'
export const titre = 'Rendre entier le dénominateur d\'une fraction'

/**
 * 2N32-3, ex 2N11
 * @author Stéphane Guyon
 */
export const uuid = '4771d'
export const ref = '2N32-7'
export default function Rendreentier () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = 'Rendre entier le dénominateur d\'une fraction'
  this.nbQuestions = 1
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 2
  this.sup1 = 1

  this.nouvelleVersion = function () {
    this.consigne = ' Supprimer la racine carrée du dénominateur ' + (this.nbQuestions !== 1 ? 'des fractions suivantes' : 'de la fraction suivante') + '.'
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, a, b, c, d, n, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 11)
      b = randint(2, 11, [4, 8, 9])
      c = randint(2, 9)
      d = randint(-7, 7, [-1, 0, 1])
      if (this.sup === 1) {
        texte = ` $A=\\dfrac{ ${a} }{\\sqrt{${b}}} $ `
        texteCorr = `Pour lever l'irrationnalité du dénominateur, il suffit de multiplier le numérateur et le dénominateur de la fraction par $\\sqrt{${b}}$.`
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
        texteCorr = 'Pour lever l\'irrationnalité du dénominateur d\'une fraction,  la stratégie consiste à utiliser sa "quantité conjuguée" pour faire apparaître l\'identité remarquable $a^2-b^2$ au dénominateur.'
        texteCorr += '<br>Ici, il faut donc multiplier le numérateur et le dénominateur de la fraction par '
        texteCorr += ` $ ${c}${ecritureAlgebrique(-d)}\\sqrt{${b}}$.<br>`
        texteCorr += `<br>$\\begin{aligned}A&=\\dfrac{ ${a} }{${c}${ecritureAlgebrique(d)}\\sqrt{${b}}}\\\\`

        texteCorr += `&=\\dfrac{ ${a}\\times (${c}${ecritureAlgebrique(-d)}\\sqrt{${b}}) }{(${c}${ecritureAlgebrique(d)}\\sqrt{${b}})(${c}${ecritureAlgebrique(-d)}\\sqrt{${b}})}\\\\`
        texteCorr += `&=\\dfrac{ ${a * c} ${ecritureAlgebrique(-a * d)}\\sqrt{${b}}}{(${c})^2-\\left(${abs(d)}\\sqrt{${b}}\\right)^2}\\\\ `
        texteCorr += `&=\\dfrac{ ${a * c} ${ecritureAlgebriqueSauf1(-a * d)}\\sqrt{${b}}}{${(c * c)}-(${d * d}\\times${b})}\\\\`
        texteCorr += `&=\\dfrac{ ${a * c} ${ecritureAlgebriqueSauf1(-a * d)}\\sqrt{${b}}}{${c * c}-${d * d * b}}\\\\`
        n = pgcd(a * c, -a * d, c * c - d * d * b)
        if (n === 1) {
          texteCorr += `&=\\dfrac{ ${a * c} ${ecritureAlgebriqueSauf1(-a * d)}\\sqrt{${b}}}{${c * c - d * d * b}}\\\\ `
          if (c * c - d * d * b < 0) { texteCorr += `&=\\dfrac{ ${-a * c} ${ecritureAlgebriqueSauf1(a * d)}\\sqrt{${b}}}{${-c * c + d * d * b}}\\\\ ` }
        }
        if (n !== 1) {
          texteCorr += `&=\\dfrac{ ${a * c} ${ecritureAlgebriqueSauf1(-a * d)}\\sqrt{${b}}}{${c * c - d * d * b}}\\\\`
          texteCorr += `&=\\dfrac{ ${a * c / n} ${ecritureAlgebriqueSauf1(-a * d / n)}\\sqrt{${b}}}{${c * c / n - d * d * b / n}}\\\\ `
          if (c * c - d * d * b < 0) { texteCorr += `=&\\dfrac{ ${-a * c / n} ${ecritureAlgebriqueSauf1(a * d / n)}\\sqrt{${b}}}{${-c * c / n + d * d * b / n}}\\\\ ` }
        }
        texteCorr += '\\end{aligned}$'
      }
      if (this.sup === 3) {
        d = randint(2, 9)

        texte = `$A=\\dfrac{ ${a} }{${c}${ecritureAlgebrique(d)}\\sqrt{x}} $ définie sur $D=\\left]${texFractionReduite(c ** 2, d ** 2)};+\\infty\\right[$`
        texteCorr = 'Pour lever l\'irrationnalité du dénominateur d\'une fraction,  la stratégie consiste à utiliser sa "quantité conjuguée" pour faire apparaître l\'identité remarquable $a^2-b^2$ au dénominateur.'
        texteCorr += '<br>Ici, il faut donc multiplier le numérateur et le dénominateur de la fraction par '
        texteCorr += ` $ ${c}${ecritureAlgebrique(-d)}\\sqrt{x}$.<br>`
        texteCorr += 'On vérifie bien que cette expression ne s\'annule pas sur $D$ :<br>'
        texteCorr += ` $\\begin{aligned} \\phantom{\\iff} &${c}${ecritureAlgebrique(-d)}\\sqrt{x}=0\\\\`
        texteCorr += ` \\iff & ${d}\\sqrt{x}=${c}\\\\`
        texteCorr += ` \\iff & \\sqrt{x}=\\dfrac{${c}}{${d}}\\\\`
        texteCorr += ` \\iff & \\sqrt{x}=${texFractionReduite(c, d)}\\\\`
        texteCorr += ` \\iff & x=${texFractionReduite(c ** 2, d ** 2)}\\\\`
        texteCorr += '\\end{aligned}$'
        texteCorr += `<br>Comme $${texFractionReduite(c ** 2, d ** 2)} \\notin D$, la quantité conjuguée ne s'annule pas sur $D$.`
        texteCorr += '<br>On peut donc simplifier l\'expression :<br>'
        texteCorr += `<br>$\\begin{aligned}A&=\\dfrac{ ${a} }{${c}${ecritureAlgebrique(d)}\\sqrt{x}}\\\\`
        texteCorr += `&=\\dfrac{ ${a}\\times (${c}${ecritureAlgebrique(-d)}\\sqrt{x}) }{(${c}${ecritureAlgebrique(d)}\\sqrt{x})(${c}${ecritureAlgebrique(-d)}\\sqrt{x})}\\\\`
        texteCorr += `&=\\dfrac{ ${a * c} ${ecritureAlgebrique(-a * d)}\\sqrt{x}}{(${c})^2-\\left(${abs(d)}\\sqrt{x}\\right)^2}\\\\ `
        texteCorr += `&=\\dfrac{ ${a * c} ${ecritureAlgebriqueSauf1(-a * d)}\\sqrt{x}}{${(c * c)}-${d * d} x}\\\\`
        texteCorr += '\\end{aligned}$'
        n = pgcd(a * d, c * c, d * d, a * c)
        if (n !== 1) {
          texteCorr += '<br>Ou encore  :  '
          texteCorr += `$A=\\dfrac{ ${a * c / n} ${ecritureAlgebriqueSauf1(-a * d / n)}\\sqrt{x}}{${c * c / n}${ecritureAlgebriqueSauf1(-d * d / n)}x}$`
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Dénominateur « racine de a »\n2 : Dénominateur « a + racine de b »\n3 : Dénominateur « a + b racine de x »']
}
