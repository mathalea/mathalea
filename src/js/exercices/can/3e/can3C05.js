import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { rienSi1 } from '../../../modules/outils/ecritures.js'
import { calcul, texNombrec } from '../../../modules/outils/texNombres.js'
export const titre = 'Calculer avec  une puissance de 10'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Créé pendant l'été 2021
 * Référence can3C05
 * Date de publication
*/
export const uuid = 'ce089'
export const ref = 'can3C05'
export default function CalculPuissance10 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 6)
    const n = calcul(2 * randint(1, 6) + 1) / 2
    const N = calcul(2 * randint(1, 6, a) + 1) / 2
    const c = randint(1, 3)
    const d = randint(1, 3)
    this.question = `Calculer sous forme décimale $B=${texNombrec(n)}\\times 10^{${rienSi1(c)}}+${texNombrec(N)}\\times 10^{${rienSi1(d)}}$.`
    this.correction = `$B=${texNombrec(n)}\\times 10^{${rienSi1(c)}}+${texNombrec(N)}\\times 10^{${rienSi1(d)}}=${texNombrec(n * 10 ** c)}+${texNombrec(N * 10 ** d)}=${texNombrec(n * 10 ** c + N * 10 ** d)}$.`
    this.reponse = calcul(n * 10 ** c + N * 10 ** d)
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
