import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, range1, combinaisonListes, miseEnEvidence, listeDesDiviseurs, nombreDeChiffresDansLaPartieEntiere, lettreDepuisChiffre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Calculer en utilisant les priorités opératoires'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum' // Question numérique

/**
 * Plusieurs type de calcul avec des entiers.
 *
 * Sans parenthèses :
 * * a+b*c
 * * a+b÷c
 * * a÷b*c
 * * a-b*c
 * * a*b÷c
 * * a*b+c
 * * a-b+c
 * * a+b+c*d
 * * a*b+c*d
 * * a*b*c-d
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
 * @author Rémi Angot
 * Référence 6C33
 */
export default function Priorites () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer :'
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 1
  this.sup = 3
  this.sup2 = false

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let questionsDisponibles = [] //
    if (parseInt(this.sup) === 1) {
      questionsDisponibles = range1(12)
    } else if (parseInt(this.sup) === 2) {
      questionsDisponibles = range1(22, range1(12))
    } else {
      questionsDisponibles = range1(22)
    }
    const listeTypeDeQuestions = combinaisonListes(
      questionsDisponibles,
      this.nbQuestions
    )
    for (
      let i = 0, texte, texteCorr, liste, somme, a, b, c, d, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1:
          a = randint(2, 11)
          b = randint(2, 11)
          c = randint(2, 11)
          texte = `$${a}+${b}\\times${c}$`
          texteCorr = `$${a}+${miseEnEvidence(b + '\\times' + c)}=${a}+${b * c
            }=${a + b * c}$`
          setReponse(this, i, a + b * c)
          break
        case 2:
          a = randint(2, 11)
          c = randint(2, 11)
          b = c * randint(2, 11)
          texte = `$${a}+${b}\\div${c}$`
          texteCorr = `$${a}+${miseEnEvidence(b + '\\div' + c)}=${a}+${b / c
            }=${a + b / c}$`
          setReponse(this, i, a + b / c)
          break
        case 3:
          b = randint(2, 11)
          c = randint(2, 11)
          a = b * randint(2, 11)
          texte = `$${a}\\div${b}\\times${c}$`
          texteCorr = `$${miseEnEvidence(a + '\\div' + b)}\\times${c}=${a / b
            }\\times${c}=${(a / b) * c}$`
          setReponse(this, i, (a / b) * c)
          break
        case 4:
          b = randint(2, 11)
          c = randint(2, 11)
          a = b * c + randint(2, 11)
          texte = `$${a}-${b}\\times${c}$`
          texteCorr = `$${a}-${miseEnEvidence(b + '\\times' + c)}=${a}-${b * c
            }=${a - b * c}$`
          setReponse(this, i, a - b * c)
          break
        case 5:
          if (choice([true, false])) {
            // a est un multiple de c
            c = randint(2, 6)
            a = c * randint(2, 5)
            b = randint(2, 6)
          } else {
            // b est un multiple de c
            c = randint(2, 6)
            b = c * randint(2, 5)
            a = randint(2, 6)
          }
          texte = `$${a}\\times${b}\\div${c}$`
          texteCorr = `$${miseEnEvidence(a + '\\times' + b)}\\div${c}=${a * b
            }\\div${c}=${(a * b) / c}$`
          setReponse(this, i, (a * b) / c)
          break
        case 6:
          a = randint(2, 11)
          b = randint(2, 11)
          c = randint(2, 11)
          texte = `$${a}\\times${b}+${c}$`
          texteCorr = `$${miseEnEvidence(a + '\\times' + b)}+${c}=${a * b
            }+${c}=${a * b + c}$`
          setReponse(this, i, a * b + c)
          break
        case 7:
          b = randint(20, 59)
          a = b + randint(11, 29)
          c = randint(11, 29)
          texte = `$${a}-${b}+${c}$`
          texteCorr = `$${miseEnEvidence(a + '-' + b)}+${c}=${a - b}+${c}=${a - b + c}$`
          setReponse(this, i, a - b + c)
          break
        case 8:
          a = randint(2, 20)
          b = randint(2, 20)
          c = randint(2, 11)
          d = randint(2, 11)
          texte = `$${a}+${b}+${c}\\times${d}$`
          texteCorr = `$${a}+${b}+${miseEnEvidence(
            c + '\\times' + d
          )}=${a}+${b}+${c * d}=${a + b + c * d}$`
          setReponse(this, i, a + b + c * d)
          break
        case 9:
          a = randint(2, 11)
          b = randint(2, 11)
          c = randint(2, 11)
          d = randint(2, 11)
          texte = `$${a}\\times${b}+${c}\\times${d}$`
          texteCorr = `$${miseEnEvidence(
            a + '\\times' + b
          )}+${miseEnEvidence(c + '\\times' + d)}=${a * b}+${c * d}=${a * b + c * d}$`
          setReponse(this, i, a * b + c * d)
          break
        case 10:
          a = randint(2, 5)
          b = randint(2, 5)
          c = randint(2, 5)
          d = randint(2, a * b * c - 1)
          texte = `$${a}\\times${b}\\times${c}-${d}$`
          texteCorr = `$${miseEnEvidence(
            a + '\\times' + b
          )}\\times${c}-${d}=${miseEnEvidence(a * b + '\\times' + c)}-${d}=${a * b * c - d}$`
          setReponse(this, i, a * b * c - d)
          break
        case 11:
          a = randint(3, 11)
          b = randint(3, 11)
          d = randint(2, 11)
          c = d * randint(2, 8)
          texte = `$${a}\\times${b}-${c}\\div${d}$`
          texteCorr = `$${miseEnEvidence(
            a + '\\times' + b
          )}-${miseEnEvidence(c + '\\div' + d)}=${a * b}-${c / d}=${a * b - c / d}$`
          setReponse(this, i, a * b - c / d)
          break
        case 12:
          a = randint(2, 11)
          b = randint(2, 11)
          d = randint(2, 11)
          c = d * randint(2, 8)
          texte = `$${a}\\times${b}+${c}\\div${d}$`
          texteCorr = `$${miseEnEvidence(
            a + '\\times' + b
          )}+${miseEnEvidence(c + '\\div' + d)}=${a * b}+${c / d}=${a * b + c / d}$`
          setReponse(this, i, a * b + c / d)
          break
        case 13:
          a = randint(2, 11)
          c = randint(2, 11)
          b = c + randint(2, 11)
          texte = `$${a}\\times(${b}-${c})$`
          texteCorr = `$${a}\\times(${miseEnEvidence(
            b + '-' + c
          )})=${a}\\times${b - c}=${a * (b - c)}$`
          setReponse(this, i, a * (b - c))
          break
        case 14:
          b = randint(11, 39)
          a = b + randint(2, 11)
          c = randint(2, 11)
          texte = `$(${a}-${b})\\times${c}$`
          texteCorr = `$(${miseEnEvidence(a + '-' + b)})\\times${c}=${a - b
            }\\times${c}=${(a - b) * c}$`
          setReponse(this, i, (a - b) * c)
          break
        case 15:
          c = randint(2, 11)
          b = randint(11, 39)
          a = b + c * randint(2, 9)
          texte = `$(${a}-${b})\\div${c}$`
          texteCorr = `$(${miseEnEvidence(a + '-' + b)})\\div${c}=${a - b
            }\\div${c}=${(a - b) / c}$`
          setReponse(this, i, (a - b) / c)
          break
        case 16:
          b = randint(2, 5)
          c = randint(2, 6)
          a = (b + c) * randint(2, 9)
          texte = `$${a}\\div(${b}+${c})$`
          texteCorr = `$${a}\\div(${miseEnEvidence(b + '+' + c)})=${a}\\div${b + c
            }=${a / (b + c)}$`
          setReponse(this, i, a / (b + c))
          break
        case 17:
          c = randint(2, 11)
          b = randint(11, 39)
          a = b + c * randint(2, 9)
          texte = `$(${a}-${b})\\div${c}$`
          texteCorr = `$(${miseEnEvidence(a + '-' + b)})\\div${c}=${a - b
            }\\div${c}=${(a - b) / c}$`
          setReponse(this, i, (a - b) / c)
          break
        case 18:
          c = randint(11, 39)
          b = c + randint(2, 5)
          a = randint(2, 5)
          d = randint(2, 5)
          texte = `$${a}\\times(${b}-${c})\\times${d}$`
          texteCorr = `$${a}\\times(${miseEnEvidence(
            b + '-' + c
          )})\\times${d}=${a}\\times${b - c}\\times${d}=${a * (b - c) * d}$`
          setReponse(this, i, a * (b - c) * d)
          break
        case 19:
          d = randint(11, 39)
          c = d + randint(2, 5)
          a = randint(2, 5)
          b = randint(2, 5)
          texte = `$${a}\\times${b}\\times(${c}-${d})$`
          texteCorr = `$${a}\\times${b}\\times(${miseEnEvidence(
            c + '-' + d
          )})=${a}\\times${b}\\times${c - d}=${a * b * (c - d)}$`
          setReponse(this, i, a * b * (c - d))
          break
        case 20:
          a = randint(2, 11)
          c = randint(2, 11)
          d = randint(2, 11)
          b = c * d + randint(2, 11)
          texte = `$${a}\\times(${b}-${c}\\times${d})$`
          texteCorr = `$${a}\\times(${b}-${miseEnEvidence(
            c + '\\times' + d
          )})=${a}\\times(${miseEnEvidence(b + '-' + c * d)})=${a}\\times${b - c * d
            }=${a * (b - c * d)}$`
          setReponse(this, i, a * (b - c * d))
          break
        case 21:
          a = randint(2, 11)
          b = randint(2, 11)
          liste = listeDesDiviseurs(a * b)
          if (liste.length > 2) {
            liste.pop() // on supprime le plus grand diviseur qui est le produit
          }
          if (liste.length > 2) {
            enleveElement(liste, liste[1]) // on supprime le plus petit diviseur (autre que 1)
          }

          somme = choice(liste, [1]) // la somme doit être un diviseur différent de 1
          c = randint(1, somme - 1)
          d = somme - c
          texte = `$${a}\\times${b}\\div(${c}+${d})$`
          texteCorr = `$${a}\\times${b}\\div(${miseEnEvidence(
            c + '+' + d
          )})=${miseEnEvidence(a + '\\times' + b)}\\div${c + d}=${a * b
            }\\div${c + d}=${(a * b) / (c + d)}$`
          setReponse(this, i, (a * b) / (c + d))
          break
        case 22:
          a = randint(2, 11)
          c = randint(2, 11)
          b = c * randint(2, 5)
          d = randint(2, 6)
          texte = `$${a}\\times(${b}\\div${c}+${d})$`
          texteCorr = `$${a}\\times(${miseEnEvidence(
            b + '\\div' + c
          )}+${d})=${a}\\times(${miseEnEvidence(
            b / c + '+' + d
          )})=${a}\\times${b / c + d}=${a * (b / c + d)}$`
          setReponse(this, i, a * (b / c + d))
          break
      }
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
      if (this.interactif && context.isHtml) texte = texte.substring(0, texte.length - 1) + '~=$' + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
      if (this.listeQuestions.indexOf(texte) === -1) {
        if (context.isAmc) {
          this.autoCorrection[i].enonce = texte.substring(0, texte.length - 1) + '~=$'
          this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: '' }]
          this.autoCorrection[i].reponse.param.digits = nombreDeChiffresDansLaPartieEntiere(this.autoCorrection[i].reponse.valeur[0]) + 1
          this.autoCorrection[i].reponse.param.decimals = 0
        }
        // Si la question n'a jamais été posée, on en crée une autre
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
    '1 : Sans parenthèses\n2 : Avec parenthèses\n3 : Mélange'
  ]
  this.besoinFormulaire2CaseACocher = ['Présentation des corrections en colonnes', false]
}
