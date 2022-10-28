import Exercice from '../../Exercice.js'
import { randint, texFractionReduite, sp } from '../../../modules/outils.js'
export const titre = 'Déterminer le rang d’une médiane'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export const uuid = '87ceb'
export const ref = 'can3S06'
export default function Mediane () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(10, 15)
    const n = randint(1, 4)
    const c = a * 2 * n + 1
    this.question = `Une série statistique de $${c}$ données est rangée dans l’ordre croissant.<br>
   
    Quel est le rang de la médiane ? `
    this.correction = `En notant $x_1$ la plus valeur de la série, puis $x_2$ la suivante, .... et $x_{${c}}$ la plus grande valeur, on obtient :<br>
$\\underbrace{x_1 ${sp(2)} ; ${sp(2)} x_2 ${sp(2)} ; ${sp(2)} ..... ; ${sp(2)}
 x_{${a * n}}}_{${a * n} \\text{ valeurs}} ${sp(2)} ; ${sp(2)} \\underbrace{x_{${a * n + 1}}}_{\\text{Médiane}} 
 ${sp(2)} ; ${sp(2)} \\underbrace{x_{${a * n + 2}} ; ${sp(2)} ..... ; ${sp(2)}  x_{${c}}}_{${a * n} \\text{ valeurs}}$<br>

    
    
    Puisque la série comporte un nombre impair de valeurs, la médiane se situe au rang $\\dfrac{${c}+1}{2}=${texFractionReduite(c + 1, 2)}$.`
    this.reponse = (c + 1) / 2
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
