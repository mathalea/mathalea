import Exercice from '../../Exercice.js'
import { randint, texNombrec, choice, calcul } from '../../../modules/outils.js'
export const titre = 'Prendre t % d’une quantité'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '18/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = '6946a'
export const ref = 'can5P05'
export default function PoucentageP2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, u
    switch (choice(['a', 'a', 'b', 'c', 'c'])) {
      case 'a':
        a = randint(10, 99)

        this.question = `Prendre $${a}~\\%$ d'une quantité revient à la multiplier par `
        if (!this.interactif) {
          this.question += '.... '
        }
        this.correction = `$${a}~\\%=\\dfrac{${a}}{100}=${texNombrec(a / 100)}$ <br>
    Donc prendre $${a}~\\%$ d'une quantité revient à la multiplier par $${texNombrec(a / 100)}$.`
        this.reponse = a / 100
        break
      case 'b':
        a = randint(1, 9)

        this.question = `Prendre $${a}~\\%$ d'une quantité revient à la multiplier par `
        if (!this.interactif) {
          this.question += '.... '
        }
        this.correction = `$${a}~\\%=\\dfrac{${a}}{100}=${texNombrec(a / 100)}$ <br>
       Donc prendre $${a}~\\%$ d'une quantité revient à la multiplier par $${texNombrec(a / 100)}$.`
        this.reponse = a / 100
        break
      case 'c':
        u = randint(1, 99)
        a = calcul(randint(1, 9) / 10)

        this.question = `Prendre $${texNombrec(u + a)}~\\%$ d'une quantité revient à la multiplier par `
        if (!this.interactif) {
          this.question += '.... '
        }
        this.correction = `$${texNombrec(u + a)}~\\%=\\dfrac{${texNombrec(u + a)}}{100}=${texNombrec((u + a) / 100)}$ <br>
       Donc prendre $${texNombrec(u + a)}~\\%$ d'une quantité revient à la multiplier par $${texNombrec((u + a) / 100)}$.`
        this.reponse = (u + a) / 100
        break
    }
    this.canEnonce = 'Compléter.'
    this.canReponseACompleter = this.question
  }
}
