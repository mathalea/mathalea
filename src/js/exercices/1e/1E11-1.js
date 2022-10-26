
import Exercice from '../Exercice.js'
import { choice, combinaisonListes, contraindreValeur, lettreDepuisChiffre, listeQuestionsToContenuSansNumero, randint } from '../../modules/outils.js'
import FractionX from '../../modules/FractionEtendue.js'
import Trinome from '../../modules/Trinome.js'

export const titre = 'Calculer le discriminant d\'un polynôme du second degré'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '26/10/2022' // Utilisation de la classe Trinome par Rémi Angot
export const uuid = '731f0'
export const ref = '1E11-1'

export default function CalculerDiscriminant () {
  Exercice.call(this)
  this.besoinFormulaireNumerique = ['Niveaux de difficulté', 4, '1 : Coefficients entiers positifs\n2 : Coefficients entiers relatifs\n3 : Coefficients rationnels\n4 : Mélange']
  this.nbQuestions = 5
  this.sup = 1
  this.nouvelleVersion = function () {
    this.sup = contraindreValeur(1, 4, this.sup, 1)
    this.autoCorrection = []
    this.listeQuestions = []
    this.listeCorrections = []
    if (this.nbQuestions > 1) this.consigne = 'Calculer le discriminant de chacune de ces expressions :'
    else this.consigne = 'Calculer le discriminant de cett expression :'
    let listeTypesDeQuestions
    if (this.sup < 4) listeTypesDeQuestions = combinaisonListes([this.sup], this.nbQuestions)
    else listeTypesDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions)
    let a, b, c
    for (let i = 0, cpt = 0, texte, texteCorr; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypesDeQuestions[i]) {
        case 1 :
          a = randint(1, 5)
          b = randint(0, 5)
          c = randint(0, 5)
          break
        case 2 :
          a = randint(-5, 5, 0)
          b = randint(-5, 5)
          c = randint(-5, 5)
          break
        case 3 :
          a = new FractionX(randint(-9, 9), choice([2, 3, 5]))
          b = new FractionX(randint(-9, 9), choice([2, 3, 5]))
          c = new FractionX(randint(-9, 9), choice([2, 3, 5]))
          break
      }
      const p = new Trinome(a, b, c)

      texte = `$${lettreDepuisChiffre(i + 1)}(x) = ${p.tex}$.`
      texteCorr = `$\\Delta_${lettreDepuisChiffre(i + 1)} = ${p.texCalculDiscriminantSansResultat}$`
      texteCorr += `<br><br>$\\Delta_${lettreDepuisChiffre(i + 1)} = ${p.discriminant.texFractionSimplifiee}$`
      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
}
