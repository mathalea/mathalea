import Exercice from '../Exercice.js'
import { randint, troncature, calcul, choisitLettresDifferentes } from '../../modules/outils.js'
import { point, segment, droiteGraduee2, mathalea2d } from '../../modules/2d.js'

export const titre = 'Droites graduées avec zoom'

/**
 * Fonction permettant aux enseignants de proposer des feuilles à compléter pour la lecture d'abscisse décimale avec zoom
 * L'enseignant peut ajouter "à la main" les données qu'il souhaite
 * ref P004
 * @author Jean-Claude Lhote
 */
export default function FeuilleDeZooms () {
  Exercice.call(this)
  this.nbCols = 1
  this.sup = 1
  this.titre = titre

  this.nouvelleVersion = function () {
    this.contenu = ''
    let texte = ''
    const noms = choisitLettresDifferentes(5, 'QFN')
    let xmin, origine, xmax, x1, x2, x3, x21, x31, pA1, pA2, pB1, pB2, pC1, pC2, pD1, pD2, sA, sB, sC, sD, extremite, fenetre
    const objets = []
    for (let n = 0; n < 8 / parseInt(this.sup); n++) {
      objets.length = 0
      if (parseInt(this.sup) === 1) {
        xmin = randint(5, 10) - 0.2
        origine = Math.round(xmin + 0.2)
        const thickOff = 0.1
        xmax = origine + 9.2

        x1 = calcul(xmin + 0.2 + randint(1, 5) + randint(2, 8) / 10)
        extremite = '->'

        const d1 = droiteGraduee2({
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
          // labelListe: [[origine, `$${texNombre(origine)}$`], [extreme, `$${texNombre(extreme)}$`]],
          pointListe: [[x1, `${noms[1]}`], [Math.floor(x1), `${noms[0]}`], [Math.floor(x1 + 1), `${noms[2]}`]],
          pointTaille: 6,
          pointOpacite: 0.8,
          pointCouleur: 'blue',
          pointStyle: '|',
          pointEpaisseur: 2,
          axeStyle: extremite
        })
        const d2 = droiteGraduee2({
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

        pA1 = point((Math.floor(x1) - xmin) * 3, 3)
        pA2 = point(Math.floor(x1) - xmin + 1.5, 0)
        pB1 = point((Math.floor(x1) + 1 - xmin) * 3, 3)
        pB2 = point(Math.floor(x1) - xmin + 21.5, 0)
        sA = segment(pA1, pA2)
        sB = segment(pB1, pB2)
        sA.pointilles = 5
        sB.pointilles = 5
        objets.push(d1, d2, sA, sB)
        fenetre = { xmin: -1.5, xmax: 35, ymin: -1, ymax: 4.5, pixelsParCm: 25, scale: 0.5 }
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
        const thickOff = 0.001

        extremite = '->'
        const d1 = droiteGraduee2({
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
          labelsPrincipaux: false,
          pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`]],
          pointTaille: 6,
          pointOpacite: 0.8,
          pointCouleur: 'blue',
          pointStyle: '|',
          pointEpaisseur: 3,
          axeStyle: extremite
        })
        const d2 = droiteGraduee2({
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
        const d3 = droiteGraduee2({
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

        pA1 = point((x2 - xmin) * 30, 6)
        pA2 = point(6.5, 3)
        pB1 = point((x3 - xmin) * 30, 6)
        pB2 = point(26.5, 3)
        sA = segment(pA1, pA2)
        sB = segment(pB1, pB2)
        sA.pointilles = 5
        sB.pointilles = 5
        pC1 = point(6.5 + (x21 - x2) * 200, 3)
        pC2 = point(6.5, 0)
        pD1 = point(6.5 + (x31 - x2) * 200, 3)
        pD2 = point(26.5, 0)
        sC = segment(pC1, pC2)
        sD = segment(pD1, pD2)
        sC.pointilles = 5
        sD.pointilles = 5
        fenetre = { xmin: -1.5, xmax: 35, ymin: -1.5, ymax: 7.5, pixelsParCm: 25, scale: 0.5 }
        objets.push(d1, d2, d3, sA, sB, sC, sD)
      }
      texte = mathalea2d(fenetre, objets)

      this.contenu += texte
      this.contenu += '<br>'
    }
  }
  this.besoinFormulaireNumerique = ['Nombre de zoom', 2, '1 : Un seul zoom\n2 : Deux niveaux de zoom']
}
