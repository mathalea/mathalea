import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, stringNombre } from '../../modules/outils.js'
import Decimal from 'decimal.js/decimal.mjs'
import { all, create } from 'mathjs'
export const titre = 'Somme de deux entier'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

const bmath = create(all)

bmath.config({ number: 'BigNumber' })

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
    Decimal.precision = 40
    Decimal.toExpNeg = -40
    Decimal.toExpPos = 40
    const a = new Decimal(this.sup)

    console.log(stringNombre(a))
    console.log(stringNombre(Math.log10(a), 5))

    listeQuestionsToContenu(this)
  }
}
