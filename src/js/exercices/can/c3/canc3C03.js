import Exercice from '../../Exercice.js'
import { randint, choice, miseEnEvidence } from '../../../modules/outils.js'
export const titre = 'Trouver le nombre dans une table de multiplication '
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export const uuid = 'bdb11'
export const ref = 'canc3C03'
export default function TableMultiplicationTrous () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(2, 9)
    const b = randint(4, 10)
    const c = a * b
    if (choice([true, false])) {
      this.question = `Compléter : <br>$${a}\\times .... =${c}$`
      this.correction = `$${a}\\times ${miseEnEvidence(b)} =${c}$`
    } else {
      this.question = `Compléter :<br> $ .... \\times ${a}=${c}$`
      this.correction = `$ ${miseEnEvidence(b)} \\times ${a}=${c}$`
    }
    this.reponse = b
  }
}
