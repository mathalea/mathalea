import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texteEnCouleurEtGras } from '../../modules/outils.js'
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

    const a = randint(0, 4)
    const iris = nombrePremier[a]
    const b = randint(0, 4, [a])
    const rose = nombrePremier[b]
    let texte, texteCorr
    texte = `Un fleuriste dispose de ${iris * bouquet} iris et de ${rose * bouquet} roses. <br>`
    texte += 'Il veut en utilisant toutes ses fleurs réaliser un maximum de bouquets '
    texte += 'contenant tous le même nombre d’iris et le même nombre de roses. <br>'
    texte += 'Donner le nombre maximal de bouquets que le fleuriste peut réaliser '
    texte += 'et la composition du bouquet.<br>'
    texte += 'a) Nombre maximal de bouquets : <br>'
    texte += ajouteChampTexteMathLive(this, 0)
    texteCorr = 'METHODE<br>'
    texteCorr += 'a) Pour trouver le nombre maximal de bouquets :<br>'
    texteCorr += `- Ecrire tous les diviseurs de ${iris * bouquet}<br>`
    texteCorr += `- Ecrire tous les diviseurs de ${rose * bouquet}<br>`
    texteCorr += 'Trouver le plus grand diviseur commun : '
    texteCorr += ' ce nombre est le nombre maximal de bouquets<br>'
    texteCorr += texteEnCouleurEtGras(`Le nombre maximal de bouquets est : ${bouquet} <br><br>`)
    setReponse(this, 0, bouquet)

    texte += 'b) Nombre d’iris dans chaque bouquet :<br>'
    texte += ajouteChampTexteMathLive(this, 1)
    texteCorr += `b) Pour trouver le nombre d’iris : diviser ${iris * bouquet} par le nombre maximal de bouquets.<br>`
    texteCorr += texteEnCouleurEtGras(`Le nombre d’iris dans chaque bouquet est : ${iris} <br><br>`)
    setReponse(this, 1, iris)

    texte += 'c) Nombre de roses dans chaque bouquet :'
    texte += ajouteChampTexteMathLive(this, 2)
    texteCorr += `c) Pour trouver le nombre de roses : diviser ${rose * bouquet} par le nombre maximal de bouquets.<br>`
    texteCorr += texteEnCouleurEtGras(`Le nombre de roses dans chaque bouquet est : ${rose} <br>`)
    setReponse(this, 2, rose)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
// this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
