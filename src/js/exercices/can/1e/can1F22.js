import Exercice from '../../Exercice.js'
import { randint, rienSi1, reduirePolynomeDegre3, ecritureAlgebrique, choice, abs, listeQuestionsToContenu, ecritureAlgebriqueSauf1 } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Reconnaître une fonction polynôme du second degré (V/F)'
export const interactifReady = true
export const interactifType = 'qcm'
export const dateDePublication = '24/09/2022'
/**
 *
 * @author Gilles Mora
 * Référence can1F21
 *
*/

export const uuid = '6e9df'
export const ref = 'can1F22'
export default function ReconnaitreFonctionDegre2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.tailleDiaporama = 2
    const nomF = [
      ['f'], ['g'], ['h'], ['u'],
      ['v'], ['w'], ['r']
    ]
    let texte, texteCorr, monQcm, a, b, c, d, nom, x1, x2, choix, alpha, beta, r1, r2
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2, 3, 4, 5, 62])) { //
        case 1:// forme developpee ok

          a = randint(-3, 3, 0)
          b = randint(-9, 9, 0)
          c = randint(-9, 9, 0)
          d = choice([5, 7, 10])
          r1 = choice([2, 3, 5, 6, 7, 10])
          nom = choice(nomF)
          choix = choice(['a', 'b', 'c', 'd', 'e', 'f', 'g'])//
          if (choix === 'a') {
            texte = `Soit $${nom}$ la fonction définie  par :
            $${nom}(x)=${reduirePolynomeDegre3(0, a, b, c)}$. <br>
            $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'b') {
            texte = `Soit $${nom}$ la fonction définie  par :
            $${nom}(x)=${reduirePolynomeDegre3(0, a, 0, c)}$. <br>
            $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'c') {
            texte = `Soit $${nom}$ la fonction définie  par :
            $${nom}(x)=${reduirePolynomeDegre3(0, a, b, 0)}$. <br>
            $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'd') {
            texte = `Soit $${nom}$ la fonction définie  par :
            $${nom}(x)=${rienSi1(b)}x${ecritureAlgebrique(c)}${ecritureAlgebriqueSauf1(a)}x^2$. <br>
            $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'e') {
            texte = `Soit $${nom}$ la fonction définie  par :
            $${nom}(x)=${rienSi1(b)}x${ecritureAlgebriqueSauf1(a)}x^2${ecritureAlgebrique(c)}$. <br>
            $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'f') {
            texte = `Soit $${nom}$ la fonction définie  par :
            $${nom}(x)=\\dfrac{${reduirePolynomeDegre3(0, a, 0, c)}}{${d}}$. <br>
            $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'g') {
            texte = `Soit $${nom}$ la fonction définie  par :
            $${nom}(x)=${rienSi1(a)}x^2+\\sqrt{${r1}}x${ecritureAlgebrique(c)}$. <br>
            $${nom}$ est une fonction polynôme du second degré.`
          }
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                texte: 'V',
                statut: a < 10
              },
              {
                texte: 'F',
                statut: a > 10
              }
            ],
            options: { ordered: true }
          }
          monQcm = propositionsQcm(this, i)
          texte += monQcm.texte

          if (choix === 'a') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
            $${nom}(x)$ est de la forme $ax^2+bx+c$ avec $a=${a}$, $b=${b}$ et $c=${c}$.<br>
             $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `
          }
          if (choix === 'b') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
            $${nom}(x)$ est de la forme $ax^2+bx+c$ avec $a=${a}$, $b=0$ et $c=${c}$.<br>
            $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `
          }
          if (choix === 'c') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
            $${nom}(x)$ est de la forme $ax^2+bx+c$ avec $a=${a}$, $b=${b}$ et $c=0$.<br>
            $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `
          }
          if (choix === 'd') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
            $${nom}(x)$ est de la forme $ax^2+bx+c$ avec $a=${a}$, $b=${b}$ et $c=${c}$.<br>
            $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `
          }
          if (choix === 'e') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
            $${nom}(x)$ est de la forme $ax^2+bx+c$ avec $a=${a}$, $b=${b}$ et $c=${c}$.<br>
            $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `
          }
          if (choix === 'f') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
            $${nom}(x)$ est de la forme $ax^2+bx+c$ avec $a=\\dfrac{${a}}{${d}}$, $b=0$ et $c=\\dfrac{${c}}{${d}}$.<br>
            $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `
          }
          if (choix === 'g') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
                $${nom}(x)$ est de la forme $ax^2+bx+c$ avec $a=${a}$, $b=\\sqrt{${r1}}$ et $c=${c}$.<br>
                $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `
          }
          break

        case 2:// forme factorisee ok

          a = randint(-3, 3, 0)
          x1 = randint(-9, 9, 0)
          x2 = randint(-9, 9, [0, x1])
          nom = choice(nomF)
          r1 = choice([2, 3, 5, 6, 7, 10])
          r2 = choice([2, 3, 5, 6, 7, 10])
          choix = choice(['a', 'b', 'c', 'd', 'e', 'f'])//
          if (choix === 'a') {
            texte = `Soit $${nom}$ la fonction définie  par :
              $${nom}(x)=${rienSi1(a)}(x${ecritureAlgebrique(x1)})(x${ecritureAlgebrique(x2)})$. <br>
              $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'b') {
            texte = `Soit $${nom}$ la fonction définie  par :
              $${nom}(x)=${rienSi1(a)}x(x${ecritureAlgebrique(x2)})$. <br>
              $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'c') {
            texte = `Soit $${nom}$ la fonction définie  par :
              $${nom}(x)=x(x${ecritureAlgebrique(x2)})$. <br>
              $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'd') {
            texte = `Soit $${nom}$ la fonction définie  par :
                $${nom}(x)=(${x1}-x)(x${ecritureAlgebrique(x2)})$. <br>
                $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'e') {
            texte = `Soit $${nom}$ la fonction définie  par :
              $${nom}(x)=${rienSi1(a)}(x+\\sqrt{${r1}})(x-\\sqrt{${r2}})$. <br>
              $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'f') {
            texte = `Soit $${nom}$ la fonction définie  par :
              $${nom}(x)=\\sqrt{${r1}}(x${ecritureAlgebrique(x1)})(x${ecritureAlgebrique(x2)})$. <br>
              $${nom}$ est une fonction polynôme du second degré.`
          }
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                texte: 'V',
                statut: a < 10
              },
              {
                texte: 'F',
                statut: a > 10
              }
            ],
            options: { ordered: true }
          }
          monQcm = propositionsQcm(this, i)
          texte += monQcm.texte

          if (choix === 'a') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
              $${nom}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=${a}$, $x_1=${-x1}$ et $x_2=${-x2}$.<br>  Il s'agit de la forme factorisée d'une fonction polynôme du second degré. `
          }
          if (choix === 'b') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
              $${nom}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=${a}$, $x_1=0$ et $x_2=${-x2}$.<br> Il s'agit de la forme factorisée d'une fonction polynôme du second degré.   `
          }
          if (choix === 'c') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
              $${nom}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=1$, $x_1=0$ et $x_2=${-x2}$.<br> Il s'agit de la forme factorisée d'une fonction polynôme du second degré.   `
          }
          if (choix === 'd') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
                $${nom}(x)=(${x1}-x)(x${ecritureAlgebrique(x2)})=-(x${ecritureAlgebrique(-x1)})(x${ecritureAlgebrique(x2)})$.<br>
                $${nom}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=1$, $x_1=0$ et $x_2=${-x2}$.<br> Il s'agit de la forme factorisée d'une fonction polynôme du second degré.   `
          }
          if (choix === 'e') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
              $${nom}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=${a}$, $x_1=-\\sqrt{${r1}}$ et $x_2=\\sqrt{${r2}}$.<br>  Il s'agit de la forme factorisée d'une fonction polynôme du second degré. `
          }
          if (choix === 'f') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
              $${nom}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=\\sqrt{${r1}}$, $x_1=${-x1}$ et $x_2=${-x2}$.<br>  Il s'agit de la forme factorisée d'une fonction polynôme du second degré. `
          }
          break

        case 3:// forme canonique ok

          a = randint(-5, 5, 0)
          alpha = randint(-9, 9, 0)
          beta = randint(-9, 9, 0)
          nom = choice(nomF)
          choix = choice(['a', 'b', 'c'])//
          if (choix === 'a') {
            texte = `Soit $${nom}$ la fonction définie  par :
                  $${nom}(x)=${rienSi1(a)}(x${ecritureAlgebrique(alpha)})^2${ecritureAlgebrique(beta)}$. <br>
                  $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'b') {
            texte = `Soit $${nom}$ la fonction définie  par :
                  $${nom}(x)=${rienSi1(a)}(x${ecritureAlgebrique(alpha)})^2$. <br>
                  $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'c') {
            texte = `Soit $${nom}$ la fonction définie  par :
                  $${nom}(x)=(x${ecritureAlgebrique(alpha)})^2$. <br>
                  $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'd') {
            texte = `Soit $${nom}$ la fonction définie  par :
                    $${nom}(x)=(${x1}-x)(x${ecritureAlgebrique(x2)})$. <br>
                    $${nom}$ est une fonction polynôme du second degré.`
          }
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                texte: 'V',
                statut: a < 10
              },
              {
                texte: 'F',
                statut: a > 10
              }
            ],
            options: { ordered: true }
          }
          monQcm = propositionsQcm(this, i)
          texte += monQcm.texte

          if (choix === 'a') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
                  $${nom}(x)$ est de la forme $a(x-\\alpha)^2+\\beta$ avec $a=${a}$, $\\alpha=${-alpha}$ et $\\beta=${beta}$. <br> Il s'agit de la forme canonique d'une fonction polynôme du second degré. `
          }
          if (choix === 'b') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
                  $${nom}(x)$ est de la forme $a(x-\\alpha)^2+\\beta$ avec $a=${a}$, $\\alpha=${-alpha}$ et $\\beta=0$. <br> Il s'agit de la forme canonique d'une fonction polynôme du second degré. `
          }
          if (choix === 'c') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
                    $${nom}(x)$ est de la forme $a(x-\\alpha)^2+\\beta$ avec $a=1$, $\\alpha=${-alpha}$ et $\\beta=0$. <br> Il s'agit de la forme canonique d'une fonction polynôme du second degré. `
          }
          if (choix === 'd') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second degré. <br>
                    $${nom}(x)=(${x1}-x)(x${ecritureAlgebrique(x2)})=-(x${ecritureAlgebrique(-x1)})(x${ecritureAlgebrique(x2)})$.<br>
                    $${nom}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=1$, $x_1=0$ et $x_2=${-x2}$.<br> Il s'agit de la forme factorisée d'une fonction polynôme du second degré.   `
          }

          break

        case 4:// forme developpe pas ok
          a = randint(-3, 3, 0)
          b = randint(-9, 9, 0)
          c = randint(-9, 9, 0)
          d = choice([5, 7])
          nom = choice(nomF)
          choix = choice(['a', 'b', 'c', 'd'])
          if (choix === 'a') {
            texte = `Soit $${nom}$ la fonction définie  par :
              $${nom}(x)=${reduirePolynomeDegre3(a, b, c, 0)}$. <br>
              $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'b') {
            texte = `Soit $${nom}$ la fonction définie  par :
              $${nom}(x)=${b}${ecritureAlgebriqueSauf1(c)}x^3$. <br>
              $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'c') {
            texte = `Soit $${nom}$ la fonction définie  par :
              $${nom}(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x+\\dfrac{${abs(c)}}{x}$. <br>
              $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'd') {
            texte = `Soit $${nom}$ la fonction définie  par :
              $${nom}(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}\\sqrt{x}${ecritureAlgebrique(c)}$. <br>
              $${nom}$ est une fonction polynôme du second degré.`
          }

          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                texte: 'V',
                statut: a > 10
              },
              {
                texte: 'F',
                statut: a < 10
              }
            ],
            options: { ordered: true }
          }
          monQcm = propositionsQcm(this, i)
          texte += monQcm.texte

          if (choix === 'a') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ n'est pas une fonction polynôme du second degré. <br>
              $${nom}(x)$ est une fonction polynôme du troisième degré.   `
          }
          if (choix === 'b') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ n'est pas une fonction polynôme du second degré. <br>
              $${nom}(x)$ est une fonction polynôme du troisième degré.   `
          }
          if (choix === 'c') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ n'est pas une fonction polynôme du second degré. <br>
             L'expression  $${nom}(x)$ contient une division par $x$.  `
          }
          if (choix === 'd') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ est une fonction polynôme du second. <br>
              L'expression  $${nom}(x)$ contient une racine carrée de $x$.   `
          }

          break

        case 5:// forme factorisee pas ok

          a = randint(-3, 3, 0)
          x1 = randint(-9, 9, 0)
          x2 = randint(-9, 9, [0, x1])
          nom = choice(nomF)
          choix = choice(['a', 'b'])//, 'b', 'c', 'd'
          if (choix === 'a') {
            texte = `Soit $${nom}$ la fonction définie  par :
                    $${nom}(x)=${rienSi1(a)}x(x${ecritureAlgebrique(x1)})(x${ecritureAlgebrique(x2)})$. <br>
                    $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'b') {
            texte = `Soit $${nom}$ la fonction définie  par :
                  $${nom}(x)=${rienSi1(a)}x(\\sqrt{x}${ecritureAlgebrique(x1)})(x${ecritureAlgebrique(x2)})$. <br>
                  $${nom}$ est une fonction polynôme du second degré.`
          }

          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                texte: 'V',
                statut: a > 10
              },
              {
                texte: 'F',
                statut: a < 10
              }
            ],
            options: { ordered: true }
          }
          monQcm = propositionsQcm(this, i)
          texte += monQcm.texte

          if (choix === 'a') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ n'est pas une fonction polynôme du second degré. <br>
                   En développant l'expression, on obtient une fonction polynôme du troisième degré. `
          }
          if (choix === 'b') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ n'est pas une fonction polynôme du second degré. <br>
                  L'expression $${nom}(x)$ contient une racine carrée de $x$. `
          }

          break

        case 6:// "forme canonique" pas ok

          a = randint(-5, 5, 0)
          alpha = randint(-9, 9, 0)
          beta = randint(-9, 9, 0)
          nom = choice(nomF)
          choix = choice(['a', 'b', 'c'])//, 'b', 'c'
          if (choix === 'a') {
            texte = `Soit $${nom}$ la fonction définie  par :
                            $${nom}(x)=${rienSi1(a)}x(x${ecritureAlgebrique(alpha)})^2${ecritureAlgebrique(beta)}$. <br>
                            $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'b') {
            texte = `Soit $${nom}$ la fonction définie  par :
                            $${nom}(x)=${rienSi1(a)}(x${ecritureAlgebrique(alpha)})^2+\\sqrt{x}$. <br>
                            $${nom}$ est une fonction polynôme du second degré.`
          }
          if (choix === 'c') {
            texte = `Soit $${nom}$ la fonction définie  par :
                              $${nom}(x)=${rienSi1(a)}(\\sqrt{x}${ecritureAlgebrique(alpha)})^2${ecritureAlgebrique(beta)}$. <br>
                              $${nom}$ est une fonction polynôme du second degré.`
          }

          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                texte: 'V',
                statut: a > 10
              },
              {
                texte: 'F',
                statut: a < 10
              }
            ],
            options: { ordered: true }
          }
          monQcm = propositionsQcm(this, i)
          texte += monQcm.texte

          if (choix === 'a') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ n'est pas une fonction polynôme du second degré. <br>
                      En développant l'expression, on obtient une fonction polynôme du troisième degré. `
          }
          if (choix === 'b') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ n'est pas une fonction polynôme du second degré. <br>
                      L'expression $${nom}(x)$ contient une racine carrée de $x$. `
          }
          if (choix === 'c') {
            texteCorr = monQcm.texteCorr + `La fonction $${nom}$ n'est pas une fonction polynôme du second degré. <br>
                        L'expression $${nom}(x)$ contient une racine carrée de $x$. `
          }

          break
      }

      if (this.questionJamaisPosee(i, a, x1, x2, b, c, alpha, beta)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
