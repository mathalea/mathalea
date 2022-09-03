import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Résoudre une équation du second degré'

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @author Rémi Angot
 * Référence 1E11
*/
export const uuid = 'cf78f'
export const ref = '1E11-2'
export default function ResoudreEquationDegre2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.spacingCorr = 3
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.consigne = 'Résoudre dans $\\mathbb{R}$ les équations suivantes.'
    if (this.interactif) {
      this.consigne += '<br>S\'il y a plusieurs solutions, les donner séparées d\'un point virgule. <br>S\'il n\'y a pas de solution, écrire Non.'
    }
    const listeTypeDeQuestions = combinaisonListes(['solutionsEntieres', 'solutionsEntieres', 'pasDeSolution'], this.nbQuestions)

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
        setReponse(this, i, [`${x1} ; ${x2}`, `${x2} ; ${x1}`])
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
        setReponse(this, i, ['Non', 'non', 'NON'])
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
}
