import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint } from '../../modules/outils.js'
import { mathalea2d, tableauDeVariation } from '../../modules/2d.js'
export const titre = 'Nom de l\'exercice'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Consigne'
  this.nbQuestions = 10 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, ligne1, a1, a2, x1, x2, x3, y1, y2, y3, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          texte = 'On donne ci-dessous, le tableau de variations d\'une fonction $f$. <br>'

          x1 = randint(-8, -3) // 3 antécédents 1ère ligne tableau
          x2 = randint(x1 + 5, x1 + 12)// 3 antécédents 1ère ligne tableau
          x3 = randint(x2 + 6, x2 + 12)// 3 antécédents 1ère ligne tableau
          y1 = randint(-10, -2)// 3 images des antécédents 1ère ligne tableau
          y2 = randint(y2 + 2, y2 + 10)// 3 images des antécédents 1ère ligne tableau
          y3 = randint(y2 - 3, y3 - 10)// 3 images des antécédents 1ère ligne tableau
          a1 = randint(x1 + 1, x2 - 1) // 1er antécédent dont on doit comparer l'image
          a2 = randint(x2 + 1, x3 - 1) // 1er antécédent dont on doit comparer l'image
          texte += `A partir des informations de l'énoncé, comparer : $f(${a1})$ et $f(${a2})$<br>`
          ligne1 = ['Var', 10, `-/$${y1}$`, `+/$${y2}$`, 30, `-/$${y3}$`, 30] // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

          // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
          texte += mathalea2d({ xmin: -0.5, ymin: -9.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
            tabInit: [
              [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 2, 30], ['$f(x)$', 2, 50]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x1}$`, 20, `$${x2}$`, 20, `$${x3}$`, 30]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [ligne1],
            colorBackground: '',
            espcl: 3.5, // taille en cm entre deux antécédents
            deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 8, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          }))

          texteCorr = `Correction ${i + 1} de type 1`
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
