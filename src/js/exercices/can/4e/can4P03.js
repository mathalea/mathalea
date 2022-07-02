import { calcul, choice, randint, tableauColonneLigne, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une quatrième proportionnelle'
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
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = randint(1, 6)
    const b = randint(4, 8, a) * 2
    const c = choice([2, 3, 4, 5])
    this.reponse = calcul(b * c)
    switch (randint(0, 3)) {
      case 0:
        this.question = 'Complète le tableau de proportionnalité ci-dessous :<br>'
        this.question += tableauColonneLigne([b, a], [' '], [calcul(a * c)])
        this.correction = `La quatrième proportionnelle est donnée par  : $\\dfrac{${calcul(a * c)}\\times ${b}}{${a}}=\\dfrac{${a * b * c}}{${a}}=${calcul(b * c)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Pour passer de la première ligne du tableau à la deuxième, on multiplie par
     $${c}$ car $${a}\\times ${c}=${a * c}$.<br>
     Ainsi, le nombre manquant est donné par : $${b}\\times ${c}=${b * c}$.`)
        break
      case 1:
        this.question = 'Complète le tableau de proportionnalité ci-dessous :<br>'
        this.question += tableauColonneLigne([a, calcul(a * c)], [b], [' '])
        this.correction = `La quatrième proportionnelle est donnée par : $\\dfrac{${calcul(a * c)}\\times ${b}}{${a}}=\\dfrac{${a * b * c}}{${a}}=${calcul(b * c)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Pour passer de la première colonne du tableau à la deuxième, on multiplie par
         $${c}$ car $${a}\\times ${c}=${a * c}$.<br>
         Ainsi, le nombre manquant est donné par : $${b}\\times ${c}=${b * c}$.`)
        break
      case 2:
        this.question = 'Complète le tableau de proportionnalité ci-dessous :<br>'
        this.question += tableauColonneLigne([' ', calcul(a * c)], [b], [a])
        this.correction = `La quatrième proportionnelle est donnée par : $\\dfrac{${calcul(a * c)}\\times ${b}}{${a}}=\\dfrac{${a * b * c}}{${a}}=${calcul(b * c)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Pour passer de la deuxième ligne du tableau à la première, on multiplie par
         $${c}$ car $${a}\\times ${c}=${a * c}$.<br>
         Ainsi, le nombre manquant est donné par : $${b}\\times ${c}=${b * c}$.`)
        break
      case 3:
        this.question = 'Complète le tableau de proportionnalité ci-dessous :<br>'
        this.question += tableauColonneLigne([b, ' '], [a], [calcul(a * c)])
        this.correction = `La quatrième proportionnelle est donnée par : $\\dfrac{${calcul(a * c)}\\times ${b}}{${a}}=\\dfrac{${a * b * c}}{${a}}=${calcul(b * c)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Pour passer de la première colonne du tableau à la deuxième, on multiplie par
         $${c}$ car $${a}\\times ${c}=${a * c}$.<br>
         Ainsi, le nombre manquant est donné par : $${b}\\times ${c}=${b * c}$.`)
        break
    }
  }
}
