import Exercice from '../../Exercice.js'
import { randint, choice, ecritureAlgebrique, calcul, texNombre, texFractionReduite } from '../../../modules/outils.js'
export const titre = 'Calculer un terme d’une suite explicite'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '14/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora (exercice en partie repris de Gaelle Morvan (1N10))
 * Référence
*/
export default function CalculTermeSuiteExp () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, b, c, k, choix, listeFractions1, fraction1
    switch (choice(['a', 'b', 'c', 'd'])) { //
      case 'a':// fonction affine
        a = randint(1, 7) * choice([-1, 1])
        b = randint(1, 10) * choice([-1, 1])
        k = randint(1, 10)

        this.question = 'Soit $(u_n)$ une suite définie pour tout  $n\\in\\mathbb{N}$ par : $u_n = '
        if (a === 1) { this.question += 'n' } else if (a === -1) { this.question += '-n' } else { this.question += `${a}n` };
        if (b > 0) { this.question += `+${b}$` } else { this.question += `${b}$` };
        this.question += `<br>Calculer $u_{${k}}$.`

        this.correction = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient : $u_{${k}} =`
        if (a === 1) {
          this.correction += `${k} ${ecritureAlgebrique(b)}`
        } else {
          if (a === -1) {
            this.correction += `-${k} ${ecritureAlgebrique(b)}`
          } else {
            this.correction += `${a} \\times ${k} ${ecritureAlgebrique(b)}`
          }
        }
        this.correction += `=${a * k + b}$.`
        this.reponse = calcul(a * k + b)
        break
      case 'b':// polynome second degré
        a = randint(1, 2) * choice([-1, 1])
        b = randint(0, 3) * choice([-1, 1])
        c = randint(1, 9) * choice([-1, 1])
        k = randint(1, 5)

        this.question = 'Soit $(u_n)$ une suite définie pour tout  $n\\in\\mathbb{N}$ par : $u_n = '
        if (a === 1) {
          this.question += 'n^2$'
        } else {
          if (a === -1) {
            this.question += '-n^2$'
          } else {
            this.question += `${a}n^2$`
          }
        };
        if (b === 1) { this.question += ' $+n$' };
        if (b > 1) { this.question += `$+${b}n$` };
        if (b === -1) { this.question += '$-n$' };
        if (b < -1) { this.question += `$${b}n$` };
        if (c > 0) { this.question += `$+${c}$` };
        if (c < 0) { this.question += `$${c}$` }
        this.question += `<br>Calculer $u_{${k}}$.`

        this.correction = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient :<br> $u_{${k}} = `
        if (a === 1) { this.correction += `${k}^2` } else {
          if (a === -1) { this.correction += `-${k}^2` } else {
            this.correction += `${a}\\times ${k}^2`
          }
        };
        if (b === 1) {
          this.correction += `+${k}`
        } else {
          if (b === -1) {
            this.correction += `-${k}`
          } else {
            if (b === 0) { this.correction += '' } else {
              this.correction += `${ecritureAlgebrique(b)}\\times ${k}`
            }
          }
        }
        this.correction += `${ecritureAlgebrique(c)}=${a * k * k + b * k + c}$.`
        this.reponse = calcul(a * k * k + b * k + c)
        break
      case 'c':// suite a+b/n
        choix = choice([true, false])
        a = randint(1, 10) * choice([-1, 1])
        b = randint(1, 10)
        k = choice([1, 2, 4, 5, 10, 100])

        this.question = 'Soit $(u_n)$ une suite définie pour tout  $n\\in\\mathbb{N}^*$ par : '

        this.question += `$u_n =${a}${choix ? '+' : '-'}\\dfrac{${b}}{n}$ `
        this.question += `<br>Calculer $u_{${k}}$ (résultat sous forme décimale).<br>
         `
        this.correction = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient :<br> $u_{${k}} = `
        if (choix === true) {
          this.correction += `${a}+\\dfrac{${b}}{${k}}=${a}+${texNombre(b / k)}=${texNombre(a + b / k)}$.`
          this.reponse = calcul(a + b / k)
        } else {
          this.correction += `${a}-\\dfrac{${b}}{${k}}=${a}-${texNombre(b / k)}=${texNombre(a - b / k)}$.`
          this.reponse = calcul(a - b / k)
        }

        break
      case 'd':// suite a+b/n resultat fraction ir
        choix = choice([true, false])
        listeFractions1 = [[1, 3], [2, 3], [5, 3], [7, 3], [10, 3], [11, 3], [1, 7], [2, 7],
          [3, 7], [4, 7], [6, 7], [5, 7]]
        fraction1 = choice(listeFractions1)
        a = randint(1, 10) * choice([-1, 1])
        b = fraction1[0]
        k = fraction1[1]

        this.question = 'Soit $(u_n)$ une suite définie pour tout  $n\\in\\mathbb{N}^*$ par : '

        this.question += `$u_n =${a}${choix ? '+' : '-'}\\dfrac{${b}}{n}$ `
        this.question += `<br>Calculer $u_{${k}}$ (résultat sous forme d'une fraction irréductible).<br>
       `
        this.correction = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient :<br> $u_{${k}} = `
        if (choix === true) {
          this.correction += `${a}+\\dfrac{${b}}{${k}}=\\dfrac{${a}\\times ${k}}{${k}}+\\dfrac{${b}}{${k}}=\\dfrac{${a * k + b}}{${k}}$`
          this.reponse = texFractionReduite(a * k + b, k)
        } else {
          this.correction += `${a}-\\dfrac{${b}}{${k}}=\\dfrac{${a}\\times ${k}}{${k}}-\\dfrac{${b}}{${k}}=\\dfrac{${a * k - b}}{${k}}$`
          this.reponse = texFractionReduite(a * k - b, k)
        }
        break
    }
  }
}
