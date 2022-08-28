import Exercice from '../../Exercice.js'
import { randint, choice } from '../../../modules/outils.js'
export const titre = 'Calculer avec une racine carrée'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export const uuid = 'a2d6a'
export const ref = 'can3C09'
export default function CalculAvecRacineCarree1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let d
    const a = randint(2, 10)
    const b = randint(2, 10)
    const c = randint(1, 10)
    d = randint(1, 10)
    while (c === d) { d = randint(1, 10) }
    if (choice([true, false])) {
      this.question = `$${a}\\sqrt{${c ** 2}}+${b}\\sqrt{${d ** 2}}=$`
      this.correction = `$\\sqrt{${c ** 2}}=${c}$ et $\\sqrt{${d ** 2}}=${d}$, ainsi:<br>
       $${a}\\sqrt{${c ** 2}}+${b}\\sqrt{${d ** 2}}=${a}\\times ${c}+${b}\\times ${d}=${a * c + b * d}$`
      this.reponse = a * c + b * d
    } else {
      this.question = `$${a}\\sqrt{${c ** 2}}-${b}\\sqrt{${d ** 2}}=$`
      this.correction = `$\\sqrt{${c ** 2}}=${c}$ et $\\sqrt{${d ** 2}}=${d}$, ainsi:<br>
       $${a}\\sqrt{${c ** 2}}-${b}\\sqrt{${d ** 2}}=${a}\\times ${c}-${b}\\times ${d}=${a * c - b * d}$`
      this.reponse = a * c - b * d
    }
  }
}
