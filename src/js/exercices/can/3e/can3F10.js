import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { choice, randint, texNombre } from '../../../modules/outils.js'
import {
  repere, texteParPosition, courbe,
  point, tracePoint, segment
} from '../../../modules/2d.js'
export const titre = 'Déterminer une ordonnée/abscisse avec une fonction linéaire'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '02/11/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can1G09
 *
*/

export default function OrdonneeAbscisseFonctionLineaire () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let xA, yB
    const a = choice([0.5, 1.5, 2, 2.5, 3, 3.5, 4])
    if (a === 0.5 || a === 1.5 || a === 2) { xA = choice([2, 4]) } else { xA = 2 }
    const yA = a * xA
    const f = x => a * x
    const xB = randint(5, 10)
    if (a === 0.5) { yB = randint(6, 10) * 2 }
    if (a === 1.5) { yB = randint(6, 10) * 3 }
    if (a === 2.5) { yB = randint(3, 10) * 5 }
    if (a === 3.5) { yB = randint(2, 5) * 7 }
    if (a === 2 || a === 3 || a === 4) { yB = randint(5, 10) * a }
    const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
    const A = point(xA, 0.5 * yA)
    const Ax = point(A.x, 0)
    const Ay = point(0, A.y)
    const sAAx = segment(A, Ax)
    sAAx.epaisseur = 2
    sAAx.pointilles = 5
    const sAAy = segment(A, Ay)
    sAAy.epaisseur = 2
    sAAy.pointilles = 5
    const lA = texteParPosition('A', xA, 0.5 * yA + 0.5, 'milieu', 'black', 1.5)
    const traceA = tracePoint(A, 'black') // Variable qui trace les points avec une croix
    traceA.taille = 4
    traceA.epaisseur = 2
    const xmin = -1
    const ymin = -1
    const xmax = 5
    const ymax = 5
    const r1 = repere({
      xMin: xmin,
      xMax: xmax,
      xUnite: 1,
      yMin: ymin,
      yMax: 2 * ymax,
      yUnite: 0.5,
      thickHauteur: 0.1,
      xLabelMin: xmin + 1,
      xLabelMax: xmax - 1,
      yLabelMax: 2 * ymax - 1,
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
    const objet = mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, pixelsParCm: 30, scale: 0.75, style: 'margin: auto' }, courbe(f, { repere: r1, color: 'blue', epaisseur: 2 }), r1, lA, traceA, o, sAAx, sAAy)
    switch (choice([1, 2])) {
      case 1://
        this.question = `$B(${xB}\\,;\\, \\ldots)$ est un point de la droite $(OA)$.<br> 
        Quelle est son ordonnée ?<br>
        `
        this.question += `${objet}`

        this.correction = `La fonction  représentée est une fonction linéaire.<br>
        Il y a donc une proportionnalité entre les abscisses et les ordonnées des points de la droite.<br>
        L'abscisse du point $A$ est $${xA}$ et son ordonnée $${yA}$. Les ordonnées des points s'obtiennent en multipliant par $${texNombre(a, 1)}$ les abscisses.<br>
        L'abscisse du point $B$ étant $${xB}$, son ordonnée est $${xB}\\times ${texNombre(a, 1)}=${texNombre(a * xB, 1)}$.
       `
        this.canEnonce = `Compléter.

        `
        this.canEnonce += `${objet}`
        this.canReponseACompleter = `$B(${xB}\\,;\\,\\ldots) \\in (OA)$`
        this.reponse = a * xB

        break
      case 2://
        this.question = `$B(\\ldots\\,;\\, ${yB})$ est un point de la droite $(OA)$.<br> 
        Quelle est son abscisse ?<br>
        `
        this.question += `${objet}`

        this.correction = `La fonction représentée est une fonction linéaire.<br>
        Il y a donc une proportionnalité entre les abscisses et les ordonnées des points de la droite.<br>
        L'abscisse du point $A$ est $${xA}$ et son ordonnée $${yA}$. Les abscisses des points s'obtiennent en divisant par $${texNombre(a, 1)}$ les ordonnées.<br>`
        if (a === 0.5) {
          this.correction += `Diviser par $${texNombre(a, 1)}$ (soit par $\\dfrac{1}{2}$) revient à multiplier par $2$.<br>
        Ainsi, l'abscisse du point $B$ est donnée par $${yB}\\times 2=${yB / a}$.`
        }
        if (a === 1.5) {
          this.correction += `Diviser par $${texNombre(a, 1)}$ (soit par $\\dfrac{3}{2}$) revient à multiplier par $3$ puis diviser par $2$.<br>
        Ainsi, l'abscisse du point $B$ est donnée par $(${yB}\\times 2)\\div 3=${yB / a}$.`
        }
        if (a === 2.5) {
          this.correction += `Diviser par $${texNombre(a, 1)}$ (soit par $\\dfrac{5}{2}$) revient à multiplier par $2$ puis diviser par $5$.<br>
        Ainsi, l'abscisse du point $B$ est donnée par $(${yB}\\times 2)\\div 5=${yB / a}$.`
        }
        if (a === 3.5) {
          this.correction += `Diviser par $${texNombre(a, 1)}$ (soit par $\\dfrac{7}{2}$) revient à multiplier par $2$ puis diviser par $7$.<br>
        Ainsi, l'abscisse du point $B$ est donnée par $(${yB}\\times 2)\\div 7=${yB / a}$.`
        }
        if (a === 2 || a === 3 || a === 4) { this.correction += `Ainsi, l'abscisse du point $B$ est donnée par  $${yB}\\div ${a}=${yB / a}$. ` }

        this.reponse = yB / a
        this.canEnonce = `Compléter.

        `
        this.canEnonce += `${objet}`
        this.canReponseACompleter = `$B(\\ldots\\,;\\, ${yB}) \\in (OA)$`
        break
    }
  }
}
