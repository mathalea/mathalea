import Exercice from '../Exercice.js'
import { choice } from '../../modules/outils.js'
export const titre = 'Problème : produit de 3 âges'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '20/11/2022'

/**
 * @author Rémi Angot
 * Référence
*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion () {
    const nbPremiers = [2, 3, 5, 7, 11, 13, 17]
    let a = choice(nbPremiers)
    let b = choice(nbPremiers)
    let c = choice(nbPremiers, a)
    ;[a, b, c] = [a, b, c].sort((a, b) => a - b)
    this.question = `Trois soeurs sont dans une maison. Le produit de leurs âges est égal à $${a * b * c}$. Deux d'entre elles peuvent être jumelles. Quel est l'âge de l'aînée ?`
    this.correction = `On peut utiliser la décomposition en produit de facteurs premiers : $${a * b * c} = ${a} \\times ${b} \\times ${c}$.`
    this.correction += `<br><br>Il n'y a qu'un seul produit de trois facteurs égal à $${a * b * c}$ donc l'aînée a ${c} ans.`
    this.reponse = c
  }
}
