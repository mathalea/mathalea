import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, choice, randint } from '../../modules/outils.js'
import { courbe2, droite, mathalea2d, repere2 } from '../../modules/2d.js'
export const titre = 'Exercice exemple'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeFonctionsDisponibles = ['affine', 'carré', 'inverse']//, 'cube', 'racine carrée'] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeFonctionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, b, c, d, e, f, r, graph, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      r = repere2({ xMin: -10, yMin: -10, xMax: 10, yMax: 10 })
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'affine':
          a = randint(3, 12) / 4 * choice([-1, 1])
          b = randint(-9, 9, 0) / 4
          f = x => a * x + b
          graph = droite(a, -1, -b)

          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'carré':
          a = randint(3, 12) / 4 * choice([-1, 1])
          b = randint(-9, 9, 0) / 4
          f = x => a * (x + b) ** 2
          graph = courbe2(f, { repere: r, step: 0.3, xMin: -11, xMax: 11, yMin: -11, yMax: 11 })
          break
        case 'inverse':
          a = randint(3, 12) / 4 * choice([-1, 1])
          b = randint(-9, 9, 0) / 4
          f = x => a / x / b
          graph = courbe2(f, { repere: r, step: 0.1, xMin: -11, xMax: 11, yMin: -11, yMax: 11 })
          break

        case 'cube':
          texte = `Question ${i + 1} de type 3`
          texteCorr = `Correction ${i + 1} de type 3`
          break
        case 'racine carrée':
          texte = `Question ${i + 1} de type 3`
          texteCorr = `Correction ${i + 1} de type 3`
          break
      }
      graph.epaisseur = 2
      texte = 'Déterminer la croissance de la fonction $f$ représentée ci-dessous.'
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
