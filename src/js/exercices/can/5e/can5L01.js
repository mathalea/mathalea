import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { randint, texNombre, choice } from '../../../modules/outils.js'
export const titre = 'Trouver $a+1$ ou $a-1$ connaissant $2a$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '27/07/2022'

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
    const a = new Decimal(randint(21, 35, 30)).div(10)
    const b = new Decimal(a).div(2)

    if (choice([true, false])) {
      this.reponse = new Decimal(a).div(2).add(1)
      this.question = `On a  $2\\times a=${texNombre(a, 1)}$.<br>
      Combien vaut $a+1$ ?`
      this.correction = `$2\\times a=${texNombre(a, 1)}$, donc le nombre $a$ est égal à $\\dfrac{${texNombre(a, 1)}}{2}=${texNombre(b, 2)}$.<br>Donc $a+1=${texNombre(b, 2)}+1=${texNombre(this.reponse, 2)}$.`
    } else {
      this.reponse = new Decimal(a).div(2).sub(1)
      this.question = `On a  $2\\times a=${texNombre(a, 1)}$.<br>
      Combien vaut $a-1$ ?`
      this.correction = `$2\\times a=${texNombre(a, 1)}$, donc le nombre $a$ est égal à $\\dfrac{${texNombre(a, 1)}}{2}=${texNombre(b, 2)}$.<br>Donc $a-1=${texNombre(b, 2)}-1=${texNombre(this.reponse, 2)}$.`
    }
  }
}
