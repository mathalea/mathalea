import Exercice from '../../Exercice.js'
import { randint, choice, texNombrec, sp, calcul, shuffle } from '../../../modules/outils.js'
export const titre = 'Déterminer un taux global d’évolution'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '19/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = '9d51d'
export const ref = 'can2C12'
export default function TauxGlobal () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' $\\%$' }
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, b, coeffG
    let listeCalculs = []

    switch (choice(['a', 'b', 'c', 'd'])) {
      case 'a':// augmente puis diminue
        a = calcul(randint(1, 9) * 10)
        b = calcul(randint(1, 9) * 10)
        coeffG = (1 + a / 100) * (1 - b / 100)
        listeCalculs = [`$\\bullet$ $${texNombrec(1 - a / 100)}\\times ${texNombrec(1 - b / 100)}=${texNombrec((1 - a / 100) * (1 - b / 100))}$${sp(4)}`,
`$\\bullet$ $${texNombrec(1 + a / 100)}\\times ${texNombrec(1 - b / 100)}=${texNombrec((1 + a / 100) * (1 - b / 100))}$${sp(4)}`,
`$\\bullet$ $${texNombrec(1 + a / 100)}\\times ${texNombrec(1 + b / 100)}=${texNombrec((1 + a / 100) * (1 + b / 100))}$${sp(4)}`,
`$\\bullet$ $${texNombrec(a / 100)}\\times ${texNombrec(b / 100)}=${texNombrec((a / 100) * (b / 100))}$${sp(4)}`]
        listeCalculs = shuffle(listeCalculs)
        this.question = `  ${listeCalculs[0]}  ${listeCalculs[1]} <br>
 ${listeCalculs[2]}${listeCalculs[3]}<br>
En utilisant l'un des résultats précédents, déterminer le taux global d'évolution d'un article qui augmente de
$${a}\\%$  dans un premier temps, puis qui diminue de $${b}\\%$ dans un second temps. `
        this.correction = `Augmenter de $${a}\\%$ revient à multiplier par $${texNombrec(1 + a / 100)}$ et diminuer de $${b}\\%$ revient à multiplier par $${texNombrec(1 - b / 100)}$.<br>
Globalement cela revient donc à multiplier par $${texNombrec(1 + a / 100)}\\times ${texNombrec(1 - b / 100)}=${texNombrec(coeffG)}$.<br>
Multiplier par $${texNombrec(coeffG)}$ revient à multiplier par `
        if (coeffG > 1) {
          this.correction += ` $1+${texNombrec(coeffG - 1)}$, ce qui revient à augmenter de $${texNombrec((coeffG - 1) * 100)}\\%$. <br>
          Le taux d'évolution global est donc : $+${texNombrec((coeffG - 1) * 100)}\\%$.
`
        } else {
          this.correction += ` $1-${texNombrec(1 - coeffG)}$. <br>
        Le taux d'évolution global est donc : $${texNombrec((coeffG - 1) * 100)}\\%$
`
        }
        this.reponse = calcul((coeffG - 1) * 100)
        break

      case 'b':// augmente puis augmente
        a = calcul(randint(1, 9) * 10)
        b = calcul(randint(1, 9) * 10)
        coeffG = (1 + a / 100) * (1 + b / 100)
        listeCalculs = [`$\\bullet$ $${texNombrec(1 - a / 100)}\\times ${texNombrec(1 + b / 100)}=${texNombrec((1 - a / 100) * (1 + b / 100))}$${sp(4)}`,
  `$\\bullet$ $${texNombrec(1 + a / 100)}\\times ${texNombrec(1 + b / 100)}=${texNombrec((1 + a / 100) * (1 + b / 100))}$${sp(4)}`,
  `$\\bullet$ $${texNombrec(1 + a / 100)}\\times ${texNombrec(1 - b / 100)}=${texNombrec((1 + a / 100) * (1 - b / 100))}$${sp(4)}`,
  `$\\bullet$ $${texNombrec(a / 100)}\\times ${texNombrec(b / 100)}=${texNombrec((a / 100) * (b / 100))}$${sp(4)}`]
        listeCalculs = shuffle(listeCalculs)
        this.question = `  ${listeCalculs[0]}  ${listeCalculs[1]} <br>
   ${listeCalculs[2]}${listeCalculs[3]}<br>
  En utilisant l'un des résultats précédents, déterminer le taux global d'évolution d'un article qui augmente de
  $${a}\\%$  dans un premier temps, puis qui augmente de $${b}\\%$ dans un second temps. `
        this.correction = `Augmenter de $${a}\\%$ revient à multiplier par $${texNombrec(1 + a / 100)}$ et augmenter de $${b}\\%$ revient à multiplier par $${texNombrec(1 + b / 100)}$.<br>
  Globalement cela revient donc à multiplier par $${texNombrec(1 + a / 100)}\\times ${texNombrec(1 + b / 100)}=${texNombrec(coeffG)}$.<br>
  Multiplier par $${texNombrec(coeffG)}$ revient à multiplier par 
           $1+${texNombrec(coeffG - 1)}$. <br>
          Le taux d'évolution global est donc : $+${texNombrec((coeffG - 1) * 100)}\\%$.
  `
        this.reponse = calcul((coeffG - 1) * 100)
        break
      case 'c':// diminue puis diminue
        a = calcul(randint(1, 9) * 10)
        b = calcul(randint(1, 9) * 10)
        coeffG = (1 - a / 100) * (1 - b / 100)
        listeCalculs = [`$\\bullet$ $${texNombrec(1 - a / 100)}\\times ${texNombrec(1 - b / 100)}=${texNombrec((1 - a / 100) * (1 - b / 100))}$${sp(4)}`,
  `$\\bullet$ $${texNombrec(1 + a / 100)}\\times ${texNombrec(1 + b / 100)}=${texNombrec((1 + a / 100) * (1 + b / 100))}$${sp(4)}`,
  `$\\bullet$ $${texNombrec(1 + a / 100)}\\times ${texNombrec(1 - b / 100)}=${texNombrec((1 + a / 100) * (1 - b / 100))}$${sp(4)}`,
  `$\\bullet$ $${texNombrec(a / 100)}\\times ${texNombrec(b / 100)}=${texNombrec((a / 100) * (b / 100))}$${sp(4)}`]
        listeCalculs = shuffle(listeCalculs)
        this.question = `  ${listeCalculs[0]}  ${listeCalculs[1]} <br>
   ${listeCalculs[2]}${listeCalculs[3]}<br>
  En utilisant l'un des résultats précédents, déterminer le taux global d'évolution d'un article qui diminue de
  $${a}\\%$  dans un premier temps, puis qui diminue de $${b}\\%$ dans un second temps. `
        this.correction = `Diminuer de $${a}\\%$ revient à multiplier par $${texNombrec(1 - a / 100)}$ et diminuer de $${b}\\%$ revient à multiplier par $${texNombrec(1 - b / 100)}$.<br>
  Globalement cela revient donc à multiplier par $${texNombrec(1 - a / 100)}\\times ${texNombrec(1 - b / 100)}=${texNombrec(coeffG)}$.<br>
  Multiplier par $${texNombrec(coeffG)}$ revient à multiplier par 
           $1-${texNombrec(1 - coeffG)}$. <br>
          Le taux d'évolution global est donc : $${texNombrec((coeffG - 1) * 100)}\\%$.
  `
        this.reponse = calcul((coeffG - 1) * 100)
        break
      case 'd':// diminue puis augmente
        a = calcul(randint(1, 9) * 10)
        b = calcul(randint(1, 9) * 10)
        coeffG = (1 - a / 100) * (1 + b / 100)
        listeCalculs = [`$\\bullet$ $${texNombrec(1 - a / 100)}\\times ${texNombrec(1 + b / 100)}=${texNombrec((1 - a / 100) * (1 + b / 100))}$${sp(4)}`,
  `$\\bullet$ $${texNombrec(1 + a / 100)}\\times ${texNombrec(1 - b / 100)}=${texNombrec((1 + a / 100) * (1 - b / 100))}$${sp(4)}`,
  `$\\bullet$ $${texNombrec(1 + a / 100)}\\times ${texNombrec(1 + b / 100)}=${texNombrec((1 + a / 100) * (1 + b / 100))}$${sp(4)}`,
  `$\\bullet$ $${texNombrec(a / 100)}\\times ${texNombrec(b / 100)}=${texNombrec((a / 100) * (b / 100))}$${sp(4)}`]
        listeCalculs = shuffle(listeCalculs)
        this.question = `  ${listeCalculs[0]}  ${listeCalculs[1]} <br>
   ${listeCalculs[2]}${listeCalculs[3]}<br>
  En utilisant l'un des résultats précédents, déterminer le taux global d'évolution d'un article qui diminue de
  $${a}\\%$  dans un premier temps, puis qui augmente de $${b}\\%$ dans un second temps. `
        this.correction = `Diminuer de $${a}\\%$ revient à multiplier par $${texNombrec(1 - a / 100)}$ et augmenter de $${b}\\%$ revient à multiplier par $${texNombrec(1 + b / 100)}$.<br>
  Globalement cela revient donc à multiplier par $${texNombrec(1 - a / 100)}\\times ${texNombrec(1 + b / 100)}=${texNombrec(coeffG)}$.<br>
  Multiplier par $${texNombrec(coeffG)}$ revient à multiplier par `
        if (coeffG > 1) {
          this.correction += ` $1+${texNombrec(coeffG - 1)}$, ce qui revient à augmenter de $${texNombrec((coeffG - 1) * 100)}\\%$. <br>
            Le taux d'évolution global est donc : $+${texNombrec((coeffG - 1) * 100)}\\%$
  `
        } else {
          this.correction += ` $1-${texNombrec(1 - coeffG)}$. <br>
          Le taux d'évolution global est donc : $${texNombrec((coeffG - 1) * 100)}\\%$.
  `
        }
        this.reponse = calcul((coeffG - 1) * 100)
        break
    }
  }
}
