import { calcul, choice, randint, texNombre, texteEnCouleur, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Double ou triple (décimal)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C11
 */
export default function DoubleOuTripleDecimal () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = randint(1, 3)
    const b = randint(1, 9, a)
    const d = randint(1, 9)
    const c = calcul(a * 10 + b + d * 0.1)
    if (choice([true, false])) {
      this.reponse = calcul(3 * c)
      this.question = `Quel est le triple de $${texNombre(c)}$ ?`
      this.correction = `Le triple de $${texNombre(c)}$ est $3 \\times ${texNombre(c)}=${texNombrec(3 * c)}$.`
      this.correction += texteEnCouleur(`
      <br> Mentalement : <br>
  On décompose $${texNombrec(a * 10 + b + d * 0.1)}$ en $${texNombrec(a * 10 + b)}+${texNombrec(d * 0.1)}$. <br>
  On calcule le triple de $${a * 10 + b}$, soit $3\\times ${texNombrec(a * 10 + b)}= ${texNombrec(a * 30 + 3 * b)}$
  puis le triple de $${texNombrec(d * 0.1)}$, soit $3\\times ${texNombrec(d * 0.1)}=${texNombrec(d * 0.3)}$.<br>
  On en fait la somme : $${texNombrec(3 * a * 10 + 3 * b)}+${texNombrec(d * 0.3)}$, ce qui donne le résultat $${texNombrec(3 * c)}$.
      `)
    } else {
      this.reponse = calcul(2 * c)
      this.question = `Quel est le double de $${texNombre(c)}$ ?`
      this.correction = `Le double de $${texNombre(c)}$ est $2 \\times ${texNombre(c)}=${calcul(2 * c)}$.`
      this.correction += texteEnCouleur(`
      <br> Mentalement : <br>
  On décompose $${texNombrec(a * 10 + b + d * 0.1)}$ en $${texNombrec(a * 10 + b)}+${texNombrec(d * 0.1)}$. <br>
  On calcule le double de $${a * 10 + b}$, soit $2\\times ${texNombrec(a * 10 + b)}= ${texNombrec(a * 20 + 2 * b)}$
  puis le double de $${texNombrec(d * 0.1)}$, soit $2\\times ${texNombrec(d * 0.1)}=${texNombrec(d * 0.2)}$.<br>
  On en fait la somme : $${texNombrec(2 * a * 10 + 2 * b)}+${texNombrec(d * 0.2)}$, ce qui donne le résultat $${texNombrec(2 * c)}$.
      `)
    }
  }
}
