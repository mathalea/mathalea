import { droiteGraduee2, mathalea2d } from '../../../modules/2d'
import { calcul, choice, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Lire l\'abscisse décimale d\'un point sur une droite graduée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * Jean-Claude Lhote
 * Publié le 11 / 09 / 2021
 * Référence can6N07
 */
export default function LireAbscisseDecimaleDeFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.consigne = ''

  this.nouvelleVersion = function () {
    let a
    switch (choice([1, 2])) { //
      case 1:// droite graduée     /4 resultat décimal
        a = choice([1, 3, 5, 6, 7, 9, 10, 11]) // numérateur
        this.reponse = calcul(a / 4)
        this.question = 'Determiner l\'abscisse du point A  :<br> On donnera le résultat sous  forme décimale.<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, droiteGraduee2({
          Unite: 3,
          Min: 0,
          Max: 3.2,
          x: 0,
          y: 0,
          thickSecDist: 1 / 4,
          thickSec: true,
          thickoffset: 0,
          axeStyle: '|->',
          pointListe: [[a / 4, 'A']],
          pointCouleur: 'blue',
          pointStyle: 'x',
          labelsPrincipaux: true,
          step1: 1,
          step2: 1
        }))
        this.correction = `L'abscisse du point A est $\\dfrac{${a}}{${4}}=${texNombre(this.reponse)}$`

        break
      case 2:// droite graduée     /5 resultat décimal
        a = choice([1, 2, 3, 4, 6, 7, 8, 9]) // numérateur
        this.reponse = calcul(a / 5)
        this.question = 'Determiner l\'abscisse du point A  :<br> On donnera le résultat sous  forme décimale.<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, droiteGraduee2({
          Unite: 3,
          Min: 0,
          Max: 3.2,
          x: 0,
          y: 0,
          thickSecDist: 1 / 5,
          thickSec: true,
          thickoffset: 0,
          axeStyle: '|->',
          pointListe: [[a / 5, 'A']],
          pointCouleur: 'blue',
          pointStyle: 'x',
          labelsPrincipaux: true,
          step1: 1,
          step2: 1
        }))
        this.correction = `L'abscisse du point A est $\\dfrac{${a}}{${5}}=${texNombre(this.reponse)}$`

        break
    }
  }
}
