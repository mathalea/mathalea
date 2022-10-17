import { choice, randint, texNombre, texteEnCouleur, arrondi } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
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
export const uuid = '5b443'
export const ref = 'can6C31'
export default function SoustraireEntierDecimal () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, u, d, c
    switch (choice([1, 2])) {
      case 1:// 5-2,6 par ex
        a = randint(2, 15)
        u = randint(1, a - 1)
        d = randint(1, 9)

        this.question = `Calculer $${a}-${texNombre(u + d / 10, 1)}$.`
        this.correction = `$${a}-${texNombre(u + d / 10, 1)}=${a}-${u}-${texNombre(d / 10, 1)}=${texNombre(a - u - d / 10, 1)}$`
        this.reponse = arrondi(a - u - d / 10, 1)
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   On commence par soustraire les unités : $${a}-${u}=${a - u}$.<br>
    Puis les dixièmes : $${a - u}-${texNombre(d / 10)}=${texNombre(a - u - d / 10, 1)}$`)
        break
      case 2:// 8-2,65
        a = randint(2, 15)
        u = randint(1, a - 1)
        d = randint(1, 9)
        c = randint(1, 9)
        this.question = `Calculer $${a}-${texNombre(u + d / 10 + c / 100, 2)}$.`
        this.correction = `$${a}-${texNombre(u + d / 10 + c / 100, 2)}=${a}-${u}-${texNombre(d / 10 + c / 100, 2)}=${texNombre(a - u - d / 10 - c / 100, 2)}$`
        this.reponse = arrondi(a - u - d / 10 - c / 100, 2)
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    On commence par soustraire les unités : $${a}-${u}=${a - u}$.<br>
    Puis on soustrait la partie décimale de $${texNombre(u + d / 10 + c / 100, 2)}$ c'est-à-dire $${texNombre(d / 10 + c / 100, 2)}$. On obtient $${a - u}-${texNombre(d / 10 + c / 100)}=${texNombre(a - u - d / 10 - c / 100, 2)}$`)
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
