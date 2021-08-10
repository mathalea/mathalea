import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Problème Les iris et les roses'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Description didactique de l'exercice
 * @author Laurence Candille
 * Référence 3A14
*/
export default function ProblèmeArithmétiqueLePlusGrandNombreDeBouquets () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestionsModifiable = false
  // this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.interactif = true
  this.interactifType = 'mathLive'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const nombrePremier = [2, 3, 5, 7, 11]
    const bouquet = randint(30, 39)

    const a = randint(1, 5)
    const iris = nombrePremier[a]
    const b = randint(1, 5, [a])
    const rose = nombrePremier[b]
    let texte, texteCorr
    texte = `Un fleuriste dispose de ${iris * bouquet} iris et de ${rose * bouquet} roses. <br>`
    texte += '<br>'
    texte += 'a) Quel est le nombre de bouquets ?<br>'
    texte += ajouteChampTexteMathLive(this, 0)
    texteCorr = 'Correction  1'
    setReponse(this, 0, bouquet)

    texte += 'b) Quel est le nombre de d iris ?<br>'
    texte += ajouteChampTexteMathLive(this, 1)
    texteCorr += 'Correction  2'
    setReponse(this, 1, iris)

    texte += 'c) Quel est le nombre de roses ?'
    texte += ajouteChampTexteMathLive(this, 2)
    texteCorr += 'Correction 3'
    setReponse(this, 2, rose)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
// this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
