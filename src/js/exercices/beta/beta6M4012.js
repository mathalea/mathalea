import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, contraindreValeur } from '../../modules/outils.js'
import { latexParCoordonnees, mathalea2d, point, polygone, segment, texteParPosition } from '../../modules/2d.js'
export const dateDePublication = '09/04/2022'
export const titre = 'Problèmes d\'aires de rectangles'

export default function ProblemesAiresRectangles () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.consigne = "Trouver la longueur désignée par un point d'interrogation."
  this.nbQuestions = 1
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 5
  this.sup2 = 2
  function rangeLesLongeurs (longueursHorizontales, longueursVerticales) {
    const longueursPossibles = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5]
    let tableau = longueursHorizontales.concat(longueursVerticales)
    tableau = tableau.sort((a, b) => a - b)
    for (let i = 0; i < tableau.length - 1; i++) { // On élimine les doublons
      if (tableau[i] === tableau[i + 1]) tableau.splice(i, 1)
    }
    const liste = new Set() // liste contiendra un objet qui renseigne sur la taille affichée de chacun des segments horizontaux et verticaux.
    for (let i = 0; i < 4; i++) {
      liste.add({ type: 'h', indice: i, longueur: longueursPossibles[tableau.indexOf(longueursHorizontales[i])] })
      liste.add({ type: 'v', indice: i, longueur: longueursPossibles[tableau.indexOf(longueursVerticales[i])] })
    }
    return liste
  }
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    let typesDeQuestionsDisponibles
    if (this.sup2 === 1) typesDeQuestionsDisponibles = [2, 3, 4, 5, 6, 7, 8, 9]
    else typesDeQuestionsDisponibles = [3, 4, 6, 7, 8, 9, 11, 12]

    let objetsEnonce, objetsCorrection, paramsEnonce, paramsCorrection
    for (let q = 0, cpt = 0, texte, texteCorr; q < this.nbQuestions && cpt < 50;) {
      objetsEnonce = []
      objetsCorrection = []

      const longueursHorizontales = [choice(typesDeQuestionsDisponibles)]
      for (let i = 1; i < 4; i++) longueursHorizontales.push(choice(typesDeQuestionsDisponibles, longueursHorizontales))
      const longueursVerticales = [choice(typesDeQuestionsDisponibles)]
      for (let i = 1; i < 4; i++) longueursVerticales.push(choice(typesDeQuestionsDisponibles, longueursVerticales))
      const listeDeTailles = rangeLesLongeurs(longueursHorizontales, longueursVerticales)
      const listeEcartsHorizontaux = []
      const listeEcartsVerticaux = []
      for (const item of listeDeTailles) { // on récupère les dimensions affichées des rectangles
        if (item.type === 'h') listeEcartsHorizontaux.push(item.longueur)
        else listeEcartsVerticaux.push(item.longueur)
      }
      const xBordures = [0]
      const yBordures = [0]
      for (let i = 0; i < 4; i++) {
        xBordures.push(xBordures[i] + listeEcartsHorizontaux[i])
        yBordures.push(yBordures[i] + listeEcartsVerticaux[i])
      }
      /*
      const noeuds = []
      for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
          noeuds.push(point(xBordures[i], yBordures[j]))
        }
      }
      */
      const rectangles = []
      for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
          rectangles.push(polygone([point(xBordures[i], yBordures[j]), point(xBordures[i + 1], yBordures[j]), point(xBordures[i + 1], yBordures[j + 1]), point(xBordures[i], yBordures[j + 1])], 'black'))
        }
      }
      let segTemp
      for (let i = 0; i < 5; i++) {
        segTemp = segment(xBordures[i], 0, xBordures[i], yBordures[4])
        segTemp.pointilles = true
        objetsEnonce.push(segTemp)
        segTemp = segment(0, yBordures[i], xBordures[4], yBordures[i])
        segTemp.pointilles = true
        objetsEnonce.push(segTemp)
      }
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

      const nombreTotalEtapes = contraindreValeur(1, 8, parseInt(this.sup), 8)
      let x, y, index
      const listeCellules = []
      for (let etape = 0; etape <= nombreTotalEtapes;) {
        switch (alternance) {
          case 'colonne':
            do {
              index = randint(0, 3)
            }
            while (!colonneDisponible[index])
            x = index
            colonneDisponible[index] = false
            if (etape === 0) {
              objetsEnonce.push(texteParPosition(longueursHorizontales[x].toString() + ' cm', (xBordures[x] + xBordures[x + 1]) / 2, yBordures[4] + 1, 'milieu', 'black', 2, 'middle', true))
            } else {
              listeCellules.push([x, y])
              objetsEnonce.push(latexParCoordonnees(aires[x][y].toString() + '\\text{ cm}^2', (xBordures[x] + xBordures[x + 1]) / 2, (yBordures[y] + yBordures[y + 1]) / 2 + 0.5, 'black', 30, 12, '', 16))
              objetsEnonce.push(latexParCoordonnees(`\\fcolorbox{black}{pink}{${etape.toString()}}`, (xBordures[x] + xBordures[x + 1]) / 2, (yBordures[y] + yBordures[y + 1]) / 2 - 0.5, 'black', 30, 12, '', 16))
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
              objetsEnonce.push(texteParPosition(longueursVerticales[index].toString() + ' cm', -1, (yBordures[y] + yBordures[y + 1]) / 2, 'milieu', 'black', 2, 'middle', true))
            } else {
              listeCellules.push([x, y])
              objetsEnonce.push(latexParCoordonnees(aires[x][y].toString() + '\\text{ cm}^2', (xBordures[x] + xBordures[x + 1]) / 2, (yBordures[y] + yBordures[y + 1]) / 2 + 0.5, 'black', 30, 12, '', 16))
            }
            alternance = 'colonne'
            break
        }
        etape++
      }
      if (alternance === 'ligne') {
        objetsEnonce.push(texteParPosition('?', (xBordures[x] + xBordures[x + 1]) / 2, yBordures[4] + 0.5, 'milieu', 'red', 2, 'middle', false))
      } else {
        objetsEnonce.push(texteParPosition('?', xBordures[4] + 0.5, (yBordures[y] + yBordures[y + 1]) / 2, 'milieu', 'red', 2, 'middle', false))
      }
      let numeroteur = 0
      for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
          if (listeCellules.find(el => el[0] === i && el[1] === j)) {
            rectangles[i + 4 * j].isVisible = true
            objetsEnonce.push(rectangles[i + 4 * j])
            objetsEnonce.push(latexParCoordonnees(`\\fcolorbox{black}{pink}{${(numeroteur + 1).toString()}}`, (xBordures[i] + xBordures[i + 1]) / 2, (yBordures[j] + yBordures[j + 1]) / 2 - 0.5, 'black', 30, 12, '', 16))
            numeroteur++
          }
        }
      }
      console.log(listeCellules, objetsEnonce)
      paramsEnonce = { xmin: -3.5, ymin: -0.5, xmax: xBordures[4] + 1.5, ymax: yBordures[4] + 1.5, pixelsParCm: 30, scale: 1, mainlevee: false }
      // paramsCorrection = { xmin: -2.5, ymin: -2.5, xmax: 20, ymax: 20, pixelsParCm: 30, scale: 1, mainlevee: false }
      texte = mathalea2d(paramsEnonce, objetsEnonce)
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
