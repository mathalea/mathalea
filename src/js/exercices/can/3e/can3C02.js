import { texNombre, randint, sp, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une moyenne avec des décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3C02
*/
export default function MoyenneEntiereDeDecimaux () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    this.reponse = randint(7, 15) // la moyenne attendue on la multiplie par 10 pour l'avoir en 1/10e
    const a = randint(4, this.reponse, [10, 20]) * 10 + randint(1, 9) // premier nombre à ajouter multiplié par 10 pour l'avoir en 1/10e
    let b, c
    do {
      b = randint(a, this.reponse * 30 - a, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]) // deuxième nombre x 10
      if ((a + b) % 10 === 0) {
        if (b % 10 === 1) {
          b += 3
        } else {
          b -= 1
        }
      }
      c = this.reponse * 30 - a - b
    } while (b < 0 || c < 0)
    this.question = `Calculer la moyenne des nombres :<br>$${sp(8)}${texNombre(a / 10)}${sp(8)}${texNombre(b / 10)}${sp(8)}${texNombre(c / 10)}$`
    this.correction = `La moyenne des trois nombres est : $\\dfrac{${texNombre(a / 10)}+${texNombre(b / 10)}+${texNombre(c / 10)}}{3}
    =\\dfrac{${texNombre(a / 10 + b / 10 + c / 10)}}{3}= ${this.reponse}$.`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    
    Pour faire la somme des trois nombres, <br>
    $\\bullet$ On commence par faire la somme de leurs unités : 
    $${Math.floor(a / 10)}+${Math.floor(b / 10)}+${Math.floor(c / 10)}
    =${texNombre(Math.floor(a / 10) + Math.floor(b / 10) + Math.floor(c / 10))}$.<br>
    $\\bullet$ Puis celle de leurs dixièmes :  
    $${texNombre((a / 10) - Math.floor(a / 10))}+${texNombre((b / 10) - Math.floor(b / 10))}+${texNombre((c / 10) - Math.floor(c / 10))}=
    ${texNombre((a / 10) - Math.floor(a / 10) + (b / 10) - Math.floor(b / 10) + (c / 10) - Math.floor(c / 10))}$
    <br>
    $\\bullet$ On les additionne : 
    $${texNombre(Math.floor(a / 10) + Math.floor(b / 10) + Math.floor(c / 10))}
    +${texNombre((a / 10) - Math.floor(a / 10) +
      (b / 10) - Math.floor(b / 10) +
      (c / 10) - Math.floor(c / 10))}=${texNombre(a / 10 + b / 10 + c / 10)}$
    <br>

    $\\bullet$ On divise par le nombre de valeurs (soit $3$) : $\\dfrac{${texNombre(a / 10 + b / 10 + c / 10)}}{3}= ${this.reponse}$  <br>
      `)
  }
}
