/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombrec, texPrix, modalUrl } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Coefficient multiplicateur dune variation en pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
* Déterminer le coefficient de proportionnalité associé à une évolution en pourcentage ou l'inverse
*
*
* @author Rémi Angot
* 3P10-1
*/
export default function CoefficientEvolution () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Compléter.'
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.boutonAide = modalUrl(numeroExercice, 'https://coopmaths.fr/aide/3P10/')
    this.sup = parseInt(this.sup)

    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = ['coef+', 'coef-']
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = ['taux+', 'taux-']
      this.introduction = this.interactif ? '<em>Il faut saisir une réponse de la forme +10% ou -10%</em>' : ''
    }
    if (this.sup === 3) {
      typesDeQuestionsDisponibles = ['coef+', 'coef-', 'taux+', 'taux-']
      this.introduction = this.interactif ? '<em>Il faut saisir un nombre décimal ou une réponse de la forme +10% ou -10%</em>' : ''
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, reponse, taux, coeff, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      taux = choice([randint(1, 9) * 10, randint(1, 9)])
      switch (listeTypeDeQuestions[i]) {
        case 'coef+':
          texte = `Augmenter de $${taux}~\\%$ revient à multiplier par...`
          coeff = texPrix(calcul(1 + taux / 100))
          texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par ${coeff} car $100~\\% + ${taux}~\\% = ${100 + taux}~\\%$.`
          reponse = calcul(1 + taux / 100)
          break
        case 'coef-':
          texte = `Diminuer de $${taux}~\\%$ revient à multiplier par...`
          coeff = texPrix(calcul(1 - taux / 100))
          texteCorr = `Diminuer de $${taux}~\\%$ revient à multiplier par ${coeff} car $100~\\% - ${taux}~\\% = ${100 - taux}~\\%$.`
          reponse = calcul(1 - taux / 100)
          break
        case 'taux+':
          coeff = texNombrec(1 + taux / 100)
          texte = this.interactif ? `Multiplier par $${coeff}$ revient à faire...` : `Multiplier par $${coeff}$ revient à...`
          texteCorr = `Multiplier par $${coeff}$ revient à augmenter de $${taux}~\\%$ car $${coeff} = ${100 + taux}~\\% = 100~\\% + ${taux}~\\%$.`
          reponse = `+${taux}\\%`
          break
        case 'taux-':
          coeff = texNombrec(1 - taux / 100)
          texte = this.interactif ? `Multiplier par $${coeff}$ revient à faire...` : `Multiplier par $${coeff}$ revient à...`
          texteCorr = `Multiplier par $${coeff}$ revient à diminuer de $${taux}~\\%$ car $${coeff} = ${100 - taux}~\\% = 100~\\% - ${taux}~\\%$.`
          reponse = `-${taux}\\%`
          break
      }
      setReponse(this, i, reponse)
      texte += ajouteChampTexteMathLive(this, i)
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Déterminer le coefficient\n2 : Exprimer une variation en pourcentage\n3 : Mélange']
}
