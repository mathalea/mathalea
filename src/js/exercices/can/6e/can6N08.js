import { calcul, choice, randint, texNombrec } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Déterminer le nombre de centaines, dizaines'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '02/12/2021'
/*!
 * Gilles Mora
 * Publié le 02 / 12 / 2021
 * Référence can6N06
 */
export const uuid = '73d76'
export const ref = 'can6N08'
export default function NombreDeDizaines () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.consigne = ''

  this.nouvelleVersion = function () {
    const a = randint(0, 4)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const d = randint(1, 9, [a, b, c])
    const m = choice(['centaines', 'dizaines'])
    const n = calcul(a * 1000 + b * 100 + c * 10 + d)
    this.question = `Quel est le nombre entier de ${m} dans $${texNombrec(n)}$ ? `
    if (a !== 0) {
      if (m === 'centaines') {
        this.correction = `Comme $${a * 1000 + b * 100 + c * 10 + d}=${a * 10 + b}\\times 100+${c * 10 + d}$, il y a $${a * 10 + b}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
        this.reponse = a * 10 + b
      } if (m === 'dizaines') {
        this.correction = `Comme $${a * 1000 + b * 100 + c * 10 + d}=${a * 100 + b * 10 + c}\\times 10+${d}$, il y a $${a * 100 + b * 10 + c}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
        this.reponse = a * 100 + b * 10 + c
      }
    } else {
      if (m === 'centaines') {
        this.correction = `Comme  $${b * 100 + c * 10 + d}=${b}\\times 100+${c * 10 + d}$, il y a $${b}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
        this.reponse = b
      } if (m === 'dizaines') {
        this.correction = `Comme $${b * 100 + c * 10 + d}=${b * 10 + c}\\times 10+${d}$, il y a $${b * 10 + c}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
        this.reponse = b * 10 + c
      }
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
