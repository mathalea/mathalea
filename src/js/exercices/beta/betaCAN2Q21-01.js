import Exercice from '../Exercice.js'
import {
  randint, calcul, choice, ecritureParentheseSiNegatif, texNombrec,
  ecritureAlgebrique, rienSi1, texteEnCouleur
} from '../../modules/outils.js'
export const titre = 'Calcul d’une image second degré'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function CalculImageSecondDegre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let x, a, b, c, expression
    switch (choice(['a'])) { //,
      case 'a':
        x = randint(1, 4)
        a = randint(1, 2)
        b = randint(1, 2)
        c = randint(2, 5)

        expression = `${rienSi1(a)}x^2+${rienSi1(b)}x+${c}`
        this.question = `On considère la fonction $f$ définie par $f(x)= ${expression}$. <br>
    Calculer $f(${x})$.`

        if (a === 1 & b !== 1) {
          this.correction = `$f(${x})=
          ${x}^2+${b}\\times ${ecritureParentheseSiNegatif(x)}+${c}=
          ${x * x}${ecritureAlgebrique(b * x)}+${c}=
          ${a * x * x}${ecritureAlgebrique(b * x)}+${c}=
          ${a * x * x + b * x + c}$<br>`
          this.correction += texteEnCouleur(` Mentalement : <br>
          On commence par calculer le carré de $${x}$, soit $${x}^2=${texNombrec(x ** 2)}$. <br>
   On calcule $${b}\\times ${x}$ que l'on ajoute à $${texNombrec(a * x ** 2)}$, soit $${a * x ** 2}+${b * x}=${a * x ** 2 + b * x}$.<br>
  Pour finir, on ajoute   $${c}$, ce qui donne $${texNombrec(a * x ** 2 + b * x)}+${c}$, soit $${texNombrec(a * x ** 2 + b * x + c)}$.<br>
    `)
        }
        if (a !== 1 & b !== 1) {
          this.correction = `$f(${x})=
          ${a}\\times${x}^2+${b}\\times ${x}+${c}=
          ${a}\\times ${x * x}${ecritureAlgebrique(b * x)}+${c}=
          ${a * x * x}${ecritureAlgebrique(b * x)}+${c}=
          ${a * x * x + b * x + c}$<br>`
          this.correction += texteEnCouleur(` Mentalement : <br>
              On commence par calculer le carré de $${x}$, soit $${x}^2=${texNombrec(x ** 2)}$. <br>
     On multiplie ensuite cette valeur par le coefficient devant $x^2$, soit $${a}\\times ${texNombrec(x ** 2)}=${texNombrec(a * x ** 2)}$.<br>
      On calcule $${b}\\times ${x}$ que l'on ajoute à $${texNombrec(a * x ** 2)}$, soit $${a * x ** 2}+${b * x}=${a * x ** 2 + b * x}$.<br>
      Pour finir, on ajoute   $${c}$, ce qui donne $${texNombrec(a * x ** 2 + b * x)}+${c}$, soit $${texNombrec(a * x ** 2 + b * x + c)}$.<br>
        `)
        }
        if (a === 1 & b === 1) {
          this.correction = `$f(${x})=
          ${x}^2+ ${x}+${c}=
          ${x * x}+${x}+${c}=
          ${x * x}${ecritureAlgebrique(b * x)}+${c}=
          ${x * x + b * x + c}$<br>`
          this.correction += texteEnCouleur(` Mentalement : <br>
          On commence par calculer le carré de $${x}$, soit $${x}^2=${texNombrec(x ** 2)}$. <br>
   On ajoute  $${x}$ soit $${a * x ** 2}+${x}=${x ** 2 + b * x}$.<br>
  Pour finir, on ajoute   $${c}$, ce qui donne $${texNombrec(a * x ** 2 + b * x)}+${c}$, soit $${texNombrec(a * x ** 2 + b * x + c)}$.<br>
    `)
        }
        if (a !== 1 & b === 1) {
          this.correction = `$f(${x})=
          ${a}\\times${x}^2+${b}\\times ${ecritureParentheseSiNegatif(x)}+${c}=
          ${a}\\times ${x * x}${ecritureAlgebrique(b * x)}=
          ${a * x * x}${ecritureAlgebrique(b * x)}+${c}=
          ${a * x * x + b * x + c}$<br>`
          this.correction += texteEnCouleur(` Mentalement : <br>
          On commence par calculer le carré de $${x}$, soit $${x}^2=${texNombrec(x ** 2)}$. <br>
 On multiplie ensuite cette valeur par le coefficient devant $x^2$, soit $${a}\\times ${texNombrec(x ** 2)}=${texNombrec(a * x ** 2)}$.<br>
 On ajoute  $${x}$ soit $${a * x ** 2}+${x}=${a * x ** 2 + b * x}$.<br>
  Pour finir, on ajoute   $${c}$, ce qui donne $${texNombrec(a * x ** 2 + b * x)}+${c}$, soit $${texNombrec(a * x ** 2 + b * x + c)}$.<br>
    `)
        }
        this.reponse = calcul(a * x * x + b * x + c)
        break
    }
  }
}
