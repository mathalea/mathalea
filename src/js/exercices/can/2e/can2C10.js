import Exercice from '../../Exercice.js'
import { randint, choice, texNombre, calcul } from '../../../modules/outils.js'
export const titre = 'Passer du taux d’évolution au coefficient multiplicateur'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '09/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function TauxCoeff () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let taux

    switch (choice(['a', 'b', 'b'])) { //
      case 'a':
        taux = choice([randint(1, 9) * 10, randint(1, 9), randint(1, 9) * 10 + randint(1, 9)])
        this.question = `Augmenter une valeur de $${taux}~\\%$ revient à la multiplier par `
        if (!this.interactif) {
          this.question += '.... '
        }
        this.correction = `Augmenter de $${taux}~\\%$ revient à multiplier par $1+\\dfrac{${taux}}{100}$.<br>
        Ainsi, le coefficient multiplicateur associé à une augmentation de $${taux}~\\%$ est $1+${texNombre(taux / 100)}$, soit $${texNombre(1 + taux / 100)}$.<br><br>
        Autre formulation : <br>Augmenter de $${taux}~\\%$ une valeur revient à en prendre $${texNombre(100 + taux)}~\\%$ car $100~\\% + ${taux} ~\\%=${texNombre(100 + taux)}~\\%$.<br>
        Ainsi, le coefficient multiplicateur associé à une augmentation de  $${texNombre(taux)}~\\%$ est $\\dfrac{${texNombre(100 + taux)}}{100}$ soit $${texNombre(1 + taux / 100)}$.`
        this.reponse = calcul(1 + taux / 100)
        break
      case 'b':
        taux = choice([randint(1, 9) * 10, randint(1, 9), randint(1, 9) * 10 + randint(1, 9)])
        this.question = `Diminuer une valeur de $${taux}~\\%$ revient à la multiplier par `
        if (!this.interactif) {
          this.question += '.... '
        }
        this.correction = `Diminuer de $${taux}~\\%$ revient à multiplier par $1-\\dfrac{${taux}}{100}$.<br>
        Ainsi, le coefficient multiplicateur associé à une réduction de $${taux}~\\%$ est est $1-${texNombre(taux / 100)}$, soit $${texNombre(1 - taux / 100)}$.<br><br>
        Autre formulation : <br>Diminuer de $${taux}~\\%$ une valeur revient à en prendre $${texNombre(100 - taux)}~\\%$ car $100~\\% - ${texNombre(taux)} ~\\%=${texNombre(100 - taux)}~\\%$.<br>
        Ainsi, le coefficient multiplicateur associé à une réduction de  $${taux}~\\%$ est $\\dfrac{${texNombre(100 - taux)}}{100}$ soit $${texNombre(1 - taux / 100)}$.`
        this.reponse = calcul(1 - taux / 100)
        break
    }
  }
}
