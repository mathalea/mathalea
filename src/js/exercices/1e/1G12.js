import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, ecritureAlgebrique, estentier } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'cos et sin associés à un réel x '
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '20/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence
*/
export default function MesurePrincipale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Déterminer une écriture plus simple, en fonction de $\\cos(x)$ ou $\\sin(x) $'
  this.nbQuestions = 3 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':

          texte = '$\\cos(x+\\pi)=\\ldots$'
          if (this.interactif) {
            setReponse(this, i, 'cos(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          }
          texteCorr = '$\\cos(x+\\pi)=-\\cos(x)$'
          break
        case 'type2':
          texte = '$\\cos(x-\\pi)=\\ldots$'
          if (this.interactif) {
            setReponse(this, i, '$-\\cos(x)$')
          }
          texteCorr = '$\\cos(x-\\pi)=-\\cos(x)$'

          break
        case 'type3':
          texte = '$\\cos(x+\\dfrac{\\pi}{2})=\\ldots$'
          if (this.interactif) {
            setReponse(this, i, '$-\\sin(x)$')
          }
          texteCorr = '$\\cos(x+\\dfrac{\\pi}{2})=-\\sin(x)$'
          break
        case 'type4':
          texte = '$\\cos(\\dfrac{\\pi}{2}-x)=\\ldots$'
          if (this.interactif) {
            setReponse(this, i, '$-\\sin(x)$')
          }
          texteCorr = '$\\cos(\\dfrac{\\pi}{2}-x)=\\sin(x)$'
          break
        case 'type5':
          k = randint(-5, 5, [0, 1])
          texte = `$\\cos(x${ecritureAlgebrique(k)} \\pi)=\\ldots$`
          if (this.interactif) {
            if (estentier(k / 2)) { setReponse(this, i, '$\\cos(x)$') } else { setReponse(this, i, '$-\\cos(x)$') }
          }
          if (estentier(k / 2)) { texteCorr = `$\\cos(x${ecritureAlgebrique(k)}\\pi)=\\cos(x)$` } else { texteCorr = `$\\cos(x${ecritureAlgebrique(k)}\\pi)=-\\cos(x)$` }
          break
        case 'type6':

          texte = '$\\sin(x+\\pi)=\\ldots$'
          texteCorr = '$\\sin(x+\\pi)=-\\sin(x)$'
          break
        case 'type7':
          texte = '$\\sin(x-\\pi)=\\ldots$'
          texteCorr = '$\\sin(x-\\pi)=-\\sin(x)$'
          break
        case 'type8':
          texte = '$\\sin(x+\\dfrac{\\pi}{2})=\\ldots$'
          texteCorr = '$\\sin(x+\\dfrac{\\pi}{2})=\\cos(x)$'
          break
        case 'type9':
          texte = '$\\sin(\\dfrac{\\pi}{2}-x)=\\ldots$'
          texteCorr = '$\\sin(\\dfrac{\\pi}{2}-x)=\\cos(x)$'
          break
        case 'type10':
          k = randint(-5, 5, [0, 1])
          texte = `$\\sin(x${ecritureAlgebrique(k)} \\pi)=\\ldots$`
          if (estentier(k / 2)) { texteCorr = `$\\sin(x${ecritureAlgebrique(k)}\\pi)=\\sin(x)$` } else { texteCorr = `$\\sin(x${ecritureAlgebrique(k)}\\pi)=-\\sin(x)$` }
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
