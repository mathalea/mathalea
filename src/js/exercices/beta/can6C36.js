import { randint } from '../../modules/outils.js'
import { Yohaku } from '../beta/betaYohaku.js'
import Exercice from '../Exercice.js'
export const titre = 'Addition à trou Yohaku'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '10/08/2022'

export default function YohakuCan6a () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const laCase = randint(0, 3)
    const indexReponse = 3 - laCase
    const yohaku1 = new Yohaku({ type: 'entiers', largeur: 2, hauteur: 2, taille: 2, operation: 'addition', valeurMax: 10, solution: false, cellulesPreremplies: Array.from('abcd'), Case: laCase })
    yohaku1.calculeResultats()
    this.question = 'Les nombres en bout de ligne ou de colonne sont les sommes des nombres contenus dans la ligne ou la colonne.<br>'
    this.question += `Donner la valeur de la case ${yohaku1.cellulesPreremplies[indexReponse]}<br>${yohaku1.representation()}`
    this.reponse = yohaku1.cellules[indexReponse]
    console.log(indexReponse, yohaku1)
    yohaku1.solution = true
    this.correction = `la valeur de la case ${yohaku1.cellulesPreremplies[indexReponse]} est : ${this.reponse}<br>`
    this.correction += yohaku1.representation()
  }
}
