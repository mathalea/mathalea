import { calcul, choice, randint, texNombrec } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une somme (partie entière/décimale)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '16/11/2021'

/*!
 * @author Jean-Claude Lhote
 * Date de publication septembre 2021
 * Référence canc3C02
 */
export const uuid = '42453'
export const ref = 'canc3N05'
export default function CompositionDeNombreDecimalC3 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    switch (choice([1, 2, 3])) {
      case 1:
        this.reponse = calcul(a + b / 10 + c / 100)
        this.question = `Calculer $${a} + ${texNombrec(b / 10 + c / 100)}$.`
        this.correction = `$${a} + ${texNombrec(b / 10 + c / 100)}=${texNombrec(this.reponse)}$`
        break
      case 2:
        this.reponse = calcul(a + b / 100 + c / 1000)
        this.question = `Calculer $${a} + ${texNombrec(b / 100 + c / 1000)}$.`
        this.correction = `$${a}+ ${texNombrec(b / 100 + c / 1000)}=${texNombrec(this.reponse)}$`
        break
      case 3:
        this.reponse = calcul(a + b / 10 + c / 1000)
        this.question = `Calculer $${a} + ${texNombrec(b / 10 + c / 1000)}$.`
        this.correction = `$${a} + ${texNombrec(b / 10 + c / 1000)}=${texNombrec(this.reponse)}$`
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
