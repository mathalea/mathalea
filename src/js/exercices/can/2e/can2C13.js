import Exercice from '../../Exercice.js'
import { randint, calcul, choice, texNombrec, abs, stringNombre, ecritureParentheseSiNegatif, sp } from '../../../modules/outils.js'
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

export default function CalculPuissancesOperation () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, d, n, p, s
    switch (choice(['a'])) { //, 'b', 'c', 'd', 'e', 'f'
      case 'a':
        a = randint(-9, 9)
        n = randint(-9, 9, [0, 1, -1])
        p = randint(-9, 9, [0, 1, -1])
       s=n+p
        this.question = `Écrire sous la forme $a^n$ où $a$ est un nombre relatif et $n$ est un entier relatif. <br>
        $${ecritureParentheseSiNegatif(a)}^{${n}}\\times ${ecritureParentheseSiNegatif(a)}^{${p}}=$`
        this.correction = `(${stringNombre(a)})^{${stringNombre(s)}} et  $${a}^{${n + p}}$ `
         this.reponse = `${ecritureParentheseSiNegatif(a)}^{${n + p}}` 
         
        console.log(this.reponse)
        break
      case 'b':
        a = choice([0.2, 0.4])
        b = randint(2, 5)
        this.question = `Calculer sous la forme d'un nombre entier : <br>
        $5^{${b}} \\times ${texNombrec(a)}^{${b}}= $`
        this.correction = `On utilise la formule $a^n\\times b^n=(a\\times b)^{n}$
        avec $a=5$,  $b=${texNombrec(a)}$ et $n=${b}$.<br>
       $5^{${b}}\\times ${texNombrec(a)}^{${b}}=(5\\times ${texNombrec(a)})^{${b}}=
       ${5 * a}^${texNombrec(b)}=${texNombrec((5 ** b) * (a ** b))} $`
        this.reponse = calcul((5 ** b) * (a ** b))
        break

      case 'c':
        a = randint(-3, -1)
        this.question = `Calculer sous la forme d'un nombre entier : <br>
        $2^{${a}} \\times 8=$`
        this.correction = `Comme $a^{-n}=\\dfrac{1}{a^n}$, ${sp(4)}  $2^{${a}}=\\dfrac{1}{2^{${-a}}}=\\dfrac{1}{${2 ** (-a)}}$. <br>

        
        $2^{${a}}\\times 8=\\dfrac{1}{${2 ** abs(a)}}\\times 8=${texNombrec(8 * 1 / 2 ** (-a))} $`
        this.reponse = calcul((2 ** a) * 8)
        break
      case 'd':
        a = randint(-4, -1)
        this.question = `Calculer sous la forme d'un nombre entier : <br> $2^{${a}} \\times 16=$`
        this.correction = `Comme $a^{-n}=\\dfrac{1}{a^n}$, ${sp(4)}  $2^{${a}}=\\dfrac{1}{2^{${-a}}}=\\dfrac{1}{${2 ** (-a)}}$. <br>

        
        $2^{${a}}\\times 16=\\dfrac{1}{${2 ** abs(a)}}\\times 16=${texNombrec(16 * 1 / 2 ** (-a))} $`
        this.reponse = calcul((2 ** a) * 16)
        break
      case 'e':
        a = randint(-5, -1)
        this.question = `Calculer sous la forme d'un nombre entier : <br> $2^{${a}} \\times 32=$`
        this.correction = `Comme $a^{-n}=\\dfrac{1}{a^n}$, ${sp(4)}  $2^{${a}}=\\dfrac{1}{2^{${-a}}}=\\dfrac{1}{${2 ** (-a)}}$. <br>

        
        $2^{${a}}\\times 32=\\dfrac{1}{${2 ** abs(a)}}\\times 32=${texNombrec(32 * 1 / 2 ** (-a))} $`
        this.reponse = calcul((2 ** a) * 32)
        break
      case 'f':
        a = randint(2, 10)
        c = randint(-5, 10, [0, 1])
        d = randint(2, 10)
        this.question = `Compléter :<br> $${a}^{...}\\times ${a}^{${c}}=${a}^{${-d}}$`
        this.correction = `On utilise la formule $a^n\\times a^m=a^{n+m}$.
        La somme des exposants doit donner $${-d}$.<br>
        On cherche donc le nombre qui, ajouté à $${c}$ donne $${-d}$.<br> Il s'agit de  : 
$-${d}-${ecritureParentheseSiNegatif(c)}=${-d - c}$.`
        this.reponse = calcul(-d - c)
        break
    }
  }
}
