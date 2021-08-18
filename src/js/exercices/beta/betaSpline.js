import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu } from '../../modules/outils.js'
import { spline } from '../../modules/fonctionsMaths.js'
export const titre = 'Nom de l\'exercice'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
 * Date de publication
*/
export default function NomExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const listeNoeuds = [[0, 0], [0.5, 0.4794], [1, 0.8415], [1.5, 0.9975], [2, 0.9093]]

    const f = spline(listeNoeuds)
    console.log('h : ', f.h, ' F : ', f.F, ' R : ', f.R, ' M : ', f.M, ' C: ', f.C, ' C2 : ', f.C2)
    console.log('le sinus de Pi/6 est : ', f.image(Math.PI / 6))
    // Si la question n'a jamais été posée, on l'enregistre
  }
}
