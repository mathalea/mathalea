import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, arrondi } from '../../modules/outils.js'
import { number, fraction, add, subtract } from 'mathjs'
import { Arbre } from '../../modules/arbres.js'
export const titre = 'Probabilités simples'

/**
 * Description didactique de l'exercice
 * @author Rémi Angot et Matthieu Devillers
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  const foret = {
    nom: 'pin',
    proba: 1,
    enfants: [
      {
        nom: 'maritime',
        proba: 0.6,
        enfants: [
          {
            nom: 'pin des Landes',
            proba: 0.5
          },
          {
            nom: "pin d'Ecosse",
            proba: 0.5
          }
        ]
      },
      {
        nom: 'noir',
        proba: 0.4,
        enfants: [
          {
            nom: "d'Autriche",
            proba: 0.8
          },
          {
            nom: 'de Turkie',
            proba: 0.2
          }
        ]
      }
    ]
  }
  function texProba (proba, rationnel, precision) {
    return rationnel ? fraction(arrondi(proba, precision)).toLatex().replace('frac', 'dfrac') : number(arrondi(proba, precision)).toString().replace('.', '{,}')
  }
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const ratio = this.sup
    const pM = fraction(randint(20, 60), 100)
    const pG = fraction(randint(50, 80), 100)
    const pP = fraction(randint(50, 80), 100)
    // on crée l'arbre des probabilités.
    const match = new Arbre(null, 'Match', 1, ratio)
    const M = match.setFils('M', pM, ratio)
    const nonM = match.setFils('nonM', subtract(1, pM), ratio)
    const MG = M.setFils('MG', pG, ratio)
    const MP = M.setFils('MP', subtract(1, pG), ratio)
    const PP = nonM.setFils('PP', pP, ratio)
    const PG = nonM.setFils('PG', subtract(1, pP), ratio)
    console.log(match)
    const sport = choice(['hand-ball', 'football', 'rugby', 'basket', 'volley-ball', 'water-polo', 'baseball'])
    this.consigne = `Lors d'un match de ${sport}, l'équipe qui reçoit un adversaire a une probabilité de $${texProba(pM, ratio, 2)}$ de mener à la mi-temps.<br>`
    this.consigne += ` Si elle mène à la mi-temps, sa probabilité de gagner le match est de $${texProba(pG, ratio, 2)}$.<br>`
    this.consigne += ` Si elle perd à la mi-temps, sa probabilité de perdre le match est de $${texProba(pP, ratio, 2)}$.<br>`

    const question1 = 'Quelle est la probabilité, pour cette équipe, de gagner le match ?'
    let correction1 = 'Notons M l\'événement "Mener à la mi-temps" et nonM l\'événement contraire.<br>'
    correction1 += 'Notons G l\'événement "Gagner le match" et nonP l\'événement contraire "Ne pas gagner le match".<br>'
    correction1 += `$\\phantom{\\text{P("Ne pas perdre le match")}} = ${texProba(pM, this.sup)} + $${texProba(pG, this.sup)}$ <br> `
    correction1 += `$\\phantom{\\text{P("Ne pas perdre le match")}}= ${texProba(add(pM, pG), this.sup)}$  <br>`
    const question2 = 'Quelle est la probabilité, pour cette équipe, de perdre le match ?'
    let correction2 = 'L\'évènement "Perdre le match" est l\'évènement contraire de "Ne pas perdre le match", on peut donc affirmer que : <br> <br>'
    correction2 += '$ \\text{P("Perdre le match") + } \\text{P("Ne pas perdre le match")} = 1$ <br>'
    correction2 += '$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = 1 - \\text{P("Ne pas perdre le match")}$ <br>'
    correction2 += `$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = 1 - $${texProba(add(pM, pG), this.sup)}$  <br>`
    correction2 += `$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = $${texProba(subtract(1, add(pM, pG)), this.sup)}$ <br>`

    this.listeQuestions.push(question1, question2)
    this.listeCorrections.push(correction1, correction2)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Proba rationnelle', true]
}
