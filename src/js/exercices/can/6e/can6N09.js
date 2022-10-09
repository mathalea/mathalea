import { calcul, choice, randint, texNombrec, sp } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver le nombre qui suit'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * Jean-Claude Lhote
 * Publié le 11 / 09 / 2021
 * Référence can6N06
 */
export const uuid = 'cc882'
export const ref = 'can6N09'
export default function PositionDesChiffres () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.consigne = ''
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const f = choice([1, 10, 100])
    const a = randint(1, 9) * 10 + randint(1, 9)
    this.question = ` Compléter la suite logique : <br>$${texNombrec((a + 0.6) / f)}$ ${sp(1)} ; ${sp(1)}$${texNombrec((a + 0.7) / f)}$ ${sp(1)} ; ${sp(1)}$${texNombrec((a + 0.8) / f)}$ ${sp(1)} ; ${sp(1)}$${texNombrec((a + 0.9) / f)}$ &nbsp ; &nbsp .....`
    this.correction = `On passe d'un nombre au suivant en ajoutant $0,1$.<br>Donc le prochain nombre est : $${texNombrec((a + 0.9) / f)}+${texNombrec(0.1 / f)}=${texNombrec((a + 1) / f)}$`
    this.reponse = calcul((a + 1) / f)
    this.canEnonce = 'Compléter la suite logique.'
    this.canReponseACompleter = `$${texNombrec((a + 0.6) / f)}$ ${sp(1)} ; ${sp(1)}$${texNombrec((a + 0.7) / f)}$ ${sp(1)} ; ${sp(1)}$${texNombrec((a + 0.8) / f)}$ ${sp(1)} ; ${sp(1)}$${texNombrec((a + 0.9) / f)}$${sp(1)} ; ${sp(1)} $\\ldots$`
  }
}
