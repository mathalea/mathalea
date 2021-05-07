/* eslint-disable camelcase */

import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, choice, texNombrec } from '../../modules/outils.js'
export const titre = 'Probabilités simples'
/**
 * Description didactique de l'exercice
 * @Auteur Rémi Angot et Matthieu Devillers
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = 'Probabilités simples'
  this.consigne = ''
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1  // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const pG = randint(20, 60) // pG est un pourcentage
    const pN = randint(10, 100 - pG - 10)
    // const pP = 100 - pG - pN
    const sport = choice(['hand-ball', 'football', 'rugby', 'basket', 'volley-ball', 'water-polo', 'baseball'])
    this.consigne = `Lors d'un match de ${sport}, l'équipe qui reçoit un adversaire a une probabilité de ${texNombrec(pG / 100)} de gagner son match`
    this.consigne += ` et ${texNombrec(pN / 100)} de faire un match nul.`

    const question1 = 'Quelle est la probabilité, pour cette équipe, de ne pas perdre le match ?'
    let correction1 = 'Ne pas perdre un match, c\'est, soit le gagner, soit faire un match nul, la probabilité est donc : <br> <br>'
    correction1 += '$\\text{P("Ne pas perdre le match")} = \\text{P("Gagner le match") + } \\text{P("Match nul")}$ <br>'
    correction1 += `$\\phantom{\\text{P("Ne pas perdre le match")}} = ${texNombrec(pG / 100)} + ${texNombrec(pN / 100)}$ <br> `
    correction1 += `$\\phantom{\\text{P("Ne pas perdre le match")}}= ${texNombrec((pG + pN) / 100)}$  <br>`
    const question2 = 'Quelle est la probabilité, pour cette équipe, de perdre le match ?'
    let correction2 = 'L\'évènement "Perdre le match" est l\'évènement contraire de "Ne pas perdre le match", on peut donc affirmer que : <br> <br>'
    correction2 += '$ \\text{P("Perdre le match") + } \\text{P("Ne pas perdre le match")} = 1$ <br>'
    correction2 += '$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = 1 - \\text{P("Ne pas perdre le match")}$ <br>'
    correction2 += `$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = 1 - ${texNombrec((pG + pN) / 100)}$  <br>`
    correction2 += `$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = ${texNombrec(1 - (pG + pN) / 100)}$ <br>`

    this.listeQuestions.push(question1, question2)
    this.listeCorrections.push(correction1, correction2)
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]
}


