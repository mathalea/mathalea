import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { tableauDeVariation } from '../../modules/2d.js'
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
    this.titre = titre
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
    for (let i = 0, texte, texteCorr, ligne1, ligne2, ligne3, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const a = randint(1, 2) // On définit les variables aléatoires de l'exo...
      const b = randint(2, 3) // Ici ça ne sert à rien, c'est juste pour la fonction questionJamaisPosee()
      const c = randint(13, 54)
      const d = randint(24, 39)
      // Cet exercice montre juste comment fonctionne la fonction tableauDeVariation
      // Pour le voir appliqué en conditions réelles, voir 2N61-2 pour des tableaux de signes et P010 pour des tableaux de variations

      // Les lignes sont des tableaux qui alternent chaîne de caractère et 'nombre de pixels de largeur estimée du texte pour le centrage'
      // La première chaîne : 'Line' indique que c'est pour un tableau de signes et valeurs, 'Var' indique que c'est une ligne de variations
      ligne1 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'd', 20, '+', 20] // '' indique qu'il n'y a rien à afficher dans un tableau de signes (pour laisser un espace sous la borne par exemple)
      ligne2 = ['Line', 30, '', 0, '+', 20, 't', 20, '-', 20, 'd', 20, '+', 20] // 'z' pour avoir un zéro sur des pointillés, 't' pour juste les pointillés, 'd' pour des double barres
      ligne3 = ['Var', 10, '+/$+\\infty$', 30, 'R/', 90, '-/50', 90, '+/$+\\infty$', 30] // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

      // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
      texte = mathalea2d({ xmin: -0.5, ymin: -9.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
        tabInit: [
          [
            // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
            ['$x$', 2, 30], ['$x + 2$', 2, 50], ['$x + 1$', 2, 50], ['$\\cfrac{x + 2}{x + 1}$', 3, 50]
          ],
          // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
          ['$-\\infty$', 30, '$-2$', 20, '$-1$', 20, '$+\\infty$', 30]
        ],
        // tabLines ci-dessous contient les autres lignes du tableau.
        tabLines: [ligne1, ligne2, ligne3],
        colorBackground: '',
        espcl: 3.5, // taille en cm entre deux antécédents
        deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
        lgt: 8, // taille de la première colonne en cm
        hauteurLignes: [15, 15, 15, 15]
      }))
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
