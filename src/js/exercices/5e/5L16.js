import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu, combinaisonListes, choice, contraindreValeur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Simplifier l\'écriture d\'une expression littérale'

export const dateDePublication = '07/04/2022'

/**
 * Description didactique de l'exercice
 * @author Guillaume Valmont
 * Référence 5L16
*/
export default function NomExercice () {
  Exercice.call(this)
  this.consigne = 'Simplifie l\'écriture'
  this.nbQuestions = 10

  this.besoinFormulaireNumerique = ['Type de simplification', 3, '1 : × devant une lettre ou une parenthèse\n2 : Carré et cube\n3 : Mélange']
  this.sup = 3
  this.nbCols = 2
  this.nbColsCorr = 2

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    let typeQuestionsDisponibles
    switch (contraindreValeur(1, 3, parseInt(this.sup), 3)) {
      case 1:
        typeQuestionsDisponibles = ['ax', 'ax+b', 'b+ax', 'a+x', 'x+a', 'a(x+b)', 'a(b+x)', 'a(bx+c)', 'a(b+cx)']
        break
      case 2:
        typeQuestionsDisponibles = ['x²', 'x³', 'a+x²', 'x²+a', 'a+x³', 'x³+a']
        break
      default:
        typeQuestionsDisponibles = ['ax', 'ax+b', 'b+ax', 'a+x', 'x+a', 'a(x+b)', 'a(b+x)', 'a(bx+c)', 'a(b+cx)', 'x²', 'x³', 'a+x²', 'x²+a', 'a+x³', 'x³+a', 'ax²', 'ax³', 'ax²+b', 'ax³+b', 'b+ax²', 'b+ax³', 'abx²', 'abx³']
        break
    }
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, resultat, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const a = randint(2, 9)
      const b = randint(2, 9, [a])
      const c = randint(2, 9, [a, b])
      const inverserFacteurs = choice([true, false])
      const inverserParentheses = choice([true, false])
      switch (listeTypeQuestions[i]) {
        case 'ax':
          if (inverserFacteurs) {
            texte = `$x \\times ${a}$`
          } else {
            texte = `$${a} \\times x$`
          }
          resultat = `${a}x`
          break
        case 'ax+b':
          if (inverserFacteurs) {
            texte = `$x \\times ${a} + ${b}$`
          } else {
            texte = `$${a} \\times x + ${b}$`
          }
          resultat = `${a}x+${b}`
          break
        case 'b+ax':
          if (inverserFacteurs) {
            texte = `$${b} + x \\times ${a}$`
          } else {
            texte = `$${b} + ${a} \\times x$`
          }
          resultat = `${b}+${a}x`
          break
        case 'a+x':
          texte = `$${a} + x$`
          resultat = `${a}+x`
          break
        case 'x+a':
          texte = `$x + ${a}$`
          resultat = `x+${a}`
          break
        case 'a(x+b)':
          if (inverserParentheses) {
            texte = `$(x + ${b}) \\times ${a}$`
          } else {
            texte = `$${a} \\times (x + ${b})$`
          }
          resultat = `${a}(x+${b})`
          break
        case 'a(b+x)':
          if (inverserParentheses) {
            texte = `$(${b} + x) \\times ${a}$`
          } else {
            texte = `$${a} \\times (${b} + x)$`
          }
          resultat = `${a}(${b}+x)`
          break
        case 'a(bx+c)':
          if (inverserParentheses) {
            if (inverserFacteurs) {
              texte = `$(x \\times ${b} + ${c}) \\times ${a}$`
            } else {
              texte = `$(${b} \\times x + ${c}) \\times ${a}$`
            }
          } else {
            if (inverserFacteurs) {
              texte = `$${a} \\times (x \\times ${b} + ${c})$`
            } else {
              texte = `$${a} \\times (${b} \\times x + ${c})$`
            }
          }
          resultat = `${a}(${b}x+${c})`
          break
        case 'a(b+cx)':
          if (inverserParentheses) {
            if (inverserFacteurs) {
              texte = `$(${b} + x \\times ${c}) \\times ${a}$`
            } else {
              texte = `$(${b} + ${c} \\times x) \\times ${a}$`
            }
          } else {
            if (inverserFacteurs) {
              texte = `$${a} \\times (${b} + x \\times ${c})$`
            } else {
              texte = `$${a} \\times (${b} + ${c} \\times x)$`
            }
          }
          resultat = `${a}(${b}+${c}x)`
          break
        case 'x²':
          texte = '$x \\times x$'
          resultat = 'x^2'
          break
        case 'x³':
          texte = '$x \\times x \\times x$'
          resultat = 'x^3'
          break
        case 'a+x²':
          texte = `$${a} + x \\times x$`
          resultat = `${a}+x^2`
          break
        case 'x²+a':
          texte = `$x \\times x + ${a}$`
          resultat = `x^2+${a}`
          break
        case 'a+x³':
          texte = `$${a} + x \\times x \\times x$`
          resultat = `${a}+x^3`
          break
        case 'x³+a':
          texte = `$x \\times x \\times x + ${a}$`
          resultat = `x^3+${a}`
          break
        case 'ax²':
          if (inverserParentheses) {
            if (inverserFacteurs) {
              texte = `$x \\times ${a} \\times x$`
            } else {
              texte = `$${a} \\times x \\times x$`
            }
          } else {
            if (inverserFacteurs) {
              texte = `$x \\times x \\times ${a}$`
            } else {
              texte = `$${a} \\times x \\times x$`
            }
          }
          resultat = `${a}x^2`
          break
        case 'ax²+b':
          if (inverserParentheses) {
            if (inverserFacteurs) {
              texte = `$x \\times ${a} \\times x + ${b}$`
            } else {
              texte = `$${a} \\times x \\times x + ${b}$`
            }
          } else {
            if (inverserFacteurs) {
              texte = `$x \\times x \\times ${a} + ${b}$`
            } else {
              texte = `$${a} \\times x \\times x + ${b}$`
            }
          }
          resultat = `${a}x^2+${b}`
          break
        case 'b+ax²':
          if (inverserParentheses) {
            if (inverserFacteurs) {
              texte = `$${b} + x \\times ${a} \\times x$`
            } else {
              texte = `$${b} + ${a} \\times x \\times x$`
            }
          } else {
            if (inverserFacteurs) {
              texte = `$${b} + x \\times x \\times ${a}$`
            } else {
              texte = `$${b} + ${a} \\times x \\times x$`
            }
          }
          resultat = `${b}+${a}x^2`
          break
        case 'abx²':
          if (inverserParentheses) {
            if (inverserFacteurs) {
              texte = `$x \\times ${a} \\times x \\times ${b}$`
            } else {
              texte = `$${a} \\times x \\times x \\times ${b}$`
            }
          } else {
            if (inverserFacteurs) {
              texte = `$x \\times x \\times ${a} \\times ${b}$`
            } else {
              texte = `$${a} \\times x \\times x \\times ${b}$`
            }
          }
          resultat = `${a * b}x^2`
          break
        case 'ax³':
          if (inverserParentheses) {
            if (inverserFacteurs) {
              texte = `$x \\times x \\times ${a} \\times x$`
            } else {
              texte = `$x \\times ${a} \\times x \\times x$`
            }
          } else {
            if (inverserFacteurs) {
              texte = `$x \\times x \\times x \\times ${a}$`
            } else {
              texte = `$${a} \\times x \\times x \\times x$`
            }
          }
          resultat = `${a}x^3`
          break
        case 'ax³+b':
          if (inverserParentheses) {
            if (inverserFacteurs) {
              texte = `$x \\times x \\times ${a} \\times x + ${b}$`
            } else {
              texte = `$x \\times ${a} \\times x \\times x + ${b}$`
            }
          } else {
            if (inverserFacteurs) {
              texte = `$x \\times x \\times x \\times ${a} + ${b}$`
            } else {
              texte = `$${a} \\times x \\times x \\times x + ${b}$`
            }
          }
          resultat = `${a}x^3+${b}`
          break
        case 'b+ax³':
          if (inverserParentheses) {
            if (inverserFacteurs) {
              texte = `$${b} + x \\times x \\times ${a} \\times x$`
            } else {
              texte = `$${b} + x \\times ${a} \\times x \\times x$`
            }
          } else {
            if (inverserFacteurs) {
              texte = `$${b} + x \\times x \\times x \\times ${a}$`
            } else {
              texte = `$${b} + ${a} \\times x \\times x \\times x$`
            }
          }
          resultat = `${b}+${a}x^3`
          break
        case 'abx³':
          if (inverserParentheses) {
            if (inverserFacteurs) {
              texte = `$${b} \\times x \\times x \\times ${a} \\times x$`
            } else {
              texte = `$${b} \\times x \\times ${a} \\times x \\times x$`
            }
          } else {
            if (inverserFacteurs) {
              texte = `$${b} \\times x \\times x \\times x \\times ${a}$`
            } else {
              texte = `$${b} \\times ${a} \\times x \\times x \\times x$`
            }
          }
          resultat = `${a * b}x^3`
          break
      }
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i)
      }
      texteCorr = texte + `$=${resultat}$`
      setReponse(this, i, resultat, { formatInteractif: 'ignorerCasse' })
      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
