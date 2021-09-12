import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { calcul, listeQuestionsToContenu, randint, choice, combinaisonListes, abs, pgcd, miseEnEvidence, texFraction, texFractionReduite } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, propositionsQcm, setReponse } from '../../modules/gestionInteractif.js'
import Fraction from '../../modules/Fraction.js'

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
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.sup = max // Correspond au facteur commun
  this.sup2 = false // Si true alors il n'y aura que des soustractions
  this.titre = titre
  this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée"
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.sup2 = 3
  /** ************ modeQcm disponible dans Mathalea ***********************/
  this.qcmDisponible = true
  this.modeQcm = false
  /***********************************************************************/

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.qcm = ['5N20', [], 'Additionner ou soustraire deux fractions (dénominateurs multiples)', 1]
    if (this.level === 6) this.qcm[0] = '6C23'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions
    if (parseInt(this.sup2) === 1) {
      listeTypeDeQuestions = combinaisonListes(['+'], this.nbQuestions)
    }
    if (parseInt(this.sup2) === 2) {
      listeTypeDeQuestions = combinaisonListes(['-'], this.nbQuestions)
    }
    if (parseInt(this.sup2) === 3) {
      listeTypeDeQuestions = combinaisonListes(['+', '-'], this.nbQuestions)
    }
    for (let i = 0, a, b, c, d, k, texte, texteCorr; i < this.nbQuestions; i++) {
      this.autoCorrection[i] = {}
      texte = ''
      texteCorr = ''
      // les numérateurs
      a = randint(1, 9)
      // les dénominateurs
      b = randint(2, 9, a)
      while (b === a) {
        b = randint(2, 9) // pas de fraction avec numérateur et dénominateur égaux
      }
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
            texte: `$${texFractionReduite(a * d + c * b, b * d)}$`,
            statut: true
          },
          {
            texte: `$${texFraction(a + c, b + d)}$`,
            statut: false
          },
          {
            texte: `$${texFraction(a + c, b * d)}$`,
            statut: false
          },
          {
            texte: `$${texFraction(a * c, b * d)}$`,
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
        const ordreDesFractions = randint(1, 2)
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
        const s = pgcd(a * k + c, d)
        if (s !== 1) {
          texteCorr += `$=${texFraction(calcul((a * k + c) / s) + miseEnEvidence('\\times ' + s), calcul(d / s) + miseEnEvidence('\\times ' + s))}=${texFractionReduite(calcul((a * k + c) / s), calcul(d / s))}$`
        }
        if ((this.modeQcm && !context.isAmc) || (this.interactif && this.interactifType === 'qcm')) {
          texte += '<br>' + propositionsQcm(this, i).texte
        }
        if (context.isHtml && this.interactifType === 'mathLive') {
          setReponse(this, i, new Fraction(a * d + c * b, b * d), { formatInteractif: 'fractionEgale' })
        }
      } else { // une soustraction
        /** ***************** Choix des réponses du QCM ***********************************/
        this.autoCorrection[i].propositions = [
          {
            texte: `$${texFractionReduite(Math.abs(a * d - c * b), Math.abs(b * d))}$`,
            statut: true
          },
          {
            texte: `$${texFraction(Math.abs(a - c), Math.abs(b - d))}$`,
            statut: false
          },
          {
            texte: `$${texFraction(Math.abs(a - c), b * d)}$`,
            statut: false
          },
          {
            texte: `$${texFraction(a * c, b * d)}$`,
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
        const s = pgcd(a * k - c, d)
        if (!this.modeQcm) {
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
          setReponse(this, i, new Fraction(Math.abs(a * d - c * b), b * d), { formatInteractif: 'fractionEgale' })
        }
      }
      if (context.isHtml && this.interactifType === 'mathLive') texte += ajouteChampTexteMathLive(this, i)
      texte = texte.replaceAll('$$', ' ')
      texteCorr = texteCorr.replaceAll('$$', ' ')
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }

  this.besoinFormulaireNumerique = ['Valeur maximale du coefficient multiplicateur', 99999]
  this.besoinFormulaire2Numerique = ['Types de calculs', 3, '1 : Additions\n2 : Soustractions\n3 : Additions et soustractions']
}
