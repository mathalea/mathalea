import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { simplificationDeFractionAvecEtapes, texFractionReduite } from '../../../modules/outils/arrayFractions.js'
import { fraction } from '../../../modules/fractions.js'
export const titre = 'Calculer une probabilité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can2P01
 */
export const uuid = '763d3'
export const ref = 'can2P01'
export default function CalculsDeProbabilites () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  // this.formatInteractif = 'fraction'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(2, 4)
    const b = choice([2, 3])
    const c = choice([2, 3, 11, 12])
    const p = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
    switch (choice(['a', 'b', 'b', 'b', 'c', 'c', 'd', 'd', 'd'])) {
      case 'a':
        this.question = "On lance deux fois de suite un dé équilibré.<br>Quelle est la probabilité d’obtenir deux fois le même nombre ?<br>Donner le résultat sous la forme d'une fraction irréductible."
        this.correction = "Sur $36$ cas possibles équiprobables, il y en a $6$ qui sont des doubles. Donc la probabilité d'obtenir deux fois le même nombre est $\\dfrac{6}{36}=\\dfrac{1}{6}$."
        this.reponse = fraction(1, 6)
        break
      case 'b':
        this.question = `Si on lance une pièce $${a}$ fois de suite, quelle est la probabilité d'obtenir PILE $${a}$ fois ?<br>Donner le résultat sous la forme d'une fraction irréductible.`
        this.correction = `A chaque lancer, la probabilité d'obtenir PILE est $\\dfrac{1}{2}$, donc si on lance $${a}$ fois la pièce, la probabilité d'obtenir $${a}$ fois PILE est $\\left(\\dfrac{1}{2}\\right)^${a}=\\dfrac{1}{${2 ** a}}$.`
        this.reponse = texFractionReduite(1, 2 ** a)
        break
      case 'c':
        this.question = `On lance un dé cubique équilibré.<br>Quelle est la probabilité d’obtenir un multiple de $${b}$ ?<br>Donner le résultat sous la forme d'une fraction irréductible.`
        this.correction = `Comme il y a $${5 - b}$ multiples de $${b}$, la probabilité d'ibtenir un multiple de $${b}$ est $\\dfrac{${5 - b}}{6}=\\dfrac{1}{${b}}$.`
        this.reponse = texFractionReduite(1, b)
        break
      case 'd':
        this.question = `On lance deux dés cubiques équilibrés.<br>Quelle est la probabilité d’obtenir un total de $${c}$ ?<br>Donner le résultat sous la forme d'une fraction irréductible.`
        this.correction = `Sur $36$ cas possibles équiprobables, il y en a $${p[c - 2]}$ qui donnent une somme de $${c}$. Donc la probabilité d'obtenir un total de $${c}$ est $\\dfrac{${p[c - 2]}}{36}${simplificationDeFractionAvecEtapes(p[c - 2], 36)}$.`
        this.reponse = texFractionReduite(p[c - 2], 36)
        break
    }
  }
}
