import { shuffle, randint, calcul, texteExposant, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer un volume de pyramide'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3E01
*/
export default function CalculVolumePyramide () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: `cm${texteExposant(3)}` }
  this.nouvelleVersion = function () {
    const triplet = shuffle([3, randint(2, 8) * 2, randint(1, 2) * 5])
    const a = triplet[0]
    const b = triplet[1]
    const h = triplet[2]
    this.reponse = calcul(a * b * h / 3)
    this.question = `Une pyramide a une hauteur de $${h}$ cm et pour base un rectangle de dimensions $${a}$ cm et $${b}$ cm. Calculer son volume en cm${texteExposant(3)}.`
    this.correction = `Le volume de cette pyramide est : $\\dfrac{1}{3} \\times ${a} \\times ${b} \\times ${h}=${this.reponse}$ cm${texteExposant(3)}`
    if (h === 3) {
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Le volume d'une pyramide est $\\dfrac{1}{3}\\times \\text{Aire(Base)}\\times \\text{Hauteur}$.<br>
    Puisque la base est un rectangle et que l'aire d'un rectangle est donnée par le produit de la longueur par la largeur, le volume est donc 
    le produit des trois valeurs données par $\\dfrac{1}{3}$.<br>
    Comme l'une des trois longueur est $3$ et que $\\dfrac{1}{3}\\times 3=1$, on obtient le volume en multipliant les deux autres longueurs : $${a} \\times ${b}=${a * b}$.
      `)
    }
    if (a === 3) {
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Le volume d'une pyramide est $\\dfrac{1}{3}\\times \\text{Aire(Base)}\\times \\text{Hauteur}$.<br>
    Puisque la base est un rectangle et que l'aire d'un rectangle est donnée par le produit de la longueur par la largeur, le volume est donc 
    le produit des trois valeurs données par $\\dfrac{1}{3}$.<br>
    Comme l'une des trois longueur est $3$ et que $\\dfrac{1}{3}\\times 3=1$, on obtient le volume en multipliant les deux autres longueurs : $${b} \\times ${h}=${h * b}$.
      `)
    }
    if (b === 3) {
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Le volume d'une pyramide est $\\dfrac{1}{3}\\times \\text{Aire(Base)}\\times \\text{Hauteur}$.<br>
    Puisque la base est un rectangle et que l'aire d'un rectangle est donnée par le produit de la longueur par la largeur, le volume est donc 
    le produit des trois valeurs données par $\\dfrac{1}{3}$.<br>
    Comme l'une des trois longueur est $3$ et que $\\dfrac{1}{3}\\times 3=1$, on obtient le volume en multipliant les deux autres longueurs : $${a} \\times ${h}=${h * a}$.
      `)
    }
  }
}
