import { droiteGraduee2, mathalea2d } from '../../../modules/2d.js'
import { context } from '../../../modules/context'
import FractionEtendue from '../../../modules/FractionEtendue.js'
import { pgcd, randint, texFractionReduite } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver une abscisse fractionnaire'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6N04
 */
export default function AbscisseFractionnaire () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fractionEgale'
  this.consigne = ''

  this.nouvelleVersion = function () {
    const a = randint(2, 6) // dénominateur
    let b = randint(2, a * 4 - 1)
    do {
      b = randint(2, a * 4 - 1) // numérateur
    } while (b % a === 0)
    const c = new FractionEtendue(b, a)
    this.reponse = c
    this.question = 'Determiner l\'abscisse du point $A$ situé ci-dessous :<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, droiteGraduee2({
      Unite: 3,
      Min: 0,
      Max: 4.2,
      x: 0,
      y: 0,
      thickSecDist: 1 / a,
      thickSec: true,
      thickOffset: 0,
      axeStyle: '|->',
      pointListe: [[b / a, 'A']],
      pointCouleur: 'blue',
      pointStyle: 'x',
      labelsPrincipaux: true,
      step1: 1,
      step2: 1
    }))
    if (pgcd(a, b) === 1) {
      this.correction = `L'unité est divisée en $${a}$ graduations.<br>
    Une graduation correspond donc à $\\dfrac{1}{${a}}$. <br>
     Comme le point $A$ est situé à $${b}$ graduations de l'origine, 
      l'abscisse du point $A$ est donc $\\dfrac{1}{${a}}\\times ${b}$ soit  $\\dfrac{${b}}{${a}}$.<br>
      `
    } else {
      this.correction = `L'unité est divisée en $${a}$ graduations.<br>
      Une graduation correspond donc à $\\dfrac{1}{${a}}$. <br>
       Comme le point $A$ est situé à $${b}$ graduations de l'origine, 
        l'abscisse du point $A$ est donc $\\dfrac{1}{${a}}\\times ${b}$ soit  $\\dfrac{${b}}{${a}}$ que l'on peut simplifier en $${texFractionReduite(b, a)}$.<br>
        `
    }
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: this.question,
        options: { multicols: true },
        propositions: [
          {
            type: 'AMCNum',
            propositions: [{
              texte: this.correction,
              statut: '',
              reponse: {
                texte: 'Numérateur',
                valeur: b,
                param: {
                  digits: b > 9 ? 2 : 1,
                  decimals: 0,
                  signe: false,
                  approx: 0
                }
              }
            }]
          },
          {
            type: 'AMCNum',
            propositions: [{
              texte: '',
              statut: '',
              reponse: {
                texte: 'Dénominateur',
                valeur: a,
                param: {
                  digits: 1,
                  decimals: 0,
                  signe: false,
                  approx: 0
                }
              }
            }]
          }
        ]
      }
    }
  }
}
