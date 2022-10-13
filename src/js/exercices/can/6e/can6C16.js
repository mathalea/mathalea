import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { calcul, texNombrec } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer le double ou la moitié'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C16
 */
export const uuid = '88435'
export const ref = 'can6C16'
export default function DoubleEtMoitie () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 25) * 2 // variables aléatoires
    this.question = `Le double d'un nombre vaut $${2 * a}$, combien vaut sa moitié ?<br>`
    this.correction = `Sa moitié vaut : $${texNombrec(a / 2)}$.
     `
    this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    Si le double du nombre est $${2 * a}$, ce nombre est : $${2 * a}\\div 2=${a}$.<br>
    Puisqu'on cherche sa moitié, on le divise par $2$, soit  $${a}\\div 2=${a / 2}$.<br>
     `)
    this.reponse = calcul(a / 2)
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
