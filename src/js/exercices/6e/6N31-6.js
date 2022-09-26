import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombre } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'

export const titre = 'Trouver une valeur approchée ou un arrondi d\'un décimal'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * * Arrondir_un_decimal_selon_une_precision_donnée
 * * 6N31-6
 * @author Mickael Guironnet
 */
export const ref = '6N31-6'
export default function ArrondirUnDecimal () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = '1-2-3' // Type de question
  this.nbQuestions = 3

  this.nbCols = 1
  this.nbColsCorr = 1
  context.isHtml ? this.spacing = 1.2 : this.spacing = 1.5
  context.isHtml ? this.spacingCorr = 1.2 : this.spacingCorr = 1.5

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let listeTypeDeQuestions = []
    if (!this.sup) { // Si aucune liste n'est saisie ou mélange demandé
      listeTypeDeQuestions = combinaisonListes(['1', '2', '3', '4', '5', '6'], this.nbQuestions)
    } else {
      const quests = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < quests.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
        const type = quests[i].split(',')
        const choix = parseInt(type[0])
        if (choix >= 1 && choix <= 3) {
          listeTypeDeQuestions.push(quests[i])
        }
      }
      if (listeTypeDeQuestions.length === 0) { listeTypeDeQuestions = ['1', '2', '3', '4', '5', '6'] }
      listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    }

    for (let i = 0, indexQ = 0, texte, typesDeQuestions, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50; cpt++) {
      const type = listeTypeDeQuestions[i].split(',')
      typesDeQuestions = parseInt(type[0])
      const valeurdegaucheoudroite = ((type.length > 1 ? parseInt(type[1]) : randint(1, 2)))

      const m = randint(1, 9)
      const c = randint(1, 9)
      const d = randint(1, 9)
      const u = randint(1, 9)
      const di = randint(1, 9)
      const ci = randint(1, 9)
      const mi = randint(1, 9)

      if (!this.questionJamaisPosee(i, m, c, u, di, ci, mi)) {
        continue
      }

      switch (typesDeQuestions) {
        case 6: // arrondi au centième
          texte = `Donner un arrondi au centième de 
                    $${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))}$ : `
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline')
          } else {
            texte += '$\\ldots\\ldots\\ldots $'
          }
          if (mi < 5) {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01))
            texteCorr = `Un arrondi au centième: $ ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01))}$`
          } else {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + (ci + 1) * 0.01))
            texteCorr = `Un arrondi au centième: $ ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + (ci + 1) * 0.01))}$`
          }
          indexQ++
          break
        case 5: // arrondi au dixième
          texte = `Donner un arrondi au dixième de 
                    $${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))}$ : `
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline')
          } else {
            texte += '$\\ldots\\ldots\\ldots $'
          }
          if (ci < 5) {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1))
            texteCorr = `Un arrondi au dixième: $ ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1))}$`
          } else {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + u * 1 + calcul((di + 1) * 0.1))
            texteCorr = `Un arrondi au dixième: $ ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul((di + 1) * 0.1))}$`
          }
          indexQ++
          break
        case 4: // arrondi à l'unité
          texte = `Donner un arrondi à l'unité de 
                    $${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))}$ : `
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline')
          } else {
            texte += '$\\ldots\\ldots\\ldots $'
          }
          if (di < 5) {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + u * 1)
            texteCorr = `Un arrondi à l'unité: $ ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1)}$`
          } else {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + (u + 1) * 1)
            texteCorr = `Un arrondi à l'unité: $ ${texNombre(m * 1000 + c * 100 + d * 10 + (u + 1) * 1)}$`
          }
          indexQ++
          break
        case 3: // valeur approchée au centième
          texte = `${(valeurdegaucheoudroite === 1 ? 'Donner une valeur par défaut au centième de ' : 'Donner une valeur par excès au centième de ')}
                    $${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))}$ : `
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline')
          } else {
            texte += '$\\ldots\\ldots\\ldots $'
          }
          if (valeurdegaucheoudroite === 1) {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01))
            texteCorr = `Valeur approchée au centième par défaut: $ ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01))}$`
          } else {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + (ci + 1) * 0.01))
            texteCorr = `Valeur approchée au centième par excès: $ ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + (ci + 1) * 0.01))}$`
          }
          indexQ++
          break
        case 2: // valeur approchée au dixième
          texte = `${(valeurdegaucheoudroite === 1 ? 'Donner une valeur par défaut au dixième de ' : 'Donner une valeur par excès au dixième de ')}
                    $${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))}$ : `
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline')
          } else {
            texte += '$\\ldots\\ldots\\ldots $'
          }
          if (valeurdegaucheoudroite === 1) {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1))
            texteCorr = `Valeur approchée au dixième par défaut: $ ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1))}$`
          } else {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + u * 1 + calcul((di + 1) * 0.1))
            texteCorr = `Valeur approchée au dixième par excès: $ ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul((di + 1) * 0.1))}$`
          }
          indexQ++
          break
        case 1: // encadrement à l'unité
          texte = `${(valeurdegaucheoudroite === 1 ? 'Donner une valeur par défaut à l\'unité de ' : 'Donner une valeur par excès au dixième de ')}
                    $${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))}$ : `
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur25 inline')
          } else {
            texte += '$\\ldots\\ldots\\ldots $'
          }
          if (valeurdegaucheoudroite === 1) {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + u * 1)
            texteCorr = `Valeur approchée à l'unité par défaut: $ ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1)}$`
          } else {
            setReponse(this, indexQ, m * 1000 + c * 100 + d * 10 + (u + 1) * 1)
            texteCorr = `Valeur approchée à l'unité par excès: $ ${texNombre(m * 1000 + c * 100 + d * 10 + (u + 1) * 1)}$`
          }
          indexQ++
          break
      }

      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      i++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Type de question', [
      'Choix séparés par des tirets',
      '0 : mélange',
      '1 : Valeur approchée à l\'unité',
      '2 : Valeur approchée au dixième',
      '3 : Valeur approchée au centième',
      '4 : Arrondi à l\'unité',
      '5 : Arrondi au dixième',
      '6 : Arrondi au centième'
    ].join('\n')
  ]
}
