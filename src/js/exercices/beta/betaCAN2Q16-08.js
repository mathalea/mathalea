import Exercice from '../Exercice.js'
import { randint, calcul, choice, texNombrec } from '../../modules/outils.js'
export const titre = 'Division avec des décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Référence
 * Date de publication
*/
export default function DivisionAvecDecimaux () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b
    switch (choice(['a', 'b', 'c', 'd'])) { //
      case 'a':
        a = calcul(randint(3, 9) / 10)
        b = randint(2, 9)
        this.question = `Calculer $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}$.<br>
        On donnera le résultat sous forme décimale.`
        this.correction = `$\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}=\\dfrac{${texNombrec(a * b)}\\times 10}{${texNombrec(a)}\\times 10}=\\dfrac{${texNombrec(a * b * 10)}}{${texNombrec(a * 10)}}=${texNombrec((a * b) / a)}$. `
        this.reponse = calcul((a * b) / a)
        break
      case 'b':
        a = calcul(randint(3, 9) / 100)
        b = randint(2, 9)
        this.question = `Calculer $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}$.<br>
        On donnera le résultat sous forme décimale.`
        this.correction = `$\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}=\\dfrac{${texNombrec(a * b)}\\times 100}{${texNombrec(a)}\\times 100}=\\dfrac{${texNombrec(a * b * 100)}}{${texNombrec(a * 100)}}=${texNombrec((a * b) / a)}$. `
        this.reponse = calcul((a * b) / a)
        break

      case 'c':
        a = calcul(randint(3, 9) / 100)
        b = randint(2, 9)
        this.question = `Calculer $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a * 10)}}$.<br>
        On donnera le résultat sous forme décimale.`
        this.correction = `$\\dfrac{${texNombrec(a * b)}}{${texNombrec(a * 10)}}=\\dfrac{${texNombrec(a * b)}\\times 100}{${texNombrec(a * 10)}\\times 100}=\\dfrac{${texNombrec(a * b * 100)}}{${texNombrec(a * 1000)}}=
        \\dfrac{1}{10}\\times\\dfrac{${texNombrec(a * b * 100)}}{${texNombrec(a * 100)}}= 
        \\dfrac{1}{10}\\times${texNombrec((a * b * 100) / texNombrec(a * 100))}=
        ${texNombrec((a * b) / (10 * a))}$. `
        this.reponse = calcul((a * b) / (a * 10))
        break
      case 'd':
        a = calcul(randint(3, 9) / 10)
        b = choice([1, 3, 7, 9])
        this.question = `Calculer $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a * 10)}}$.<br>
        On donnera le résultat sous forme décimale.`
        this.correction = `$\\dfrac{${texNombrec(a * b)}}{${texNombrec(a * 10)}}=\\dfrac{${texNombrec(a * b)}\\times 10}{${texNombrec(a * 10)}\\times 10}=\\dfrac{${texNombrec(a * b * 10)}}{${texNombrec(a * 100)}}=
        \\dfrac{1}{10}\\times\\dfrac{${texNombrec(a * b * 10)}}{${texNombrec(a * 10)}}= 
        \\dfrac{1}{10}\\times${texNombrec((a * b * 10) / texNombrec(a * 10))}=
        ${texNombrec((a * b) / (10 * a))}$. `
        this.reponse = calcul((a * b) / (a * 10))
        break
    }
  }
}
