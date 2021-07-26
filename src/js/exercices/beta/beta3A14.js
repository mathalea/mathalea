import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListesSansChangerOrdre, randint } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Problème Les iris et les roses'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3'] // On créé 3 types de questions
    const nombrePremier = [2, 3, 5, 7, 11]
    const listeTypeQuestions = combinaisonListesSansChangerOrdre(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    const bouquet = randint(30, 39)

    const a = randint(1, 5)
    const iris = nombrePremier[a]
    const b = randint(1, 5, [a])
    const rose = nombrePremier[b]
    let texte
    texte = `Un fleuriste dispose de ${iris * bouquet} et de ${rose * bouquet}`

    for (let i = 0, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          texte += `Question ${i + 1} de type 1. Quel est le nombre de bouquets`
          texte += ajouteChampTexteMathLive(this, i)
          texteCorr = `Correction ${i + 1} de type 1`
          setReponse(this, i, bouquet)
          break
        case 'type2':
          texte += `Question ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
        case 'type3': // Table de 200
          texte += `Question ${i + 1} de type 3`
          texteCorr = `Correction ${i + 1} de type 2`
          break
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
