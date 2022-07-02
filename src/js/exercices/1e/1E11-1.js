
import Exercice from '../Exercice.js'
import { combinaisonListes, contraindreValeur, lettreDepuisChiffre, listeQuestionsToContenu } from '../../modules/outils.js'
import { aleaVariables, aleaExpression, toTex } from '../../modules/outilsMathjs.js'
import { create, all } from 'mathjs'
import { context } from '../../modules/context'
import { fraction } from '../../modules/fractions.js'

export const titre = 'Calculer le discriminant d\'un polynôme du second degré'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export default function CalculerDiscriminant () {
  Exercice.call(this)
  this.besoinFormulaireNumerique = ['Niveaux de difficulté', 4, '1 : Coefficients entiers positifs\n2 : Coefficients entiers relatifs\n3 : Coefficients rationnels\n4 : Mélange']
  this.nbQuestions = 5
  this.sup = 1
  this.nouvelleVersion = function () {
    const math = create(all)
    math.config({ number: 'number', randomSeed: context.graine })
    this.sup = contraindreValeur(1, 4, this.sup, 1)
    this.autoCorrection = []
    this.listeQuestions = []
    this.listeCorrections = []
    let listeTypesDeQuestions
    if (this.sup < 4) listeTypesDeQuestions = combinaisonListes([this.sup], this.nbQuestions)
    else listeTypesDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions)
    for (let i = 0, cpt = 0, coeffs = {}, a, b, c, expression, texte, texteCorr, delta; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypesDeQuestions[i]) {
        case 1 :
          coeffs = aleaVariables({
            a: 'randomInt(1,5)',
            b: 'randomInt(1,5)',
            c: 'randomInt(1,5)',
            test: 'a<6'
          })
          expression = toTex(aleaExpression('a*x^2+b*x+c', coeffs))
          a = fraction(coeffs.a)
          b = fraction(coeffs.b)
          c = fraction(coeffs.c)
          break
        case 2 :
          coeffs = aleaVariables({
            a: 'randomInt(1,5)*pickRandom([-1,1])',
            b: 'randomInt(1,5)*pickRandom([-1,1])',
            c: 'randomInt(1,5)*pickRandom([-1,1])',
            test: 'a<6'
          })
          expression = toTex(aleaExpression('a*x^2+b*x+c', coeffs))
          a = fraction(coeffs.a)
          b = fraction(coeffs.b)
          c = fraction(coeffs.c)
          break
        case 3 :
          coeffs = aleaVariables({
            Anum: 'randomInt(1,9)',
            Bnum: 'randomInt(1,9)',
            Cnum: 'randomInt(1,9)',
            Aden: 'pickRandom([2,3,5])',
            Bden: 'pickRandom([2,3,5])',
            Cden: 'pickRandom([2,3,5])',
            an: 'Anum/gcd(Anum,Aden)',
            ad: 'Aden/gcd(Anum,Aden)',
            bn: 'Bnum/gcd(Bnum,Bden)',
            bd: 'Bden/gcd(Bnum,Bden)',
            cn: 'Cnum/gcd(Cnum,Cden)',
            cd: 'Cden/gcd(Cnum,Cden)',
            a: 'an/ad',
            b: 'bn/bd',
            c: 'cn/cd',
            test: 'a<6'
          })
          expression = toTex(aleaExpression('an/ad*x^2+bn/bd*x+cn/cd', coeffs))
          a = fraction(coeffs.an, coeffs.ad)
          b = fraction(coeffs.bn, coeffs.bd)
          c = fraction(coeffs.cn, coeffs.cd)
          break
      }

      delta = fraction(b.puissanceFraction(2).differenceFraction(a.multiplieEntier(4).produitFraction(c)))

      texte = `Calculer le discriminant de : $${lettreDepuisChiffre(i + 1)} = ${expression}$.`
      texteCorr = `$\\Delta_${lettreDepuisChiffre(i + 1)} =b^2-4ac=${b.texParentheses}^2 - 4 \\times ${a.texFSP} \\times ${c.texFSP}=${b.puissanceFraction(2).texFSD} - ${a.multiplieEntier(4).produitFraction(c).texFSP}=${delta.toLatex()}$`
      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
