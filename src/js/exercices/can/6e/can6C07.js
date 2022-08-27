import { calcul, randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver le reste d’une division par 3'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C07
 */
export const uuid = 'b3aee'
export const ref = 'can6C07'
export default function ResteDivisionPar3 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const b = randint(1, 9)
    const c = randint(0, 9)
    const d = randint(0, 9, [b, c])
    const a = calcul(b * 100 + c * 10 + d)
    this.reponse = a % 3
    this.question = `Quel est le reste de la division de $${a}$ par $3$ ?`
    if (a % 3 === 0) {
      this.correction = `Le reste de la division de $${a}$ par $3$ est $${a % 3}$.`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Un entier est divisible par $3$ lorsque la somme de ses chiffres est un multiple de $3$.<br> 
      La somme des chiffres qui composent $${a}$ est :  $${b}+${c}+${d}=${b + c + d}$.<br>
   $${b + c + d}$ est un mutiple de $3$, donc le reste de la division de $${a}$ par $3$ est $0$.
      `)
    }
    if (a % 3 === 1) {
      this.correction = `Le reste de la division de $${a}$ par $3$ est ${a % 3}.`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Un entier est divisible par $3$ lorsque la somme de ses chiffres est un multiple de $3$.<br> 
      La somme des chiffres qui composent $${a}$ est : $${b}+${c}+${d}=${b + c + d}$.<br>
      $${b + c + d}$ n'est pas un mutiple de $3$. <br>
      En enlevant 1 unité à $${b + c + d}$, on obtient $${b + c + d - 1}$ qui est un multiple de $3$.<br>
      Cela signifie que $${a}-1=${a - 1}$ est un multiple de $3$.<br>
     Ainsi, le reste de la division de $${a}$ par $3$ est donc $1$.
         `)
    }
    if (a % 3 === 2) {
      this.correction = `Le reste de la division de $${a}$ par $3$ est ${a % 3}.`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Un entier est divisible par $3$ lorsque la somme de ses chiffres est un multiple de $3$.<br> 
      La somme des chiffres qui composent $${a}$ est : $${b}+${c}+${d}=${b + c + d}$.<br>
      $${b + c + d}$ n'est pas un mutiple de $3$. <br>
      En enlevant 2 unités à $${b + c + d}$, on obtient $${b + c + d - 2}$ qui est un multiple de $3$.<br>
      Cela signifie que $${a}-2=${a - 2}$ est un multiple de $3$.<br>
     Ainsi, le reste de la division de $${a}$ par $3$ est donc $2$.
         `)
    }
  }
}
