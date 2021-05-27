import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, texFraction } from '../../modules/outils.js'
import { ajouteChampTexteLiveMath, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Factoriser a²-b²'
export const interactifReady = true
export const interactifType = 'mathLive'

// FIX ME
// On a saisi les produits dans les 2 ordres en attendant d'avoir un outil de calcul formel

/**
 * Factoriser a²-b²
* @author Jean-Claude Lhote
* 3L12
*/
export default function FactoriserIdentitesRemarquables3 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Factoriser les expressions suivantes.'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 5
  this.sup = 2

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const Fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
      [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
      [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
    for (let i = 0, texte, texteCorr, reponse, cpt = 0, a, b, ns, ds, fraction = []; i < this.nbQuestions && cpt < 50;) {
      if (this.sup === 1) {
        a = randint(1, 9) // coef de x est égal à 1
        texte = `$x^2-${a * a}$` // (x-a)(x+a)
        texteCorr = `$x^2-${a * a}=x^2-${a}^2=(x-${a})(x+${a})$`
        reponse = [`(x-${a})(x+${a})`, `(x+${a})(x-${a})`]
      } else if (this.sup === 2) {
        a = randint(1, 9) // (bx-a)(bx+a) avec a et b entier positifs entre 1 et 9,  b différent de 1
        b = randint(2, 9)
        texte = `$${b * b}x^2-${a * a}$` // b>1
        texteCorr = `$${b * b}x^2-${a * a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`
        reponse = [`(${b}x-${a})(${b}x+${a})`, `(${b}x+${a})(${b}x-${a})`]
      } else { //  (bx-a)(bx+a) avec a entier et b rationnel simple
        a = randint(1, 9)
        fraction = choice(Fractions)
        ns = fraction[0]
        ds = fraction[1]
        texte = `$${texFraction(ns * ns, ds * ds)}x^2-${a * a}$` // b>1
        texteCorr = `$${texFraction(ns * ns, ds * ds)}x^2-${a * a}=\\left(${texFraction(ns, ds)}x\\right)^2-${a}^2=\\left(${texFraction(ns, ds)}x-${a}\\right)\\left(${texFraction(ns, ds)}x+${a}\\right)$`
        reponse = [`\\left(${texFraction(ns, ds)}x-${a}\\right)\\left(${texFraction(ns, ds)}x+${a}\\right)`, `\\left(${texFraction(ns, ds)}x+${a}\\right)\\left(${texFraction(ns, ds)}x-${a}\\right)`]
      }
      texte += ajouteChampTexteLiveMath(this, i)
      setReponse(this, i, reponse)

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel']
}
