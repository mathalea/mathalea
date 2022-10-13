
import { choice } from '../../../modules/outils/arrays.js'
import { randint } from '../../../modules/outils/entiers.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer un antécédent par une fonction linéaire'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '13/10/2022'
/*!
/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3C04
*/
export const uuid = '4b600'
export const ref = 'can3F04'
export default function CalculAntecedentLineaire () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let nomF, x, n, m
    switch (choice([1, 2])) {
      case 1:
        x = randint(-10, 10, [-1, 0, 1])
        m = randint(-9, 9, [-1, 0, 1])
        nomF = choice(['f', 'g', 'h', 'u', 'v', 'w', 'p', 'm', 't', 'k'])
        this.question = `Soit $${nomF}$ la fonction définie par : $${nomF}(x)=${m}x$.<br>
        
        Quel est l'antécédent de  $${m * x}$ par la fonction $${nomF}$ ?`
        this.correction = `$${nomF}(x)=${m}x$. <br>
        
        L'antécédent de $${m * x}$ est le nombre $x$ qui a pour image $${m * x}$. On cherche donc $x$ tel que : <br>
        
         $${m}x=${m * x}$<br> soit $x=\\dfrac{${m * x}}{${m}}=${x}$.`
        this.reponse = x
        break
      case 2:
        x = randint(-10, 10, [-1, 0, 1])
        n = choice([2, 3, 5])
        m = randint(2, 6, [n, n * 2, n * 3])
        nomF = choice(['f', 'g', 'h', 'u', 'v', 'w', 'p', 'm', 't', 'k'])
        this.question = `Soit $${nomF}$ la fonction définie par : $${nomF}(x)=\\dfrac{${m}}{${n}}x$.<br>
        
        Quel est l'antécédent de  $${m * x}$ par la fonction $${nomF}$ ?`
        this.correction = `$${nomF}(x)=\\dfrac{${m}}{${n}}x$. <br>
        
        L'antécédent de $${m * x}$ est le nombre $x$ qui a pour image $${m * x}$. On cherche donc $x$ tel que : <br>
        
         $\\dfrac{${m}}{${n}}x=${m * x}$<br>  soit $x=${m * x}\\times \\dfrac{${n}}{${m}}=${x * n}$.`
        this.reponse = n * x
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
