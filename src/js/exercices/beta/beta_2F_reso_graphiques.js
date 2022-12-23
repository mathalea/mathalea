import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { splineCatmullRom } from '../../modules/fonctionsMaths.js'
import { courbe, repere } from '../../modules/2d.js'
import { listeQuestionsToContenu, combinaisonListes, randint } from '../../modules/outils.js'
import { max, min } from 'mathjs'

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
    this.nbQuestions = 2 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.video = '' // Id YouTube ou url
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['2solA'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, r, tabY, f, F, c2, y1, y2, y3, y4, y5, y6, x0, ymin, ymax, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case '2solA':// Cas où f croissante puis décroissante avec 2 solutions
          y1 = -5
          y2 = y1 + randint(2, 8)
          y3 = min(y2 + randint(2, 5), 5)
          y4 = max(y3 - randint(2, 4), y2 + 1)
          y5 = y2
          y6 = y5 - randint(2, 4)
          x0 = randint(-5, -2)
          ymin = min(y1, y2, y3, y4, y5, y6, -1)
          ymax = max(y1, y2, y3, y4, y5, y6, 1)
          texte = `Résoudre $f(x)=${y2}$` // Le LateX entre deux symboles $, les variables dans des ${ }
          r = repere({ xMin: x0, xMax: x0 + 10, yMin: ymin, yMax: ymax, xUnite: 2, yUnite: 2 })

          tabY = [y1, y2, y3, y4, y5, y6] // Voici les ordonnées successives par lesquelles passera la courbe à partir de x0, puis x0 + step, ...
          f = splineCatmullRom({ tabY, x0, step: 2 }) // le tableau des ordonnées successives = tabY, x0 = -5, step = 1.
          F = x => f.image(x) // On crée une fonction de x f.image(x) est une fonction polynomiale par morceaux utilisée dans courbeSpline()
          // const c = courbeSpline(f, { repere: r, step: 0.1 }) // Une première façon de tracer la courbe.
          c2 = courbe(F, { repere: r, step: 0.1, color: 'red' }) // F peut ainsi être utilisée dans courbe.

          texte += this.contenu = mathalea2d({ xmin: -15, xmax: 15, ymin: -15, ymax: 15 }, r, c2)
          for (let i = 0; i < tabY.length; i++) {
            this.contenu += `(${x0 + i};${tabY[i]}), `
          }

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
