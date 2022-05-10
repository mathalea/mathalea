import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { mathalea2d, tableau } from '../../modules/2d.js'
export const titre = 'Nom de l\'exercice'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.consigne = 'Consigne'
    this.nbQuestions = 1
    this.nbCols = 2
    this.nbColsCorr = 2
    this.tailleDiaporama = 3
    this.video = ''
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let a, b, c, d // On définit les variables aléatoires de l'exo...

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(1, 2) // Ici ça ne sert à rien, c'est juste pour la fonction questionJamaisPosee()
      b = randint(2, 3) // A adapter selon les besoins de l'exo
      c = randint(13, 54)
      d = randint(24, 39)

      const monTableau = tableau({
        ligne1: ['\\text{Masse (en g)}', 150, 450, 600, '4~500'], // Contenu des cases de la première ligne
        ligne2: ['\\text{Prix (en euros)}', 3], // Contenu des cases de la deuxième ligne
        flecheHaut: [[1, 2, '\\times3'], [2, 4, '\\times10']], // Liste des flèches qui passent par en haut
        flecheBas: [[1, 4, '\\times30', 3.5], [2, 3, '\\times \\dfrac{4}{3}']], // Le paramètre 3.5 ajouté permet de davantage éloigner la flèche du tableau
        flecheDroite: '\\times 50', // Contenu de la flèche à droite éventuelle
        flecheDroiteSens: 'haut' // Sens de la flèche à droite : 'haut' ou 'bas'
      })
      texte = 'Question sur le tableau suivant <br>'
      texte += mathalea2d({ xmin: -1, xmax: 22, ymin: -7, ymax: 8 }, monTableau)
      texteCorr = 'Correction'
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, a, b, c, d)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
