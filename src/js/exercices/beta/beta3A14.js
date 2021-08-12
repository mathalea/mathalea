import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texteEnCouleurEtGras, listeDesDiviseurs } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Problème Les iris et les roses'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Description didactique de l'exercice
 * Trouver le nombre maximal de bouquets contenant le même nombre d'iris et de roses
 * en cherchant le plus grand diviseur commun de deux nombres.
 * Donner ensuite la composition de chaque bouquets.
 * @author Laurence Candille
 * Référence 3A14
 * Date août 2021
*/
export default function ProblèmeArithmétiqueLePlusGrandNombreDeBouquets () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestionsModifiable = false
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
    texte += 'et la composition du bouquet.<br><br>'
    texte += texteEnCouleurEtGras('a) ') + 'Nombre maximal de bouquets :&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;'
    texte += ajouteChampTexteMathLive(this, 0, 'inline largeur25')
    texteCorr = texteEnCouleurEtGras('a) ')
    texteCorr += `- Les diviseurs de ${iris * bouquet} sont : ${listeDesDiviseurs(iris * bouquet).join(', ')}.<br>`
    texteCorr += `&ensp;&ensp;- Les diviseurs de ${rose * bouquet} sont : ${listeDesDiviseurs(rose * bouquet).join(', ')}.<br>`
    texteCorr += `${bouquet} est le plus grand nombre qui divise à la fois ${iris * bouquet} et ${rose * bouquet} <br>`
    texteCorr += ' Le nombre maximal de bouquets est donc : ' + texteEnCouleurEtGras(`${bouquet}<br><br>`)
    setReponse(this, 0, bouquet)

    texte += texteEnCouleurEtGras('b) ') + 'Nombre d’iris dans chaque bouquet :&ensp;&ensp;&ensp;'
    texte += ajouteChampTexteMathLive(this, 1, 'inline largeur25')
    texteCorr += texteEnCouleurEtGras('b) ') + ` $${iris * bouquet} \\div ${bouquet} = ${iris}$.<br>`
    texteCorr += 'Le nombre d’iris dans chaque bouquet est :' + texteEnCouleurEtGras(` ${iris} <br><br>`)
    setReponse(this, 1, iris)

    texte += texteEnCouleurEtGras('c) ') + ' Nombre de roses dans chaque bouquet :'
    texte += ajouteChampTexteMathLive(this, 2, 'inline largeur25')
    texteCorr += texteEnCouleurEtGras('c) ') + ` $${rose * bouquet} \\div ${bouquet} = ${rose}$.<br>`
    texteCorr += 'Le nombre de roses dans chaque bouquet est :' + texteEnCouleurEtGras(` ${rose} <br>`)
    setReponse(this, 2, rose)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
// this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
