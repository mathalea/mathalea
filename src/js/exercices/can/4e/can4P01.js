import { calcul, choice, randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Résoudre un problème de robinets'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4P01
 */
export const uuid = '8767b'
export const ref = 'can4P01'
export default function ProblemesDeRobinets () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur25 inline'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const a = choice([2, 3, 4, 5, 6, 10]) // nombre de secondes pour remplir un litre
    const b = calcul(60 / a) // nombres de litres/min
    const c = randint(2, b - 1) % 10 // volume du seau à remplir
    this.reponse = calcul(c * a)
    this.question = `Le débit d'eau d'un robinet est de $${b}$ L/min.<br>
    
    Combien de secondes faut-il pour remplir un seau de $${c}$ L ?`
    this.correction = `Il faut $${a * c}$ s pour remplir le seau de $${c}$ L.`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    On commence par déterminer le temps en seconde (puisque dans la question,
       il est demandé un temps en seconde) qu'il faut pour remplir $1$ L.<br>
    Comme le débit est de  $${b}$ L 
    pour une minute soit $60$ secondes, on divise $60$ par $${b}$ pour obtenir 
    ce temps :  $\\dfrac{60}{${b}}=${a}$ s.<br>
    Puisqu'il faut $${a}$ s pour remplir un litre, il en faut $${c}$ fois plus pour remplir un seau de 
    $${c}$ L, soit $${a}\\times ${c}=${a * c}$ s.`)
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
