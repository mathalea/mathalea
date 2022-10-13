import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { ecritureParentheseSiNegatif } from '../../../modules/outils/ecritures.js'
import { listeQuestionsToContenuSansNumero } from '../../../modules/outils/miseEnForme.js'
import { reduireAxPlusB } from '../../../modules/outils/reductions.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { sp, texteCentre } from '../../../modules/outils/contextSensitif.js'
import { texNombrec } from '../../../modules/outils/texNombres.js'
export const titre = 'Calculer les coordonnées d’un point sur une droite'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export const uuid = 'dfe60'
export const ref = 'can2L02'
export default function CoordonneesPointDroite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const a = randint(-10, 10, 0)
    const b = randint(-10, 10, 0)
    const c = randint(-10, 10, 0)

    this.listeQuestions = [` Les coordonnées du point de la droite 
    d'équation $y=${reduireAxPlusB(a, b)}$ dont l'abscisse est $${c}$  sont : 
    ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
 ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
    if (a === 1) {
      this.listeCorrections = [`Puisque $${c}$ est l'abscisse de ce point, son ordonnée est donnée par :<br>
        $y= ${c}+${ecritureParentheseSiNegatif(b)}=${a * c + b}$.<br>
  Les coordonnées du  point sont donc : $(${c};${texNombrec(a * c + b)})$.`]
    } else {
      this.listeCorrections = [`Puisque $${c}$ est l'abscisse de ce point, son ordonnée est donnée par :<br>

  $y=${a}\\times ${ecritureParentheseSiNegatif(c)}+${ecritureParentheseSiNegatif(b)}=${a * c} + ${ecritureParentheseSiNegatif(b)}=${a * c + b}$.<br>
  Les coordonnées du  point sont donc : $(${c};${texNombrec(a * c + b)})$.`]
    }

    setReponse(this, 0, c)
    setReponse(this, 1, a * c + b)
    listeQuestionsToContenuSansNumero(this)
  }
}
