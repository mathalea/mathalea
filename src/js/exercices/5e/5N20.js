import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { calcul, listeQuestionsToContenu, randint, choice, combinaisonListes, abs, pgcd, miseEnEvidence, texFraction, texFractionReduite } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import FractionEtendue from '../../modules/FractionEtendue.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'

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
export const uuid = 'd5ee3'
export const ref = '5N20'
export default function ExerciceAdditionnerSoustraireFractions5e (max = 11) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max // Correspond au facteur commun
  this.sup2 = 3 // Si 1 alors il n'y aura pas de soustraction
  this.sup3 = true // Si false alors le résultat n'est pas en fraction simplifiée
  this.titre = titre
  this.consigne = 'Calculer.'
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    if (this.sup3 && !context.isAmc) {
      this.consigne = 'Calculer et simplifier au maximum le résultat.'
    } else {
      if (this.interactif && !context.isAmc) {
        this.consigne = 'Calculer.'
      } else if (context.isAmc) {
        this.consigne = 'Calculer et choisir parmi les réponses proposées la bonne réponse.'
      } else if (!this.sup3) {
        this.consigne = 'Calculer.'
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
    for (let i = 0, a, b, c, d, k, s, ordreDesFractions, texte, texteCorr; i < this.nbQuestions;) {
      this.autoCorrection[i] = {}
      texte = ''
      texteCorr = ''
      // les numérateurs
      a = randint(1, 9)
      // les dénominateurs
      b = randint(2, 9, a)
      if (this.sup > 1) {
        k = randint(2, this.sup)
      } else k = 1
      d = b * k
      if (listeTypeDeQuestions[i] === '-') {
        c = choice([randint(1, b * k), randint(b * k, 9 * k)])
      } else {
        c = randint(1, 19, d)
      }
      if (listeTypeDeQuestions[i] === '+') { // une addition
        /** ***************** Choix des réponses du QCM ***********************************/
        this.autoCorrection[i].propositions = [
          {
            texte: this.sup3 ? `$${texFractionReduite(a * k + c, d)}$` : `$${texFraction(a * k + c, d)}$`,
            statut: true
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(a + c, d)}$` : `$${texFraction(a + c, d)}$`,
            statut: false
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(a + c, b + d)}$` : `$${texFraction(a + c, b + d)}$`,
            statut: false
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(a * c, d)}$` : `$${texFraction(a * c, d)}$`,
            statut: false
          }
        ]
        this.autoCorrection[i].options = {
          ordered: false,
          lastChoice: 5
        }
        if (this.level === 6) {
          // En 6e, pas de fraction simplifiée
          // Les fractions ont le même dénominateur (b=d)
          this.autoCorrection[i].propositions[0].texte = `$${texFraction(a + c, b)}$`
        }
        /*************************************************************************/
        ordreDesFractions = randint(1, 2)
        if (ordreDesFractions === 1) {
          texte = `$${texFraction(a, b)}+${texFraction(c, d)}=$`
          /** ****************** AMC question/questionmult ********************************/
          this.autoCorrection[i].enonce = `${texte}\n`
          /*******************************************************************************/
        } else {
          texte = `$${texFraction(c, d)}+${texFraction(a, b)}=$`
          /** ****************** AMC question/questionmult ******************************/
          this.autoCorrection[i].enonce = `${texte}\n`
          /*******************************************************************************/
        }

        if (ordreDesFractions === 1) {
          texteCorr = `$${texFraction(a, b)}+${texFraction(c, d)}=`

          if (this.level !== 6) {
            texteCorr += `${texFraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}+${texFraction(c, d)}=${texFraction(a * k, b * k)}+${texFraction(c, d)}=`
          }
          texteCorr += `${texFraction(a * k + '+' + c, d)}=${texFraction(a * k + c, d)}$`
        } else {
          texteCorr = `$${texFraction(c, d)}+${texFraction(a, b)}=`
          if (this.level !== 6) {
            texteCorr += `${texFraction(c, d)}+${texFraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}=${texFraction(c, d)}+${texFraction(a * k, b * k)}=`
          }
          texteCorr += `${texFraction(c + '+' + a * k, d)}=${texFraction(a * k + c, d)}$`
        }
        // Est-ce que le résultat est simplifiable ?
        if (this.sup3) {
          s = pgcd(a * k + c, d)
          if (s !== 1) {
            texteCorr += `$=${texFraction(calcul((a * k + c) / s) + miseEnEvidence('\\times ' + s), calcul(d / s) + miseEnEvidence('\\times ' + s))}=${texFractionReduite(calcul((a * k + c) / s), calcul(d / s))}$`
          }
        }
        if ((this.modeQcm && !context.isAmc) || (this.interactif && this.interactifType === 'qcm')) {
          texte += '<br>' + propositionsQcm(this, i).texte
        }
        if (context.isHtml && this.interactifType === 'mathLive') {
          if (this.sup3) {
            setReponse(this, i, (new FractionEtendue(a * d + c * b, b * d)).simplifie(), { formatInteractif: 'fraction' })
          } else {
            setReponse(this, i, (new FractionEtendue(a * d + c * b, b * d)).simplifie(), { formatInteractif: 'fractionEgale' })
          }
        }
      } else { // une soustraction
        /** ***************** Choix des réponses du QCM ***********************************/
        this.autoCorrection[i].propositions = [
          {
            texte: this.sup3 ? `$${texFractionReduite(Math.abs(a * k - c), Math.abs(d))}$` : `$${texFraction(Math.abs(a * k - c), Math.abs(d))}$`,
            statut: true
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(Math.abs(a - c), Math.abs(b - d))}$` : `$${texFraction(Math.abs(a - c), Math.abs(b - d))}$`,
            statut: false
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(Math.abs(a - c), d)}$` : `$${texFraction(Math.abs(a - c), d)}$`,
            statut: false
          },
          {
            texte: this.sup3 ? `$${texFractionReduite(a * c, d)}$` : `$${texFraction(a * c, d)}$`,
            statut: false
          }
        ]
        this.autoCorrection[i].options = {
          ordered: false,
          lastChoice: 5
        }
        if (this.level === 6) {
          // En 6e, pas de fraction simplifiée
          // Les fractions ont le même dénominateur (b=d)
          this.autoCorrection[i].propositions[0].texte = `$${texFraction(Math.abs(a - c), b)}$`
        }

        /*********************************************************************************/
        if ((a / b) > (c / d)) {
          texte = `$${texFraction(a, b)}-${texFraction(c, d)}=$`
        } else {
          texte = `$${texFraction(c, d)}-${texFraction(a, b)}=$`
          /** ****************** AMC question/questionmult ******************************/

          /*****************************************************************************/
        }
        if ((a / b) > (c / d)) {
          texteCorr = `$${texFraction(a, b)}-${texFraction(c, d)}=`
          if (this.level !== 6) {
            texteCorr += `${texFraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}-${texFraction(c, d)}=${texFraction(a * k, b * k)}-${texFraction(c, d)}=`
          }
          texteCorr += `${texFraction(a * k + '-' + c, d)}=${texFraction(a * k - c, d)}$`
        } else {
          texteCorr = `$${texFraction(c, d)}-${texFraction(a, b)}=`
          if (this.level !== 6) {
            texteCorr += `${texFraction(c, d)}-${texFraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}=${texFraction(c, d)}-${texFraction(a * k, b * k)}=${texFraction(c + '-' + a * k, d)}=`
          }
          texteCorr += `${texFraction(c - a * k, d)}$`
        }
        // Est-ce que le résultat est simplifiable ?
        if (this.sup3) {
          s = pgcd(Math.abs(a * k - c), d)
          if (abs(a * k - c) % d === 0) { // si la fraction peut-être un nombre entier
            texteCorr += `$=${calcul((abs(a * k - c)) / d)}$`
          } else if (s !== 1) {
            texteCorr += `$=${texFraction(calcul((abs(a * k - c)) / s) + miseEnEvidence('\\times ' + s), calcul(d / s) + miseEnEvidence('\\times ' + s))}=${texFractionReduite(calcul((abs(a * k - c)) / s), calcul(d / s))}$`
          }
        }
        if ((this.modeQcm && !context.isAmc) || (this.interactif && this.interactifType === 'qcm')) {
          texte += '<br>' + propositionsQcm(this, i).texte
        }
        if (context.isHtml && this.interactifType === 'mathLive') {
          if (this.sup3) {
            setReponse(this, i, (new FractionEtendue(Math.abs(a * d - c * b), b * d)).simplifie(), { formatInteractif: 'fraction' })
          } else {
            setReponse(this, i, (new FractionEtendue(Math.abs(a * d - c * b), b * d)).simplifie(), { formatInteractif: 'fractionEgale' })
          }
        }
      }
      if (context.isHtml && this.interactifType === 'mathLive') texte += ajouteChampTexteMathLive(this, i)
      texte = texte.replaceAll('$$', ' ')
      texteCorr = texteCorr.replaceAll('$$', ' ')
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
      }

      if (this.questionJamaisPosee(i, a, k, b, c)) {
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
