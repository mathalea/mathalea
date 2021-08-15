import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, troncature, calcul, choisitLettresDifferentes, texNombre, texFraction } from '../../modules/outils.js'
import { point, segment, droiteGraduee2, mathalea2d } from '../../modules/2d.js'
export const titre = 'Lire une abscisse décimale grâce à des zooms successifs'

/**
 * 6N23-3
 */
export default function LireUneAbscisseAvecZoom () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.niveau = 'sixième'
  this.sup = 3
  this.consigne = ''
  if (context.isHtml) {
    this.spacing = 2
    this.spacingCorr = 3
  } else {
    this.spacing = 1
    this.spacingCorr = 1
  }
  this.vspace = -1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let d1; let d2; let d3; let d3Corr; let d1Corr; let d2Corr; let texte = ''; let texteCorr = ''; let extremite; let extreme; const noms = choisitLettresDifferentes(5, 'QFN')
    let x1 = 0; let x2 = 0; let x3 = 0; const objets = []; let fenetre; let thickOff = 0; const objetsCorr = []; let xmin; let xmax; let origine; let pA1; let pA2; let pB1; let pB2; let sA; let sB; let x21; let x31; let pC1; let pC2; let pD1; let pD2; let sC; let sD
    if (parseInt(this.sup) === 1) {
      if (this.niveau === 'CM') {
        xmin = 0
        thickOff = 0
        origine = 0
        extreme = 9
        xmax = 9
      } else {
        xmin = randint(5, 10) - 0.2
        origine = Math.round(xmin + 0.2)
        extreme = calcul(origine + 9)
        thickOff = 0.1
        xmax = origine + 9.2
      }
      x1 = calcul(xmin + 0.2 + randint(1, 5) + randint(2, 8) / 10)
      //   xmin=calcul(Math.floor(x1)-5)
      //    xmax=calcul(Math.floor(x1)+6)
      if (xmin === 0) extremite = '|->'
      else extremite = '->'

      d1 = droiteGraduee2({
        x: 0,
        y: 3,
        Min: xmin,
        axePosition: 'H',
        Max: xmax + 0.2,
        thickSec: true,
        thickTer: false,
        Unite: 3,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 4,
        labelsPrincipaux: false,
        labelListe: [[origine, `${texNombre(origine)}`], [extreme, `${texNombre(extreme)}`]],
        pointListe: [[x1, `${noms[1]}`], [Math.floor(x1), `${noms[0]}`], [Math.floor(x1 + 1), `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      d2 = droiteGraduee2({
        x: Math.floor(x1) - xmin + 1.5,
        y: 0,
        Min: Math.floor(x1),
        axePosition: 'H',
        Max: Math.floor(x1 + 1),
        thickSec: true,
        thickTer: false,
        Unite: 20,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 4,
        labelsPrincipaux: false,
        pointListe: [[x1, `${noms[1]}`], [Math.floor(x1), `${noms[0]}`], [Math.floor(x1 + 1), `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      d1Corr = droiteGraduee2({
        x: 0,
        y: 3,
        Min: xmin,
        axePosition: 'H',
        Max: xmax + 0.2,
        thickSec: true,
        thickTer: false,
        Unite: 3,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 4,
        labelsPrincipaux: true,
        labelListe: [[origine, `${texNombre(origine)}`], [extreme, `${texNombre(extreme)}`]],
        pointListe: [[x1, `${noms[1]}`], [Math.floor(x1), `${noms[0]}`], [Math.floor(x1 + 1), `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      d2Corr = droiteGraduee2({
        x: Math.floor(x1) - xmin + 1.5,
        y: 0,
        Min: Math.floor(x1),
        axePosition: 'H',
        Max: Math.floor(x1 + 1),
        thickSec: true,
        thickTer: false,
        Unite: 20,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 4,
        labelsPrincipaux: false,
        labelsSecondaires: true,
        labelListe: [[Math.floor(x1), `${texNombre(Math.floor(x1))}`], [x1, `${texNombre(x1)}`], [Math.ceil(x1), `${texNombre(Math.ceil(x1))}`]],
        pointListe: [[x1, `${noms[1]}`], [Math.floor(x1), `${noms[0]}`], [Math.floor(x1 + 1), `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })

      pA1 = point((Math.floor(x1) - xmin) * 3, 3)
      pA2 = point(Math.floor(x1) - xmin + 1.5, 0)
      pB1 = point((Math.floor(x1) + 1 - xmin) * 3, 3)
      pB2 = point(Math.floor(x1) - xmin + 21.5, 0)
      sA = segment(pA1, pA2)
      sB = segment(pB1, pB2)
      sA.pointilles = true
      sB.pointilles = true
      objets.push(d1, d2, sA, sB)
      objetsCorr.push(d1Corr, d2Corr, sA, sB)
      fenetre = { xmin: -1.5, xmax: 35, ymin: -1, ymax: 4.5, pixelsParCm: 25, scale: 0.5 }
      texteCorr = `L'abscisse de ${noms[1]} est : $${texNombre(x1)}=${texNombre(Math.floor(x1))} + ${texFraction(calcul(10 * (x1 - Math.floor(x1))), 10)}=${texFraction(calcul(x1 * 10), 10)}$.<br>`
    } else if (parseInt(this.sup) === 2) {
      if (this.niveau === 'CM') {
        xmin = 0
        thickOff = 0
      } else {
        xmin = randint(1, 15) - 0.02
        thickOff = 0.01
      }

      xmax = xmin + 1.05
      x1 = calcul(xmin + 0.02 + randint(2, 8) / 10 + randint(2, 8) / 100)
      x2 = calcul(Math.floor(x1 * 10) / 10)
      x3 = calcul(x2 + 0.1)
      //      xmin=calcul(x2-0.8)
      //      xmax=calcul(xmin+1.7)
      if (xmin === 0) extremite = '|->'
      else extremite = '->'
      d1 = droiteGraduee2({
        x: 0,
        y: 3,
        Min: xmin,
        axePosition: 'H',
        Max: xmax,
        thickSec: true,
        thickTer: true,
        Unite: 30,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 8,
        thickDistance: 1,
        thickSecDist: 0.1,
        thickTerDist: 0.01,
        labelsPrincipaux: false,
        labelListe: [[Math.floor(x1), `${Math.floor(x1)}`], [Math.ceil(x1), `${Math.ceil(x1)}`]],
        pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      d2 = droiteGraduee2({
        x: (x2 - xmin) + 6,
        y: 0,
        Min: x2,
        axePosition: 'H',
        Max: x2 + 0.1,
        thickSec: true,
        thickTer: false,
        Unite: 200,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 6,
        thickDistance: 0.1,
        thickSecDist: 0.01,
        thickTerDist: 0.001,
        labelsPrincipaux: false,
        pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x2 + 0.1, `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      d1Corr = droiteGraduee2({
        x: 0,
        y: 3,
        Min: xmin,
        axePosition: 'H',
        Max: xmax,
        thickSec: true,
        thickTer: true,
        Unite: 30,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 8,
        thickDistance: 1,
        thickSecDist: 0.1,
        thickTerDist: 0.01,
        labelsSecondaires: true,
        labelListe: [[Math.floor(x1), `${Math.floor(x1)}`], [Math.ceil(x1), `${Math.ceil(x1)}`]],
        pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      d2Corr = droiteGraduee2({
        x: (x2 - xmin) + 6,
        y: 0,
        Min: x2,
        axePosition: 'H',
        Max: x2 + 0.1,
        thickSec: true,
        thickTer: false,
        Unite: 200,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 6,
        thickDistance: 0.1,
        thickSecDist: 0.01,
        thickTerDist: 0.001,
        labelsPrincipaux: false,
        labelsSecondaires: true,
        labelListe: [[x2, `${texNombre(x2)}`], [x1, `${texNombre(x1)}`], [x3, `${texNombre(x3)}`]],
        pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x2 + 0.1, `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })

      pA1 = point((Math.floor(x1 * 10) / 10 - xmin) * 30, 3)
      pA2 = point(x2 - xmin + 6, 0)
      pB1 = point((Math.floor(x1 * 10) / 10 + 0.1 - xmin) * 30, 3)
      pB2 = point(x3 - xmin + 26, 0)
      sA = segment(pA1, pA2)
      sB = segment(pB1, pB2)
      sA.pointilles = true
      sB.pointilles = true
      fenetre = { xmin: -1.5, xmax: 35, ymin: -1.5, ymax: 4.5, pixelsParCm: 25, scale: 0.5 }
      objets.push(d1, d2, sA, sB)
      objetsCorr.push(d1Corr, d2Corr, sA, sB)
      const partent = Math.floor(x1); const pardec = calcul(x1 - partent)
      texteCorr = `L'abscisse de ${noms[1]} est : $${texNombre(x1)}=${texNombre(partent)} + ${texFraction(calcul(pardec * 100), 100)}=${texFraction(calcul(x1 * 100), 100)}$.<br>`
    } else if (parseInt(this.sup) === 3) {
      if (this.niveau === 'CM') {
        xmin = 0
        xmax = 1
        thickOff = 0
        x1 = calcul(xmin + randint(2, 8) / 10 + randint(2, 8) / 100 + randint(2, 8) * 0.001)
        x2 = troncature(x1, 1)
        x21 = troncature(x1, 2)
        x3 = calcul(x2 + 0.1)
        x31 = calcul(x21 + 0.01)
      } else {
        xmin = randint(1, 15)
        xmax = xmin + 1
        x1 = calcul(xmin + randint(2, 8) / 10 + randint(2, 8) / 100 + randint(2, 8) * 0.001)
        x2 = troncature(x1, 1)
        x21 = troncature(x1, 2)
        x3 = calcul(x2 + 0.1)
        x31 = calcul(x21 + 0.01)
        xmin = Math.floor(x2)
        xmax = xmin + 1
        thickOff = 0.001
      }
      if (xmin === 0) extremite = '|->'
      else extremite = '->'
      d1 = droiteGraduee2({
        x: 0,
        y: 6,
        Min: xmin,
        axePosition: 'H',
        Max: xmax,
        thickSec: true,
        thickTer: true,
        Unite: 30,
        thickDistance: 1,
        thickSecDist: 0.1,
        thickTerDist: 0.01,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 6,
        labelsPrincipaux: true,
        labelListe: [[xmin, `${texNombre(xmin)}`], [xmax, `${texNombre(xmax)}`]],
        pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 3,
        axeStyle: extremite
      })
      d2 = droiteGraduee2({
        x: 6.5,
        y: 3,
        Min: x2,
        axePosition: 'H',
        Max: x3,
        thickSec: true,
        thickTer: true,
        Unite: 200,
        thickSecDist: 0.01,
        thickTerDist: 0.001,
        thickDistance: 0.1,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 6,
        labelsPrincipaux: false,
        pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`], [x21, `${noms[3]}`], [x31, `${noms[4]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      d3 = droiteGraduee2({
        x: 6.5,
        y: 0,
        Min: x21,
        axePosition: 'H',
        Max: x31,
        thickSec: true,
        thickTer: false,
        Unite: 2000,
        thickSecDist: 0.001,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 6,
        labelsPrincipaux: false,
        pointListe: [[x1, `${noms[1]}`], [x21, `${noms[3]}`], [x31, `${noms[4]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      d1Corr = droiteGraduee2({
        x: 0,
        y: 6,
        Min: xmin,
        axePosition: 'H',
        Max: xmax,
        thickSec: true,
        thickTer: true,
        Unite: 30,
        thickDistance: 1,
        thickSecDist: 0.1,
        thickTerDist: 0.01,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 6,
        labelsPrincipaux: true,
        labelsSecondaires: true,
        labelListe: [[xmin, `${texNombre(xmin)}`], [xmax, `${texNombre(xmax)}`]],
        pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 3,
        axeStyle: extremite
      })
      d2Corr = droiteGraduee2({
        x: 6.5,
        y: 3,
        Min: x2,
        axePosition: 'H',
        Max: x3,
        thickSec: true,
        thickTer: true,
        Unite: 200,
        thickSecDist: 0.01,
        thickTerDist: 0.001,
        thickDistance: 0.1,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 6,
        labelsPrincipaux: false,
        labelsSecondaires: true,
        pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`], [x21, `${noms[3]}`], [x31, `${noms[4]}`]],
        labelListe: [[x2, `${texNombre(x2)}`], [x3, `${texNombre(x3)}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      d3Corr = droiteGraduee2({
        x: 6.5,
        y: 0,
        Min: x21,
        axePosition: 'H',
        Max: x31,
        thickSec: true,
        thickTer: false,
        Unite: 2000,
        thickSecDist: 0.001,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 6,
        labelsPrincipaux: false,
        labelsSecondaires: true,
        pointListe: [[x1, `${noms[1]}`], [x21, `${noms[3]}`], [x31, `${noms[4]}`]],
        labelListe: [[x21, `${texNombre(x21)}`], [x31, `${texNombre(x31)}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })

      pA1 = point((x2 - xmin) * 30, 6)
      pA2 = point(6.5, 3)
      pB1 = point((x3 - xmin) * 30, 6)
      pB2 = point(26.5, 3)
      sA = segment(pA1, pA2)
      sB = segment(pB1, pB2)
      sA.pointilles = true
      sB.pointilles = true
      pC1 = point(6.5 + (x21 - x2) * 200, 3)
      pC2 = point(6.5, 0)
      pD1 = point(6.5 + (x31 - x2) * 200, 3)
      pD2 = point(26.5, 0)
      sC = segment(pC1, pC2)
      sD = segment(pD1, pD2)
      sC.pointilles = true
      sD.pointilles = true
      fenetre = { xmin: -1.5, xmax: 35, ymin: -1.5, ymax: 7.5, pixelsParCm: 25, scale: 0.5 }
      objets.push(d1, d2, d3, sA, sB, sC, sD)
      objetsCorr.push(d1Corr, d2Corr, d3Corr, sA, sB, sC, sD)
      const partent = Math.floor(x1); const pardec = calcul(x1 - partent)
      texteCorr = `L'abscisse de ${noms[1]} est : $${texNombre(x1)}=${texNombre(partent)} + ${texFraction(calcul(pardec * 1000), 1000)}=${texFraction(calcul(x1 * 1000), 1000)}$.<br>`
    }
    texte = `Donner l'abscisse de ${noms[1]} sous trois formes : en écriture décimale, comme somme d’un nombre entier et d’une fraction décimale et avec une fraction décimale.<br>`
    texte += mathalea2d(fenetre, objets)
    texteCorr += mathalea2d(fenetre, objetsCorr)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Au dixième\n2 : Au centième\n3 : Au millième']
}
