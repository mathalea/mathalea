import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, abs, randint, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, pgcd, texFractionSigne, texFractionReduite } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/gestionInteractif.js'
import {} from 'mathjs'
import {} from 'core-js/core/number'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Résoudre une équation du second degré à partir de la forme canonique'

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @author Stéphane Guyon
 * Référence 1E11
*/
export default function Resolutionavecformecanonique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Utiliser la forme canonique pour résoudre une équation du second degré : '
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.spacingCorr = 3
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions
    if (this.interactif) {
      this.consigne += '<br> '
    }
    if (this.sup === 1) {
      listeTypeDeQuestions = combinaisonListes(['solutionsEntieres', 'solutionsEntieres'], this.nbQuestions)
    }

    for (let i = 0, texte, texteCorr, a, b, b1, a1, c, x1, x2, k, beta, delta, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (listeTypeDeQuestions[i] === 'solutionsEntieres') {
        // On définit les paramètres utiles à l'exo :
        x1 = randint(-5, 5, [0])
        x2 = randint(-5, 5, [0, x1]) // les deux racines non-nulles et distinctes du polynôme
        a = randint(-4, 4, [0]) // Coefficient a
        b = 0
        while (b === 0) {
          a = randint(-4, 4, [0])
          b = -a * x1 - a * x2 // b non-nul définit algébriquement
        }
        c = 0
        while (c === 0) {
          a = randint(-4, 4, [0])
          c = a * x1 * x2 // c non-nul définit algébriquement
        }

        // alpha = -b / (2 * a)
        beta = -(b * b - 4 * a * c) / (4 * a)
        delta = b * b - 4 * a * c
        texte = `Résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$ sans utiliser le discriminant.`
        texte += 'en utilisant la forme canoique du polynôme.'
        texteCorr = `On veut résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$.`
        texteCorr += '<br>On reconnaît une équation du second degré sous la forme $ax^2+bx+c = 0$.'
        texteCorr += '<br>La consigne nous amène à commencer par écrire le polynôme du second degré sous forme canonique, <br>c\'est à dire sous la forme :  $a(x-\\alpha)^2+\\beta$,'
        texteCorr += `<br>Dans le polynôme de l'énoncé : $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        if (a !== 1) { // On simplifie par a si a<>1
          texteCorr = `<br>On commence par diviser les deux membres de l'égalité par $${a}$.`
          texteCorr += '<br>$x^ '
          if (a * b > 0) { // On teste le signe de la fraction b/a
            texteCorr += '+' // pour ajouter ou non un signe + si besoin
          }
          texteCorr += `${texFractionReduite(b, a)}x`
          if (c * b > 0) { // On teste le signe de la fraction c/a
            texteCorr += '+' // pour ajouter ou non un signe + si besoin
          }
          texteCorr += `${texFractionReduite(c, a)}=0$`
          // fin du test si a<>1
        }
        // ******************************************************************************************************************
        // ******************      Reconnaissance de l'identité remarquable :    ********************************************
        // ******************************************************************************************************************
        texteCorr += ', on reconnaît le début d\'une identité remarquable :'
        texteCorr += '<br>$\\left(x'
        if (a * b > 0) { // On teste le signe de la fraction b/a pour ajouter ou non un signe +
          texteCorr += '+'
        }
        texteCorr += ` ${texFractionSigne(b, 2 * a)}\\right)^2=x^2`
        if (a * b > 0) { // On teste le signe de la fraction b/a pour ajouter ou non un signe +
          texteCorr += '+'
        } else texteCorr += '-'
        texteCorr += `2\\times ${texFractionSigne(abs(b), 2 * abs(a))}\\times x +\\left(${texFractionSigne(b * b, 2 * a * a)}\\right)^2$`
        if (pgcd(b, a) !== 1) { // On teste pour savoir si b/a est irreductible
          texteCorr += `<br>$\\big(x+${texFractionReduite(b, 2 * a)}\\big)^2=x^2+${texFractionReduite(b, a)}\\times x +${texFractionReduite(b * b, 4 * a * a)}$`
        } else {
          texteCorr += `<br>$\\left(x${texFractionSigne(b, 2 * a)}\\right)^2=x^2${texFractionSigne(b, a)}\\times x +\\left(${texFractionSigne(b1, 2 * a1)}\\right)^2$`
        }

        if (pgcd(b, 2 * a) !== 1) { // On teste pour savoir si b/2a est irreductible
          texteCorr += `<br>$\\big(x${texFractionReduite(b, 2 * a)}\\big)^2=x^2${texFractionReduite(b, a)}\\times x +${texFractionReduite(b * b, 4 * a * a)}$`
        }
        texteCorr += '<br>On en déduit que :'
        texteCorr += `<br>$x^2 ${texFractionSigne(b, a)} \\times x =\\big(x+${texFractionReduite(b, 2 * a)}\\big)^2-${texFractionReduite(b * b, 4 * a * a)}$`
        texteCorr += '<br>On peut donc dire que l\'équation de départ est équivalente à :'
        texteCorr += `<br>$\\big(x+${texFractionReduite(b, 2 * a)}\\big)^2-${texFractionReduite(b * b, 4 * a * a)}+${texFractionReduite(c, a)}=0$`
        texteCorr += `<br>$\\big(x+${texFractionReduite(b, 2 * a)}\\big)^2+${texFractionReduite(-delta, 4 * a * a)}=0$`
        if (delta < 0) {
          texteCorr += '<br>L\'équation revient à ajouter deux nombres positifs, dont un non-nul. Cette somme ne peut pas être égale à zéro.'
          texteCorr += '<br>On en déduit que $S=\\emptyset$'
        }
        texteCorr += '<br>On reconnaît l\'identité remarquable $a^2-b^2$ :'
        texteCorr += `<br>avec  $a=x+${texFractionReduite(b, 2 * a)}$ et $b = \\dfrac{\\sqrt{${beta}}{2${a}}}$`
      }

      texte += ajouteChampTexteMathLive(this, i)
      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Solutions entières\n2 : Solutions réelles et calcul du discriminant non obligatoire']
}
