import Exercice from '../Exercice.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { calcul, texNombrec } from '../../modules/outils/texNombres.js'
export const titre = 'Proportions'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
* Modèle d'exercice très simple pour la course aux nombres
* @author Stéphane Guyon
* Référence
* Date de publication
*/
export const uuid = 'c7270'
export const ref = 'techno1P3'
export default function Proportion () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur25 inline'
  this.optionsChampTexte = { texteApres: ' €' }
  this.nouvelleVersion = function () {
    let a, b, c, d
    switch (choice(['simple'])) {
      case 'simple':
        b = choice([2, 3, 4, 6, 8, 9]) /* Numérateur fraction */
        c = choice([5, 7, 11, 13])/* Dénominateur fraction */
        d = randint(4, 11)/* Multiple */
        a = c * d
        this.question = `Calculer  $\\dfrac{${b}}{${c}}$ de $${a}$.  <br> `
        this.correction = `Calculer la fraction d'un nombre, c'est multiplier la fraction par ce nombre.
<br><br>    Ainsi, $\\dfrac{${b}}{${c}}$  de $${a}$ est égal à $\\dfrac{${b}}{${c}}\\times ${a}=\\dfrac{${b}\\times${a}}{${c}}=\\dfrac{${b}\\times${c}\\times${d}}{${c}}=${texNombrec(b * d)}$.`
        this.reponse = calcul(d * b)
        break
    }
  }
}
