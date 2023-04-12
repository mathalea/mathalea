import Exercice from '../../Exercice.js'
import { randint, reduireAxPlusB, texFractionReduite } from '../../../modules/outils.js'
export const titre = 'Calculer les coordonnées du point d’intersection entre l’axe des abscisses/droite'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export const uuid = '05ba1'
export const ref = 'can2L03'
export default function CoordonneesPointIntersectionAxeAbscissesDroite () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const a = randint(-10, 10, 0)
    const n = randint(-5, 5, 0)
    const b = n * a

    this.formatChampTexte = 'largeur12 inline'

    this.formatInteractif = 'texte'
    this.reponse = `${-b / a};0`
    this.question = ` Déterminer les coordonnées du point d'intersection 
    entre la droite d'équation $y=${reduireAxPlusB(a, b)}$ et l'axe des abscisses. <br>
       `
    if (this.interactif) {
      this.optionsChampTexte = { texteApres: '$)$' }
      this.question += '<br>$($'
    }

    this.correction = `L'ordonnée de ce point est $0$ puisque le point d'intersection se situe sur l'axe des abscisses.<br>
      Son abscisse est donc donnée par la solution de l'équation  $${reduireAxPlusB(a, b)}=0$, c'est-à-dire $x=${texFractionReduite(-b, a)}$.
    <br>Les coordonnées de ce   point sont donc : $(${texFractionReduite(-b, a)};0)$.`

    this.canEnonce = ` Déterminer les coordonnées du point d'intersection 
    entre la droite d'équation $y=${reduireAxPlusB(a, b)}$ et l'axe des abscisses. `
    this.canReponseACompleter = ''
  }
}
