import { texFraction, texFractionReduite, texFractionSigne } from '../../modules/outils/arrayFractions.js'
import { choice } from '../../modules/outils/arrays.js'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif, rienSi1 } from '../../modules/outils/ecritures.js'
import { randint } from '../../modules/outils/entiers.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texNombre } from '../../modules/outils/texNombres.js'
import Exercice from '../Exercice.js'

export const titre = 'Résoudre une équation du second degré'

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @author Rémi Angot
 * Référence 1E11
*/
export const uuid = '0fbd1'
export const ref = '1E11'
export default function ResoudreEquationDegre2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre dans $\\mathbb{R}$ les équations suivantes.'
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.spacingCorr = 3
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions
    if (this.sup === 1) {
      listeTypeDeQuestions = combinaisonListes(['solutionsEntieres', 'solutionsEntieres', 'solutionDouble', 'pasDeSolution'], this.nbQuestions)
    }
    if (this.sup === 2) {
      listeTypeDeQuestions = combinaisonListes(['factorisationParx', 'pasDeSolution', 'ax2+c', 'solutionsReelles', 'solutionDouble'], this.nbQuestions)
    }
    for (let i = 0, texte, texteCorr, a, b, c, x1, x2, y1, k, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (listeTypeDeQuestions[i] === 'solutionsEntieres') {
        // k(x-x1)(x-x2)
        x1 = randint(-5, 2, [0])
        x2 = randint(x1 + 1, 5, [0, -x1])
        k = randint(-4, 4, [0])
        a = k
        b = -k * x1 - k * x2
        c = k * x1 * x2
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$`

        texteCorr = `$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta>0$ donc l\'équation admet deux solutions : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
        texteCorr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x1}$`
        texteCorr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x2}$`
        texteCorr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${x1} ; ${x2}\\right\\}$.`
      }
      if (listeTypeDeQuestions[i] === 'solutionDouble') {
        // (dx+e)^2=d^2x^2+2dex+e^2
        const d = randint(-11, 11, [-1, 1, 0])
        const e = randint(-11, 11, [0, -1, 1])
        a = d * d
        b = 2 * d * e
        c = e * e
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$`

        texteCorr = `Il est possible de factoriser le membre de gauche : $(${d}x${ecritureAlgebrique(e)})^2=0$. `
        texteCorr += `On a alors une solution double : $${texFractionSigne(-e, d)}`
        if (e % d === 0) {
          texteCorr += `=${-e / d}$.`
        } else {
          texteCorr += '$.'
        }
        texteCorr += '<br> Si on ne voit pas cette factorisation, on peut utiliser le discriminant.'
        texteCorr += `<br>$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += `<br>$\\Delta=0$ donc l'équation admet une unique solution : $${texFraction('-b', '2a')} = ${texFractionReduite(-b, 2 * a)}$`
        if (b % (2 * a) === 0) {
          texteCorr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${-b / (2 * a)}\\right\\}$.`
        } else {
          texteCorr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${texFractionReduite(-b, 2 * a)}\\right\\}$.`
        }
      }
      if (listeTypeDeQuestions[i] === 'solutionsReelles') {
        // ax^2+bx+c
        a = randint(-11, 11, 0)
        b = randint(-11, 11, 0)
        c = randint(-11, 11, 0)
        while (b ** 2 - 4 * a * c < 0 || [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961, 1024, 1089].includes(b ** 2 - 4 * a * c)) {
          a = randint(-11, 11, 0)
          b = randint(-11, 11, 0)
          c = randint(-11, 11, 0)
        }
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$`

        texteCorr = `$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta>0$ donc l\'équation admet deux solutions : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
        texteCorr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}\\approx ${texNombre((-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a), 2)}$`
        texteCorr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}\\approx ${texNombre((-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a), 2)}$`
        texteCorr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}} ; \\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}\\right\\}$.`
      }
      if (listeTypeDeQuestions[i] === 'factorisationParx') {
        // x(ax+b)=ax^2+bx
        a = randint(-11, 11, [0, -1, 1])
        b = randint(-11, 11, 0)
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x=0$`

        texteCorr = 'On peut factoriser le membre de gauche par $x$.'
        texteCorr += `<br>$x(${rienSi1(a)}x${ecritureAlgebrique(b)})=0$`
        texteCorr += '<br>Si un produit est nul alors l\'un au moins de ses facteurs est nul.'
        texteCorr += `<br>$x=0\\quad$ ou $\\quad${rienSi1(a)}x${ecritureAlgebrique(b)}=0$`
        texteCorr += `<br>$x=0\\quad$ ou $\\quad x=${texFractionSigne(-b, a)}$`
        texteCorr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{0 ; ${texFractionReduite(-b, a)}\\right\\}$.`
      }
      if (listeTypeDeQuestions[i] === 'ax2+c') {
        // x(ax+b)=ax^2+bx
        a = randint(-11, 11, 0)
        c = randint(-11, 11, 0)
        texte = `$${rienSi1(a)}x^2${ecritureAlgebrique(c)}=0$`

        texteCorr = 'Il est possible de résoudre cette équation sans effectuer le calcul du discriminant.'
        texteCorr += `<br> $x^2=${texFractionSigne(-c, a)}$`
        if (-c / a > 0) {
          if ([1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961, 1024, 1089].includes(-c / a)) {
            texteCorr += `<br>$x=\\sqrt{${texFractionReduite(-c, a)}}=${Math.sqrt(-c / a)}\\quad$ ou $\\quad x=-\\sqrt{${texFractionReduite(-c, a)}}=${-Math.sqrt(-c / a)}$`
            texteCorr += `<br><br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${Math.sqrt(-c / a)} ; ${-Math.sqrt(-c / a)}\\right\\}$.`
          } else if (-c % a === 0) {
            texteCorr += `<br>$x=\\sqrt{${-c / a}}\\quad$ ou $\\quad x=-\\sqrt{${-c / a}}$`
            texteCorr += `<br><br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{\\sqrt{${-c / a}} ; -\\sqrt{${-c / a}}\\right\\}$.`
          } else {
            texteCorr += `<br>$x=\\sqrt{${texFractionReduite(-c, a)}}\\quad$ ou $\\quad x=-\\sqrt{${texFractionReduite(-c, a)}}$`
            texteCorr += `<br><br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{\\sqrt{${texFractionReduite(-c, a)}} ; -\\sqrt{${texFractionReduite(-c, a)}}\\right\\}$.`
          }
        } else {
          texteCorr += '<br>Dans $\\mathbb{R}$, un carré est toujours positif donc cette équation n\'a pas de solution.'
          texteCorr += '<br>$\\mathcal{S}=\\emptyset$'
        }
      }
      if (listeTypeDeQuestions[i] === 'pasDeSolution') {
        k = randint(1, 5)
        x1 = randint(-3, 3, [0])
        y1 = randint(1, 5)
        if (choice(['+', '-']) === '+') { // k(x-x1)^2 + y1 avec k>0 et y1>0
          a = k
          b = -2 * k * x1
          c = k * x1 * x1 + y1
        } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
          a = -k
          b = 2 * k * x1
          c = -k * x1 * x1 - y1
        }
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$`
        if (b === 0) {
          texte = `$${rienSi1(a)}x^2${ecritureAlgebrique(c)}=0$`
        }
        texteCorr = `$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta<0$ donc l\'équation n\'admet pas de solution.'
        texteCorr += '<br>$\\mathcal{S}=\\emptyset$'
      }

      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Solutions entières\n2 : Solutions réelles et calcul du discriminant non obligatoire']
}
