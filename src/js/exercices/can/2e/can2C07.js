import Exercice from '../../Exercice.js'
import { choice } from '../../../modules/outils/arrays.js'
import { extraireRacineCarree } from '../../../modules/outils/factorisation.js'
export const titre = 'Calculer avec une racine carrée'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export const uuid = '2af85'
export const ref = 'can2C07'
export default function CalculAvecRacineCarree2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const listeRacines1 = [
      [2, 8], [2, 32], [2, 50], [3, 27], [5, 20], [2, 18], [2, 72], [3, 48], [5, 45], [2, 200], [3, 300], [5, 500], [6, 600], [7, 700]
    ] // couples pour simplifier des produits de racines carrées
    let racine, a, b, reduction
    switch (choice([1, 2])) {
      case 1 :
        racine = choice(listeRacines1)
        a = racine[0]
        b = racine[1]
        reduction = extraireRacineCarree(b)
        if (choice([true, false])) {
          this.question = `Ecrire $\\sqrt{${a}}+\\sqrt{${b}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers et $b$ le plus petit possible : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${reduction[0]}\\sqrt{${reduction[1]}}$, car
    $\\sqrt{${b}}=\\sqrt{${reduction[0]}^2\\times ${reduction[1]}} =
    \\sqrt{${reduction[0]}^2}\\times \\sqrt{${reduction[1]}} 
    =${reduction[0]}\\sqrt{${reduction[1]}}$.<br>
    Ainsi : 
    <br>
    $\\begin{aligned}
    \\sqrt{${a}}+\\sqrt{${b}}&=\\sqrt{${a}}+${reduction[0]}\\sqrt{${reduction[1]}}\\\\
    &= ${reduction[0] + 1}\\sqrt{${reduction[1]}}
    \\end{aligned}$ 
  `
        } else {
          this.question = `Ecrire $\\sqrt{${b}}+\\sqrt{${a}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers et $b$ le plus petit possible : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${reduction[0]}\\sqrt{${reduction[1]}}$, car
  $\\sqrt{${b}}=\\sqrt{${reduction[0]}^2\\times ${reduction[1]}} =
  \\sqrt{${reduction[0]}^2}\\times \\sqrt{${reduction[1]}} 
  =${reduction[0]}\\sqrt{${reduction[1]}}$.<br>
  Ainsi : 
  <br>
  $\\begin{aligned}
  \\sqrt{${b}}+\\sqrt{${a}}&=${reduction[0]}\\sqrt{${reduction[1]}}+\\sqrt{${a}}\\\\
  &= ${reduction[0] + 1}\\sqrt{${reduction[1]}}   
  \\end{aligned}$ 
`
        }
        this.reponse = [`${reduction[0] + 1}\\sqrt{${reduction[1]}}`]
        break

      case 2 :
        racine = choice(listeRacines1)
        a = racine[0]
        b = racine[1]
        reduction = extraireRacineCarree(b)
        if (choice([true, false])) {
          this.question = `Ecrire $\\sqrt{${a}}-\\sqrt{${b}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers et $b$ le plus petit possible : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${reduction[0]}\\sqrt{${reduction[1]}}$, car
    $\\sqrt{${b}}=\\sqrt{${reduction[0]}^2\\times ${reduction[1]}} =
    \\sqrt{${reduction[0]}^2}\\times \\sqrt{${reduction[1]}} 
    =${reduction[0]}\\sqrt{${reduction[1]}}$.<br>
    Ainsi : 
    <br>
    $\\begin{aligned}
    \\sqrt{${a}}-\\sqrt{${b}}&=\\sqrt{${a}}-${reduction[0]}\\sqrt{${reduction[1]}}\\\\
    &= ${1 - reduction[0]}\\sqrt{${reduction[1]}} 
    \\end{aligned}$ 
  `
          if (1 - reduction[0] === -1) {
            this.reponse = [`${1 - reduction[0]}\\sqrt{${reduction[1]}}`]
          } else { this.reponse = [`${1 - reduction[0]}\\sqrt{${reduction[1]}}`, `-\\sqrt{${reduction[1]}}`] }
        } else {
          this.question = `Ecrire $\\sqrt{${b}}-\\sqrt{${a}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers et $b$ le plus petit possible : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${reduction[0]}\\sqrt{${reduction[1]}}$, car
  $\\sqrt{${b}}=\\sqrt{${reduction[0]}^2\\times ${reduction[1]}} =
  \\sqrt{${reduction[0]}^2}\\times \\sqrt{${reduction[1]}} 
  =${reduction[0]}\\sqrt{${reduction[1]}}$.<br>
  Ainsi : 
  <br>
  $\\begin{aligned}
  \\sqrt{${b}}-\\sqrt{${a}}&=${reduction[0]}\\sqrt{${reduction[1]}}-\\sqrt{${a}}\\\\
  &= ${reduction[0] - 1}\\sqrt{${reduction[1]}}
  \\end{aligned}$ 
`
          if (1 - reduction[0] === 1) {
            this.reponse = [`${reduction[0] - 1}\\sqrt{${reduction[1]}}`, `\\sqrt{${reduction[1]}}`]
          } else { this.reponse = [`${reduction[0] - 1}\\sqrt{${reduction[1]}}`] }
        }

        break
    }
  }
}
