import { calcul, randint, texNombrec, choice } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Passer d’un calcul de fractions décimales à une écriture décimale'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '15/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/*!
 * @author Gilles Mora
 */
export const uuid = '93bb5'
export const ref = 'can6N10'
export default function FractionDecimaleEcritureDecimale1 () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, u
    switch (choice(['a', 'b', 'c', 'd', 'e'])) { //,
      case 'a':
        a = randint(1, 9)
        b = randint(1, 9)
        c = randint(1, 9)

        this.reponse = calcul(a * 0.1 + b * 0.01 + c * 0.001)
        if (choice([true, false])) {
          this.question = `Ecrire sous forme décimale $\\dfrac{${b}}{100}+\\dfrac{${a}}{10}+\\dfrac{${c}}{1000}$. `
          this.correction = `$\\dfrac{${b}}{100}+\\dfrac{${a}}{10}+\\dfrac{${c}}{1000}=${texNombrec(b / 100)}+${texNombrec(a / 10)}+${texNombrec(c / 1000)}=${texNombrec(a / 10 + b / 100 + c / 1000)}$`
        } else {
          this.question = `Ecrire sous forme décimale $\\dfrac{${c}}{1000}+\\dfrac{${a}}{10}+\\dfrac{${b}}{100}$. `
          this.correction = `$\\dfrac{${c}}{1000}+\\dfrac{${a}}{10}+\\dfrac{${b}}{100}=${texNombrec(c / 1000)}+${texNombrec(a / 10)}+${texNombrec(b / 100)}=${texNombrec(a / 10 + b / 100 + c / 1000)}$`
        }
        break
      case 'b':
        u = randint(1, 99)
        a = randint(1, 9, [20, 30, 40, 50])
        c = randint(1, 9)
        this.reponse = calcul(u + a * 0.1 + c * 0.001)
        if (choice([true, false])) {
          this.question = `Ecrire sous forme décimale $${u}+\\dfrac{${a}}{10}+\\dfrac{${c}}{1000}$. `
          this.correction = `$${u}+\\dfrac{${a}}{10}+\\dfrac{${c}}{1000}=${u}+${texNombrec(a / 10)}+${texNombrec(c / 1000)}=${texNombrec(u + a / 10 + c / 1000)}$`
        } else {
          this.question = `Ecrire sous forme décimale $${u}+\\dfrac{${c}}{1000}+\\dfrac{${a}}{10}$. `
          this.correction = `$${u}+\\dfrac{${c}}{1000}+\\dfrac{${a}}{10}=${u}+${texNombrec(c / 1000)}+${texNombrec(a / 10)}=${texNombrec(u + a / 10 + c / 1000)}$
         `
        }
        break
      case 'c':
        u = randint(1, 99)
        b = randint(1, 9)
        c = randint(1, 9)
        this.reponse = calcul(u + b * 0.01 + c * 0.001)
        if (choice([true, false])) {
          this.question = `Ecrire sous forme décimale $${u}+\\dfrac{${b}}{100}+\\dfrac{${c}}{1000}$. `
          this.correction = `$${u}+\\dfrac{${b}}{100}+\\dfrac{${c}}{1000}=${u}+${texNombrec(b / 100)}+${texNombrec(c / 1000)}=${texNombrec(u + b / 100 + c / 1000)}$`
        } else {
          this.question = `Ecrire sous forme décimale : $${u}+\\dfrac{${c}}{1000}+\\dfrac{${b}}{100}$. `
          this.correction = `$${u}+\\dfrac{${c}}{1000}+\\dfrac{${b}}{100}=${u}+${texNombrec(c / 1000)}+${texNombrec(b / 100)}=${texNombrec(u + b / 100 + c / 1000)}$`
        }
        break
      case 'd':
        a = randint(1, 9)
        c = randint(1, 9)
        this.reponse = calcul(a * 0.1 + c * 0.001)
        if (choice([true, false])) {
          this.question = `Ecrire sous forme décimale $\\dfrac{${a}}{10}+\\dfrac{${c}}{1000}$. `
          this.correction = `$\\dfrac{${a}}{10}+\\dfrac{${c}}{1000}=${texNombrec(a / 10)}+${texNombrec(c / 1000)}=${texNombrec(a / 10 + c / 1000)}$`
        } else {
          this.question = `Ecrire sous forme décimale : $\\dfrac{${c}}{1000}+\\dfrac{${a}}{10}$. `
          this.correction = `$\\dfrac{${c}}{1000}+\\dfrac{${a}}{10}=${texNombrec(c / 1000)}+${texNombrec(a / 10)}=${texNombrec(a / 10 + c / 1000)}$`
        }
        break
      case 'e':
        u = randint(1, 99)
        b = randint(11, 99)
        c = randint(1, 9)
        this.reponse = calcul(u + b * 0.01 + c * 0.001)
        if (choice([true, false])) {
          this.question = `Ecrire sous forme décimale $${u}+\\dfrac{${b}}{100}+\\dfrac{${c}}{1000}$. `
          this.correction = `$${u}+\\dfrac{${b}}{100}+\\dfrac{${c}}{1000}=${u}+${texNombrec(b / 100)}+${texNombrec(c / 1000)}=${texNombrec(u + b / 100 + c / 1000)}$`
        } else {
          this.question = `Ecrire sous forme décimale $${u}+\\dfrac{${c}}{1000}+\\dfrac{${b}}{100}$. `
          this.correction = `$${u}+\\dfrac{${c}}{1000}+\\dfrac{${b}}{100}=${u}+${texNombrec(c / 1000)}+${texNombrec(b / 100)}=${texNombrec(u + b / 100 + c / 1000)}$`
        }
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
