import Exercice from '../Exercice.js'
import { randint, calcul, choice, arrondi } from '../../modules/outils.js'
export const titre = 'Déterminer un effectif à partir d\'une proportion'
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
export default function Effectif () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur25 inline'
  this.optionsChampTexte = { texteApres: ' €' }
  this.nouvelleVersion = function () {
    let a, b, c
    switch (choice(['association'])) {
      case 'association':
        b = randint(3, 80)/* Pourcentage */
        a = randint(20, 50)/* Valeur */
        c = randint(20, 100)/* Dénominateur fraction */

        this.question = `Dans une association,  environ $${b}\\%$ des adhérents ont plus de  de $${a}$ ans. <br>
       Sachant qu'ils représentent $${c}$ personnes, combien de personnes sont adhérentes à l'association ?<br>`

        this.correction = `La population de référence est celle des membres du club.<br>
        La sous-population est celle des plus de $${a}$ ans, 
        qui représente $p=${b}\\%$ des membres d'après l'énoncé. <br>
        Appellons $N$ l'effectif de la population de référence, c'est à dire le nombre d'adhérents de l'association.<br>
        On sait que l'effectif de la sous population étudiée est $n=${c}$ .<br>
        D'après le cours, on sait que $p=\\dfrac{\\text{effectif étudié}}{\\text{effectif total}}=\\dfrac{n}{N}=\\dfrac{${c}}{N}$.
        <br><br>Ainsi,  $p=\\dfrac{${b}}{${100}}= \\dfrac{${c}}{N}$<br>
        Avec un produit en croix, on en déduit que : $${b}\\times N= 100\\times ${c}$.<br>
        On en déduit que $N=\\dfrac{100\\times ${c}}{${b}}\\approx ${arrondi(100 * c / b, 0)}$<br>
      Il y a  $${arrondi(100 * c / b, 0)}$ adhérents dans ce club.`
        this.reponse = calcul(b * c / 100)
        break
    }
  }
}
