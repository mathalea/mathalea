import Exercice from '../Exercice.js'
import { texNombre, listeQuestionsToContenu, stringNombre, sp } from '../../modules/outils.js'
import Decimal from 'decimal.js'
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
  this.sup = 0.001
  this.sup2 = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    Decimal.precision = 40
    Decimal.toExpNeg = -40
    Decimal.toExpPos = 40
    const a = parseFloat(this.sup)
    const precision = parseInt(this.sup2)
    this.listeQuestions = [`StringNombre :  ${stringNombre(a, precision)}        TexNombre : $${texNombre(a, precision)}$<br>
    Avec 'force' StringNombre : ${stringNombre(a, precision, true)} ${sp((5))} TexNombre : $${texNombre(a, precision, true)}$`]
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Nombre à tester :']
  this.besoinFormulaire2Numerique = ['Précision voulue :', 6]
}
