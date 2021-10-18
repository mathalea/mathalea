import { choice, miseEnEvidence, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Puissances de nombre entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can3C01
 */
export default function CalculPuissanceSimple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = choice([2, 3, 4])
    const b = randint(20, 50)
    const c = [['Le double', 'La moitié'], ['Le triple', 'Le tiers'], ['Le quadruple', 'Le quart']]
    switch (choice(['a', 'b', 'c', 'd'])) { // 'b', 'c'
      case 'a':
        this.question = `${c[a - 2][0]} de  $${a}^{${b}}$ est égal à : `
        this.reponse = [`${a}^{${b + 1}}`]
        this.correction = `${c[a - 2][0]} de $${a}^{${b}}$ se calcule  par 
       : <br>
       $${a}\\times ${a}^{${b}}=${a}^{${b} + 1}=${a}^{${miseEnEvidence(b + 1)}}$`
        break
      case 'b':
        this.question = `${c[a - 2][1]} de $${a}^{${b}}$ est égal à : `
        this.reponse = [`${a}^{${b - 1}}`]
        this.correction = `${c[a - 2][1]} de $${a}^{${b}}$ se calcule  par 
      : <br> 
      
      $ ${a}^{${b}}\\div ${a}=\\dfrac{${a}^{${b}}}{${a}}=${a}^{${b} - 1}=${a}^{${miseEnEvidence(b - 1)}}$`
        break
      case 'c' :
        this.question = ` $${a ** 2}\\times ${a}^{${b}}=$ <br>
      Donner le résultat sous la forme d'une puissance de $${a}$.`
        this.reponse = [`${a}^{${b + 2}}`]
        this.correction = ` Comme $${a ** 2}=${a}^2$, alors $${a ** 2}\\times ${a}^{${b}}=${a}^2\\times ${a}^{${b}}=${a}^{${b}+2}=${a}^{${miseEnEvidence(2 + b)}}$`
        break
      case 'd' :
        this.question = ` $${a}^{${b}}\\div ${a ** 2}=$ <br>
        Donner le résultat sous la forme d'une puissance de $${a}$.`
        this.reponse = [`${a}^{${b - 2}}`]
        this.correction = `Comme $${a ** 2}=${a}^2$, alors $${a}^{${b}}\\div ${a ** 2}=
        \\dfrac{${a}^{${b}}}{${a}^2}=${a}^{${b}-2}=${a}^{${miseEnEvidence(b - 2)}}$`
        break
    // this.optionsChampTexte = { texteApres: "(juste l'exposant)" }
    }
  }
}
