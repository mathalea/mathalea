import { randint } from '../../../modules/outils.js'
import { Yohaku } from '../../6e/Yohaku.js'
import Exercice from '../../Exercice.js'
export const titre = 'Multiplication à trou Yohaku'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '10/08/2022'

export const uuid = '892f2'
export const ref = 'can6C39'
export default function YohakuCan6b () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const laCase = randint(0, 3)
    const indexReponse = 3 - laCase
    const yohaku1 = new Yohaku({ type: 'entiers', largeur: 2, hauteur: 2, taille: 2, operation: 'multiplication', valeurMax: 10, solution: false, cellulesPreremplies: Array.from('abcd'), Case: laCase })
    yohaku1.calculeResultats()
    this.question = 'Les nombres en bout de ligne ou de colonne sont les produits des nombres contenus dans la ligne ou la colonne.<br>'
    this.question += `Donner la valeur de la case ${yohaku1.cellulesPreremplies[indexReponse]}<br>${yohaku1.representation()}`
    this.reponse = yohaku1.cellules[indexReponse]
    yohaku1.solution = true
    this.correction = `la valeur de la case ${yohaku1.cellulesPreremplies[indexReponse]} est : ${this.reponse}<br>`
    this.correction += yohaku1.representation()
  }
}
