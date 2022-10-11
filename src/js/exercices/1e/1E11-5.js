import Exercice from '../Exercice.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { fraction } from '../../modules/fractions.js'
import { choisiDelta } from '../../modules/fonctionsMaths.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif, rienSi1 } from '../../modules/outils/ecritures.js'
import { extraireRacineCarree } from '../../modules/outils/factorisation.js'
import { pgcd } from '../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseenforme.js'
export const interactifReady = false
// export const interactifType = 'mathLive'
export const titre = 'Résoudre une équation du second degré avec le discriminant'

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @author Stéphane Guyon
 * Référence 1E11
*/
export const uuid = '3de81'
export const ref = '1E11-5'
export default function Resolutionavecdelta () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  // this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacingCorr = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (this.interactif) {
      this.consigne = '<br> '
    }
    const listeTypeDeQuestions = combinaisonListes([true, true, false], this.nbQuestions)
    for (let i = 0, texte, texteCorr, a, b, p, b2, stringX1, stringX2, x1, x2, c, delta, alpha, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      [a, b, c] = choisiDelta(listeTypeDeQuestions[i])
      alpha = fraction(-b, 2 * a)
      delta = b * b - 4 * a * c
      b2 = fraction(delta, 4 * a * a).simplifie() // terme b² dans l'expression a²-b²
      texte = `Résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$ .`
      texteCorr = `On veut résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0\\quad(1)$.`
      texteCorr += '<br>On reconnaît une équation du second degré sous la forme $ax^2+bx+c = 0$.'
      texteCorr += '<br>On commence par calculer le discriminant : $\\Delta = b^2-4ac$'
      texteCorr += `<br>$\\Delta = ${b}^2-4 \\times ${ecritureParentheseSiNegatif(a)} \\times ${ecritureParentheseSiNegatif(c)}=${delta}$`

      // test des solutions
      if (delta < 0) {
        texteCorr += '<br>Le discriminant étant négatif, d\'après le cours, l\'équation n\'admet pas de solutions réelles.'
        texteCorr += '<br>On en déduit que $S=\\emptyset$'
      } else if (delta > 0) { // Cas des deux solutions :
        texteCorr += '<br>Le discriminant étant positif, d\'après le cours, l\'équation admet deux solutions réelles :'
        texteCorr += '<br>$x_1=\\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2=\\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
        texteCorr += `<br>$x_1=\\dfrac{-${ecritureParentheseSiNegatif(b)}-\\sqrt{${delta}}}{2\\times${ecritureParentheseSiNegatif(a)}}$ et $x_2=\\dfrac{-${ecritureParentheseSiNegatif(b)}+\\sqrt{${delta}}}{2\\times${ecritureParentheseSiNegatif(a)}}$`
        if (pgcd(Math.abs(b), Math.abs(2 * a)) === pgcd(extraireRacineCarree(delta)[0], Math.abs(2 * a))) {
          p = pgcd(Math.abs(b), Math.abs(2 * a))
        } else {
          p = 1
        }
        if (b2.estParfaite) {
          if (a < 0) {
            x2 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie().oppose()).simplifie()
            x1 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie()).simplifie()
          } else {
            x1 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie().oppose()).simplifie()
            x2 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie()).simplifie()
          }

          //   if (a < 0) {
          stringX1 = x1.ecritureAlgebrique
          stringX2 = x2.ecritureAlgebrique
          /* } else {
            stringX1 = x1.oppose().ecritureAlgebrique
            stringX2 = x2.oppose().ecritureAlgebrique
          } */
        } else {
          if (a < 0) {
            if (b < 0) {
              stringX1 = `\\dfrac{${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${Math.round(-b / p)}}{${Math.abs(Math.round(2 * a / p))}}`
              stringX2 = `\\dfrac{${Math.round(b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
            } else {
              stringX2 = `\\dfrac{${Math.round(b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
              stringX1 = `\\dfrac{${Math.round(b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
            }
          } else {
            if (b < 0) {
              stringX1 = `\\dfrac{${Math.round(-b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
              stringX2 = `\\dfrac{${Math.round(-b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
            } else {
              stringX2 = `\\dfrac{${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${Math.round(b / p)}}{${Math.abs(Math.round(2 * a / p))}}`
              stringX1 = `\\dfrac{${Math.round(-b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
            }
          }
        }
        texteCorr += `<br> Après simplification, on obtient : $x_1= ${stringX1}$ et  $x_2=${stringX2}$` // Solution
        if (a < 0) {
          texteCorr += `<br> $S =\\left\\{${stringX2};${stringX1}\\right\\}$`
        } else {
          texteCorr += `<br> $S =\\left\\{${stringX1};${stringX2}\\right\\}$`
        }
      } else { // cas de delta  = 0
        // pour l'instant pas de delta nul avec choisiDelta
      }

      texte += ajouteChampTexteMathLive(this, i)
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
