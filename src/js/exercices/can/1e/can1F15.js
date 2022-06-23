import Exercice from '../../Exercice.js'
import { randint, choice } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
import { repere2, courbe2, mathalea2d, texteParPosition } from '../../../modules/2d.js'
import { calcule } from '../../../modules/fonctionsMaths.js'
export const titre = 'Lire graphiquement un nombre dérivé'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '21/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function LectureGraphiqueNombreDerivee () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  const listeFractions = [[1, 1], [1, 2], [1, 3], [1, 4], [2, 1], [2, 3], [3, 4], [3, 2], [4, 3], [5, 3], [5, 4]]
  this.nouvelleVersion = function () {
    let b; let f; let r; let alpha; let beta; let a; let F; let o; let nbre; let tang; let frac; let fraction = []
    switch (choice([1, 2, 3, 4, 5])) { //
      case 1:

        a = randint(1, 2)
        nbre = randint(-1, 1)
        alpha = randint(-1, 1)
        beta = randint(-2, 2)
        o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
        f = function (x) {
          return calcule(2 * a * x - 2 * a * alpha)
        }
        F = function (x) {
          return calcule(a * (x - alpha) ** 2 + beta)
        }

        r = repere2({
          xMin: -4,
          xMax: 4,
          xUnite: 2,
          yMin: -3,
          yMax: 10,
          thickHauteur: 0.2,
          xLabelMin: -3,
          xLabelMax: 3,
          yLabelMax: 9,
          yLabelMin: -1,
          axeXStyle: '->',
          axeYStyle: '->',
          yLabelDistance: 2,
          yLabelEcart: 0.8,
          grilleSecondaire: true,
          grilleSecondaireYDistance: 1,
          grilleSecondaireXDistance: 1,
          grilleSecondaireYMin: -3,
          grilleSecondaireYMax: 10,
          grilleSecondaireXMin: -4,
          grilleSecondaireXMax: 4
        })
        tang = x => f(nbre) * (x - nbre) + F(nbre)
        F = x => a * (x - alpha) ** 2 + beta
        this.question = `La courbe représente une fonction $f$ et la droite est la tangente au point d'abscisse $${nbre}$.<br> Déterminer $f'(${nbre})$. <br>  `
        this.question += mathalea2d({ xmin: -8, xmax: 8, ymin: -3, ymax: 10, pixelsParCm: 16, scale: 0.5 },
          r, o, courbe2(F, { repere: r, color: 'blue', epaisseur: 2 }), courbe2(tang, { repere: r, color: 'red', epaisseur: 2 })
        )

        this.correction = `$f'(${nbre})$ est donné par le coefficient directeur de la tangente à la courbe au point d'abscisse $${nbre}$, soit $${f(nbre)}$.`
        this.formatInteractif = 'calcul'
        this.reponse = f(nbre)
        break

      case 2:

        a = randint(-2, -1)
        nbre = randint(-1, 1)
        alpha = randint(-1, 1)
        beta = randint(-2, 2)
        o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
        f = function (x) {
          return calcule(2 * a * x - 2 * a * alpha)
        }
        F = function (x) {
          return calcule(a * (x - alpha) ** 2 + beta)
        }

        r = repere2({
          xMin: -4,
          xMax: 4,
          xUnite: 2,
          yMin: -10,
          yMax: 3,
          thickHauteur: 0.2,
          xLabelMin: -3,
          xLabelMax: 3,
          yLabelMax: 2,
          yLabelMin: -9,
          yLabelEcart: 0.8,
          axeXStyle: '->',
          axeYStyle: '->',
          yLabelDistance: 2,
          grilleSecondaire: true,
          grilleSecondaireYDistance: 1,
          grilleSecondaireXDistance: 1,
          grilleSecondaireYMin: -10,
          grilleSecondaireYMax: 3,
          grilleSecondaireXMin: -4,
          grilleSecondaireXMax: 4
        })
        tang = x => f(nbre) * (x - nbre) + F(nbre)
        F = x => a * (x - alpha) ** 2 + beta
        this.question = `La courbe représente une fonction $f$ et la droite est la tangente au point d'abscisse $${nbre}$.<br> Déterminer $f'(${nbre})$.  <br> `
        this.question += mathalea2d({ xmin: -8, xmax: 8, ymin: -10, ymax: 3, pixelsParCm: 16, scale: 0.5 },
          r, o, courbe2(F, { repere: r, color: 'blue', epaisseur: 2 }), courbe2(tang, { repere: r, color: 'red', epaisseur: 2 })
        )

        this.correction = `$f'(${nbre})$ est donné par le coefficient directeur de la tangente à la courbe au point d'abscisse $${nbre}$, soit $${f(nbre)}$.`
        this.formatInteractif = 'calcul'
        this.reponse = f(nbre)
        break

      case 3:// a/x+b

        a = randint(1, 2)
        nbre = randint(1, 2)
        b = randint(0, 3)
        frac = new FractionX(-a, nbre * nbre)
        o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
        f = function (x) {
          return calcule(-a / (x * x))
        }
        F = function (x) {
          return calcule(a / x + b)
        }
        this.question = `La courbe représente une fonction $f$ et la droite est la tangente au point d'abscisse $${nbre}$.<br> Déterminer $f'(${nbre})$.<br>   `
        r = repere2({
          xMin: -1,
          xMax: 7,
          xUnite: 2,
          yUnite: 2,
          yMin: -1,
          yMax: 6,
          thickHauteur: 0.2,
          xLabelMin: 0,
          xLabelMax: 5,
          yLabelMax: 5,
          yLabelMin: 0,
          axeXStyle: '->',
          axeYStyle: '->',
          grilleSecondaire: true,
          grilleSecondaireYDistance: 0.5,
          grilleSecondaireYMin: -1,
          grilleSecondaireYMax: 6,
          grilleSecondaireXMin: -1,
          grilleSecondaireXMax: 7
        })
        tang = x => f(nbre) * (x - nbre) + F(nbre)
        F = x => a / x + b

        this.question += mathalea2d({ xmin: -2, xmax: 14, ymin: -2, ymax: 12, pixelsParCm: 16, scale: 0.5 },
          r, o, courbe2(F, { repere: r, xMin: 0.1, xMax: 7, color: 'blue', epaisseur: 2 }), courbe2(tang, { repere: r, color: 'red', epaisseur: 2 })
        )

        this.correction = `$f'(${nbre})$ est donné par le coefficient directeur de la tangente à la courbe au point d'abscisse $${nbre}$, soit $${frac.texFraction}${frac.texSimplificationAvecEtapes()}$.`
        this.formatInteractif = 'fractionEgale'
        this.reponse = frac

        break

      case 4:// exp(ax) avec a>0

        fraction = choice(listeFractions)
        frac = new FractionX(fraction[0], fraction[1])

        o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
        f = function (x) {
          return calcule(frac * Math.exp(frac * x))
        }
        F = function (x) {
          return calcule(Math.exp(frac * x))
        }
        this.question = 'La courbe représente une fonction $f$ et la droite est la tangente au point d\'abscisse $0$.<br> Déterminer $f\'(0)$.  <br> '
        r = repere2({
          xMin: -2,
          xMax: 6,
          xUnite: 2,
          yUnite: 2,
          yMin: -1,
          yMax: 6,
          thickHauteur: 0.2,
          xLabelMin: 0,
          xLabelMax: 5,
          yLabelMax: 5,
          yLabelMin: 0,
          axeXStyle: '->',
          axeYStyle: '->',
          grilleSecondaire: true,
          grilleSecondaireYDistance: 1,
          grilleSecondaireXDistance: 1,
          grilleSecondaireYMin: -1,
          grilleSecondaireYMax: 6,
          grilleSecondaireXMin: -2,
          grilleSecondaireXMax: 6
        })
        tang = x => f(0) * x + F(0)
        F = x => Math.exp(frac * x)

        this.question += mathalea2d({ xmin: -4, xmax: 12, ymin: -2, ymax: 12, pixelsParCm: 16, scale: 0.5 },
          r, o, courbe2(F, { repere: r, xMin: -2, xMax: 5, color: 'blue', epaisseur: 2 }), courbe2(tang, { repere: r, color: 'red', epaisseur: 2 })
        )

        this.correction = `$f'(0)$ est donné par le coefficient directeur de la tangente à la courbe au point d'abscisse $0$, soit $${frac.texFraction}${frac.texSimplificationAvecEtapes()}$.`

        this.formatInteractif = 'fractionEgale'
        this.reponse = frac
        console.log(this.reponse)
        break

      case 5:// exp(ax) avec a<0

        fraction = choice(listeFractions)
        frac = new FractionX(fraction[0] * (-1), fraction[1])
        o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
        f = function (x) {
          return calcule(frac * Math.exp(frac * x))
        }
        F = function (x) {
          return calcule(Math.exp(frac * x))
        }
        this.question = 'La courbe représente une fonction $f$ et la droite est la tangente au point d\'abscisse $0$.<br> Déterminer $f\'(0)$. <br>  '
        r = repere2({
          xMin: -5,
          xMax: 2,
          xUnite: 2,
          yUnite: 2,
          yMin: -1,
          yMax: 6,
          thickHauteur: 0.2,
          xLabelMin: -4,
          xLabelMax: 1,
          yLabelMax: 5,
          yLabelMin: 0,
          axeXStyle: '->',
          axeYStyle: '->',
          grilleSecondaire: true,
          grilleSecondaireYDistance: 1,
          grilleSecondaireXDistance: 1,
          grilleSecondaireYMin: -1,
          grilleSecondaireYMax: 6,
          grilleSecondaireXMin: -5,
          grilleSecondaireXMax: 2
        })
        tang = x => f(0) * x + F(0)
        F = x => Math.exp(frac * x)

        this.question += mathalea2d({ xmin: -10, xmax: 4, ymin: -2, ymax: 12, pixelsParCm: 16, scale: 0.5 },
          r, o, courbe2(F, { repere: r, xMin: -5, xMax: 2, color: 'blue', epaisseur: 2 }), courbe2(tang, { repere: r, color: 'red', epaisseur: 2 })
        )

        this.correction = `$f'(0)$ est donné par le coefficient directeur de la tangente à la courbe au point d'abscisse $0$, soit $${frac.texFraction}${frac.texSimplificationAvecEtapes()}$.`

        this.formatInteractif = 'fractionEgale'
        this.reponse = frac

        break
    }
  }
}
