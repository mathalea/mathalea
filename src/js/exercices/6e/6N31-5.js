import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombre, miseEnEvidence, nombreDeChiffresDe, sp } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'

export const dateDePublication = '28/09/22'
export const titre = 'Encadrer un décimal'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
/**
 * * Encadrer_un_decimal_selon_une_precision_donnée
 * * 6N31-5
 * @author Mickael Guironnet (rendu AMC par Eric Elter)
 */
export const ref = '6N31-5'
export const uuid = 'a8c21'
export default function EncadrerUnDecimal () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = '1-2-3' // Type de question
  this.nbQuestions = 4
  this.consigneCorrection = 'Encadrer'
  this.nbCols = 1
  this.nbColsCorr = 1
  context.isHtml ? this.spacing = 1.5 : this.spacing = 1.5
  context.isHtml ? this.spacingCorr = 1.2 : this.spacingCorr = 1.5

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let listeTypeDeQuestions = []
    if (!this.sup) { // Si aucune liste n'est saisie ou mélange demandé
      listeTypeDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions)
    } else {
      const quests = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < quests.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
        const choixtp = parseInt(quests[i])
        if (choixtp >= 1 && choixtp <= 3) {
          listeTypeDeQuestions.push(choixtp)
        }
      }
      if (listeTypeDeQuestions.length === 0) { listeTypeDeQuestions = [1, 2, 3] }
      listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    }

    for (let i = 0, indexQ = 0, texte, typesDeQuestions, texteCorr, reponseMin, reponseMax, cpt = 0; i < this.nbQuestions && cpt < 50; cpt++) {
      typesDeQuestions = listeTypeDeQuestions[i]
      const m = randint(1, 9)
      const c = randint(1, 9)
      const d = randint(1, 9)
      const u = (typesDeQuestions === 1 ? randint(7, 9) : randint(1, 9))
      const di = (typesDeQuestions === 2 ? randint(7, 9) : randint(1, 9))
      const ci = (typesDeQuestions === 3 ? randint(7, 9) : randint(1, 9))
      const mi = randint(1, 9)

      if (!this.questionJamaisPosee(i, m, c, u, di, ci, mi)) {
        continue
      }

      switch (typesDeQuestions) {
        case 3: { // encadrement au centième
          reponseMin = m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01)
          if (!context.isAmc) setReponse(this, indexQ, reponseMin)
          texte = `Encadrer $${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))}$ au centième.<br>`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline nospacebefore') + '$'
          } else if (context.isAmc) {
            texte += 'Ainsi  :' + sp(15) + 'a '
          } else {
            texte += '$ \\ldots\\ldots\\ldots '
          }
          indexQ++
          texte += ` < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))} < `
          reponseMax = m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + (ci + 1) * 0.01)
          if (!context.isAmc) setReponse(this, indexQ, reponseMax)
          if (this.interactif) {
            texte += '$' + ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline nospacebefore')
          } else if (context.isAmc) {
            texte += ' b'
          } else {
            texte += ' \\ldots\\ldots\\ldots $'
          }
          indexQ++
          const nombreStr = texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + 0 * 0.01 + mi * 0.001)).replace('0', miseEnEvidence(ci))
          texteCorr = `au centième: $ ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01)))} < ${nombreStr} <  ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + (ci + 1) * 0.01)))}$`
          break
        }
        case 2: { // encadrement au dixième
          reponseMin = m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1)
          if (!context.isAmc) setReponse(this, indexQ, reponseMin)
          texte = `Encadrer $${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))}$ au dixième.<br>`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline nospacebefore') + '$'
          } else if (context.isAmc) {
            texte += 'Ainsi  :' + sp(15) + 'a '
          } else {
            texte += '$ \\ldots\\ldots\\ldots '
          }
          indexQ++
          texte += ` < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))} < `
          reponseMax = m * 1000 + c * 100 + d * 10 + u * 1 + calcul((di + 1) * 0.1)
          if (!context.isAmc) setReponse(this, indexQ, reponseMax)
          if (this.interactif) {
            texte += '$' + ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline nospacebefore')
          } else if (context.isAmc) {
            texte += ' b'
          } else {
            texte += '\\ldots\\ldots\\ldots $ '
          }
          indexQ++
          const nombreStr = texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(0 * 0.1 + ci * 0.01 + mi * 0.001)).replace('0', miseEnEvidence(di))
          texteCorr = `au dixième: $ ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1)))} < ${nombreStr} <  ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul((di + 1) * 0.1)))}$`
          break
        }
        case 1: { // encadrement à l'unité
          reponseMin = m * 1000 + c * 100 + d * 10 + u * 1
          if (!context.isAmc) setReponse(this, indexQ, reponseMin)
          texte = `Encadrer $${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))}$ à l'unité.<br>`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline nospacebefore') + '$'
          } else if (context.isAmc) {
            texte += 'Ainsi  :' + sp(15) + 'a '
          } else {
            texte += '$ \\ldots\\ldots\\ldots '
          }
          indexQ++
          texte += ` < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))} < `
          reponseMax = m * 1000 + c * 100 + d * 10 + (u + 1) * 1
          if (!context.isAmc) setReponse(this, indexQ, reponseMax)
          if (this.interactif) {
            texte += '$' + ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline nospacebefore')
          } else if (context.isAmc) {
            texte += ' b'
          } else {
            texte += '\\ldots\\ldots\\ldots $ '
          }
          indexQ++
          const nombreStr = texNombre(m * 1000 + c * 100 + d * 10 + u * 0 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001)).replace('0', miseEnEvidence(u))
          texteCorr = `à l'unité: $ ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1))} < ${nombreStr} <  ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + (u + 1) * 1))}$`
          break
        }
      }
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonceAvant: false,
          options: { multicols: true },
          propositions: [
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: texteCorr,
                  reponse: {
                    texte: texte + '<br>Valeur de a :',
                    valeur: reponseMin,
                    param: {
                      signe: false,
                      digits: nombreDeChiffresDe(reponseMin) + 2,
                      decimals: 3
                    }
                  }
                }
              ]
            },
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: '',
                  reponse: {
                    texte: 'Valeur de b :',
                    valeur: reponseMax,
                    param: {
                      signe: false,
                      digits: nombreDeChiffresDe(reponseMax) + 2,
                      decimals: 3
                    }
                  }
                }
              ]
            }
          ]
        }
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      i++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Type de question', [
      'Nombres séparés par des tirets',
      '0 : Mélange',
      '1 : Encadrer à l\'unité',
      '2 : Encadrer au dixième',
      '3 : Encadrer au centième'
    ].join('\n')
  ]
}
