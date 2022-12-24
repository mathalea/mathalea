import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, range1, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif, miseEnEvidence, listeDesDiviseurs, lettreDepuisChiffre } from '../../modules/outils.js'
export const titre = 'Calculs utilisant les priorités opératoires'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Plusieurs type de calcul avec des entiers.
 *
 * Sans parenthèses :
 * * a+b*c
 * * a+b÷c
 * * a/b*c
 * * a*b÷c
 * * a*b+c
 * * a-b+c
 * * a+b+c*d
 * * a*b+c*d
 * * a*b*c+d
 * * a*b-c÷d
 * * a*b+c÷d
 *
 * Avec parenthèses :
 * * a*(b-c)
 * * (a-b)*c
 * * (a-b)÷c
 * * a÷(b+c)
 * * (a-b)÷c
 * * a*(b-c)*d
 * * a*b*(c-d)
 * * a*(b-c*d)
 * * (a+b*c)÷d
 * * a*(b-c*d)
 * * a*b÷(c+d)
 * * a*(b÷c+d)
 * * a-(b+c)
 * * (a+b+c)*d
 * @author Rémi Angot
 * 4C11
 */
export const uuid = '62f66'
export const ref = '4C11'
export default function PrioritesEtRelatifs () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Calculer.'
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 1
  this.sup = 3

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeQuestionsDisponibles
    if (this.sup === 1) {
      listeQuestionsDisponibles = range1(11)
    } else if (this.sup === 2) {
      listeQuestionsDisponibles = range1(20, range1(11))
    } else {
      listeQuestionsDisponibles = range1(20)
    }
    const listeTypeDeQuestions = combinaisonListes(
      listeQuestionsDisponibles,
      this.nbQuestions
    )
    for (let i = 0, texte, texteCorr, a, b, c, d, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 1: // a+b*c
          a = randint(2, 11) * choice([-1, 1])
          b = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1])
            b = randint(2, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${a}${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(c)}$`
          texteCorr = `$${a}${miseEnEvidence('~' + ecritureAlgebrique(b) + '\\times' + ecritureParentheseSiNegatif(c))}=${a}${ecritureAlgebrique(b * c)
            }=${a + b * c}$`
          setReponse(this, i, a + b * c)
          break
        case 2: // a+b/c
          a = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          b = c * randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
            b = c * randint(2, 11) * choice([-1, 1])
          }
          texte = `$${a}${ecritureAlgebrique(b)}\\div${ecritureParentheseSiNegatif(c)}$`
          texteCorr = `$${a}${miseEnEvidence('~' + ecritureAlgebrique(b) + '\\div' + ecritureParentheseSiNegatif(c))}=${a}${ecritureAlgebrique(b / c)
            }=${a + b / c}$`
          setReponse(this, i, a + b / c)
          break
        case 3: // a/b*c
          b = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          a = b * randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            b = randint(2, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
            a = b * randint(2, 11) * choice([-1, 1])
          }
          texte = `$${a}\\div${ecritureParentheseSiNegatif(b)}\\times${ecritureParentheseSiNegatif(c)}$`
          texteCorr = `$${miseEnEvidence(a + '\\div' + ecritureParentheseSiNegatif(b))}\\times${ecritureParentheseSiNegatif(c)}=${a / b
            }\\times${ecritureParentheseSiNegatif(c)}=${(a / b) * c}$`
          setReponse(this, i, (a / b) * c)
          break
        case 4: // a*b/c
          if (choice([true, false])) {
            // a est un multiple de c
            c = randint(2, 6) * choice([-1, 1])
            a = c * randint(2, 5) * choice([-1, 1])
            b = randint(2, 6) * choice([-1, 1])
            while (a > 0 && b > 0 && c > 0) {
              c = randint(2, 6) * choice([-1, 1])
              a = c * randint(2, 5) * choice([-1, 1])
              b = randint(2, 6) * choice([-1, 1])
            }
          } else {
            // b est un multiple de c
            c = randint(2, 6) * choice([-1, 1])
            b = c * randint(2, 5) * choice([-1, 1])
            a = randint(2, 6) * choice([-1, 1])
            while (a > 0 && b > 0 && c > 0) {
              c = randint(2, 6) * choice([-1, 1])
              b = c * randint(2, 5) * choice([-1, 1])
              a = randint(2, 6) * choice([-1, 1])
            }
          }
          texte = `$${a}\\times${ecritureParentheseSiNegatif(b)}\\div${ecritureParentheseSiNegatif(c)}$`
          texteCorr = `$${miseEnEvidence(a + '\\times' + ecritureParentheseSiNegatif(b))}\\div${ecritureParentheseSiNegatif(c)}=${a * b
            }\\div${ecritureParentheseSiNegatif(c)}=${(a * b) / c}$`
          setReponse(this, i, (a * b) / c)
          break
        case 5: // a*b+c
          a = randint(2, 11) * choice([-1, 1])
          b = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1])
            b = randint(2, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${a}\\times${ecritureParentheseSiNegatif(b)}${ecritureAlgebrique(c)}$`
          texteCorr = `$${miseEnEvidence(a + '\\times' + ecritureParentheseSiNegatif(b))}${ecritureAlgebrique(c)}=${a * b
            }${ecritureAlgebrique(c)}=${a * b + c}$`
          setReponse(this, i, a * b + c)
          break
        case 6: // a-b+c
          a = randint(2, 11) * choice([-1, 1])
          b = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1])
            b = randint(2, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${a}-(${ecritureAlgebrique(b)})${ecritureAlgebrique(c)}$`
          texteCorr = `$${a}${miseEnEvidence(ecritureAlgebrique(-b))}${ecritureAlgebrique(c)}=${a - b}${ecritureAlgebrique(c)}=${a - b + c
            }$`
          setReponse(this, i, a - b + c)
          break
        case 7: // a+b+c*d
          a = randint(2, 20) * choice([-1, 1])
          b = randint(2, 20) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          d = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a = randint(2, 20) * choice([-1, 1])
            b = randint(2, 20) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
            d = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${a}${ecritureAlgebrique(b)}${ecritureAlgebrique(c)}\\times${ecritureParentheseSiNegatif(d)}$`
          texteCorr = `$${a}${ecritureAlgebrique(b)}${miseEnEvidence(
            ecritureAlgebrique(c) + '\\times' + ecritureParentheseSiNegatif(d)
          )}=${a}${ecritureAlgebrique(b)}${ecritureAlgebrique(c * d)}=${a + b + c * d}$`
          setReponse(this, i, a + b + c * d)
          break
        case 8: // a*b+c*d
          a = randint(2, 11) * choice([-1, 1])
          b = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          d = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a = randint(2, 20) * choice([-1, 1])
            b = randint(2, 20) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
            d = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${a}\\times${ecritureParentheseSiNegatif(b)}${ecritureAlgebrique(c)}\\times${ecritureParentheseSiNegatif(d)}$`
          texteCorr = `$${a + miseEnEvidence('\\times') + ecritureParentheseSiNegatif(b)
            }${ecritureAlgebrique(c) + miseEnEvidence('\\times') + ecritureParentheseSiNegatif(d)}=${a * b}${ecritureAlgebrique(c * d)}=${a * b + c * d
            }$`
          setReponse(this, i, a * b + c * d)
          break
        case 9: // a*b*c+d
          a = randint(2, 5) * choice([-1, 1])
          b = randint(2, 5) * choice([-1, 1])
          c = randint(2, 5) * choice([-1, 1])
          d = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a = randint(2, 5) * choice([-1, 1])
            b = randint(2, 5) * choice([-1, 1])
            c = randint(2, 5) * choice([-1, 1])
            d = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${a}\\times${ecritureParentheseSiNegatif(b)}\\times${ecritureParentheseSiNegatif(c)}${ecritureAlgebrique(d)}$`
          texteCorr = `$${miseEnEvidence(
            a + '\\times' + ecritureParentheseSiNegatif(b)
          )}\\times${ecritureParentheseSiNegatif(c)}${ecritureAlgebrique(d)}=${miseEnEvidence(a * b + '\\times' + ecritureParentheseSiNegatif(c))}${ecritureAlgebrique(d)}
          =${a * b * c}${ecritureAlgebrique(d)}
          =${a * b * c + d}$`
          setReponse(this, i, a * b * c + d)
          break
        case 10:
          a = randint(2, 11) * choice([-1, 1])
          b = randint(2, 11) * choice([-1, 1])
          d = randint(2, 11) * choice([-1, 1])
          c = d * randint(2, 8) * choice([-1, 1])
          texte = `$${a}\\times${ecritureParentheseSiNegatif(b)}${ecritureAlgebrique(c)}\\div${ecritureParentheseSiNegatif(d)}$`
          texteCorr = `$${a + miseEnEvidence('\\times') + ecritureParentheseSiNegatif(b) +
            ecritureAlgebrique(c) + miseEnEvidence('\\div') + ecritureParentheseSiNegatif(d)}=${a * b}${ecritureAlgebrique(c / d)}=${a * b + c / d
            }$`
          setReponse(this, i, a * b + c / d)
          break
        case 11: // a*(b+c)
          a = randint(2, 11) * choice([-1, 1])
          b = randint(1, 11) * choice([-1, 1])
          c = randint(1, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1])
            b = randint(1, 11) * choice([-1, 1])
            c = randint(1, 11) * choice([-1, 1])
          }
          texte = `$${a}\\times(${b}${ecritureAlgebrique(c)})$`
          texteCorr = `$${a}\\times(${miseEnEvidence(b + ecritureAlgebrique(c))})=${a}\\times${ecritureParentheseSiNegatif(b + c)}=${a * (b + c)}$`
          setReponse(this, i, a * (b + c))
          break
        case 12: // (a+b)*c
          a = randint(1, 11) * choice([-1, 1])
          b = randint(1, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(1, 11) * choice([-1, 1])
            b = randint(1, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
          }
          texte = `$(${a}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiNegatif(c)}$`
          texteCorr = `$(${miseEnEvidence(a + ecritureAlgebrique(b))})\\times${ecritureParentheseSiNegatif(c)}=${a + b}\\times${ecritureParentheseSiNegatif(c)}=${(a + b) * c}$`
          setReponse(this, i, (a + b) * c)
          break
        case 13: // (a+b)/c
          c = randint(2, 11) * choice([-1, 1])
          b = randint(11, 39) * choice([-1, 1])
          a = c * randint(2, 9) * [choice([-1, 1])] - b
          while (a > 0 && b > 0 && c > 0) {
            c = randint(2, 11) * choice([-1, 1])
            b = randint(11, 39) * choice([-1, 1])
            a = c * randint(2, 9) * [choice([-1, 1])] - b
          }
          texte = `$(${a}${ecritureAlgebrique(b)})\\div${ecritureParentheseSiNegatif(c)}$`
          texteCorr = `$(${miseEnEvidence(a + ecritureAlgebrique(b))})\\div${ecritureParentheseSiNegatif(c)}=${a + b
            }\\div${ecritureParentheseSiNegatif(c)}=${(a + b) / c}$`
          setReponse(this, i, (a + b) / c)
          break
        case 14: // a/(b+c)
          b = randint(-5, 5, [-1, 0, 1])
          c = randint(-6, 6, [-1, 0, 1, -b])
          a = (b + c) * randint(2, 9) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            b = randint(-5, 5, [-1, 0, 1])
            c = randint(-6, 6, [-1, 0, 1, -b])
            a = (b + c) * randint(2, 9) * choice([-1, 1])
          }
          texte = `$${a}\\div(${b}${ecritureAlgebrique(c)})$`
          texteCorr = `$${a}\\div(${miseEnEvidence(b + ecritureAlgebrique(c))})=${a}\\div${ecritureParentheseSiNegatif(b + c)}=${a / (b + c)}$`
          setReponse(this, i, a / (b + c))
          break
        case 15: // a(b+c)*d
          c = randint(11, 39) * choice([-1, 1])
          b = randint(2, 5) * choice([-1, 1]) - c
          a = randint(2, 5) * choice([-1, 1])
          d = randint(2, 5) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            c = randint(11, 39) * choice([-1, 1])
            b = (randint(2, 5) - c) * choice([-1, 1])
            a = randint(2, 5) * choice([-1, 1])
            d = randint(2, 5) * choice([-1, 1])
          }
          texte = `$${a}\\times(${b}${ecritureAlgebrique(c)})\\times${ecritureParentheseSiNegatif(d)}$`
          texteCorr = `$${a}\\times(${miseEnEvidence(b + ecritureAlgebrique(c))})\\times${ecritureParentheseSiNegatif(d)}=${a}\\times${ecritureParentheseSiNegatif(b + c)}\\times${ecritureParentheseSiNegatif(d)}=${a * (b + c) * d}$`
          setReponse(this, i, a * (b + c) * d)
          break
        case 16: // a*b*(c+d)
          d = randint(11, 39) * choice([-1, 1])
          c = randint(2, 5) * choice([-1, 1]) - d
          a = randint(2, 5) * choice([-1, 1])
          b = randint(2, 5) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            d = randint(11, 39) * choice([-1, 1])
            c = randint(2, 5) * choice([-1, 1]) - d
            a = randint(2, 5) * choice([-1, 1])
            b = randint(2, 5) * choice([-1, 1])
          }
          texte = `$${a}\\times${ecritureParentheseSiNegatif(b)}\\times(${c}${ecritureAlgebrique(d)})$`
          texteCorr = `$${a}\\times${ecritureParentheseSiNegatif(b)}\\times(${miseEnEvidence(
            c + ecritureAlgebrique(d))})=${a}\\times${ecritureParentheseSiNegatif(b)}\\times${ecritureParentheseSiNegatif(c + d)}=${a * b * (c + d)}$`
          setReponse(this, i, a * b * (c + d))
          break
        case 17: // a*(b/c+d)
          a = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          b = c * randint(2, 5) * choice([-1, 1])
          d = randint(2, 6) * choice([-1, 1])
          texte = `$${a}\\times(${b}\\div${ecritureParentheseSiNegatif(c)}${ecritureAlgebrique(d)})$`
          texteCorr = `$${a}\\times(${miseEnEvidence(
            b + '\\div' + ecritureParentheseSiNegatif(c)
          )}${ecritureAlgebrique(d)})=${a}\\times(${miseEnEvidence(
            b / c + ecritureAlgebrique(d)
          )})=${a}\\times${ecritureParentheseSiNegatif(b / c + d)}=${a * (b / c + d)}$`
          setReponse(this, i, a * (b / c + d))
          break
        case 18: // a*b/(c+d)
          a = randint(2, 11)
          b = randint(2, 11)
          while (listeDesDiviseurs(a * b).length < 5) {
            a = randint(2, 11)
            b = randint(2, 11)
          }
          // eslint-disable-next-line no-case-declarations
          const liste = listeDesDiviseurs(a * b)
          if (liste.length > 2) {
            liste.pop() // on supprime le plus grand diviseur qui est le produit
            enleveElement(liste, a) // on supprime a
            enleveElement(liste, b) // on supprime b
          }
          // eslint-disable-next-line no-case-declarations
          const somme = choice(liste, [1]) * choice([-1, 1]) // la somme doit être un diviseur différent de 1
          c = randint(-30, 30, [0])
          d = somme - c

          // eslint-disable-next-line no-unmodified-loop-condition
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a *= choice([-1, 1])
            b *= choice([-1, 1])
          }
          texte = `$${a}\\times${ecritureParentheseSiNegatif(b)}\\div(${c}${ecritureAlgebrique(d)})$`
          texteCorr = `$${a}\\times${ecritureParentheseSiNegatif(b)}\\div(${miseEnEvidence(
            c + ecritureAlgebrique(d))})=${miseEnEvidence(a + '\\times' + ecritureParentheseSiNegatif(b))}\\div${ecritureParentheseSiNegatif(c + d)}=${a * b
            }\\div${ecritureParentheseSiNegatif(c + d)}=${(a * b) / (c + d)}$`
          setReponse(this, i, (a * b) / (c + d))
          break
        case 19: // a-(b+c)
          a = randint(1, 9) * choice([-1, 1])
          b = randint(1, 9) * choice([-1, 1])
          c = randint(1, 9) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(1, 9) * choice([-1, 1])
            b = randint(1, 9) * choice([-1, 1])
            c = randint(1, 9) * choice([-1, 1])
          }
          texte = `$${a}-(${b}${ecritureAlgebrique(c)})$`
          texteCorr = `$${a}-(${miseEnEvidence(b + ecritureAlgebrique(c))})=${a}-(${ecritureAlgebrique(b + c)})=${a + ecritureAlgebrique(-b - c)}=${a - b - c}$`
          setReponse(this, i, a - b - c)
          break
        case 20: // (a+b+c)*d
          a = randint(1, 9) * choice([-1, 1])
          b = randint(1, 9) * choice([-1, 1])
          c = randint(1, 9) * choice([-1, 1])
          d = randint(2, 5) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(1, 9) * choice([-1, 1])
            b = randint(1, 9) * choice([-1, 1])
            c = randint(1, 9) * choice([-1, 1])
          }
          texte = `$(${a + ecritureAlgebrique(b) + ecritureAlgebrique(c)})\\times${ecritureParentheseSiNegatif(d)}$`
          texteCorr = `$(${miseEnEvidence(a + ecritureAlgebrique(b) + ecritureAlgebrique(c))})\\times${ecritureParentheseSiNegatif(d)}=${a + b + c}\\times${ecritureParentheseSiNegatif(d)}=${(a + b + c) * d} $`
          setReponse(this, i, (a + b + c) * d)
          break
      }
      texte += ajouteChampTexteMathLive(this, i)
      if (this.sup2) {
        texte = `${lettreDepuisChiffre(i + 1)} = ${texte}`
        // On découpe
        const etapes = texteCorr.split('=')
        texteCorr = ''
        etapes.forEach(function (etape) {
          etape = etape.replace('$', '')
          if (context.isHtml) {
            texteCorr += '<br>'
          }
          texteCorr += `${lettreDepuisChiffre(i + 1)} = $${etape}$ <br>`
        })
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Type de calculs',
    3,
    '1 : Sans opérations entre parenthèses\n2 : Avec des opérations entre parenthèses\n3 : Mélange'
  ]
  this.besoinFormulaire2CaseACocher = ['Présentation des corrections en colonnes', false]
}
