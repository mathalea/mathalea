import { listeQuestionsToContenu, randint, choice, combinaisonListes, scientifiqueToDecimal, sp, stringNombre, texNombre } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import Decimal from 'decimal.js'
import { context } from '../../modules/context.js'

import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Notation scientifique'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum' // type de question AMC

/**
 * Écrire un nombre décimal en notation scientifique et inversement
 * @author Jean-Claude Lhote
 * 4C32
 */

export const uuid = 'a0d16'
export const ref = '4C32'
export default function NotationScientifique () {
  Exercice.call(this)
  this.sup = 1
  this.sup2 = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nbQuestions = 5
  this.interactif = false

  this.nouvelleVersion = function () {
    Decimal.toExpNeg = -15
    Decimal.toExpPos = 20
    let reponse
    if (parseInt(this.sup) === 1) this.consigne = 'Donner l\'écriture scientifique des nombres suivants.'
    else this.consigne = 'Donner l\'écriture décimale des nombres suivants.'
    let typesDeQuestionsDisponibles
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    if (parseInt(this.sup2) === 1) typesDeQuestionsDisponibles = [0, 0, 0, 1, 1]
    else if (parseInt(this.sup2) === 2) typesDeQuestionsDisponibles = [0, 1, 1, 2, 2]
    else typesDeQuestionsDisponibles = [2, 2, 3, 3, 3]

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, mantisse, exp, decimalstring, scientifiquestring, cpt = 0;
      i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 0:
          mantisse = new Decimal(randint(1, 9))
          if (!context.isAmc) {
            exp = randint(1, 5)
          } else {
            exp = randint(1, 3)
          }

          break
        case 1:
          mantisse = new Decimal(randint(11, 99)).div(10)
          if (!context.isAmc) {
            exp = randint(1, 5)
          } else {
            exp = randint(1, 3)
          }
          break
        case 2:
          if (choice([false, true])) mantisse = new Decimal(randint(111, 999)).div(100)
          else mantisse = new Decimal(randint(1, 9)).plus(randint(1, 9) * 100).div(100)
          if (!context.isAmc) {
            exp = randint(1, 7) * choice([-1, 1])
          } else {
            exp = randint(1, 3) * choice([-1, 1])
          }
          break
        case 3:
          if (choice([true, false])) mantisse = new Decimal(randint(1, 19) * 5).plus(randint(1, 9) * 1000).div(1000)
          else mantisse = new Decimal(randint(1111, 9999)).div(1000)
          if (!context.isAmc) {
            exp = randint(1, 7) * choice([-1, 1])
          } else {
            exp = randint(1, 3) * choice([-1, 1])
          }
          break
      }

      // decimalstring = texNombrec(mantisse * 10 ** exp)
      scientifiquestring = `${texNombre(mantisse, 8)}\\times 10^{${exp}}`
      decimalstring = scientifiqueToDecimal(mantisse, exp)

      if (this.sup === 1) {
        if (exp > 9 || exp < 0) {
          reponse = `${stringNombre(mantisse, 8)}\\times 10^{${exp}}`
        } else {
          reponse = `${stringNombre(mantisse, 8)}\\times 10^${exp}`
        }
        texte = `$${decimalstring}${sp()}=$`
        texteCorr = `$${decimalstring} = ${scientifiquestring}$`
        if (this.interactif) {
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        } else {
          texte += `$${sp()}\\dots$`
        }
      } else {
        reponse = mantisse.mul(Decimal.pow(10, exp))
        texteCorr = `$${scientifiquestring} = ${decimalstring}$`
        texte = `$${scientifiquestring}${sp()}=$`
        if (this.interactif) {
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        } else {
          texte += `$${sp()}\\dots$`
        }
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        if (parseInt(this.sup) === 1) {
          setReponse(this, i, reponse.replace(/\\thickspace /g, '').replace(/ /g, ''), { formatInteractif: 'ecritureScientifique', digits: listeTypeDeQuestions[i] + 1, decimals: listeTypeDeQuestions[i], signe: false, exposantNbChiffres: 1, exposantSigne: true, approx: 0 })
        } else {
          setReponse(this, i, reponse, { formatInteractif: 'nombreDecimal', decimals: Math.max(0, listeTypeDeQuestions[i] - exp) })
        }
        if (context.isAmc) {
          this.autoCorrection[i].reponse.valeur = [mantisse.mul(Decimal.pow(10, exp)).toString()]
          if (parseInt(this.sup) === 1) {
            this.amcType = 'AMCNum'
            this.autoCorrection[i].enonce = "Donner l'écriture scientifique du nombre " + texte + '.'
          } else {
            this.amcType = 'qcmMono'
            this.autoCorrection[i].enonce = "Donner l'écriture décimale du nombre " + texte + '.'
            this.autoCorrection[i].options = {
              ordered: false,
              lastChoice: 5
            }
            this.autoCorrection[i].propositions = [
              {
                texte: `$${decimalstring}$`,
                statut: true
              },
              {
                texte: `$${texNombre(mantisse.mul(Decimal.pow(10, exp - 1)), 20)}$`,
                statut: false
              },
              {
                texte: `$${texNombre(mantisse.mul(Decimal.pow(10, exp + 1)), 20)}$`,
                statut: false
              },
              {
                texte: `$${texNombre(mantisse.mul(Decimal.pow(10, -exp)), 20)}$`,
                statut: false
              }
            ]
          }
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ["Type d'exercices", 2, '1 : Traduire en notation scientifique\n2 : Traduire en notation décimale']
  this.besoinFormulaire2Numerique = ['Niveau de difficulté', 3, '1 : Facile\n2 : Moyen\n3 : Difficile']
}
