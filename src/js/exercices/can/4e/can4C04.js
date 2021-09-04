import { choice, ecritureAlgebrique, ecritureParentheseSiNegatif, miseEnEvidence, randint, shuffle } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Règle des signes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function RegleDesSignes () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.nouvelleVersion = function () {
    let a = randint(-5, 5, [-1, 0, 1])
    const b = randint(-4, 4, [-1, 0, 1, a])
    const c = randint(2, 3)
    if (a > 0 && b > 0) {
      a = -a
    }
    const d = a * b * c
    const f = shuffle([a, b, c]) // on brasse les facteurs
    switch (randint(0, 2)) {
      case 0:
        this.question = `$${f[0]}\\times ${ecritureParentheseSiNegatif(f[1])}\\times$ ? $=${d}$`
        this.reponse = f[2]
        this.correction = `Comme le produit $${f[0]}\\times ${ecritureParentheseSiNegatif(f[1])}$ est ${f[0] * f[1] > 0 ? 'positif' : 'négatif'} et que le résultat est ${d > 0 ? 'positif' : 'négatif'} alors le facteur manquant est forcément ${f[2] > 0 ? 'positif' : 'négatif'}.<br>`
        this.correction += `De plus, comme $${Math.abs(f[0])}\\times ${Math.abs(f[1])}=${Math.abs(f[0] * f[1])}=${Math.abs(d)}\\div ${Math.abs(f[2])}$.<br>`
        this.correction += `On en déduit que le facteur manquant est : $${f[2]}$ soit $${f[0]}\\times ${ecritureParentheseSiNegatif(f[1])}\\times ${miseEnEvidence(ecritureParentheseSiNegatif(f[2]))}=${d}$`
        break
      case 1:
        this.question = `$${f[0]}\\times$ ? $\\times ${ecritureParentheseSiNegatif(f[2])}=${d}$`
        this.reponse = f[1]
        this.correction = `Comme le produit $${f[0]}\\times ${ecritureParentheseSiNegatif(f[2])}$ est ${f[0] * f[2] > 0 ? 'positif' : 'négatif'} et que le résultat est ${d > 0 ? 'positif' : 'négatif'} alors le facteur manquant est forcément ${f[1] > 0 ? 'positif' : 'négatif'}.<br>`
        this.correction += `De plus, comme $${Math.abs(f[0])}\\times ${Math.abs(f[2])}=${Math.abs(f[0] * f[2])}=${Math.abs(d)}\\div ${Math.abs(f[1])}$.<br>`
        this.correction += `On en déduit que le facteur manquant est : $${f[1]}$ soit $${f[0]}\\times ${miseEnEvidence(ecritureParentheseSiNegatif(f[1]))} \\times ${ecritureParentheseSiNegatif(f[2])}=${d}$`
        break
      case 2:
        this.question = `? $\\times ${ecritureParentheseSiNegatif(f[1])}\\times ${ecritureParentheseSiNegatif(f[2])}=${d}$`
        this.reponse = f[0]
        this.correction = `Comme le produit $${f[1]}\\times ${ecritureParentheseSiNegatif(f[2])}$ est ${f[1] * f[2] > 0 ? 'positif' : 'négatif'} et que le résultat est ${d > 0 ? 'positif' : 'négatif'} alors le facteur manquant est forcément ${f[0] > 0 ? 'positif' : 'négatif'}.<br>`
        this.correction += `De plus, comme $${Math.abs(f[1])}\\times ${Math.abs(f[2])}=${Math.abs(f[1] * f[2])}=${Math.abs(d)d}\\div ${Math.abs(f[0])}$.<br>`
        this.correction += `On en déduit que le facteur manquant est : $${f[0]}$ soit $${miseEnEvidence(f[0])}\\times ${ecritureParentheseSiNegatif(f[1])} \\times ${ecritureParentheseSiNegatif(f[2])}=${d}$`
        break
    }
  }
}
