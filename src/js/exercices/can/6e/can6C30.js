import { calcul, choice, randint, texNombrec, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Multiplier deux décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '04/03/2022'
/*!
 * @author  Gilles Mora
 *
 *
 */
export default function MultiplierDeuxDecimaux () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, b
    switch (choice([1, 2, 3, 4])) {
      case 1:// un entier par un décimal avec une chiffre après la virgule
        a = calcul(randint(2, 9) / 10)
        b = randint(2, 9)
        this.question = `$${texNombrec(a)}\\times ${b}=$`
        this.correction = `$${texNombrec(a)}\\times ${b}=${texNombrec(a * b)}$`
        this.reponse = a * b
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombrec(a)}=${texNombrec(10 * a)}\\times 0,1$, alors $${texNombrec(a)}\\times ${b}=${10 * a}\\times ${b}\\times 0,1 =${texNombrec(10 * a * b)}\\times 0,1=${texNombrec(a * b)}$ `)
        break
      case 2:// un entier par un décimal avec deux chiffres après la virgule
        a = calcul(randint(2, 9) / 100)
        b = randint(2, 9)
        this.question = `$${texNombrec(a)}\\times ${b}=$`
        this.correction = `$${texNombrec(a)}\\times ${b}=${texNombrec(a * b)}$`
        this.reponse = a * b
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombrec(a)}=${texNombrec(100 * a)}\\times 0,01$, alors $${texNombrec(a)}\\times ${b}=${texNombrec(100 * a)}\\times ${b}\\times 0,01 =${texNombrec(100 * a * b)}\\times 0,01=${texNombrec(a * b)}$ `)
        break

      case 3:// Deux décimaux avec un chiffre après la virgule
        a = calcul(randint(2, 9) / 10)
        b = calcul(randint(2, 9) / 10)
        this.question = `$${texNombrec(a)}\\times ${texNombrec(b)}=$`
        this.correction = `$${texNombrec(a)}\\times ${texNombrec(b)}=${texNombrec(a * b)}$`
        this.reponse = a * b
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombrec(a)}=${texNombrec(10 * a)}\\times 0,1$ et $${texNombrec(b)}=${texNombrec(10 * b)}\\times 0,1$,
    alors $${texNombrec(a)}\\times ${texNombrec(b)}=${texNombrec(10 * a)}\\times ${texNombrec(10 * b)}\\times 0,1 \\times 0,1=${texNombrec(100 * a * b)}\\times 0,01=${texNombrec(a * b)}$ `)
        break

      case 4:// Deux décimaux avec un chiffre et deux chiffres après la virgule
        a = calcul(randint(2, 9) / 10)
        b = calcul(randint(2, 9) / 100)
        this.question = `$${texNombrec(a)}\\times ${texNombrec(b)}=$`
        this.correction = `$${texNombrec(a)}\\times ${texNombrec(b)}=${texNombrec(a * b)}$`
        this.reponse = a * b
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombrec(a)}=${texNombrec(10 * a)}\\times 0,1$ et $${texNombrec(b)}=${texNombrec(100 * b)}\\times 0,01$,
    alors $${texNombrec(a)}\\times ${texNombrec(b)}=${texNombrec(10 * a)}\\times ${texNombrec(100 * b)}\\times 0,01 \\times 0,1=${texNombrec(1000 * a * b)}\\times 0,001=${texNombrec(a * b)}$ `)
        break
    }
  }
}
