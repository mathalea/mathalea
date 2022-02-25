import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texFractionReduite, texFraction } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Développer avec les identités remarquables'

/**
 * Développer avec les 3 identités remarquables
* @author Jean-Claude Lhote
* 2N41-6, ex 2L10
*/
export default function DevelopperIdentitesRemarquables2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Développer et réduire les expressions suivantes.'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 5
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const listeFractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
      [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
      [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1, 2, 3] // coef de x = 1
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = [4, 5, 6] // coef de x > 1
    } else { typesDeQuestionsDisponibles = [7, 8, 9] } // coef de x relatif

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, a, b, typesDeQuestions, fraction = [], ds, ns; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      a = randint(1, 9)
      b = randint(2, 9)
      fraction = choice(listeFractions)
      ns = fraction[0]
      ds = fraction[1]
      switch (typesDeQuestions) {
        case 1:
          texte = `$(x+${a})^2$` // (x+a)²
          texteCorr = `$(x+${a})^2=x^2+2 \\times ${a} \\times x+${a}^2=x^2+${2 * a}x+${a * a}$`
          break
        case 2:
          texte = `$(x-${a})^2$` // (x-a)²
          texteCorr = `$(x-${a})^2=x^2-2 \\times ${a} \\times x+${a}^2=x^2-${2 * a}x+${a * a}$`
          break
        case 3:
          texte = `$(x-${a})(x+${a})$` // (x-a)(x+a)
          texteCorr = `$(x-${a})(x+${a})=x^2-${a}^2=x^2-${a * a}$`
          break
        case 4:
          texte = `$(${b}x+${a})^2$` // (bx+a)²  b>1
          texteCorr = `$(${b}x+${a})^2=(${b}x)^2+2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2+${2 * b * a}x+${a * a}$`
          break
        case 5:
          texte = `$(${b}x-${a})^2$` // (bx-a)² b>1
          texteCorr = `$(${b}x-${a})^2=(${b}x)^2-2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2-${2 * b * a}x+${a * a}$`
          break
        case 6:
          texte = `$(${b}x-${a})(${b}x+${a})$` // (bx-a)(bx+a) b>1
          texteCorr = `$(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b * b}x^2-${a * a}$`
          break
        case 7:
          texte = `$\\left(${texFraction(ns, ds)}x+${a}\\right)^2$` // (kx+a)² k rationnel
          texteCorr = `$\\left(${texFraction(ns, ds)}x+${a}\\right)^2=\\left(${texFraction(ns, ds)}x\\right)^2+2 \\times ${texFraction(ns, ds)}x \\times ${a} + ${a}^2=\\left(${texFraction(ns, ds)}x+${a}\\right)^2=${texFraction(ns * ns, ds * ds)}x^2+${texFractionReduite(ns * 2 * a, ds)}x+${a * a}$`
          break
        case 8:
          texte = `$\\left(${texFraction(ns, ds)}x-${a}\\right)^2$` // (kx-a)² k rationnel
          texteCorr = `$\\left(${texFraction(ns, ds)}x-${a}\\right)^2=\\left(${texFraction(ns, ds)}x\\right)^2-2 \\times ${texFraction(ns, ds)}x \\times ${a} + ${a}^2=${texFraction(ns * ns, ds * ds)}x^2-${texFractionReduite(ns * 2 * a, ds)}x+${a * a}$`
          break
        case 9:
          //  (bx-a)(bx+a) avec a entier et b rationnel simple
          texte = `$\\left(${texFraction(ns, ds)}x-${a}\\right)\\left(${texFraction(ns, ds)}x+${a}\\right)$` // b>1
          texteCorr = `$\\left(${texFraction(ns, ds)}x-${a}\\right)\\left(${texFraction(ns, ds)}x+${a}\\right)=\\left(${texFraction(ns, ds)}x\\right)^2-${a}^2=${texFraction(ns * ns, ds * ds)}x^2-${a * a}$`
          break
      }
      if (this.interactif) {
        texte += '$ = $' + ajouteChampTexteMathLive(this, i, 'largeur75 inline')
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        const reponse = texteCorr.match(/=([^=$]+)\$$/)[1]
        setReponse(this, i, reponse)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel']
}
