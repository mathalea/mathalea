import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif } from '../../modules/outils.js'
// import { setReponse } from '../../modules/gestionInteractif.js'
// import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
// import { courbeSpline } from '../../modules/2d.js'
// export const interactifReady = true
// export const interactifType = 'mathLive'
export const titre = 'Factoriser un polynôme du second degré avec racines entières'

/**
 *
 * @author Rémi Angot et Stéphane Guyon
 * Référence 1E14
*/
export const uuid = 'a8e1b'
export const ref = '1E14'
export default function ResoudreEquationDegre2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Factoriser, si cela est possible, ' + (this.nbQuestions !== 1 ? 'chaque' : 'le') + ' polynôme suivant $P$ défini pour tout $x$ de $\\mathbb R$ par : '
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.spacingCorr = 3
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions
    if (this.sup === 1) {
      listeTypeDeQuestions = combinaisonListes(['solutionsEntieres', 'solutionsEntieres', 'pasDeSolution'], this.nbQuestions)
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

        texte = `$P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`

        texteCorr = `On a $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        texteCorr += '<br>On reconnaît un polynôme du second degré. On cherche ses éventuelles racines en calculant son discriminant.'
        texteCorr += `<br>$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta>0$ donc $P(x)$ admet deux racines :'
        texteCorr += '<br> $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
        texteCorr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x1}$`
        texteCorr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x2}$`
        texteCorr += '<br>On peut donc factoriser le polynôme sous la forme : $P(x)=a(x-x_1)(x-x_2)$'
        texteCorr += `<br>$P(x)=${rienSi1(a)}\\left(x${ecritureAlgebrique(-x1)}\\right)\\left(x ${ecritureAlgebrique(-x2)}\\right)$.`
        // setReponse(this, i, [`${x1} ; ${x2}`, `${x2} ; ${x1}`])
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
        texte = `$P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`

        texteCorr = `On a $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        texteCorr += '<br>On reconnaît un polynôme du second degré. On cherche ses éventuelles racines en calculant son discriminant.'
        texteCorr += '<br>$\\Delta<0$ donc le polynôme n\'admet pas de racines réelles.'
        texteCorr += '<br>D\'après le cours, il n\'est pas factorisable.'
        // setReponse(this, i, ['Non', 'non', 'NON'])
      }
      // texte += ajouteChampTexteMathLive(this, i)
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
