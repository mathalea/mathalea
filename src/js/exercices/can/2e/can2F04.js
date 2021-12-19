import Exercice from '../../Exercice.js'
import { randint, texFractionReduite, choice, reduireAxPlusB, rienSi1, sp } from '../../../modules/outils.js'
export const titre = 'Trouver les valeurs interdites d’une fonction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '25/10/2021'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2F04
 * Date de publication
*/
export default function ValeurInterdite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, n
    if (choice([true, false])) {
      a = randint(-10, 10, 0)
      n = randint(-5, 5, 0)
      b = randint(-10, 10, 0)
      c = n * b
      this.question = `Donner la valeur interdite de la fonction $f$ définie par ${sp(1)}: ${sp(1)}$f(x)=\\dfrac{${rienSi1(a)}x}{${reduireAxPlusB(b, c)}}$.<br>
    
            `
      this.correction = `La valeur interdite est la solution de l'équation $${reduireAxPlusB(b, c)}=0$.<br>
    La valeur interdite est donc $${texFractionReduite(-c, b)}$.`
      this.reponse = -n
    } else {
      a = randint(-10, 10, 0)

      b = randint(1, 10)
      this.question = `Donner la plus petite valeur interdite de de la fonction $f$ définie par ${sp(1)}: ${sp(1)} $f(x)=\\dfrac{${rienSi1(a)}x}{x^2-${b ** 2}}$.<br>
   
      
      `
      this.correction = `Les valeurs interdites sont les solutions de l'équation $x^2-${b ** 2}=0$.<br>
               Cette équation a deux solutions : $${b}$ et $-${b}$.<br>
               La plus petite valeur interdite est donc : $-${b}$. `
      this.reponse = -b
    }
  }
}
