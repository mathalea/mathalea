import Exercice from '../Exercice.js'
import { randint, calcul, choice } from '../../modules/outils.js'
export const titre = 'Nombre de nombres entiers entre deux valeurs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Référence
 * Date de publication
*/
export default function NombreDeNombresEntiersEntreDeuxValeurs2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b
    switch (choice(['a', 'b', 'c', 'd'])) {
      case 'a':
        a = randint(1, 10)
        b = randint(15, 30)
        this.question = `Le nombre d'entiers strictement compris entre $${a}$ et $${b}$ est :`
        this.correction = `Il y a $${b}-${a}-1$ soit $${b - a - 1}$ entiers strictement compris entre $${a}$ et $${b}$ `
        this.reponse = calcul(b - a - 1)
        break
      case 'b':
        a = randint(3, 5)
        b = randint(8, 18)
        this.question = `Combien y a-t-il d'entiers $n$ tels que : $${a}\\leqslant n \\leqslant ${b}$ ?`
        this.correction = `Il y en a $${b}-${a}+1$, soit $${b - a + 1}$.`
        this.reponse = calcul(b - a + 1)
        break

      case 'c':
        a = randint(3, 5)
        b = randint(8, 18)
        this.question = `Combien y a-t-il d'entiers $n$ tels que : $${a}< n \\leqslant ${b}$ ?`
        this.correction = `Il y en a $${b}-${a}$, soit $${b - a}$.`
        this.reponse = calcul(b - a)
        break
      case 'd':
        a = randint(3, 5)
        b = randint(8, 18)
        this.question = `Combien y a-t-il d'entiers $n$ tels que : $${a}\\leqslant n < ${b}$ ?`
        this.correction = `Il y en a $${b}-${a}$, soit $${b - a}$.`
        this.reponse = calcul(b - a)
        break
    }
  }
}
