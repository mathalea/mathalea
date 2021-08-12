import Exercice from '../Exercice.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { mathalea2d, tableau } from '../../modules/2d.js'
export const titre = 'Nom de l\'exercice'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
 * Date de publication
*/
export default function NomExercice () {
  Exercice.call(this)
  this.consigne = 'Consigne'
  this.nbQuestions = 1
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 100
  this.video = ''

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
