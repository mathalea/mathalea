/* eslint-disable camelcase */

import Exercice from '../ClasseExercice.js'
import { liste_de_question_to_contenu, randint, choice, tex_nombrec } from '../../modules/outils.js'
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
  this.nb_questions_modifiable = false
  this.nb_cols = 2 // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1  // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = [] // Liste de questions
    this.liste_corrections = [] // Liste de questions corrigées

    const pG = randint(20, 60) // pG est un pourcentage
    const pN = randint(10, 100 - pG - 10)
    // const pP = 100 - pG - pN
    const sport = choice(['hand-ball', 'football', 'rugby', 'basket', 'volley-ball', 'water-polo', 'baseball'])
    this.consigne = `Lors d'un match de ${sport}, l'équipe qui reçoit un adversaire a une probabilité de ${tex_nombrec(pG / 100)} de gagner son match`
    this.consigne += ` et ${tex_nombrec(pN / 100)} de faire un match nul.`

    const question1 = 'Quelle est la probabilité, pour cette équipe, de ne pas perdre le match ?'
    let correction1 = 'Ne pas perdre un match, c\'est, soit le gagner, soit faire un match nul, la probabilité est donc : <br> <br>'
    correction1 += '$\\text{P("Ne pas perdre le match")} = \\text{P("Gagner le match") + } \\text{P("Match nul")}$ <br>'
    correction1 += `$\\phantom{\\text{P("Ne pas perdre le match")}} = ${tex_nombrec(pG / 100)} + ${tex_nombrec(pN / 100)}$ <br> `
    correction1 += `$\\phantom{\\text{P("Ne pas perdre le match")}}= ${tex_nombrec((pG + pN) / 100)}$  <br>`
    const question2 = 'Quelle est la probabilité, pour cette équipe, de perdre le match ?'
    let correction2 = 'L\'évènement "Perdre le match" est l\'évènement contraire de "Ne pas perdre le match", on peut donc affirmer que : <br> <br>'
    correction2 += '$ \\text{P("Perdre le match") + } \\text{P("Ne pas perdre le match")} = 1$ <br>'
    correction2 += '$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = 1 - \\text{P("Ne pas perdre le match")}$ <br>'
    correction2 += `$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = 1 - ${tex_nombrec((pG + pN) / 100)}$  <br>`
    correction2 += `$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = ${tex_nombrec(1 - (pG + pN) / 100)}$ <br>`

    this.liste_questions.push(question1, question2)
    this.liste_corrections.push(correction1, correction2)
    liste_de_question_to_contenu(this)
  }
  // this.besoin_formulaire_numerique = ['Niveau de difficulté', 3]
}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu
