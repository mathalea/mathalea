import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, reduireAxPlusB } from '../../modules/outils.js'
import { courbe2, labelPoint, mathalea2d, point, repere2, tracePoint } from '../../modules/2d.js'

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
    typesDeQuestionsDisponibles = [1]

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, A, B, a, b, c, d, e, f, k, r, x, C, tA, tB, lA, lB = [], typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
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
          texteCorr += `le point $M'$ aussi de la courbe, mais d'abscisse opposée : $${-x}$. <br>`
          texteCorr += `Les coordonnées sont $M(${x};${a * x + b})$ et  $M'(${-x};${-a * x + b})$. <br>`
          texteCorr += 'On observe bien que ces deux points ont des ordonnées ni égales, ni opposées.<br>'
          texteCorr += 'La fonction représentée est donc ni paire, ni impaire.<br>'

          texteCorr += mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, lA, lB, tA, tB, r, C)

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
