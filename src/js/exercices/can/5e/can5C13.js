import { choice } from '../../../modules/outils/arrays.js'
import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { calcul, texNombre, texNombrec } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
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
export const uuid = 'ca4ce'
export const ref = 'can5C13'
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
        this.question = `Calculer $4 \\times ${texNombre(d)}\\times 25$.`
        this.correction = `$4 \\times ${texNombre(d)}\\times 25 = ${texNombrec(100 * d)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $4 \\times ${texNombre(d)}\\times 25 =\\underbrace{4\\times 25}_{100}\\times ${texNombre(d)}= 100 \\times ${texNombre(d)} = ${texNombrec(100 * d)}$ `)
        this.reponse = calcul(100 * d)
        break
      case 'b':
        this.question = `Calculer $2 \\times ${texNombre(d)}\\times 50$.`
        this.correction = `$2 \\times ${texNombre(d)}\\times 50 =  ${texNombrec(100 * d)}$`
        this.reponse = calcul(100 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $2 \\times ${texNombre(d)}\\times 50 = \\underbrace{2\\times 50}_{100} \\times ${texNombre(d)} = ${texNombrec(100 * d)}$ `)
        break

      case 'c':
        this.question = `Calculer $25 \\times ${texNombre(d)}\\times 4$.`
        this.correction = `$25 \\times ${texNombre(d)}\\times 4 =  ${texNombrec(100 * d)}$`
        this.reponse = calcul(100 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $25 \\times ${texNombre(d)}\\times 4 = \\underbrace{4\\times 25}_{100} \\times ${texNombre(d)} = ${texNombrec(100 * d)}$  `)
        break
      case 'd':
        this.question = `Calculer $2,5 \\times ${texNombre(d)}\\times 4$.`
        this.correction = `$2,5 \\times ${texNombre(d)}\\times 4 = 10 \\times ${texNombre(d)} = ${texNombrec(10 * d)}$`
        this.reponse = calcul(10 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        $2,5 \\times ${texNombre(d)}\\times 4 =\\underbrace{2,5\\times 4}_{10} \\times ${texNombre(d)} = ${texNombrec(10 * d)}$ `)
        break
      case 'e':
        this.question = `Calculer $${texNombre(e)} \\times ${texNombre(d)}+${texNombrec(10 - e)}\\times ${texNombre(d)}$.`
        this.correction = `$${texNombre(e)} \\times ${texNombre(d)}+${texNombrec(10 - e)}\\times ${texNombre(d)}=${texNombre(d)}\\times 10=${texNombrec(10 * d)}$`
        this.reponse = calcul(10 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On remarque une factorisation possible par le facteur commun $${texNombre(d)}$ qui permet de simplifier le calcul :<br>
        $${texNombre(e)} \\times ${texNombre(d)}+${texNombrec(10 - e)}\\times ${texNombre(d)}=${texNombre(d)}\\times(\\underbrace{${texNombre(e)}+${texNombrec(10 - e)}}_{10})=${texNombre(d)}\\times 10=${texNombrec(10 * d)}$  `)
        break
      case 'f':
        this.question = `Calculer $${texNombre(f)} \\times ${texNombre(d)}+${texNombrec(10 - f)}\\times ${texNombre(d)}$.`
        this.correction = `$${texNombre(f)} \\times ${texNombre(d)}+${texNombrec(10 - f)}\\times ${texNombre(d)}=${texNombrec(10 * d)}$`
        this.reponse = calcul(10 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On remarque une factorisation possible par le facteur commun $${texNombre(d)}$ qui permet de simplifier le calcul :<br>
        $${texNombre(f)} \\times ${texNombre(d)}+${texNombrec(10 - f)}\\times ${texNombre(d)}=${texNombre(d)}\\times(\\underbrace{${texNombre(f)}+${texNombrec(10 - f)}}_{10})=${texNombre(d)}\\times 10=${texNombrec(10 * d)}$. `)
        break
      case 'g':
        this.question = `Calculer $${texNombre(g)} \\times ${texNombre(d)}+${texNombrec(100 - g)}\\times ${texNombre(d)}$.`
        this.correction = `$${g} \\times ${texNombre(d)}+${texNombrec(100 - g)}\\times ${texNombre(d)}=${texNombrec(100 * d)}$`
        this.reponse = calcul(100 * d)
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On remarque une factorisation possible par le facteur commun $${texNombre(d)}$ qui permet de simplifier le calcul :<br>
        $${g} \\times ${texNombre(d)}+${texNombrec(100 - g)}\\times ${texNombre(d)}=${texNombre(d)}\\times(\\underbrace{${texNombre(g)}+${texNombrec(100 - g)}}_{100})=${texNombre(d)}\\times 100=${texNombrec(100 * d)}$  `)
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
