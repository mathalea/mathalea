import Exercice from '../../Exercice.js'
import { randint, texFractionReduite, rienSi1 } from '../../../modules/outils.js'
export const titre = 'Calculer les coordonnées du point d’intersection entre l’axe des ordonnées et une droite'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export const uuid = '898a7'
export const ref = 'can2L04'
export default function CoordonneesPointIntersectionAxeOrdonneesDroite () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const a = randint(-10, 10, 0)
    const b = randint(1, 10)
    const n = randint(-5, 5, 0)
    const c = n * b

    this.formatChampTexte = 'largeur12 inline'

    this.formatInteractif = 'texte'
    this.reponse = `0;${-c / b}`
    if (c > 0) {
      this.question = `Déterminer les coordonnées du point d'intersection entre la droite d'équation $${rienSi1(a)}x+${rienSi1(b)}y+${c}=0$ et l'axe des ordonnées.<br>
       `
      this.correction = `Puisque le point d'intersection se situe sur l'axe des ordonnées, son abscisse est nulle ($x=0$).
    <br>
  Son ordonnée est donc la solution de l'équation :  $${rienSi1(b)}y+${c}=0$, c'est-à-dire $y=${texFractionReduite(-c, b)}$.
  <br>Les coordonnées de ce   point sont donc : $(0; ${texFractionReduite(-c, b)})$.`

      this.canEnonce = `Déterminer les coordonnées du point d'intersection entre la droite d'équation $${rienSi1(a)}x+${rienSi1(b)}y+${c}=0$ et l'axe des ordonnées.`
      this.canReponseACompleter = ''
    } else {
      this.question = `Déterminer les coordonnées du point d'intersection entre la droite d'équation $${rienSi1(a)}x+${rienSi1(b)}y${c}=0$ et l'axe des ordonnées.<br>
  `
      this.correction = `Puisque le point d'intersection se situe sur l'axe des ordonnées, son abscisse est nulle ($x=0$).
<br>
Son ordonnée est donc la solution de l'équation : $${rienSi1(b)}y${c}=0$, c'est-à-dire $y=${texFractionReduite(-c, b)}$.
<br>Les coordonnées de ce   point sont donc : $(0;${texFractionReduite(-c, b)})$.`

      this.canEnonce = `Déterminer les coordonnées du point d'intersection entre la droite d'équation $${rienSi1(a)}x+${rienSi1(b)}y${c}=0$ et l'axe des ordonnées.`
      this.canReponseACompleter = ''
    }
    if (this.interactif) {
      this.optionsChampTexte = { texteApres: '$)$' }
      this.question += '<br>$($'
    }
  }
}
