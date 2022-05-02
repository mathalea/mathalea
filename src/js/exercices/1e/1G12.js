import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, ecritureAlgebrique } from '../../modules/outils.js'
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
  this.sup = 1
  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case '1':
          texte = '$\\cos\\big(x+\\pi\\big)=$'
          if (this.interactif) {
            setReponse(this, i, '-cos(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\cos(x+\\pi)=-\\cos(x)$'
          break
        case '2':
          texte = '$\\cos\\big(x-\\pi\\big)=$'
          if (this.interactif) {
            setReponse(this, i, '-cos(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\cos(x-\\pi)=-\\cos(x)$'

          break
        case '3':
          texte = '$\\cos\\left(x+\\dfrac{\\pi}{2}\\right)=$'
          if (this.interactif) {
            setReponse(this, i, '-sin(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\cos\\left(x+\\dfrac{\\pi}{2}\\right)=-\\sin(x)$'
          break
        case '4':
          texte = '$\\cos\\left(\\dfrac{\\pi}{2}-x\\right)=$'
          if (this.interactif) {
            setReponse(this, i, 'sin(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\cos\\left(\\dfrac{\\pi}{2}-x\\right)=\\sin(x)$'
          break
        case '5':
          texte = '$\\cos\\big(x+3 \\pi\\big)=$'
          if (this.interactif) {
            setReponse(this, i, '-cos(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = `$\\cos(x${ecritureAlgebrique(k)}\\pi)=-\\cos(x)$`
          break
        case '6':
          texte = '$\\sin\\big(x+\\pi\\big)=$'
          if (this.interactif) {
            setReponse(this, i, '-sin(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\sin(x+\\pi)=-\\sin(x)$'
          break
        case '7':
          texte = '$\\sin\\big(x-\\pi\\big)=$'
          if (this.interactif) {
            setReponse(this, i, '-sin(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\sin(x-\\pi)=-\\sin(x)$'
          break
        case '8':
          texte = '$\\sin\\left(x+\\dfrac{\\pi}{2}\\right)=$'
          if (this.interactif) {
            setReponse(this, i, 'cos(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\sin\\left(x+\\dfrac{\\pi}{2}\\right)=\\cos(x)$'
          break
        case '9':
          texte = '$\\sin\\left(\\dfrac{\\pi}{2}-x\\right)=$'
          if (this.interactif) {
            setReponse(this, i, 'cos(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\sin\\left(\\dfrac{\\pi}{2}-x\\right)=\\cos(x)$'
          break
        case '10':
          texte = '$\\sin\\big(x+3 \\pi\\big)=$'
          if (this.interactif) {
            setReponse(this, i, '-sin(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\sin(x+3 \\pi)=-\\sin(x)$'
          break
        case '11':
          texte = '$\\sin\\big(x+2 \\pi\\big)=$'
          if (this.interactif) {
            setReponse(this, i, 'sin(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\sin(x+2 \\pi)=\\sin(x)$'
          break
        case '12':
          texte = '$\\cos\\big(x+2 \\pi\\big)=$'
          if (this.interactif) {
            setReponse(this, i, 'cos(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\cos(x+2 \\pi)=\\cos(x)$'
          break
        case '13':
          texte = '$\\cos\\big(-x\\big)=$'
          if (this.interactif) {
            setReponse(this, i, 'cos(x)', { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, i, 'inline nospacebefore', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\cos(-x)=\\cos(x)$'
          break
        case '14':
          texte = '$\\sin\\big(-x\\big)=$'
          if (this.interactif) {
            setReponse(this, i, '-sin(x)', { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, i, 'inline25 nospacebefore trigo', { tailleExtensible: true })
          } else { texte += '$\\ldots$' }
          texteCorr = '$\\sin(-x)=-\\sin(x)$'
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
