import Exercice from '../../Exercice.js'
import { randint, listeQuestionsToContenuSansNumero, ecritureParentheseSiNegatif, sp, texteCentre } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Déterminer le déterminant de deux vecteurs.'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '04/03:2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Stéphane Guyon
 * Référence
*/
export default function DeterminantVecteur () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const vx = randint(-5, 5)
    const vy = randint(-5, 5)
    const ux = randint(-5, 5, 0)
    const uy = randint(-5, 5)
    const det = ux * vy - uy * vx

    this.listeQuestions = [` Dans un repère orthonormé $(O;\\vec i,\\vec j)$, on donne deux vecteurs :
    ${texteCentre(`$\\vec{u}\\begin{cases}${ux}${sp(1)} & ${sp(1)}${uy}\\end{cases}$ et $\\vec{v}\\begin{cases}${vx}${sp(1)} & ${sp(1)}${vy}\\end{cases}$`)}
 Le déterminant des vecteurs $\\vec{u}$ et $\\vec{v}$, vaut $Det\\left(\\vec{u};\\vec{v}\\right)=$
 ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
 ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
    this.listeCorrections = [`On sait d'après le cours, que si le point $B$ est l'image du point $A$ par la translation de vecteur $\\vec{u}$, alors $\\overrightarrow{AB}=\\vec{u}$ <br>
   
   `]
    setReponse(this, 0, det)
    listeQuestionsToContenuSansNumero(this)
  }
}
