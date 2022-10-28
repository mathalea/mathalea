import Exercice from '../../Exercice.js'
import { randint, calcul, choice, texNombrec, texteEnCouleur } from '../../../modules/outils.js'
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
export const uuid = '4fc0e'
export const ref = 'can5C14'
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
        this.question = `Calculer sous forme décimale $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}$.`
        this.correction = `$\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}=${texNombrec((a * b) / a)}$. `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On multiplie par $10$ le numérateur et le dénominateur pour avoir des nombres entiers.<br>
        $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}=\\dfrac{${texNombrec(a * b)}\\times 10}{${texNombrec(a)}\\times 10}=\\dfrac{${texNombrec(a * b * 10)}}{${texNombrec(a * 10)}}=${texNombrec((a * b) / a)}$.
         `)

        this.reponse = calcul((a * b) / a)
        break
      case 'b':
        a = calcul(randint(3, 9) / 100)
        b = randint(2, 9)
        this.question = `Calculer sous forme décimale $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}$.
        `
        this.correction = `$\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}=${texNombrec((a * b) / a)}$. `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On multiplie par $100$ le numérateur et le dénominateur pour avoir des nombres entiers.<br>
        $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}
        =\\dfrac{${texNombrec(a * b)}\\times 100}{${texNombrec(a)}\\times 100}
        =\\dfrac{${texNombrec(a * b * 100)}}{${texNombrec(a * 100)}}
        =${texNombrec((a * b) / a)}$. `)
        this.reponse = calcul((a * b) / a)
        break

      case 'c':
        a = calcul(randint(3, 9) / 100)
        b = randint(2, 9)
        this.question = `Calculer sous forme décimale $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a * 10)}}$.
        `
        this.correction = `$\\dfrac{${texNombrec(a * b)}}{${texNombrec(a * 10)}}=
        ${texNombrec((a * b) / (10 * a))}$. `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $\\bullet$ On multiplie par $100$ le numérateur et le dénominateur pour avoir des nombres entiers.<br>
        $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a * 10)}}=\\dfrac{${texNombrec(a * b)}\\times 100}{${texNombrec(a * 10)}\\times 100}
        =\\dfrac{${texNombrec(a * b * 100)}}{${texNombrec(a * 1000)}}$.<br>
        $\\bullet$ On décompose $\\dfrac{${texNombrec(a * b * 100)}}{${texNombrec(a * 1000)}}$ en un produit plus simple à calculer :<br>
        $\\dfrac{1}{10}\\times\\dfrac{${texNombrec(a * b * 100)}}{${texNombrec(a * 100)}}= 
        0,1\\times${texNombrec((a * b * 100) / texNombrec(a * 100))}=
        ${texNombrec((a * b) / (10 * a))}$.  `)
        this.reponse = calcul((a * b) / (a * 10))
        break
      case 'd':
        a = calcul(randint(3, 9) / 10)
        b = choice([1, 3, 7, 9])
        this.question = `Calculer sous forme décimale $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a * 10)}}$.`
        this.correction = `$\\dfrac{${texNombrec(a * b)}}{${texNombrec(a * 10)}}=
        ${texNombrec((a * b) / (10 * a))}$. `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $\\bullet$ On multiplie par $10$ le numérateur et le dénominateur pour avoir des nombres entiers.<br>
        $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a * 10)}}=\\dfrac{${texNombrec(a * b)}\\times 10}{${texNombrec(a * 10)}\\times 10}=\\dfrac{${texNombrec(a * b * 10)}}{${texNombrec(a * 100)}}$
        <br>$\\bullet$ On décompose $\\dfrac{${texNombrec(a * b * 10)}}{${texNombrec(a * 100)}}$ en un produit plus simple à calculer :<br>
        $\\dfrac{1}{10}\\times\\dfrac{${texNombrec(a * b * 10)}}{${texNombrec(a * 10)}}= 
        0,1\\times${texNombrec((a * b * 10) / texNombrec(a * 10))}=
        ${texNombrec((a * b) / (10 * a))}$. `)
        this.reponse = calcul((a * b) / (a * 10))
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
