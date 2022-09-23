import Exercice from '../../Exercice.js'
import { randint, choice, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
export const titre = 'Calculer avec  des puissances'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '15/09/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 *
*/

export const uuid = 'b31eb'
export const ref = 'can2C13'
export default function CalculPuissancesOperation () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, n, p, s
    switch (choice(['a', 'b', 'c', 'd', 'e'])) { //, 'b', 'c', 'd', 'e', 'f'
      case 'a':
        a = randint(-9, 9, [0, 1, -1])
        n = randint(-9, 9, [0, 1, -1])
        p = randint(-9, 9, [0, 1, -1])
        s = n + p
        this.question = `Écrire sous la forme $a^n$ où $a$ et $n$ sont des entiers relatifs. <br>
        $${ecritureParentheseSiNegatif(a)}^{${n}}\\times ${ecritureParentheseSiNegatif(a)}^{${p}}=$`
        this.correction = `On utilise la formule $a^n\\times a^m=a^{n+m}$ avec $a=${a}$, $n=${n}$ et $p=${p}$.<br>
        $${ecritureParentheseSiNegatif(a)}^{${n}}\\times ${ecritureParentheseSiNegatif(a)}^{${p}}=${ecritureParentheseSiNegatif(a)}^{${n}+${ecritureParentheseSiNegatif(p)}}=${ecritureParentheseSiNegatif(a)}^{${n + p}}$
        `
        this.reponse = `${ecritureParentheseSiNegatif(a)}^{${n + p}}`

        break
      case 'b':
        a = randint(-9, 9, [0, 1, -1])
        b = randint(-9, 9, [0, 1, -1])
        n = randint(-9, 9, [0, 1, -1])
        p = a * b
        this.question = `Écrire sous la forme $a^n$ où $a$ et $n$ sont des entiers relatifs. <br>
        $${ecritureParentheseSiNegatif(a)}^{${n}}\\times ${ecritureParentheseSiNegatif(b)}^{${n}}=$`
        this.correction = `On utilise la formule $a^n\\times b^n=(a\\times b)^{n}$
        avec $a=${a}$,  $b=${b}$ et $n=${n}$.<br>
        $${ecritureParentheseSiNegatif(a)}^{${n}}\\times ${ecritureParentheseSiNegatif(b)}^{${n}}=(${ecritureParentheseSiNegatif(a)}\\times ${ecritureParentheseSiNegatif(b)})^{${n}}=${ecritureParentheseSiNegatif(p)}^{${n}}$
        `
        this.reponse = `${ecritureParentheseSiNegatif(p)}^{${n}}`
        break

      case 'c':
        a = randint(-9, 9, [0, 1, -1])
        p = randint(-9, 9, [0, 1])
        n = randint(-9, 9, [0, 1, -1])
        s = n * p
        this.question = `Écrire sous la forme $a^n$ où $a$ et $n$ sont des entiers relatifs. <br>
        $\\left(${ecritureParentheseSiNegatif(a)}^{${n}}\\right)^{${p}}=$`
        this.correction = `On utilise la formule $\\left(a^n\\right)^p=a^{n\\times p}$
        avec $a=${a}$,  $n=${n}$ et $p=${p}$.<br>
        $\\left(${ecritureParentheseSiNegatif(a)}^{${n}}\\right)^{${p}}=${ecritureParentheseSiNegatif(a)}^{${n}\\times ${ecritureParentheseSiNegatif(p)}}=${ecritureParentheseSiNegatif(a)}^{${n * p}}$
        `
        this.reponse = `${ecritureParentheseSiNegatif(a)}^{${s}}`
        break

      case 'd':
        a = randint(-9, 9, [0, 1, -1])
        p = randint(-9, 9, [0, 1])
        n = randint(-9, 9, [0, 1, -1])
        s = n - p
        this.question = `Écrire sous la forme $a^n$ où $a$ et $n$ sont des entiers relatifs. <br>
        $\\dfrac{${ecritureParentheseSiNegatif(a)}^{${n}}}{${ecritureParentheseSiNegatif(a)}^{${p}}}=$`
        this.correction = `On utilise la formule $\\dfrac{a^n}{a^p}=a^{n-p}$ avec $a=${a}$,  $n=${n}$ et $p=${p}$.<br>
        $\\dfrac{${ecritureParentheseSiNegatif(a)}^{${n}}}{${ecritureParentheseSiNegatif(a)}^{${p}}}=${ecritureParentheseSiNegatif(a)}^{${n}- ${ecritureParentheseSiNegatif(p)}}=${ecritureParentheseSiNegatif(a)}^{${n - p}}$
        `
        this.reponse = `${ecritureParentheseSiNegatif(a)}^{${s}}`
        break
      case 'e':

        b = randint(2, 6, [0, 1, -1])
        a = choice([2, 3, 4, 5, 6, 7]) * b
        n = randint(-9, 9, [0, 1, -1])
        s = a / b
        this.question = `Écrire sous la forme $a^n$ où $a$ et $n$ sont des entiers relatifs. <br>
        $\\dfrac{${ecritureParentheseSiNegatif(a)}^{${n}}}{${ecritureParentheseSiNegatif(b)}^{${n}}}=$`
        this.correction = `On utilise la formule $\\dfrac{a^n}{b^n}=\\left(\\dfrac{a}{b}\\right)^{n}$ avec 
        $a=${a}$,  $b=${b}$ et $n=${n}$.<br>
        $\\dfrac{${ecritureParentheseSiNegatif(a)}^{${n}}}{${ecritureParentheseSiNegatif(b)}^{${n}}}=\\left(\\dfrac{${ecritureParentheseSiNegatif(a)}}{${ecritureParentheseSiNegatif(b)}}\\right)^{${n}}=${s}^{${n}}$
        `
        this.reponse = `${s}^{${n}}`
        break
    }
  }
}
