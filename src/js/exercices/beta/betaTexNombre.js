import Exercice from '../Exercice.js'
import { randint, texNombre, listeQuestionsToContenu } from '../../modules/outils.js'
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
*/
export default function NomExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.sup = 0
  this.sup2 = 0
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.besoinFormulaireTexte = ['nombre a : ', '']
  this.besoinFormulaire2Texte = ['nombre b : ', '']
  this.nouvelleVersion = function () {
    this.listeCorrections = []
    this.listeQuestions = []

    const a = Number(this.sup) // randint(101, 999) * randint(101, 999) * randint(101, 999) * randint(101, 999)
    const b = Number(this.sup2) // randint(101, 999) * randint(101, 999) * randint(101, 999) * randint(101, 999) / 10 ** 12
    const c = a + b
    this.listeQuestions.push(`$${texNombre(a)}+${texNombre(b)}$`)
    this.listeCorrections.push(`$${texNombre(a)} + ${texNombre(b)} = ${texNombre(c)}$`)
    listeQuestionsToContenu(this)
  }
}
