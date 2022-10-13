import { fraction } from '../../../modules/fractions.js'
import { obtenirListeFractionsIrreductibles, texFractionReduite } from '../../../modules/outils/arrayFractions.js'
import { choice } from '../../../modules/outils/arrays.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver l’opposé ou l’inverse d’une fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '05/12/2021'
/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4C02
 */
export const uuid = '87d2f'
export const ref = 'can4C02'
export default function OpposeDeFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur25 inline'
  this.formatInteractif = 'fractionEgale'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = a.d
    let b, d, e

    switch (choice(['a', 'b', 'c', 'd', 'e'])) { //
      case 'a':
        b = a.n
        d = fraction(b, c)
        this.question = `Quel est l'opposé de $\\dfrac{${b}}{${c}}$ ? `
        this.correction = `Deux nombres sont opposés lorsque leur somme est nulle.<br>
        Ainsi, l'opposé de $\\dfrac{${b}}{${c}}$ est $-${d.texFraction}$ car $\\dfrac{${b}}{${c}}+\\left(-${d.texFraction}\\right)=0$.`
        this.reponse = d.oppose()
        break
      case 'b' :
        b = a.n * (-1)
        d = fraction(b, c)
        this.question = `Quel est l'opposé de $\\dfrac{${b}}{${c}}$ ? `
        this.correction = `Deux nombres sont opposés lorsque leur somme est nulle.<br>
        Ainsi, l'opposé de $\\dfrac{${b}}{${c}}$ est $\\dfrac{${-b}}{${c}}$ car $\\dfrac{${b}}{${c}}+\\dfrac{${-b}}{${c}}=0$.`
        this.reponse = d.oppose()
        break

      case 'c' :
        b = a.n
        d = fraction(b, c)
        this.question = `Quel est l'opposé de $-\\dfrac{${b}}{${c}}$ ?`
        this.correction = `Deux nombres sont opposés lorsque leur somme est nulle.<br>
        Ainsi, l'opposé de $-\\dfrac{${b}}{${c}}$ est $${d.texFraction}$ car $-\\dfrac{${b}}{${c}}+${d.texFraction}=0$.`
        this.reponse = d
        break
      case 'd' :
        b = a.n
        d = fraction(b, c)
        e = fraction(c, b)
        this.question = `Quel est l'inverse de $\\dfrac{${b}}{${c}}$ ?`
        this.correction = `Deux nombres sont inverses l'un de l'autre lorsque leur produit vaut $1$.<br>
        Ainsi, l'inverse de $\\dfrac{${b}}{${c}}$ est $${texFractionReduite(c, b)}$ car $\\dfrac{${b}}{${c}}\\times ${texFractionReduite(c, b)}=1$.`
        this.reponse = e
        break
      case 'e' :
        b = a.n
        d = fraction(b, c)
        e = fraction(c, b)
        this.question = `Quel est l'inverse de $-\\dfrac{${b}}{${c}}$ ?`
        this.correction = `Deux nombres sont inverses l'un de l'autre lorsque leur produit vaut $1$.<br>
        Ainsi, l'inverse de $-\\dfrac{${b}}{${c}}$ est $-${texFractionReduite(c, b)}$ car $-\\dfrac{${b}}{${c}}\\times \\left(-${texFractionReduite(c, b)}\\right)=1$ .`
        this.reponse = e.oppose()
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
