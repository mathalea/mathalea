import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, calcul, texNombrec, texNombre, texFraction } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const amcReady = true
export const amcType = 'AMCNum' // type de question AMC
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Calculer mentalement le pourcentage dun nombre'

/**
 * Calculer 10, 20, 30, 40 ou 50% d'un nombre
 * @author Rémi Angot + Jean-Claude Lhote
 * 6N33-1
 * Ajout niveau 2 + 1 correction différente cgrolleau 03/2021
 */
export default function PourcentageDunNombre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 5
  this.consigne = 'Calculer :'
  this.spacing = 2
  this.spacingCorr = 3.5
  this.nbCols = 2
  this.nbColsCorr = 1
  this.sup = 1
  this.interactif = false

  this.nouvelleVersion = function () {
    let listePourcentages = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (
      let i = 0, p, n, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;
    ) {
      switch (parseInt(this.sup)) { // niveu de difficulté.
        case 1:
          listePourcentages = [10, 20, 30, 40, 50]
          n = choice([randint(2, 9), randint(2, 9) * 10, randint(1, 9) * 10 + randint(1, 2)])
          break
        case 2: // niveau 2 : ajout de 25%, 60% et 90% + possibilité d'avoir n'importe quel multiple de 4 entre 4 et 200
          listePourcentages = [10, 20, 25, 30, 40, 50, 60, 90]
          n = choice([randint(2, 9), randint(2, 9) * 10, randint(1, 9) * 10 + randint(1, 2), randint(1, 50) * 4])
          break
      }
      p = choice(listePourcentages)
      texte = `$${p}~\\%~\\text{de }${n}$`
      switch (p) {
        case 50 :
          texteCorr = `$${p}~\\%~\\text{de }${n}=${n}\\div${2} = ${texNombre(calcul(n / 2))}$` // calcul de n/2 si p = 50%
          break
        case 25 :
          texteCorr = `$${p}~\\%~\\text{de }${n}=${n}\\div${4} = ${texNombre(calcul(n / 4))}$` // calcul de n/4 si p = 25%
          break
        default :
          texteCorr = `$${p}~\\%~\\text{de }${n}=${texFraction(p, 100)}\\times${n}=(${p}\\times${n})\\div100=${texNombre(p * n)}\\div100=${texNombre(calcul((p * n) / 100))}$`
          if (this.sup2) {
            texteCorr += `<br>$${p}~\\%~\\text{de }${n}=${texFraction(p, 100)}\\times${n}=(${n}\\div100)\\times${p}=${texNombrec(calcul(n / 100))}\\times${p}=${texNombre(calcul((p * n) / 100))}$`
            texteCorr += `<br>$${p}~\\%~\\text{de }${n}=${texFraction(p, 100)}\\times${n}=${texNombrec(calcul(p / 100))}\\times${n}=${texNombre(calcul((p * n) / 100))}$`
            if (p === 60) {
              texteCorr += `<br>$${p}~\\%~\\text{de }${n}$ c'est $50~\\%~\\text{de }${n}$
plus $10 ~\\%~\\text{de }${n} $ soit la moitié de $ ${n} \\text{ plus } 10 ~\\%~\\text{de }${n} $ :
$${p}~\\%~\\text{de }${n}=${n}\\div${2} + ${n}\\div${10} =  ${texNombre(calcul(n * 0.6))}$`
            } else if (p === 90) {
              texteCorr += `<br>$${p}~\\%~\\text{de }${n}$ c'est $${n}$
moins $10 ~\\%~\\text{de }${n} $ :
$${p}~\\%~\\text{de }${n}=${n} - ${n}\\div${10} =  ${texNombre(calcul(n * 0.9))}$`
            } else if (p > 10) {
              texteCorr += `<br>$${p}~\\%~\\text{de }${n}$ c'est $ ${calcul(p / 10)} $ fois $ 10 ~\\%~\\text{de }${n} $ :
$${p}~\\%~\\text{de }${n}= ${calcul(p / 10)} \\times ${n}\\div${10} =  ${texNombre(calcul((p * n) / 100))}$`
            }
          }
      }
      if (context.isHtml && this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
      setReponse(this, i, calcul(n * p / 100))
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte + '='
        this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: '' }]
        this.autoCorrection[i].reponse.param.digits = 3
        this.autoCorrection[i].reponse.param.decimals = 1
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
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    2,
    ' 1 : Pourcentages 10, 20, 30, 40, 50 \n 2 : Pourcentages 10, 20, 25, 30, 40, 50, 60, 90'
  ]
  this.besoinFormulaire2CaseACocher = ['Plusieurs méthodes']
}
