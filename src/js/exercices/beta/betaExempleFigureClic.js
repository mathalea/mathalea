import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { mathalea2d, point, polygone } from '../../modules/2d.js'
import { pointCliquable } from '../../modules/2dinteractif.js'
import { addFeedback } from '../../modules/messages.js'
export const titre = 'Sommets du triangle'
export const interactifReady = true
export const amcType = 'custom' // La correction doit être gérée dans l'exercice avec la méthode this.correctionInteractive()

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactif = true
  this.amcType = amcType
  this.consigne = ''
  this.nbQuestionsModifiable = false
  // this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let question
    const objets2d = []
    const A = point(0, 0)
    const B = point(randint(5, 10), randint(-3, 5))
    const C = point(randint(1, 10), randint(4, 10))
    const p = polygone(A, B, C)
    const s1 = pointCliquable(A.x, A.y)
    const s2 = pointCliquable(B.x, B.y)
    const s3 = pointCliquable(C.x, C.y)
    objets2d.push(p, s1, s2, s3)

    question = 'Clique sur les sommets du triangle.'
    question += '<br>' + mathalea2d({ xmin: -2, ymin: -5, xmax: 10, ymax: 11 }, objets2d)

    const correction = 'texte de la correction 1'
    this.listeQuestions.push(question)
    this.listeCorrections.push(correction)

    this.correctionInteractive = (elt) => {
      let cpt = 0
      for (const s of [s1, s2, s3]) {
        if (s.etat) cpt++
        s.stopCliquable()
      }
      addFeedback(elt, {
        message: `Tu as cliqué sur ${cpt} ${cpt > 1 ? 'points' : 'point'}.`,
        type: 'positive'
      })
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}
