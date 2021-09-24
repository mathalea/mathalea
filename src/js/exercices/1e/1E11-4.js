import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, extraireRacineCarree, signe } from '../../modules/outils.js'
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

    for (let i = 0, texte, texteCorr, a, b, b1, b2, c1, x1, x2, c, delta, alpha, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (listeTypeDeQuestions[i] === 'solutionsEntieres') {
        // On définit les paramètres utiles à l'exo :
        // x1 = randint(-5, 5, [0])
        // x2 = randint(-5, 5, [0, x1]) // les deux racines non-nulles et distinctes du polynôme
        a = randint(-5, 5, [0]) // Coefficient a
        b = randint(-5, 5, [0])
        c = randint(-5, 5, [0])
        // while (b === 0 || c === 0) {
        //   a = randint(-4, 4, [0])
        //   b = -a * x1 - a * x2 // b non-nul définit algébriquement
        //   c = a * x1 * x2 // c non-nul définit algébriquement
        // }
        c1 = fraction(c, a)
        b1 = fraction(b, a)
        alpha = fraction(b, 2 * a)
        delta = b * b - 4 * a * c
        b2 = fraction(delta, 4 * a * a).simplifie() // terme b² dans l'expression a²-b²
        /*    if (delta >= 0) {
          if (Math.sqrt(delta) === Math.trunc(Math.sqrt(delta))) {
            b3 = fraction(Math.sqrt(delta), Math.abs(2 * a)).simplifie()
          } else { b3 = b2 }
          x1 = fraction(-b - Math.sqrt(delta), 2 * a)
          x2 = fraction(-b + Math.sqrt(delta), 2 * a)
        }
        */
        texte = `Résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$ sans utiliser le discriminant.`
        texte += 'en utilisant la forme canoique du polynôme.'
        texteCorr = `On veut résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0\\quad(1)$.`
        texteCorr += '<br>On reconnaît une équation du second degré sous la forme $ax^2+bx+c = 0$.'
        texteCorr += '<br>La consigne nous amène à commencer par écrire le polynôme du second degré sous forme canonique, <br>c\'est à dire sous la forme :  $a(x-\\alpha)^2+\\beta$,'

        // On simplifie par a si a !==1
        if (a !== 1) {
          texteCorr += `<br>On commence par diviser les deux membres de l'égalité par le coefficient $a$ qui vaut ici $${a}$.`
          texteCorr += `<br>$(1)\\iff\\quad x^2 ${b1.valeurDecimale === 1 ? '+ ' : b1.valeurDecimale === -1 ? '- ' : b1.simplifie().ecritureAlgebrique} x ${c1.simplifie().ecritureAlgebrique}=0$`

          // fin du test si a<>1
        }
        // ******************************************************************************************************************
        // ******************      Reconnaissance de l'identité remarquable :    ********************************************
        // ******************************************************************************************************************
        texteCorr += '<br>On reconnaît le début d\'une identité remarquable :'
        texteCorr += `<br>$\\left(x ${alpha.simplifie().ecritureAlgebrique}\\right)^2`
        // texteCorr += `${alpha.signe === 1 ? '+' : '-'}2\\times ${alpha.valeurAbsolue().simplifie().texFraction}\\times x +${alpha.simplifie().den === 1 ? alpha.simplifie().valeurAbsolue().texFraction : '\\left(' + alpha.simplifie().valeurAbsolue().texFraction + '\\right)'}^2$`
        // 2èmeligne correction On développe IR
        texteCorr += `=x^2 ${alpha.signe === 1 ? '+' : '-'}${Math.abs(alpha.num * 2) === Math.abs(alpha.den) ? '' : alpha.multiplieEntier(2).valeurAbsolue().simplifie().texFraction}x+${alpha.produitFraction(alpha).simplifie().texFraction} $`
        // 3èmeligne correction On réécrrit l'expression en fct de l'IR
        texteCorr += '<br>On en déduit que :  '
        texteCorr += `$x^2 ${alpha.signe === 1 ? '+' : '-'}${Math.abs(alpha.num * 2) === Math.abs(alpha.den) ? '' : alpha.multiplieEntier(2).valeurAbsolue().simplifie().texFraction}x= \\left(x ${alpha.simplifie().ecritureAlgebrique}\\right)^2    ${alpha.produitFraction(alpha).oppose().simplifie().ecritureAlgebrique} $`
        // 3èmeligne correction On transforme l'équation avec l'IR
        texteCorr += '<br>Il vient alors :'
        texteCorr += `<br>$\\phantom{\\iff}\\quad x^2 ${b1.valeurDecimale === 1 ? '+ ' : b1.valeurDecimale === -1 ? '- ' : b1.simplifie().ecritureAlgebrique} x ${c1.simplifie().ecritureAlgebrique}=0$`
        texteCorr += `<br>$\\iff\\quad  \\left(x ${alpha.simplifie().ecritureAlgebrique}\\right)^2    ${alpha.produitFraction(alpha).oppose().simplifie().ecritureAlgebrique}${c1.simplifie().ecritureAlgebrique}=0$`
        // 4èmeligne correction : On factorise pour obtenir équation produit-nul
        texteCorr += `<br>$\\iff\\quad  \\left(x ${alpha.simplifie().ecritureAlgebrique}\\right)^2    ${b2.simplifie().oppose().ecritureAlgebrique}=0$`
        // test des solutions
        if (delta < 0) {
          texteCorr += '<br>L\'équation revient à ajouter deux nombres positifs, dont un non-nul. Cette somme ne peut pas être égale à zéro.'
          texteCorr += '<br>On en déduit que $S=\\emptyset$'
        }
        if (delta > 0) { // Cas des deux solutions :
          texteCorr += '<br>On reconnaît l\'identité remarquable $a^2-b^2$ :'
          texteCorr += `<br>avec  $a= \\left(x ${alpha.simplifie().ecritureAlgebrique}\\right)$ `
          texteCorr += `et $b =${b2.texRacineCarree(true)}$`// = ${b3.simplifie().texFraction} why ?
          texteCorr += '<br>L\'équation à résoudre est équivalente à :'
          texteCorr += `<br> $\\left(x ${alpha.simplifie().ecritureAlgebrique}-${b2.texRacineCarree()}\\right)\\left(x ${alpha.simplifie().ecritureAlgebrique}+${b2.texRacineCarree()}\\right)=0$`
          if (b2.estParfaite()) {
            x1 = alpha.sommeFraction(b2.racineCarree().simplifie().oppose()).simplifie().ecritureAlgebrique
            x2 = alpha.sommeFraction(b2.racineCarree().simplifie()).simplifie().ecritureAlgebrique
          } else {
            x1 = `${signe(a)}\\dfrac{${b}-${rienSi1(extraireRacineCarree(delta)[0])}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(2 * a)}}`
            x2 = `${signe(a)}\\dfrac{${b}+${rienSi1(extraireRacineCarree(delta)[0])}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(2 * a)}}`
          }
          texteCorr += `<br> $\\left(x ${x1}\\right)\\left(x ${x2}\\right)=0$`
          texteCorr += '<br> On applique la propriété du produit nul :'
          texteCorr += `<br> Soit $x ${x1}=0$ , soit $x ${x2}=0$`
          texteCorr += `<br> Soit $x = ${x1.substring(0, 1) === '-' ? x1.substring(1) : '-' + x1.substring(1)}$ , soit $x = ${x2.substring(0, 1) === '-' ? x2.substring(1) : '-' + x2.substring(1)}$`
          texteCorr += `<br> $S =\\left\\{${x1.substring(0, 1) === '-' ? x1.substring(1) : '-' + x1.substring(1)};${x2.substring(0, 1) === '-' ? x2.substring(1) : '-' + x2.substring(1)}\\right\\}$`
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
