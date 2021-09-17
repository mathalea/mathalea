import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, abs, randint, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, pgcd, texFractionSigne, texFractionReduite } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/gestionInteractif.js'
import { fraction } from '../../modules/fractions.js'
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

    for (let i = 0, texte, texteCorr, a, b, b1, a1, c, x1, x2, k, beta, delta, alpha, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (listeTypeDeQuestions[i] === 'solutionsEntieres') {
        // On définit les paramètres utiles à l'exo :
        x1 = randint(-5, 5, [0])
        x2 = randint(-5, 5, [0, x1]) // les deux racines non-nulles et distinctes du polynôme
        a = randint(-4, 4, [0]) // Coefficient a
        b = 0
        c = 0
        while (b === 0 || c === 0) {
          a = randint(-4, 4, [0])
          b = -a * x1 - a * x2 // b non-nul définit algébriquement
          c = a * x1 * x2 // c non-nul définit algébriquement
        }

        alpha = fraction(b, 2 * a)
        beta = fraction(-(b * b - 4 * a * c), 4 * a)
        delta = b * b - 4 * a * c
        texte = `Résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$ sans utiliser le discriminant.`
        texte += 'en utilisant la forme canoique du polynôme.'
        texteCorr = `On veut résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$.`
        texteCorr += '<br>On reconnaît une équation du second degré sous la forme $ax^2+bx+c = 0$.'
        texteCorr += '<br>La consigne nous amène à commencer par écrire le polynôme du second degré sous forme canonique, <br>c\'est à dire sous la forme :  $a(x-\\alpha)^2+\\beta$,'
        texteCorr += `<br>Dans le polynôme de l'énoncé : $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        if (a !== 1) { // On simplifie par a si a<>1
          texteCorr += `<br>On commence par diviser les deux membres de l'égalité par $${a}$.`
          texteCorr += '<br>$x^2 '

          // fin du test si a<>1
        }
        // ******************************************************************************************************************
        // ******************      Reconnaissance de l'identité remarquable :    ********************************************
        // ******************************************************************************************************************
        texteCorr += ', on reconnaît le début d\'une identité remarquable :'
        texteCorr += `<br>$\\left(x ${alpha.simplifie().ecritureAlgebriqueFraction}\\right)^2=x^2`
        texteCorr += `${alpha.signe === 1 ? '+' : '-'}2\\times ${alpha.valeurAbsolue().simplifie().texFraction}\\times x +${alpha.simplifie().den === 1 ? alpha.simplifie().valeurAbsolue().texFraction : '\\left(' + alpha.simplifie().valeurAbsolue().texFraction + '\\right)'}^2$`
        // 2èmeligne correction
        texteCorr += `<br>$\\left(x ${alpha.simplifie().ecritureAlgebriqueFraction}\\right)^2=x^2`
        texteCorr += `${alpha.signe === 1 ? '+' : '-'}${Math.abs(alpha.num * 2) === Math.abs(alpha.den) ? '' : alpha.multiplieEntier(2).valeurAbsolue().simplifie().texFraction}x+${alpha.produitFraction(alpha).simplifie().texFraction} $`
        // 3èmeligne correction
        texteCorr += '<br>On en déduit que :'
        texteCorr += `<br>$x^2 ${texFractionSigne(b, a)} \\times x =\\big(x+${texFractionReduite(b, 2 * a)}\\big)^2-${texFractionReduite(b * b, 4 * a * a)}$`
        texteCorr += '<br>On peut donc dire que l\'équation de départ est équivalente à :'
        texteCorr += `<br>$\\big(x+${texFractionReduite(b, 2 * a)}\\big)^2-${texFractionReduite(b * b, 4 * a * a)}+${texFractionReduite(c, a)}=0$`
        texteCorr += `<br>$\\big(x+${texFractionReduite(b, 2 * a)}\\big)^2+${texFractionReduite(-delta, 4 * a * a)}=0$`

        if (delta < 0) {
          texteCorr += '<br>L\'équation revient à ajouter deux nombres positifs, dont un non-nul. Cette somme ne peut pas être égale à zéro.'
          texteCorr += '<br>On en déduit que $S=\\emptyset$'
        }
        if (delta > 0) {
          texteCorr += '<br>On reconnaît l\'identité remarquable $a^2-b^2$ :'
          texteCorr += `<br>avec  $a=x+${texFractionReduite(b, 2 * a)}$ `
          texteCorr += `et $b =\\sqrt{${texFractionReduite(delta, 4 * a * a)}}$`
          texteCorr += '<br>L\'équation à résoudre est équivalente à :'
          texteCorr += `<br> $\\left(x+${texFractionReduite(b, 2 * a)} -\\sqrt{${texFractionReduite(delta, 4 * a * a)}}\\right)\\left(x+${texFractionReduite(b, 2 * a)} +\\sqrt{${texFractionReduite(delta, 4 * a * a)}}\\right)=0$`
          texteCorr += '<br> On applique lepropriété du produit nul.'
          texteCorr += `<br> Soit $x+${texFractionReduite(b, 2 * a)} -\\sqrt{${texFractionReduite(delta, 4 * a * a)}}=0$ , soit $x+${texFractionReduite(b, 2 * a)} +\\sqrt{${texFractionReduite(delta, 4 * a * a)}}=0$`
        }
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
