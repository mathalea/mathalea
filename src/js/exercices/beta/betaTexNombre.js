import Exercice from '../Exercice.js'
import { texNombre, listeQuestionsToContenu, scientifiqueToDecimal } from '../../modules/outils.js'
import { Decimal } from 'decimal.js'
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
    Decimal.precision = 40
    Decimal.toExpNeg = -40
    Decimal.toExpPos = 40
    const a = new Decimal(this.sup)
    const b = new Decimal(this.sup2)
    this.listeQuestions.push(`$\\dfrac{${texNombre(a)}}{${texNombre(10000000000000000000000)}}=${texNombre(a.div(10000000000000000000000))}$`)
    const c = a.add(b)
    for (let i = 20; i > -40; i -= 6) {
      this.listeQuestions.push(`$${texNombre(a)}\\times 10^{${texNombre(i)}}=${scientifiqueToDecimal(a, i)}$`)
      this.listeCorrections.push(`$${texNombre(a)}\\times 10^{${texNombre(i)}}=${scientifiqueToDecimal(a, i)}$`)
    }
    listeQuestionsToContenu(this)
  }
}
