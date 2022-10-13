import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { calcul } from '../../../modules/outils/texNombres.js'
export const titre = 'Trouver le nombre d’entiers entre deux valeurs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Créé pendant l'été 2021
 * Référence can2C01
 * Date de publication
*/
export const uuid = '1f399'
export const ref = 'can2C01'
export default function NombreDeNombresEntiersEntreDeuxValeurs2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b
    switch (choice(['a', 'b', 'c'])) {
      case 'a':
        a = randint(3, 5)
        b = randint(8, 18)
        this.question = `Combien y a-t-il d'entiers $n$ tels que : <br>$${a}\\leqslant n \\leqslant ${b}$ ?`
        this.correction = `Il y en a $${b}-${a}+1$, soit $${b - a + 1}$.`
        this.reponse = calcul(b - a + 1)
        break

      case 'b':
        a = randint(3, 5)
        b = randint(8, 18)
        this.question = `Combien y a-t-il d'entiers $n$ tels que :<br> $${a}< n \\leqslant ${b}$ ?`
        this.correction = `Il y en a $${b}-${a}$, soit $${b - a}$.`
        this.reponse = calcul(b - a)
        break
      case 'c':
        a = randint(3, 5)
        b = randint(8, 18)
        this.question = `Combien y a-t-il d'entiers $n$ tels que : <br>$${a}\\leqslant n < ${b}$ ?`
        this.correction = `Il y en a $${b}-${a}$, soit $${b - a}$.`
        this.reponse = calcul(b - a)
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
