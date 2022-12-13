import Exercice from '../Exercice.js'
import { randint, choice, texFraction, lettreDepuisChiffre, listeQuestionsToContenuSansNumero } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = 'Développer (a-b)(a+b)'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Développer (ax-b)(ax+b)
* @author Jean-Claude Lhote
* 3L12-1
*/
export const uuid = 'be157'
export const ref = '3L12-1'
export default function DevelopperIdentitesRemarquables3 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = context.isHtml ? 3 : 2
  this.spacingCorr = context.isHtml ? 3 : 2
  this.nbQuestions = 5
  this.sup = 2
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.consigne = this.nbQuestions > 1 ? 'Développer et réduire les expressions suivantes.' : 'Développer et réduire l\'expression suivante.'
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const Fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
      [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
      [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
    for (let i = 0, ns, ds, texte, texteCorr, reponse, cpt = 0, a, b, fraction = []; i < this.nbQuestions && cpt < 50;) {
      if (this.sup === 1) {
        a = randint(1, 9) // coef de x est égal à 1
        texte = `$${lettreDepuisChiffre(i + 1)} = (x-${a})(x+${a})$` // (x-a)(x+a)
        texteCorr = `$${lettreDepuisChiffre(i + 1)} = (x-${a})(x+${a})=x^2-${a}^2=x^2-${a * a}$`
        reponse = `x^2-${a * a}`
      } else if (this.sup === 2) {
        a = randint(1, 9) // (bx-a)(bx+a) avec a et b entier positifs entre 1 et 9,  b différent de 1
        b = randint(2, 9)
        texte = `$${lettreDepuisChiffre(i + 1)} = (${b}x-${a})(${b}x+${a})$` // b>1
        texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b * b}x^2-${a * a}$`
        reponse = `${b * b}x^2-${a * a}`
      } else { //  (bx-a)(bx+a) avec a entier et b rationnel simple
        a = randint(1, 9)
        fraction = choice(Fractions)
        ns = fraction[0]
        ds = fraction[1]
        texte = `$${lettreDepuisChiffre(i + 1)} = \\left(${texFraction(ns, ds)}x-${a}\\right)\\left(${texFraction(ns, ds)}x+${a}\\right)$` // b>1
        texteCorr = `$${lettreDepuisChiffre(i + 1)} = \\left(${texFraction(ns, ds)}x-${a}\\right)\\left(${texFraction(ns, ds)}x+${a}\\right)=\\left(${texFraction(ns, ds)}x\\right)^2-${a}^2=${texFraction(ns * ns, ds * ds)}x^2-${a * a}$`
        reponse = `${texFraction(ns * ns, ds * ds)}x^2-${a * a}`
      }
      if (this.interactif) {
        texte += `<br>$${lettreDepuisChiffre(i + 1)}=$` + ajouteChampTexteMathLive(this, i, 'inline largeur75')
        texte += '<br>'
      }

      setReponse(this, i, reponse)
      if (this.sup === 1 ? this.questionJamaisPosee(i, a) : this.sup === 2 ? this.questionJamaisPosee(i, a, b) : this.questionJamaisPosee(i, a, ns, ds)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, ' 1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel']
}
