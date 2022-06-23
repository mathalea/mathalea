import Exercice from '../../Exercice.js'
import { randint, choice, sp, ecritureParentheseSiNegatif, ecritureAlgebrique, rienSi1 } from '../../../modules/outils.js'
import { repere2, courbe2, mathalea2d, texteParPosition } from '../../../modules/2d.js'
import { calcule } from '../../../modules/fonctionsMaths.js'
export const titre = 'Déterminer une équation de tangente à partir des courbes de $f$ et $f’$'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '22/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function LectureGraphiqueTangente () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    let f; let r1; let r2; let alpha; let beta; let F; let o; let nbre; let courbef; let courbefp
    switch (choice([1, 2])) { //
      case 1:// second degré (x-alpha)^2+beta
        if (choice([true, false])) {
          nbre = randint(0, 3)
          alpha = randint(0, 2)
          beta = randint(-2, 2)
          f = function (x) { // fonction dérivée
            return calcule(2 * x - 2 * alpha)
          }
          F = function (x) { // fonction
            return calcule((x - alpha) ** 2 + beta)
          }
          while (f(nbre) === 0) {
            nbre = randint(0, 3)
            alpha = randint(0, 2)
            beta = randint(-2, 2)
          }
        } else {
          nbre = randint(-2, 1)
          alpha = randint(-2, 0)
          beta = randint(-2, 2)
          f = function (x) { // fonction dérivée
            return calcule(2 * x - 2 * alpha)
          }
          F = function (x) { // fonction
            return calcule((x - alpha) ** 2 + beta)
          }
          while (f(nbre) === 0) {
            nbre = randint(-2, 1)
            alpha = randint(-2, 0)
            beta = randint(-2, 2)
          }
        }

        o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)

        r1 = repere2({
          xMin: -4,
          xMax: 4,
          xUnite: 1.5,
          yMin: -3, // Math.min(-3,F(nbre)-1)
          yMax: 12,
          thickHauteur: 0.2,
          xLabelMin: -3,
          xLabelMax: 3,
          yLabelMax: 11,
          yLabelMin: -3,
          axeXStyle: '->',
          axeYStyle: '->',
          yLabelDistance: 2,
          yLabelEcart: 0.8,
          grilleSecondaire: true,
          grilleSecondaireYDistance: 1,
          grilleSecondaireXDistance: 1,
          grilleSecondaireYMin: -3,
          grilleSecondaireYMax: 12,
          grilleSecondaireXMin: -4,
          grilleSecondaireXMax: 4
        })
        r2 = repere2({
          xMin: -4,
          xMax: 4,
          xUnite: 1.5,
          yMin: -5,
          yMax: 8,
          thickHauteur: 0.2,
          xLabelMin: -3,
          xLabelMax: 3,
          yLabelMax: 11,
          yLabelMin: -3,
          axeXStyle: '->',
          axeYStyle: '->',
          yLabelDistance: 2,
          yLabelEcart: 0.8,
          grilleSecondaire: true,
          grilleSecondaireYDistance: 1,
          grilleSecondaireXDistance: 1,
          grilleSecondaireYMin: -3,
          grilleSecondaireYMax: 12,
          grilleSecondaireXMin: -4,
          grilleSecondaireXMax: 4
        })
        courbef = texteParPosition('Courbe de f', -3.3, 6, 'milieu', 'blue', 1.2)
        courbefp = texteParPosition('Courbe de f\'', -3.3, 6, 'milieu', 'red', 1.2)

        f = x => 2 * x - 2 * alpha
        F = x => (x - alpha) ** 2 + beta
        this.question = `On donne les représentations graphiques d'une fonction et de sa dérivée.<br>
        Donner l'équation réduite de la tangente à la courbe de $f$ en $x=${nbre}$. <br> `
        this.question += mathalea2d({ xmin: -6, xmax: 6, ymin: -3, ymax: 12, style: 'display: inline', pixelsParCm: 16, scale: 0.5 },
          r1, o, courbef, courbe2(F, { repere: r1, color: 'blue', epaisseur: 2 })
        )
        this.question += `${sp(8)}` + mathalea2d({ xmin: -6, xmax: 6, ymin: -5, ymax: 8, style: 'display: inline', pixelsParCm: 16, scale: 0.5 },
          r2, o, courbefp, courbe2(f, { repere: r2, color: 'red', epaisseur: 2 })
        )

        this.correction = `L'équation réduite de la tangente au point d'abscisse $${nbre}$ est  : $y=f'(${nbre})(x-${ecritureParentheseSiNegatif(nbre)})+f(${nbre})$.<br>
        On lit graphiquement $f(${nbre})=${F(nbre)}$ et $f'(${nbre})=${f(nbre)}$.<br>
        L'équation réduite de la tangente est donc donnée par : 
        $y=${f(nbre)}(x${ecritureAlgebrique(-nbre)})${ecritureAlgebrique(F(nbre))}$, soit `
        if (-nbre * f(nbre) + F(nbre) === 0) { this.correction += `$y=${rienSi1(f(nbre))}x$.` } else { this.correction += `$y=${rienSi1(f(nbre))}x${ecritureAlgebrique(-nbre * f(nbre) + F(nbre))}$.` }

        this.reponse = [`y=${f(nbre)}x+${-nbre * f(nbre) + F(nbre)}`]
        break

      case 2:// second degré -(x-alpha)^2+beta

        if (choice([true, false])) {
          nbre = randint(0, 2)
          alpha = randint(0, 2)
          beta = randint(1, 4)
          f = function (x) { // fonction dérivée
            return calcule(2 * x * (-1) + 2 * alpha)
          }
          F = function (x) { // fonction
            return calcule((-1) * (x - alpha) ** 2 + beta)
          }
          while (f(nbre) === 0) { // pas de tangente horizontales à chercher
            nbre = randint(0, 2)
            alpha = randint(0, 2)
            beta = randint(1, 4)
          }
        } else {
          nbre = randint(-2, 0)
          alpha = randint(-2, 0)
          beta = randint(0, 3)
        }
        f = function (x) { // fonction dérivée
          return calcule(2 * x * (-1) + 2 * alpha)
        }
        F = function (x) { // fonction
          return calcule((-1) * (x - alpha) ** 2 + beta)
        }
        while (f(nbre) === 0) { // pas de tangente horizontales à chercher
          nbre = randint(-2, 0)
          alpha = randint(-2, 0)
          beta = randint(0, 3)
        }

        o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)

        r1 = repere2({
          xMin: -4,
          xMax: 4,
          xUnite: 1.5,
          yMin: -8, // Math.min(-3,F(nbre)-1)
          yMax: 5,
          thickHauteur: 0.2,
          xLabelMin: -3,
          xLabelMax: 3,
          yLabelMax: 4,
          yLabelMin: -7,
          axeXStyle: '->',
          axeYStyle: '->',
          yLabelDistance: 2,
          yLabelEcart: 0.8,
          grilleSecondaire: true,
          grilleSecondaireYDistance: 1,
          grilleSecondaireXDistance: 1,
          grilleSecondaireYMin: -8,
          grilleSecondaireYMax: 6,
          grilleSecondaireXMin: -4,
          grilleSecondaireXMax: 4
        })
        r2 = repere2({
          xMin: -4,
          xMax: 4,
          xUnite: 1.5,
          yMin: -8, // Math.min(-3,F(nbre)-1)
          yMax: 6,
          thickHauteur: 0.2,
          xLabelMin: -3,
          xLabelMax: 3,
          yLabelMax: 5,
          yLabelMin: -7,
          axeXStyle: '->',
          axeYStyle: '->',
          yLabelDistance: 2,
          yLabelEcart: 0.8,
          grilleSecondaire: true,
          grilleSecondaireYDistance: 1,
          grilleSecondaireXDistance: 1,
          grilleSecondaireYMin: -8,
          grilleSecondaireYMax: 6,
          grilleSecondaireXMin: -4,
          grilleSecondaireXMax: 4
        })
        courbef = texteParPosition('Courbe de f', 3.3, 4, 'milieu', 'blue', 1.2)
        courbefp = texteParPosition('Courbe de f\'', 3.3, 4, 'milieu', 'red', 1.2)

        f = x => -2 * x + 2 * alpha
        F = x => (-1) * (x - alpha) ** 2 + beta
        this.question = `On donne les représentations graphiques d'une fonction et de sa dérivée.<br>
      Donner l'équation réduite de la tangente à la courbe de $f$ en $x=${nbre}$. <br> `
        this.question += mathalea2d({ xmin: -6, xmax: 6, ymin: -8, ymax: 5, style: 'display: inline', pixelsParCm: 16, scale: 0.5 },
          r1, o, courbef, courbe2(F, { repere: r1, color: 'blue', epaisseur: 2 })
        )
        this.question += `${sp(8)}` + mathalea2d({ xmin: -6, xmax: 6, ymin: -8, ymax: 6, style: 'display: inline', pixelsParCm: 16, scale: 0.5 },
          r2, o, courbefp, courbe2(f, { repere: r2, color: 'red', epaisseur: 2 })
        )

        this.correction = `L'équation réduite de la tangente au point d'abscisse $${nbre}$ est  : $y=f'(${nbre})(x-${ecritureParentheseSiNegatif(nbre)})+f(${nbre})$.<br>
      On lit graphiquement $f(${nbre})=${F(nbre)}$ et $f'(${nbre})=${f(nbre)}$.<br>
      L'équation réduite de la tangente est donc donnée par : 
      $y=${f(nbre)}(x${ecritureAlgebrique(-nbre)})${ecritureAlgebrique(F(nbre))}$, soit `
        if (-nbre * f(nbre) + F(nbre) === 0) { this.correction += `$y=${f(nbre)}x$.` } else { this.correction += `$y=${f(nbre)}x${ecritureAlgebrique(-nbre * f(nbre) + F(nbre))}$.` }
        this.reponse = [`y=${f(nbre)}x+${-nbre * f(nbre) + F(nbre)}`]
        break
    }
  }
}
