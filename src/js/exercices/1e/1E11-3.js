import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Déterminer la forme canonique d\'un polynôme du second degré'

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @author Stéphane Guyon
 * Référence 1E11
*/
export default function Formacanonique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Forme canonique : '
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

    for (let i = 0, texte, texteCorr, a, b, c, alpha, beta, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (listeTypeDeQuestions[i] === 'solutionsEntieres') {
        // k(x-x1)(x-x2)
        alpha = randint(-5, 5, [0])
        beta = randint(-5, 5, [0])
        a = randint(-4, 4, [0])
        b = -2 * a * alpha
        c = a * alpha * alpha + beta

        texte = `Déterminer la forme canonique du polynôme $P$, défini pour tout $x \\in \\mathbb{R}$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        texteCorr = '<br>On sait que si le polynôme, sous forme développée, s\'écrit $P(x)=ax^2+bx+c,$'
        texteCorr += 'alors sa forme canonique est de la forme $P(x)=a(x-\\alpha)^2+\\beta$,'

        texteCorr += '<br>avec $\\alpha=\\dfrac{-b}{2a}$ et $\\beta=P(\\alpha).$'
        texteCorr += `<br>Avec l'énoncé : $a=${a}$ et $b=${b}$, on en déduit que $\\alpha=${alpha}$.`
        texteCorr += `<br>On calcule alors $\\beta=P(${alpha})$, et on obtient au final que $\\beta=${beta}$.`
        texteCorr += `<br>d'où, $P(x)=${(a)}\\big(x-${ecritureParentheseSiNegatif(alpha)}\\big)^2+${ecritureParentheseSiNegatif(beta)}$`
        texteCorr += '<br>Au final, $P(x)='
        if (a === 1 || a === -1) {
          if (a === -1) { texteCorr += '-' }
        } else { texteCorr += `${a}` }
        texteCorr += `(x ${ecritureAlgebrique(-alpha)})^2`
        if (beta !== 0) { texteCorr += `${ecritureAlgebrique(beta)}` }
        texteCorr += '$'
        if (beta > 0) {
          if (alpha > 0) { setReponse(this, i, [`${a}(x-${alpha})^2+${beta}`]) } else { setReponse(this, i, [`${a}(x+${-alpha})^2+${beta}`]) }
        }
        if (beta < 0) {
          if (alpha > 0) { setReponse(this, i, [`${a}(x-${alpha})^2${beta}`]) } else { setReponse(this, i, [`${a}(x+${-alpha})^2${beta}`]) }
        }
        if (beta === 0) { if (alpha > 0) { setReponse(this, i, [`${a}(x-${alpha})^2`]) } else { setReponse(this, i, [`${a}(x+${-alpha})^2}`]) } }
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
