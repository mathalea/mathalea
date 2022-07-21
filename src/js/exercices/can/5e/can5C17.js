import { fraction } from '../../../modules/fractions.js'
import { calcul, choice, randint, texNombre, texNombrec } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Convertir une fraction ou une somme vers un décimal'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora
 */
export default function EntierPlusFractionVersDecimal () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, b, c, maFraction, maFraction2
    let resultat
    this.formatChampTexte = 'largeur15 inline'
    this.formatInteractif = 'calcul'
    switch (choice([1, 2, 3, 4, 5])) {
      case 1:// conversion fraction <->décimale cinquième et quart
        a = randint(1, 9, 5)
        b = choice([1, 3, 5, 9, 11])
        if (choice([true, false])) {
          maFraction = fraction(a, 5)
          resultat = calcul(a / 5)
          this.question = `La valeur décimale de  $${maFraction.texFraction}$ est :`
          this.correction = `$${maFraction.texFraction}=${texNombre(resultat)}$`
          this.reponse = resultat
        } else {
          maFraction = fraction(b, 4)
          resultat = calcul(b / 4)
          this.question = `La valeur décimale de  $${maFraction.texFraction}$ est :`
          this.correction = `$${maFraction.texFraction}=${texNombre(resultat)}$`
          this.reponse = resultat
        }
        break
      case 2:// fraction addition avec un entier
        c = choice([2, 4, 5])
        b = randint(1, c - 1)
        maFraction = fraction(b, c)
        a = randint(1, 4)
        resultat = calcul(a + b / c)
        this.question = ` $${a}+${maFraction.texFraction}=$<br>
        (résultat sous forme décimale)`
        this.correction = `$${a}+${maFraction.texFraction} = ${a} + ${texNombre(maFraction.valeurDecimale)}= ${texNombre(resultat)}$`
        this.reponse = resultat
        break

      case 3:// addition entier et fraction avec den =100 ou 1000
        b = choice([100, 1000])
        a = randint(1, 15)
        c = randint(11, 19)
        maFraction = fraction(c, b)
        resultat = calcul(a + c / b)

        this.question = ` $${a}+${maFraction.texFraction}=$<br>
        (résultat sous forme décimale)`
        this.correction = `$${a}+${maFraction.texFraction} = ${texNombre(resultat)}$`
        this.reponse = resultat
        break
      case 4:// addition entier et fraction avec den =100 et 1000
        a = randint(1, 15)
        b = randint(11, 19)
        c = randint(1, 9)
        maFraction = fraction(b, 100)
        maFraction2 = fraction(c, 1000)
        resultat = calcul(a + b / 100 + c / 1000)
        this.question = `$${a}+${maFraction.texFraction}+${maFraction2.texFraction}=$<br>
        (résultat sous forme décimale)`
        this.correction = `$${a}+${maFraction.texFraction}+${maFraction2.texFraction}=${a}+${texNombrec(b / 100)}+${texNombrec(c / 1000)}=${texNombrec(resultat)}$.`
        this.reponse = resultat
        break
      case 5:// addition entier et fraction avec den =1000 et 100
        a = randint(1, 15)
        b = randint(1, 9)
        c = randint(1, 9)
        maFraction = fraction(b, 1000)
        maFraction2 = fraction(c, 100)
        resultat = calcul(a + b / 1000 + c / 100)
        this.question = ` $${a}+${maFraction.texFraction}+${maFraction2.texFraction}=$<br>
        (résultat sous forme décimale)`
        this.correction = `$${a}+${maFraction.texFraction}+${maFraction2.texFraction}=${a}+${texNombrec(b / 1000)}+${texNombrec(c / 100)}=${texNombre(resultat)}$.`
        this.reponse = resultat
        break
    }
  }
}
