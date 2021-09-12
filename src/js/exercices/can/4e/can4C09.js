import Exercice from '../../Exercice.js'
import { calcul, choice, combinaisonListes, randint } from '../../../modules/outils.js'
export const titre = 'Puissances de 2, 3, 4 ou 5'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4C08
*/
export default function PuissancesDe2345 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.formatChampTexte = 'largeur25'
  this.nouvelleVersion = function () {
    const a = randint(2, 5)
    let b
    switch (a) {
      case 2:
        b = randint(1, 6)
        break
      case 3:
        b = randint(1, 4)
        break
      case 4:
        b = randint(1, 3)
        break
      case 5:
        b = randint(1, 3)
        break
    }
    this.question = `$${a}^${b}$`
    this.correction = `$${a}^${b}=`
    this.correction += `${a}`
    if (b > 1) {
      for (let i = 1; i < b; i++) {
        this.correction += `\\times${a}`
      }
      this.correction += `=${a ** b}$`
    } else {
      this.correction += '$'
    }
    this.reponse = a ** b
  }
}
