import { fraction } from '../../../modules/fractions.js'
import { calcul, choice, randint, texNombre, texNombrec } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Écrire la valeur décimale d\'une somme de fractions'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '31/03/2023'
/*!
 * @author Gilles Mora
 */
export const uuid = 'b1881'
export const ref = 'can5C17'
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
    switch (choice([1, 2, 3, 4])) {
      case 1:// fraction addition avec un entier
        c = choice([2, 4, 5])
        b = randint(1, c - 1)
        maFraction = fraction(b, c)
        a = randint(1, 4)
        resultat = calcul(a + b / c)
        this.question = `Quelle est la valeur décimale de  $${a}+${maFraction.texFraction}$ ?`
        this.correction = `$${a}+${maFraction.texFraction} = ${a} + ${texNombre(maFraction.valeurDecimale)}= ${texNombre(resultat)}$`
        this.reponse = resultat
        break

      case 2:// addition entier et fraction avec den =100 ou 1000
        b = choice([100, 1000])
        a = randint(1, 15)
        c = randint(11, 19)
        maFraction = fraction(c, b)
        resultat = calcul(a + c / b)

        this.question = `Quelle est la valeur décimale de $${a}+${maFraction.texFraction}$ ?
        `
        this.correction = `$${a}+${maFraction.texFraction} = ${texNombre(resultat)}$`
        this.reponse = resultat
        break
      case 3:// addition entier et fraction avec den =100 et 1000
        a = randint(1, 15)
        b = randint(11, 19)
        c = randint(1, 9)
        maFraction = fraction(b, 100)
        maFraction2 = fraction(c, 1000)
        resultat = calcul(a + b / 100 + c / 1000)
        this.question = `Quelle est la valeur décimale de $${a}+${maFraction.texFraction}+${maFraction2.texFraction}$ ?
       `
        this.correction = `$${a}+${maFraction.texFraction}+${maFraction2.texFraction}=${a}+${texNombrec(b / 100)}+${texNombrec(c / 1000)}=${texNombrec(resultat)}$.`
        this.reponse = resultat
        break
      case 4:// addition entier et fraction avec den =1000 et 100
        a = randint(1, 15)
        b = randint(1, 9)
        c = randint(1, 9)
        maFraction = fraction(b, 1000)
        maFraction2 = fraction(c, 100)
        resultat = calcul(a + b / 1000 + c / 100)
        this.question = `Quelle est la valeur décimale de $${a}+${maFraction.texFraction}+${maFraction2.texFraction}$ ?
        `
        this.correction = `$${a}+${maFraction.texFraction}+${maFraction2.texFraction}=${a}+${texNombrec(b / 1000)}+${texNombrec(c / 100)}=${texNombre(resultat)}$.`
        this.reponse = resultat
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
