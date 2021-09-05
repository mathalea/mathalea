import Exercice from '../Exercice.js'
import { randint, calcul, choice, texNombrec } from '../../modules/outils.js'
export const titre = 'Pourcentage (proportion) 1'
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
export default function PoucentageP1 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur11 inline'
  this.nouvelleVersion = function () {
    let b
    switch (choice(['a', 'b', 'c', 'd', 'e', 'f'])) { //
      case 'a':
        b = randint(3, 7) * 5
        this.question = `$\\dfrac{1}{5}$ des élèves d'une classe de $${b}$ élèves a des lunettes.<br>
              Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `Si $\\dfrac{1}{5}$ en a, $\\dfrac{4}{5}$ n'en a pas, soit : $4\\times \\dfrac{${b}}{5}=${texNombrec(4 * b / 5)}$.`
        this.reponse = calcul(4 * b / 5)
        break
      case 'b':
        b = randint(3, 6) * 6
        this.question = `$\\dfrac{1}{6}$ des élèves d'une classe de $${b}$ élèves a des lunettes.<br>
            Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `Si $\\dfrac{1}{6}$ en a, $\\dfrac{5}{6}$ n'en a pas, soit : $5\\times \\dfrac{${b}}{6}=${texNombrec(5 * b / 6)}$.`
        this.reponse = calcul(5 * b / 6)
        break
      case 'c':
        b = randint(2, 5) * 7
        this.question = `$\\dfrac{1}{7}$ d'une classe de $${b}$ élèves ont des lunettes.<br>
        Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `Si $\\dfrac{1}{7}$ en a, $\\dfrac{6}{7}$ n'en a pas, soit : $6\\times \\dfrac{${b}}{7}=${texNombrec(6 * b / 7)}$.`
        this.reponse = calcul(6 * b / 7)
        break
      case 'd':
        b = randint(3, 9) * 4
        this.question = `$\\dfrac{1}{4}$ d'une classe de $${b}$ élèves ont des lunettes.<br>
            Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `Si $\\dfrac{1}{4}$ en a, $\\dfrac{3}{4}$ n'en a pas, soit : $3\\times \\dfrac{${b}}{4}=${texNombrec(3 * b / 4)}$.`
        this.reponse = calcul(3 * b / 4)
        break
      case 'e':
        b = randint(3, 7) * 5
        this.question = `$20$ % des élèves d'une classe de $${b}$ élèves a des lunettes.<br>
              Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `$20$ % de $${b}$ est égal à $0,2\\times ${b}=${texNombrec(0.2 * b)}$.<br>
        $${texNombrec(0.2 * b)}$ élèves ont des lunettes, donc $${b}-${texNombrec(0.2 * b)}=${texNombrec(0.8 * b)}$ n'en ont pas.`
        this.reponse = calcul(b - 0.2 * b)
        break
      case 'f':
        b = randint(3, 9) * 4
        this.question = `$25$ % des élèves d'une classe de $${b}$ élèves a des lunettes.<br>
                  Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `$25$ % de $${b}$ est égal à $\\dfrac{1}{4}\\times ${b}=${texNombrec(0.25 * b)}$.<br>
            $${texNombrec(0.25 * b)}$ élèves ont des lunettes, donc $${b}-${texNombrec(0.25 * b)}=${texNombrec(0.75 * b)}$ n'en ont pas.`
        this.reponse = calcul(b - 0.25 * b)
        break
    }
  }
}
