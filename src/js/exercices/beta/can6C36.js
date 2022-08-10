import { randint } from '../../modules/outils.js'
import { Yohaku } from '../beta/betaYohaku.js'
import Exercice from '../Exercice.js'
export const titre = 'Addition à trou Yohaku'

export default function YohakuCan6a () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const laCase = randint(0, 3)
    const indexReponse = randint(0, 3, laCase)
    const yohaku1 = new Yohaku({ type: 'entiers', largeur: 2, hauteur: 2, taille: 2, operation: 'addition', valeurMax: 10, solution: false, cellulesPreremplies: Array.from('abcd'), Case: laCase })
    this.question = yohaku1.representation()
    this.reponse = this.cellules[indexReponse]
    yohaku1.solution = true
  }
}
