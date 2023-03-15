import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'

import { repere, texteParPosition, courbeInterpolee, point, tracePoint } from '../../modules/2d.js'
import { listeQuestionsToContenu, combinaisonListes, choice, randint } from '../../modules/outils.js'
import { tableauDeVariation } from '../../modules/TableauDeVariation.js'
export const titre = 'Dresser un tableau de variations à partir d\'une courbe'
export const dateDePublication = '14/02/2023'
/**
 * Description didactique de l'exercice
 * @author Gilles Mora
 * Référence
*/
export const uuid = '05b52'
export const ref = '2F30-1'
export default function VariationsCourbe () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  // this.nbQuestionsModifiable = false
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1
  this.tailleDiaporama = 1 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.spacing = 1// Interligne des questions
  this.spacingCorr = 1 // Interligne des réponses
  this.listePackages = ['tkz-tab']
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3', 'typeE4', 'typeE5', 'typeE6']// 'typeE1', 'typeE2',
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['typeE7']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3', 'typeE4', 'typeE5', 'typeE6', 'typeE7']
    }
    //
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, A0, A1, A2, A3, A4, Tk, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, o, r1, gr, graphique, nom, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const nomF = [
        ['f'], ['g'], ['h'], ['u'],
        ['v'], ['w']
      ]

      switch (listeTypeQuestions[i]) {
        case 'typeE1':// croissante, décroissante
          x0 = randint(-6, -3)
          y0 = randint(-4, -2)
          x1 = randint(-2, 2)
          y1 = randint(-1, 5)// max de y
          x2 = randint(4, 5)
          y2 = y1 - randint(1, 4)
          A0 = point(x0, y0)
          A1 = point(x1, y1)
          A2 = point(x2, y2)
          Tk = tracePoint(A0, A1, A2)
          Tk.epaisseur = 2
          nom = choice(nomF)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          r1 = repere({
            xMin: x0 - 1,
            yMin: Math.min(y2 - 1, y0 - 1),
            yMax: y1 + 2,
            xMax: 6,
            xUnite: 1,
            yUnite: 1,
            xThickDistance: 1,
            yThickDistance: 1,
            xLabelMin: x0,
            yLabelMin: y0,
            yLabelEcart: 0.6,
            grilleXDistance: 1,
            grilleYDistance: 1,
            grilleXMin: x0 - 1,
            grilleYMin: Math.min(y0 - 1, y2 - 1),
            grilleXMax: 6,
            grilleYMax: y1 + 2
          })

          gr = courbeInterpolee(
            [
              [x0, y0], [x1, y1], [x2, y2]
            ],
            {
              color: 'blue',
              epaisseur: 2,
              repere: r1,
              xMin: x0 - 1,
              xMax: 6
            })
          graphique = mathalea2d({
            xmin: x0 - 1,
            xmax: 6,
            ymin: Math.min(y0 - 1, y2 - 1),
            ymax: y1 + 2,
            pixelsParCm: 30,
            scale: 0.8,
            style: 'margin: auto'
          }, r1, o, gr, Tk)
          texte = `  Voici la courbe représentative d'une fonction $${nom}$.<br>
            Dresser son tableau de variations sur son ensemble de définition.<br><br>`
          texte += `${graphique}`

          texteCorr = `La fonction $${nom}$ est définie sur $[${x0}\\,;\\,${x2}]$.<br>
            Son tableau de variations est : <br><br>`
          texteCorr += mathalea2d({ xmin: -0.5, ymin: -7.5, xmax: 30, ymax: 0.1, scale: 0.39 }, tableauDeVariation({
            tabInit: [
              [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 1.5, 10], [`$${nom}(x)$`, 4, 30]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x0}$`, 10, `$${x1}$`, 10, `$${x2}$`, 10]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [['Var', 10, `-/$${y0}$`, 10, `+/$${y1}$`, 10, `-/$${y2}$`, 10]],
            colorBackground: '',
            espcl: 2, // taille en cm entre deux antécédents
            deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 2.5, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          })) + '<br>'

          break

        case 'typeE2':// décroissante, croissante
          x0 = randint(-6, -3)
          y0 = randint(2, 4)
          x1 = randint(-2, 2)
          y1 = randint(-5, 1)// min de y
          x2 = randint(4, 5)
          y2 = y1 + randint(1, 4)
          A0 = point(x0, y0)
          A1 = point(x1, y1)
          A2 = point(x2, y2)
          Tk = tracePoint(A0, A1, A2)
          Tk.epaisseur = 2
          nom = choice(nomF)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          r1 = repere({
            xMin: x0 - 1,
            yMin: y1 - 2,
            yMax: Math.max(y2 + 1, y0 + 1),
            xMax: 6,
            xUnite: 1,
            yUnite: 1,
            xThickDistance: 1,
            yThickDistance: 1,
            xLabelMin: x0,
            yLabelMin: y1 - 1,
            yLabelEcart: 0.6,
            grilleXDistance: 1,
            grilleYDistance: 1,
            grilleXMin: x0 - 1,
            grilleYMin: y1 - 2,
            grilleXMax: 6,
            grilleYMax: Math.max(y2 + 1, y0 + 1)
          })
          gr = courbeInterpolee(
            [
              [x0, y0], [x1, y1], [x2, y2]
            ],
            {
              color: 'blue',
              epaisseur: 2,
              repere: r1,
              xMin: x0 - 1,
              xMax: 6
            })
          graphique = mathalea2d({
            xmin: x0 - 1,
            xmax: 6,
            ymin: y1 - 2,
            ymax: Math.max(y2 + 1, y0 + 1),
            pixelsParCm: 30,
            scale: 0.8,
            style: 'margin: auto'
          }, r1, o, gr, Tk)
          texte = `  Voici la courbe représentative d'une fonction $${nom}$.<br>
        Dresser son tableau de variations sur son ensemble de définition.<br><br>`
          texte += `${graphique}`

          texteCorr = `La fonction $${nom}$ est définie sur $[${x0}\\,;\\,${x2}]$.<br>
        Son tableau de variations est : <br><br>`
          texteCorr += mathalea2d({ xmin: -0.5, ymin: -7.5, xmax: 30, ymax: 0.1, scale: 0.39 }, tableauDeVariation({
            tabInit: [
              [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 1.5, 10], [`$${nom}(x)$`, 4, 30]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x0}$`, 10, `$${x1}$`, 10, `$${x2}$`, 10]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [['Var', 10, `+/$${y0}$`, 10, `-/$${y1}$`, 10, `+/$${y2}$`, 10]],
            colorBackground: '',
            espcl: 3, // taille en cm entre deux antécédents
            deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 3, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          })) + '<br>'
          break

        case 'typeE3':// décroissante, croissante, décroissante
          x0 = randint(-6, -4)
          y0 = randint(3, 5)
          x1 = randint(-2, 1)
          y1 = y0 - randint(5, 8)
          x2 = randint(3, 4)
          y2 = y1 + randint(2, 7)
          x3 = randint(5, 6)
          y3 = y2 - randint(1, 4)
          A0 = point(x0, y0)
          A1 = point(x1, y1)
          A2 = point(x2, y2)
          A3 = point(x3, y3)
          Tk = tracePoint(A0, A1, A2, A3)
          Tk.epaisseur = 2
          nom = choice(nomF)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          r1 = repere({
            xMin: x0 - 1,
            yMin: Math.min(y1 - 1, y3 - 1),
            yMax: Math.max(y2 + 1, y0 + 1),
            xMax: 7,
            xUnite: 1,
            yUnite: 1,
            xThickDistance: 1,
            yThickDistance: 1,
            xLabelMin: x0,
            yLabelMin: y1 - 1,
            yLabelEcart: 0.6,
            grilleXDistance: 1,
            grilleYDistance: 1,
            grilleXMin: x0 - 1,
            grilleYMin: Math.min(y1 - 1, y3 - 1),
            grilleXMax: 7,
            grilleYMax: Math.max(y2 + 1, y0 + 1)
          })
          gr = courbeInterpolee(
            [
              [x0, y0], [x1, y1], [x2, y2], [x3, y3]
            ],
            {
              color: 'blue',
              epaisseur: 2,
              repere: r1,
              xMin: x0 - 1,
              xMax: 6
            })
          graphique = mathalea2d({
            xmin: x0 - 1,
            xmax: 7,
            ymin: Math.min(y1 - 1, y3 - 1),
            ymax: Math.max(y2 + 1, y0 + 1),
            pixelsParCm: 30,
            scale: 0.8,
            style: 'margin: auto'
          }, r1, o, gr, Tk)
          texte = `  Voici la courbe représentative d'une fonction $${nom}$.<br>
        Dresser son tableau de variations sur son ensemble de définition.<br><br>`
          texte += `${graphique}`

          texteCorr = `La fonction $${nom}$ est définie sur $[${x0}\\,;\\,${x3}]$.<br>
        Son tableau de variations est : <br><br>`
          texteCorr += mathalea2d({ xmin: -0.5, ymin: -7.5, xmax: 30, ymax: 0.1, scale: 0.39 }, tableauDeVariation({
            tabInit: [
              [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 1.5, 10], [`$${nom}(x)$`, 4, 30]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x0}$`, 10, `$${x1}$`, 10, `$${x2}$`, 10, `$${x3}$`, 10]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [['Var', 10, `+/$${y0}$`, 10, `-/$${y1}$`, 10, `+/$${y2}$`, 10, `-/$${y3}$`, 10]],
            colorBackground: '',
            espcl: 3, // taille en cm entre deux antécédents
            deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 3, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          })) + '<br>'
          break

        case 'typeE4':// croissante, décroissante, croissante
          x0 = randint(-6, -5)
          y0 = randint(-5, -3)
          x1 = randint(-3, 2)
          y1 = y0 + randint(5, 8)
          x2 = randint(4, 5)
          y2 = y1 - randint(2, 7)
          x3 = randint(7, 9)
          y3 = y2 + randint(1, 4)
          A0 = point(x0, y0)
          A1 = point(x1, y1)
          A2 = point(x2, y2)
          A3 = point(x3, y3)
          Tk = tracePoint(A0, A1, A2, A3)
          Tk.epaisseur = 2
          nom = choice(nomF)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          r1 = repere({
            xMin: x0 - 1,
            yMin: Math.min(y2 - 1, y0 - 1),
            yMax: Math.max(y1 + 1, y3 + 1),
            xMax: x3 + 1,
            xUnite: 1,
            yUnite: 1,
            xThickDistance: 1,
            yThickDistance: 1,
            xLabelMin: x0,
            yLabelMin: Math.min(y2 - 1, y0 - 1) + 1,
            yLabelEcart: 0.6,
            grilleXDistance: 1,
            grilleYDistance: 1,
            grilleXMin: x0 - 1,
            grilleYMin: Math.min(y2 - 1, y0 - 1),
            grilleXMax: x3 + 1,
            grilleYMax: Math.max(y1 + 1, y3 + 1)
          })
          gr = courbeInterpolee(
            [
              [x0, y0], [x1, y1], [x2, y2], [x3, y3]
            ],
            {
              color: 'blue',
              epaisseur: 2,
              repere: r1,
              xMin: x0 - 1,
              xMax: x3 + 1
            })
          graphique = mathalea2d({
            xmin: x0 - 1,
            xmax: x3 + 1,
            ymin: Math.min(y2 - 1, y0 - 1),
            ymax: Math.max(y1 + 1, y3 + 1),
            pixelsParCm: 30,
            scale: 0.7,
            style: 'margin: auto'
          }, r1, o, gr, Tk)
          texte = `  Voici la courbe représentative d'une fonction $${nom}$.<br>
        Dresser son tableau de variations sur son ensemble de définition.<br><br>`
          texte += `${graphique}`

          texteCorr = `La fonction $${nom}$ est définie sur $[${x0}\\,;\\,${x3}]$.<br>
        Son tableau de variations est : <br><br>`
          texteCorr += mathalea2d({ xmin: -0.5, ymin: -7.5, xmax: 30, ymax: 0.1, scale: 0.39 }, tableauDeVariation({
            tabInit: [
              [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 1.5, 10], [`$${nom}(x)$`, 4, 30]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x0}$`, 10, `$${x1}$`, 10, `$${x2}$`, 10, `$${x3}$`, 10]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [['Var', 10, `-/$${y0}$`, 10, `+/$${y1}$`, 10, `-/$${y2}$`, 10, `+/$${y3}$`, 10]],
            colorBackground: '',
            espcl: 3, // taille en cm entre deux antécédents
            deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 3, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          })) + '<br>'
          break

        case 'typeE5':// croissante, décroissante, croissante, décroissante
          x0 = randint(-6, -5)
          y0 = randint(-5, -3)
          x1 = randint(-3, -1)
          y1 = y0 + randint(5, 8)
          x2 = randint(1, 3)
          y2 = y1 - randint(2, 7)
          x3 = randint(4, 6)
          y3 = y2 + randint(1, 4)
          x4 = randint(7, 9)
          y4 = y3 - randint(1, 4)
          A0 = point(x0, y0)
          A1 = point(x1, y1)
          A2 = point(x2, y2)
          A3 = point(x3, y3)
          A4 = point(x4, y4)
          Tk = tracePoint(A0, A1, A2, A3, A4)
          Tk.epaisseur = 2
          nom = choice(nomF)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          r1 = repere({
            xMin: x0 - 1,
            yMin: Math.min(y2 - 1, y0 - 1, y4 - 1),
            yMax: Math.max(y1 + 1, y3 + 1),
            xMax: x4 + 1,
            xUnite: 1,
            yUnite: 1,
            xThickDistance: 1,
            yThickDistance: 1,
            xLabelMin: x0,
            yLabelMin: Math.min(y2 - 1, y0 - 1, y4 - 1) + 1,
            yLabelEcart: 0.6,
            grilleXDistance: 1,
            grilleYDistance: 1,
            grilleXMin: x0 - 1,
            grilleYMin: Math.min(y2 - 1, y0 - 1, y4 - 1),
            grilleXMax: x4 + 1,
            grilleYMax: Math.max(y1 + 1, y3 + 1)
          })
          gr = courbeInterpolee(
            [
              [x0, y0], [x1, y1], [x2, y2], [x3, y3], [x4, y4]
            ],
            {
              color: 'blue',
              epaisseur: 2,
              repere: r1,
              xMin: x0 - 1,
              xMax: x4 + 1
            })
          graphique = mathalea2d({
            xmin: x0 - 1,
            xmax: x4 + 1,
            ymin: Math.min(y2 - 1, y0 - 1, y4 - 1),
            ymax: Math.max(y1 + 1, y3 + 1),
            pixelsParCm: 25,
            scale: 0.7,
            style: 'margin: auto'
          }, r1, o, gr, Tk)
          texte = `  Voici la courbe représentative d'une fonction $${nom}$.<br>
        Dresser son tableau de variations sur son ensemble de définition.<br><br>`
          texte += `${graphique}`

          texteCorr = `La fonction $${nom}$ est définie sur $[${x0}\\,;\\,${x4}]$.<br>
        Son tableau de variations est : <br><br>`
          texteCorr += mathalea2d({ xmin: -0.5, ymin: -7.5, xmax: 30, ymax: 0.1, scale: 0.39 }, tableauDeVariation({
            tabInit: [
              [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 1.5, 10], [`$${nom}(x)$`, 4, 30]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x0}$`, 10, `$${x1}$`, 10, `$${x2}$`, 10, `$${x3}$`, 10, `$${x4}$`, 10]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [['Var', 10, `-/$${y0}$`, 10, `+/$${y1}$`, 10, `-/$${y2}$`, 10, `+/$${y3}$`, 10, `-/$${y4}$`, 10]],
            colorBackground: '',
            espcl: 3, // taille en cm entre deux antécédents
            deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 3, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          })) + '<br>'
          break

        case 'typeE6':// décroissante, croissante, décroissante, croissante
          x0 = randint(-6, -4)
          y0 = randint(3, 5)
          x1 = randint(-2, 1)
          y1 = y0 - randint(5, 8)
          x2 = randint(2, 3)
          y2 = y1 + randint(2, 7)
          x3 = randint(4, 5)
          y3 = y2 - randint(1, 4)
          x4 = randint(7, 8)
          y4 = y3 + randint(1, 5)
          A0 = point(x0, y0)
          A1 = point(x1, y1)
          A2 = point(x2, y2)
          A3 = point(x3, y3)
          A4 = point(x4, y4)
          Tk = tracePoint(A0, A1, A2, A3, A4)
          Tk.epaisseur = 2
          nom = choice(nomF)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          r1 = repere({
            xMin: x0 - 1,
            yMin: Math.min(y1 - 2, y3 - 2),
            yMax: Math.max(y2 + 1, y0 + 1, y4 + 1),
            xMax: x4 + 1,
            xUnite: 1,
            yUnite: 1,
            xThickDistance: 1,
            yThickDistance: 1,
            xLabelMin: x0,
            yLabelMin: y1 - 1,
            yLabelEcart: 0.6,
            grilleXDistance: 1,
            grilleYDistance: 1,
            grilleXMin: x0 - 1,
            grilleYMin: Math.min(y1 - 2, y3 - 2),
            grilleXMax: x4 + 1,
            grilleYMax: Math.max(y2 + 1, y0 + 1, y4 + 1)
          })
          gr = courbeInterpolee(
            [
              [x0, y0], [x1, y1], [x2, y2], [x3, y3], [x4, y4]
            ],
            {
              color: 'blue',
              epaisseur: 2,
              repere: r1,
              xMin: x0 - 1,
              xMax: x4 + 1
            })
          graphique = mathalea2d({
            xmin: x0 - 1,
            xmax: x4 + 1,
            ymin: Math.min(y1 - 2, y3 - 2),
            ymax: Math.max(y2 + 1, y0 + 1, y4 + 1),
            pixelsParCm: 25,
            scale: 0.7,
            style: 'margin: auto'
          }, r1, o, gr, Tk)
          texte = `  Voici la courbe représentative d'une fonction $${nom}$.<br>
        Dresser son tableau de variations sur son ensemble de définition.<br><br>`
          texte += `${graphique}`

          texteCorr = `La fonction $${nom}$ est définie sur $[${x0}\\,;\\,${x4}]$.<br>
        Son tableau de variations est : <br><br>`
          texteCorr += mathalea2d({ xmin: -0.5, ymin: -7.5, xmax: 30, ymax: 0.1, scale: 0.39 }, tableauDeVariation({
            tabInit: [
              [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 1.5, 10], [`$${nom}(x)$`, 4, 30]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x0}$`, 10, `$${x1}$`, 10, `$${x2}$`, 10, `$${x3}$`, 10, `$${x4}$`, 10]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [['Var', 10, `+/$${y0}$`, 10, `-/$${y1}$`, 10, `+/$${y2}$`, 10, `-/$${y3}$`, 10, `+/$${y4}$`, 10]],
            colorBackground: '',
            espcl: 3, // taille en cm entre deux antécédents
            deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 3, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          }))
          break

        case 'typeE7':// avec des grandes valeurs
          if (choice([true, false])) { // croissante, décroissante, croissante
            nom = choice(nomF)
            x0 = randint(0, 10) * 10
            y0 = randint(0, 15) * 2
            x1 = randint(20, 40) * 10
            y1 = randint(20, 50) * 2
            x2 = randint(50, 60) * 10
            y2 = randint(0, 10) * 2
            x3 = randint(70, 80) * 10
            y3 = randint(20, 40) * 2
            A0 = point(x0 * 0.03, y0 * 0.15)
            A1 = point(x1 * 0.03, y1 * 0.15)
            A2 = point(x2 * 0.03, y2 * 0.15)
            A3 = point(x3 * 0.03, y3 * 0.15)

            Tk = tracePoint(A0, A1, A2, A3)
            Tk.epaisseur = 2
            o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)

            r1 = repere({
              xMin: 0,
              yMin: 0,
              yMax: 100,
              xMax: 800,
              xUnite: 0.03,
              yUnite: 0.15,
              xThickDistance: 50,
              yThickDistance: 10,
              xLabelMin: 0,
              yLabelMin: 0,
              yLabelEcart: 1,
              grilleXDistance: 50,
              grilleYDistance: 10,
              grilleXMin: 0,
              grilleYMin: 0,
              grilleXMax: 800,
              grilleYMax: 100,
              grilleSecondaireX: true,
              grilleSecondaireXDistance: 10,
              grilleSecondaireXMin: 0,
              grilleSecondaireXMax: 800,
              grilleSecondaireXOpacite: 0.1,
              grilleSecondaireY: true,
              grilleSecondaireYDistance: 2,
              grilleSecondaireYMin: 0,
              grilleSecondaireYMax: 100,
              grilleSecondaireYOpacite: 0.1
            })

            gr = courbeInterpolee(
              [
                [x0, y0], [x1, y1], [x2, y2], [x3, y3]
              ],
              {
                color: 'blue',
                epaisseur: 2,
                repere: r1,
                xMin: 0,
                xMax: 800
              })

            graphique = mathalea2d({
              xmin: -2,
              xmax: 24,
              ymin: -2,
              ymax: 16,
              pixelsParCm: 20,
              scale: 0.5,
              style: 'margin: auto'
            }
            , r1, o, gr, Tk)
            texte = `  Voici la courbe représentative d'une fonction $${nom}$.<br>
        Dresser son tableau de variations sur son ensemble de définition.<br><br>`
            texte += `${graphique}`

            texteCorr = `La fonction $${nom}$ est définie sur $[${x0}\\,;\\,${x3}]$.<br>
            Son tableau de variations est : <br><br>`
            texteCorr += mathalea2d({ xmin: -0.5, ymin: -7.5, xmax: 30, ymax: 0.1, scale: 0.39 }, tableauDeVariation({
              tabInit: [
                [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                  ['$x$', 1.5, 10], [`$${nom}(x)$`, 4, 30]
                ],
                // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                [`$${x0}$`, 10, `$${x1}$`, 10, `$${x2}$`, 10, `$${x3}$`, 10]
              ],
              // tabLines ci-dessous contient les autres lignes du tableau.
              tabLines: [['Var', 10, `-/$${y0}$`, 10, `+/$${y1}$`, 10, `-/$${y2}$`, 10, `+/$${y3}$`, 10]],
              colorBackground: '',
              espcl: 3, // taille en cm entre deux antécédents
              deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
              lgt: 3, // taille de la première colonne en cm
              hauteurLignes: [15, 15]
            }))
          } else { // décroissante, croissante, décroissante
            nom = choice(nomF)
            x0 = randint(0, 10) * 10
            y0 = randint(20, 40) * 2
            x1 = randint(20, 40) * 10
            y1 = randint(0, 10) * 2
            x2 = randint(50, 60) * 10
            y2 = randint(20, 50) * 2
            x3 = randint(70, 80) * 10
            y3 = randint(0, 15) * 2
            A0 = point(x0 * 0.03, y0 * 0.15)
            A1 = point(x1 * 0.03, y1 * 0.15)
            A2 = point(x2 * 0.03, y2 * 0.15)
            A3 = point(x3 * 0.03, y3 * 0.15)

            Tk = tracePoint(A0, A1, A2, A3)
            Tk.epaisseur = 2
            o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)

            r1 = repere({
              xMin: 0,
              yMin: 0,
              yMax: 100,
              xMax: 800,
              xUnite: 0.03,
              yUnite: 0.15,
              xThickDistance: 50,
              yThickDistance: 10,
              xLabelMin: 0,
              yLabelMin: 0,
              yLabelEcart: 1,
              grilleXDistance: 50,
              grilleYDistance: 10,
              grilleXMin: 0,
              grilleYMin: 0,
              grilleXMax: 800,
              grilleYMax: 100,
              grilleSecondaireX: true,
              grilleSecondaireXDistance: 10,
              grilleSecondaireXMin: 0,
              grilleSecondaireXMax: 800,
              grilleSecondaireXOpacite: 0.1,
              grilleSecondaireY: true,
              grilleSecondaireYDistance: 2,
              grilleSecondaireYMin: 0,
              grilleSecondaireYMax: 100,
              grilleSecondaireYOpacite: 0.1
            })

            gr = courbeInterpolee(
              [
                [x0, y0], [x1, y1], [x2, y2], [x3, y3]
              ],
              {
                color: 'blue',
                epaisseur: 2,
                repere: r1,
                xMin: 0,
                xMax: 800
              })

            graphique = mathalea2d({
              xmin: -2,
              xmax: 24,
              ymin: -2,
              ymax: 16,
              pixelsParCm: 20,
              scale: 0.5,
              style: 'margin: auto'
            }
            , r1, o, gr, Tk)
            texte = `  Voici la courbe représentative d'une fonction $${nom}$.<br>
            Dresser son tableau de variations sur son ensemble de définition.<br><br>`
            texte += `${graphique}`

            texteCorr = `La fonction $${nom}$ est définie sur $[${x0}\\,;\\,${x3}]$.<br>
                Son tableau de variations est : <br><br>`
            texteCorr += mathalea2d({ xmin: -0.5, ymin: -7.5, xmax: 30, ymax: 0.1, scale: 0.39 }, tableauDeVariation({
              tabInit: [
                [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                  ['$x$', 1.5, 10], [`$${nom}(x)$`, 4, 30]
                ],
                // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                [`$${x0}$`, 10, `$${x1}$`, 10, `$${x2}$`, 10, `$${x3}$`, 10]
              ],
              // tabLines ci-dessous contient les autres lignes du tableau.
              tabLines: [['Var', 10, `+/$${y0}$`, 10, `-/$${y1}$`, 10, `+/$${y2}$`, 10, `-/$${y3}$`, 10]],
              colorBackground: '',
              espcl: 3, // taille en cm entre deux antécédents
              deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
              lgt: 3, // taille de la première colonne en cm
              hauteurLignes: [15, 15]
            }))
          }
          break
      }
      if (this.questionJamaisPosee(i, x0, x1, y0)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Choix des questions', 3, '1 : Avec un repère classique\n2 : Avec des grandes valeurs\n3 : Mélange des cas précédents']
}
