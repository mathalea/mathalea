import { complex, multiply } from 'mathjs'
import { randint } from '../../../modules/outils/entiers.js'
import Exercice from '../../Exercice.js'
export const titre = 'produit de nombres complexes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDePublication = '26/10/2021'

/**
 * Question de can : calcul de la somme de deux nombres complexes
 * @author Jean-Claude Lhote
 * Référence canExC02
*/
export const uuid = '30cc1'
export const ref = 'canExC02'
export default function SommeDeComplexes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const z1 = complex(randint(-5, 5, 0), randint(-5, 5, 0))
    const z2 = complex(0, randint(-5, 5, 0))
    this.question = `On donne $~~a = ${z1.toString()}~~$ et $~~b = ${z2.toString()}$.<br>Calcule $a \\times b$.`
    this.correction = `$${z1.toString()} \\times ${z2.toString()} = ${multiply(z1, z2).toString()}$`
    this.reponse = multiply(z1, z2)
    this.autoCorrection[0] = {
      enonce: this.question,
      propositions: [
        {
          type: 'AMCNum',
          propositions: {
            texte: this.correction
          },
          reponse: {
            valeur: multiply(z1, z2).re,
            digits: 2,
            deciams: 0,
            signe: true,
            approx: 0
          }
        },
        {
          type: 'AMCNum',
          propositions: {
            texte: ''
          },
          reponse: {
            valeur: multiply(z1, z2).im,
            digits: 2,
            deciams: 0,
            signe: true,
            approx: 0
          }
        }
      ]
    }
  }
}
