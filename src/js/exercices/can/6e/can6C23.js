import Exercice from '../../Exercice.js'
import { randint, calcul, choice, texteEnCouleur } from '../../../modules/outils.js'
export const titre = 'Calculer avec +/-99 ou +/-999'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Créé pendant l'été 2021
 * Référence can6C23
 * Date de publication
*/
export const uuid = 'ad0ee'
export const ref = 'can6C23'
export default function CalculAvec99 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a
    switch (choice(['a', 'b', 'c', 'd', 'e'])) { //
      case 'a':
        a = calcul(randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9))
        this.question = `Calculer $${a}+99$`
        this.correction = `$${a}+99=${a + 99}$.`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
       Pour ajouter $99$, on ajoute $100$ et on retranche $1$.<br>
       $${a}+99=${a}+\\underbrace{100-1}_{99}=${a + 100}-1=${a + 99}$.
          `)
        this.reponse = calcul(a + 99)
        break
      case 'b':
        a = calcul(randint(1, 9) * 1000 + randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9))
        this.question = `Calculer $${a}+999$`
        this.correction = `$${a}+999=${a + 999}$.`
        this.reponse = calcul(a + 999)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
       Pour ajouter $999$, on ajoute $1000$ et on retranche $1$.<br>
       $${a}+999=${a}+\\underbrace{1000-1}_{999}=${a + 1000}-1=${a + 999}$.
          `)
        break

      case 'c':
        a = calcul(randint(1, 9) * 1000 + randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9))
        this.question = `Calculer $${a}-999$`
        this.correction = `$${a}-999=${a - 999}$.`
        this.reponse = calcul(a - 999)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
       Pour retrancher $999$, on retranche $1000$ et on ajoute $1$.<br>
       $${a}-999=${a}\\underbrace{-1000+1}_{-999}=${a - 1000}+1=${a - 999}$.
          `)
        break
      case 'd':
        a = calcul(randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9))
        this.question = `Calculer $${a}-99$`
        this.correction = `$${a}-99=${a - 99}$.`
        this.reponse = calcul(a - 99)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
       Pour retrancher $99$, on retranche $100$ et on ajoute $1$.<br>
       $${a}-99=${a}\\underbrace{-100+1}_{-99}=${a - 100}+1=${a - 99}$.
          `)
        break
      case 'e':
        a = calcul(randint(1, 9) * 1000 + randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9))
        this.question = `Calculer $${a}+99$`
        this.correction = `$${a}+99=${a + 99}$.`
        this.reponse = calcul(a + 99)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Pour ajouter $99$, on ajoute $100$ et on retranche $1$.<br>
        $${a}+99=${a}+\\underbrace{100-1}_{99}=${a + 100}-1=${a + 99}$.
           `)
        break
    }
  }
}
