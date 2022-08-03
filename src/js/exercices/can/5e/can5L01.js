import Exercice from '../../Exercice.js'
import { randint, calcul, texNombre, texNombrec, choice } from '../../../modules/outils.js'
export const titre = 'Trouver $a+1$ ou $a-1$ connaissant $2a$'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function MoitiePlusOuMoinsUn () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(21, 35, 30) / 10
    if (choice([true, false])) {
      this.reponse = calcul(a / 2 + 1)
      this.question = `On a  $2\\times a=${texNombre(a)}$, combien vaut $a+1$ ?`
      this.correction = `$2\\times a=${texNombre(a)}$, donc le nombre $a$ est égal à $\\dfrac{${texNombre(a)}}{2}=${texNombrec(a / 2)}$.<br>Donc $a+1=${texNombrec(a / 2)}+1=${texNombrec(a / 2 + 1)}$.`
    } else {
      this.reponse = calcul(a / 2 - 1)
      this.question = `On a  $2\\times a=${texNombre(a)}$, combien vaut $a-1$ ?`
      this.correction = `$2\\times a=${texNombre(a)}$, donc le nombre $a$ est égal à $\\dfrac{${texNombre(a)}}{2}=${texNombrec(a / 2)}$.<br>Donc $a-1=${texNombrec(a / 2)}-1=${texNombrec(a / 2 - 1)}$.`
    }
  }
}
