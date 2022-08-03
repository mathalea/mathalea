import Exercice from '../../Exercice.js'
import { randint, calcul, choice, texNombre, texteEnCouleur } from '../../../modules/outils.js'

export const titre = 'Calculer astucieusement avec 100 ou 10'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Créé pendant l'été 2021
 * Référence can5C13
 * Date de publication
*/
export default function CalculAstucieux1 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const d = calcul(a + b * 0.1 + c * 0.01)
    const e = calcul((2 * a + 1) / 2)
    const f = calcul(randint(1, 9) - 0.2)
    const g = randint(10, 90)
    switch (choice(['a', 'b', 'c', 'd', 'e', 'f', 'g'])) { //
      case 'a':
        this.question = `$4 \\times ${texNombre(d)}\\times 25=$`
        this.correction = `$4 \\times ${texNombre(d)}\\times 25 = ${texNombre(100 * d)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $4 \\times ${texNombre(d)}\\times 25 =\\underbrace{4\\times 25}_{100}\\times ${texNombre(d)}= 100 \\times ${texNombre(d)} = ${texNombre(100 * d)}$ `)
        this.reponse = calcul(100 * d)
        break
      case 'b':
        this.question = `$2 \\times ${texNombre(d)}\\times 50=$`
        this.correction = `$2 \\times ${texNombre(d)}\\times 50 =  ${texNombre(100 * d)}$`
        this.reponse = calcul(100 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $2 \\times ${texNombre(d)}\\times 50 = \\underbrace{2\\times 50}_{100} \\times ${texNombre(d)} = ${texNombre(100 * d)}$ `)
        break

      case 'c':
        this.question = `$25 \\times ${texNombre(d)}\\times 4=$`
        this.correction = `$25 \\times ${texNombre(d)}\\times 4 =  ${texNombre(100 * d)}$`
        this.reponse = calcul(100 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $25 \\times ${texNombre(d)}\\times 4 = \\underbrace{4\\times 25}_{100} \\times ${texNombre(d)} = ${texNombre(100 * d)}$  `)
        break
      case 'd':
        this.question = `$2,5 \\times ${texNombre(d)}\\times 4=$`
        this.correction = `$2,5 \\times ${texNombre(d)}\\times 4 = 10 \\times ${texNombre(d)} = ${texNombre(10 * d)}$`
        this.reponse = calcul(10 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $2,5 \\times ${texNombre(d)}\\times 4 =\\underbrace{2,5\\times 4}_{10} \\times ${texNombre(d)} = ${texNombre(10 * d)}$ `)
        break
      case 'e':
        this.question = `$${texNombre(e)} \\times ${texNombre(d)}+${texNombre(10 - e)}\\times ${texNombre(d)}=$`
        this.correction = `$${texNombre(e)} \\times ${texNombre(d)}+${texNombre(10 - e)}\\times ${texNombre(d)}=${texNombre(d)}\\times 10=${texNombre(10 * d)}$`
        this.reponse = calcul(10 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On remarque une factorisation possible par le facteur commun $${texNombre(d)}$ qui permet de simplifier le calcul :<br>
        $${texNombre(e)} \\times ${texNombre(d)}+${texNombre(10 - e)}\\times ${texNombre(d)}=${texNombre(d)}\\times(\\underbrace{${texNombre(e)}+${texNombre(10 - e)}}_{10})=${texNombre(d)}\\times 10=${texNombre(10 * d)}$  `)
        break
      case 'f':
        this.question = `$${texNombre(f)} \\times ${texNombre(d)}+${texNombre(10 - f)}\\times ${texNombre(d)}=$`
        this.correction = `$${texNombre(f)} \\times ${texNombre(d)}+${texNombre(10 - f)}\\times ${texNombre(d)}=${texNombre(10 * d)}$`
        this.reponse = calcul(10 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On remarque une factorisation possible par le facteur commun $${texNombre(d)}$ qui permet de simplifier le calcul :<br>
        $${texNombre(f)} \\times ${texNombre(d)}+${texNombre(10 - f)}\\times ${texNombre(d)}=${texNombre(d)}\\times(\\underbrace{${texNombre(f)}+${texNombre(10 - f)}}_{10})=${texNombre(d)}\\times 10=${texNombre(10 * d)}$. `)
        break
      case 'g':
        this.question = `$${texNombre(g)} \\times ${texNombre(d)}+${texNombre(100 - g)}\\times ${texNombre(d)}=$`
        this.correction = `$${g} \\times ${texNombre(d)}+${texNombre(100 - g)}\\times ${texNombre(d)}=${texNombre(100 * d)}$`
        this.reponse = calcul(100 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On remarque une factorisation possible par le facteur commun $${texNombre(d)}$ qui permet de simplifier le calcul :<br>
        $${g} \\times ${texNombre(d)}+${texNombre(100 - g)}\\times ${texNombre(d)}=${texNombre(d)}\\times(\\underbrace{${texNombre(g)}+${texNombre(100 - g)}}_{100})=${texNombre(d)}\\times 100=${texNombre(100 * d)}$  `)
        break
    }
  }
}
