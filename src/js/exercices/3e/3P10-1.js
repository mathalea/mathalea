/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, modalUrl, texNombre, contraindreValeur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Decimal from 'decimal.js'
export const titre = 'Coefficient multiplicateur d\'une variation en pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
* Déterminer le coefficient de proportionnalité associé à une évolution en pourcentage ou l'inverse
*
*
* @author Rémi Angot
* 3P10-1
*/
export const uuid = '4ce2d'
export const ref = '3P10-1'
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
    let typesDeQuestionsDisponibles = []
    this.sup = contraindreValeur(1, 3, this.sup, 1)
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
          coeff = texNombre(1 + taux / 100, 2)
          texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par $${coeff}$ car $100~\\% + ${taux}~\\% = ${100 + taux}~\\%$.`
          reponse = new Decimal(taux).div(100).add(1)
          setReponse(this, i, reponse, { formatInteractif: 'calcul' })

          break
        case 'coef-':
          texte = `Diminuer de $${taux}~\\%$ revient à multiplier par...`
          coeff = texNombre(1 - taux / 100, 2)
          texteCorr = `Diminuer de $${taux}~\\%$ revient à multiplier par $${coeff}$ car $100~\\% - ${taux}~\\% = ${100 - taux}~\\%$.`
          reponse = new Decimal(-taux).div(100).add(1)
          setReponse(this, i, reponse, { formatInteractif: 'calcul' })

          break
        case 'taux+':
          coeff = texNombre(1 + taux / 100, 2)
          texte = this.interactif ? `Multiplier par $${coeff}$ revient à faire...` : `Multiplier par $${coeff}$ revient à...`
          texteCorr = `Multiplier par $${coeff}$ revient à augmenter de $${taux}~\\%$ car $${coeff} = ${100 + taux}~\\% = 100~\\% + ${taux}~\\%$.`
          reponse = `+${taux}\\%`
          setReponse(this, i, reponse, { formatInteractif: 'texte' })

          break
        case 'taux-':
          coeff = texNombre(1 - taux / 100, 2)
          texte = this.interactif ? `Multiplier par $${coeff}$ revient à faire...` : `Multiplier par $${coeff}$ revient à...`
          texteCorr = `Multiplier par $${coeff}$ revient à diminuer de $${taux}~\\%$ car $${coeff} = ${100 - taux}~\\% = 100~\\% - ${taux}~\\%$.`
          reponse = `-${taux}\\%`
          setReponse(this, i, reponse, { formatInteractif: 'texte' })
          break
      }
      texte += ajouteChampTexteMathLive(this, i)
      if (this.questionJamaisPosee(i, taux)) { // Si la question n'a jamais été posée, on en créé une autre
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
