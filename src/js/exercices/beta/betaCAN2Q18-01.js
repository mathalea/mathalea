import Exercice from '../Exercice.js'
import { randint, calcul, choice, texFractionReduite, texNombrec } from '../../modules/outils.js'
export const titre = 'Calculs de probabilités2'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function CalculsProbabilite2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur10 inline'
  this.nouvelleVersion = function () {
    let a, b
    switch (choice(['a', 'a', 'b'])) {
      case 'a':
        a = randint(2, 9)
        b = randint(5, 15)
        this.question = `Dans une urne, il y a $${a}$ boules noires et $${b}$ boules blanches.<br>
              On tire une boule de manière équiprobable. <br>
              La probabilité d'obtenir une boule noire est : <br>
             (donner le résultat sous la forme d'une fraction irréductible)`
        this.optionsChampTexte = { texteApres: '' }
        this.correction = `La probabilité est donnée par : $\\dfrac{${a}}{${a}+${b}}=${texFractionReduite(a, a + b)}$`
        this.reponse = `${texFractionReduite(a, a + b)}`
        break
      case 'b':
        if (choice([true, false])) {
          a = randint(1, 9)
          b = 10 - a
          this.question = `Une urne contient $${a}$ boules bleues et $${b}$ boules rouges. <br>
        On tire une boule au hasard.<br>
        Quelle est la probabilité de tirer une boule bleue ?<br>
        On donnera le résultat sous forme décimale.`
          this.optionsChampTexte = { texteApres: '' }
          this.correction = `La probabilité est donnée par : $\\dfrac{${a}}{${a}+${b}}= ${texNombrec(a / 10)}$.`
          this.reponse = calcul(a / 10)
        } else {
          a = randint(10, 80)
          b = 100 - a
          this.question = `Une urne contient $${a}$ boules bleues et $${b}$ boules rouges. <br>
            On tire une boule au hasard.<br>
            Quelle est la probabilité de tirer une boule bleue ?<br>
            On donnera le résultat sous forme décimale.`
          this.optionsChampTexte = { texteApres: '' }
          this.correction = `La probabilité est donnée par : $\\dfrac{${a}}{${a}+${b}}= ${texNombrec(a / 100)}$.`
          this.reponse = calcul(a / 100)
        }
        break
    }
  }
}
