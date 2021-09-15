import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, calcul, texFraction } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import Fraction from '../../modules/Fraction.js'
export const titre = 'Variation en pourcentages'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
* Essai sur les fractions
* 5N110
*/
export default function VariationEnPourcentages () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Ecrire la valeur décimale de la fraction. Ecrire la fraction décimale du nombre.'
  this.nbQuestions = 4
  this.spacing = 1
  this.spacingCorr = 2
  this.nbColsCorr = 1
  this.nbCols = 1
    this.interactifType = 'mathLive'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const nombrePremier = [2, 3, 5, 7, 11]
    let c, d
    for (let i = 0, a, b, texte, texteCorr, solution, k, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // prix = choice([randint(2, 9), randint(1, 9) * 10, randint(1, 9) * 100, calcul(randint(11, 99) / 10)])
      // X | X0 | X00 | X,X0
      // taux = choice([20, 30, 40, 60])
      switch (i) {
        case 0:
          a = randint(2, 9)
          b = 10
          solution = calcul(a / b)
          texte = `Ecrire la valeur décimale égale à : $${texFraction(a, b)}.$`
          texte += ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br>'
          setReponse(this, i, solution)
          texteCorr = 'à faire'
          break
        case 1:
          a = randint(1, 9)
          b = 10
          texte = `Ecrire la fraction décimale de dénominateur 10 égale à 0,${a}.`
          texte += ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br>'
          setReponse(this, i, new Fraction(a, 10), { formatInteractif: 'fraction' })
          texteCorr = 'à faire'
          break
        case 2:
          c = randint(0, 4)
          a = nombrePremier[c] // var 1 est le nbre d iris, de croissants ou de garçons
          d = randint(0, 4, [c])
          b = nombrePremier[d]
          k = randint(2, 11)
          texte = `Ecrire la valeur simplifiée de ${a} ${b} : $${texFraction(k * a, k * b)}.$`
          texteCorr = 'à faire'
          texte += ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br>'
          //
          setReponse(this, i, new Fraction(a, k * b), { formatInteractif: 'fraction' })
          break
          case 3:
          c = randint(0, 4)
          a = nombrePremier[c] // var 1 est le nbre d iris, de croissants ou de garçons
          d = randint(0, 4, [c])
          b = nombrePremier[d]
          k = randint(2, 11)
          texte = `Ecrire la valeur simplifiée de ${a} ${b} : $${texFraction(k * a, k * b)}.$`
          texteCorr = 'à faire'
          texte += ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br>'
          //
          setReponse(this, i, new Fraction(a, k * b), { formatInteractif: 'fraction' })
          break
      }// fin du switch

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    } // fin for
    listeQuestionsToContenu(this)
  }
}
