import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, prenom, TrouverSolutionMathador } from '../../modules/outils.js'

export const titre = 'Traduire une succession des opérations par une expression'

/**
 * Transformer un programme de calcul avec les 4 opérations dans un ordre aléatoire en un seul calcul.
 * @author Jean-Claude Lhote
 * Référence 5C11-2
 */
export const uuid = '3406a'
export const ref = '5C11-2'
export default function EcrireUneExpressionMathador () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let expression, calculsSuccessifs, tirage, cible, solutionMathador, quidam
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // traduire un calcul mathador
      solutionMathador = TrouverSolutionMathador(30, 90)
      tirage = solutionMathador[0]
      cible = solutionMathador[1]
      calculsSuccessifs = solutionMathador[2]
      expression = solutionMathador[3]
      quidam = prenom()
      texte = `${quidam} a trouvé une solution mathador pour le tirage suivant $${tirage[0]}~;~${tirage[1]}~;~${tirage[2]}~;~${tirage[3]}~;~${tirage[4]}$ et pour la cible $${cible}$, voici ses calculs :<br>`
      for (let j = 0; j < 4; j++) {
        texte += `$${calculsSuccessifs[j]}$<br>`
      }
      texte += 'Écris cette succession d\'opérations en une seule expression.'
      texteCorr = `L'expression correspondante au calcul de ${quidam} est<br>$${expression}$ ou $${solutionMathador[4]}$.`
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
