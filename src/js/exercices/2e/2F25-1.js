import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes } from '../../modules/outils.js'
import { courbe2, latexParCoordonnees, mathalea2d, point, repere2, segment, tracePoint } from '../../modules/2d.js'

export const titre = 'Propriétés graphiques de la parité d\'une fonction.'

/**
 * Reconnaître parité fonction
* @author Stéphane Guyon
* 2F20
*/
export default function EtudierGraphiqueParite () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.video = ''
  this.consigne = 'Déterminer, par lecture graphique mais en le justifiant, si la fonction $f$ représentée est paire, impaire ou ni paire, ni impaire.'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = []
    typesDeQuestionsDisponibles = [3]

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, A, B, s1, s2, s3, s4, a, b, f, r, x, C, traceAetB, labA1, labB1, labA0, labB0, lA, lB = [], typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]

      switch (typesDeQuestions) {
        case 1:// Cas f(x)=ax+b
          a = randint(-2, 2, [0])
          b = randint(-2, 2, [0])
          r = repere2({ xMin: -7, xMax: 9, yMin: -7, yMax: 7 })
          x = randint(-1, 1, [0]) * 2
          f = x => a * x + b
          C = courbe2(f, { repere: r, step: 0.25 })
          // C.color = 'red'
          // C.epaisseur = 2
          B = point(x, a * x + b)
          A = point(-x, -a * x + b)

          labA0 = latexParCoordonnees('-x', -x, 0.8 * (a > 0 ? 1 : -1), 'red', 20, 10, 'white', 8)
          labB0 = latexParCoordonnees('x', x, 0.8 * (a > 0 ? -1 : 1), 'red', 20, 10, 'white', 8)
          lA = latexParCoordonnees('M\'', -x - 1.1, -a * x + b, 'red', 15, 10, 'white', 6)
          lB = latexParCoordonnees('M', x - 1.1, a * x + b, 'red', 15, 10, 'white', 6)
          labA1 = latexParCoordonnees('f(-x)', 0.5, -a * x + b, 'red', 30, 10, 'white', 8)
          labB1 = latexParCoordonnees('f(x)', -1.5, a * x + b, 'red', 25, 10, 'white', 8)
          traceAetB = tracePoint(A, B, 'red') // Variable qui trace les points avec une croix
          traceAetB.taille = 4
          traceAetB.epaisseur = 2

          texte = mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, r, C)
          texteCorr = 'On observe que la représentation graphique n\'admet pas l\'axe des ordonnées comme axe de symétries,'
          texteCorr += ' ni l\'origine comme centre de symétrie.<br> '
          texteCorr += `Prenons par exemple un point $M$ de la courbe, d'abscisse $${x}$, et `
          texteCorr += ` le point $M'$ aussi de la courbe, mais d'abscisse opposée : $${-x}$. <br>`
          texteCorr += `Les coordonnées sont $M(${x};${a * x + b})$ et  $M'(${-x};${-a * x + b})$. <br>`
          texteCorr += 'On observe bien que ces deux points ont des ordonnées ni égales, ni opposées.<br>'
          texteCorr += 'La fonction représentée est donc ni paire, ni impaire.<br>'

          texteCorr += mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, r, C, lA, lB, traceAetB)

          break
        case 2:// Cas f(x)=ax
          a = randint(-2, 2, [0])
          r = repere2({ xMin: -7, xMax: 9, yMin: -7, yMax: 7 })
          x = randint(2, 3, [0])
          f = x => a * x
          C = courbe2(f, { repere: r, step: 0.25 })
          // C.color = 'red'
          // C.epaisseur = 2
          B = point(x, a * x)
          A = point(-x, -a * x)
          labA0 = latexParCoordonnees('-x', -x - 0.2, 0.8 * (a > 0 ? 1 : -1), 'red', 20, 10, 'white', 8)
          labB0 = latexParCoordonnees('x', x, 0.8 * (a > 0 ? -1 : 1), 'red', 20, 10, 'white', 8)
          lA = latexParCoordonnees('M\'', -x - 1, -a * x, 'red', 15, 10, 'white', 7)
          lB = latexParCoordonnees('M', x + 1, a * x, 'red', 15, 10, 'white', 7)
          labA1 = latexParCoordonnees('f(-x)', 1.2, -a * x + 0.2, 'red', 30, 10, '', 8)
          labB1 = latexParCoordonnees('f(x)', -2, a * x + 0.2, 'red', 25, 10, '', 8)
          traceAetB = tracePoint(A, B, 'red') // objet qui contient les croix des points
          s1 = segment(x, a * x, x, 0, 'red')
          s2 = segment(-x, -a * x, -x, 0, 'red')
          s3 = segment(-x, -a * x, 0, -a * x, 'red')
          s4 = segment(x, a * x, 0, a * x, 'red')
          s1.pointilles = true
          s2.pointilles = true
          s3.pointilles = true
          s4.pointilles = true
          s1.epaisseur = 2
          s2.epaisseur = 2
          s3.epaisseur = 2
          s4.epaisseur = 2
          traceAetB.taille = 4
          traceAetB.epaisseur = 2

          texte = mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, r, C)
          texteCorr = 'On observe que la représentation graphique admet l\'origine comme centre de symétrie.<br> '
          texteCorr += 'Prenons un point $M$ de la courbe, d\'abscisse $x$, et '
          texteCorr += 'le point $M\'$ aussi de la courbe, mais d\'abscisse opposée : $-x$. <br>'
          texteCorr += 'Les coordonnées sont $M(x;f(x))$ et  $M\'(-x;f(-x))$. <br>'
          texteCorr += 'On observe bien que ces deux points qui ont des abscisses opposées, ont aussi des ordonnées opposées.<br>'
          texteCorr += 'La fonction représentée est impaire.<br>'

          texteCorr += mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, r, C, lA, lB, traceAetB, labB0, labB1, labA1, s1, s2, s3, s4, labA0)
          break
        case 3:// Cas f(x)=ax^2
          a = randint(-12, 12, [0])
          b = randint(1, 5)
          if (a > 0) { b = -b }
          a = a / 10
          r = repere2({ xMin: -4, xMax: 4, yMin: -9, yMax: 9, xUnite: 2, yUnite: 1 })
          x = randint(1, 2.5)
          f = x => a * x * x + b
          C = courbe2(f, { repere: r })
          // C.color = 'red'
          // C.epaisseur = 2
          B = point(x, a * x * x + b)
          A = point(-x, a * x * x + b)
          labA0 = latexParCoordonnees('-x', -x - 0.2, 0.8 * (a > 0 ? 1 : -1), 'red', 20, 10, 'white', 8)
          labB0 = latexParCoordonnees('x', x, 0.8 * (a > 0 ? -1 : 1), 'red', 20, 10, 'white', 8)
          lA = latexParCoordonnees('M\'', -x - 1, a * x * x + b, 'red', 15, 10, 'white', 7)
          lB = latexParCoordonnees('M', x + 1, a * x * x + b, 'red', 15, 10, 'white', 7)
          labA1 = latexParCoordonnees('f(-x)', 1.2, a * x * x + b + 0.2, 'red', 30, 10, '', 8)
          labB1 = latexParCoordonnees('f(x)', -2, a * x * x + b + 0.2, 'red', 25, 10, '', 8)
          traceAetB = tracePoint(A, B, 'red') // objet qui contient les croix des points
          s1 = segment(x, a * x * x + b, x, 0, 'red')
          s2 = segment(-x, a * x * x + b, -x, 0, 'red')
          s3 = segment(-x, a * x * x + b, 0, a * x * x + b, 'red')
          s4 = segment(x, a * x * x+ b, 0, a * x * x + b, 'red')
          s1.pointilles = true
          s2.pointilles = true
          s3.pointilles = true
          s4.pointilles = true
          s1.epaisseur = 2
          s2.epaisseur = 2
          s3.epaisseur = 2
          s4.epaisseur = 2
          traceAetB.taille = 4
          traceAetB.epaisseur = 2

          texte = mathalea2d({ xmin: -4, xmax: 4, ymin: -9, ymax: 9 }, r, C)
          texteCorr = 'On observe que la représentation graphique admet les ordonnées comme axe de symétrie.<br> '
          texteCorr += 'Prenons un point $M$ de la courbe, d\'abscisse $x$, et '
          texteCorr += 'le point $M\'$ aussi de la courbe, mais d\'abscisse opposée : $-x$. <br>'
          texteCorr += 'Les coordonnées sont $M(x;f(x))$ et  $M\'(-x;f(-x))$. <br>'
          texteCorr += 'On observe bien que ces deux points qui ont des abscisses opposées, ont des ordonnées égales.<br>'
          texteCorr += 'La fonction représentée est impaire.<br>'

          texteCorr += mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, r, C, lA, lB, traceAetB, labB0, labB1, labA1, s1, s2, s3, s4, labA0)
          break
      }

      if (this.questionJamaisPosee(i, a, b)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
