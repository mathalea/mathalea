import { calcul, choice, randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Diviser par 9'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C06
 */
export const uuid = '8be78'
export const ref = 'can6C06'
export default function DivisionPar9 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const b = randint(2, 9)
    let a
    switch (choice([1, 2, 3])) {
      case 1:
        a = b * 90 + 9
        this.question = `$${a}\\div 9=$`
        this.reponse = calcul(a / 9)
        this.correction = `$${a}\\div 9 = ${this.reponse}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On décompose $${a}$ en $${b * 90}+9$.<br>
$${b * 90}\\div 9= ${b * 10}$ et $9\\div 9=1$. <br>
On obtient donc comme résultat : $${a}\\div 9=${b * 10}+1$, soit $${a / 9}$.
          `)
        break
      case 2:
        a = b * 900 + 9
        this.question = `$${a}\\div 9=$`
        this.reponse = calcul(a / 9)
        this.correction = `$${a}\\div 9 = ${this.reponse}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On décompose $${a}$ en $${b * 900}+9$.<br>
$${b * 900}\\div 9= ${b * 100}$ et $9\\div 9=1$. <br>
On obtient donc comme résultat : $${a}\\div 9=${b * 100}+1$, soit $${a / 9}$.
          `)
        break
      case 3:
        a = b * 900 + 90
        this.question = `$${a}\\div 9=$`
        this.reponse = calcul(a / 9)
        this.correction = `$${a}\\div 9 = ${this.reponse}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        On décompose $${a}$ en $${b * 900}+90$.<br>
$${b * 900}\\div 9= ${b * 100}$ et $90\\div 9=10$. <br>
On obtient donc comme résultat : $${a}\\div 9=${b * 100}+10$, soit $${a / 9}$.
          `)
        break
    }
  }
}
