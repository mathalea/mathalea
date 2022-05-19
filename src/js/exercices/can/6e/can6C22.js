import { calcul, choice, randint, texNombre, texteEnCouleur, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Déterminer la valeur décimale dune fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6C22
 */
export default function ValeursDecimalesFractions () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    let a, b
    switch (choice([1, 2, 3, 4])) {
      case 1:
        a = randint(1, 9, 5)
        this.reponse = calcul(a / 5)
        this.question = `Donner la valeur décimale de  $\\dfrac{${a}}{5}$ :`
        if (a === 1) {
          this.correction = `$\\dfrac{${a}}{5}=${texNombre(this.reponse)}$`
        }
        if (a === 2 || a === 3 | a === 4) {
          this.correction = `$\\dfrac{${a}}{5}=${texNombre(this.reponse)}$`
          this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
         $\\dfrac{1}{5}=0,2$ et $\\dfrac{${a}}{5}=${a}\\times \\dfrac{1}{5}=${a}\\times 0,2=${texNombre(this.reponse)}$.`)
        }
        if (a > 5) {
          this.correction = `$\\dfrac{${a}}{5}=${texNombre(this.reponse)}$`
          this.correction += texteEnCouleur(`
  <br> Mentalement : <br>
   $\\dfrac{${a}}{5}=\\dfrac{5}{5}+\\dfrac{${a - 5}}{5}=1+${texNombrec((a - 5) / 5)}=${texNombre(this.reponse)}$.`)
        }
        break
      case 2:
        b = choice([1, 3, 5, 7, 9, 11])
        this.question = `Donner la valeur décimale de  $\\dfrac{${b}}{4}$ :`
        this.reponse = calcul(b / 4)
        if (b === 1) {
          this.correction = `$\\dfrac{${b}}{4}=${texNombre(this.reponse)}$`
        }
        if (b === 3) {
          this.correction = `$\\dfrac{${b}}{4}=${texNombre(this.reponse)}$`
        }
        if (b === 5 || b === 7) {
          this.correction = `$\\dfrac{${b}}{4}=${texNombre(this.reponse)}$`
          this.correction += texteEnCouleur(`
          <br> Mentalement : <br>
          $\\dfrac{${b}}{4}=\\dfrac{4}{4}+\\dfrac{${b - 4}}{4}=
          1+${texNombrec((b - 4) / 4)}=${texNombre(this.reponse)}$.`)
        }
        if (b === 9 || b === 11) {
          this.correction = `$\\dfrac{${b}}{4}=${texNombre(this.reponse)}$`
          this.correction += texteEnCouleur(`
          <br> Mentalement : <br>
          $\\dfrac{${b}}{4}=\\dfrac{8}{4}+\\dfrac{${b - 8}}{4}=
          2+${texNombrec((b - 8) / 4)}=${texNombre(this.reponse)}$.`)
        }

        break
      case 3:
        b = choice([1, 3, 5, 7, 9, 11, 13, 17, 19])
        this.question = `Donner la valeur décimale de  $\\dfrac{${b}}{10}$ :`
        this.reponse = calcul(b / 10)
        if (b === 1) {
          this.correction = `$\\dfrac{${b}}{10}=${texNombre(this.reponse)}$`
        }
        if (b > 1) {
          this.correction = `$\\dfrac{${b}}{10}=${texNombre(this.reponse)}$`
          this.correction += texteEnCouleur(`
          <br> Mentalement : <br>
          $\\dfrac{${b}}{10}=${b}\\times \\dfrac{1}{10}=
          ${b}\\times 0,1=${texNombre(this.reponse)}$.`)
        }

        break
      case 4:
        b = choice([3, 5, 7, 9, 11, 13, 17, 19])
        this.question = `Donner la valeur décimale de  $\\dfrac{${b}}{2}$ :`
        this.reponse = calcul(b / 2)

        this.correction = `$\\dfrac{${b}}{2}=${texNombre(this.reponse)}$`
        this.correction += texteEnCouleur(`
          <br> Mentalement : <br>
          $\\dfrac{${b}}{2}=${b}\\div 2=${texNombre(this.reponse)}$.`)

        break
    }
  }
}
