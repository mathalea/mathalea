import { context } from '../../modules/context'
import Fraction from '../../modules/Fraction'
import { pgcd, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Fraction comme facteur manquant'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

export default function FractionCommeFacteurManquant () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatInteractif = 'fractionEgale'
  this.consigne = ''

  this.nouvelleVersion = function () {
    let a, b
    do {
      a = randint(2, 25)
      b = randint(2, 25, a)
    } while (pgcd(a, b) !== 1)
    const c = new Fraction(a, b)
    this.reponse = c
    this.question = `Quel est le nombre qui, multiplié par ${b} donne ${a} ? (réponse fractionnaire obligatoire)`
    this.correction = `c'est $${c.texFraction}$ car $${c.texFraction}\\times ${b} = ${a}$`
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
                valeur: a,
                param: {
                  digits: 2,
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
                valeur: b,
                param: {
                  digits: 2,
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
