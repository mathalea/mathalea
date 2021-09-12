import { calcul, choice, randint, tableauColonneLigne } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Quatrième proportionnelle'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4P03
 */
export default function QuatriemeProportionnelle () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.nouvelleVersion = function () {
    let a = randint(1, 8)
    const b = randint(2, 9, a) * 4
    a = a * 4
    const c = choice([1.5, 2.5, 1.25, 1.75, 2.25])
    this.reponse = calcul(b * c)
    switch (randint(0, 3)) {
      case 0:
        this.question = 'Complète le tableau de proportionnalité ci-dessous :<br>'
        this.question += tableauColonneLigne([b, a], [' '], [calcul(a * c)])
        this.correction = `On calcule : $\\dfrac{${calcul(a * c)}\\times ${b}}{${a}}=\\dfrac{${a * b * c}}{${a}}=${calcul(b * c)}$`
        break
      case 1:
        this.question = 'Complète le tableau de proportionnalité ci-dessous :<br>'
        this.question += tableauColonneLigne([a, calcul(a * c)], [b], [' '])
        this.correction = `On calcule : $\\dfrac{${calcul(a * c)}\\times ${b}}{${a}}=\\dfrac{${a * b * c}}{${a}}=${calcul(b * c)}$`

        break
      case 2:
        this.question = 'Complète le tableau de proportionnalité ci-dessous :<br>'
        this.question += tableauColonneLigne([' ', calcul(a * c)], [b], [a])
        this.correction = `On calcule : $\\dfrac{${calcul(a * c)}\\times ${b}}{${a}}=\\dfrac{${a * b * c}}{${a}}=${calcul(b * c)}$`

        break
      case 3:
        this.question = 'Complète le tableau de proportionnalité ci-dessous :<br>'
        this.question += tableauColonneLigne([b, ' '], [a], [calcul(a * c)])
        this.correction = `On calcule : $\\dfrac{${calcul(a * c)}\\times ${b}}{${a}}=\\dfrac{${a * b * c}}{${a}}=${calcul(b * c)}$`

        break
    }
  }
}
