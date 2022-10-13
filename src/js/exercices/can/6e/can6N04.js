import { droiteGraduee } from '../../../modules/2d/reperes.js'
import { texteParPosition } from '../../../modules/2d/textes.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { context } from '../../../modules/context.js'
import FractionX from '../../../modules/FractionEtendue.js'
import { texFractionReduite } from '../../../modules/outils/arrayFractions.js'
import { pgcd, randint } from '../../../modules/outils/entiers.js'
import Exercice from '../../Exercice.js'
export const titre = 'Lire une abscisse sur une droite graduée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/*!
 * @author Jean-Claude Lhote et Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6N04
 */
export const uuid = 'ca515'
export const ref = 'can6N04'
export default function AbscisseFractionnaire () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fractionEgale'
  this.consigne = ''

  this.nouvelleVersion = function () {
    const a = randint(2, 6) // dénominateur
    let b = randint(2, a * 4 - 1)
    do {
      b = randint(2, a * 4 - 1) // numérateur
    } while (b % a === 0)
    const c = new FractionX(b, a)
    this.reponse = c
    this.question = `Determiner l'abscisse du point $A$.<br>
    
    `

    this.question += mathalea2d({ xmin: -1, ymin: -1.5, xmax: 14, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, texteParPosition('A', 3 * b / a, 0.9, 'milieu', 'blue', 2), droiteGraduee({
      Unite: 3,
      Min: 0,
      Max: 4.2,
      x: 0,
      y: 0,
      thickSecDist: 1 / a,
      thickSec: true,
      thickOffset: 0,
      axeStyle: '|->',
      pointListe: [[b / a, '']],
      pointCouleur: 'blue',
      pointStyle: 'x',
      labelsPrincipaux: true,
      step1: 1,
      step2: 1
    }))
    if (pgcd(a, b) === 1) {
      this.correction = `L'unité est divisée en $${a}$ intervalles.<br>
    Une graduation correspond donc à $\\dfrac{1}{${a}}$. <br>
     Comme le point $A$ est situé à $${b}$ graduations de l'origine, 
      l'abscisse du point $A$ est donc $\\dfrac{1}{${a}}\\times ${b}$, soit  $\\dfrac{${b}}{${a}}$.<br>
      `
    } else {
      this.correction = `L'unité est divisée en $${a}$ intervalles.<br>
      Une graduation correspond donc à $\\dfrac{1}{${a}}$. <br>
       Comme le point $A$ est situé à $${b}$ graduations de l'origine, 
        l'abscisse du point $A$ est donc $\\dfrac{1}{${a}}\\times ${b}$, soit  $\\dfrac{${b}}{${a}}$ que l'on peut simplifier en $${texFractionReduite(b, a)}$.<br>
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
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
