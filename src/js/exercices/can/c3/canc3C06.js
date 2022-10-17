import { calcul, choice, randint, texNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver le nombre manquant dans une somme'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '20/11/2021'

/*!
 * @author Jean-Claude Lhote
 * Référence canc3C06
 */
export const uuid = '3ca23'
export const ref = 'canc3C06'
export default function ComplementAuDixiemeOuALaDizaine () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b
    if (choice([true, false])) { // décimal ou entier ?
      a = calcul((randint(1, 5) * 10 + randint(1, 9) / 10))
      b = Math.ceil(a)
      this.reponse = calcul(b - a)
      this.question = `Compléter : $${texNombre(a)}+\\dots=${b}$`
      this.correction = `On doit compléter les dixièmes du nombre $${texNombre(a)}$ pour obtenir une unité de plus.<br>Il faut donc ajouter $${texNombre(this.reponse)}$`
      this.canEnonce = 'Compléter.'
      this.canReponseACompleter = `$${texNombre(a)}+\\dots=${b}$`
    } else {
      a = calcul((randint(2, 5) * 100 + randint(1, 9) * 10 + randint(1, 9)))
      b = Math.ceil(a / 10) * 10
      this.reponse = b - a
      this.question = `Compléter : $${a}+\\dots=${b}$`
      this.correction = `On doit compléter les unités du nombre $${a}$ pour obtenir une dizaine de plus.<br>Il faut donc ajouter $${this.reponse}$`
      this.canEnonce = 'Compléter.'
      this.canReponseACompleter = `$${a}+\\dots=${b}$`
    }
  }
}
