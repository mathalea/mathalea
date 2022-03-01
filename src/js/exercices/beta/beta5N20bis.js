import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texFraction, texFractionReduite } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import FractionEtendue from '../../modules/FractionEtendue.js'
import { calculer } from '../../modules/outilsMathjs.js'

export const amcReady = true
export const amcType = 'qcmMono' // QCM
export const interactifReady = true
export const interactifType = 'mathLive' // Le QCM est prêt mais pas géré

export const titre = 'Additionner ou soustraire deux fractions (dénominateurs multiples)'

/**
* Effectuer l'addition ou la soustraction de deux fractions dont un dénominateur est un multiple de l'autre.
*
* Le résultat de la soustraction sera toujours positif.
*
* Le coefficient est paramétrable, par défaut il est inférieur à 11.
*
* On peut paramétrer de n'avoir que des soustractions.
* @author Rémi Angot
* 5N20
*/
export default function ExerciceAdditionnerSoustraireFractions5e (max = 11) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max // Correspond au facteur commun
  this.sup2 = 3 // Si 1 alors il n'y aura pas de soustraction
  this.sup3 = true // Si false alors le résultat n'est pas en fraction simplifiée
  this.titre = titre
  this.consigne = 'Calculer :'
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    if (this.sup3 && !context.isAmc) {
      this.consigne = this.level === 6 ? 'Calculer.' : 'Calculer et simplifier au maximum le résultat.'
    } else {
      if (this.interactif && !context.isAmc) {
        this.consigne = 'Calculer.'
      } else if (context.isAmc) {
        this.consigne = 'Calculer et choisir parmi les réponses proposées la bonne réponse.'
      } else if (!this.sup3) {
        this.consigne = 'Calculer :'
      }
    }
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let listeTypeDeQuestions
    if (this.sup2 === 1) {
      listeTypeDeQuestions = combinaisonListes(['+'], this.nbQuestions)
    }
    if (this.sup2 === 2) {
      listeTypeDeQuestions = combinaisonListes(['-'], this.nbQuestions)
    }
    if (this.sup2 === 3) {
      listeTypeDeQuestions = combinaisonListes(['+', '-'], this.nbQuestions)
    }
    for (let i = 0, question, expression, numerateur1, denominateur1, numerateur2, denominateur2, facteur, ordreDesFractions, texte, texteCorr; i < this.nbQuestions;) {
      this.autoCorrection[i] = {}

      texte = ''
      texteCorr = ''
      // les numérateurs sont numerateur1 et numerateur2
      numerateur1 = randint(1, 9)
      // les dénominateurs sont denominateur1 et denominateur2 = denominateur1*facteur ; denominateur1 compris entre 2 et 9 denominateur1 != numerateur1 ; facteur compris entre 2 et this.sup
      denominateur1 = randint(2, 9, numerateur1)
      if (this.sup > 1) {
        facteur = randint(2, this.sup)
      } else facteur = 1
      denominateur2 = denominateur1 * facteur
      if (listeTypeDeQuestions[i] === '-') {
        numerateur2 = choice([randint(1, denominateur1 * facteur), randint(denominateur1 * facteur, 9 * facteur)])
      } else {
        numerateur2 = randint(1, 19, denominateur2)
      }

      // On crée l'expression en fonction de l'opération choisie.
      ordreDesFractions = randint(1, 2)
      if (listeTypeDeQuestions[i] === '+') {
        if (ordreDesFractions === 1) {
          expression = `${numerateur1}/${denominateur1}+${numerateur2}/${denominateur2}`
        } else {
          expression = `${numerateur2}/${denominateur2}+${numerateur1}/${denominateur1}`
        }
      } else {
        if (numerateur1 / denominateur1 > numerateur2 / denominateur2) {
          expression = `${numerateur1}/${denominateur1}-${numerateur2}/${denominateur2}`
        } else {
          expression = `${numerateur2}/${denominateur2}-${numerateur1}/${denominateur1}`
        }
      }
      // l'expression étant prête, on confie à calculer() la tâche de fabriquer l'énoncé et la correction.
      question = calculer(expression, { comment: true, substeps: true })
      texte = question.texte
      texteCorr = question.texteCorr

      // c'est fini, mais il faut préparer le Qcm pour AMC et les réponses pour l'interactif...

      if (listeTypeDeQuestions[i] === '+') { // une addition
        /** ***************** Choix des réponses du QCM ***********************************/
        this.autoCorrection[i].propositions = [
          {
            texte: this.sup3 ? `$${texFractionReduite(numerateur1 * facteur + numerateur2, denominateur2)}$` : `$${texFraction(numerateur1 * facteur + numerateur2, denominateur2)}$`,
            statut: true
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(numerateur1 + numerateur2, denominateur2)}$` : `$${texFraction(numerateur1 + numerateur2, denominateur2)}$`,
            statut: false
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(numerateur1 + numerateur2, denominateur1 + denominateur2)}$` : `$${texFraction(numerateur1 + numerateur2, denominateur1 + denominateur2)}$`,
            statut: false
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(numerateur1 * numerateur2, denominateur2)}$` : `$${texFraction(numerateur1 * numerateur2, denominateur2)}$`,
            statut: false
          }
        ]
        this.autoCorrection[i].options = {
          ordered: false,
          lastChoice: 5
        }
        if (this.level === 6) {
          // En 6e, pas de fraction simplifiée
          // Les fractions ont le même dénominateur (denominateur1=denominateur2)
          this.autoCorrection[i].propositions[0].texte = `$${texFraction(numerateur1 + numerateur2, denominateur1)}$`
        }
        /** ****************** AMC question/questionmult ********************************/
        this.autoCorrection[i].enonce = `${texte}\n`
        /*******************************************************************************/

        if ((this.modeQcm && !context.isAmc) || (this.interactif && this.interactifType === 'qcm')) {
          texte += '<br>' + propositionsQcm(this, i).texte
        }
        if (context.isHtml && this.interactifType === 'mathLive') {
          if (this.sup3 && this.level !== 6) {
            setReponse(this, i, (new FractionEtendue(numerateur1 * denominateur2 + numerateur2 * denominateur1, denominateur1 * denominateur2)).simplifie(), { formatInteractif: 'fraction' })
          } else {
            setReponse(this, i, (new FractionEtendue(numerateur1 * denominateur2 + numerateur2 * denominateur1, denominateur1 * denominateur2)).simplifie(), { formatInteractif: 'fractionEgale' })
          }
        }
      } else { // une soustraction
        /** ***************** Choix des réponses du QCM ***********************************/
        this.autoCorrection[i].propositions = [
          {
            texte: this.sup3 ? `$${texFractionReduite(Math.abs(numerateur1 * facteur - numerateur2), Math.abs(denominateur2))}$` : `$${texFraction(Math.abs(numerateur1 * facteur - numerateur2), Math.abs(denominateur2))}$`,
            statut: true
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(Math.abs(numerateur1 - numerateur2), Math.abs(denominateur1 - denominateur2))}$` : `$${texFraction(Math.abs(numerateur1 - numerateur2), Math.abs(denominateur1 - denominateur2))}$`,
            statut: false
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(Math.abs(numerateur1 - numerateur2), denominateur2)}$` : `$${texFraction(Math.abs(numerateur1 - numerateur2), denominateur2)}$`,
            statut: false
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(numerateur1 * numerateur2, denominateur2)}$` : `$${texFraction(numerateur1 * numerateur2, denominateur2)}$`,
            statut: false
          }
        ]
        this.autoCorrection[i].options = {
          ordered: false,
          lastChoice: 5
        }
        if (this.level === 6) {
          // En 6e, pas de fraction simplifiée
          // Les fractions ont le même dénominateur (denominateur1=denominateur2)
          this.autoCorrection[i].propositions[0].texte = `$${texFraction(Math.abs(numerateur1 - numerateur2), denominateur1)}$`
        }

        if ((this.modeQcm && !context.isAmc) || (this.interactif && this.interactifType === 'qcm')) {
          texte += '<br>' + propositionsQcm(this, i).texte
        }
        if (context.isHtml && this.interactifType === 'mathLive') {
          if (this.sup3 && this.level !== 6) {
            setReponse(this, i, (new FractionEtendue(Math.abs(numerateur1 * denominateur2 - numerateur2 * denominateur1), denominateur1 * denominateur2)).simplifie(), { formatInteractif: 'fraction' })
          } else {
            setReponse(this, i, (new FractionEtendue(Math.abs(numerateur1 * denominateur2 - numerateur2 * denominateur1), denominateur1 * denominateur2)).simplifie(), { formatInteractif: 'fractionEgale' })
          }
        }
      }
      if (context.isHtml && this.interactifType === 'mathLive') texte += ajouteChampTexteMathLive(this, i)
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
      }
      // la version interactive et la version AMC sont prête on vérifie que la question n'a pas déjà été posée avant de passer à la suivante.

      if (this.questionJamaisPosee(i, numerateur1, facteur, denominateur1, numerateur2)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }

  this.besoinFormulaireNumerique = ['Valeur maximale du coefficient multiplicateur', 99999]
  this.besoinFormulaire2Numerique = ['Type de calculs', 3, '1 : Additions\n2 : Soustractions\n3 : Mélange']
  this.besoinFormulaire3CaseACocher = ['Avec l\'écriture simplifiée de la fraction résultat']
}
