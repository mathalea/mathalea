import Exercice from '../../Exercice.js'
import { randint, calcul, choice, texNombre, texNombrec } from '../../../modules/outils.js'

export const titre = 'Calcul astucieux avec 100 ou 10'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Créé pendant l'été 2021
 * Référence can5C13
 * Date de publication
*/
export default function CalculAstucieux1 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const d = calcul(a + b * 0.1 + c * 0.01)
    const e = calcul((2 * a + 1) / 2)
    const f = calcul(randint(1, 9) - 0.2)
    const g = randint(10, 90)
    switch (choice(['a', 'b', 'c', 'd', 'e', 'f', 'g'])) {
      case 'a':
        this.question = `$4 \\times ${texNombre(d)}\\times 25$`
        this.correction = `$4 \\times ${texNombre(d)}\\times 25 = 100 \\times ${texNombre(d)} = ${texNombrec(100 * d)}$`
        this.reponse = calcul(100 * d)
        break
      case 'b':
        this.question = `$2 \\times ${texNombre(d)}\\times 50$`
        this.correction = `$2 \\times ${texNombre(d)}\\times 50 = 100 \\times ${texNombre(d)} = ${texNombrec(100 * d)}$`
        this.reponse = calcul(100 * d)
        break

      case 'c':
        this.question = `$25 \\times ${texNombre(d)}\\times 4$`
        this.correction = `$25 \\times ${texNombre(d)}\\times 4 = 100 \\times ${texNombre(d)} = ${texNombrec(100 * d)}$`
        this.reponse = calcul(100 * d)
        break
      case 'd':
        this.question = `$2,5 \\times ${texNombre(d)}\\times 4$`
        this.correction = `$2,5 \\times ${texNombre(d)}\\times 4 = 100 \\times ${texNombre(d)} = ${texNombrec(100 * d)}$`
        this.reponse = calcul(10 * d)
        break
      case 'e':
        this.question = `$${texNombre(e)} \\times ${texNombre(d)}+${texNombre(10 - e)}\\times ${texNombre(d)}$`
        this.correction = `$${e} \\times ${texNombre(d)}+${texNombre(10 - e)}\\times ${texNombre(d)}=${texNombre(d)}(${texNombre(e)}+${texNombre(10 - e)})=${texNombre(d)}\\times 10=${texNombrec(10 * d)}$`
        this.reponse = calcul(10 * d)
        break
      case 'f':
        this.question = `$${texNombre(f)} \\times ${texNombre(d)}+${texNombre(10 - f)}\\times ${texNombre(d)}$`
        this.correction = `$${f} \\times ${texNombre(d)}+${texNombre(10 - f)}\\times ${texNombre(d)}=${texNombre(d)}(${texNombre(f)}+${texNombre(10 - f)})=${texNombre(d)}\\times 10=${texNombrec(10 * d)}$`
        this.reponse = calcul(10 * d)
        break
      case 'g':
        this.question = `$${texNombre(g)} \\times ${texNombre(d)}+${texNombre(100 - g)}\\times ${texNombre(d)}$`
        this.correction = `$${g} \\times ${texNombre(d)}+${texNombre(100 - g)}\\times ${texNombre(d)}=${texNombre(d)}(${texNombre(g)}+${texNombre(100 - g)})=${texNombre(d)}\\times 100=${texNombrec(100 * d)}$`
        this.reponse = calcul(100 * d)
        break
    }
  }
}
