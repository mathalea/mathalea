import Exercice from '../Exercice.js'
import { extraireRacineCarree, choice } from '../../modules/outils.js'
export const titre = 'Calcul avec racine carrée niveau 2'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
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
    let racine, a, b
    switch (choice([1, 2])) {
      case 1 :
        racine = choice(listeRacines1)
        a = racine[0]
        b = racine[1]
        if (choice([true, false])) {
          this.question = `Ecrire $\\sqrt{${a}}+\\sqrt{${b}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$, car
    $\\sqrt{${b}}=\\sqrt{${extraireRacineCarree(b)[0]}^2\\times ${extraireRacineCarree(b)[1]}} =
    \\sqrt{${extraireRacineCarree(b)[0]}^2}\\times \\sqrt{${extraireRacineCarree(b)[1]}} 
    =${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$.<br>
    Ainsi : 
    <br>
    $\\begin{aligned}
    \\sqrt{${a}}+\\sqrt{${b}}&=\\sqrt{${a}}+${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}\\\\
    &= ${extraireRacineCarree(b)[0] + 1}\\sqrt{${extraireRacineCarree(b)[1]}}
    \\end{aligned}$ 
  `
        } else {
          this.question = `Ecrire $\\sqrt{${b}}+\\sqrt{${a}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$, car
  $\\sqrt{${b}}=\\sqrt{${extraireRacineCarree(b)[0]}^2\\times ${extraireRacineCarree(b)[1]}} =
  \\sqrt{${extraireRacineCarree(b)[0]}^2}\\times \\sqrt{${extraireRacineCarree(b)[1]}} 
  =${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$.<br>
  Ainsi : 
  <br>
  $\\begin{aligned}
  \\sqrt{${b}}+\\sqrt{${a}}&=${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}+\\sqrt{${a}}\\\\
  &= ${extraireRacineCarree(b)[0] + 1}\\sqrt{${extraireRacineCarree(b)[1]}}   
  \\end{aligned}$ 
`
        }
        this.reponse = [`${extraireRacineCarree(b)[0] + 1}\\sqrt{${extraireRacineCarree(b)[1]}}`]
        break

      case 2 :
        racine = choice(listeRacines1)
        a = racine[0]
        b = racine[1]
        if (choice([true, false])) {
          this.question = `Ecrire $\\sqrt{${a}}-\\sqrt{${b}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$, car
    $\\sqrt{${b}}=\\sqrt{${extraireRacineCarree(b)[0]}^2\\times ${extraireRacineCarree(b)[1]}} =
    \\sqrt{${extraireRacineCarree(b)[0]}^2}\\times \\sqrt{${extraireRacineCarree(b)[1]}} 
    =${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$.<br>
    Ainsi : 
    <br>
    $\\begin{aligned}
    \\sqrt{${a}}-\\sqrt{${b}}&=\\sqrt{${a}}-${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}\\\\
    &= ${1 - extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}} 
    \\end{aligned}$ 
  `
          if (1 - extraireRacineCarree(b)[0] === -1) {
            this.reponse = [`${1 - extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}`]
          } else { this.reponse = [`${1 - extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}`, `-\\sqrt{${extraireRacineCarree(b)[1]}}`] }
        } else {
          this.question = `Ecrire $\\sqrt{${b}}-\\sqrt{${a}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers : `
          this.correction = `On simpifie $\\sqrt{${b}}$ en $${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$, car
  $\\sqrt{${b}}=\\sqrt{${extraireRacineCarree(b)[0]}^2\\times ${extraireRacineCarree(b)[1]}} =
  \\sqrt{${extraireRacineCarree(b)[0]}^2}\\times \\sqrt{${extraireRacineCarree(b)[1]}} 
  =${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}$.<br>
  Ainsi : 
  <br>
  $\\begin{aligned}
  \\sqrt{${b}}-\\sqrt{${a}}&=${extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}-\\sqrt{${a}}\\\\
  &= ${extraireRacineCarree(b)[0] - 1}\\sqrt{${extraireRacineCarree(b)[1]}}
  \\end{aligned}$ 
`
          if (1 - extraireRacineCarree(b)[0] === 1) {
            this.reponse = [`${1 - extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}`, `\\sqrt{${extraireRacineCarree(b)[1]}}`]
          } else { this.reponse = [`${1 - extraireRacineCarree(b)[0]}\\sqrt{${extraireRacineCarree(b)[1]}}`] }
        }

        break
    }
  }
}
