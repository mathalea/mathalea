import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { ecritureParentheseSiNegatif } from '../../../modules/outils/ecritures.js'
import { listeQuestionsToContenuSansNumero } from '../../../modules/outils/miseEnForme.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { sp, texteCentre } from '../../../modules/outils/contextSensitif.js'
export const titre = 'Déterminer les coordonnées d’un vecteur (bis)'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '30/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = 'eaebb'
export const ref = 'can2G08'
export default function CoordonneesVecteur2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(-6, 6, [0, 1, -1])
    const b = randint(2, 10)
    if (choice([true, false])) {
      this.listeQuestions = [` Dans un repère orthonormé $(O;\\vec i,\\vec j)$, on a :
   <br>
   ${sp(20)}$\\vec{u}=${a}(\\vec{i}+${b}\\vec{j})$.
   <br>
   Les coordonnées du vecteur $\\vec{u}$ dans le repère $(O;\\vec i,\\vec j)$ sont :
   ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
   ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
      this.listeCorrections = [`$\\vec{u}=${a}(\\vec{i}+${b}\\vec{j})=${a}\\vec{i}+${ecritureParentheseSiNegatif(a * b)}\\vec{j}$.<br>
      Les coordonnées du vecteur $\\vec{u}$ sont donc $(${a}${sp(1)} ;${sp(1)} ${a * b})$.`]
      setReponse(this, 0, a)
      setReponse(this, 1, a * b)
    } else {
      this.listeQuestions = [` Dans un repère orthonormé $(O;\\vec i,\\vec j)$, on a :
      <br>
      ${sp(20)}$\\vec{u}=${a}(\\vec{j}+${b}\\vec{i})$.
      <br>
      Les coordonnées du vecteur $\\vec{u}$ dans le repère $(O;\\vec i,\\vec j)$ sont :
      ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
      ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
      this.listeCorrections = [`$\\vec{u}=${a}(\\vec{j}+${b}\\vec{i})=${a}\\vec{j}+${ecritureParentheseSiNegatif(a * b)}\\vec{i}$.<br>
         Les coordonnées du vecteur $\\vec{u}$ sont donc $(${a * b}${sp(1)} ;${sp(1)} ${a})$.`]
      setReponse(this, 0, a * b)
      setReponse(this, 1, a)
    }

    listeQuestionsToContenuSansNumero(this)
  }
}
