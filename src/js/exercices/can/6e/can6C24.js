import { choice } from '../../../modules/outils/arrays.js'
import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { calcul, texNombre } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Multiplier par 0,1 ou 0,01 ou 0,001'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Publié le 15/09/2021
 * Référence can6C24
 */
export const uuid = '53034'
export const ref = 'can6C24'
export default function MultiplierParPuissanceDixNeg () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, b)
    const facteur = calcul(a * 100 + b * 10 + c)
    const d = choice([0.1, 0.01, 0.001])
    this.reponse = calcul(facteur * d)

    if (d === 0.1) {
      this.question = `Calculer $${facteur}\\times ${texNombre(d)}$.`
      this.correction = `$${facteur}\\times ${texNombre(d)}=${texNombre(this.reponse)}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
  Multiplier par $0,1$ revient à diviser par $10$. <br>
  Quand on divise par $10$, le chiffre des unités (chiffre souligné) dans le nombre  $${a}${b}\\underline{${c}}$ 
  devient le chiffre des dixièmes. On obtient alors :<br>
  $${facteur}\\times ${texNombre(d)}=${facteur}\\div 10=${a}${b},\\underline{${c}}$.<br>
  Remarque : En multipliant un nombre par $0,1$, le résultat doit être plus petit que le nombre multiplié.
     `)
    }
    if (d === 0.01) {
      this.question = `Calculer $${facteur}\\times ${texNombre(d)}$.`
      this.correction = `$${facteur}\\times ${texNombre(d)}=${texNombre(this.reponse)}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
  Multiplier par $0,01$ revient à diviser par $100$. <br>
  Quand on divise par $100$, le chiffre des unités (chiffre souligné) dans le nombre  $${a}${b}\\underline{${c}}$  
  devient le chiffre des centièmes. On obtient alors :<br>
  $${facteur}\\times ${texNombre(d)}=${facteur}\\div 100=${a},${b}\\underline{${c}}$.<br>
  Remarque : En multipliant un nombre par $0,01$, le résultat doit être plus petit que le nombre multiplié.
     `)
    }
    if (d === 0.001) {
      this.question = `Calculer $${facteur}\\times ${texNombre(d)}$.`
      this.correction = `$${facteur}\\times ${texNombre(d)}=${texNombre(this.reponse)}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
  Multiplier par $0,001$ revient à diviser par $1000$. <br>
  Quand on divise par $1000$, le chiffre des unités (chiffre souligné) dans le nombre  $${a}${b}\\underline{${c}}$ 
  devient le chiffre des millièmes. On obtient alors :<br>
  $${facteur}\\times ${texNombre(d)}=${facteur}\\div 1000=0,${a}${b}\\underline{${c}}$.<br>
  Remarque : En multipliant un nombre par $0,001$, le résultat doit être plus petit que le nombre multiplié.
     `)
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
