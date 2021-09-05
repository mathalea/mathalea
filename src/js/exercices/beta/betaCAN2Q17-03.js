import Exercice from '../Exercice.js'
import { calcul, choice, texNombrec, randint, texNombre } from '../../modules/outils.js'
export const titre = 'Pourcentage (proportion) 2'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Référence
 * Date de publication
*/
export default function PoucentageP2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur10 inline'
  this.nouvelleVersion = function () {
    let a, b, c
    switch (choice(['a', 'b'])) { //, 'c', 'd', 'e', 'f'
      case 'a':
        if (choice([true, false])) {
          a = choice([20, 40])
          b = choice([4, 8, 16])
          this.question = ` Dans un groupe de $${a}$ enfants, $${b}$  sont des filles.<br>
       Elles représentent ..... % du groupe.`
          this.optionsChampTexte = { texteApres: '%' }
          this.correction = `La proportion de filles est donnée par $\\dfrac{${b}}{${a}}=${texNombrec(b / a)}$, soit $${texNombrec((b / a) * 100)}$%.`
          this.reponse = calcul((b / a) * 100)
        } else {
          a = choice([30, 60])
          b = choice([6, 12, 18, 24])
          this.question = ` Dans un groupe de $${a}$ enfants, $${b}$  sont des filles.<br>
           Elles représentent ..... % du groupe.`
          this.optionsChampTexte = { texteApres: '%' }
          this.correction = `La proportion de filles est donnée par $\\dfrac{${b}}{${a}}=${texNombrec(b / a)}$, soit $${texNombrec((b / a) * 100)}$%.`
          this.reponse = calcul((b / a) * 100)
        }
        break
      case 'b':
        a = calcul(randint(1, 5) * 1000)
        b = calcul(randint(1, 8) * 10)
        c = calcul(randint(1, 8) * 10)
        this.question = `Une ville compte $${texNombre(a)}$ logements. Parmi ces logements, $${b}$ %  sont des appartements et $${c}$ % de ceux-ci sont des T2.<br>
        Quel est le nombre de T2 dans cette ville ?`
        this.optionsChampTexte = { texteApres: '' }
        this.correction = `Les appartements type T2 représentent $${b}$ % de $${c}$ % des logements.<br>
        $${b}$ % de $${a}=${texNombrec(b / 100)}\\times ${a}=${texNombrec(b * a / 100)}$.<br>
        Il y a $${texNombrec(b * a / 100)}$ appartements dans cette ville.<br>
        $${c}$ % de $${texNombrec(b * a / 100)}=${texNombrec(c / 100)}\\times ${b * a / 100}=${texNombrec(c * b * a / 10000)}$.<br>
        Il y a donc $${texNombrec(c * b * a / 10000)}$ d'appartements type T2 dans cette ville.
        `
        this.reponse = calcul(c * b * a / 10000)
        break
    }
  }
}
