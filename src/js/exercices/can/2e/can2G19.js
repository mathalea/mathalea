import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, ecritureParentheseSiNegatif, miseEnEvidence, choice } from '../../../modules/outils.js'
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
 * Référence can2G19
 *
*/

export const uuid = '6082f'
export const ref = 'can2G19'
export default function CoeffDirDroite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fractionEgale'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let xA, yA, xB, yB, o, A, B, Bx, sABx, sBBx, m, lA, traceA, lB, lABx, lBBx, traceB, d, r1, xmin, xmax, ymin, ymax, objet, objetC
    switch (choice([1, 2])) { //, 2, 2
      case 1:
        xA = randint(-4, -1)
        yA = randint(0, 4)
        xB = randint(2, 4)
        yB = randint(1, 4)
        o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
        A = point(xA, yA)
        B = point(xB, yB)
        Bx = point(B.x, A.y)
        sABx = segment(A, Bx)
        sBBx = segment(B, Bx)
        m = new FractionX(yB - yA, xB - xA)
        sBBx.epaisseur = 2
        sBBx.pointilles = 5
        sABx.epaisseur = 2
        sABx.pointilles = 5
        lA = texteParPosition('A', xA, yA + 0.5, 'milieu', 'black', 1.5)
        traceA = tracePoint(A, 'black') // Variable qui trace les points avec une croix
        lB = texteParPosition('B', xB, yB + 0.5, 'milieu', 'black', 1.5)
        lABx = texteParPosition(`${xB - xA}`, milieu(A, Bx).x, A.y + 0.3, 'milieu', 'red', 1.5)
        lBBx = texteParPosition(`${yB - yA}`, B.x + 0.5, milieu(B, Bx).y, 'milieu', 'blue', 1.5)
        traceB = tracePoint(B, 'black') // Variable qui trace les points avec une croix
        d = droite(A, B, '', 'blue')
        d.epaisseur = 2
        traceA.taille = 3
        traceA.epaisseur = 2
        traceB.taille = 3
        traceB.epaisseur = 2
        xmin = -5
        ymin = -1
        xmax = 5
        ymax = 5
        r1 = repere({
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
        objet = mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax + 0.25, pixelsParCm: 30, scale: 0.75, style: 'margin: auto' }, d, r1, traceA, lA, lB, traceB, o)
        objetC = mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax + 0.25, pixelsParCm: 30, scale: 0.75, style: 'margin: auto' }, d, r1, traceA, lA, lB, traceB, o, sABx, sBBx, lABx, lBBx)

        this.question = `Donner le coefficient directeur $m$ de la droite.<br>

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
        break

      case 2:
        xA = randint(-4, 0)
        yA = randint(-5, 5) / 2
        xB = randint(1, 4)
        yB = randint(-5, 5, 0) / 2
        o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
        A = point(xA, yA)
        B = point(xB, yB)
        Bx = point(B.x, A.y)
        sABx = segment(A, Bx)
        sBBx = segment(B, Bx)
        m = new FractionX(2 * (yB - yA), xB - xA)
        sBBx.epaisseur = 2
        sBBx.pointilles = 5
        sABx.epaisseur = 2
        sABx.pointilles = 5
        lA = texteParPosition('A', xA, yA + 0.5, 'milieu', 'black', 1.5)
        traceA = tracePoint(A, 'black') // Variable qui trace les points avec une croix
        lB = texteParPosition('B', xB, yB + 0.5, 'milieu', 'black', 1.5)
        if (yA > yB) { lABx = texteParPosition(`${xB - xA}`, milieu(A, Bx).x, A.y + 0.3, 'milieu', 'red', 1.5) } else { lABx = texteParPosition(`${xB - xA}`, milieu(A, Bx).x, A.y - 0.3, 'milieu', 'red', 1.5) }
        lBBx = texteParPosition(`${2 * (yB - yA)}`, B.x + 0.5, milieu(B, Bx).y, 'milieu', 'blue', 1.5)
        traceB = tracePoint(B, 'black') // Variable qui trace les points avec une croix
        d = droite(A, B, '', 'blue')
        d.epaisseur = 2
        traceA.taille = 3
        traceA.epaisseur = 2
        traceB.taille = 3
        traceB.epaisseur = 2
        xmin = -5
        ymin = -3
        xmax = 5
        ymax = 3
        r1 = repere({
          xMin: xmin,
          xMax: xmax,
          xUnite: 1,
          yMin: 2 * ymin,
          yMax: 2 * ymax,
          yUnite: 0.5,
          thickHauteur: 0.1,
          xLabelMin: xmin + 1,
          xLabelMax: xmax - 1,
          yLabelMax: 2 * ymax - 1,
          yLabelMin: 2 * ymin + 1,
          axeXStyle: '->',
          axeYStyle: '->',
          yLabelDistance: 2,
          yLabelEcart: 0.5,
          grilleSecondaire: true,
          grilleSecondaireYDistance: 1,
          grilleSecondaireXDistance: 1,
          grilleSecondaireYMin: 2 * ymin,
          grilleSecondaireYMax: 2 * ymax,
          grilleSecondaireXMin: xmin,
          grilleSecondaireXMax: xmax
        })
        objet = mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax + 0.25, pixelsParCm: 30, scale: 0.75, style: 'margin: auto' }, d, r1, traceA, lA, lB, traceB, o)
        objetC = mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax + 0.25, pixelsParCm: 30, scale: 0.75, style: 'margin: auto' }, d, r1, traceA, lA, lB, traceB, o, sABx, sBBx, lABx, lBBx)

        this.question = `Donner le coefficient directeur $m$ de la droite.<br>

          `
        this.question += `${objet}<br>

          `
        if (yB === yA) {
          this.correction = `La droite est horizontale. On en déduit que $m=0$.
         `
        } else {
          this.correction = `Le coefficient directeur $m$ de la droite $(AB)$ est donné par : <br>
      $m=\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{${2 * yB}-${ecritureParentheseSiNegatif(2 * yA)}}{${xB}-${ecritureParentheseSiNegatif(xA)}}=\\dfrac{${miseEnEvidence(2 * (yB - yA), 'blue')}}{${miseEnEvidence(xB - xA, 'red')}}${m.texSimplificationAvecEtapes()}$.
  <br>

  `
          this.correction += `

            ${objetC}<br>

            `
        }
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$m=\\ldots$'
    this.reponse = m
  }
}
