import { choice } from '../../../modules/outils/arrays.js'
import { randint } from '../../../modules/outils/entiers.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer et utiliser un agrandissement/réduction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora
  * Créé pendant l'été 2021
 * Référence can3G01
*/
export const uuid = 'dcc68'
export const ref = 'can3G01'
export default function AgrandissementReduction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c
    switch (choice(['a', 'b', 'c', 'c'])) {
      case 'a':
        a = randint(2, 10)

        this.question = `Les longueurs d'un triangle sont multipliées par $${a}$.<br>
        Par quelle valeur est multipliée son aire ?
        `
        this.optionsChampTexte = { texteApres: '' }
        this.reponse = a * a
        this.correction = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$, soit ici par $${a}^2=${a ** 2}$.<br>
        `
        break
      case 'b':
        a = randint(2, 10)
        b = a * a
        this.question = `L'aire d'un quadrilatère a été multipliée par $${b}$.<br>
        Par quelle valeur ont été multipliées les longueurs de ce quadrilatère ?
        `
        this.optionsChampTexte = { texteApres: '' }
        this.reponse = a
        this.correction = ` Si les aires sont multiplées par $k$, les longueurs sont multipliées par $\\sqrt{k}$, soit ici par $\\sqrt{${b}}=${a}$.<br>
        `
        break
      case 'c':
        a = randint(2, 4)// aire
        c = randint(2, 4)// coefficient

        this.question = `Les longueurs d'un rectangle de $${a}$ cm$^2$  sont multipliées par $${c}$.<br>
            Quelle est l'aire du rectangle ainsi obtenu ?        `
        this.optionsChampTexte = { texteApres: ' cm$^2$' }
        this.reponse = a * c * c
        this.correction = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$, soit ici par $${c}^2=${c ** 2}$.<br>
            Ainsi, l'aire du nouveau rectangle est : $${a}\\times ${c * c}=${a * c * c}$ cm $^2$.
    `
        break
    }
  }
}
