import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, criblePolynomeEntier } from '../../modules/outils.js'
import { courbe2, graphiqueInterpole, mathalea2d, repere2 } from '../../modules/2d.js'
export const titre = 'Exercice exemple'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function LecturesGraphiques () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeFonctionsDisponibles = ['interpolee', 'cubique'] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeFonctionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    let noeuds
    for (let i = 0, coeff, f, r, graph, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      r = repere2({ xMin: -10, yMin: -10, xMax: 10, yMax: 10 })
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'interpolee':
          noeuds = []
          for (let x = -10, y0 = -10; x <= 10; x += 2) {
            y0 = randint(-8, 8, y0)
            noeuds.push([x, y0])
          }
          graph = graphiqueInterpole(noeuds, { repere: r, step: 0.1 })
          texteCorr = 'La fonction représentée est une fonction affine. Toute fonction affine est monotone.'
          break
        case 'cubique':
          coeff = []
          coeff = criblePolynomeEntier()
          f = x => coeff[0][0] / coeff[0][1] * x ** 3 + coeff[1][0] / coeff[1][1] * x ** 2 + coeff[2][0] / coeff[2][1] * x + coeff[6]
          console.log(coeff)
          graph = courbe2(f, { repere: r })
          break
      }
      graph.epaisseur = 2
      texte = 'Lire graphiquement l\'image de $0$ par la fonction $f$ représentée ci-dessous.'
      texte += mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10 }, r, graph)
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
