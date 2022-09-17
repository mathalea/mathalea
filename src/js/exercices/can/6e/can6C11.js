import { choice, randint, texNombre, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
export const titre = 'Calculer le double ou le triple (décimal)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C11
 */
export const uuid = '50fc4'
export const ref = 'can6C11'
export default function DoubleOuTripleDecimal () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 3)
    const b = randint(1, 9, a)
    const e = a * 10 + b
    const d = (new Decimal(randint(1, 9))).div(10)
    const c = d.add(e)
    if (choice([true, false])) {
      this.reponse = c.mul(3)
      this.question = `Quel est le triple de $${texNombre(c, 1)}$ ?`
      this.correction = `Le triple de $${texNombre(c, 1)}$ est $3 \\times ${texNombre(c, 1)}=${texNombre(this.reponse, 1)}$.`
      this.correction += texteEnCouleur(`
      <br> Mentalement : <br>
  On décompose $${texNombre(c, 1)}$ en $${e}+${texNombre(d, 1)}$. <br>
  On calcule le triple de $${e}$, soit $3\\times ${e}= ${3 * e}$
  puis le triple de $${texNombre(d, 1)}$, soit $3\\times ${texNombre(d, 1)}=${texNombre(d.mul(3))}$.<br>
  On en fait la somme : $${3 * e}+${texNombre(d.mul(3))}$, ce qui donne le résultat $${texNombre(this.reponse, 1)}$.
      `)
    } else {
      this.reponse = c.mul(2)
      this.question = `Quel est le double de $${texNombre(c, 1)}$ ?`
      this.correction = `Le double de $${texNombre(c, 1)}$ est $2 \\times ${texNombre(c, 1)}=${texNombre(this.reponse, 1)}$.`
      this.correction += texteEnCouleur(`
      <br> Mentalement : <br>
  On décompose $${texNombre(c, 1)}$ en $${e}+${texNombre(d, 1)}$. <br>
  On calcule le double de $${e}$, soit $2\\times ${e}= ${2 * e}$
  puis le double de $${texNombre(d, 1)}$, soit $2\\times ${texNombre(d, 1)}=${texNombre(d.mul(2), 1)}$.<br>
  On en fait la somme : $${2 * e}+${texNombre(d.mul(2), 1)}$, ce qui donne le résultat $${texNombre(this.reponse, 1)}$.
      `)
    }
  }
}
