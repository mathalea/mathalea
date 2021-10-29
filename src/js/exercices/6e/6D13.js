import { context } from '../../modules/context'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif'
import { calcul, listeQuestionsToContenu, randint, sp, texteEnCouleur } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Conversion en heures et minutes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

export default function ConversionHeuresMinutes (can = false) {
  Exercice.call(this)
  this.nbQuestions = 5
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    for (let i = 0, cpt = 0, a, b, d, texte, texteCorr; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 4)
      b = randint(10, 59)
      d = calcul(a * 60 + b)
      texte = `Convertir $${d}$ minutes en heures(h) et minutes(min) :` +
     ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: sp(5), texteApres: ' h ' }) +
      ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: sp(5), texteApres: ' min ' })
      if (can) {
        texteCorr = texteEnCouleur(`
    <br> Mentalement : <br>
On cherche le multiple de $60$ inférieur à $${d}$ le plus grand possible. C'est $${Math.floor(d / 60)}\\times 60 = ${Math.floor(d / 60) * 60}$.<br>
Ainsi $${d} = ${Math.floor(d / 60) * 60} + ${d % 60}$ donc $${d}$min $= ${Math.floor(d / 60)}$h$${d % 60}$min.`) + '<br>'
      } else {
        if (this.correctionDetaillee) {
          texteCorr = `On doit effectuer la division euclidienne de ${d} par 60 car il y a 60 minutes dans une heure.<br>Le quotient entier donne le nombre d'heures et le reste enter donne le nombre de minutes.<br>`
        } else {
          texteCorr = ''
        }
      }
      texteCorr += `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = ${a}h ${b}min.`
      if (this.questionJamaisPosee(i, a, b, d)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            options: { multicols: true },
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
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
          setReponse(this, 2 * i, a)
          setReponse(this, 2 * i + 1, b)
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
