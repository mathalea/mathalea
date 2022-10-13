import { complex } from 'mathjs'
import { randint } from '../../../modules/outils/entiers.js'
import Exercice from '../../Exercice.js'
export const titre = 'Somme de nombres complexes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDePublication = '26/10/2021'

/**
 * Question de can : calcul de la somme de deux nombres complexes
 * @author Jean-Claude Lhote
 * Référence canExC01
*/
export const uuid = '71292'
export const ref = 'canExC01'
export default function SommeDeComplexes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const z1 = complex(randint(-5, 5), randint(-5, 5))
    const z2 = complex(randint(-5, 5), randint(-5, 5))
    this.question = `On donne $~~a = ${z1.toString()}~~$ et $~~b = ${z2.toString()}$.<br>Calcule $a + b$.`
    this.correction = `$${z1.toString()} + ${z2.toString()} = ${add(z1, z2).toString()}$`
    this.reponse = add(z1, z2)
    this.autoCorrection[0] = {
      enonce: this.question,
      propositions: [
        {
          type: 'AMCNum',
          propositions: {
            texte: this.correction
          },
          reponse: {
            valeur: add(z1, z2).re,
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
            valeur: add(z1, z2).im,
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
