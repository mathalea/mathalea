import Exercice from '../../Exercice.js'
import { randint, calcul, choice, texteEnCouleur } from '../../../modules/outils.js'
export const titre = 'Diviser avec des décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Créé pendant l'été 2021
 * Référence can5C14
 * Date de publication
*/
export default function DivisionAvecDecimaux () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b
    switch (choice(['a', 'b', 'c', 'd'])) { //
      case 'a':
        a = calcul(randint(3, 9) / 10)
        b = randint(2, 9)
        this.question = `Calculer $\\dfrac{${texNombre(a * b)}}{${texNombre(a)}}$<br>
        (résultat sous forme décimale)`
        this.correction = `$\\dfrac{${texNombre(a * b)}}{${texNombre(a)}}=${texNombre((a * b) / a)}$. `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On multiplie par $10$ le numérateur et le dénominateur pour avoir des nombres entiers.<br>
        $\\dfrac{${texNombre(a * b)}}{${texNombre(a)}}=\\dfrac{${texNombre(a * b)}\\times 10}{${texNombre(a)}\\times 10}=\\dfrac{${texNombre(a * b * 10)}}{${texNombre(a * 10)}}=${texNombre((a * b) / a)}$.
         `)

        this.reponse = calcul((a * b) / a)
        break
      case 'b':
        a = calcul(randint(3, 9) / 100)
        b = randint(2, 9)
        this.question = `Calculer $\\dfrac{${texNombre(a * b)}}{${texNombre(a)}}$<br>
        (résultat sous forme décimale)`
        this.correction = `$\\dfrac{${texNombre(a * b)}}{${texNombre(a)}}=${texNombre((a * b) / a)}$. `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On multiplie par $100$ le numérateur et le dénominateur pour avoir des nombres entiers.<br>
        $\\dfrac{${texNombre(a * b)}}{${texNombre(a)}}
        =\\dfrac{${texNombre(a * b)}\\times 100}{${texNombre(a)}\\times 100}
        =\\dfrac{${texNombre(a * b * 100)}}{${texNombre(a * 100)}}
        =${texNombre((a * b) / a)}$. `)
        this.reponse = calcul((a * b) / a)
        break

      case 'c':
        a = calcul(randint(3, 9) / 100)
        b = randint(2, 9)
        this.question = `Calculer $\\dfrac{${texNombre(a * b)}}{${texNombre(a * 10)}}$.<br>
        (résultat sous forme décimale)`
        this.correction = `$\\dfrac{${texNombre(a * b)}}{${texNombre(a * 10)}}=
        ${texNombre((a * b) / (10 * a))}$. `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $\\bullet$ On multiplie par $100$ le numérateur et le dénominateur pour avoir des nombres entiers.<br>
        $\\dfrac{${texNombre(a * b)}}{${texNombre(a * 10)}}=\\dfrac{${texNombre(a * b)}\\times 100}{${texNombre(a * 10)}\\times 100}
        =\\dfrac{${texNombre(a * b * 100)}}{${texNombre(a * 1000)}}$.<br>
        $\\bullet$ On décompose $\\dfrac{${texNombre(a * b * 100)}}{${texNombre(a * 1000)}}$ en un produit plus simple à calculer :<br>
        $\\dfrac{1}{10}\\times\\dfrac{${texNombre(a * b * 100)}}{${texNombre(a * 100)}}= 
        0,1\\times${texNombre((a * b * 100) / texNombre(a * 100))}=
        ${texNombre((a * b) / (10 * a))}$.  `)
        this.reponse = calcul((a * b) / (a * 10))
        break
      case 'd':
        a = calcul(randint(3, 9) / 10)
        b = choice([1, 3, 7, 9])
        this.question = `Calculer $\\dfrac{${texNombre(a * b)}}{${texNombre(a * 10)}}$.<br>
        (résultat sous forme décimale)`
        this.correction = `$\\dfrac{${texNombre(a * b)}}{${texNombre(a * 10)}}=
        ${texNombre((a * b) / (10 * a))}$. `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $\\bullet$ On multiplie par $10$ le numérateur et le dénominateur pour avoir des nombres entiers.<br>
        $\\dfrac{${texNombre(a * b)}}{${texNombre(a * 10)}}=\\dfrac{${texNombre(a * b)}\\times 10}{${texNombre(a * 10)}\\times 10}=\\dfrac{${texNombre(a * b * 10)}}{${texNombre(a * 100)}}$
        <br>$\\bullet$ On décompose $\\dfrac{${texNombre(a * b * 10)}}{${texNombre(a * 100)}}$ en un produit plus simple à calculer :<br>
        $\\dfrac{1}{10}\\times\\dfrac{${texNombre(a * b * 10)}}{${texNombre(a * 10)}}= 
        0,1\\times${texNombre((a * b * 10) / texNombre(a * 10))}=
        ${texNombre((a * b) / (10 * a))}$. `)
        this.reponse = calcul((a * b) / (a * 10))
        break
    }
  }
}
