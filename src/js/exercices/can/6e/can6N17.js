import { droiteGraduee, texteParPosition } from '../../../modules/2d.js'
import Decimal from 'decimal.js/decimal.mjs'
import { randint, choice, texNombre, stringNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
export const titre = 'Lire une abscisse (décimale) sur une droite graduée*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '29/08/2022'
/*!
 * @author Gilles Mora
 *
 */
export const uuid = 'aa22e'
export const ref = 'can6N17'
export default function AbscisseDroiteDecimaux () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'calcul'
  this.consigne = ''
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let d, abs0, abs1, abs2, x1

    const choix1 = choice(['a', 'b'])
    if (choix1 === 'a') { // graduation de 0,02 en 0,02
      abs0 = randint(0, 9) + randint(1, 9) / choice([10, 100])
      abs1 = new Decimal(abs0).add(1 / 100)
      abs2 = new Decimal(abs0).add(2 / 100)
      x1 = new Decimal(2 * randint(1, 9, 5)).div(10)
      d = droiteGraduee({
        Unite: 4,
        Min: 0,
        Max: 2.1,
        thickSecDist: 0.2,
        axeStyle: '->',
        pointTaille: 4,
        pointStyle: 'x',
        labelsPrincipaux: false,
        thickSec: true,
        labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
        pointListe: [[x1, '']]
      })
      this.reponse = new Decimal(x1).div(100).add(abs0)
      this.question = 'Déterminer l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 35, scale: 0.8 }, texteParPosition('A', 4 * x1, 0.6, 'milieu', 'blue', 2), d)
      this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $5$ intervalles.<br>
     Une graduation correspond donc à $0,002$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 4)}$.`
    }

    if (choix1 === 'b') { // graduation de 0,025 en 0,025
      abs0 = randint(0, 9) + randint(1, 9) / choice([10, 100])
      abs1 = new Decimal(abs0).add(1 / 100)
      abs2 = new Decimal(abs0).add(2 / 100)
      x1 = new Decimal(choice([25, 50, 75, 125, 150, 175])).div(100)
      d = droiteGraduee({
        Unite: 4,
        Min: 0,
        Max: 2.1,
        thickSecDist: 0.25,
        axeStyle: '->',
        pointTaille: 4,
        pointStyle: 'x',
        labelsPrincipaux: false,
        thickSec: true,
        labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
        pointListe: [[x1, '']]
      })
      this.reponse = new Decimal(x1).div(100).add(abs0)
      this.question = 'Déterminer l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 35, scale: 0.8 }, texteParPosition('A', 4 * x1, 0.6, 'milieu', 'blue', 2), d)
      this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $4$ intervalles.<br>
     Une graduation correspond donc à $0,0025$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 4)}$.`
    }
  }
}
