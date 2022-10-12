import Exercice from '../../Exercice.js'
import { randint, choice, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
export const titre = 'Calculer des puissances de +/-2, 3, 4 ou 5'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Calcul de puissances
 * @author Gilles Mora
 * Publié le 22/10/2021
 * Référence can4C09
*/
export const uuid = '92186'
export const ref = 'can4C09'
export default function PuissancesDe2345 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let b, a
    switch (choice([2, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10])) {
      case 2:
        a = choice([-2, 2])
        b = randint(0, 6)
        break
      case 3:
        a = choice([-3, 3])
        b = randint(0, 4)
        break
      case 4:
        a = choice([-4, 4])
        b = randint(2, 3)
        break
      case 5:
        a = choice([-5, 5])
        b = 2
        break
      case 6:
        a = choice([-6, 6])
        b = randint(0, 2)
        break
      case 7:
        a = choice([-7, 7])
        b = 2
        break
      case 8:
        a = choice([-8, 8])
        b = randint(0, 2)
        break
      case 9:
        a = choice([-9, 9])
        b = randint(1, 2)
        break
      case 10:
        a = choice([-10, 10])
        b = randint(2, 4)
        break
    }
    this.question = `Calculer $${ecritureParentheseSiNegatif(a)}^${b}$.`
    this.correction = `$${ecritureParentheseSiNegatif(a)}^${b}=`

    if (b > 1) {
      this.correction += `${ecritureParentheseSiNegatif(a)}`
      for (let i = 1; i < b; i++) {
        this.correction += `\\times${ecritureParentheseSiNegatif(a)}`
      }
      this.correction += `=${a ** b}$`
    } else {
      if (b === 1 || b === 0) {
        this.correction += ` ${a ** b}$`
      }
    }
    this.reponse = a ** b
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
