import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { splineCatmullRom } from '../../modules/fonctionsMaths.js'
import { courbe, repere } from '../../modules/2d.js'
import { listeQuestionsToContenu, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Resoudre graphiquement une équation'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Consigne'
    this.nbQuestions = 10 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.video = '' // Id YouTube ou url
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, r, tabY, f, F, c2, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          r = repere({ xMin: -5, xMax: 5, yMin: -5, yMax: 5, xUnite: 2, yUnite: 2 })

          tabY = [1, 0, -0, -2, 0, 1, 2, 1, 0, 1, -1] // Voici les ordonnées successives par lesquelles passera la courbe à partir de x0, puis x0 + step, ...
          f = splineCatmullRom({ tabY, x0: -5, step: 1 }) // le tableau des ordonnées successives = tabY, x0 = -5, step = 1.
          F = x => f.image(x) // On crée une fonction de x f.image(x) est une fonction polynomiale par morceaux utilisée dans courbeSpline()
          // const c = courbeSpline(f, { repere: r, step: 0.1 }) // Une première façon de tracer la courbe.
          c2 = courbe(F, { repere: r, step: 0.1, color: 'red' }) // F peut ainsi être utilisée dans courbe.

          this.contenu = mathalea2d({ xmin: -15, xmax: 15, ymin: -10, ymax: 10 }, r, c2)
          for (let i = 0; i < tabY.length; i++) {
            this.contenu += `(${-5 + i};${tabY[i]}), `
          }
          texte = `Question ${i + 1} de type 1` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'type2':
          texte = `Question ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
        case 'type3':
          texte = `Question ${i + 1} de type 3`
          texteCorr = `Correction ${i + 1} de type 3`
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
