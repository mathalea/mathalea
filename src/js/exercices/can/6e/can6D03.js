import { prenomM, randint, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une durée en minutes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6D03
 */
export default function CalculDureeMinutes () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' minutes' }
  this.nouvelleVersion = function () {
    const a = randint(13, 15)
    const b = a + 1
    const c = randint(1, 4) * 10
    const d = randint(10, 58)
    this.reponse = b * 60 + d - (a * 60 + c)
    this.question = `${prenomM()} est parti à  $${a}$h$${c}$ de son domicile. 
    Il est arrivé à $${b}$h$${d}$.<br>
    Combien de temps à duré son trajet ?`
    this.correction = `$${b}$h$${d}-${a}$h$${c}=${this.reponse}$ min`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
      On part de $${a}$h$${c}$ et  on complète par $${(a + 1) * 60 - (a * 60 + c)}$ min pour arriver 
      à $${a + 1}$ h. <br>
      Puis on ajoute  les $${d}$ minutes pour arriver à $${b}$h$${d}$.<br>
      Le résultat est donc donné par $${(a + 1) * 60 - (a * 60 + c)}+${d}=${this.reponse}$ min.
          `)
  }
}
