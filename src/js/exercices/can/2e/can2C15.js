import FractionX from '../../../modules/FractionEtendue.js'
import { obtenirListeFractionsIrreductibles, choice, texFraction, randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer un nombre connaissant son inverse'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '10/11/2022'
/*!
 * @author Gilles Mora
 * Référence can2C15
*/

export default function NombreInverse () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fractionEgale'
  this.nouvelleVersion = function () {
    const maFraction = choice(obtenirListeFractionsIrreductibles())
    const a = randint(1, 4)
    const b = maFraction[0]
    const c = maFraction[1]
    const d = new FractionX(a * c + b, c)
    const e = new FractionX(a * c - b, c)
    const listeNom = ['R', 'x', 'y', 'T', 'z', 'U', 'A', 'B', 'C']
    const Nom = choice(listeNom)
    if (choice([true, false])) {
      this.reponse = new FractionX(a * c + b, c).inverse()
      this.question = `Calculer $${Nom}$  sachant que : <br>
     $\\dfrac{1}{${Nom}}=${a}+${texFraction(b, c)}$`
      this.correction = `$\\dfrac{1}{${Nom}}=${a}+${texFraction(b, c)} = \\dfrac{${a} \\times ${c}}{${c}} + \\dfrac{${b}}{${c}} = \\dfrac{${a * c}}{${c}} + \\dfrac{${b}}{${c}}  =${d.texFraction}$<br>
    Ainsi $${Nom}=${d.inverse().texFraction}$.`
      this.canEnonce = `$\\dfrac{1}{${Nom}}=${a}+${texFraction(b, c)}$`// 'Compléter'
      this.canReponseACompleter = `$${Nom}=\\ldots$`
    } else {
      this.reponse = new FractionX(a * c - b, c).inverse()
      this.question = `Calculer $${Nom}$  sachant que : <br>
         $\\dfrac{1}{${Nom}}=${a}-${texFraction(b, c)}$`
      this.correction = `$\\dfrac{1}{${Nom}}=${a}-${texFraction(b, c)} = \\dfrac{${a} \\times ${c}}{${c}} - \\dfrac{${b}}{${c}} = \\dfrac{${a * c}}{${c}} - \\dfrac{${b}}{${c}}  =${e.texFraction}$<br>
        Ainsi $${Nom}=${e.inverse().texFraction}$.`
      this.canEnonce = `$\\dfrac{1}{${Nom}}=${a}-${texFraction(b, c)}$`// 'Compléter'
      this.canReponseACompleter = `$${Nom}=\\ldots$`
    }
  }
}
