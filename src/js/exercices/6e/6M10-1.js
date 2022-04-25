import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, contraindreValeur, combinaisonListes, texteExposant, texNombre, texteEnCouleurEtGras, miseEnEvidence, stringNombre, arrondi } from '../../modules/outils.js'
import { latexParCoordonnees, mathalea2d, point, polygone, segment, texteParPositionEchelle } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import Grandeur from '../../modules/Grandeur.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const dateDePublication = '09/04/2022'
export const titre = 'Problèmes d\'aires de rectangles'
export const interactifReady = true
export const interactifType = 'mathLive'

export default function ProblemesAiresRectangles () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.consigne = "Trouver la  mesure désignée par un point d'interrogation."
  this.nbQuestions = 1
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = '5-5-5-5-5'
  this.sup2 = 2
  this.sup4 = 1
  this.sup3 = true
  this.spacingCorr = context.isHtml ? 3 : 2
  function rangeLesLongeurs (longueursHorizontales, longueursVerticales, typeDeGrille) {
    const longueursPossibles = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5]
    let tableau = longueursHorizontales.concat(longueursVerticales)
    tableau = tableau.sort((a, b) => a - b)
    for (let i = 0; i < tableau.length - 1; i++) { // On élimine les doublons
      if (tableau[i] === tableau[i + 1]) tableau.splice(i, 1)
    }
    const liste = new Set() // liste contiendra un objet qui renseigne sur la taille affichée de chacun des segments horizontaux et verticaux.
    for (let i = 0; i < typeDeGrille[0]; i++) {
      liste.add({ type: 'h', indice: i, longueur: longueursPossibles[tableau.indexOf(longueursHorizontales[i])] })
    }
    for (let i = 0; i < typeDeGrille[1]; i++) {
      liste.add({ type: 'v', indice: i, longueur: longueursPossibles[tableau.indexOf(longueursVerticales[i])] })
    }
    return liste
  }
  function choisitFormatGrille (nombreEtapes) {
    switch (nombreEtapes) {
      case 1:
        return [1, 1]
      case 2:
        return choice([true, false]) ? [2, 1] : [1, 2]
      case 3:
        return [2, 2]
      case 4:
        return choice([true, false]) ? [2, 3] : [3, 2]
      case 5:
        return [3, 3]
      case 6:
        return choice([true, false]) ? [3, 4] : [4, 3]
      case 7:
        return [4, 4]
    }
  }
  function choisitLongueurs (tables, typeDeGrille) {
    const longueursHorizontales = [choice(tables)]
    for (let i = 1; i < typeDeGrille[0]; i++) longueursHorizontales.push(choice(tables, longueursHorizontales))
    const longueursVerticales = [choice(tables)]
    for (let i = 1; i < typeDeGrille[1]; i++) longueursVerticales.push(choice(tables, longueursVerticales))
    return [longueursHorizontales, longueursVerticales]
  }
  function fixeBordures (listeDeTailles, typeDeGrille) {
    const listeEcartsHorizontaux = []
    const listeEcartsVerticaux = []
    for (const item of listeDeTailles) { // on récupère les dimensions affichées des rectangles
      if (item.type === 'h') listeEcartsHorizontaux.push(item.longueur)
      else listeEcartsVerticaux.push(item.longueur)
    }
    const xBordures = [0] // tableau des coordonnées des bordures verticales
    const yBordures = [0] // tableau des coordonnées des bordures horizontales
    for (let i = 0; i < typeDeGrille[0]; i++) {
      xBordures.push(xBordures[i] + listeEcartsHorizontaux[i])
    }
    for (let i = 0; i < typeDeGrille[1]; i++) {
      yBordures.push(yBordures[i] + listeEcartsVerticaux[i])
    }
    return [xBordures, yBordures]
  }
  function creeRectangles (typeDeGrille, xBordures, yBordures) {
    const rectangles = []
    for (let i = 0; i < typeDeGrille[0]; i++) {
      rectangles[i] = []
      for (let j = 0; j < typeDeGrille[1]; j++) {
        rectangles[i].push(polygone([point(xBordures[i], yBordures[j]), point(xBordures[i + 1], yBordures[j]), point(xBordures[i + 1], yBordures[j + 1]), point(xBordures[i], yBordures[j + 1])], 'black'))
      }
    }
    return rectangles
  }
  function calculAires (typeDeGrille, longueursHorizontales, longueursVerticales) {
    const aires = []
    for (let x = 0; x < typeDeGrille[0]; x++) {
      aires[x] = []
      for (let y = 0; y < typeDeGrille[1]; y++) {
        aires[x].push(longueursHorizontales[x] * longueursVerticales[y])
      }
    }
    return aires
  }
  function dessineGrille (typeDeGrille, xBordures, yBordures) {
    let segTemp
    const objets = []
    for (let i = 0; i < typeDeGrille[0] + 1; i++) {
      segTemp = segment(xBordures[i], 0, xBordures[i], yBordures[typeDeGrille[1]])
      segTemp.pointilles = true
      objets.push(segTemp)
    }
    for (let i = 0; i < typeDeGrille[1] + 1; i++) {
      segTemp = segment(0, yBordures[i], xBordures[typeDeGrille[0]], yBordures[i])
      segTemp.pointilles = true
      objets.push(segTemp)
    }
    return objets
  }

  function dessineCheminAires (objetsEnonce, rectangles, typeDeGrille, longueursHorizontales, longueursVerticales, aires, xBordures, yBordures, nombreTotalEtapes, etapeAireInconnue) {
    const colonneDisponible = Array(typeDeGrille[0]).fill(true)
    const ligneDisponible = Array(typeDeGrille[1]).fill(true)
    let alternance
    // const etapeAireInconnue = Math.floor((nombreTotalEtapes + 1) / 2)
    if (typeDeGrille[0] < typeDeGrille[1]) alternance = 'ligne'
    else if (typeDeGrille[0] > typeDeGrille[1]) alternance = 'colonne'
    else alternance = choice(['colonne', 'ligne'])
    let x, y, index
    const listeCellules = []
    for (let etape = 0; etape <= nombreTotalEtapes;) {
      switch (alternance) {
        case 'colonne':
          do {
            index = randint(0, typeDeGrille[0] - 1)
          }
          while (!colonneDisponible[index])
          x = index
          colonneDisponible[index] = false
          if (etape === 0) {
            objetsEnonce.push(texteParPositionEchelle(stringNombre(longueursHorizontales[x]) + ' cm', (xBordures[x] + xBordures[x + 1]) / 2, yBordures[typeDeGrille[1]] + 0.65, 'milieu', 'black', 1, 'middle', false, 0.5))
          } else {
            listeCellules.push([x, y])
            if (etape === etapeAireInconnue) {
              objetsEnonce.push(latexParCoordonnees('?', (xBordures[x] + xBordures[x + 1]) / 2, (yBordures[y] + yBordures[y + 1]) / 2 + 0.65, 'red', 30, 10, '', 30))
            } else {
              objetsEnonce.push(latexParCoordonnees(texNombre(aires[x][y]) + '\\text{ cm}^2', (xBordures[x] + xBordures[x + 1]) / 2, (yBordures[y] + yBordures[y + 1]) / 2 + 0.65, 'black', 30, 10, '', 10))
            }
          }
          alternance = 'ligne'
          break
        case 'ligne':
          do {
            index = randint(0, typeDeGrille[1] - 1)
          }
          while (!ligneDisponible[index])
          y = index
          ligneDisponible[index] = false
          if (etape === 0) {
            objetsEnonce.push(texteParPositionEchelle(stringNombre(longueursVerticales[index]) + ' cm', -1, (yBordures[y] + yBordures[y + 1]) / 2, 'milieu', 'black', 1, 'middle', false, 0.5))
          } else {
            listeCellules.push([x, y])
            if (etape === etapeAireInconnue) {
              objetsEnonce.push(latexParCoordonnees('?', (xBordures[x] + xBordures[x + 1]) / 2, (yBordures[y] + yBordures[y + 1]) / 2 + 0.65, 'red', 30, 10, '', 30))
            } else {
              objetsEnonce.push(latexParCoordonnees(texNombre(aires[x][y]) + '\\text{ cm}^2', (xBordures[x] + xBordures[x + 1]) / 2, (yBordures[y] + yBordures[y + 1]) / 2 + 0.65, 'black', 30, 10, '', 10))
            }
          }
          alternance = 'colonne'
          break
      }
      etape++
    }
    if (etapeAireInconnue) {
      if (alternance === 'ligne') {
        objetsEnonce.push(texteParPositionEchelle(longueursHorizontales[index].toString() + ' cm', (xBordures[x] + xBordures[x + 1]) / 2, yBordures[typeDeGrille[1]] + 1, 'milieu', 'black', 1, 'middle', true, 0.5))
      } else {
        objetsEnonce.push(texteParPositionEchelle(longueursVerticales[index].toString() + ' cm', xBordures[typeDeGrille[0]] + 1, (yBordures[y] + yBordures[y + 1]) / 2, 'milieu', 'black', 1, 'middle', true, 0.5))
      }
    } else {
      if (alternance === 'ligne') {
        objetsEnonce.push(texteParPositionEchelle('?', (xBordures[x] + xBordures[x + 1]) / 2, yBordures[typeDeGrille[1]] + 1, 'milieu', 'red', 2, 'middle', false, 0.7))
      } else {
        objetsEnonce.push(texteParPositionEchelle('?', xBordures[typeDeGrille[0]] + 1, (yBordures[y] + yBordures[y + 1]) / 2, 'milieu', 'red', 2, 'middle', false, 0.7))
      }
    }
    let numeroteur = 0
    for (let j = 0; j < typeDeGrille[1]; j++) {
      for (let i = 0; i < typeDeGrille[0]; i++) {
        if (listeCellules.find(el => el[0] === i && el[1] === j)) {
          rectangles[i][j].isVisible = true
          rectangles[i][j].numero = numeroteur + 1
          objetsEnonce.push(rectangles[i][j])
          objetsEnonce.push(latexParCoordonnees(`\\fcolorbox{black}{pink}{${(numeroteur + 1).toString()}}`, (xBordures[i] + xBordures[i + 1]) / 2, (yBordures[j] + yBordures[j + 1]) / 2 - 0.65, 'black', 30, 10, '', 10))
          numeroteur++
        }
      }
    }
    const paramsEnonce = { xmin: -3.5, ymin: -0.5, xmax: xBordures[typeDeGrille[0]] + 2.5, ymax: yBordures[typeDeGrille[1]] + 2, pixelsParCm: 30, scale: 0.7, mainlevee: false }
    const texte = mathalea2d(paramsEnonce, objetsEnonce)
    return [texte, alternance, numeroteur, listeCellules]
  }
  function redigeCorrection (rectangles, longueursHorizontales, longueursVerticales, aires, nombreTotalEtapes, etapeAireInconnue, alternance, numeroteur, listeCellules) {
    let texteCorr = ''
    let reponse
    let colonneOuLigne
    if ((alternance === 'ligne' && numeroteur % 2 === 0) || (alternance === 'colonne' && numeroteur % 2 === 1)) colonneOuLigne = true
    else colonneOuLigne = false
    if (etapeAireInconnue) {
      texteCorr = 'D\'une part :<br>'
      ;[texteCorr, colonneOuLigne] = etapesDeUnAEtapeInconnue(texteCorr, longueursHorizontales, longueursVerticales, listeCellules, rectangles, aires, etapeAireInconnue - 1, colonneOuLigne)
      texteCorr += 'D\'autre part :<br>'
      ;[texteCorr, colonneOuLigne] = etapesDeLaFinAEtapeInconnue(texteCorr, longueursHorizontales, longueursVerticales, listeCellules, rectangles, aires, etapeAireInconnue, alternance === 'colonne')
      texteCorr += `Nous venons de calculer la largeur et la longueur du rectangle numéro $${miseEnEvidence(rectangles[listeCellules[etapeAireInconnue - 1][0]][listeCellules[etapeAireInconnue - 1][1]].numero)}$.<br>`
      texteCorr += `On en déduit que son aire est $${texNombre(longueursHorizontales[listeCellules[etapeAireInconnue - 1][0]], 1)}\\times ${texNombre(longueursVerticales[listeCellules[etapeAireInconnue - 1][1]], 1)} = ${texNombre(aires[listeCellules[etapeAireInconnue - 1][0]][listeCellules[etapeAireInconnue - 1][1]], 2)}\\text{ cm}^2$.<br>`
      reponse = [aires[listeCellules[etapeAireInconnue - 1][0]][listeCellules[etapeAireInconnue - 1][1]], 'cm^2']
    } else {
      ;[texteCorr, colonneOuLigne] = etapesDeUnAEtapeInconnue(texteCorr, longueursHorizontales, longueursVerticales, listeCellules, rectangles, aires, nombreTotalEtapes, colonneOuLigne)
      if (colonneOuLigne) {
        if (longueursVerticales[listeCellules[listeCellules.length - 1][1]] === longueursHorizontales[listeCellules[listeCellules.length - 1][0]]) {
          texteCorr += `La mesure demandée est la longueur du côté du carré numéro ${texteEnCouleurEtGras(rectangles[listeCellules[listeCellules.length - 1][0]][listeCellules[listeCellules.length - 1][1]].numero, 'red')} soit 
      $${miseEnEvidence(texNombre(longueursHorizontales[listeCellules[listeCellules.length - 1][0]], 1) + '\\text{ cm}', 'black')}$.`
        } else {
          texteCorr += `La mesure demandée est la ${longueursVerticales[listeCellules[listeCellules.length - 1][1]] > longueursHorizontales[listeCellules[listeCellules.length - 1][0]] ? 'largeur' : 'longueur'} 
      du rectangle numéro ${texteEnCouleurEtGras(rectangles[listeCellules[listeCellules.length - 1][0]][listeCellules[listeCellules.length - 1][1]].numero, 'red')} soit 
      $${miseEnEvidence(texNombre(longueursHorizontales[listeCellules[listeCellules.length - 1][0]], 1) + '\\text{ cm}', 'black')}$.`
          reponse = [longueursHorizontales[listeCellules[listeCellules.length - 1][0]], 'cm']
        }
      } else {
        if (longueursHorizontales[listeCellules[listeCellules.length - 1][0]] === longueursVerticales[listeCellules[listeCellules.length - 1][1]]) {
          texteCorr += `La mesure demandée est la longueur du côté du carré numéro ${texteEnCouleurEtGras(rectangles[listeCellules[listeCellules.length - 1][0]][listeCellules[listeCellules.length - 1][1]].numero, 'red')} soit 
      $${miseEnEvidence(texNombre(longueursVerticales[listeCellules[listeCellules.length - 1][1]], 1) + '\\text{ cm}', 'black')}$.`
        } else {
          texteCorr += `La mesure demandée est la ${longueursHorizontales[listeCellules[listeCellules.length - 1][0]] > longueursVerticales[listeCellules[listeCellules.length - 1][1]] ? 'largeur' : 'longueur'} 
    du rectangle numéro ${texteEnCouleurEtGras(rectangles[listeCellules[listeCellules.length - 1][0]][listeCellules[listeCellules.length - 1][1]].numero, 'red')} soit 
    $${miseEnEvidence(texNombre(longueursVerticales[listeCellules[listeCellules.length - 1][1]], 1) + '\\text{ cm}', 'black')}$.`
          reponse = [longueursVerticales[listeCellules[listeCellules.length - 1][1]], 'cm']
        }
      }
    }
    return [texteCorr, reponse]
  }
  function etapesDeLaFinAEtapeInconnue (texteCorr, longueursHorizontales, longueursVerticales, listeCellules, rectangles, aires, etapeAireInconnue, colonneOuLigne) {
    for (let i = listeCellules.length - 1; i >= etapeAireInconnue; i--) {
      if (!colonneOuLigne) {
        texteCorr += `Puisque la ${longueursHorizontales[listeCellules[i][0]] >= longueursVerticales[listeCellules[i][1]] ? 'longueur' : 'largeur'} 
      du rectangle numéro ${texteEnCouleurEtGras(rectangles[listeCellules[i][0]][listeCellules[i][1]].numero, 'red')} 
      est $${texNombre(longueursHorizontales[listeCellules[i][0]], 1)}$ cm et 
      que son aire est $${texNombre(aires[listeCellules[i][0]][listeCellules[i][1]], 2)}$ cm${texteExposant(2)}, 
      sa ${longueursHorizontales[listeCellules[i][0]] < longueursVerticales[listeCellules[i][1]] ? 'longueur' : 'largeur'} est : 
      $\\dfrac{${texNombre(aires[listeCellules[i][0]][listeCellules[i][1]], 2)}\\text{ cm}^2}{${texNombre(longueursHorizontales[listeCellules[i][0]], 1)}\\text{ cm}}=${texNombre(longueursVerticales[listeCellules[i][1]], 1)}\\text{ cm}$.`
        if (longueursHorizontales[listeCellules[i][0]] === longueursVerticales[listeCellules[i][1]]) {
          texteCorr += ` Le rectangle numéro ${texteEnCouleurEtGras(rectangles[listeCellules[i][0]][listeCellules[i][1]].numero, 'red')} est un carré.<br>`
        } else {
          texteCorr += '<br>'
        }
      } else {
        texteCorr += `Comme la ${longueursVerticales[listeCellules[i][1]] >= longueursHorizontales[listeCellules[i][0]] ? 'longueur' : 'largeur'} 
      du rectangle numéro ${texteEnCouleurEtGras(rectangles[listeCellules[i][0]][listeCellules[i][1]].numero, 'red')} 
      est $${texNombre(longueursVerticales[listeCellules[i][1]], 1)}$ cm et 
      que son aire est $${texNombre(aires[listeCellules[i][0]][listeCellules[i][1]], 2)}$ cm${texteExposant(2)}, 
      sa ${longueursVerticales[listeCellules[i][1]] < longueursHorizontales[listeCellules[i][0]] ? 'longueur' : 'largeur'} est : 
      $\\dfrac{${texNombre(aires[listeCellules[i][0]][listeCellules[i][1]], 2)}\\text{ cm}^2}{${texNombre(longueursVerticales[listeCellules[i][1]], 1)}\\text{ cm}}=${texNombre(longueursHorizontales[listeCellules[i][0]], 1)}\\text{ cm}$.`
        if (longueursVerticales[listeCellules[i][1]] === longueursHorizontales[listeCellules[i][0]]) {
          texteCorr += ` Le rectangle numéro ${texteEnCouleurEtGras(rectangles[listeCellules[i][0]][listeCellules[i][1]].numero, 'red')} est un carré.<br>`
        } else {
          texteCorr += '<br>'
        }
      }
      colonneOuLigne = !colonneOuLigne
    }

    return [texteCorr, colonneOuLigne]
  }
  function etapesDeUnAEtapeInconnue (texteCorr, longueursHorizontales, longueursVerticales, listeCellules, rectangles, aires, etapeInconnue, colonneOuLigne) {
    for (let i = 0; i < etapeInconnue; i++) {
      if (colonneOuLigne) {
        texteCorr += `Puisque la ${longueursHorizontales[listeCellules[i][0]] <= longueursVerticales[listeCellules[i][1]] ? 'largeur' : 'longueur'} 
      du rectangle numéro ${texteEnCouleurEtGras(rectangles[listeCellules[i][0]][listeCellules[i][1]].numero, 'red')} 
      est $${texNombre(longueursHorizontales[listeCellules[i][0]], 1)}$ cm et 
      que son aire est $${texNombre(aires[listeCellules[i][0]][listeCellules[i][1]], 2)}$ cm${texteExposant(2)}, 
      sa ${longueursHorizontales[listeCellules[i][0]] > longueursVerticales[listeCellules[i][1]] ? 'largeur' : 'longueur'} est : 
      $\\dfrac{${texNombre(aires[listeCellules[i][0]][listeCellules[i][1]], 2)}\\text{ cm}^2}{${texNombre(longueursHorizontales[listeCellules[i][0]], 1)}\\text{ cm}}=${texNombre(longueursVerticales[listeCellules[i][1]], 1)}\\text{ cm}$.`
        if (longueursHorizontales[listeCellules[i][0]] === longueursVerticales[listeCellules[i][1]]) {
          texteCorr += ` Le rectangle numéro ${texteEnCouleurEtGras(rectangles[listeCellules[i][0]][listeCellules[i][1]].numero, 'red')} est un carré.<br>`
        } else {
          texteCorr += '<br>'
        }
      } else {
        texteCorr += `Comme la ${longueursVerticales[listeCellules[i][1]] <= longueursHorizontales[listeCellules[i][0]] ? 'largeur' : 'longueur'} 
      du rectangle numéro ${texteEnCouleurEtGras(rectangles[listeCellules[i][0]][listeCellules[i][1]].numero, 'red')} 
      est $${texNombre(longueursVerticales[listeCellules[i][1]], 1)}$ cm et 
      que son aire est $${texNombre(aires[listeCellules[i][0]][listeCellules[i][1]], 2)}$ cm${texteExposant(2)}, 
      sa ${longueursVerticales[listeCellules[i][1]] > longueursHorizontales[listeCellules[i][0]] ? 'largeur' : 'longueur'} est : 
      $\\dfrac{${texNombre(aires[listeCellules[i][0]][listeCellules[i][1]], 2)}\\text{ cm}^2}{${texNombre(longueursVerticales[listeCellules[i][1]], 1)}\\text{ cm}}=${texNombre(longueursHorizontales[listeCellules[i][0]], 1)}\\text{ cm}$.`
        if (longueursVerticales[listeCellules[i][1]] === longueursHorizontales[listeCellules[i][0]]) {
          texteCorr += ` Le rectangle numéro ${texteEnCouleurEtGras(rectangles[listeCellules[i][0]][listeCellules[i][1]].numero, 'red')} est un carré.<br>`
        } else {
          texteCorr += '<br>'
        }
      }
      colonneOuLigne = !colonneOuLigne
    }

    return [texteCorr, colonneOuLigne]
  }

  function prepareProblemeAire (objetsEnonce, rectangles, typeDeGrille, longueursHorizontales, longueursVerticales, aires, xBordures, yBordures, nombreTotalEtapes, etapeAireInconnue) {
    const [texte, alternance, numeroteur, listeCellules] = dessineCheminAires(objetsEnonce, rectangles, typeDeGrille, longueursHorizontales, longueursVerticales, aires, xBordures, yBordures, nombreTotalEtapes, etapeAireInconnue)
    const [texteCorr, rep] = redigeCorrection(rectangles, longueursHorizontales, longueursVerticales, aires, nombreTotalEtapes, etapeAireInconnue, alternance, numeroteur, listeCellules)
    const reponse = new Grandeur(rep[0], rep[1])
    return [texte, texteCorr, reponse]
  }

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    let choixDesTables
    let nombreTotalEtapes = []

    if (typeof this.sup === 'number') {
    // Si c'est un nombre c'est qu'il n'y a qu'un seul choix pour le nombre d'étapes
      nombreTotalEtapes[0] = contraindreValeur(1, 7, this.sup, 5)
    } else {
      nombreTotalEtapes = this.sup.split('-') // Sinon on crée un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < nombreTotalEtapes.length; i++) {
        nombreTotalEtapes[i] = contraindreValeur(1, 7, parseInt(nombreTotalEtapes[i]), 5)
      }
    }
    nombreTotalEtapes = combinaisonListes(nombreTotalEtapes, this.nbQuestions)
    let typesDeProblemes = []
    if (typeof this.sup4 === 'number') {
      // Si c'est un nombre c'est qu'il n'y a qu'un seul choix pour le nombre d'étapes
      typesDeProblemes[0] = contraindreValeur(1, 2, this.sup4, 1)
    } else {
      typesDeProblemes = this.sup4.split('-') // Sinon on crée un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < typesDeProblemes.length; i++) {
        typesDeProblemes[i] = contraindreValeur(1, 2, parseInt(typesDeProblemes[i]), 1)
      }
    }
    typesDeProblemes = combinaisonListes(typesDeProblemes, this.nbQuestions)
    if (this.sup2 === 1) choixDesTables = [2, 3, 4, 5, 6, 7, 8, 9]
    else choixDesTables = [3, 4, 6, 7, 8, 9, 11, 12]

    for (let q = 0, cpt = 0, texte, texteCorr, reponse; q < this.nbQuestions && cpt < 50;) {
      const typeDeGrille = choisitFormatGrille(nombreTotalEtapes[q])
      // On détermine les 8 longueurs nécessaires et on prépare la grille de rectangles
      const [longueursHorizontales, longueursVerticales] = choisitLongueurs(choixDesTables, typeDeGrille)
      if (!this.sup3) {
        for (let i = 0; i < longueursHorizontales.length; i++) {
          longueursHorizontales[i] = arrondi(longueursHorizontales[i] + randint(0, 1) * randint(1, 9) / 10, 1)
        }
        for (let i = 0; i < longueursVerticales.length; i++) {
          longueursVerticales[i] = arrondi(longueursVerticales[i] + randint(0, 1) * randint(1, 9) / 10, 1)
        }
      }
      const listeDeTailles = rangeLesLongeurs(longueursHorizontales, longueursVerticales, typeDeGrille)
      const [xBordures, yBordures] = fixeBordures(listeDeTailles, typeDeGrille)
      const rectangles = creeRectangles(typeDeGrille, xBordures, yBordures)
      // On trace une grille en pointillés pour prolonger les rectangles
      const objetsEnonce = dessineGrille(typeDeGrille, xBordures, yBordures) // Grille en pointillés sur laquelle on ajoutera les rectangles
      const aires = calculAires(typeDeGrille, longueursHorizontales, longueursVerticales) // tableau contenant toutes les aires des rectangles
      // on crée la question
        ;[texte, texteCorr, reponse] = prepareProblemeAire(objetsEnonce, rectangles, typeDeGrille, longueursHorizontales, longueursVerticales, aires, xBordures, yBordures, nombreTotalEtapes[q], typesDeProblemes[q] === 1 ? false : Math.floor((nombreTotalEtapes[q] + 1) / 2))
      setReponse(this, q, reponse, { formatInteractif: 'unites' })
      texte += ajouteChampTexteMathLive(this, q, 'largeur25 inline unites[longueurs,aires]', { texte: 'Réponse avec l\'unité : ' })
      if (this.questionJamaisPosee(q, ...longueursHorizontales, ...longueursVerticales)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireTexte = ['Nombre d\'étapes (de 1 à 7) valeurs séparées par des tirets']
  this.besoinFormulaire2Numerique = ['Difficulté', 2, '1 : facile\n2 : difficile']
  this.besoinFormulaire3CaseACocher = ['Longueurs entières', true]
  this.besoinFormulaire4Texte = ['Choix des problèmes séparés par des tirets (1=longueur finale, 2=aire intermédiaire)']
}
