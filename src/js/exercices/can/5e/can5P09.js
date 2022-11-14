import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { randint, choice, texNombre, texteEnCouleur, texPrix } from '../../../modules/outils.js'
export const titre = 'Calculer un prix à partir d\'un prix au kg'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '13/11/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/

export default function CalculPrix () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' €' }
  this.nouvelleVersion = function () {
    let a, b, n, b1, b2, reponse
    switch (choice([1])) { //,
      case 1:
        a = new Decimal(randint(6, 20)).div(10)
        n = choice([' de pommes de terre', ' de carottes', ' de courgettes', 'de navet', 'de poireau', 'd\'aubergines'])
        b = randint(1, 9) * 100
        b1 = new Decimal(b).div(1000)
        b2 = new Decimal(b1).mul(a)
        reponse = b1 * a
        this.question = `Le prix d'un kg ${n} est $${texPrix(a)}$ €. <br>
        Quel est le prix de $${b}$ g ? `
        this.optionsChampTexte = { texteApres: '€' }
        this.correction = `Comme $${b}$ g $=${texNombre(b1, 1)}$ kg, le  prix  de $${b}$ g ${n} est donné par : <br>
        $${texNombre(b1, 1)}\\times ${texPrix(a)}=${texNombre(b2, 2)}$.<br>
        Le prix de $${b}$ g ${n} est $${texPrix(b2)}$ €.`
        if (b !== 100) {
          if (b === 500) {
            this.correction += texteEnCouleur(`
  <br> Mentalement : <br>
  Multiplier par $0,5$ revient à diviser par $2$. <br>
  Ainsi, $${texNombre(b1, 1)}\\times ${texPrix(a)}=${texPrix(a)}\\div 2=${texPrix(reponse)}$.
  
`)
          } else {
            this.correction += texteEnCouleur(`
  <br> Mentalement : <br>
  $${texNombre(b1, 1)}\\times ${texPrix(a)}=${texNombre(b1 * 10, 1)}\\times 0,1\\times ${texPrix(a)}=${texNombre(b1 * 10, 1)}\\times ${texPrix(a / 10)}=${texPrix(reponse)}$.
  
`)
          }
        } else { this.correction += '' }

        this.reponse = reponse
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = '$\\ldots$ €'
  }
}
