import Exercice from '../../Exercice.js'
import { randint, calcul, choice, prenomM } from '../../../modules/outils.js'
export const titre = 'Dénombrer dans une situation concrète'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2P02
 * Date de publication septembre 2021
*/
export const uuid = '38207'
export const ref = 'can2P02'
export default function Denombrement () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, prenom1
    switch (choice(['a', 'b'])) {
      case 'a':
        a = randint(3, 5)
        b = randint(2, 4)
        c = randint(2, 4)
        this.question = `A la cantine, il y a toujours $${a}$ entrées différentes, $${b}$ plats différents et $${c}$ desserts différents.<br>
        Combien de menus (composés d'une entrée, d'un plat et d'un dessert) différents peut-on avoir dans cette cantine ?`
        this.optionsChampTexte = { texteApres: '' }
        this.correction = `On peut avoir : $${a}\\times ${b}\\times ${c} =${a * b * c}$ menus diférents.`
        this.reponse = calcul(a * b * c)
        break
      case 'b' :
        a = randint(2, 8)
        b = randint(2, 10)
        prenom1 = prenomM()
        this.question = `Pour composer son costume, ${prenom1} a le choix  entre $${a}$ chemises et $${b}$ cravates.<br>
        De combien de manières différentes peut-il composer son costume ?`
        this.optionsChampTexte = { texteApres: '' }
        this.correction = `Il a : $${a}\\times ${b} =${a * b}$ manières de composer son costume.`
        this.reponse = calcul(a * b)
        break
    }
  }
}
