import Exercice from '../../Exercice.js'
import { randint, listeQuestionsToContenuSansNumero, ecritureParentheseSiNegatif, sp, texteCentre } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Déterminer les coordonnées d\'un point avec une trabslation'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '04/03:2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Stéphane Guyon
 * Référence
*/
export default function TranslationVecteur () {
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
    ${texteCentre(`$A\\left(${xA}${sp(1)} ; ${sp(1)} ${yA}\\right)$ et $\\vec{u}\\left(${ux}${sp(1)} ; ${sp(1)}${uy}\\right)$`)}
 Les coordonnées du point $B$ image du point $A$ par la translation de vecteur $\\vec{u}$ sont :
 ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
 ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
    this.listeCorrections = [`On sait d'après le cours, que si le point $B$ est l'image du point $A$ par la translation de vecteur $\\vec{u}$, alors $\\overrightarrow{AB}=\\vec{u}$ <br>
    En appliquant  aux données de l'énoncé, on obtient  : $\\overrightarrow{AB}(x_B-${ecritureParentheseSiNegatif(xA)} ${sp(1)} ; ${sp(1)} y_B-${ecritureParentheseSiNegatif(yA)})$<br>
    Ce qui donne l'égalité : $\\begin{cases}{x_B-${ecritureParentheseSiNegatif(xA)}${sp(1)} =${ux}&  ${sp(1)} y_B-${ecritureParentheseSiNegatif(yA)} ${sp(1)}=${uy}$<br>
    D'où: $\\begin{cases}{x_B=${xA + ux}${sp(1)} &  ${sp(1)} y_B=${sp(1)}${yA + uy}$`]
    setReponse(this, 0, xB)
    setReponse(this, 1, yB)
    listeQuestionsToContenuSansNumero(this)
  }
}
