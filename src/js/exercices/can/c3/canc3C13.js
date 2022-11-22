import Exercice from '../../Exercice.js'
import { randint, choice, miseEnEvidence } from '../../../modules/outils.js'
export const titre = 'Trouver un nombre dans un produit de trois facteurs '
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '17/11/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/

export const uuid = '8afe0'
export const ref = 'canc3C13'
export default function TableMultiplicationTrous3 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(2, 4)
    const b = randint(2, 5)
    const c = randint(4, 10)
    const d = a * b * c
    if (choice([true, false])) {
      this.question = `Compléter : <br>$${a}\\times \\ldots \\times ${b} =${d}$`
      this.correction = `$${a}\\times ${miseEnEvidence(c)} \\times ${b} =${d}$`
      this.canEnonce = 'Compléter.'
      this.canReponseACompleter = `$${a}\\times \\ldots \\times ${b} =${d}$`
    } else {
      this.question = `Compléter :<br> $${a}\\times ${b} \\times \\ldots =${d}$`
      this.correction = `$${a}\\times ${b} \\times ${miseEnEvidence(c)} =${d}$`
      this.canEnonce = 'Compléter.'
      this.canReponseACompleter = `$${a}\\times ${b} \\times \\ldots =${d}$`
    }
    this.reponse = c
  }
}
