import Exercice from '../../Exercice.js'
import { randint, ecritureAlgebrique } from '../../../modules/outils.js'
export const titre = 'Simplifier un taux de variation'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '17/11/2022'

/**
 *
 * @author Gilles Mora
 * Référence can1L10
*/

export const uuid = 'cc9ee'
export const ref = 'can1L10'
export default function SimplifierTauxVariations () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(-12, 12, [0])

    this.question = `Simplifier le plus possible : $\\dfrac{(${a}+h)^2-${a ** 2}}{h}$.`
    this.correction = `$\\dfrac{(${a}+h)^2-${a ** 2}}{h}=\\dfrac{\\cancel{${a ** 2}}${ecritureAlgebrique(2 * a)}h+h^2-\\cancel{${a ** 2}}}{h}=
    \\dfrac{${2 * a}h+h^2}{h}=\\dfrac{h(${2 * a}+h)}{h}=${2 * a}+h$`

    this.reponse = [`h+2\\times ${a}`]
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
