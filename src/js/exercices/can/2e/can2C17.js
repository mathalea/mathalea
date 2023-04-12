import Exercice from '../../Exercice.js'
import { randint, choice } from '../../../modules/outils.js'
export const titre = 'Développer des égalités remarquables avec des racines carrées'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '30/03/2023'

/**
 * utilisation des égalités remarquables pour développer
 * @author Gilles Mora
 * Référence can2C17
*/
export const uuid = '9883e'
export const ref = 'can2C17'
export default function DevelopperEgalitesRemarquablesRC () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    switch (choice([1, 2, 3, 4, 5, 6])) { //, 2, 3, 4, 5, 6
      case 1 :
        { const inconnue = choice([2, 3, 5, 7])
          const a = randint(1, 9)
          this.question = ` Développer et réduire $(\\sqrt{${inconnue}}+${a})^2$.` // (x+a)²
          this.correction = `On utilise l'égalité remarquable $(a+b)^2=a^2+2ab+b^2$ avec $a=\\sqrt{${inconnue}}$ et $b=${a}$.<br>
      $(\\sqrt{${inconnue}}+${a})^2=(\\sqrt{${inconnue}})^2+2 \\times ${a} \\times \\sqrt{${inconnue}}+${a}^2=${inconnue}+${2 * a}\\sqrt{${inconnue}}+${a * a}=${inconnue + a * a}+${2 * a}\\sqrt{${inconnue}}$`
          this.reponse = [[`${inconnue + a * a}+${2 * a}\\sqrt{${inconnue}}`], [`${2 * a}\\sqrt{${inconnue}}+${inconnue + a * a}`]] }
        break
      case 2 :
        { const inconnue = choice([2, 3, 5, 7])
          const a = randint(1, 9)
          this.question = ` Développer et réduire $(\\sqrt{${inconnue}}-${a})^2$.` // (x-a)²
          this.correction = `On utilise l'égalité remarquable $(a-b)^2=a^2-2ab+b^2$ avec $a=\\sqrt{${inconnue}}$ et $b=${a}$.<br>
      $(\\sqrt{${inconnue}}-${a})^2=(\\sqrt{${inconnue}})^2-2 \\times ${a} \\times \\sqrt{${inconnue}}+${a}^2=${inconnue}-${2 * a}\\sqrt{${inconnue}}+${a * a}=${inconnue + a * a}-${2 * a}\\sqrt{${inconnue}}$`
          this.reponse = [[`${inconnue + a * a}-${2 * a}\\sqrt{${inconnue}}`], [`${-2 * a}\\sqrt{${inconnue}}+${inconnue + a * a}`]] }
        break
      case 3 :
        { const inconnue = choice([2, 3, 5, 7])
          const a = randint(1, 9)
          this.question = `Développer et réduire $(\\sqrt{${inconnue}}-${a})(\\sqrt{${inconnue}}+${a})$.` // (x-a)(x+a)
          this.correction = `On utilise l'égalité remarquable $(a+b)(a-b)=a^2-b^2$ avec $a=\\sqrt{${inconnue}}$ et $b=${a}$.<br>
          $(\\sqrt{${inconnue}}-${a})(\\sqrt{${inconnue}}+${a})=(\\sqrt{${inconnue}})^2-${a}^2=${inconnue}-${a * a}=${inconnue - a * a}$.`
          this.reponse = [`${inconnue - a * a}`] }
        break
      case 4 :
        { const inconnue = choice([2, 3])
          const a = randint(1, 5)
          this.question = `Développer et réduire $(2\\sqrt{${inconnue}}+${a})^2$.` // (2x+a)²
          this.correction = `On utilise l'égalité remarquable $(a+b)^2=a^2+2ab+b^2$ avec $a=2\\sqrt{${inconnue}}$ et $b=${a}$.<br>
      $(2\\sqrt{${inconnue}}+${a})^2=(2\\sqrt{${inconnue}})^2+2 \\times 2\\sqrt{${inconnue}} \\times ${a} + ${a}^2=4\\times${inconnue}+${4 * a}\\sqrt{${inconnue}}+${a * a}=${4 * inconnue + a * a}+${4 * a}\\sqrt{${inconnue}}$`
          this.reponse = [`${4 * inconnue + a * a}+${4 * a}\\sqrt{${inconnue}}`] }
        break
      case 5 :
        { const inconnue = choice([2, 3])
          const a = randint(1, 5)
          this.question = `Développer et réduire $(2\\sqrt{${inconnue}}-${a})^2$.` // (2x-a)²
          this.correction = `On utilise l'égalité remarquable $(a-b)^2=a^2-2ab+b^2$ avec $a=2\\sqrt{${inconnue}}$ et $b=${a}$.<br>
              $(2\\sqrt{${inconnue}}-${a})^2=(2\\sqrt{${inconnue}})^2-2 \\times 2\\sqrt{${inconnue}} \\times ${a} + ${a}^2=4\\times${inconnue}-${4 * a}\\sqrt{${inconnue}}+${a * a}=${4 * inconnue + a * a}-${4 * a}\\sqrt{${inconnue}}$`
          this.reponse = [`${4 * inconnue + a * a}-${4 * a}\\sqrt{${inconnue}}`] }
        break
      case 6 :
        { const inconnue = choice([2, 3, 5])
          const a = randint(1, 6)
          this.question = `Développer et réduire $(2\\sqrt{${inconnue}}-${a})(2\\sqrt{${inconnue}}+${a})$.` // (2x-a)(2x+a)
          this.correction = `On utilise l'égalité remarquable $(a+b)(a-b)=a^2-b^2$ avec $a=2\\sqrt{${inconnue}}$ et $b=${a}$.<br>
                $(2\\sqrt{${inconnue}}-${a})(2\\sqrt{${inconnue}}+${a})=(2\\sqrt{${inconnue}})^2-${a}^2=4\\times${inconnue}-${a * a}=${4 * inconnue - a * a}$`
          this.reponse = [`${4 * inconnue - a * a}`] }
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
