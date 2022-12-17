import Exercice from '../../Exercice.js'
import { randint, calcul, printlatex, texNombre, rienSi1, choice, ecritureAlgebrique, signe, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
export const titre = 'Réduire une expression littérale'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '23/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = '97664'
export const ref = 'can4L07'
export default function ReduireExp () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.formatChampTexte = 'largeur15 inline'
    let a, b, c, choix, d, e
    switch (randint(1, 3)) {
      case 1: // ax+bx+c
        choix = choice([1, 2, 3])// 1,2
        if (choix === 1) {
          a = randint(1, 10)
          b = randint(1, 10)
          c = randint(1, 10)
          this.question = `Écrire le plus simplement possible : <br>
          
          $${rienSi1(a)}x+${rienSi1(b)}x+${texNombre(c)}$.`
          this.correction = `$${rienSi1(a)}x+${rienSi1(b)}x+${texNombre(c)}=(${a}+${b})x+${c}=${texNombre(calcul(a + b))}x+${texNombre(c)}$=`
          this.reponse = printlatex(`${texNombre(calcul(a + b))}x+${texNombre(c)}`)
        }
        if (choix === 2) {
          a = randint(1, 5)
          b = randint(1, 5)
          c = randint(1, 5)
          this.question = `Écrire le plus simplement possible : <br>
          
          $${rienSi1(b)}x+${texNombre(c)}+${rienSi1(a)}x$.`
          this.correction = `$${rienSi1(b)}x+${texNombre(c)}+${rienSi1(a)}x=(${a}+${b})x+${c}=${texNombre(calcul(a + b))}x+${texNombre(c)}$`
          this.reponse = printlatex(`${texNombre(calcul(a + b))}x+${texNombre(c)}`)
        }
        if (choix === 3) {
          a = randint(-4, -1)
          b = randint(-4, -1)
          c = randint(1, 10)
          this.question = `Écrire le plus simplement possible : <br>
          
          $${rienSi1(b)}x+${texNombre(c)}${rienSi1(a)}x$.`
          this.correction = `$${rienSi1(b)}x+${texNombre(c)}${rienSi1(a)}x=(${a}${b})x+${c}=${texNombre(calcul(a + b))}x+${texNombre(c)}$`
          this.reponse = printlatex(`${texNombre(calcul(a + b))}x+${texNombre(c)}`)
        }

        break

      case 2: // ax^2+bx+c+dx^2+/-x
        choix = choice([1, 2])// 1,2
        if (choix === 1) {
          b = randint(1, 3)
          c = randint(1, 3)
          d = randint(1, 5)
          e = choice([-1, 1])
          a = randint(1, 4, d)
          this.question = `Écrire le plus simplement possible : <br>
          
          $${rienSi1(a)}x^2+${rienSi1(b)}x+${texNombre(c)}+${rienSi1(d)}x^2${signe(e)}x$.`

          if (b + e === 0) {
            this.correction = `$${rienSi1(a)}x^2+${rienSi1(b)}x+${texNombre(c)}+${rienSi1(d)}x^2+x=(${a} + ${d})x^2+(${b}${ecritureAlgebrique(e)})x+${texNombre(c)}=${texNombre(calcul(a + d))}x^2+${texNombre(c)}$`
            this.reponse = printlatex(`${texNombre(calcul(a + d))}x^2+${texNombre(c)}`)
          } else {
            this.correction = `$${rienSi1(a)}x^2+${rienSi1(b)}x+${texNombre(c)}+${rienSi1(d)}x^2+x=(${a} + ${d})x^2+(${b}${ecritureAlgebrique(e)})x+${texNombre(c)}=${texNombre(calcul(a + d))}x^2+${texNombre(calcul(b + e))}x+${texNombre(c)}$`
            this.reponse = printlatex(`${texNombre(calcul(a + d))}x^2+${texNombre(calcul(b + e))}x+${texNombre(c)}`)
          }
        }
        if (choix === 2) {
          b = randint(-5, -2)
          c = randint(1, 5)
          d = randint(-5, -2)
          e = choice([-1, 1])
          a = randint(-5, 5, 0)
          this.question = `Écrire le plus simplement possible : <br>
          
          $${rienSi1(a)}x^2${ecritureAlgebrique(b)}x${ecritureAlgebrique(c)}${ecritureAlgebrique(d)}x^2${signe(e)}x$.`

          if (a + d === 0) {
            this.correction = `$${rienSi1(a)}x^2${ecritureAlgebrique(b)}x${ecritureAlgebrique(c)}${ecritureAlgebrique(d)}x^2+x=
            (${a}${ecritureAlgebrique(d)})x^2+(${b}${ecritureAlgebrique(e)})x${ecritureAlgebrique(c)}=
            ${ecritureAlgebrique(b + e)}x+${texNombre(c)}$`
            this.reponse = printlatex(`${texNombre(calcul(b + e))}x+${texNombre(c)}`)
          } else {
            this.correction = `$${rienSi1(a)}x^2${ecritureAlgebrique(b)}x${ecritureAlgebrique(c)}${ecritureAlgebrique(d)}x^2+x=
            (${a}${ecritureAlgebrique(d)})x^2+(${b}${ecritureAlgebrique(e)})x${ecritureAlgebrique(c)}=
            ${rienSi1(a + d)}x^2${ecritureAlgebrique(b + e)}x+${texNombre(c)}$`
            this.reponse = printlatex(`${texNombre(calcul(a + d))}x^2${texNombre(calcul(b + e))}x+${texNombre(c)}`)
          }
        }

        break

      case 3: // ax*bx ou ax*b
        choix = choice([1, 2])// 1,2
        if (choix === 1) {
          a = randint(-9, 9, 0)
          b = randint(-9, 9, [0, -1, 1])
          if (b > 0) {
            this.question = `Écrire le plus simplement possible : <br>
            
            $${rienSi1(a)}x\\times${b}x$.`
          } else { this.question = `Écrire le plus simplement possible : <br>$${rienSi1(a)}x\\times(${b}x)$=` }
          if (b > 0) { this.correction = `$${rienSi1(a)}x\\times${b}x=(${texNombre(a)}\\times  ${ecritureParentheseSiNegatif(b)})x^2=${texNombre(calcul(a * b))}x^2$` } else { this.correction = `$${rienSi1(a)}x\\times (${b}x)=(${texNombre(a)}\\times  ${ecritureParentheseSiNegatif(b)})x^2=${texNombre(calcul(a * b))}x^2$` }
          this.reponse = printlatex(`${texNombre(calcul(a * b))}x^2`)
        }
        if (choix === 2) {
          a = randint(-9, 9, 0)
          b = randint(-9, 9, [0, -1, 1])
          this.question = `Écrire le plus simplement possible : <br>
          
          $${rienSi1(a)}x\\times${ecritureParentheseSiNegatif(b)}$.`
          this.correction = `$${rienSi1(a)}x\\times${ecritureParentheseSiNegatif(b)}=${texNombre(calcul(a * b))}x$`
          this.reponse = printlatex(`${texNombre(calcul(a * b))}x`)
        }
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
