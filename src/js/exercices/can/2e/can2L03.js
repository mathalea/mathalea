import Exercice from '../../Exercice.js'
import { randint, sp, listeQuestionsToContenuSansNumero, reduireAxPlusB, texFractionReduite, texteCentre } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
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
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const a = randint(-10, 10, 0)
    const n = randint(-5, 5, 0)
    const b = n * a
    this.listeQuestions = [` Les coordonnées du point d'intersection 
    entre la droite d'équation $y=${reduireAxPlusB(a, b)}$ et l'axe des abscisses sont : ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
    ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
    this.listeCorrections = [`L'ordonnée de ce point est $0$ puisque le point d'intersection se situe sur l'axe des abscisses.<br>
      Son abscisse est donc donnée par la solution de l'équation  $${reduireAxPlusB(a, b)}=0$, c'est-à-dire $x=${texFractionReduite(-b, a)}$.
    <br>Les coordonnées de ce   point sont donc : $(${texFractionReduite(-b, a)};0)$.`]

    setReponse(this, 0, -b / a)
    setReponse(this, 1, 0)
    listeQuestionsToContenuSansNumero(this)
  }
}
