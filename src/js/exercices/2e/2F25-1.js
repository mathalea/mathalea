import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, reduireAxPlusB } from '../../modules/outils.js'
import { courbe2, mathalea2d, repere2 } from '../../modules/2d.js'

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
  this.consigne = 'Déterminer, par lecture graphique mais en expliquant, si la fonction $f$ représentée est paire, impaire ou ni paire, ni impaire.'
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
    for (let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, e, f, k, r, C = [], typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]

      switch (typesDeQuestions) {
        case 1:// Cas f(x)=ax+b
          a = randint(-2, 2)
          b = randint(-2, 2)
          c = randint(-8, 8, [0])
          r = repere2({ xMin: -7, xMax: 9, yMin: -7, yMax: 7 })
          C = courbe2(f, { repere: r, step: 0.25 })
          f = x => a * x + b
          texte = mathalea2d({ xmin: -7.5, xmax: 9.5, ymin: -7.5, ymax: 7.5, scale: 0.6 }, r, C)
          texteCorr = `<b>a.</b> On étudie la partité de la fonction $f$, définie sur  $D=\\mathbb{R}$ par $f(x)=${reduireAxPlusB(a, b)}$.<br>`

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
