import Exercice from '../Exercice.js'
import {
  listeQuestionsToContenu, texFractionReduite, texNombre,
  randint, combinaisonListes, ecritureAlgebrique, choice, sp, extraireRacineCarree,
  miseEnEvidence
} from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
export const titre = 'Résoudre algébriquement une équation f(x)=k avec une fonction de référence.'
export const dateDePublication = '07/01/2022'
/**
*
*
* @author Gilles Mora // suppression des calcul des texNombrec et simplification des racines carrées de fration par Jean-Claude Lhote
*
*/
export default function EquationsFonctionsRef () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1
  this.sup2 = 1
  this.consigne = ''
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.spacing = 1
  this.nbQuestions = 2
  this.nbQuestionsModifiable = true
  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    switch (this.sup) {
      case 1:
        typesDeQuestionsDisponibles = ['x^2=k']
        break
      case 2:
        typesDeQuestionsDisponibles = ['sqrt(x)=k']
        break
      case 3:
        typesDeQuestionsDisponibles = ['1/x=k']
        break
      case 4:
        typesDeQuestionsDisponibles = ['x^3=k']
        break
      case 5:
        typesDeQuestionsDisponibles = ['x^2=k', 'sqrt(x)=k', '1/x=k', 'x^3=k']
        break
       //
    }
    function ecritureParentheseSiNegatif (a, maximumFractionDigits = 15) {
      const result = Intl.NumberFormat('fr-FR', { maximumFractionDigits: maximumFractionDigits }).format(a).replace(',', '{,}')
      return a < 0 ? `(${result})` : result
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    console.log(listeTypeDeQuestions)
    let sousChoix
    if (parseInt(this.sup2) === 1) {
      sousChoix = combinaisonListes([0], this.nbQuestions) // pour choisir aléatoirement des questions dans chaque catégorie
    } else if (parseInt(this.sup2) === 2) {
      sousChoix = combinaisonListes([1, 2, 3], this.nbQuestions)
    } else {
      sousChoix = combinaisonListes([0, 1, 2, 3], this.nbQuestions)
    }
    for (let i = 0, texte, texteCorr, x, y, a, b, c, k, k1, f1, enonce, correction, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on ne choisit que des nombres compris entre 1 et 20
      x = randint(-9, 9, [0, 1, -1])
      y = randint(-9, 9, [x, 0])

      switch (listeTypeDeQuestions[i]) {
        case 'x^2=k':
          switch (sousChoix[i]) { //
            case 0:
              a = randint(0, 15) ** 2
              k = choice([randint(-20, 50, [1, 4, 9, 16, 25, 36, 49]), randint(-20, 50, [1, 4, 9, 16, 25, 36, 49]), randint(-20, 50, [1, 4, 9, 16, 25, 36, 49]), a])
              enonce = `Résoudre dans $\\mathbb{R}$ :<br>
              ${sp(50)} $x^2=${k}$`
              correction = ''
              if (this.correctionDetaillee) {
                correction += `L'équation $x^2=k$ admet :<br>
                $\\bullet~$ deux solutions lorsque $k>0$ : $-\\sqrt{k}$ et $\\sqrt{k}$  ;<br>
                $\\bullet~$ une unique solution égale à $0$ lorsque $k=0$ ; <br>
                $\\bullet~$ aucune solution lorsque $k<0$.<br><br>
        `
              }
              if (k > 0) {
                correction += `L'équation est de la forme $x^2=k$ avec $k=${k}$. Comme  $${k}>0$ alors l'équation admet deux solutions : $-\\sqrt{${k}}$ et $\\sqrt{${k}}$.<br>
                `
                if (extraireRacineCarree(k)[1] === k) {
                  if (k === 1) {
                    correction += `Comme $-\\sqrt{${k}}=-${Math.sqrt(k)}$ et $\\sqrt{${k}}=${Math.sqrt(k)}$ alors 
                les solutions de l'équation peuvent s'écrire plus simplement : $-${Math.sqrt(k)}$ et $${Math.sqrt(k)}$.<br>
                Ainsi,  $S=\\{-${Math.sqrt(k)}${sp(1)};${sp(1)}${Math.sqrt(k)}\\}$.`
                  } else {
                    correction += `Ainsi, $S=\\{-\\sqrt{${k}}${sp(1)};${sp(1)}\\sqrt{${k}}\\}$.`
                  }
                } else {
                  if (k === a) {
                    correction += `Comme $-\\sqrt{${k}}=-${Math.sqrt(k)}$ et $\\sqrt{${k}}=${Math.sqrt(k)}$ alors 
                les solutions de l'équation peuvent s'écrire plus simplement : $-${Math.sqrt(k)}$ et $${Math.sqrt(k)}$.<br>
                Ainsi,  $S=\\{-${Math.sqrt(k)}${sp(1)};${sp(1)}${Math.sqrt(k)}\\}$.`
                  } else {
                    correction += `Comme $-\\sqrt{${k}}=-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ alors 
                    les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$.<br>
                    Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}\\}$.`
                  }
                }
              } else {
                if (k === 0) {
                  correction += `L'équation est de la forme $x^2=k$ avec $k=${k}$. Comme $k=${k}$ alors L'équation admet une unique solution : $0$.<br>
                Ainsi, $S=\\{0\\}$.`
                } else {
                  correction += `L'équation est de la forme $x^2=k$. Comme $k=${k}$ et $${k}<0$, alors l'équation n'admet aucune solution.<br>
                  Ainsi, $S=\\emptyset$.`
                }
              }

              break
            case 1:// x^2+b=c
              b = randint(-15, 15, 0)
              c = randint(-15, 15, 0)
              k = c - b
              enonce = `Résoudre dans $\\mathbb{R}$ :<br>
              ${sp(50)} $x^2${ecritureAlgebrique(b)}=${c}$`
              correction = 'On isole $x^2$ dans le membre de gauche pour obtenir une équation du type $x^2=k$.<br> '
              if (b > 0) {
                correction += `$\\begin{aligned}
             x^2${ecritureAlgebrique(b)}&=${c}\\\\
             x^2${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
             x^2&=${c - b}
             \\end{aligned}$`
              } else {
                correction += `$\\begin{aligned}
             x^2${ecritureAlgebrique(b)}&=${c}\\\\
             x^2${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
             x^2&=${c - b}
             \\end{aligned}$`
              }
              if (k > 0) {
                if (k === 1 || k === 4 || k === 9 || k === 16 || k === 25) {
                  correction += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(k, 0)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombre(k, 0)}}$ et $\\sqrt{${texNombre(k, 0)}}$. 
                <br> Comme $-\\sqrt{${texNombre(k, 0)}}=-${extraireRacineCarree(k)[0]}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}$ alors 
                les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}$ et $${extraireRacineCarree(k)[0]}$.<br>
                Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\}$.`
                } else {
                  if (extraireRacineCarree(k)[1] !== k) {
                    correction += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(k, 0)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombre(k, 0)}}$ et $\\sqrt{${texNombre(k, 0)}}$. <br>
                    Comme $-\\sqrt{${k}}=-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ alors 
                    les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$.<br>
                    Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}\\}$.`
                  } else {
                    correction += `<br>L'équation est de la forme $x^2=k$ avec $k=${c - b}>0$, 
                    donc l'équation a deux solutions : $-\\sqrt{${c - b}}$ et $\\sqrt{${c - b}}$.<br> 
                    Ainsi,  $S=\\{-\\sqrt{${c - b}}${sp(1)};${sp(1)}\\sqrt{${c - b}}\\}$.`
                  }
                }
              }
              if (k === 0) {
                correction += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(k, 0)}$, alors l'équation a une solution : $0$.<br>
              Ainsi, $S=\\{0\\}$. `
              }
              if (k < 0) {
                correction += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(c - b, 0)}$, alors l'équation n'a pas de solution.
                <br>Ainsi, $S=\\emptyset$. `
              }
              break
            case 2:// -x^2+b=c
              b = randint(-10, 10, 0)
              c = randint(-10, 10, 0)
              k = b - c
              enonce = `Résoudre dans $\\mathbb{R}$ :<br>
              ${sp(50)} $-x^2${ecritureAlgebrique(b)}=${c}$`
              correction = 'On isole $x^2$ dans le membre de gauche pour obtenir une équation du type $x^2=k$.<br> '
              if (b > 0) {
                correction += `$\\begin{aligned}
             -x^2+${b}&=${c}\\\\
             -x^2${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
             -x^2&=${c - b}\\\\
             x^2&=${b - c}
             \\end{aligned}$`
              } else {
                correction += `$\\begin{aligned}
             -x^2${ecritureAlgebrique(b)}&=${c}\\\\
             -x^2${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
             -x^2&=${c - b}\\\\
             x^2&=${b - c}
             \\end{aligned}$`
              }

              if (k > 0) {
                if (k === 1 || k === 4 || k === 9 || k === 16 || k === 25) {
                  correction += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(k, 0)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombre(k, 0)}}$ et $\\sqrt{${texNombre(k, 0)}}$. 
                <br>  Comme $-\\sqrt{${texNombre(k, 0)}}=-${extraireRacineCarree(k)[0]}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}$ alors 
                les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}$ et $${extraireRacineCarree(k)[0]}$.<br>
                Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\}$.`
                } else {
                  if (extraireRacineCarree(k)[1] !== k) {
                    correction += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(k, 0)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombre(k, 0)}}$ et $\\sqrt{${texNombre(k, 0)}}$.<br>Comme $-\\sqrt{${k}}=-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ alors 
                    les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$.<br>
                    Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}\\}$.`
                  } else {
                    correction += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(k, 0)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombre(k, 0)}}$ et $\\sqrt{${texNombre(k, 0)}}$.<br>
                    Ainsi,  $S=\\{-\\sqrt{${k}}${sp(1)};${sp(1)}\\sqrt{${k}}\\}$.`
                  }
                }
              }
              if (k === 0) {
                correction += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(k, 0)}=0$, donc l'équation a une solution : $0$.<br>
              Ainsi, $S=\\{0\\}$. `
              }
              if (k < 0) {
                correction += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(b - c)}$, alors l'équation n'a pas de solution.
                <br> Ainsi, $S=\\emptyset$. `
              }
              break

            case 3:// ax^2+b=c
              a = randint(-10, 10, [-1, 0, 1])
              b = randint(-10, 10, 0)
              c = randint(-10, 10, 0)
              k = (c - b) / a
              f1 = fraction(c - b, a)
              enonce = `Résoudre dans $\\mathbb{R}$ :<br>
              ${sp(50)} $${a}x^2${ecritureAlgebrique(b)}=${c}$`
              correction = 'On isole $x^2$ dans le membre de gauche pour obtenir une équation du type $x^2=k$.<br> '
              if (b > 0) {
                correction += `$\\begin{aligned}
              ${a}x^2${ecritureAlgebrique(b)}&=${c}\\\\
              ${a}x^2${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
              ${a}x^2&=${c - b}\\\\
                         x^2&=${texFractionReduite(c - b, a)}
             \\end{aligned}$`
              } else {
                correction += `$\\begin{aligned}
             ${a}x^2${ecritureAlgebrique(b)}&=${c}\\\\
             ${a}x^2${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
             ${a}x^2&=${c - b}\\\\
                        x^2&=${texFractionReduite(c - b, a)}
            \\end{aligned}$`
              }
              if (k > 0) {
                if (c - b === a || c - b === 4 * a || c - b === 9 * a || c - b === 16 * a || c - b === 25 * a) {
                  correction += `<br>$${texNombre(k, 0)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombre(k, 0)}}$ et $\\sqrt{${texNombre(k, 0)}}$. 
                <br>  Comme $-\\sqrt{${texNombre(k, 0)}}=-${extraireRacineCarree(k)[0]}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}$ alors 
                les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}$ et $${extraireRacineCarree(k)[0]}$.
                <br> Ainsi, $S=\\left\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\right\\}$.`
                } else {
                  if (((c - b === 4) && a === 9) || ((c - b === 9) && a === 4) || ((c - b === 16) && a === 9) || ((c - b === 9) && a === 16)) {
                    correction += `<br>$${texFractionReduite(c - b, a)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texFractionReduite(c - b, a)}}$ et $\\sqrt{${texFractionReduite(c - b, a)}}$. 
                  <br>  Comme $-\\sqrt{${texFractionReduite(c - b, a)}}=-\\dfrac{${extraireRacineCarree(c - b)[0]}}{${extraireRacineCarree(a)[0]}}$ et $\\sqrt{${texFractionReduite(c - b, a)}}=\\dfrac{${extraireRacineCarree(c - b)[0]}}{${extraireRacineCarree(a)[0]}}$ alors 
                  les solutions de l'équation peuvent s'écrire plus simplement : $-\\dfrac{${extraireRacineCarree(c - b)[0]}}{${extraireRacineCarree(a)[0]}}$ et $\\dfrac{${extraireRacineCarree(c - b)[0]}}{${extraireRacineCarree(a)[0]}}$.<br>
                  Ainsi, $S=\\left\\{-\\dfrac{${extraireRacineCarree(c - b)[0]}}{${extraireRacineCarree(a)[0]}}${sp(1)};${sp(1)}\\dfrac{${extraireRacineCarree(c - b)[0]}}{${extraireRacineCarree(a)[0]}}\\right\\}$`
                  } else {
                    correction += `<br>$${texFractionReduite(c - b, a)}>0$, donc l'équation a deux solutions : 
                  $-${f1.racineCarree().texFractionSimplifiee}$ et $${f1.racineCarree().texFractionSimplifiee}$. <br>
                  Ainsi, $S=\\left\\{-${f1.racineCarree().texFractionSimplifiee}${sp(1)};${sp(1)}${f1.racineCarree().texFractionSimplifiee}\\right\\}$`
                  }
                }
              }

              if (c - b === 0) {
                correction += `L'équation a une solution : $0$.<br>
              Ainsi, $S=\\{0\\}$. `
              }
              if ((c - b) / a < 0) {
                correction += `<br>$${texFractionReduite(c - b, a)}<0$, donc l'équation n'a pas de solution. <br>
              Ainsi, $S=\\emptyset$. `
              }

              break
          }
          break
        case 'sqrt(x)=k':
          switch (sousChoix[i]) {
            case 0:// sqrt(x)=k
              k = randint(-25, 25, 0)
              enonce = `Résoudre dans $[0${sp(1)};${sp(1)}+\\infty[$ :<br>
                            ${sp(50)} $\\sqrt{x}=${k}$`
              correction = ''
              if (this.correctionDetaillee) {
                correction += `Pour tout réel $x$ positif ou nul, l'équation $\\sqrt{x}=k$ admet :<br>
                $\\bullet~$ une solution  si $k\\geqslant 0$ : $k^2$ ;<br>
                $\\bullet~$  aucune solution si $k<0$.<br>
               `
              }
              if (k < 0) {
                correction += `L'équation est de la forme $\\sqrt{x}=k$. Comme $k=${k}$ et $${k}<0$ alors l'équation n'admet pas de solution.<br>
              Ainsi,   $S=\\emptyset$.
              `
              }
              if (k > 0 || k === 0) {
                correction += `$k=${k}$ et $${k}>0$ donc l'équation admet une solution : $${k}^2=${k ** 2}$.<br>
               Ainsi $S=\\{${k ** 2}\\}$.
              `
              }
              break

            case 1:// sqrt(x)+b=c
              b = randint(-10, 10, 0)
              c = randint(-10, 10)
              k = c - b
              enonce = `Résoudre dans $[0${sp(1)};${sp(1)}+\\infty[$ :<br>
                ${sp(50)} $\\sqrt{x}${ecritureAlgebrique(b)}=${c}$`

              if (b > 0) {
                correction = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                $\\begin{aligned}
                \\sqrt{x}${ecritureAlgebrique(b)}&=${c}\\\\
                \\sqrt{x}${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
                \\sqrt{x}&=${c - b}
                               \\end{aligned}$<br>`
              } else {
                correction = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                               $\\begin{aligned}
                               \\sqrt{x}${ecritureAlgebrique(b)}&=${c}\\\\
                               \\sqrt{x}${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                               \\sqrt{x}&=${c - b}
                                              \\end{aligned}$<br>`
              }
              if (c - b < 0) {
                correction += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${k}$. Comme $${k}<0$ alors l'équation n'admet pas de solution. <br>
Ainsi,   $S=\\emptyset$.<br>
`
              }
              if (c - b > 0 || c - b === 0) {
                correction += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${c - b}$. Comme $${c - b}\\geqslant 0$ alors l'équation admet une solution : $${k}^2=${k ** 2}$.<br>
   Ainsi $S=\\{${k ** 2}\\}$.
  `
              }

              break
            case 2:// -sqrt(x)+b=c
              b = randint(-10, 10, 0)
              c = randint(-10, 10)
              k = b - c
              enonce = `Résoudre dans $[0${sp(1)};${sp(1)}+\\infty[$ :<br>
                ${sp(50)} $-\\sqrt{x}${ecritureAlgebrique(b)}=${c}$`
              if (b > 0) {
                correction = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                $\\begin{aligned}
                -\\sqrt{x}${ecritureAlgebrique(b)}&=${c}\\\\
                -\\sqrt{x}${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
                -\\sqrt{x}&=${c - b}\\\\
                \\sqrt{x}&=${b - c}
                               \\end{aligned}$<br>`
              } else {
                correction = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                               $\\begin{aligned}
                               -\\sqrt{x}${ecritureAlgebrique(b)}&=${c}\\\\
                               -\\sqrt{x}${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                               -\\sqrt{x}&=${c - b}\\\\
                               \\sqrt{x}&=${b - c}
                                              \\end{aligned}$<br>`
              }
              if (k < 0) {
                correction += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${k}$. Comme $${k}<0$ alors l'équation n'admet pas de solution. <br>
Ainsi,   $S=\\emptyset$.<br>
`
              }
              if (k > 0 || k === 0) {
                correction += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${b - c}$. Comme $${b - c}\\geqslant0$ alors l'équation admet une solution : $${k}^2=${k ** 2}$.<br>
   Ainsi $S=\\{${k ** 2}\\}$.
  `
              }

              break
            case 3:// a*sqrt(x)+b=c
              a = randint(-10, 10, [0, -1, 1])
              b = randint(-10, 10, 0)
              c = randint(-10, 10)
              k = (c - b) / a
              enonce = `Résoudre dans $[0${sp(1)};${sp(1)}+\\infty[$ :<br>
                ${sp(50)} $${a}\\sqrt{x}${ecritureAlgebrique(b)}=${c}$`
              if (b > 0) {
                correction = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                $\\begin{aligned}
                ${a}\\sqrt{x}${ecritureAlgebrique(b)}&=${c}\\\\
                ${a}\\sqrt{x}${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
                ${a}\\sqrt{x}&=${c - b}\\\\
                \\sqrt{x}&=${texFractionReduite(c - b, a)}
                               \\end{aligned}$<br>`
              } else {
                correction = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                               $\\begin{aligned}
                               ${a}\\sqrt{x}${ecritureAlgebrique(b)}&=${c}\\\\
                               ${a}\\sqrt{x}${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                               ${a}\\sqrt{x}&=${c - b}\\\\
                               \\sqrt{x}&=${texFractionReduite(c - b, a)}
                                              \\end{aligned}$<br>`
              }
              if (k < 0) {
                correction += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${texFractionReduite(c - b, a)}$. Comme $${texFractionReduite(c - b, a)}<0$ alors l'équation n'admet pas de solution. <br>
Ainsi,   $S=\\emptyset$.<br>
`
              }
              if (k > 0 || k === 0) {
                correction += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${texFractionReduite(c - b, a)}$. Comme $${texFractionReduite(c - b, a)}\\geqslant0$ alors l'équation admet une solution : $\\left(${texFractionReduite(c - b, a)}\\right)^2=${texFractionReduite((c - b) ** 2, a ** 2)}$.<br>
   Ainsi $S=\\left\\{${texFractionReduite((c - b) ** 2, a ** 2)}\\right\\}$.
  `
              }

              break
          }
          break
        case '1/x=k':

          switch (sousChoix[i]) { // sousChoix[i] = randint(0, 5)
            case 0:
              k = randint(-10, 10)

              enonce = `Résoudre dans $\\mathbb{R}^*$ :<br>
                ${sp(50)} $\\dfrac{1}{x}=${k}$`
              correction = ''
              if (this.correctionDetaillee) {
                correction += `L'équation $\\dfrac{1}{x}=k$ admet :<br>
                $\\bullet~$ si $k\\neq 0$, l'équation a une unique solution  : $\\dfrac{1}{k}$.<br>
                $\\bullet~$ si $k= 0$, l'équation n'admet pas de solution.<br>`
              }
              correction += ''
              if (k === 0) {
                correction += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Comme $k=${k}$, alors l'équation n'admet pas de solution.<br>
              Ainsi,   $S=\\emptyset$.
              `
              }
              if (k !== 0) {
                correction += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Comme $${k}\\neq 0$ alors l'équation admet une solution : 
                $${texFractionReduite(1, k)}$.<br>
               Ainsi $S=\\left\\{${texFractionReduite(1, k)}\\right\\}$.
              `
              }

              break

            case 1:
              b = randint(-10, 10, 0)
              c = randint(-10, 10)
              k = c - b
              enonce = `Résoudre dans $\\mathbb{R}^*$ :<br>
                   ${sp(50)} $\\dfrac{1}{x}${ecritureAlgebrique(b)}=${c}$`
              correction = ''
              if (b > 0) {
                correction += `On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                    $\\begin{aligned}
                    \\dfrac{1}{x}${ecritureAlgebrique(b)}&=${c}\\\\
                    \\dfrac{1}{x}${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
                    \\dfrac{1}{x}&=${c - b}                  
                                                \\end{aligned}$<br>`
              } else {
                correction += `On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                                                $\\begin{aligned}
                                                \\dfrac{1}{x}${ecritureAlgebrique(b)}&=${c}\\\\
                                                \\dfrac{1}{x}${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                                                \\dfrac{1}{x}&=${c - b}                  
                                                                            \\end{aligned}$<br>`
              }
              if (k === 0) {
                correction += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation n'admet pas de solution.<br>
                 Ainsi,   $S=\\emptyset$.
                 `
              }
              if (k !== 0) {
                correction += `$k=${k}$ et $${k}\\neq 0$, donc l'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation admet une solution : 
                   $${texFractionReduite(1, k)}$.<br>
                  Ainsi $S=\\left\\{${texFractionReduite(1, k)}\\right\\}$.
                 `
              }
              break
            case 2:
              a = randint(-10, 10, 0)
              b = randint(-10, 10, 0)
              k = b / a
              enonce = `Résoudre dans $\\mathbb{R}^*$ :<br>
                   ${sp(50)} $\\dfrac{${a}}{x}=${b}$`
              correction = ''
              correction += `On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                    $\\begin{aligned}
                    \\dfrac{${a}}{x}&=${b}\\\\
                    \\dfrac{1}{x}&=${texFractionReduite(b, a)}${sp(20)}\\text{En divisant par } ${a} \\text{ dans chaque membre}\\\\             
                                                \\end{aligned}$<br>`
              if (k === 0) {
                correction += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation n'admet pas de solution.<br>
                 Ainsi,   $S=\\emptyset$.
                 `
              }
              if (k !== 0) {
                if (k % 1 === 0) {
                  correction += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${texFractionReduite(b, a)}$. Donc l'équation admet une solution : 
                   $\\dfrac{1}{${texFractionReduite(b, a)}}$.<br>
                  Ainsi $S=\\left\\{${texFractionReduite(a, b)}\\right\\}$.
                 `
                } else {
                  correction += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${texFractionReduite(b, a)}$. Donc l'équation admet une solution : 
                 $\\dfrac{1}{${texFractionReduite(b, a)}}=${texFractionReduite(a, b)}$.<br>
                Ainsi $S=\\left\\{${texFractionReduite(a, b)}\\right\\}$.
               `
                }
              }
              break
            case 3:
              a = randint(-10, 10, 0)
              b = randint(-10, 10, 0)
              c = randint(-10, 10, 0)
              k = (c - b) / a
              enonce = `Résoudre dans $\\mathbb{R}^*$ :<br>
                   ${sp(50)} $\\dfrac{${a}}{x}${ecritureAlgebrique(b)}=${c}$`
              correction = ''
              if (b > 0) {
                correction += `On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                    $\\begin{aligned}
                    \\dfrac{${a}}{x}${ecritureAlgebrique(b)}&=${c}\\\\
                    \\dfrac{${a}}{x}${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
                    \\dfrac{${a}}{x}&=${c - b}\\\\
                    \\dfrac{1}{x}&=${texFractionReduite(c - b, a)}${sp(20)}\\text{En divisant par } ${a} \\text{ dans chaque membre}                           
                                                \\end{aligned}$<br>`
              } else {
                correction += `On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                                                $\\begin{aligned}
                                                \\dfrac{${a}}{x}${ecritureAlgebrique(b)}&=${c}\\\\
                                                \\dfrac{${a}}{x}${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                                                \\dfrac{${a}}{x}&=${c - b}\\\\
                    \\dfrac{1}{x}&=${texFractionReduite(c - b, a)}${sp(20)}\\text{En divisant par } ${a} \\text{ dans chaque membre}\\\\                  
                                                                            \\end{aligned}$<br>`
              }
              if (k === 0) {
                correction += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${texFractionReduite(c - b, a)}$. Donc l'équation n'admet pas de solution.<br>
                 Ainsi,   $S=\\emptyset$.
                 `
              }
              if (k !== 0) {
                if (k % 1 === 0) {
                  correction += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${texFractionReduite(c - b, a)}$. Donc l'équation  admet une solution : 
                   $\\dfrac{1}{${texFractionReduite(c - b, a)}}$.<br>
                  Ainsi $S=\\left\\{${texFractionReduite(a, c - b)}\\right\\}$.
                 `
                } else {
                  correction += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${texFractionReduite(c - b, a)}$. Donc l'équation  admet une solution : 
                 $\\dfrac{1}{${texFractionReduite(c - b, a)}}=${texFractionReduite(a, c - b)}$.<br>
                Ainsi $S=\\left\\{${texFractionReduite(a, c - b)}\\right\\}$.
               `
                }
              }
              break
          }
          break

        case 'x^3=k':

          switch (sousChoix[i]) { // sousChoix[i] = randint(0, 5)
            case 0:
              k1 = choice([-10, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 10])
              k = k1 ** 3

              enonce = `Résoudre dans $\\mathbb{R}$ :<br>
                ${sp(50)} $x^3=${k}$`
              correction = ''
              if (this.correctionDetaillee) {
                correction += `Pour tout réel $k$, l'équation $x^3=k$ admet pour unique solution le nombre dont le cube est égal à $k$. <br>
                On peut noter ce nombre : $\\sqrt[3]{k}$. <br>`
              }
              correction += `L'équation est de la forme $x^3=k$ avec $k=${k}$. <br>
              Le nombre dont le cube est $${k}$ est $${k1}$ car $${ecritureParentheseSiNegatif(k1)}^3=${k}$.<br>
              Ainsi,   $S=\\{${k1}\\}$.
              `

              break

            case 1:
              b = randint(-10, 10, 0)
              k1 = choice([-10, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 10])
              k = k1 ** 3
              c = k + b
              enonce = `Résoudre dans $\\mathbb{R}$ :<br>
                   ${sp(50)} $x^3${ecritureAlgebrique(b)}=${c}$`
              correction = ''
              if (b > 0) {
                correction += `On isole $x^3$ dans le membre de gauche pour obtenir une équation du type $x^3=k$.<br>
                    $\\begin{aligned}
                    x^3${ecritureAlgebrique(b)}&=${c}\\\\
                    x^3${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
                    x^3&=${c - b}                  
                                                \\end{aligned}$<br>`
              } else {
                correction += `On isole $x^3$ dans le membre de gauche pour obtenir une équation du type $x^3=k$.<br>
                                                $\\begin{aligned}
                                                x^3${ecritureAlgebrique(b)}&=${c}\\\\
                                                x^3${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                                                x^3&=${c - b}                  
                                                                            \\end{aligned}$<br>`
              }
              correction += `L'équation est de la forme $x^3=k$ avec $k=${k}$. <br>
              Le nombre dont le cube est $${k}$ est $${k1}$ car $${ecritureParentheseSiNegatif(k1)}^3=${k}$.<br>
              Ainsi,   $S=\\{${k1}\\}$.
              `

              break
            case 2:
              a = randint(-10, 10, [0, -1, 1])
              k1 = choice([-10, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 10])
              k = k1 ** 3
              c = k * a
              enonce = `Résoudre dans $\\mathbb{R}$ :<br>
                     ${sp(50)} $${a}x^3=${c}$`
              correction = ''

              correction += `On isole $x^3$ dans le membre de gauche pour obtenir une équation du type $x^3=k$.<br>
                      $\\begin{aligned}
                      ${a}x^3&=${c}\\\\
                      x^3&=${texFractionReduite(c, a)}\\\\              
                                                  \\end{aligned}$<br>`

              correction += `L'équation est de la forme $x^3=k$ avec $k=${k}$. <br>
              Le nombre dont le cube est $${k}$ est $${k1}$ car $${ecritureParentheseSiNegatif(k1)}^3=${k}$.<br>
              Ainsi,   $S=\\{${k1}\\}$.
              `
              break
            case 3:
              a = randint(-10, 10, [0, -1, 1])
              b = randint(-10, 10, [0, -1, 1])
              k1 = choice([-10, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 10])
              k = k1 ** 3
              c = k * a + b
              enonce = `Résoudre dans $\\mathbb{R}$ :<br>
                     ${sp(50)} $${a}x^3${ecritureAlgebrique(b)}=${c}$`
              correction = ''

              if (b > 0) {
                correction += `On isole $x^3$ dans le membre de gauche pour obtenir une équation du type $x^3=k$.<br>
                      $\\begin{aligned}
                      ${a}x^3${ecritureAlgebrique(b)}&=${c}\\\\
                      ${a}x^3${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
                      ${a}x^3&=${texNombre(c - b, 0)}\\\\  
                      x^3&=${texFractionReduite(c - b, a)}\\\\             
                                                  \\end{aligned}$<br>`
              } else {
                correction += `On isole $x^3$ dans le membre de gauche pour obtenir une équation du type $x^3=k$.<br>
                      $\\begin{aligned}
                      ${a}x^3${ecritureAlgebrique(b)}&=${c}\\\\
                      ${a}x^3${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                      ${a}x^3&=${texNombre(c - b, 0)}\\\\  
                      x^3&=${texFractionReduite(c - b, a)}\\\\             
                                                  \\end{aligned}$<br>`
              }

              correction += `L'équation est de la forme $x^3=k$ avec $k=${k}$. <br>
              Le nombre dont le cube est $${k}$ est $${k1}$ car $${ecritureParentheseSiNegatif(k1)}^3=${k}$.<br>
              Ainsi,   $S=\\{${k1}\\}$.
              `
              break
          }
          break
      }

      texte = enonce
      texteCorr = correction

      if (this.questionJamaisPosee(i, listeTypeDeQuestions[i], x, y, sousChoix[i])) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Choix des questions',
    5,
    '1 : x^2=k\n2 : sqrt{x}=k \n3 : 1/x=k \n4 : x^3=k \n5 : Mélange'
  ]
  this.besoinFormulaire2Numerique = ['Choix des questions', 3, '1 : Equation directe\n2 : Equation indirecte\n3 : Mélange']
}
