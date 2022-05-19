import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, arrondi, simplificationDeFractionAvecEtapes, calcul, texNombrec, miseEnEvidence, texFraction } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Calculer la fraction d\'un nombre'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Calculer la fracton d'un nombre divisible par le dénominateur ... ou pas.
 *
 * Par défaut la division du nombre par le dénominateur est inférieure à 11
 * @author Rémi Angot + Jean-Claude Lhote
 * référence 6N33
 */
export default function FractionDUnNombre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 5
  this.consigne = 'Calculer :'
  context.isHtml ? (this.spacingCorr = 3.5) : (this.spacingCorr = 2)
  context.isHtml ? (this.spacing = 2) : (this.spacing = 2)
  this.sup = true
  this.sup2 = false
  this.nbCols = 2
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const listeFractions = [
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [3, 4],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [1, 6],
      [5, 6],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [1, 8],
      [3, 8],
      [5, 8],
      [7, 8],
      [1, 9],
      [2, 9],
      [4, 9],
      [5, 9],
      [7, 9],
      [8, 9],
      [1, 10],
      [3, 10],
      [7, 10],
      [9, 10]
    ] // Couples de nombres premiers entre eux

    for (
      let i = 0, a, b, k, n, j, fraction, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      fraction = choice(listeFractions)
      a = fraction[0]
      b = fraction[1]
      k = randint(1, 11)
      j = false
      if (this.sup || context.isAMC) n = b * k
      else if (randint(0, 1) === 0) n = b * k
      else n = randint(10, b * 11)
      texte = `$${texFraction(a, b)}\\times${n}=$`
      texteCorr = ''
      if (a === 1) {
        // Si n * 1/b
        if (calcul(n / b - arrondi(n / b, 4)) === 0) {
          texteCorr += `$${texFraction(
            a,
            miseEnEvidence(b)
          )}\\times${n}=${n}\\div${miseEnEvidence(b)}=${texNombrec(
            calcul(n / b)
          )}$`
        } else { // si résultat décimal
          texteCorr += `$${texFraction(a, b)}\\times${n}=${texFraction(
            n,
            b
          )}${simplificationDeFractionAvecEtapes(n, b)}$`
        } // si résultat non décimal
      } else {
        if (calcul(n / b - arrondi(n / b, 4)) === 0) {
          // si n/b décimal calcul (n/b)*a
          texteCorr += `$${texFraction(
            a,
            miseEnEvidence(b)
          )}\\times${n}=(${n}\\div${miseEnEvidence(
            b
          )})\\times${a}=${texNombrec(
            calcul(n / b)
          )}\\times${a}=${texNombrec(calcul((n / b) * a))}$<br>`
        } else {
          if (calcul((n * a) / b - arrondi((n * a) / b, 4)) === 0) {
            // si n/b non décimal, alors on se rabat sur (n*a)/b
            texteCorr += ` $${texFraction(
              a,
              miseEnEvidence(b)
            )}\\times${n}=(${n}\\times${a})\\div${miseEnEvidence(
              b
            )}=${calcul(n * a)}\\div${miseEnEvidence(
              b
            )}=${texNombrec(calcul((n / b) * a))}$<br>`
          } else {
            // si autre méthode et résultat fractionnaire calcul (n*a)/b
            texteCorr += ` $${texFraction(
              a,
              miseEnEvidence(b)
            )}\\times${n}=(${n}\\times${a})\\div${miseEnEvidence(
              b
            )}=${calcul(n * a)}\\div${miseEnEvidence(
              b
            )}=${texFraction(n * a, miseEnEvidence(b))}$<br>`
          }
          j = true
        }
        if (
          calcul((n * a) / b - arrondi((n * a) / b, 4)) === 0 &&
          this.sup2 &&
          !j
        ) {
          // Si autres méthodes et si (a*n)/b décimal calcul (n*a)/b
          texteCorr += ` $${texFraction(
            a,
            miseEnEvidence(b)
          )}\\times${n}=(${n}\\times${a})\\div${miseEnEvidence(
            b
          )}=${calcul(n * a)}\\div${miseEnEvidence(b)}=${texNombrec(
            calcul((n / b) * a)
          )}$<br>`
        } else {
          // si autre méthode et résultat fractionnaire calcul (n*a)/b
          if (this.sup2 && !j) {
            texteCorr += ` $${texFraction(
              a,
              miseEnEvidence(b)
            )}\\times${n}=(${n}\\times${a})\\div${miseEnEvidence(
              b
            )}=${calcul(n * a)}\\div${miseEnEvidence(
              b
            )}=${texFraction(n * a, miseEnEvidence(b))}$<br>`
          }
        }
        // si autre méthode et a/b décimal calcul (a/b)*n
        if ((b === 2 || b === 4 || b === 5 || b === 8 || b === 10) && this.sup2) {
          texteCorr += ` $${texFraction(
            a,
            miseEnEvidence(b)
          )}\\times${n}=(${a}\\div${miseEnEvidence(
            b
          )})\\times${n}=${texNombrec(
            calcul(a / b)
          )}\\times${n}=${texNombrec(calcul((n / b) * a))}$`
        }
      }

      setReponse(this, i, calcul(n * a / b))
      if (n * a % b !== 0 && !context.isAmc) {
        setReponse(this, i, [calcul(n * a / b), texFraction(n * a, b)])
      }
      texte += ajouteChampTexteMathLive(this, i)
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
        this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: '' }]
        this.autoCorrection[i].reponse.param.digits = 2
        this.autoCorrection[i].reponse.param.decimals = 0
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Forcer résultat entier', true]
  this.besoinFormulaire2CaseACocher = ['Plusieurs méthodes', false]
}
