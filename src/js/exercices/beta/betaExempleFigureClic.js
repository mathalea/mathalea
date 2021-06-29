import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { demiDroite, droite, labelPoint, mathalea2d, point, segmentAvecExtremites } from '../../modules/2d.js'
export const titre = 'Choisir la bonne figure'
export const interactifReady = true
export const interactifType = 'cliqueFigure'

/**
 * Plusieurs éléments sont proposés, il faut cliquer sur le bon
 * @author ANGOT Rémi
 * Référence
*/
export default function cliqueFigure () {
  Exercice.call(this)
  this.consigne = 'Clique sur la bonne figure'
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.figures = [] // Liste des objets de toutes les figures sur lesquelles on pourra cliquer avec leur id et un booléen de réponse

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      const A = point(0, 0, 'A')
      const B = point(4, randint(-3, 3), 'B')
      const labels = labelPoint(A, B)
      texte = 'Le segment d\'extrémités $A$ et $B$.'
      texte += '<br>'
      texte += mathalea2d({ xmin: -4, xmax: 6, ymin: -1, style: '', id: `figure0Ex${this.numeroExercice}Q${i}` }, labels, segmentAvecExtremites(A, B))
      texte += mathalea2d({ xmin: -4, xmax: 6, ymin: -1, style: '', id: `figure1Ex${this.numeroExercice}Q${i}` }, labels, droite(A, B), segmentAvecExtremites(A, B))
      texte += mathalea2d({ xmin: -4, xmax: 6, ymin: -1, style: '', id: `figure2Ex${this.numeroExercice}Q${i}` }, labels, demiDroite(A, B), segmentAvecExtremites(A, B))
     texte += `<span id="resultatCheckEx${this.numeroExercice}Q${i}"></span>`
      texteCorr = mathalea2d({ xmin: -4, xmax: 6, ymin: -1, style: '', id: `figure3Ex${this.numeroExercice}Q${i}` }, labels, segmentAvecExtremites(A, B), segmentAvecExtremites(A, B))
      this.figures[i] = [{ id: `figure0Ex${this.numeroExercice}Q${i}`, solution: true },
        { id: `figure1Ex${this.numeroExercice}Q${i}`, solution: false },
        { id: `figure2Ex${this.numeroExercice}Q${i}`, solution: false },
        { id: `figure3Ex${this.numeroExercice}Q${i}`, solution: false }
      ]
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
