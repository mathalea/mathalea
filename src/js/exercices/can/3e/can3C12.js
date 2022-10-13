import { choice } from '../../../modules/outils/arrays.js'
import { randint } from '../../../modules/outils/entiers.js'
import Exercice from '../../Exercice.js'
export const titre = 'Encadrer une racine carrée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora
 */
export const uuid = '0ad86'
export const ref = 'can3C12'
export default function EncadrementRacineCarree () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const a = randint(3, 99, [4, 9, 16, 25, 36, 49, 64, 81]) // numérateur
    if (choice([true, false])) {
      this.reponse = Math.floor(Math.sqrt(a))
      this.question = `$a\\leqslant \\sqrt{${a}}\\leqslant b$ est un encadrement de $\\sqrt{${a}}$ par deux entiers consécutifs. <br> 
      
      Quelle est la valeur de $a$ ? `
      this.correction = ` On cherche le carré parfait le plus proche de $${a}$ inférieur à $${a}$ : $${Math.floor(Math.sqrt(a)) ** 2}=${Math.floor(Math.sqrt(a))}^2$. Ainsi : $a=${Math.floor(Math.sqrt(a))}$`
    } else {
      this.reponse = Math.ceil(Math.sqrt(a))
      this.question = `$a\\leqslant \\sqrt{${a}}\\leqslant b$ est un encadrement de $\\sqrt{${a}}$ par deux entiers consécutifs. <br> 
      
      Quelle est la valeur de $b$ ? `
      this.correction = ` On cherche le carré parfait le plus proche de $${a}$ supérieur à $${a}$ : $${Math.ceil(Math.sqrt(a)) ** 2}=${Math.ceil(Math.sqrt(a))}^2$. Ainsi : $b=${Math.ceil(Math.sqrt(a))}$`
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
