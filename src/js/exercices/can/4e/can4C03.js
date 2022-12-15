import { obtenirListeFractionsIrreductibles } from '../../../modules/fractions.js'
import { calcul, choice, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Effectuer une division avec une fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4C03
 */
export const uuid = '22c4c'
export const ref = 'can4C03'
export default function QuotientEntierQuiVaBienParFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur25 inline'
  this.formatInteractif = 'calcul'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = choice([2, 3, 4, 5, 6])
    const b = a.n * c
    this.question = `Calculer $${b}\\div ${a.texFraction}$.`
    this.reponse = calcul(a.d * c)
    if (a.n === 1) {
      this.correction = `Diviser par un nombre revient à multiplier par son inverse. <br>
    Ici, on divise par $${a.texFraction}$, donc cela revient à multiplier par son inverse : $${a.inverse().texFraction}$.<br>
    $${b}\\div ${a.texFraction}=${b}\\times ${a.inverse().texFraction}=
        ${c * a.d}$`
    } else {
      this.correction = `Diviser par un nombre revient à multiplier par son inverse. <br>
    Ici, on divise par $${a.texFraction}$, donc cela revient à multiplier par son inverse :  $${a.inverse().texFraction}$.<br>
    $${b}\\div ${a.texFraction}=${b}\\times ${a.inverse().texFraction}=
    \\dfrac{${b}\\times ${a.d}}{${a.n}}=
    ${c}\\times ${a.d}=${c * a.d}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Pour multiplier $${b}$ par $${a.inverse().texFraction}$, 
    on commence par diviser $${b}$ par $${a.n}$, ce qui donne $${b / a.n}$,
     puis on multiplie par $${a.d}$, ce qui donne $${b / a.n}\\times ${a.d}=${c * a.d}$.      `)
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
