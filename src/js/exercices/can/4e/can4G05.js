import { choice } from '../../../modules/outils/arrays.js'
import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { extraireRacineCarree, texRacineCarree } from '../../../modules/outils/factorisation.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer la diagonale d’un carré'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can4G05
 * Date de publication sptembre 2021
*/
export const uuid = '66672'
export const ref = 'can4G05'
export default function DiagonaleCarre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, c2, reductible, reduction, entiere
    a = randint(1, 10)//
    switch (choice(['a', 'b'])) {
      case 'a':
        a = randint(1, 10)//
        c2 = 2 * a ** 2
        reduction = extraireRacineCarree(c2)
        reductible = reduction[0] !== 1
        this.question = `Calculer la valeur exacte de la longueur de la diagonale d'un carré de côté $${a}$.`

        this.correction = ` En utilisant le théorème de Pythagore dans un carré de côté $${a}$ et de diagonale $d$, on a :<br>
    $\\begin{aligned}\n
    ${a}^2+${a}^2&=d^2\\\\\n
    d^2&=2\\times ${a}^2\\\\\n
    d&=\\sqrt{2\\times ${a}^2}\\\\\n
    d&=\\sqrt{${c2}}
    ${reductible ? '\\\\\nd&=' + texRacineCarree(c2) : ''}
       \n\\end{aligned}$
   `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
   On calcule le double du carré du côté du carré, 
   soit $2\\times ${a}^2=2\\times ${a ** 2}=${c2}$, puis on en prend la racine carrée.    `)
        this.reponse = [`\\sqrt{${c2}}`, texRacineCarree(c2)]
        break
      case 'b':
        a = randint(2, 48, [4, 9, 16, 25, 36])//
        c2 = 2 * a
        reduction = extraireRacineCarree(c2)
        reductible = reduction[0] !== 1
        entiere = reduction[1] === 1
        this.question = `Calculer la valeur exacte de la longueur de la diagonale d'un carré de côté $\\sqrt{${a}}$.`

        if (entiere) {
          this.correction = ` En utilisant le théorème de Pythagore dans un carré de côté $c=\\sqrt{${a}}$ 
       et de diagonale $d$, on a :<br>

       $\\begin{aligned}
       c^2+c^2&=d^2\\\\
       \\sqrt{${a}}^2+\\sqrt{${a}}^2&=d^2\\\\
       d^2&=${a}+${a}\\\\
       d^2&=${c2}\\\\
       d&=\\sqrt{${c2}}\\\\
       d&=${texRacineCarree(c2)}
       \\end{aligned}$
      
      `
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
       On calcule le double du carré du côté du carré, soit 
       $2\\times (\\sqrt{${a}})^2=2\\times ${a}=${c2}$, puis on en prend la racine carrée, soit $${texRacineCarree(c2)}$.    `)
        } else {
          this.correction = ` En utilisant le théorème de Pythagore dans un carré de côté $c=\\sqrt{${a}}$ 
       et de diagonale $d$, on a :<br>

       $\\begin{aligned}
       c^2+c^2&=d^2\\\\
       \\sqrt{${a}}^2+\\sqrt{${a}}^2&=d^2\\\\
       d^2&=${a}+${a}\\\\
       d^2&=${c2}\\\\
       d&=\\sqrt{${c2}}
       ${reductible ? '\\\\\nd&=' + texRacineCarree(c2) : ''}
       \n\\end{aligned}$
            `
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
       On calcule le double du carré du côté du carré, 
       soit $2\\times (\\sqrt{${a}})^2=2\\times ${a}=${c2}$, puis on en prend la racine carrée.    `)
        }

        this.reponse = [`\\sqrt{${c2}}`, `${Math.sqrt(c2)}`, texRacineCarree(c2)]
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
