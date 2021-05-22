import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, choice, combinaisonListes, abs, randint, lettreDepuisChiffre, printlatex } from '../../modules/outils.js'
export const titre = 'Factoriser une expression'

/**
* Utiliser la simple ou la double distributivité et réduire l'expression
*
* @author Rémi Angot
* 3L11-4
*/
export default function FactoriserUneExpression3e () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Factoriser les expressions suivantes.'
  this.nbQuestions = 8
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    if (parseInt(this.sup) === 1) {
      typesDeQuestionsDisponibles = ['c(ax+b)+x(ax+b)', 'c(ax+b)-x(ax+b)', 'x(ax+b)+c(ax+b)', 'x(ax+b)-c(ax+b)']
    } else {
      typesDeQuestionsDisponibles = ['(ax+b)(cx+d)+(ax+b)(ex+f)', '(ax+b)(cx+d)-(ax+b)(ex+f)', '(cx+d)(ax+b)+(ax+b)(ex+f)', '(cx+d)(ax+b)-(ax+b)(ex+f)', '(ax+b)(cx+d)+(ex+f)(ax+b)', '(ax+b)(cx+d)-(ex+f)(ax+b)', '(cx+d)(ax+b)+(ex+f)(ax+b)', '(cx+d)(ax+b)-(ex+f)(ax+b)']
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, a, b, c, d, e, f, operation, couplenm, k, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(1, 3)
      b = randint(1, 5) * choice([-1, 1])
      c = randint(2, 5)
      d = randint(2, 5, c) * choice([-1, 1])
      e = randint(1, 6, c)
      f = randint(1, 5, e) * choice([-1, 1])
      switch (listeTypeDeQuestions[i]) {
        case 'c(ax+b)+x(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${c}*(${a}*x+${b})+x*(${a}*x+${b})`)}$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=(${c}+x)(${a}x+${b})$`
          break
        case 'c(ax+b)-x(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${c}*(${a}*x+${b})-x*(${a}*x+${b})`)}$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=(${c}-x)(${a}x+${b})$`
          break
        case 'x(ax+b)+c(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`x(${a}*x+${b})+${c}*(${a}*x+${b})`)}$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=(x+${c})(${a}x+${b})$`
          break
        case 'x(ax+b)-c(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`x(${a}*x+${b})-${c}*(${a}*x+${b})`)}$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=(x-${c})(${a}x+${b})$`
          break
        case 'nkx+mkx2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${n * k}*x+(${m * k})*x^2`)}$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x\\times${n}+${k}x\\times${m}x$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x(${n}+${m}x)$`
          break
        case 'nkx-mkx2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${n * k}*x-(${m * k})*x^2`)}$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x\\times${n}-${k}x\\times${m}x$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x(${n}-${m}x)$`
          break
        case 'nx2+x':
          texte = `$${lettreDepuisChiffre(i + 1)}=${n}x^2+x$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x\\times ${n}x+x\\times 1$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x(${n}x+1)$`
          break
        case 'nx2+mx':
          texte = `$${lettreDepuisChiffre(i + 1)}=${n}x^2+${m}x$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x\\times ${n}x+x\\times ${m}$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x(${n}x+${m})$`
          break
        case '(ax+b)(cx+d)+(ax+b)(ex+f)':

          texte = `$${lettreDepuisChiffre(i + 1)}=${n}x^2+x$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x\\times ${n}x+x\\times 1$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x(${n}x+1)$`
          break

          break
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
  this.besoinFormulaireNumerique = ['Type de facteur commun', 2, '1 : Simple ou produit\n2 : de la forme ax + b']
}
