import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, contraindreValeur } from '../../modules/outils.js'
import { latexParPoint, mathalea2d, point, segment, texteParPoint, tracePoint } from '../../modules/2d.js'

export const titre = 'Problèmes d\'aires de rectangles'

export default function ProblemesAiresRectangles () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.consigne = "Trouver la valuer désignée par un point d'interrogation."
  this.nbQuestions = 1
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    let typesDeQuestionsDisponibles
    if (this.sup2 === 1) typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7]
    else typesDeQuestionsDisponibles = [3, 4, 5, 6, 7, 8, 9]

    let objetsEnonce, objetsCorrection, paramsEnonce, paramsCorrection
    for (let q = 0, cpt = 0, texte, texteCorr; q < this.nbQuestions && cpt < 50;) {
      objetsEnonce = []
      objetsCorrection = []
      for (let i = 0; i < 5; i++) {
        objetsEnonce.push(segment(0, i * 5, 20, i * 5))
        objetsEnonce.push(segment(i * 5, 0, i * 5, 20))
      }
      const longueursHorizontales = [choice(typesDeQuestionsDisponibles)]
      for (let i = 1; i < 4; i++) longueursHorizontales.push(choice(typesDeQuestionsDisponibles, longueursHorizontales))
      const longueursVerticales = [choice(typesDeQuestionsDisponibles)]
      for (let i = 1; i < 4; i++) longueursVerticales.push(choice(typesDeQuestionsDisponibles, longueursVerticales))
      const aires = []
      for (let x = 0; x < 4; x++) {
        aires[x] = []
        for (let y = 0; y < 4; y++) {
          aires[x].push(longueursHorizontales[x] * longueursVerticales[y])
        }
      }
      const colonneDisponible = [true, true, true, true]
      const ligneDisponible = [true, true, true, true]
      let alternance = choice(['colonne', 'ligne'])

      const nombreTotalEtapes = contraindreValeur(1, 7, parseInt(this.sup), 7)
      let x, y, index
      for (let etape = 0, X; etape <= nombreTotalEtapes;) {
        switch (alternance) {
          case 'colonne':
            do {
              index = randint(0, 3)
            }
            while (!colonneDisponible[index])
            x = index
            colonneDisponible[index] = false
            if (etape === 0) {
              X = point(x * 5 + 2.5, 21)
              objetsEnonce.push(texteParPoint(longueursHorizontales[index].toString() + ' cm', X, 'milieu', 'black', 2, 'middle', true))
            } else {
              X = point(x * 5 + 2.5, 17.5 - y * 5)
              objetsEnonce.push(latexParPoint(aires[x][y].toString() + '\\text{ cm}^2', X, 'black', 30, 0, '', 16))
            }
            alternance = 'ligne'
            break
          case 'ligne':
            do {
              index = randint(0, 3)
            }
            while (!ligneDisponible[index])
            y = index
            ligneDisponible[index] = false
            if (etape === 0) {
              X = point(-1, 17.5 - y * 5)
              objetsEnonce.push(texteParPoint(longueursVerticales[index].toString() + ' cm', X, 'milieu', 'black', 2, 'middle', true))
            } else {
              X = point(x * 5 + 2.5, 17.5 - y * 5)
              objetsEnonce.push(latexParPoint(aires[x][y].toString() + '\\text{ cm}^2', X, 'black', 30, 0, '', 16))
            }
            alternance = 'colonne'
            break
        }
        etape++
      }
      objetsEnonce.push(tracePoint(point(10, 10), 'A'))
      paramsEnonce = { xmin: -3.5, ymin: -2.5, xmax: 22, ymax: 22, pixelsParCm: 30, scale: 1, mainlevee: false }
      // paramsCorrection = { xmin: -2.5, ymin: -2.5, xmax: 20, ymax: 20, pixelsParCm: 30, scale: 1, mainlevee: false }
      texte = mathalea2d(paramsEnonce, ...objetsEnonce)
      texteCorr = ''// mathalea2d(paramsCorrection, objetsCorrection)
      if (this.questionJamaisPosee(q, ...longueursHorizontales, ...longueursVerticales)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireNumerique = ['Nombre d\'étapes (de 1 à 7)', 7]
  this.besoinFormulaire2Numerique = ['Difficulté', 2, '1 : facile\n2 : difficile']
}
