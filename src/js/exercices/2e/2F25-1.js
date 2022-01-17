import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, reduireAxPlusB } from '../../modules/outils.js'
import { courbe2, labelPoint, mathalea2d, point, repere2, segment, tracePoint } from '../../modules/2d.js'

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
    typesDeQuestionsDisponibles = [2]

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, A, B, A0, B0, A1, B1, s1, s2, s3, s4, a, b, c, d, e, f, k, r, x, C, tA, tB, tA0, tB0, tA1, tB1, lA1, lB1, lA0, lB0, lA, lB = [], typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]

      switch (typesDeQuestions) {
        case 1:// Cas f(x)=ax+b
          a = randint(-2, 2, [0])
          b = randint(-2, 2, [0])
          c = randint(-8, 8, [0])
          r = repere2({ xMin: -7, xMax: 9, yMin: -7, yMax: 7 })
          x = randint(-2, 2, [0])
          f = x => a * x + b
          C = courbe2(f, { repere: r, step: 0.25 })
          // C.color = 'red'
          // C.epaisseur = 2
          B = point(x, a * x + b, 'M')
          A = point(-x, -a * x + b, 'M\'')

          tA = tracePoint(A, 'red') // Variable qui trace les points avec une croix
          tB = tracePoint(B, 'red') // Variable qui trace les points avec une croix
          lA = labelPoint(A, 'red')// Variable qui trace les nom s A et B
          lB = labelPoint(B, 'red')// Variable qui trace les nom s A et B

          tA.taille = 5
          tA.epaisseur = 2

          tB.taille = 5
          tB.epaisseur = 2
          texte = mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, r, C)
          texteCorr = 'On observe que la représentation graphique n\'admet pas l\'axe des ordonnées comme axe de symétries,'
          texteCorr += ' ni l\'origine comme centre de symétrie.<br> '
          texteCorr += `Prenons par exemple un point $M$ de la courbe, d'abscisse $${x}$, et `
          texteCorr += ` le point $M'$ aussi de la courbe, mais d'abscisse opposée : $${-x}$. <br>`
          texteCorr += `Les coordonnées sont $M(${x};${a * x + b})$ et  $M'(${-x};${-a * x + b})$. <br>`
          texteCorr += 'On observe bien que ces deux points ont des ordonnées ni égales, ni opposées.<br>'
          texteCorr += 'La fonction représentée est donc ni paire, ni impaire.<br>'

          texteCorr += mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, lA, lB, tA, tB, r, C)

          break
        case 2:// Cas f(x)=ax
          a = randint(-2, 2, [0])
          b = 0
          c = randint(-8, 8, [0])
          r = repere2({ xMin: -7, xMax: 9, yMin: -7, yMax: 7 })
          x = randint(2, 3, [0])
          f = x => a * x + b
          C = courbe2(f, { repere: r, step: 0.25 })
          // C.color = 'red'
          // C.epaisseur = 2
          B = point(x, a * x + b, 'M','right')
          A = point(-x, -a * x + b, 'M\'','left')
          A0 = point(-x, 0, '-x')
          B0 = point(x, 0, 'x','left')
          A1 = point(0, -a * x, '$f(-x)$', 'right')
          B1 = point(0, a * x, '$f(x)$','left')
          tA0 = tracePoint(A0, 'red')
          tA1 = tracePoint(A1, 'red')
          tB1 = tracePoint(B1, 'red')
          tB0 = tracePoint(B0, 'red')
          tA = tracePoint(A, 'red') // Variable qui trace les points avec une croix
          tB = tracePoint(B, 'red') // Variable qui trace les points avec une croix
          lA = labelPoint(A, 'red')// Variable qui trace les nom s A et B
          lB = labelPoint(B, 'red')// Variable qui trace les nom s A et B
          lB0 = labelPoint(B0, 'red')// Variable qui trace les nom s A et B
          lA0 = labelPoint(A0, 'red')// Variable qui trace les nom s A et B
          lA1 = labelPoint(A1, 'red')// Variable qui trace les nom s A et B
          lB1 = labelPoint(B1, 'red')// Variable qui trace les nom s A et B
          s1 = segment(B, B0, 'red')
          s2 = segment(A, A0, 'red')
          s3 = segment(A, A1, 'red')
          s4 = segment(B, B1, 'red')
          s1.pointilles = true
          s2.pointilles = true
          s3.pointilles = true
          s4.pointilles = true
          s1.epaisseur = 3
          s2.epaisseur = 3
          s3.epaisseur = 3
          s4.epaisseur = 3
          tA.taille = 5
          tA.epaisseur = 2

          tB.taille = 5
          tB.epaisseur = 2
          texte = mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, r, C)
          texteCorr = 'On observe que la représentation graphique admet l\'origine comme centre de symétrie.<br> '
          texteCorr += 'Prenons un point $M$ de la courbe, d\'abscisse $x$, et '
          texteCorr += 'le point $M\'$ aussi de la courbe, mais d\'abscisse opposée : $-x$. <br>'
          texteCorr += 'Les coordonnées sont $M(x;f(x))$ et  $M\'(-x;f(-x))$. <br>'
          texteCorr += 'On observe bien que ces deux points qui ont des abscisses opposées, ont aussi des ordonnées opposées.<br>'
          texteCorr += 'La fonction représentée est impaire.<br>'

          texteCorr += mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, lA, lB, tA, tB, lA0, lB0, tA0, tB0, tB1, tA1, lB1, lA1, r, C, s1, s2, s3, s4)

          break
      }

      if (this.questionJamaisPosee(i, k, a, b, c, d, e)) {
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
