import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Valeurs remarquables du cosinus et sinus'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '14/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence
*/
export default function CosetSin () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Donner la valeur exacte de :'
  this.nbQuestions = 5 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['1', '2', '3', '4', '5', '6', '7', '8'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case '1':
          texte = '$\\cos(\\pi)$' // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = '$\\cos(\\pi)=-1$'
          break
        case '2':
          texte = '$\\cos(-\\pi)$' // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = '$\\cos(-\\pi)=-1$'
          break
        case '3':
          texte = '$\\cos(2\\pi)$' // Le LateX entre deux symboles $, les variables dans des ${ }

          texteCorr = '$\\cos(2\\pi)=1$'

          break
        case '4':
          texte = '$\\cos(0)$' // Le LateX entre deux symboles $, les variables dans des ${ }

          texteCorr = '$\\cos(0)=1$'

          break
        case '5':
          texte = '$\\cos(\\dfrac{\\pi}{6})$'

          texteCorr = '$\\cos(\\dfrac{\\pi}{6})=\\dfrac{\\sqrt{3}}{2}$'

          break
        case '6':
          texte = '$\\cos(5\\dfrac{\\pi}{6})$'

          texteCorr = '$\\cos(5\\dfrac{\\pi}{6})=-\\dfrac{\\sqrt{3}}{2}$'

          break
        case '7':
          texte = '$\\cos(-\\dfrac{\\pi}{6})$'

          texteCorr = '$\\cos(-\\dfrac{\\pi}{6})=\\dfrac{\\sqrt{3}}{2}$'

          break
        case '8':
          texte = '$\\cos(-\\dfrac{5\\pi}{6})$'

          texteCorr = '$\\cos(-\\dfrac{5\\pi}{6})=-\\dfrac{\\sqrt{3}}{2}$'

          break
        case '9':
          texte = '$\\cos(\\dfrac{\\pi}{4})$'

          texteCorr = '$\\cos(\\dfrac{\\pi}{4})=\\dfrac{\\sqrt{2}}{2}$'

          break
        case '10':
          texte = '$\\cos(-\\dfrac{\\pi}{4})$'

          texteCorr = '$\\cos(-\\dfrac{\\pi}{4})=\\dfrac{\\sqrt{2}}{2}$'

          break
        case '11':
          texte = '$\\cos(\\dfrac{3\\pi}{4})$'

          texteCorr = '$\\cos(\\dfrac{3\\pi}{4})=-\\dfrac{\\sqrt{2}}{2}$'

          break
        case '12':
          texte = '$\\cos(\\dfrac{5\\pi}{4})$'

          texteCorr = '$\\cos(\\dfrac{5\\pi}{4})=-\\dfrac{\\sqrt{2}}{2}$'

          break
        case '13':
          texte = '$\\cos(-\\dfrac{3\\pi}{4})$'

          texteCorr = '$\\cos(-\\dfrac{3\\pi}{4})=-\\dfrac{\\sqrt{2}}{2}$'

          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
