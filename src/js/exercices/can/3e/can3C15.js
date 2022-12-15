import Exercice from '../../Exercice.js'
import { randint, texNombre, choice, arrondi } from '../../../modules/outils.js'
export const titre = 'Calculer des sommes contenant des puissances de 10'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '20/11/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Référence can3C15
 * Date de publication
*/

export const uuid = '864ba'
export const ref = 'can3C15'
export default function CalculPuissance10B () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let reponse, n1, n2, n3
    switch (choice([1, 2, 3])) {
      case 1:
        n1 = randint(2, 4)
        n2 = randint(-3, 0)
        n3 = randint(1, 6)
        reponse = arrondi(10 ** n1 + 10 ** n2, 3)
        this.question = `Calculer $10^{${n1}}+10^{${n2}}$.`
        this.correction = `$10^{${n1}}+10^{${n2}}=${texNombre(10 ** n1)} +${texNombre(10 ** n2, 3)}=${texNombre(reponse, 3)}$`
        break

      case 2:
        n1 = randint(2, 4)
        n2 = randint(-3, 0)
        n3 = randint(-3, 3, 0)
        reponse = arrondi(10 ** n1 + 10 ** n2 + 10 ** n3, 3)
        this.question = `Calculer $10^{${n1}}+10^{${n2}}+10^{${n3}}$.`
        this.correction = `$10^{${n1}}+10^{${n2}}+10^{${n3}}=${texNombre(10 ** n1)} +${texNombre(10 ** n2, 3)}+${texNombre(10 ** n3, 3)}=${texNombre(reponse, 3)}$`
        console.log(reponse)
        break

      case 3:
        n1 = randint(2, 4)
        n2 = randint(-3, 0)
        reponse = arrondi(10 ** n1 - 10 ** n2, 3)
        this.question = `Calculer $10^{${n1}}-10^{${n2}}$.`
        this.correction = `$10^{${n1}}-10^{${n2}}=${texNombre(10 ** n1)} -${texNombre(10 ** n2, 3)}=${texNombre(reponse, 3)}$`
        break
    }
    this.reponse = reponse
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
