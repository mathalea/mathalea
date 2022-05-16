import { choice, randint, texNombre, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
import Decimal from 'decimal.js'
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
        a = new Decimal(randint(2, 9)).div(10)
        b = randint(2, 9)
        this.question = `$${texNombre(a, 1)}\\times ${b}=$`
        this.correction = `$${texNombre(a, 1)}\\times ${b}=${texNombre(a * b, 1)}$`
        this.reponse = a.mul(b)
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombre(a, 1)}=${texNombre(10 * a, 0)}\\times 0,1$, alors $${texNombre(a, 1)}\\times ${b}=${10 * a}\\times ${b}\\times 0,1 =${texNombre(10 * a * b, 0)}\\times 0,1=${texNombre(a * b, 1)}$ `)
        break
      case 2:// un entier par un décimal avec deux chiffres après la virgule
        a = new Decimal(randint(2, 9)).div(100)
        b = randint(2, 9)
        this.question = `$${texNombre(a, 2)}\\times ${b}=$`
        this.correction = `$${texNombre(a, 2)}\\times ${b}=${texNombre(a * b, 2)}$`
        this.reponse = a.mul(b)

        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombre(a, 2)}=${texNombre(100 * a, 0)}\\times 0,01$, alors $${texNombre(a, 2)}\\times ${b}=${texNombre(100 * a, 0)}\\times ${b}\\times 0,01 =${texNombre(100 * a * b, 0)}\\times 0,01=${texNombre(a * b, 2)}$ `)
        break

      case 3:// Deux décimaux avec un chiffre après la virgule
        a = new Decimal(randint(2, 9)).div(10)
        b = new Decimal(randint(2, 9)).div(10)
        this.question = `$${texNombre(a, 1)}\\times ${texNombre(b, 1)}=$`
        this.correction = `$${texNombre(a, 1)}\\times ${texNombre(b, 1)}=${texNombre(a * b, 2)}$`
        this.reponse = a.mul(b)

        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombre(a, 1)}=${texNombre(10 * a, 0)}\\times 0,1$ et $${texNombre(b, 1)}=${texNombre(10 * b, 0)}\\times 0,1$,
    alors $${texNombre(a, 1)}\\times ${texNombre(b, 1)}=${texNombre(10 * a, 0)}\\times ${texNombre(10 * b, 0)}\\times 0,1 \\times 0,1=${texNombre(100 * a * b, 0)}\\times 0,01=${texNombre(a * b, 2)}$ `)
        break

      case 4:// Deux décimaux avec un chiffre et deux chiffres après la virgule
        a = new Decimal(randint(2, 9)).div(10)
        b = new Decimal(randint(2, 9)).div(100)
        this.question = `$${texNombre(a, 1)}\\times ${texNombre(b, 2)}=$`
        this.correction = `$${texNombre(a, 1)}\\times ${texNombre(b, 2)}=${texNombre(a * b, 3)}$`
        this.reponse = a.mul(b)
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombre(a, 1)}=${texNombre(10 * a, 0)}\\times 0,1$ et $${texNombre(b, 2)}=${texNombre(100 * b, 0)}\\times 0,01$,
    alors $${texNombre(a, 1)}\\times ${texNombre(b, 2)}=${texNombre(10 * a, 0)}\\times ${texNombre(100 * b, 0)}\\times 0,01 \\times 0,1=${texNombre(1000 * a * b, 0)}\\times 0,001=${texNombre(a * b, 3)}$ `)
        break
    }
  }
}
