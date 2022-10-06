import { calcul, choice, randint, texNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Déterminer le chiffre des ...'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora & Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6N05
 */
export const uuid = '22f41'
export const ref = 'can6N05'
export default function ChiffreDes () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.consigne = ''
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const a = randint(1, 3)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const d = randint(1, 9, [a, b, c])
    const e = randint(1, 9, [a, b, c, d])
    const f = randint(1, 9, [a, b, c, d, e])
    const n = calcul(a * 100 + b * 10 + c + d * 0.1 + e * 0.01 + f * 0.001)
    const m = choice(['centaines', 'dizaines', 'dixièmes', 'centièmes', 'millièmes'])
    this.question = `Dans $${texNombre(n)}$ quel est le chiffre des ${m} ? `
    switch (m) {
      case 'centaines':
        this.reponse = a
        break
      case 'dizaines':
        this.reponse = b
        break
      case 'dixièmes':
        this.reponse = d
        break
      case 'centièmes':
        this.reponse = e
        break
      case 'millièmes':
        this.reponse = f
        break
    }
    this.correction = `Le chiffre des ${m} est $${this.reponse}$.<br>$\\begin{array}{|c|c|c|c|c|c|c|}\n`
    this.correction += '\\hline\n'
    this.correction += '\\\\\nCentaine &  Dizaine & Unité&  \\Large{\\textbf{,}}& Dixième & Centième & Millième \\\\\n \\\\\n'
    this.correction += '\\hline\n'
    this.correction += `\\\\\n${a}&${b}&${c} & \\Large{\\textbf{,}}& ${d}&${e}& ${f} \\\\\n \\\\\n`
    this.correction += '\\hline\n'
    this.correction += '\\end{array}\n$'
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
