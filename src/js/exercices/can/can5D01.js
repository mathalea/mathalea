import { context } from '../../modules/context'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif'
import { calcul, listeQuestionsToContenu, randint, sp } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Conversion en heures et minutes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

export default function ConversionHeuresMinutes () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    this.lisQuestions = []
    this.listeCorrections = []
    const a = randint(2, 4)
    const b = randint(10, 59)
    const d = calcul(a * 60 + b)
    this.listeQuestions[0] = `Convertir $${d}$ minutes en heures(h) et minutes(min) :` +
     ajouteChampTexteMathLive(this, 0, 'largeur10 inline', { texte: sp(5), texteApres: ' h ' }) +
      ajouteChampTexteMathLive(this, 1, 'largeur10 inline', { texte: sp(5), texteApres: ' min ' })
    this.listeCorrections[0] = `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = ${a}h ${b}min`
    listeQuestionsToContenu(this)
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: this.listeQuestions[0],
        options: { multicols: true },
        propositions: [
          {
            type: 'AMCNum',
            propositions: [{
              texte: this.listeCorrections[0],
              statut: '',
              reponse: {
                texte: 'Heure(s)',
                valeur: a,
                param: {
                  digits: 1,
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
                texte: 'Minute(s)',
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
    } else {
      setReponse(this, 0, a)
      setReponse(this, 1, b)
    }
  }
}
