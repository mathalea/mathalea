import { fraction } from '../../../modules/fractions.js'
import { choice, randint, texNombre, arrondi } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Écrire la valeur décimale d\'une fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '30/03/2023'
/*!
 * @author Gilles Mora
 */
export const uuid = '4d164'
export const ref = 'can5C24'
export default function FractionVersDecimal () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, b, c, maFraction
    let resultat
    this.formatChampTexte = 'largeur15 inline'
    this.formatInteractif = 'calcul'
    switch (choice([1, 2, 3])) {
      case 1:// conversion fraction <->décimale cinquième
        a = randint(1, 12, [5, 10])

        maFraction = fraction(a, 5)
        resultat = arrondi(a / 5, 1)
        this.question = `Quelle est la valeur décimale de  $${maFraction.texFraction}$ ?`
        this.correction = `$${maFraction.texFraction}=${texNombre(resultat)}$`
        this.reponse = resultat
        break

      case 2:// conversion fraction <->décimale  quart
        b = choice([1, 3, 5, 7, 9, 11])
        maFraction = fraction(b, 4)
        resultat = arrondi(b / 4, 2)
        this.question = `Quelle est la valeur décimale de  $${maFraction.texFraction}$ ?`
        this.correction = `$${maFraction.texFraction}=${texNombre(resultat)}$`
        this.reponse = resultat

        break

      case 3:// conversion fraction <->décimale  demi
        c = choice([3, 5, 7, 9, 11, 13, 15])
        maFraction = fraction(c, 2)
        resultat = arrondi(c / 2, 1)
        this.question = `Quelle est la valeur décimale de  $${maFraction.texFraction}$ ?`
        this.correction = `$${maFraction.texFraction}=${texNombre(resultat)}$`
        this.reponse = resultat

        break
    }
  }
  this.canEnonce = this.question// 'Compléter'
  this.canReponseACompleter = ''
}
