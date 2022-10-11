import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { choisitLettresDifferentes } from '../../modules/outils/lettres.js'
import { arrondi, troncature } from '../../modules/outils/nombres.js'
import { calcul } from '../../modules/outils/texNombres.js'
import { droiteGraduee } from '../../modules/2d/reperes.js'
import { point } from '../../modules/2d/point.js'
import { segment } from '../../modules/2d/segment.js'

export const titre = 'Placer un nombre décimal avec des zooms successifs'

/**
 * Fonction permettant aux enseignants de proposer rapidement un axe avec zooms pour placer un décimal
 * ref P006
 * @author Jean-Claude Lhote
 */
export default function NombreAPlacer () {
  Exercice.call(this)
  this.nbCols = 1
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.sup = 1
  this.sup2 = 2.573
  this.sup3 = false
  this.titre = titre

  this.nouvelleVersion = function () {
    this.contenu = ''
    let texte = ''
    const noms = choisitLettresDifferentes(5, 'QFN')
    let x1 = 0
    let x2 = 0
    let x3 = 0
    const objets = []
    objets.length = 0
    x1 = parseFloat(this.sup2)
    x1 = arrondi(x1, 4)
    x2 = troncature(x1, 1)
    const x21 = troncature(x1, 2)
    x3 = calcul(x2 + 0.1)
    const x31 = calcul(x21 + 0.01)
    const xmin = Math.floor(x2)
    const xmax = xmin + 1
    const thickOff = 0.0001

    const extremite = '->'
    const d1 = droiteGraduee({
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
      labelsPrincipaux: this.sup3,
      pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`]],
      pointTaille: 6,
      pointOpacite: 0.8,
      pointCouleur: 'blue',
      pointStyle: '|',
      pointEpaisseur: 3,
      axeStyle: extremite
    })
    const d2 = droiteGraduee({
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
      labelsPrincipaux: this.sup3,
      pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`], [x21, `${noms[3]}`], [x31, `${noms[4]}`]],
      pointTaille: 6,
      pointOpacite: 0.8,
      pointCouleur: 'blue',
      pointStyle: '|',
      pointEpaisseur: 2,
      axeStyle: extremite
    })
    const d3 = droiteGraduee({
      x: 6.5,
      y: 0,
      Min: x21,
      axePosition: 'H',
      Max: x31,
      thickSec: true,
      thickTer: true,
      Unite: 2000,
      thickSecDist: 0.001,
      thickTerDist: 0.0001,
      thickOffset: thickOff,
      thickCouleur: 'black',
      axeCouleur: 'black',
      axeHauteur: 6,
      labelsPrincipaux: this.sup3,
      pointListe: [[x1, `${noms[1]}`], [x21, `${noms[3]}`], [x31, `${noms[4]}`]],
      pointTaille: 6,
      pointOpacite: 0.8,
      pointCouleur: 'blue',
      pointStyle: '|',
      pointEpaisseur: 2,
      axeStyle: extremite
    })

    const pA1 = point((x2 - xmin) * 30, 6)
    const pA2 = point(6.5, 3)
    const pB1 = point((x3 - xmin) * 30, 6)
    const pB2 = point(26.5, 3)
    const sA = segment(pA1, pA2)
    const sB = segment(pB1, pB2)
    sA.pointilles = 5
    sB.pointilles = 5
    const pC1 = point(6.5 + (x21 - x2) * 200, 3)
    const pC2 = point(6.5, 0)
    const pD1 = point(6.5 + (x31 - x2) * 200, 3)
    const pD2 = point(26.5, 0)
    const sC = segment(pC1, pC2)
    const sD = segment(pD1, pD2)
    sC.pointilles = 5
    sD.pointilles = 5
    const fenetre = { xmin: -1.5, xmax: 35, ymin: -1.5, ymax: 7.5, pixelsParCm: 25, scale: 0.5 }
    if (this.sup === 3) { objets.push(d1, d2, d3, sA, sB, sC, sD) } else if (this.sup === 2) { objets.push(d1, d2, sA, sB) } else { objets.push(d1) }

    texte = mathalea2d(fenetre, objets)
    this.contenu += texte
    if (context.isHtml) {
      this.contenu += '<br>'
    } else {
      this.contenu += '\\\\'
    }
  }
  this.besoinFormulaireNumerique = ['Nombre de zoom', 3, '1 : sans zoom\n2 : zoom des centièmes\n3 : zoom des millièmes']
  this.besoinFormulaire2Numerique = ['Saisir le nombre décimal ']
  this.besoinFormulaire3CaseACocher = ['Afficher les abscisses']
}
