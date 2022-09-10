import { choice, randint, texNombre, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
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
export const uuid = '16ea9'
export const ref = 'can6C30'
export default function MultiplierDeuxDecimaux () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, b, c, d
    switch (choice([1, 2, 3, 4])) {
      case 1:// un entier par un décimal avec une chiffre après la virgule
        a = randint(2, 9)
        b = (new Decimal(a)).div(10)
        c = randint(2, 9)
        this.reponse = b.mul(c)
        this.question = `$${texNombre(b, 1)}\\times ${c}=$`
        this.correction = `$${texNombre(b, 1)}\\times ${c}=${texNombre(this.reponse, 1)}$`

        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombre(b, 1)}=${a}\\times 0,1$, alors $${texNombre(b, 1)}\\times ${c}=${a}\\times 0,1\\times ${c} =
   ${a * c}\\times 0,1=${texNombre(this.reponse, 1)}$ `)
        break
      case 2:// un entier par un décimal avec deux chiffres après la virgule
        a = randint(2, 9)
        b = (new Decimal(a)).div(100)
        c = randint(2, 9)
        this.reponse = b.mul(c)
        this.question = `$${texNombre(b, 2)}\\times ${c}=$`
        this.correction = `$${texNombre(b, 2)}\\times ${c}=${texNombre(this.reponse, 2)}$`

        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombre(b, 2)}=${a}\\times 0,01$, alors $${texNombre(b, 2)}\\times ${c}=${a}\\times 0,01\\times ${c} =
   ${a * c}\\times 0,01=${texNombre(this.reponse, 2)}$ `)
        break

      case 3:// Deux décimaux avec un chiffre après la virgule
        a = randint(2, 9)
        b = (new Decimal(a)).div(10)
        c = randint(2, 9)
        d = (new Decimal(c)).div(10)
        this.reponse = b.mul(d)
        this.question = `$${texNombre(b, 1)}\\times ${texNombre(d, 1)}=$`
        this.correction = `$${texNombre(b, 1)}\\times ${texNombre(d, 1)}=${texNombre(this.reponse, 2)}$`

        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombre(b, 1)}=${a}\\times 0,1$ et $${texNombre(d, 1)}=${c}\\times 0,1$,
    alors $${texNombre(b, 1)}\\times ${texNombre(d, 1)}=${a}\\times ${c}\\times 0,1 \\times 0,1=${a * c}\\times 0,01=${texNombre(this.reponse, 2)}$ `)
        break

      case 4:// Deux décimaux avec un chiffre et deux chiffres après la virgule
        a = randint(2, 9)
        b = (new Decimal(a)).div(10)
        c = randint(2, 9)
        d = (new Decimal(c)).div(100)
        this.reponse = b.mul(d)
        this.question = `$${texNombre(b, 1)}\\times ${texNombre(d, 2)}=$`
        this.correction = `$${texNombre(b, 1)}\\times ${texNombre(d, 2)}=${texNombre(this.reponse, 3)}$`

        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombre(b, 1)}=${a}\\times 0,1$ et $${texNombre(d, 2)}=${c}\\times 0,01$,
    alors $${texNombre(b, 1)}\\times ${texNombre(d, 2)}=${a}\\times ${c}\\times 0,01 \\times 0,1=${a * c}\\times 0,001=${texNombre(this.reponse, 3)}$ `)
        break
    }
  }
}
