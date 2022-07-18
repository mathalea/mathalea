import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texFraction } from '../../modules/outils.js'
import { mathalea2d, polygone, point } from '../../modules/2d.js'
import { fractionCliquable, rectangleCliquable } from '../../modules/2dinteractif'
import { afficheScore } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
export const titre = 'Fractions interactives'
export const interactifReady = true
export const interactifType = 'custom'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Rémi Angot
 * Référence
*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = ''
    this.nbQuestions = 5 // Nombre de questions par défaut
    this.nbCols = 1 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
    this.tailleDiaporama = 3
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const longueur = 5
    const hauteur = (context.isHtml) ? 1 : 0.6
    const ecart = 0.5
    const barres = []
    const nbParts = []
    const ymin = (context.isHtml) ? -2 : -0.1
    const unite = polygone(point(0, 0), point(longueur, 0), point(longueur, hauteur), point(0, hauteur))
    this.introduction = `Pour chaque question, l'unité est représentée par ce rectangle : ${mathalea2d({ xmin: -0.1, ymin: -0.1, ymax: hauteur + 0.1, style: 'display: inline; vertical-align: -5px' }, unite)}`
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const n = randint(1, 4)
      const d = randint(2, 4)
      nbParts[i] = n
      barres[i] = fractionCliquable(0, 0, 3, d, { longueur, ecart, hauteur, liste1: [1, 3, 6], liste2: [2, 4], hachures2: true, couleur2: 'blue', cliquable: false })
      texte = `Colorie $${texFraction(n, d)}$. ${mathalea2d({ xmin: -0.5, xmax: 18, ymin, ymax: hauteur + 0.2 }, rectangleCliquable(0, 0, 4, 1, { etat: true }))}`
      texte += '<br>' + mathalea2d({ xmin: -0.5, xmax: 18, ymin, ymax: hauteur + 0.2 }, barres[i])
      texteCorr = 'Rien'

      if (this.interactif && context.isHtml) {
        texte += `<div id="resultatCheckEx${this.numeroExercice}Q${i}"></div>`
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, n, d)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        // Ici, a est utilisée mais pas b, c et d, alors supprime ces trois derniers !
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    // Bloquer l'interactivité
    if (!this.interactif) {
      document.addEventListener('exercicesAffiches', () => {
        for (let i = 0; i < this.nbQuestions; i++) {
          for (const rectangle of barres[i]) {
            rectangle.stopCliquable()
          }
        }
      })
    }
    // Gestion de la correction
    this.correctionInteractive = (elt) => {
      let nbBonnesReponses = 0
      let nbMauvaisesReponses = 0
      for (let i = 0; i < this.nbQuestions; i++) {
        let nbPartsColoriees = 0
        for (const rectangle of barres[i]) {
          if (rectangle.etat) nbPartsColoriees++
          rectangle.stopCliquable()
        }
        const divFeedback = document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${i}`)

        if (nbPartsColoriees === nbParts[i]) {
          divFeedback.innerHTML = '😎'
          nbBonnesReponses++
        } else {
          divFeedback.innerHTML = '☹️'
          nbMauvaisesReponses++
        }
      }
      afficheScore(this, nbBonnesReponses, nbMauvaisesReponses)
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
