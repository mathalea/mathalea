import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import FractionX from '../../modules/FractionEtendue'
import { Fraction, evaluate } from 'mathjs'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive'
import { setReponse } from '../../modules/gestionInteractif.js'
import { fraction } from '../../modules/fractions.js'
import { ComputeEngine } from '@cortex-js/compute-engine'

export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Tester la classe FractionX'
export const dateDePublication = '20/03/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Rémi Angot
 * Référence
*/
export default function testFractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.sup = randint(1, 1000)
  this.sup2 = randint(2, 1000)
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.besoinFormulaireTexte = ['numérateur ', '']
  this.besoinFormulaire2Texte = ['dénominateur ', '']
  this.nouvelleVersion = function () {
    const engine = new ComputeEngine({ numericMode: 'decimal', numericPrecision: 30 })
    const rac3 = engine.parse('\\frac{\\sqrt{3}}{2}')
    const sinPiSur3 = engine.parse('\\sin{\\frac{\\pi}{3}}')
    console.log(rac3.valueOf(), sinPiSur3.valueOf())

    this.listeCorrections = []
    this.listeQuestions = []
    console.log(fraction(1 / 6))
    const a = Number(evaluate(this.sup)) // randint(101, 999) * randint(101, 999) * randint(101, 999) * randint(101, 999)
    const b = Number(evaluate(this.sup2)) // randint(101, 999) * randint(101, 999) * randint(101, 999) * randint(101, 999) / 10 ** 12
    const f1 = new FractionX(a, b)
    const f2 = new Fraction(a, b)
    setReponse(this, 0, f1, { formatInteractif: 'fractionEgale' })
    console.log('Fraction selon FractionX : ', f1.num, ' / ', f1.den, ' fraction selon Fraction : ', f2.n, ' / ', f2.d)
    this.listeQuestions.push('Saisir une fraction ou ce que vous voulez : ' + ajouteChampTexteMathLive(this, 0, 'largeur25 inline'))
    this.listeCorrections.push(`FractionX : $\\dfrac{${f1.num}}{${f1.den}}$<br><br>Fraction : $\\dfrac{${f2.n}}{${f2.d}}$`)

    listeQuestionsToContenu(this)
  }
}
