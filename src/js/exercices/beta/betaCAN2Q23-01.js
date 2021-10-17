import Exercice from '../Exercice.js'
import { choice, extraireRacineCarree } from '../../modules/outils.js'
export const titre = 'Calcul avec racine carrée niveau 3'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function CalculAvecRacineCarree3 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const listeRacines1 = [
      [2, 8], [2, 32], [2, 50], [3, 27], [5, 20], [2, 18], [2, 72], [3, 48], [5, 45]
    ] // couples pour simplifier des produits de racines carrées
    let racine, a, b
    switch (choice([1, 2])) {
      case 1 :
        racine = choice(listeRacines1)
        a = racine[0]
        b = racine[1]
        if (choice([true, false])) {
          this.question = `Le carré de $\\sqrt{${a}}+\\sqrt{${b}}$ est égal à : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$, car
    $\\sqrt{${b}}=\\sqrt{${extraireRacineCarree(b)[0]}^2\\times ${extraireRacineCarree(b)[1]}} =
    \\sqrt{${extraireRacineCarree(b)[0]}^2}\\times \\sqrt{${extraireRacineCarree(b)[1]}} 
    =${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$.<br>
    Ainsi : 
    <br>
    $\\begin{aligned}
    (\\sqrt{${a}}+\\sqrt{${b}})^2&=(\\sqrt{${a}}+${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}})^2\\\\
    &= (${extraireRacineCarree(b)[0] + 1}\\sqrt{${extraireRacineCarree(b)[1]}})^2 \\\\
    &=  ${(extraireRacineCarree(b)[0] + 1) ** 2 * extraireRacineCarree(b)[1]}
    \\end{aligned}$ 
  `
        } else {
          this.question = `Le carré de $\\sqrt{${b}}+\\sqrt{${a}}$ est égal à : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$, car
  $\\sqrt{${b}}=\\sqrt{${extraireRacineCarree(b)[0]}^2\\times ${extraireRacineCarree(b)[1]}} =
  \\sqrt{${extraireRacineCarree(b)[0]}^2}\\times \\sqrt{${extraireRacineCarree(b)[1]}} 
  =${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$.<br>
  Ainsi : 
  <br>
  $\\begin{aligned}
  (\\sqrt{${b}}+\\sqrt{${a}})^2&=(${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}+\\sqrt{${a}})^2\\\\
  &= (${extraireRacineCarree(b)[0] + 1}\\sqrt{${extraireRacineCarree(b)[1]}})^2 \\\\
  &=  ${(extraireRacineCarree(b)[0] + 1) ** 2 * extraireRacineCarree(b)[1]}
  \\end{aligned}$ 
`
        }
        this.reponse = a + b + 2 * Math.sqrt(a * b)
        break

      case 2 :
        racine = choice(listeRacines1)
        a = racine[0]
        b = racine[1]
        if (choice([true, false])) {
          this.question = `Le carré de $\\sqrt{${a}}-\\sqrt{${b}}$ est égal à : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$, car
    $\\sqrt{${b}}=\\sqrt{${extraireRacineCarree(b)[0]}^2\\times ${extraireRacineCarree(b)[1]}} =
    \\sqrt{${extraireRacineCarree(b)[0]}^2}\\times \\sqrt{${extraireRacineCarree(b)[1]}} 
    =${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$.<br>
    Ainsi : 
    <br>
    $\\begin{aligned}
    (\\sqrt{${a}}-\\sqrt{${b}})^2&=(\\sqrt{${a}}-${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}})^2\\\\
    &= (${1 - extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}})^2 \\\\
    &=  ${(1 - extraireRacineCarree(b)[0]) ** 2 * extraireRacineCarree(b)[1]}
    \\end{aligned}$ 
  `
        } else {
          this.question = `Le carré de $\\sqrt{${b}}-\\sqrt{${a}}$ est égal à : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$, car
  $\\sqrt{${b}}=\\sqrt{${extraireRacineCarree(b)[0]}^2\\times ${extraireRacineCarree(b)[1]}} =
  \\sqrt{${extraireRacineCarree(b)[0]}^2}\\times \\sqrt{${extraireRacineCarree(b)[1]}} 
  =${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$.<br>
  Ainsi : 
  <br>
  $\\begin{aligned}
  (\\sqrt{${b}}-\\sqrt{${a}})^2&=(${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}-\\sqrt{${a}})^2\\\\
  &= (${extraireRacineCarree(b)[0] - 1}\\sqrt{${extraireRacineCarree(b)[1]}})^2 \\\\
  &=  ${(extraireRacineCarree(b)[0] - 1) ** 2 * extraireRacineCarree(b)[1]}
  \\end{aligned}$ 
`
        }
        this.reponse = a + b - 2 * Math.sqrt(a * b)
        break
    }
  }
}
