import Exercice from '../../Exercice.js'
import { randint, choice, texteEnCouleur } from '../../../modules/outils.js'
export const titre = 'Calcul de la diagonale d’un carré'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can4G05
 * Date de publication sptembre 2021
*/
export default function DiagonaleCarre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a
    a = randint(1, 10)//
    switch (choice(['a', 'b'])) {
      case 'a':
        a = randint(1, 10)//
        this.question = `La longueur de la diagonale d'un carré de côté $${a}$ est :<br>
    (donner la valeur exacte)`

        this.correction = ` En utilisant le théorème de Pythagore dans un carré de côté $${a}$ et de diagonale $d$, on a :<br>
    $\\begin{aligned}
    ${a}^2+${a}^2&=d^2\\\\
    d^2&=2\\times ${a}^2\\\\
    d&=\\sqrt{2\\times ${a}^2}\\\\
    d&=\\sqrt{${2 * a ** 2}}
       \\end{aligned}$
   `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
   On calcule le double du carré du côté du carré, 
   soit $2\\times ${a}^2=2\\times ${a ** 2}=${2 * a ** 2}$, puis on en prend la racine carrée.    `)
        this.reponse = `\\sqrt{${2 * a ** 2}}`
        break
      case 'b':
        a = randint(2, 48, [4, 9, 16, 25, 36])//
        this.question = `La longueur de la diagonale d'un carré de côté $\\sqrt{${a}}$ est :<br>
        (donner la valeur exacte)`

        if (2 * a === 36 || 2 * a === 16 || 2 * a === 64) {
          this.correction = ` En utilisant le théorème de Pythagore dans un carré de côté $c=\\sqrt{${a}}$ 
       et de diagonale $d$, on a :<br>

       $\\begin{aligned}
       c^2+c^2&=d^2\\\\
       \\sqrt{${a}}^2+\\sqrt{${a}}^2&=d^2\\\\
       d^2&=${a}+${a}\\\\
       d^2&=${2 * a}\\\\
       d&=\\sqrt{${2 * a}}\\\\
       d&=${Math.sqrt(2 * a)}
       \\end{aligned}$
      
      `
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
       On calcule le double du carré du côté du carré, soit 
       $2\\times (\\sqrt{${a}})^2=2\\times ${a}=${2 * a}$, puis on en prend la racine carrée, soit $${Math.sqrt(2 * a)}$.    `)
        } else {
          this.correction = ` En utilisant le théorème de Pythagore dans un carré de côté $c=\\sqrt{${a}}$ 
       et de diagonale $d$, on a :<br>

       $\\begin{aligned}
       c^2+c^2&=d^2\\\\
       \\sqrt{${a}}^2+\\sqrt{${a}}^2&=d^2\\\\
       d^2&=${a}+${a}\\\\
       d^2&=${2 * a}\\\\
       d&=\\sqrt{${2 * a}}
       \\end{aligned}$
            `
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
       On calcule le double du carré du côté du carré, 
       soit $2\\times (\\sqrt{${a}})^2=2\\times ${a}=${2 * a}$, puis on en prend la racine carrée.    `)
        }

        this.reponse = [`\\sqrt{${2 * a}}`, `${Math.sqrt(2 * a)}`]
        break
    }
  }
}
