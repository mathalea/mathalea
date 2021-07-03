import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, shuffle, calcul, choisitLettresDifferentes, texNombre, texFraction, numAlpha } from '../../modules/outils.js'
import { droiteGraduee2, mathalea2d } from '../../modules/2d.js'
export const titre = 'Lire des abscisses décimales sous trois formes'

/**
 * 6N23-2
 */
export default function LireAbscisseDecimaleTroisFormes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.niveau = 'sixième'
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

    let d1; let texte = ''; let texteCorr = ''; let extremite; const noms = choisitLettresDifferentes(3, 'Q')
    let x1 = 0; let x2 = 0; let x3 = 0; let thickOff; let tableau = []; let xmin; let xmax
    if (parseInt(this.sup) === 1) {
      if (this.niveau === 'CM') {
        xmin = 0
        thickOff = 0
      } else {
        xmin = randint(1, 15)
        thickOff = calcul(2 / (10 ** (parseInt(this.sup))))
      }
      if (xmin === 0) extremite = '|->'
      else extremite = '->'
      xmax = xmin + 9
      x1 = xmin * 10 + randint(0, 2) * 10 + randint(2, 8)
      x2 = xmin * 10 + randint(3, 5) * 10 + randint(2, 8)
      x3 = xmin * 10 + randint(6, 8) * 10 + randint(2, 8)
      x1 = calcul(x1 / 10)
      x2 = calcul(x2 / 10)
      x3 = calcul(x3 / 10)

      tableau = shuffle([x1, x2, x3])
      x1 = tableau[0]
      x2 = tableau[1]
      x3 = tableau[2]

      d1 = droiteGraduee2({
        x: 0,
        y: 0,
        Min: xmin,
        axePosition: 'H',
        Max: xmax,
        thickSec: true,
        thickTer: false,
        Unite: 3,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 4,
        pointListe: [[x1, `${noms[0]}`], [x2, `${noms[1]}`], [x3, `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      texte = `${numAlpha(0)} Donner l'abscisse de ${noms[0]} en écriture décimale.<br>`
      texte += `${numAlpha(1)} Donner l'abscisse de ${noms[1]} comme la somme d'un nombre entier et d'une fraction décimale.<br>`
      texte += `${numAlpha(2)} Donner l'abscisse de ${noms[2]} sous la forme d'une fraction décimale.<br>`
      texteCorr = `${numAlpha(0)} L'abscisse de ${noms[0]} est : $${texNombre(x1)}$.<br>`
      texteCorr += `${numAlpha(1)} L'abscisse de ${noms[1]} est : $${texNombre(Math.floor(x2))} + ${texFraction(calcul(10 * (x2 - Math.floor(x2))), 10)}$.<br>`
      texteCorr += `${numAlpha(2)} L'abscisse de ${noms[2]} est : $${texFraction(calcul(x3 * 10), 10)}$.`
    } else if (parseInt(this.sup) === 2) {
      if (this.niveau === 'CM') {
        xmin = 0
        thickOff = 0
      } else {
        xmin = randint(1, 15) - 0.1
        thickOff = calcul(2 / (10 ** (parseInt(this.sup))))
      }
      if (xmin === 0) extremite = '|->'
      else extremite = '->'
      xmax = calcul(xmin + 1.5)
      x1 = 10 + xmin * 100 + randint(1, 3) * 10 + randint(2, 8)
      x2 = 10 + xmin * 100 + randint(4, 6) * 10 + randint(2, 8)
      x3 = 10 + xmin * 100 + randint(7, 9) * 10 + randint(2, 8)

      x1 = calcul(x1 / 100)
      x2 = calcul(x2 / 100)
      x3 = calcul(x3 / 100)
      tableau = shuffle([x1, x2, x3])
      x1 = tableau[0]
      x2 = tableau[1]
      x3 = tableau[2]

      d1 = droiteGraduee2({
        x: 0,
        y: 0,
        Min: xmin,
        axePosition: 'H',
        Max: xmax,
        thickSec: true,
        thickTer: true,
        Unite: 20,
        thickOffset: thickOff,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 4,
        pointListe: [[x1, `${noms[0]}`], [x2, `${noms[1]}`], [x3, `${noms[2]}`]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })
      texte = `${numAlpha(0)} Donner l'abscisse de ${noms[0]} en écriture décimale.<br>`
      texte += `${numAlpha(1)} Donner l'abscisse de ${noms[1]} comme la somme d'un entier et d'une fraction décimale.<br>`
      texte += `${numAlpha(2)} Donner l'abscisse de ${noms[2]} sous la forme d'une fraction décimale.<br>`
      texteCorr = `${numAlpha(0)} L'abscisse de ${noms[0]} est : $${texNombre(x1)}$.<br>`
      texteCorr += `${numAlpha(1)} L'abscisse de ${noms[1]} est : $${texNombre(Math.floor(x2))} + ${texFraction(calcul(100 * (x2 - Math.floor(x2))), 100)}$.<br>`
      texteCorr += `${numAlpha(2)} L'abscisse de ${noms[2]} est : $${texFraction(calcul(x3 * 100), 100)}$.`
    } else if (parseInt(this.sup) === 3) {
      if (this.niveau === 'CM') {
        xmin = 0
        thickOff = 0
      } else {
        xmin = calcul(randint(0, 15) + randint(0, 9) * 0.1)
        thickOff = calcul(2 / (10 ** (parseInt(this.sup))))
      }
      if (xmin === 0) extremite = '|->'
      else extremite = '->'
      xmax = calcul(xmin + 0.15)

      x1 = xmin * 1000 + randint(1, 5) * 10 + randint(2, 8)
      x2 = xmin * 1000 + randint(6, 9) * 10 + randint(2, 8)
      x3 = xmin * 1000 + randint(11, 14) * 10 + randint(2, 8)
      x1 = calcul(x1 / 1000)
      x2 = calcul(x2 / 1000)
      x3 = calcul(x3 / 1000)

      tableau = shuffle([x1, x2, x3])
      x1 = tableau[0]
      x2 = tableau[1]
      x3 = tableau[2]
      d1 = droiteGraduee2({
        x: 0,
        y: 0,
        Min: xmin,
        axePosition: 'H',
        Max: xmax,
        thickSec: true,
        thickTer: true,
        Unite: 200,
        thickOffset: thickOff,
        thickDistance: 0.1,
        thickSecDist: 0.01,
        thickTerDist: 0.001,
        thickCouleur: 'black',
        axeCouleur: 'black',
        axeHauteur: 4,
        pointListe: [[x1, `${noms[0]}`], [x2, `${noms[1]}`], [x3, `${noms[2]}`]],
        labelListe: [[xmin + 0.09, texNombre(calcul(xmin + 0.09))], [xmin + 0.1, texNombre(calcul(xmin + 0.1))]],
        pointTaille: 6,
        pointOpacite: 0.8,
        pointCouleur: 'blue',
        pointStyle: '|',
        pointEpaisseur: 2,
        axeStyle: extremite
      })

      texte = `${numAlpha(0)} Donner l'abscisse de ${noms[0]} en écriture décimale.<br>`
      texte += `${numAlpha(1)} Donner l'abscisse de ${noms[1]} comme la somme d'un entier et d'une fraction décimale.<br>`
      texte += `${numAlpha(2)} Donner l'abscisse de ${noms[2]} sous la forme d'une fraction décimale.<br>`
      texteCorr = `${numAlpha(0)} L'abscisse de ${noms[0]} est : $${texNombre(x1)}$.<br>`
      texteCorr += `${numAlpha(1)} L'abscisse de ${noms[1]} est : $${texNombre(Math.floor(x2))} + ${texFraction(calcul(1000 * (x2 - Math.floor(x2))), 1000)}$.<br>`
      texteCorr += `${numAlpha(2)} L'abscisse de ${noms[2]} est : $${texFraction(calcul(x3 * 1000), 1000)}$.`
    }
    texte += mathalea2d({ xmin: -1.5, xmax: 35, ymin: -1.5, ymax: 1.5, pixelsParCm: 25, scale: 0.5 }, d1)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Au dixième\n2 : Au centième\n3 : Au millième']
}
