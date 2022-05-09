import { calcul, choice, randint, texNombre, texteEnCouleur, arrondi } from '../../../modules/outils.js'
import Exercice from '../../Exercice'
export const titre = 'Soustraire un décimal d’un entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '09/05/2022'
/*!
 * @author  Gilles Mora
 *
 *
 */
export default function SoustraireEntierDecimal () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, b, u, d
    switch (choice([1])) {
      case 1:// 5-2,6 par ex
        a = randint(2, 15)
        u = randint(1, a)
        d = randint(2, 9)

        this.question = `$${a}-${texNombre(u + d / 10, 1)}=$`
        this.correction = `$${a}-${texNombre(u + d / 10, 1)}=${texNombre(a - u - d / 10, 1)}$`
        this.reponse = arrondi(a - u - d / 10, 1)
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   On commence par soustraire les unités : $${a}-${u}=${a - u}$.<br>
    Puis les dixièmes $${a - u}-${texNombre(d / 10)}=${texNombre(a - u - d / 10, 1)}$`)
        break
      case 2:// un entier par un décimal avec deux chiffres après la virgule
        a = calcul(randint(2, 9) / 100)
        b = randint(2, 9)
        this.question = `$${texNombre(a)}\\times ${b}=$`
        this.correction = `$${texNombre(a)}\\times ${b}=${texNombre(a * b)}$`
        this.reponse = a * b
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   Comme $${texNombre(a)}=${texNombre(100 * a)}\\times 0,01$, alors $${texNombre(a)}\\times ${b}=${texNombre(100 * a)}\\times ${b}\\times 0,01 =${texNombre(100 * a * b)}\\times 0,01=${texNombre(a * b)}$ `)
        break
    }
  }
}
