import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texNombre, choice, calcul } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = 'Écrire une fraction sur 100 puis sous la forme d’un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
export const amcReady = true

/**
 * Une fraction étant donnée, il faut l'écrire avec 100 au dénominateur puis donner son écriture sous forme de pourcentage.
 * @author Rémi Angot
 * Référence 5N11-3
 * 2021-02-06
*/
export default function FractionVersPourcentage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Compléter :'
  this.nbQuestions = 6
  this.nbCols = 2
  this.nbColsCorr = 2

  this.besoinFormulaireNumerique = ['Difficulté', 2, '1 : Partir d\'une fraction de dénominateur autre que 100\n2 : Partir d\'une fraction de dénominateur 100']
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeDeDenominateurs = [10, 20, 50, 1000, 2, 4, 5, 200]
    const listeTypeDeQuestions = combinaisonListes(typeDeDenominateurs, this.nbQuestions)
    for (let i = 0, texte, texteCorr, percenti, den, num, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      den = listeTypeDeQuestions[i]
      if (den === 2) {
        num = choice([1, 3, 5])
      } else if (den === 1000) {
        num = 10 * randint(1, 99)
      } else if (den === 200) {
        num = 2 * randint(1, 99)
      } else {
        num = randint(1, den - 1)
      }
      percenti = calcul(num * 100 / den)
      if (this.sup === 1) {
        texte = `$\\dfrac{${num}}{${texNombre(den)}}=\\dfrac{\\phantom{XXXXXX}}{}=\\dfrac{}{100}= $${context.isHtml && this.interactif ? ajouteChampTexteMathLive(this, i, 'largeur10 inline', { texteApres: ' %' }) : '$\\ldots\\ldots\\%$'}`
        if (den < 100) {
          texteCorr = `$\\dfrac{${num}}{${texNombre(den)}}=\\dfrac{${num}{\\color{blue}\\times${calcul(100 / den)}}}{${den}{\\color{blue}\\times${calcul(100 / den)}}}=\\dfrac{${percenti}}{100}=${percenti}~\\%$`
        } else {
          texteCorr = `$\\dfrac{${num}}{${texNombre(den)}}=\\dfrac{${num}{\\color{blue}\\div${calcul(den / 100)}}}{${den}{\\color{blue}\\div${calcul(den / 100)}}}=\\dfrac{${percenti}}{100}=${percenti}~\\%$`
        }
      } else {
        texte = `$\\dfrac{${percenti}}{100}= $${context.isHtml && this.interactif ? ajouteChampTexteMathLive(this, i, 'largeur10 inline', { texteApres: ' %' }) : '$\\ldots\\ldots\\%$'}`
        texteCorr = `$\\dfrac{${percenti}}{100}=${percenti}~\\%$`
      }
      setReponse(this, i, percenti, { formatInteractif: 'calcul', digits: 3, decimals: 0 })
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
}
