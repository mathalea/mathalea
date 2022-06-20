import Exercice from '../Exercice.js'
import { randint, calcul, choice, texNombrec } from '../../modules/outils.js'
export const titre = 'Proportions de proportions'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
* Modèle d'exercice très simple pour la course aux nombres
* @author Stéphane Guyon
* Référence
* Date de publication
*/
export default function ProportiondeProportion () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur25 inline'
  this.optionsChampTexte = { texteApres: ' €' }
  this.nouvelleVersion = function () {
    let a, b, c, d
    switch (choice(['association', 'lycée', 'election'])) {
      case 'association':
        b = randint(3, 80)/* Pourcentage */
        a = randint(20, 50)/* Valeur */
        c = randint(20, 50)/* Dénominateur fraction */
        d = randint(2, 15)/* Multiple */
        this.question = `Dans une association,  $${b}\\%$ des adhérents ont plus de  de $${a}$ ans. <br>
        parmi eux,   $${c}\\%$ à plus de $${d}$ années d'ancienneté.<br>
        Quel est le pourcentage d'adhérents de plus de  $${a}$ ans ayant plus de $${d}$ années d'ancienneté ?`
        this.correction = `La population de référence est celle des membres du club.<br>
        La première sous-population est celle des plus de $${a}$ ans, <br>
        qui représente $p_1=${b}\\%$ de la population de référence. <br>
        Dans cette sous-population, on sait que la population de ceux qui ont plus de $${d}$ années d'ancienneté représente $p_2=${c}\\%$.<br>
        D'après le cours, on calcule $p=p_1\\times p_2$, ce qui rerésente $${b}\\%$ de $${c}\\%$.<br>
      <br>Ainsi,  $p=\\dfrac{${b}}{${100}}\\times \\dfrac{${c}}{${100}}=\\dfrac{${b}\\times${c}}{10000}=\\dfrac{${b * c}}{${10000}}=${texNombrec(b * c / 10000)}$.<br>
      Il y a $${texNombrec(b * c / 100)}\\%$ d'adhérents de plus de  $${a}$ ans ayant plus de $${b}$ années d'ancienneté.`
        this.reponse = calcul(b * c / 100)
        break
      case 'lycée':
        b = randint(20, 40)/* Pourcentage */
        a = randint(20, 50)/* Valeur */
        c = randint(10, 70)/* Dénominateur fraction */
        this.question = `Dans une lycée,  $${b}\\%$ des lycéens sont en classe de 1ère. <br>
            Parmi eux,   $${c}\\%$ sont en filière technologique.<br>
            Quel est le pourcentage d'élèves en 1ère technologique de ce lycée ?`
        this.correction = `La population de référence est celle des élèves du lycée.<br>
            La sous-population est celle des élèves de 1ères.<br>
            d'après l'énoncé, $p_1=${b}\\%$.<br>
             Les élèves de 1ère technologique sont une sous-population des élèves de 1ère, qui représente d'après l'énnoncé d'après l'énoncé, $p_2=${c}\\%$. <br>
             <br>Pour connaître la proportion $p$ des élèves de 1ère technologique par rapport à la population de référence (les élèves du lycée), on sait que : $p=p_1\\times p_2$.<br>
             ce qui revient à calculer $${b}\\%$ de $${c}\\%$.<br>
             <br>Ainsi, $p=\\dfrac{${b}}{${100}}\\times \\dfrac{${c}}{${100}}=\\dfrac{${b}\\times${c}}{10000}=\\dfrac{${b * c}}{${10000}}=${texNombrec(b * c / 10000)}$.<br>
             Il y a $${texNombrec(b * c / 100)}\\%$ d'élèves de 1ère technologique parmi les élèves du lycée.`
        this.reponse = calcul(b * c / 100)
        break
      case 'election':
        b = randint(40, 80)/* Pourcentage */
        a = randint(20, 50)/* Valeur */
        c = randint(10, 70)/* Dénominateur fraction */
        this.question = `Lors d'une élection,  la participation (suffrages exprimés) a été de $${b}\\%$ des inscrits.<br>
               Un candidat a obtenu   $${c}\\%$ des suffrages exprimés.<br>
                Quel est le pourcentage de voix obtenues par ce candidat par rapport au nombre d' inscrits ?`
        this.correction = `La population de référence est celle des inscrits sur les listes électorales.<br>
                La sous-population est celle des suffrages exprimés.<br>
                d'après l'énoncé, $p_1=${b}\\%$.<br>
                 Les suffrages du candidat sont une sous-population des suffrages exprimés, qui représentent d'après l'énnoncé d'après l'énoncé, $p_2=${c}\\%$. <br>
                 <br>Pour connaître le pourcentage de voix obtenues  par ce candidat par rapport aux nombre d'inscrits, on sait que : $p=p_1\\times p_2$.<br>
                 ce qui revient à calculer $${b}\\%$ de $${c}\\%$.<br>
                 <br>Ainsi, $p=\\dfrac{${b}}{${100}}\\times \\dfrac{${c}}{${100}}=\\dfrac{${b}\\times${c}}{10000}=\\dfrac{${b * c}}{${10000}}=${texNombrec(b * c / 10000)}$.<br>
                Ce candidat a obtenu $${texNombrec(b * c / 100)}\\%$ des voix des inscrits.`
        this.reponse = calcul(b * c / 100)
        break
    }
  }
}
