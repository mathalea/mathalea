import { randint, texNombre, choice, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs' // ici j'importe la classe Decimal qui va me permettre de créer de tels nombres et d'utiliser leur méthodes de calcul exactes.
export const titre = 'Calculer la somme de deux décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021 modifié le 21/05/2022 (support de la classe Decimal)
 * Référence can6C13
 */
export default function FSomme2Decimaux () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, b, c, d, e
    if (choice([true, false])) {
      a = randint(3, 9)
      b = randint(1, 9, a)
      c = randint(1, 9, [a, b])
      d = randint(1, 9, [a, b, c])
      e = randint(10, 13)
      const n1 = new Decimal(b).div(10)
      const n2 = n1.plus(a)
      this.reponse = n1.plus(e)
      this.consigne = 'Calculer.'

      this.question = `$${texNombre(n2, 1)}+${texNombre(e - a, 0)}=$`
      this.correction = `$${texNombre(n2, 1)}+${texNombre(e - a, 0)}=${texNombre(this.reponse, 1)}$`
      this.correction += texteEnCouleur(`
      <br> Mentalement : <br>
      On fait la somme des parties entières des deux nombres : $${a}+${e - a}=${e}$, puis on ajoute les dixièmes. On obtient :<br>
      $${e}+${texNombre(n1, 1)}=${texNombre(this.reponse, 1)}$`)
    } else {
      a = randint(1, 9)
      b = randint(3, 5)
      c = randint(1, 9)
      d = randint(7, 9)
      const n1 = new Decimal(b).div(10)
      const n2 = new Decimal(d).div(10)
      const n3 = n1.plus(n2)
      this.consigne = 'Calculer.'
      this.reponse = n3.plus(a + c)
      this.question = `$${texNombre(n1.plus(a), 1)}+${texNombre(n2.plus(c), 1)}=$`
      this.correction = `$${texNombre(n1.plus(a), 1)}+${texNombre(n2.plus(c), 1)}=${texNombre(this.reponse, 1)}$`
      this.correction += texteEnCouleur(`
        <br> Mentalement : <br>
    On fait la somme des parties entières des deux nombres : $${a}+${c}=${a + c}$.<br>
    On fait la somme des parties décimales : $${texNombre(n1, 1)}+${texNombre(n2, 1)}=${texNombre(n3, 1)}$.<br>
    Le résultat est donc donné par : 
    $${a + c}+${texNombre(n3, 1)}=${texNombre(this.reponse, 1)}$.
        `)
    }
  }
}
