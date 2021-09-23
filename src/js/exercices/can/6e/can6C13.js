import { calcul, randint, texNombrec, choice, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Somme de deux décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C13
 */
export default function FSomme2Decimaux () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    let a, b, c, d, e
    if (choice([true, false])) {
      a = randint(3, 9)
      b = randint(1, 9, a)
      c = randint(1, 9, [a, b])
      d = randint(1, 9, [a, b, c])
      e = randint(10, 13)
      this.consigne = 'Calculer.'
      this.reponse = calcul(e + b * 0.1)
      this.question = `$${texNombrec(a + b * 0.1)}+${texNombrec(e - a)}$`
      this.correction = `$${texNombrec(a + b * 0.1)}+${texNombrec(e - a)}=${texNombrec(e + b * 0.1)}$`
      this.correction += texteEnCouleur(`
      <br> Mentalement : <br>
      On fait la somme des parties entières des deux nombres : $${a}+${e - a}=${e}$, puis on ajoute les dixièmes. On obtient :<br>
  $${e}+${texNombrec(b * 0.1)}=${texNombrec(e + b * 0.1)}$
      `)
    } else {
      a = randint(1, 9)
      b = randint(3, 5)
      c = randint(1, 9)
      d = randint(7, 9)

      this.consigne = 'Calculer.'
      this.reponse = calcul(a + c + (b + d) * 0.1)
      this.question = `$${texNombrec(a + b * 0.1)}+${texNombrec(c + d * 0.1)}$`
      this.correction = `$${texNombrec(a + b * 0.1)}+${texNombrec(c + d * 0.1)}=${texNombrec(a + c + (b + d) * 0.1)}$`
      this.correction += texteEnCouleur(`
        <br> Mentalement : <br>
    On fait la somme des parties entières des deux nombres : $${a}+${c}=${a + c}$.<br>
    On fait la somme des parties décimales : $${texNombrec(b * 0.1)}+${texNombrec(d * 0.1)}=${texNombrec((b + d) * 0.1)}$.<br>
    Le résultat est donc donné par : 
    $${a + c}+${texNombrec((b + d) * 0.1)}=${texNombrec(a + c + (b + d) * 0.1)}$.
        `)
    }
  }
}
