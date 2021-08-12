import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { demiDroite, droite, labelPoint, mathalea2d, point, segmentAvecExtremites } from '../../modules/2d.js'
export const titre = 'Choisir la bonne figure'
export const interactifReady = true
export const interactifType = 'cliqueFigure'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
 * Date de publication
*/
export default function cliqueFigure () {
  Exercice.call(this)
  this.consigne = 'Clique sur la bonne figure'
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.interactif = true

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.figures = [] // Liste des objets de toutes les figures sur lesquelles on pourra cliquer avec leur id et un booléen de réponse

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const A = point(0, 0, 'A')
      const B = point(4, randint(-3, 3), 'B')
      const labels = labelPoint(A, B)
      texte = 'Le segment d\'extrémités $A$ et $B$.'
      texte += '<br>'
      // On ajoute au texte les différentes propositions (ici [AB], (AB) et [AB)) en utilisant i (numéro de la question) et this.numeroExercice pour faire en sorte d'avoir des identifiants uniques pour chaque figure cliquable
      texte += mathalea2d({ xmin: -4, xmax: 6, ymin: -1, style: '', id: `figure0Ex${this.numeroExercice}Q${i}` }, labels, segmentAvecExtremites(A, B))
      texte += mathalea2d({ xmin: -4, xmax: 6, ymin: -1, style: '', id: `figure1Ex${this.numeroExercice}Q${i}` }, labels, droite(A, B), segmentAvecExtremites(A, B))
      texte += mathalea2d({ xmin: -4, xmax: 6, ymin: -1, style: '', id: `figure2Ex${this.numeroExercice}Q${i}` }, labels, demiDroite(A, B), segmentAvecExtremites(A, B))
      // On ajoute ensuite l'emplacement destiné à recevoir le smiley qui indique si la réponse est juste ou pas
      texte += `<span id="resultatCheckEx${this.numeroExercice}Q${i}"></span>`
      // Dans la correction, on recopie la bonne réponse
      texteCorr = mathalea2d({ xmin: -4, xmax: 6, ymin: -1, style: '', id: `figure3Ex${this.numeroExercice}Q${i}` }, labels, segmentAvecExtremites(A, B), segmentAvecExtremites(A, B))
      // On crée la liste des figures cliquables en utilisant les identifiants uniques créés précédemment en indiquant lesquelles sont vraies et lesquelles sont fausses
      this.figures[i] = [
        { id: `figure0Ex${this.numeroExercice}Q${i}`, solution: true },
        { id: `figure1Ex${this.numeroExercice}Q${i}`, solution: false },
        { id: `figure2Ex${this.numeroExercice}Q${i}`, solution: false },
        { id: `figure3Ex${this.numeroExercice}Q${i}`, solution: false }
      ]
      if (this.listeQuestions.indexOf(texte) === -1) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
