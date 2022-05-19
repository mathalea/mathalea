import Exercice from '../../Exercice.js'
import { randint, sp, listeQuestionsToContenuSansNumero, texFractionReduite, rienSi1, texteCentre } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Calculer les coordonnées du point dintersection entre laxe des ordonnées/droite'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function CoordonneesPointIntersectionAxeOrdonneesDroite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(-10, 10, 0)
    const b = randint(1, 10)
    const n = randint(-5, 5, 0)
    const c = n * b
    if (c > 0) {
      this.listeQuestions = [` Les coordonnées du point d'intersection entre la droite d'équation $${rienSi1(a)}x+${rienSi1(b)}y+${c}=0$ et l'axe des ordonnées sont  : 
      ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
      ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
      this.listeCorrections = [`Puisque le point d'intersection se situe sur l'axe des ordonnées, son abscisse est nulle ($x=0$).
      <br>
    Son ordonnée est donc la solution de l'équation :  $${rienSi1(b)}y+${c}=0$, c'est-à-dire $y=${texFractionReduite(-c, b)}$.
    <br>Les coordonnées de ce   point sont donc : $(${texFractionReduite(-c, b)};0)$.`]
    } else {
      this.listeQuestions = [` Les coordonnées du point d'intersection entre la droite d'équation $${rienSi1(a)}x+${rienSi1(b)}y${c}=0$ et l'axe des ordonnées sont  : ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
      ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
      this.listeCorrections = [`Puisque le point d'intersection se situe sur l'axe des ordonnées, son abscisse est nulle ($x=0$).
      <br>
    Son ordonnée est donc la solution de l'équation : $${rienSi1(b)}y${c}=0$, c'est-à-dire $y=${texFractionReduite(-c, b)}$.
    <br>Les coordonnées de ce   point sont donc : $(0;${texFractionReduite(-c, b)})$.`]
    }

    setReponse(this, 0, 0)
    setReponse(this, 1, -c / b)
    listeQuestionsToContenuSansNumero(this)
  }
}
