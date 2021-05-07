/* eslint-disable camelcase */
import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombrec, tex_prix, modal_url } from '../../modules/outils.js'
export const titre = 'Coefficient multiplicateur d’une variation en pourcentage'

/**
* Déterminer le coefficient de proportionnalité associé à une évolution en pourcentage ou l'inverse
*
*
* @Auteur Rémi Angot
* 3P10-1
*/
export default function Coefficient_evolution () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Compléter.'
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.boutonAide = modal_url(numeroExercice, 'https://coopmaths.fr/aide/3P10/')
    this.sup = parseInt(this.sup)

    let type_de_questions_disponibles = []
    if (this.sup === 1) {
      type_de_questions_disponibles = ['coef+', 'coef-']
    }
    if (this.sup === 2) {
      type_de_questions_disponibles = ['taux+', 'taux-']
    }
    if (this.sup === 3) {
      type_de_questions_disponibles = ['coef+', 'coef-', 'taux+', 'taux-']
    }
    const listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, taux, coeff, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      taux = choice([randint(1, 9) * 10, randint(1, 9)])
      switch (listeTypeDeQuestions[i]) {
        case 'coef+':
          texte = `Augmenter de $${taux}~\\%$ revient à multiplier par...`
          coeff = tex_prix(calcul(1 + taux / 100))
          texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par ${coeff} car $100~\\% + ${taux}~\\% = ${100 + taux}~\\%$.`
          break
        case 'coef-':
          texte = `Diminuer de $${taux}~\\%$ revient à multiplier par...`
          coeff = tex_prix(calcul(1 - taux / 100))
          texteCorr = `Diminuer de $${taux}~\\%$ revient à multiplier par ${coeff} car $100~\\% - ${taux}~\\% = ${100 - taux}~\\%$.`
          break
        case 'taux+':
          coeff = texNombrec(1 + taux / 100)
          texte = `Multiplier par ${coeff} revient à...`
          texteCorr = `Multiplier par ${coeff} revient à augmenter de $${taux}~\\%$ car $${coeff} = ${100 + taux}~\\% = 100~\\% + ${taux}~\\%$.`
          break
        case 'taux-':
          coeff = texNombrec(1 - taux / 100)
          texte = `Multiplier par ${coeff} revient à...`
          texteCorr = `Multiplier par ${coeff} revient à diminuer de $${taux}~\\%$ car $${coeff} = ${100 - taux}~\\% = 100~\\% - ${taux}~\\%$.`
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Déterminer le coefficient\n2 : Exprimer une variation en pourcentage\n3 : Mélange des 2 types de questions']
}
