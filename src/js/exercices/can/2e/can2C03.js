import Exercice from '../../Exercice.js'
import { randint, calcul, choice, texNombrec, abs, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
export const titre = 'Calcul avec puissance'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Créé pendant l'été 2021
 * Référence can2C03
 * Date de publication
*/
export default function CalculPuissance1 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, d
    switch (choice(['a', 'b', 'c', 'd', 'e', 'f'])) { //
      case 'a':
        a = choice([0.25, 0.5])
        b = randint(2, 5)
        this.question = `$4^{${b}} \\times ${texNombrec(a)}^{${b}}=$`
        this.correction = `$4^{${b}}\\times ${texNombrec(a)}^{${b}}=(4\\times ${a})^{${b}}=${texNombrec((4 ** b) * (a ** b))} $`
        this.reponse = ((4 ** b) * (a ** b))
        break
      case 'b':
        a = choice([0.2, 0.4])
        b = randint(2, 5)
        this.question = `$5^{${b}} \\times ${texNombrec(a)}^{${b}}= $`
        this.correction = `$5^{${b}} \\times ${texNombrec(a)}^{${b}}=(5\\times ${texNombrec(a)})^{${b}}=${texNombrec((5 ** b) * (a ** b))} $`
        this.reponse = calcul((5 ** b) * (a ** b))
        break

      case 'c':
        a = randint(-3, -1)
        this.question = `$2^{${a}} \\times 8=$`
        this.correction = `$2^{${a}}\\times 8=\\dfrac{1}{2^{${abs(a)}}}\\times 8=${texNombrec(8 * 1 / 2 ** (-a))} $`
        this.reponse = calcul((2 ** a) * 8)
        break
      case 'd':
        a = randint(-4, -1)
        this.question = `$2^{${a}} \\times 16=$`
        this.correction = `$2^{${a}} \\times 16=\\dfrac{1}{2^{${abs(a)}}}\\times 16=${texNombrec(16 * 1 / 2 ** (-a))} $`
        this.reponse = calcul((2 ** a) * 16)
        break
      case 'e':
        a = randint(-5, -1)
        this.question = `$2^{${a}} \\times 32=$`
        this.correction = `$2^{${a}} \\times 32=\\dfrac{1}{2^{${abs(a)}}}\\times 32=${texNombrec(32 * 1 / 2 ** (-a))} $`
        this.reponse = calcul((2 ** a) * 32)
        break
      case 'f':
        a = randint(2, 10)
        c = randint(-5, 10, [0, 1])
        d = randint(2, 10)
        this.question = `Compléter : $${a}^{...}\\times ${a}^{${c}}=${a}^{${-d}}$`
        this.correction = `$\\ldots +${ecritureParentheseSiNegatif(c)}=-${d}$, soit $....=-${d}-${ecritureParentheseSiNegatif(c)}=${-d - c}$.`
        this.reponse = calcul(-d - c)
        break
    }
  }
}
