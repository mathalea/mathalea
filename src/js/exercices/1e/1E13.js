import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, ecritureParentheseSiNegatif, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, extraireRacineCarree, pgcd, egal } from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
import { choisiDelta } from '../../modules/fonctionsMaths.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const interactifReady = false
// export const interactifType = 'mathLive'
export const titre = 'Factoriser, si possible, un polynôme du second degré'

/**
 *
 * @author Stéphane Guyon
 * Référence 1E13
*/
export const uuid = '334ca'
export const ref = '1E13'
export default function Resolutionavecformecanonique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Factoriser un polynôme de degré 2: '
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacingCorr = 3
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (this.interactif) {
      this.consigne += '<br> '
    }
    const listeTypeDeQuestions = combinaisonListes([true, true, false], this.nbQuestions)
    for (let i = 0, texte, texteCorr, a, b, p, b2, x1String, x2String, stringX1, stringX2, x1, x2, c, delta, alpha, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      [a, b, c] = choisiDelta(listeTypeDeQuestions[i])
      alpha = fraction(-b, 2 * a)
      delta = b * b - 4 * a * c
      b2 = fraction(delta, 4 * a * a).simplifie() // terme b² dans l'expression a²-b²
      texte = `Facroriser, si cela est possible :  $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$. `
      texteCorr = `Facroriser, si cela est possible : $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$.`
      texteCorr += '<br>On reconnaît un polynôme du second degré sous la forme $ax^2+bx+c$.'
      texteCorr += '<br>On cherche les éventuelles racine(s) du polynôme.'
      texteCorr += '<br>On commence par calculer le discriminant : $\\Delta = b^2-4ac$'
      texteCorr += `<br>$\\Delta = ${b}^2-4 \\times ${ecritureParentheseSiNegatif(a)} \\times ${ecritureParentheseSiNegatif(c)}=${delta}$`

      // test des solutions
      if (delta < 0) {
        texteCorr += '<br>Le discriminant étant négatif, d\'après le cours, le polynôme n\'admet aucune racine réelle.'
        texteCorr += '<br>On en déduit que $S=\\emptyset$'
      } else if (delta > 0) { // Cas des deux solutions :
        texteCorr += '<br>Le discriminant étant positif, d\'après le cours, le polynôme admet deux racines réelles :'
        texteCorr += '<br>$x_1=\\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2=\\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
        texteCorr += `<br>$x_1=\\dfrac{-${ecritureParentheseSiNegatif(b)}-\\sqrt{${delta}}}{2\\times${ecritureParentheseSiNegatif(a)}}$ et $x_2=\\dfrac{-${ecritureParentheseSiNegatif(b)}+\\sqrt{${delta}}}{2\\times${ecritureParentheseSiNegatif(a)}}$`
        if (pgcd(Math.abs(b), Math.abs(2 * a)) === pgcd(extraireRacineCarree(delta)[0], Math.abs(2 * a))) {
          p = pgcd(Math.abs(b), Math.abs(2 * a))
        } else {
          p = 1
        }
        if (b2.estParfaite) { // pas de radical, calcul rationnel
          if (a < 0) {
            x2 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie().oppose()).simplifie()
            x1 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie()).simplifie()
          } else {
            x1 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie().oppose()).simplifie()
            x2 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie()).simplifie()
          }
          // if (a < 0) {
          x1String = x1.oppose().ecritureAlgebrique
          stringX1 = x1.texFractionSimplifiee
          x2String = x2.oppose().ecritureAlgebrique
          stringX2 = x2.texFractionSimplifiee
        /*  } else {
            x1String = x1.ecritureAlgebrique
            stringX1 = x1.oppose().texFractionSimplifiee
            x2String = x2.ecritureAlgebrique
            stringX2 = x2.oppose().texFractionSimplifiee
          } */
        } else { // présence d'un radical x1String contient ce qui est après x dans le facteur 1 stringX1 contient son opposé (transposé dans l'autre membre) Idem pour x2String et stringX2
          if (a < 0) {
            if (b < 0) { // a et b négatifs
              if (!egal(Math.abs(2 * a) / p, 1)) { // présence d'un dénominateur
                x1String = `+\\dfrac{${Math.round(-b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
                stringX1 = `\\dfrac{${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${Math.round(-b / p)}}{${Math.abs(Math.round(2 * a / p))}}`
                x2String = `+\\dfrac{${Math.round(-b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
                stringX2 = `\\dfrac{${Math.round(b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
              } else { // absence de trait de fraction
                x1String = `+${Math.round(-b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX1 = `${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${Math.round(-b / p)}`
                x2String = `+${Math.round(-b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX2 = `${Math.round(b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
              }
            } else { // a négatif, b positif
              if (!egal(Math.abs(2 * a) / p, 1)) { // présence d'un dénominateur
                x2String = `-\\dfrac{${Math.round(b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
                stringX2 = `\\dfrac{${Math.round(b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
                x1String = `-\\dfrac{${Math.round(b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
                stringX1 = `\\dfrac{${Math.round(b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
              } else { // absence de trait de fraction
                x2String = `-${Math.round(b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX2 = `${Math.round(b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                x1String = `-${Math.round(b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX1 = `${Math.round(b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
              }
            }
          } else {
            if (b < 0) { // a positif b négatif
              if (!egal(Math.abs(2 * a) / p, 1)) { // présence d'un dénominateur
                x2String = `-\\dfrac{${Math.round(-b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
                stringX2 = `\\dfrac{${Math.round(-b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
                x1String = `-\\dfrac{${Math.round(-b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
                stringX1 = `\\dfrac{${Math.round(-b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
              } else { // absence de trait de fraction
                x2String = `-${Math.round(-b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX2 = `${Math.round(-b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                x1String = `-${Math.round(-b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX1 = `${Math.round(-b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
              }
            } else { // a et b positifs
              if (!egal(Math.abs(2 * a) / p, 1)) { // présence d'un dénominateur
                x2String = `-\\dfrac{${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${Math.round(b / p)}}{${Math.abs(Math.round(2 * a / p))}}`
                stringX2 = `\\dfrac{${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${Math.round(b / p)}}{${Math.abs(Math.round(2 * a / p))}}`
                x1String = `+\\dfrac{${Math.round(b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
                stringX1 = `\\dfrac{${Math.round(-b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(Math.round(2 * a / p))}}`
              } else { // absence de trait de fraction
                x1String = `+${Math.round(b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX1 = `${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${Math.round(b / p)}`
                x2String = `+${Math.round(b / p)}+${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX2 = `${Math.round(-b / p)}-${rienSi1(extraireRacineCarree(delta)[0] / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
              }
            }
          }
        }
        texteCorr += `<br> Après simplification, on obtient : $x_1= ${stringX1}$ et  $x_2=${stringX2}$` // Solution
        texteCorr += '<br> d\'après le cours, on sait que le polynôme se factorise alors sous la forme : $a(x-x_1)(x-x_2)$'
        if (!egal(Math.abs(2 * a) / p, 1)) { // présence de traits de fraction donc réécriture du produit nul
          texteCorr += `<br> Finalement, $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=${rienSi1(a)}\\left(x ${x1String}\\right)\\left(x ${x2String}\\right)$`
        } else { // cas de delta  = 0
        // pour l'instant pas de delta nul avec choisiDelta
        }
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
