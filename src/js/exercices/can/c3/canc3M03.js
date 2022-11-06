import { choice, randint, texNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une somme de nombres avec des unités'
export const dateDePublication = '05/11/2022'
export const interactifReady = true
export const interactifType = 'mathLive'

/*!
 * @author Gilles Mora
 * Créé le 5/11/2022
 * Référence canc3M03
 */

export const uuid = '85e82'
export const ref = 'canc3M03'
export default function CalculAvecUnite () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.typeExercice = 'simple'
  this.formatInteractif = 'calcul'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const prefixes = ['k', 'h', 'da', '', 'd', 'c', 'm']

    const unite = choice(['g', 'm', 'L'])
    let k
    const a = randint(1, 9)
    const b = randint(1, 19)
    switch (choice([1, 2, 3])) {
      case 1:
        k = randint(0, 5)
        if (choice([true, false])) {
          this.question = `Compléter : <br>
        $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 1]}${unite} }= ${this.interactif ? '' : `\\ldots \\text{ ${prefixes[k + 1]}${unite}}`}$`
          this.reponse = a * 10 + b
          this.optionsChampTexte = { texteApres: `$\\text{ ${prefixes[k + 1]}${unite}}$` }
          this.correction = `$${a}\\text{ ${prefixes[k]}${unite} }=${a * 10}\\text{ ${prefixes[k + 1]}${unite} }$<br>
        Ainsi, $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 1]}${unite} }
        = ${a * 10}\\text{ ${prefixes[k + 1]}${unite}}+${b}\\text{ ${prefixes[k + 1]}${unite} }
        = ${a * 10 + b}\\text{ ${prefixes[k + 1]}${unite}}$.`
          this.canEnonce = 'Compléter. '
          this.canReponseACompleter = `$${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 1]}${unite} }= \\ldots \\text{ ${prefixes[k + 1]}${unite}}$`
        } else {
          this.question = `Compléter : <br>
        $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 1]}${unite} }= ${this.interactif ? '' : `\\ldots \\text{ ${prefixes[k]}${unite}}`}$`
          this.reponse = a + b / 10
          this.optionsChampTexte = { texteApres: `$\\text{ ${prefixes[k]}${unite}}$` }
          this.correction = `$${b}\\text{ ${prefixes[k + 1]}${unite} }=${texNombre(b / 10, 1)}\\text{ ${prefixes[k]}${unite} }$<br>
        Ainsi, $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 1]}${unite} }
        = ${a}\\text{ ${prefixes[k]}${unite}}+${texNombre(b / 10, 1)}\\text{ ${prefixes[k]}${unite} }
        = ${texNombre(a + b / 10, 1)}\\text{ ${prefixes[k]}${unite}}$.`
          this.canEnonce = 'Compléter. '
          this.canReponseACompleter = `$${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 1]}${unite} }= \\ldots \\text{ ${prefixes[k]}${unite}}$`
        }
        break

      case 2:
        k = randint(0, 4)
        if (choice([true, false])) {
          this.question = `Compléter : <br>
            $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 2]}${unite} }= ${this.interactif ? '' : `\\ldots \\text{ ${prefixes[k + 2]}${unite}}`}$`
          this.reponse = a * 100 + b
          this.optionsChampTexte = { texteApres: `$\\text{ ${prefixes[k + 2]}${unite}}$` }
          this.correction = `$${a}\\text{ ${prefixes[k]}${unite} }=${a * 100}\\text{ ${prefixes[k + 2]}${unite} }$<br>
            Ainsi, $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 2]}${unite} }
            = ${a * 100}\\text{ ${prefixes[k + 2]}${unite}}+${b}\\text{ ${prefixes[k + 2]}${unite} }
            = ${a * 100 + b}\\text{ ${prefixes[k + 2]}${unite}}$.`
          this.canEnonce = 'Compléter. '
          this.canReponseACompleter = `$${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 2]}${unite} }= \\ldots \\text{ ${prefixes[k + 2]}${unite}}$`
        } else {
          this.question = `Compléter : <br>
            $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 2]}${unite} }= ${this.interactif ? '' : `\\ldots \\text{ ${prefixes[k]}${unite}}`}$`
          this.reponse = a + b / 100
          this.optionsChampTexte = { texteApres: `$\\text{ ${prefixes[k]}${unite}}$` }
          this.correction = `$${b}\\text{ ${prefixes[k + 2]}${unite} }=${texNombre(b / 100, 2)}\\text{ ${prefixes[k]}${unite} }$<br>
            Ainsi, $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 2]}${unite} }
            = ${a}\\text{ ${prefixes[k]}${unite}}+${texNombre(b / 100, 2)}\\text{ ${prefixes[k]}${unite} }
            = ${texNombre(a + b / 100, 2)}\\text{ ${prefixes[k]}${unite}}$.`
          this.canEnonce = 'Compléter. '
          this.canReponseACompleter = `$${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 2]}${unite} }= \\ldots \\text{ ${prefixes[k]}${unite}}$`
        }
        break

      case 3:
        k = randint(0, 3)
        if (choice([true, false])) {
          this.question = `Compléter : <br>
                $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 3]}${unite} }= ${this.interactif ? '' : `\\ldots \\text{ ${prefixes[k + 3]}${unite}}`}$`
          this.reponse = a * 1000 + b
          this.optionsChampTexte = { texteApres: `$\\text{ ${prefixes[k + 3]}${unite}}$` }
          this.correction = `$${a}\\text{ ${prefixes[k]}${unite} }=${a * 1000}\\text{ ${prefixes[k + 3]}${unite} }$<br>
                Ainsi, $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 3]}${unite} }
                = ${a * 1000}\\text{ ${prefixes[k + 3]}${unite}}+${b}\\text{ ${prefixes[k + 3]}${unite} }
                = ${a * 1000 + b}\\text{ ${prefixes[k + 3]}${unite}}$.`
          this.canEnonce = 'Compléter. '
          this.canReponseACompleter = `$${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 3]}${unite} }= \\ldots \\text{ ${prefixes[k + 3]}${unite}}$`
        } else {
          this.question = `Compléter : <br>
                $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 3]}${unite} }= ${this.interactif ? '' : `\\ldots \\text{ ${prefixes[k]}${unite}}`}$`
          this.reponse = a + b / 1000
          this.optionsChampTexte = { texteApres: `$\\text{ ${prefixes[k]}${unite}}$` }
          this.correction = `$${b}\\text{ ${prefixes[k + 3]}${unite} }=${texNombre(b / 1000, 3)}\\text{ ${prefixes[k]}${unite} }$<br>
                Ainsi, $${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 3]}${unite} }
                = ${a}\\text{ ${prefixes[k]}${unite}}+${texNombre(b / 1000, 3)}\\text{ ${prefixes[k]}${unite} }
                = ${texNombre(a + b / 1000, 3)}\\text{ ${prefixes[k]}${unite}}$.`
          this.canEnonce = 'Compléter. '
          this.canReponseACompleter = `$${a}\\text{ ${prefixes[k]}${unite}}+${b}\\text{ ${prefixes[k + 3]}${unite} }= \\ldots \\text{ ${prefixes[k]}${unite}}$`
        }
        break
    }
  }
}
