import Exercice from '../Exercice.js'
import { fraction } from '../../modules/fractions'
import { randint, choice, calcul, texteEnCouleur } from '../../modules/outils.js'
export const titre = 'Partage'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function Partage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' €' }
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  const nbrePers = [
    ['Trois', 'trois', 3], ['Quatre', 'quatre', 4], ['Cinq', 'cinq', 5],
    ['Six', 'six', 6], ['Sept', 'sept', 7], ['Huit', 'huit', 8], ['Neuf', 'neuf', 9]]
  let nombre, a, b, prix, n, maFraction
  this.nouvelleVersion = function () {
    nombre = choice(nbrePers)
    a = nombre[0]
    b = nombre[1]
    n = nombre[2]
    prix = calcul(randint(21, 29) * n)
    maFraction = fraction(prix, n)
    this.question = `${a} amis mangent au restaurant. L'addition sélève à $${prix}$ euros. <br>
    Les amis décident de partager la note en ${b}.<br>
    Quelle est la somme payée par chacun ?`
    this.correction = `$${prix}\\div ${n}=${maFraction.texFractionSimplifiee}$.`

    this.correction += texteEnCouleur(`<br> Mentalement : <br>
     Plutôt que d'effectuer la division, évaluez un ordre de grandeur du résultat en multipliant $${n}$ par $20$ pour obtenir une valeur proche du montant de l'addition.<br>
     $${n}\\times 20=${n * 20}$.<br>
     Il reste alors $${prix}-${n * 20}=${prix - n * 20}$ € à partager en ${b}, 
     soit $${prix - n * 20}\\div ${n}=${(prix - n * 20) / n}$ € qui sont à rajouter aux $20$ €. `)
    this.reponse = maFraction.texFractionSimplifiee
  }
}
