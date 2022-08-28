import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes } from '../../modules/outils.js'
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
export const uuid = 'b9e6a'
export const ref = '1G12'
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

    const typeQuestionsDisponibles = [
      {
        texte: '$\\cos\\big(x+\\pi\\big)=$',
        reponse: '-cos(x)',
        texteCorr: '$\\cos(x+\\pi)=-\\cos(x)$'
      },

      {
        texte: '$\\cos\\big(x-\\pi\\big)=$',
        reponse: '-cos(x)',
        texteCorr: '$\\cos(x-\\pi)=-\\cos(x)$'
      },
      {
        texte: '$\\cos\\left(x+\\dfrac{\\pi}{2}\\right)=$',
        reponse: '-sin(x)',
        texteCorr: '$\\cos\\left(x+\\dfrac{\\pi}{2}\\right)=-\\sin(x)$'
      },
      {
        texte: '$\\cos\\left(\\dfrac{\\pi}{2}-x\\right)=$',
        reponse: 'sin(x)',
        texteCorr: '$\\cos\\left(\\dfrac{\\pi}{2}-x\\right)=\\sin(x)$'
      },
      {
        texte: '$\\cos\\big(x-5\\pi\\big)=$',
        reponse: '-cos(x)',
        texteCorr: '$\\cos(x-5\\pi)=-\\cos(x)$'
      },
      {
        texte: '$\\cos\\big(x-3\\pi\\big)=$',
        reponse: '-cos(x)',
        texteCorr: '$\\cos(x-3\\pi)=-\\cos(x)$'
      },
      {
        texte: '$\\cos\\big(x+5\\pi\\big)=$',
        reponse: '-cos(x)',
        texteCorr: '$\\cos(x+5\\pi)=-\\cos(x)$'
      },
      {
        texte: '$\\cos\\big(x+3\\pi\\big)=$',
        reponse: '-cos(x)',
        texteCorr: '$\\cos(x+3\\pi)=-\\cos(x)$'
      },
      {
        texte: '$\\sin\\big(x+\\pi\\big)=$',
        reponse: '-sin(x)',
        texteCorr: '$\\sin(x+\\pi)=-\\sin(x)$'
      },
      {
        texte: '$\\sin\\big(x+3\\pi\\big)=$',
        reponse: '-sin(x)',
        texteCorr: '$\\sin(x+3\\pi)=-\\sin(x)$'
      },
      {
        texte: '$\\sin\\big(x+5\\pi\\big)=$',
        reponse: '-sin(x)',
        texteCorr: '$\\sin(x+5\\pi)=-\\sin(x)$'
      },
      {
        texte: '$\\sin\\big(x-\\pi\\big)=$',
        reponse: '-sin(x)',
        texteCorr: '$\\sin(x-\\pi)=-\\sin(x)$'
      },
      {
        texte: '$\\sin\\big(x-3\\pi\\big)=$',
        reponse: '-sin(x)',
        texteCorr: '$\\sin(x-3\\pi)=-\\sin(x)$'
      },
      {
        texte: '$\\sin\\big(x-5\\pi\\big)=$',
        reponse: '-sin(x)',
        texteCorr: '$\\sin(x-5\\pi)=-\\sin(x)$'
      },
      {
        texte: '$\\sin\\left(x+\\dfrac{\\pi}{2}\\right)=$',
        reponse: 'cos(x)',
        texteCorr: '$\\sin\\left(x+\\dfrac{\\pi}{2}\\right)=\\cos(x)$'
      },
      {
        texte: '$\\sin\\left(\\dfrac{\\pi}{2}-x\\right)=$',
        reponse: 'cos(x)',
        texteCorr: '$\\sin\\left(\\dfrac{\\pi}{2}-x\\right)=\\cos(x)$'
      },
      {
        texte: '$\\sin\\big(x+2\\pi\\big)=$',
        reponse: 'sin(x)',
        texteCorr: '$\\sin(x+2\\pi)=\\sin(x)$'
      },
      {
        texte: '$\\sin\\big(x+4\\pi\\big)=$',
        reponse: 'sin(x)',
        texteCorr: '$\\sin(x+4\\pi)=\\sin(x)$'
      },
      {
        texte: '$\\sin\\big(x-2\\pi\\big)=$',
        reponse: 'sin(x)',
        texteCorr: '$\\sin(x-2\\pi)=\\sin(x)$'
      },
      {
        texte: '$\\sin\\big(x-4\\pi\\big)=$',
        reponse: 'sin(x)',
        texteCorr: '$\\sin(x-4\\pi)=\\sin(x)$'
      },
      {
        texte: '$\\cos\\big(x+4\\pi\\big)=$',
        reponse: 'cos(x)',
        texteCorr: '$\\cos(x+4\\pi)=\\cos(x)$'
      },
      {
        texte: '$\\cos\\big(x-2\\pi\\big)=$',
        reponse: 'cos(x)',
        texteCorr: '$\\cos(x-2\\pi)=\\cos(x)$'
      },
      {
        texte: '$\\cos\\big(x+2\\pi\\big)=$',
        reponse: 'cos(x)',
        texteCorr: '$\\cos(x+2\\pi)=\\cos(x)$'
      },
      {
        texte: '$\\cos\\big(x-4\\pi\\big)=$',
        reponse: 'cos(x)',
        texteCorr: '$\\cos(x-4\\pi)=\\cos(x)$'
      },
      {
        texte: '$\\cos\\big(-x\\big)=$',
        reponse: 'cos(x)',
        texteCorr: '$\\cos(-x)=\\cos(x)$'
      },
      {
        texte: '$\\sin\\big(-x\\big)=$',
        reponse: '-sin(x)',
        texteCorr: '$\\sin(-x)=-\\sin(x)$'
      }
    ]
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      texte = listeTypeQuestions[i].texte
      setReponse(this, i, listeTypeQuestions[i].reponse, { formatInteractif: 'texte' })
      texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline nospacebefore grecTrigo') // n'ajoute rien si on n'est pas en interactif
      if (!this.interactif) texte += '$\\ldots$'

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, listeTypeQuestions[i].texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(listeTypeQuestions[i].texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
