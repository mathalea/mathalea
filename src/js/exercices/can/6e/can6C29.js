import Exercice from '../../Exercice.js'
import { randint, choice, texteEnCouleur } from '../../../modules/outils.js'
export const titre = 'Résoudre un problème de partage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '1/11/2021'
export const amcType = 'AMCNum'
export const amcReady = true

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can6C29
*/
export const uuid = 'c9168'
export const ref = 'can6C29'
export default function Partage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' €' }
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  const nbrePers = [
    ['Trois', 'trois', 3], ['Quatre', 'quatre', 4], ['Cinq', 'cinq', 5],
    ['Six', 'six', 6], ['Sept', 'sept', 7], ['Huit', 'huit', 8], ['Neuf', 'neuf', 9]]
  let nombre, a, b, prix, n
  this.nouvelleVersion = function () {
    nombre = choice(nbrePers)
    a = nombre[0]
    b = nombre[1]
    n = nombre[2]
    this.reponse = randint(21, 29) // La réponse, c'est ce nombre
    prix = this.reponse * n // calcul n'est pas utile pour la multiplication d'entiers
    this.question = `${a} amis mangent au restaurant. L'addition sélève à $${prix}$ euros. 
    Les amis décident de partager la note en ${b}.<br>
    Quelle est la somme payée par chacun ?`
    this.correction = `$${prix}\\div ${n}=${this.reponse}$.`

    this.correction += texteEnCouleur(`<br> Mentalement : <br>
     Plutôt que d'effectuer la division, évaluez un ordre de grandeur du résultat en multipliant $${n}$ par $20$ pour obtenir une valeur proche du montant de l'addition.<br>
     $${n}\\times 20=${n * 20}$.<br>
     Il reste alors $${prix}-${n * 20}=${prix - n * 20}$ € à partager en ${b}, 
     soit $${prix - n * 20}\\div ${n}=${(prix - n * 20) / n}$ € qui sont à rajouter aux $20$ €. `)
  }
}
