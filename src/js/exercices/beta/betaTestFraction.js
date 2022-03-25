import Exercice from '../Exercice.js'
import { texNombre, listeQuestionsToContenu } from '../../modules/outils.js'
import FractionX from '../../modules/FractionEtendue'
import { Fraction } from 'mathjs'
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
  this.sup = 0
  this.sup2 = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.besoinFormulaireTexte = ['numérateur : ', '']
  this.besoinFormulaire2Texte = ['dénominateur : ', '']
  this.nouvelleVersion = function () {
    this.listeCorrections = []
    this.listeQuestions = []

    const a = Number(this.sup) // randint(101, 999) * randint(101, 999) * randint(101, 999) * randint(101, 999)
    const b = Number(this.sup2) // randint(101, 999) * randint(101, 999) * randint(101, 999) * randint(101, 999) / 10 ** 12
    const f1 = new FractionX(a, b)
    const f2 = new Fraction(a, b)
    console.log('Fraction selon FractionX : ', f1.num, ' / ', f1.den, ' fraction selon Fraction : ', f2.n, ' / ', f2.d)
    this.listeQuestions.push(`FractionX : $\\dfrac{${texNombre(f1.num)}}{${texNombre(f1.den)}}$<br><br>Fraction : $\\dfrac{${texNombre(f2.n)}}{${texNombre(f2.d)}}$`)
    this.listeCorrections.push('rien')
    listeQuestionsToContenu(this)
  }
}
