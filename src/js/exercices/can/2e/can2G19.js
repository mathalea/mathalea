import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, ecritureParentheseSiNegatif, miseEnEvidence } from '../../../modules/outils.js'
import {
  repere, texteParPosition,
  point, tracePoint, segment, droite, milieu
} from '../../../modules/2d.js'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Déterminer le coefficient directeur d\'une droite (graphique)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '10/11/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can3F11
 *
*/

export const ref = 'can3F10'
export default function CoeffDirDroite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fractionEgale'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const xA = randint(-4, -1)
    const yA = randint(0, 4)
    const xB = randint(2, 4)
    const yB = randint(1, 4)
    const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
    const A = point(xA, yA)
    const B = point(xB, yB)
    const Bx = point(B.x, A.y)
    const sABx = segment(A, Bx)
    const sBBx = segment(B, Bx)
    const m = new FractionX(yB - yA, xB - xA)
    sBBx.epaisseur = 2
    sBBx.pointilles = 5
    sABx.epaisseur = 2
    sABx.pointilles = 5
    const lA = texteParPosition('A', xA, yA + 0.5, 'milieu', 'black', 1.5)
    const traceA = tracePoint(A, 'black') // Variable qui trace les points avec une croix
    const lB = texteParPosition('B', xB, yB + 0.5, 'milieu', 'black', 1.5)
    const lABx = texteParPosition(`${xB - xA}`, milieu(A, Bx).x, A.y + 0.5, 'milieu', 'red', 1.5)
    const lBBx = texteParPosition(`${yB - yA}`, B.x + 0.5, milieu(B, Bx).y, 'milieu', 'blue', 1.5)
    const traceB = tracePoint(B, 'black') // Variable qui trace les points avec une croix
    const d = droite(A, B, '', 'blue')
    d.epaisseur = 2
    traceA.taille = 3
    traceA.epaisseur = 2
    traceB.taille = 3
    traceB.epaisseur = 2
    const xmin = -5
    const ymin = -1
    const xmax = 5
    const ymax = 5
    const r1 = repere({
      xMin: xmin,
      xMax: xmax,
      xUnite: 1,
      yMin: ymin,
      yMax: ymax,
      yUnite: 1,
      thickHauteur: 0.1,
      xLabelMin: xmin + 1,
      xLabelMax: xmax - 1,
      yLabelMax: ymax - 1,
      yLabelMin: ymin + 1,
      axeXStyle: '->',
      axeYStyle: '->',
      yLabelDistance: 1,
      yLabelEcart: 0.3,
      grilleSecondaire: true,
      grilleSecondaireYDistance: 1,
      grilleSecondaireXDistance: 1,
      grilleSecondaireYMin: ymin,
      grilleSecondaireYMax: ymax,
      grilleSecondaireXMin: xmin,
      grilleSecondaireXMax: xmax
    })
    const objet = mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax + 0.25, pixelsParCm: 30, scale: 0.75, style: 'margin: auto' }, d, r1, traceA, lA, lB, traceB, o)
    const objetC = mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax + 0.25, pixelsParCm: 30, scale: 0.75, style: 'margin: auto' }, d, r1, traceA, lA, lB, traceB, o, sABx, sBBx, lABx, lBBx)

    this.question = `Donner le coeffcient directeur $m$ de la droite.<br>

        `
    this.question += `${objet}<br>

        `
    if (yB === yA) {
      this.correction = `La droite est horizontale. On en déduit que $m=0$.
       `
    } else {
      this.correction = `Le coefficient directeur $m$ de la droite $(AB)$ est donné par : <br>
    $m=\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{${yB}-${yA}}{${xB}-${ecritureParentheseSiNegatif(xA)}}=\\dfrac{${miseEnEvidence(yB - yA, 'blue')}}{${miseEnEvidence(xB - xA, 'red')}}${m.texSimplificationAvecEtapes()}$.
<br>

`
      this.correction += `
          
          ${objetC}<br>
          
          `
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$m=\\ldots$'
    this.reponse = m
  }
}
