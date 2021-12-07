import { fraction, obtenirListeFractionsIrreductibles } from '../../../modules/fractions'
import { choice, texFractionReduite } from '../../../modules/outils'
import Exercice from '../../Exercice'
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
export default function OpposeDeFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur25 inline'
  this.formatInteractif = 'fractionEgale'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = a.den
    let b, d, e

    switch (choice(['a', 'b', 'c', 'd', 'e'])) { //
      case 'a':
        b = a.num
        d = fraction(b, c)
        this.question = `L'opposé de $\\dfrac{${b}}{${c}}$ est : `
        this.correction = `L'opposé de $\\dfrac{${b}}{${c}}$ est $-${d.texFraction}$.`
        this.reponse = d.oppose()
        break
      case 'b' :
        b = a.num * (-1)
        d = fraction(b, c)
        this.question = `L'opposé de $\\dfrac{${b}}{${c}}$ est : `
        this.correction = `L'opposé de $\\dfrac{${b}}{${c}}$ est $\\dfrac{${-b}}{${c}}$.`
        this.reponse = d.oppose()
        break

      case 'c' :
        b = a.num
        d = fraction(b, c)
        this.question = `L'opposé de $-\\dfrac{${b}}{${c}}$ est :`
        this.correction = `L'opposé de $-\\dfrac{${b}}{${c}}$ est $${d.texFraction}$.`
        this.reponse = d
        break
      case 'd' :
        b = a.num
        d = fraction(b, c)
        e = fraction(c, b)
        this.question = `L'inverse de $\\dfrac{${b}}{${c}}$ est :`
        this.correction = `L'inverse de $\\dfrac{${b}}{${c}}$ est $${texFractionReduite(c, b)}$.`
        this.reponse = e
        break
      case 'e' :
        b = a.num
        d = fraction(b, c)
        e = fraction(c, b)
        this.question = `L'inverse de $-\\dfrac{${b}}{${c}}$ est :`
        this.correction = `L'inverse de $\\dfrac{${b}}{${c}}$ est $-${texFractionReduite(c, b)}$.`
        this.reponse = e.oppose()
        break
    }
  }
}
