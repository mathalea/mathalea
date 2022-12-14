import { calcul, randint, texNombrec, choice, texNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Passer de la fraction décimale à l’écriture décimale*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '15/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/*!
 * @author Gilles Mora
 */
export const uuid = 'b850a'
export const ref = 'can5N02'
export default function FractionDecimaleEcritureDecimale2 () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c
    switch (choice(['a', 'b'])) { //,
      case 'a':
        a = randint(1, 19, [10])
        b = randint(11, 59, [20, 30, 40, 50])

        this.reponse = calcul(a * 0.1 + b * 0.01)
        if (choice([true, false])) {
          this.question = `Ecrire sous forme décimale $\\dfrac{${a}}{10}+\\dfrac{${b}}{100}$. `
          this.correction = `$\\dfrac{${a}}{10}+\\dfrac{${b}}{100}=${texNombrec(a / 10)}+${texNombrec(b / 100)}=${texNombrec(a / 10 + b / 100)}$<br>
          <br> Ou encore <br><br>
          $\\dfrac{${a}}{10}+\\dfrac{${b}}{100}= \\dfrac{${a}\\times 10}{10\\times 10}+\\dfrac{${b}}{100}=\\dfrac{${a * 10}}{100}+\\dfrac{${b}}{100}=\\dfrac{${a * 10 + b}}{100}=${texNombrec(a / 10 + b / 100)}$`
        } else {
          this.question = `Ecrire sous forme décimale $\\dfrac{${b}}{100}+\\dfrac{${a}}{10}$. `
          this.correction = `$\\dfrac{${b}}{100}+\\dfrac{${a}}{10}=${texNombrec(b / 100)}+${texNombrec(a / 10)}=${texNombrec(a / 10 + b / 100)}$<br>
          <br> Ou encore <br><br>
          $\\dfrac{${b}}{100}+\\dfrac{${a}}{10}= \\dfrac{${b}}{100}+\\dfrac{${a}\\times 10}{10\\times 10}=\\dfrac{${b}}{100}+\\dfrac{${a * 10}}{100}=\\dfrac{${a * 10 + b}}{100}=${texNombrec(a / 10 + b / 100)}$`
        }
        break
      case 'b':
        b = randint(1, 299, [20, 30, 40, 50, 60, 70, 80, 90, 100, 200])
        c = randint(1, 29, [10, 20])

        this.reponse = calcul(b * 0.01 + c * 0.001)
        if (choice([true, false])) {
          this.question = `Ecrire sous forme décimale $\\dfrac{${c}}{${texNombre(1000)}}+\\dfrac{${b}}{100}$. `
          this.correction = `$\\dfrac{${c}}{${texNombre(1000)}}+\\dfrac{${b}}{100}=${texNombrec(c / 1000)}+${texNombrec(b / 100)}=${texNombrec(c / 1000 + b / 100)}$<br>
          <br> Ou encore <br><br>
              $\\dfrac{${c}}{${texNombre(1000)}}+\\dfrac{${b}}{100}=\\dfrac{${c}}{${texNombre(1000)}}+\\dfrac{${b}\\times 10}{100\\times 10}=\\dfrac{${c}}{${texNombre(1000)}}+\\dfrac{${b * 10}}{${texNombre(1000)}}=\\dfrac{${b * 10 + c}}{1000}=${texNombrec(c / 1000 + b / 100)}$`
        } else {
          this.question = `Ecrire sous forme décimale $\\dfrac{${b}}{100}+\\dfrac{${c}}{${texNombre(1000)}}$. `
          this.correction = `$\\dfrac{${b}}{100}+\\dfrac{${c}}{${texNombre(1000)}}=${texNombrec(b / 100)}+${texNombrec(c / 1000)}=${texNombrec(b / 100 + c / 1000)}$<br>
          <br> Ou encore <br><br>
              $\\dfrac{${b}}{100}+\\dfrac{${c}}{${texNombre(1000)}}=\\dfrac{${b}\\times 10}{100\\times 10}+\\dfrac{${c}}{${texNombre(1000)}}=\\dfrac{${b * 10}}{${texNombre(1000)}}+\\dfrac{${c}}{${texNombre(1000)}}=\\dfrac{${b * 10 + c}}{${texNombre(1000)}}=${texNombrec(c / 1000 + b / 100)}$`
        }
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
