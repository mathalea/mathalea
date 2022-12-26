import { context } from '../../modules/context.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

import { calcul, combinaisonListes, contraindreValeur, listeQuestionsToContenu, randint, sp, texteEnCouleur } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
export const titre = 'Convertir en min vers h et min ou en s vers min et s'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModifImportante = '14/05/2022'

/**
 *
 * @author
 * Référence 6D13
 * Ajout d'une option "Mélange" par Guillaume Valmont le 14/05/2022
*/
export const uuid = '4f8f4'
export const ref = '6D13'
export default function ConversionHeuresMinutesOuMinutesEtSecondes (can = false) {
  Exercice.call(this)
  this.nbQuestions = 5
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.sup = 1
  this.nouvelleVersion = function () {
    this.sup = contraindreValeur(1, 3, this.sup, 1)
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let typeQuestionsDisponibles = ['min vers h et min', 's vers min et s']
    if (this.sup === 1) typeQuestionsDisponibles = ['min vers h et min']
    else if (this.sup === 2) typeQuestionsDisponibles = ['s vers min et s']
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, cpt = 0, a, b, d, texte, texteCorr; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 4)
      b = randint(10, 59)
      d = calcul(a * 60 + b)
      if (listeTypeQuestions[i] === 'min vers h et min') {
        texte = `Convertir $${d}$ minutes en heures (h) et minutes (min).` + ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: sp(5), texteApres: ' h ' }) +
        ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: sp(5), texteApres: ' min ' })
        this.canEnonce = `Convertir $${d}$ minutes en heures et minutes.`
        this.canReponseACompleter = '$\\ldots$ h $\\ldots$ min'
      } else {
        texte = `Convertir $${d}$ secondes en minutes (min) et secondes (s).` + ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: sp(5), texteApres: ' min ' }) +
        ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: sp(5), texteApres: ' s ' })
      }
      if (can) {
        if (listeTypeQuestions[i] === 'min vers h et min') {
          texteCorr = texteEnCouleur(`
    <br> Mentalement : <br>
On cherche le multiple de $60$ inférieur à $${d}$ le plus grand possible. C'est $${Math.floor(d / 60)}\\times 60 = ${Math.floor(d / 60) * 60}$.<br>
Ainsi $${d} = ${Math.floor(d / 60) * 60} + ${d % 60}$ donc $${d}$min $= ${Math.floor(d / 60)}$${sp(1)}h${sp(1)}$${d % 60}$${sp(1)}min.`) + '<br>'
        } else {
          texteCorr = texteEnCouleur(`
          <br> Mentalement : <br>
      On cherche le multiple de $60$ inférieur à $${d}$ le plus grand possible. C'est $${Math.floor(d / 60)}\\times 60 = ${Math.floor(d / 60) * 60}$.<br>
      Ainsi $${d} = ${Math.floor(d / 60) * 60} + ${d % 60}$ donc $${d}$s $= ${Math.floor(d / 60)}$${sp(1)}min${sp(1)}$${d % 60}$${sp(1)}s.`) + '<br>'
        }
      } else {
        if (this.correctionDetaillee) {
          texteCorr = `On doit effectuer la division euclidienne de ${d} par 60 car il y a 60 minutes dans une heure.<br>Le quotient entier donne le nombre d'heures et le reste enter donne le nombre de minutes.<br>`
        } else {
          texteCorr = ''
        }
      }
      if (listeTypeQuestions[i] === 'min vers h et min') {
        texteCorr += `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = $${a}$${sp(1)}h${sp(1)}$${b}$${sp(1)}min.`
      } else {
        texteCorr += `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ s = $${a}$${sp(1)}min${sp(1)}$${b}$${sp(1)}s.`
      }
      if (this.questionJamaisPosee(i, a, b, d)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        if (context.isAmc) {
          if (listeTypeQuestions[i] === 'min vers h et min') {
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
                      texte: 'Minute(min)',
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
                      texte: 'Minutes(min)',
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
                      texte: 'Secondes(s)',
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
  this.besoinFormulaireNumerique = ['Type d\'unité de départ', 3, '1 : Minutes\n2 : Secondes\n3 : Mélange']
}
