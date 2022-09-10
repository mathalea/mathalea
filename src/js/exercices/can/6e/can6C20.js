import { calcul, choice, randint, texNombrec, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver le complément à 1'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6C20
 */
export const uuid = '9e396'
export const ref = 'can6C20'
export default function ComplementAUn () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a
    switch (choice([1, 2, 3])) {
      case 1:
        a = calcul(randint(2, 9) / 10)
        this.question = `$1-${texNombrec(a)}=$`
        this.correction = `$1-${texNombrec(a)}=${texNombrec(1 - a)}$`
        this.reponse = calcul(1 - a)
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    $1$ unité = $10$ dixièmes.<br>
    On enlève $${texNombrec(10 * a)}$ dixièmes à $10$ dixièmes, il en reste $${texNombrec(10 * (1 - a))}$.<br>
    Ainsi, $1-${texNombrec(a)}=${texNombrec(1 - a)}$.  `)
        break
      case 2:
        a = calcul(randint(2, 9) / 100)
        this.question = `$1-${texNombrec(a)}=$`
        this.correction = `$1-${texNombrec(a)}=${texNombrec(1 - a)}$`
        this.reponse = calcul(1 - a)
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    $1$ unité = $100$ centièmes.<br>
    On enlève $${texNombrec(100 * a)}$ centièmes à $100$ centièmes, il en reste $${texNombrec(100 * (1 - a))}$.<br>
    Ainsi, $1-${texNombrec(a)}=${texNombrec(1 - a)}$.  `)
        break
      case 3:
        a = calcul(randint(2, 9) / 1000)
        this.question = `$1-${texNombrec(a)}=$`
        this.correction = `$1-${texNombrec(a)}=${texNombrec(1 - a)}$`
        this.reponse = calcul(1 - a)
        this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    $1$ unité = $1000$ millièmes.<br>
    On enlève $${texNombrec(1000 * a)}$ millièmes à $1000$ millièmes, il en reste $${texNombrec(1000 * (1 - a))}$.<br>
    Ainsi, $1-${texNombrec(a)}=${texNombrec(1 - a)}$.  `)
        break
    }
  }
}
