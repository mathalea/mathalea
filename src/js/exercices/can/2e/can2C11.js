import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { calcul, texNombrec } from '../../../modules/outils/texNombres.js'
export const titre = 'Passer du coefficient multiplicateur au taux d’évolution'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '09/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = '031f0'
export const ref = 'can2C11'
export default function CoeffTaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let taux, coeff

    switch (choice(['a', 'b', 'b'])) { //, 'b', 'b'
      case 'a':
        taux = choice([randint(1, 9) * 10, randint(1, 9), randint(1, 9) * 10 + randint(1, 9)])
        coeff = calcul(1 + taux / 100)
        this.question = `Le taux d'évolution associé à un coefficient multiplicateur de $${texNombrec(coeff)}$ est `
        if (!this.interactif) {
          this.question += '.... '
        }
        this.optionsChampTexte = { texteApres: ' %' }
        this.correction = `Multiplier par $${texNombrec(coeff)}$ revient à multiplier par $1+\\dfrac{${texNombrec(taux)}}{100}$. <br>
        Cela revient donc à augmenter de $${taux} \\%$. <br>
        Ainsi, le taux d'évolution associé au coefficient multiplicateur $${texNombrec(coeff)}$ est $+${texNombrec((coeff - 1) * 100)}\\%$.<br><br>
        Autre formulation :<br>
        Multiplier une valeur par $${texNombrec(coeff)}$ revient à en prendre  $${texNombrec(coeff * 100)} \\%$.<br>
        Cela signifie  qu'on l'augmente de $${texNombrec(coeff * 100 - 100)} \\%$ car $100  \\% +${texNombrec(coeff * 100 - 100)} \\%=${texNombrec(coeff * 100)} \\%$.<br>
        Le taux d'évolution est donc $+${taux} \\%$. `
        this.reponse = taux
        break
      case 'b':
        taux = choice([randint(1, 9) * 10, randint(1, 9), randint(1, 9) * 10 + randint(1, 9)])
        coeff = calcul(1 - taux / 100)
        this.question = `Le taux d'évolution associé à un coefficient multiplicateur de $${texNombrec(coeff)}$ est `
        if (!this.interactif) {
          this.question += '.... '
        }
        this.optionsChampTexte = { texteApres: ' %' }
        this.correction = `Multiplier par $${texNombrec(coeff)}$ revient à multiplier par $1-\\dfrac{${texNombrec(taux)}}{100}$. <br>
        Cela revient donc à diminuer de  $${taux} \\%$. <br>
        Ainsi, le taux d'évolution associé au coefficient multiplicateur $${texNombrec(coeff)}$ est $${texNombrec((coeff - 1) * 100)}\\%$<br><br>
        Autre formulation :<br>
        Multiplier une valeur par $${texNombrec(coeff)}$ revient à en prendre  $${texNombrec(coeff * 100)} \\%$.<br>
        Cela signifie  qu'on la diminue de $${texNombrec(100 - coeff * 100)} \\%$ car $100  \\%-${texNombrec(100 - coeff * 100)} \\% =${texNombrec(coeff * 100)} \\%$.<br>
        Le taux d'évolution est donc $-${taux} \\%$.`
        this.reponse = -taux
        break
    }
    this.canEnonce = 'Compléter.'
    this.canReponseACompleter = `Le taux d'évolution associé à un coefficient multiplicateur de $${texNombrec(coeff)}$ est $\\ldots$ $\\%$ `
  }
}
