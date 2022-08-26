import { droiteGraduee } from '../../../modules/2d.js'
import Decimal from 'decimal.js/decimal.mjs'
import { randint, choice, texNombre, stringNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
export const titre = 'Lire une abscisse sur une droite graduée*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '25/08/2022'
/*!
 * @author Gilles Mora
 *
 */
export default function AbscisseDroite2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'calcul'
  this.consigne = ''

  this.nouvelleVersion = function () {
    let d, abs0, abs1, abs2, x1, choix1
    switch (choice([1, 2])) { //
      case 1:// grande valeur
        choix1 = choice(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
        if (choix1 === 'a') { // graduation de 200 en 200
          abs0 = randint(1, 9) * choice([1000, 10000])
          abs1 = new Decimal(abs0).add(1000)
          abs2 = new Decimal(abs0).add(2000)
          x1 = new Decimal(2 * randint(1, 9, 5)).div(10)
          d = droiteGraduee({
            Unite: 4,
            Min: 0,
            Max: 2.1,
            thickSecDist: 0.2,
            axeStyle: '->',
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: true,
            labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
            pointListe: [[x1, 'A']]
          })
          this.reponse = new Decimal(x1).mul(1000).add(abs0)
          this.question = 'Determiner l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
          this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $5$ intervalles.<br>
       Une graduation correspond donc à $200$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 0)}$.`
        }

        if (choix1 === 'b') { // graduation de 250 en 250
          abs0 = randint(1, 9) * choice([1000, 10000])
          abs1 = new Decimal(abs0).add(1000)
          abs2 = new Decimal(abs0).add(2000)
          x1 = new Decimal(choice([25, 75, 125, 175])).div(100)
          d = droiteGraduee({
            Unite: 4,
            Min: 0,
            Max: 2.1,
            thickSecDist: 0.25,
            axeStyle: '->',
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: true,
            labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
            pointListe: [[x1, 'A']]
          })
          this.reponse = new Decimal(x1).mul(1000).add(abs0)
          this.question = 'Determiner l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
          this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $4$ intervalles.<br>
         Une graduation correspond donc à $250$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 0)}$.`
        }

        if (choix1 === 'c') { // graduation de 20 en 20
          abs0 = randint(1, 9) * choice([1000, 10000])
          abs1 = new Decimal(abs0).add(100)
          abs2 = new Decimal(abs0).add(200)
          x1 = new Decimal(2 * randint(1, 9, 5)).div(10)
          d = droiteGraduee({
            Unite: 4,
            Min: 0,
            Max: 2.1,
            thickSecDist: 0.2,
            axeStyle: '->',
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: true,
            labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
            pointListe: [[x1, 'A']]
          })
          this.reponse = new Decimal(x1).mul(100).add(abs0)
          this.question = 'Determiner l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
          this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $5$ intervalles.<br>
         Une graduation correspond donc à $20$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 0)}$.`
        }

        if (choix1 === 'd') { // graduation de 25 en 25
          abs0 = randint(1, 9) * choice([1000, 10000])
          abs1 = new Decimal(abs0).add(100)
          abs2 = new Decimal(abs0).add(200)
          x1 = new Decimal(choice([25, 75, 125, 175])).div(100)
          d = droiteGraduee({
            Unite: 4,
            Min: 0,
            Max: 2.1,
            thickSecDist: 0.25,
            axeStyle: '->',
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: true,
            labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
            pointListe: [[x1, 'A']]
          })
          this.reponse = new Decimal(x1).mul(100).add(abs0)
          this.question = 'Determiner l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
          this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $4$ intervalles.<br>
         Une graduation correspond donc à $25$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 0)}$.`
        }
        if (choix1 === 'e') { // graduation de 2 en 2
          abs0 = randint(1, 9) * choice([1000, 10000])
          abs1 = new Decimal(abs0).add(10)
          abs2 = new Decimal(abs0).add(20)
          x1 = new Decimal(2 * randint(1, 9, 5)).div(10)
          d = droiteGraduee({
            Unite: 4,
            Min: 0,
            Max: 2.1,
            thickSecDist: 0.2,
            axeStyle: '->',
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: true,
            labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
            pointListe: [[x1, 'A']]
          })
          this.reponse = new Decimal(x1).mul(10).add(abs0)
          this.question = 'Determiner l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
          this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $5$ intervalles.<br>
         Une graduation correspond donc à $2$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 0)}$.`
        }
        if (choix1 === 'f') { // graduation de 2,5 en 2,5
          abs0 = randint(1, 9) * choice([1000, 10000])
          abs1 = new Decimal(abs0).add(10)
          abs2 = new Decimal(abs0).add(20)
          x1 = new Decimal(choice([25, 75, 125, 175])).div(100)
          d = droiteGraduee({
            Unite: 4,
            Min: 0,
            Max: 2.1,
            thickSecDist: 0.25,
            axeStyle: '->',
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: true,
            labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
            pointListe: [[x1, 'A']]
          })
          this.reponse = new Decimal(x1).mul(10).add(abs0)
          this.question = 'Determiner l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
          this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $4$ intervalles.<br>
         Une graduation correspond donc à $2,5$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 1)}$.`
        }
        if (choix1 === 'g') { // graduation de 0,2 en 0,2
          abs0 = randint(1, 9) * choice([1000, 10000])
          abs1 = new Decimal(abs0).add(1)
          abs2 = new Decimal(abs0).add(2)
          x1 = new Decimal(2 * randint(1, 9, 5)).div(10)
          d = droiteGraduee({
            Unite: 4,
            Min: 0,
            Max: 2.1,
            thickSecDist: 0.2,
            axeStyle: '->',
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: true,
            labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
            pointListe: [[x1, 'A']]
          })
          this.reponse = new Decimal(x1).add(abs0)
          this.question = 'Determiner l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
          this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $5$ intervalles.<br>
         Une graduation correspond donc à $0,2$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 1)}$.`
        }

        if (choix1 === 'h') { // graduation de 0.25 en 0.25
          abs0 = randint(1, 9) * choice([1000, 10000])
          abs1 = new Decimal(abs0).add(1)
          abs2 = new Decimal(abs0).add(2)
          x1 = new Decimal(choice([25, 75, 125, 175])).div(100)
          d = droiteGraduee({
            Unite: 4,
            Min: 0,
            Max: 2.1,
            thickSecDist: 0.25,
            axeStyle: '->',
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: true,
            labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
            pointListe: [[x1, 'A']]
          })
          this.reponse = new Decimal(x1).add(abs0)
          this.question = 'Determiner l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
          this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $4$ intervalles.<br>
         Une graduation correspond donc à $0,25$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 2)}$.`
        }
        break
      case 2:// petites valeurs
        choix1 = choice(['a', 'b'])
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
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: true,
            labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
            pointListe: [[x1, 'A']]
          })
          this.reponse = new Decimal(x1).div(100).add(abs0)
          this.question = 'Determiner l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
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
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: true,
            labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(abs1)}`], [2, `${stringNombre(abs2)}`]],
            pointListe: [[x1, 'A']]
          })
          this.reponse = new Decimal(x1).div(100).add(abs0)
          this.question = 'Determiner l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
          this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a $4$ intervalles.<br>
     Une graduation correspond donc à $0,0025$. Ainsi, l'abscisse du point $A$ est $${texNombre(this.reponse, 4)}$.`
        }

        break
    }
  }
}
