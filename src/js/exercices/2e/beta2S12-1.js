import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre, texPrix } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Evolutions successives'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '16/12/2021'

/**
* Problèmes d'évolutions successives'
*
* * Situations variées : ##
*
* * Déterminer l'effectif de la sous population
* * Calculer une proportion
* * Retrouver l'effectif de la population totale'
* * Mélange des 3 types de problèmes
* @author Florence Tapiero
* 2S10-1
*/
export default function EvolutionsSuccesives () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 4 // type de questions
  this.spacing = 1
  this.spacingCorr = 1
}
