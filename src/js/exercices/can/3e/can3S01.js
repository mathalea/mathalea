import { fraction } from '../../../modules/fractions.js'
import { randint, choice } from '../../../modules/outils'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une probabilité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can3S01
*/
export default function CalculProbaSimple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fractionEgale'
  const parfums = ['au citron', 'à la fraise', 'à la menthe', "à l'orange", 'à la cerise', 'à la framboise', 'au cassis']
  this.nouvelleVersion = function () {
    const a = randint(3, 10)
    const k = choice([1, 3, 4, 9])
    const parfum1 = choice(parfums)
    let parfum2 = choice(parfums)
    while (parfum1 === parfum2) { parfum2 = choice(parfums) }
    this.reponse = fraction(1, k + 1)
    this.question = `Un sachet de bonbons contient ${a} bonbons ${parfum1} et ${k * a} bonbons ${parfum2}.<br>
     On choisit un bonbon au hasard. <br>
    Quelle est la probabilité de choisir un bonbon ${parfum1} ?`
    this.correction = `Il y a en tout : $${a} + ${k * a} = ${a * (k + 1)}$ bonbons.<br>La probabilité de choisir un bonbon ${parfum1} est de $\\dfrac{${a}}{${a + k * a}}=\\dfrac{1}{${k + 1}}$.`
  }
}
