import Exercice from '../../Exercice.js'
import { randint, choice, texNombrec, texteEnCouleur, calcul, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
export const titre = 'Calculer avec un programme de calcul'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export const uuid = '9094b'
export const ref = 'can3C08'
export default function ProgrammeCalcul () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  // ${texNombrec(ecritureParenthesesSiNegatif(a / 5 - e))}^2=${texNombrec((a / 5 - e) * (a / 5 - e))}$
  this.nouvelleVersion = function () {
    const a = calcul(randint(2, 9) * 5)
    const b = calcul(randint(2, 9) * 4)
    const c = calcul(randint(2, 9) * 3)
    const d = calcul(randint(2, 9) * 6)
    const e = randint(2, 9, [a / 5, b / 4, c / 3, d / 6])
    const N = choice(['quart', 'tiers', 'cinquième', 'sixième'])

    if (N === 'cinquième') {
      this.question = `Prendre le ${N} de $${a}$, puis soustraire $${e}$ et élever le résultat au carré. <br>
      
     Quel nombre obtient-on ?`
      this.correction = `$\\bullet$ On prend le ${N} de $${a}$ : $\\dfrac{1}{5}\\times ${a}=${texNombrec(a / 5)}$.
    <br>
    $\\bullet$ On soustrait $${e}$, on obtient : $${texNombrec(a / 5)}-${texNombrec(e)}=${texNombrec(a / 5 - e)}$.
    <br>
    $\\bullet$ On élève au carré :  $${ecritureParentheseSiNegatif(a / 5 - e)}^2= ${texNombrec((a / 5 - e) * (a / 5 - e))}$.  
      `
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Prendre le cinquième d'un nombre revient à le diviser par 5.<br>
       Ainsi, le ${N} de $${a}$ est égal à $${a}\\div 5=${a / 5}$.
        `)
      this.reponse = (a / 5 - e) * (a / 5 - e)
    }
    if (N === 'quart') {
      this.question = `Prendre le ${N} de $${b}$, puis soustraire $${e}$ et élever le résultat au carré. <br>

      Quel nombre obtient-on ?`
      this.correction = `$\\bullet$ On prend le ${N} de $${b}$ : $\\dfrac{1}{4}\\times ${b}=${texNombrec(b / 4)}$.
      <br>
      $\\bullet$ On soustrait $${e}$, on obtient : $${texNombrec(b / 4)}-${texNombrec(e)}=${texNombrec(b / 4 - e)}$.
      <br>
      $\\bullet$ On élève au carré : $${ecritureParentheseSiNegatif(b / 4 - e)}^2= ${texNombrec((b / 4 - e) * (b / 4 - e))}$. `
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Prendre le quart d'un nombre revient à le diviser par 4.<br>
     Ainsi, le ${N} de $${b}$ est égal à $${b}\\div 4=${b / 4}$.
      `)
      this.reponse = (b / 4 - e) * (b / 4 - e)
    }
    if (N === 'tiers') {
      this.question = `Prendre le ${N} de $${c}$, puis soustraire $${e}$ et élever le résultat au carré. <br>

     Quel nombre obtient-on ?`
      this.correction = `$\\bullet$ On prend le ${N} de $${c}$ : $\\dfrac{1}{3}\\times ${c}=${texNombrec(c / 3)}$.
      <br>
      $\\bullet$ On soustrait $${e}$, on obtient : $${texNombrec(c / 3)}-${texNombrec(e)}=${texNombrec(c / 3 - e)}$.
      <br>
      $\\bullet$ On élève au carré : $${ecritureParentheseSiNegatif(c / 3 - e)}^2= ${texNombrec((c / 3 - e) * (c / 3 - e))}$. `
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Prendre le tiers d'un nombre revient à le diviser par 3.<br>
       Ainsi, le ${N} de $${c}$ est égal à $${c}\\div 3=${c / 3}$.
        `)
      this.reponse = (c / 3 - e) * (c / 3 - e)
    }
    if (N === 'sixième') {
      this.question = `Prendre le ${N} de $${d}$, puis soustraire $${e}$ et élever le résultat au carré. <br>
      Quel nombre obtient-on ?`
      this.correction = `$\\bullet$ On prend le ${N} de $${d}$ : $\\dfrac{1}{6}\\times ${d}=${texNombrec(d / 6)}$.
      <br>
      $\\bullet$ On soustrait $${e}$, on obtient : $${texNombrec(d / 6)}-${texNombrec(e)}=${texNombrec(d / 6 - e)}$.
      <br>
      $\\bullet$ On élève au carré : $${ecritureParentheseSiNegatif(d / 6 - e)}^2= ${texNombrec((d / 6 - e) * (d / 6 - e))}$. `
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Prendre le sixième d'un nombre revient à le diviser par 6.<br>
     Ainsi, le ${N} de $${d}$ est égal à $${d}\\div 6=${d / 6}$.
      `)
      this.reponse = (d / 6 - e) * (d / 6 - e)
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
