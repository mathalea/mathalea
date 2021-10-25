import Exercice from '../Exercice.js'
import { randint } from '../../modules/outils.js'
export const titre = 'Somme de deux entier'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Rémi Angot
 * Référence
 * Date de publication
*/
export default function NomExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const a = randint(1, 10)
    const b = randint(1, 10)
    this.question = `$${a}+${b}$`
    this.correction = `$${a} + ${b} = ${a + b}$`
    this.reponse = a + b
  }
}
