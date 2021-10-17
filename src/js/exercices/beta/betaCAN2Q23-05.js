import Exercice from '../Exercice.js'
import { choice, extraireRacineCarree } from '../../modules/outils.js'
export const titre = 'Simplifications de racines carrées'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function SimplificationsRacinesCarrees () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const a = choice([8, 18, 32, 50, 72, 98, 40, 200, 12, 27, 48, 75, 20, 45, 24, 28, 300, 500, 600, 700, 40, 44, 52, 60, 63, 90])

    this.question = ` Ecrire $\\sqrt{${a}}$ sous la forme $a\\sqrt{b}$ où $a$ et $b$ sont des entiers avec $b$ le plus petit posible.`
    this.correction = `On simpifie $\\sqrt{${a}}$ en $${extraireRacineCarree(a)[0]}\\sqrt{${extraireRacineCarree(a)[1]}}$ , car
    $\\sqrt{${a}}=\\sqrt{${extraireRacineCarree(a)[0]}^2\\times ${extraireRacineCarree(a)[1]}} =
    \\sqrt{${extraireRacineCarree(a)[0]}^2}\\times \\sqrt{${extraireRacineCarree(a)[1]}} 
    =${extraireRacineCarree(a)[0]}\\sqrt{${extraireRacineCarree(a)[1]}}$.<br>`
    this.reponse = [`${extraireRacineCarree(a)[0]}\\sqrt{${extraireRacineCarree(a)[1]}`]
  }
}
