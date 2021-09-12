import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif, pgcd, texRacineCarree } from '../../modules/outils.js'
import { setReponse, ajouteChampTexteMathLive } from '../../modules/gestionInteractif.js'
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

    for (let i = 0, texte, texteCorr, a, b, c, x1, x2, k, alpha, beta, delta, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (listeTypeDeQuestions[i] === 'solutionsEntieres') {
        // k(x-x1)(x-x2)
        x1 = randint(-5, 2, [0])
        x2 = randint(x1 + 1, 5, [0, -x1])
        a = randint(-4, 4, [0])
        b = 0
        while (b === 0) {
          a = randint(-4, 4, [0])
          b = -a * x1 - a * x2
        }
        c = 0
        while (c === 0) {
          a = randint(-4, 4, [0])
          c = a * x1 * x2
        }

        if (pgcd(a, b, c) !== 1) {
          k = pgcd(a, b, c)
          a = a / k
          b = b / k
          c = c / k
        }

        alpha = -b / (2 * a)
        beta = -(b * b - 4 * a * c) / (4 * a)
        delta = b * b - 4 * a * c
        texte = `Résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$ sans utiliser le discriminant.`
        texte += 'en utilisant la forme canoique du polynôme.'

        texteCorr = '<br>On reconnaît une équation du second degré sous la forme $ax^2+bx+c = 0$.'
        texteCorr += '<br>La consigne nous amène à commencer par écrire le polynôme du second degré sous forme canonique, <br>c\'est à dire sous la forme :  $a(x-\\alpha)^2+\\beta$,'

        texteCorr += '<br>avec $\\alpha=\\dfrac{-b}{2a}$ et $\\beta=P(\\alpha).$'
        texteCorr += `<br>Avec l'énoncé : $a=${a}$ et $b=${b}$, on en déduit que $\\alpha=${alpha}$.`
        texteCorr += `<br>On calcule alors $\\beta=P(${alpha})$, et on obtient au final que $\\beta=${beta}$.`
        texteCorr += '<br>Ce qui est équivalent à résoudre l\'équation $'
        if (a === 1 || a === -1) {
          if (a === -1) { texteCorr += '-' }
        } else { texteCorr += `${a}` }
        texteCorr += `(x ${ecritureAlgebrique(-alpha)})^2`
        if (beta !== 0) { texteCorr += `${ecritureAlgebrique(beta)}` }
        texteCorr += '=0$'
        texteCorr += '<br> On reconnaît une identité remarquable de la forme $a^2-b^2$, '
        texteCorr += '<br> avec $a='
        if (a === 1 || a === -1) {
          if (a === -1) { texteCorr += '-' }
        } else { texteCorr += `${a}` }
        texteCorr += `(x ${ecritureAlgebrique(-alpha)})$`
        texteCorr += 'et $b =Math.trunc(${beta})$'
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
