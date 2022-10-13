import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { texRacineCarree } from '../../../modules/outils/factorisation.js'
export const titre = 'Déterminer le nombre de solutions d’une équation se ramenant à $x^2=a$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote et Gilles Mora
 * Septembre 2021
 * Référence can2L01
 */
export const uuid = '3b832'
export const ref = 'can2L01'
export default function EquationPlusMoinsX2PlusAEgalB () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1

  this.nouvelleVersion = function () {
    const a = randint(1, 20)
    const b = randint(1, 20)
    switch (choice(['a', 'b', 'c', 'd'])) { //
      case 'a':
        this.question = ` Combien de solutions réelles possède l'équation : <br> $-x^2+${a}=${b}$ ?<br>`
        if (a - b > 0) {
          this.correction = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
      $${a - b}$ étant strictement positif, cette équation a deux solutions : $${texRacineCarree(a - b)}$ et  $-${texRacineCarree(a - b)}$.`
          this.reponse = 2
        } else if (a - b === 0) {
          this.correction = `L'équation est équivalente à$-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
      cette équation a une seul solution réelle : 0.`
          this.reponse = 1
        } else if (a - b < 0) {
          this.correction = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
     Cette équation n'a pas de solution réelle car $${a - b}<0$.`
          this.reponse = 0
        }
        break
      case 'b':
        this.question = ` Combien de solutions réelles possède l'équation <br> $-${a}+x^2=-${b}$ ?<br>`
        if (a - b > 0) {
          this.correction = `L'équation est équivalente à $x^2=-${b}+${a}$, soit $x^2=${a - b}$.<br>
      $${a - b}$ étant strictement positif, cette équation a deux solutions : $${texRacineCarree(a - b)}$ et  $-${texRacineCarree(a - b)}$.`
          this.reponse = 2
        } else if (a - b === 0) {
          this.correction = `L'équation est équivalente à$x^2=-${b}+${a}$, soit $x^2=${a - b}$.<br>
      cette équation a une seul solution réelle : 0.`
          this.reponse = 1
        } else if (a - b < 0) {
          this.correction = `L'équation est équivalente à $x^2=-${b}+${a}$, soit $x^2=${a - b}$.<br>
     Cette équation n'a pas de solution réelle car $${a - b}<0$.`
          this.reponse = 0
        }
        break
      case 'c':
        this.question = ` Combien de solutions réelles possède l'équation <br> $${b}=-x^2+${a}$ ?<br>`
        if (a - b > 0) {
          this.correction = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
        $${a - b}$ étant strictement positif, cette équation a deux solutions : $${texRacineCarree(a - b)}$ et  $-${texRacineCarree(a - b)}$.`
          this.reponse = 2
        } else if (a - b === 0) {
          this.correction = `L'équation est équivalente à$-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
        cette équation a une seul solution réelle : 0.`
          this.reponse = 1
        } else if (a - b < 0) {
          this.correction = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
       Cette équation n'a pas de solution réelle car $${a - b}<0$.`
          this.reponse = 0
        }
        break
      case 'd':
        this.question = ` Combien de solutions réelles possède l'équation <br> $-${b}=-x^2-${a}$ ?<br>`
        if (b - a > 0) {
          this.correction = `L'équation est équivalente à $-x^2=-${b}+${a}$, soit $x^2=${b - a}$.<br>
        $${b - a}$ étant strictement positif, cette équation a deux solutions : $${texRacineCarree(b - a)}$ et  $-${texRacineCarree(b - a)}$.`
          this.reponse = 2
        } else if (b - a === 0) {
          this.correction = `L'équation est équivalente à$-x^2=-${b}+${a}$, soit $x^2=${b - a}$.<br>
        cette équation a une seul solution réelle : 0.`
          this.reponse = 1
        } else if (b - a < 0) {
          this.correction = `L'équation est équivalente à $-x^2=-${b}+${a}$, soit $x^2=${b - a}$.<br>
       Cette équation n'a pas de solution réelle car $${b - a}<0$.`
          this.reponse = 0
        }
        break
    }
  }
}
