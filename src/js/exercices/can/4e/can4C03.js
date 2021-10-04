import { obtenirListeFractionsIrreductibles } from '../../../modules/fractions'
import { calcul, choice, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Quotient d’entier qui va bien par fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4C03
 */
export default function QuotientEntierQuiVaBienParFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur25 inline'
  this.formatInteractif = 'calcul'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = choice([2, 3, 4, 5, 6])
    const b = a.num * c
    this.question = `$${b}\\div ${a.texFraction}$`
    this.reponse = calcul(a.den * c)
    if (a.num === 1) {
      this.correction = `Diviser par un nombre revient à multiplier par son inverse. <br>
    Ici, on divise par $${a.texFraction}$, donc cela revient à multiplier par son inverse : $${a.inverse().texFraction}$.<br>
    $${b}\\div ${a.texFraction}=${b}\\times ${a.inverse().texFraction}=
        ${c * a.den}$`
    } else {
      this.correction = `Diviser par un nombre revient à multiplier par son inverse. <br>
    Ici, on divise par $${a.texFraction}$, donc cela revient à multiplier par son inverse :  $${a.inverse().texFraction}$.<br>
    $${b}\\div ${a.texFraction}=${b}\\times ${a.inverse().texFraction}=
    \\dfrac{${b}\\times ${a.den}}{${a.num}}=
    ${c}\\times ${a.den}=${c * a.den}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Pour multiplier $${b}$ par $${a.inverse().texFraction}$, 
    on commence par diviser $${b}$ par $${a.num}$,ce qui donne $${b / a.num}$,
     puis on multiplie par $${a.den}$, ce qui donne $${b / a.num}\\times ${a.den}=${c * a.den}$.      `)
    }
  }
}
