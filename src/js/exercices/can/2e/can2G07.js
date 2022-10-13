import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { ecritureParentheseSiNegatif } from '../../../modules/outils/ecritures.js'
import { listeQuestionsToContenuSansNumero } from '../../../modules/outils/miseEnForme.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { sp, texteCentre } from '../../../modules/outils/contextSensitif.js'
export const titre = 'Déterminer les coordonnées d’un vecteur'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '30/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = '651a5'
export const ref = 'can2G07'
export default function CoordonneesVecteur1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const xA = randint(-5, 5)
    const yA = randint(-5, 5)
    const ux = randint(-5, 5, 0)
    const uy = randint(-5, 5)
    const xB = xA + ux

    const yB = yA + uy

    this.listeQuestions = [` Dans un repère orthonormé $(O;\\vec i,\\vec j)$, on donne les points suivants :
    ${texteCentre(`$A\\left(${xA}${sp(1)} ; ${sp(1)} ${yA}\\right)$ et $B\\left(${xB}${sp(1)} ; ${sp(1)}${yB}\\right)$`)}
 Les coordonnées du vecteur $\\overrightarrow{AB}$ sont :
 ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
 ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
    this.listeCorrections = [`On sait d'après le cours, que si $A(x_A${sp(1)} ; ${sp(1)}y_A)$ et $B(x_B${sp(1)} ; ${sp(1)} y_B)$ sont deux points dans un repère, alors on a : $\\overrightarrow{AB}(x_B-x_A  ${sp(1)} ; ${sp(1)} y_B-y_A)$<br>
    En appliquant  aux données de l'énoncé, on obtient  : $\\overrightarrow{AB}(${xB}-${ecritureParentheseSiNegatif(xA)} ${sp(1)} ; ${sp(1)} ${yB}-${ecritureParentheseSiNegatif(yA)})$<br>
    Ce qui donne au final : $\\overrightarrow{AB}(${xB - xA} ${sp(1)} ; ${sp(1)} ${yB - yA})$`]
    setReponse(this, 0, ux)
    setReponse(this, 1, uy)
    listeQuestionsToContenuSansNumero(this)
  }
}
