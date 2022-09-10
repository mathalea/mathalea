import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, compareFractions, calcul, shuffle, miseEnEvidence, texFraction, combinaisonListes } from '../../modules/outils.js'

export const titre = 'Comparer quatre fractions (dénominateurs multiples) et un nombre entier'

/**
* 4 fractions aux dénominateurs multiples et un nombre entier sont donnés, il faut les classer dans l'ordre croissant ou décroissant
*
* Pour la correction, les fractions sont toute écrites avec un dénominateur commun avant d'être classées
* @author Rémi Angot
* 5N14-2
* Ajout du paramètre d'inclusion de nombres négatifs le 14/08/2021 : Guillaume Valmont
*/
export const uuid = 'ce9ca'
export const ref = '5N14-2'
export default function ExerciceComparerQuatreFractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Ranger les nombres suivants dans l'ordre croissant."
  this.spacing = 2
  context.isHtml ? this.spacingCorr = 4 : this.spacingCorr = 2.5
  this.nbQuestions = 2
  this.nbColsCorr = 1
  this.sup = false

  this.besoinFormulaireCaseACocher = ['Inclure des nombres négatifs']

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const listeSignes = combinaisonListes([-1, 1], this.nbQuestions * 4)
    for (let i = 0, denominateurs, n1, d1, n2, d2, n3, d3, n4, d4, k, positifOuNegatif = [], texte = '', texteCorr = ''; i < this.nbQuestions; i++) {
      if (this.sup === true) {
        positifOuNegatif[0] = listeSignes[4 * i]
        positifOuNegatif[1] = listeSignes[4 * i + 1]
        positifOuNegatif[2] = listeSignes[4 * i + 2]
        positifOuNegatif[3] = listeSignes[4 * i + 3]
      } else {
        positifOuNegatif[0] = 1
        positifOuNegatif[1] = 1
        positifOuNegatif[2] = 1
        positifOuNegatif[3] = 1
      }
      const listeDenominateurs = [[12, 2, 3, 4, 6], [16, 2, 4, 8], [18, 2, 3, 6, 9], [20, 2, 4, 5, 10], [24, 2, 3, 4, 8, 12], [30, 2, 3, 5, 6]]
      denominateurs = choice(listeDenominateurs)
      d1 = denominateurs[0]
      enleveElement(denominateurs, d1)
      d2 = choice(denominateurs)
      enleveElement(denominateurs, d2)
      d3 = choice(denominateurs)
      d4 = choice(denominateurs)
      k = randint(1, 3)
      n1 = randint(1, 10)
      n2 = randint(1, 10)
      n3 = randint(1, 10)
      n4 = choice([d4 + randint(1, 3), d4 * 2 + randint(1, 2), randint(1, 10)])
      // [num,den,calcul de mise au même dénominateur, num qui correspond au denominateur commun]
      while (((n1 / d1 - n2 / d2) * (n1 / d1 - n3 / d3) * (n1 / d1 - n4 / d4) * (n2 / d2 - n3 / d3) * (n2 / d3 - n4 / d4) * (n3 / d3 - n4 / d4) < 0.1) || (n1 % d1 === 0) || (n2 % d2 === 0) || (n3 % d3 === 0) || (n4 % d4 === 0)) {
        n1 = randint(1, 11)
        n2 = randint(1, 11)
        n3 = randint(1, 11)
        n4 = randint(1, 11)
      }
      n1 *= positifOuNegatif[0]
      n2 *= positifOuNegatif[1]
      n3 *= positifOuNegatif[2]
      n4 *= positifOuNegatif[3]
      const tableauFractions = [[n1, d1, `$${texFraction(n1, d1)}$`, `$${texFraction(n1, d1)}$`]]
      tableauFractions.push([n2, d2, `$${texFraction(n2, d2)} = ${texFraction(n2 + miseEnEvidence('\\times ' + calcul(d1 / d2)), d2 + miseEnEvidence('\\times ' + calcul(d1 / d2)))}=${texFraction(calcul(n2 * d1 / d2), d1)}$`, `$${texFraction(calcul(n2 * d1 / d2), d1)}$`])
      tableauFractions.push([n3, d3, `$${texFraction(n3, d3)} = ${texFraction(n3 + miseEnEvidence('\\times ' + calcul(d1 / d3)), d3 + miseEnEvidence('\\times ' + calcul(d1 / d3)))}=${texFraction(calcul(n3 * d1 / d3), d1)}$`, `$${texFraction(calcul(n3 * d1 / d3), d1)}$`])
      tableauFractions.push([n4, d4, `$${texFraction(n4, d4)} = ${texFraction(n4 + miseEnEvidence('\\times ' + calcul(d1 / d4)), d4 + miseEnEvidence('\\times ' + calcul(d1 / d4)))}=${texFraction(calcul(n4 * d1 / d4), d1)}$`, `$${texFraction(calcul(n4 * d1 / d4), d1)}$`])
      tableauFractions.push([k, 1, `$${k} = ${texFraction(d1 * k, d1)}$`, `$${texFraction(k * d1, d1)}$`])
      tableauFractions.sort(compareFractions)
      const tableauFractionsEnonce = shuffle(tableauFractions)
      texte = ''
      for (let j = 0; j < tableauFractionsEnonce.length; j++) {
        if (tableauFractionsEnonce[j][1] === 1) {
          texte += `$${tableauFractionsEnonce[j][0]}\\quad\\text{;}\\quad$`
        } else {
          texte += `$${texFraction(tableauFractionsEnonce[j][0], tableauFractionsEnonce[j][1])}\\quad\\text{;}\\quad$`
        }
      }
      texte = texte.substring(0, texte.length - 19) + '$' // Enlève les 21 derniers caractères (pour le ; de la fin)
      tableauFractions.sort(compareFractions)
      texteCorr = ''
      for (let j = 0; j < tableauFractionsEnonce.length; j++) {
        texteCorr += tableauFractionsEnonce[j][2]
        texteCorr += '<br>'
      }
      for (let j = 0; j < tableauFractions.length; j++) {
        texteCorr += tableauFractions[j][3]
        if (j < tableauFractions.length - 1) {
          texteCorr += '$\\quad<\\quad$'
        }
      }
      texteCorr += '<br>'
      let texteConclusion = ''
      for (let j = 0; j < tableauFractions.length; j++) {
        if (tableauFractions[j][1] === 1) {
          texteConclusion += `$${tableauFractions[j][0]}\\quad<\\quad$`
        } else {
          texteConclusion += `$${texFraction(tableauFractions[j][0], tableauFractions[j][1])}\\quad<\\quad$`
        }
      }
      texteCorr += 'Finalement : $\\quad$ ' + texteConclusion.substring(0, texteConclusion.length - 12) + '$'
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
}
