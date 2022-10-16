import Exercice from '../../Exercice.js'
import { randint, choice } from '../../../modules/outils.js'
export const titre = 'Développer avec les égalités remarquables'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '25/10/2021'

/**
 * utilisation des égalités remarquables pour développer
 * @author Gilles Mora
 * Référence can2L06
*/
export const uuid = '4c675'
export const ref = 'can2L06'
export default function DevelopperEgalitesRemarquables () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const inconnue = choice(['x', 'y'])
    const a = randint(1, 9)
    const b = randint(2, 5)
    switch (choice([1, 2, 3, 4, 5, 6])) {
      case 1 :
        this.question = ` Développer $(${inconnue}+${a})^2$.` // (x+a)²
        this.correction = `On utilise l'égalité remarquable $(a+b)^2=a^2+2ab+b^2$ avec $a=${inconnue}$ et $b=${a}$.<br>
      $(${inconnue}+${a})^2=${inconnue}^2+2 \\times ${a} \\times ${inconnue}+${a}^2=${inconnue}^2+${2 * a}${inconnue}+${a * a}$`
        this.reponse = [`${inconnue}^2+${2 * a}${inconnue}+${a * a}`]
        break
      case 2 :
        this.question = ` Développer $(${inconnue}-${a})^2$.` // (x-a)²
        this.correction = `On utilise l'égalité remarquable $(a-b)^2=a^2-2ab+b^2$ avec $a=${inconnue}$ et $b=${a}$.<br>
      $(${inconnue}-${a})^2=${inconnue}^2-2 \\times ${a} \\times ${inconnue}+${a}^2=${inconnue}^2-${2 * a}${inconnue}+${a * a}$`
        this.reponse = [`${inconnue}^2-${2 * a}${inconnue}+${a * a}`]
        break
      case 3 :
        this.question = `Développer $(x-${a})(x+${a})$.` // (x-a)(x+a)
        this.correction = `On utilise l'égalité remarquable $(a+b)(a-b)=a^2-b^2$ avec $a=x$ et $b=${a}$.<br>
      $(x-${a})(x+${a})=x^2-${a}^2=x^2-${a * a}$.`
        this.reponse = [`x^2-${a * a}`]
        break
      case 4 :
        this.question = `Développer $(${b}x+${a})^2$.` // (bx+a)²  b>1
        this.correction = `On utilise l'égalité remarquable $(a+b)^2=a^2+2ab+b^2$ avec $a=${b}x$ et $b=${a}$.<br>
      $(${b}x+${a})^2=(${b}x)^2+2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2+${2 * b * a}x+${a * a}$`
        this.reponse = [`${b * b}x^2+${2 * b * a}x+${a * a}`]
        break
      case 5 :
        this.question = `Développer $(${b}x-${a})^2$.` // (bx-a)² b>1
        this.correction = `On utilise l'égalité remarquable $(a+b)^2=a^2-2ab+b^2$ avec $a=${b}x$ et $b=${a}$.<br>
      $(${b}x-${a})^2=(${b}x)^2-2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2-${2 * b * a}x+${a * a}$`
        this.reponse = [`${b * b}x^2-${2 * b * a}x+${a * a}`]
        break
      case 6 :
        this.question = `Développer $(${b}x-${a})(${b}x+${a})$.` // (bx-a)(bx+a) b>1
        this.correction = `On utilise l'égalité remarquable $(a+b)(a-b)=a^2-b^2$ avec $a=${b}x$ et $b=${a}$.<br>
      $(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b * b}x^2-${a * a}$`
        this.reponse = [`${b * b}x^2-${a * a}`]
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
