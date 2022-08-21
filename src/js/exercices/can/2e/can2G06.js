import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, choice, ecritureParentheseSiNegatif, calcul, reduireAxPlusB } from '../../../modules/outils.js'
import { fraction } from '../../../modules/fractions.js'
import FractionX from '../../../modules/FractionEtendue.js'
import { courbe, repere } from '../../../modules/2d.js'
export const titre = 'Déterminer le coefficient directeur d\'une droite'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '30/09/2021'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2G05
 * Date de publication sptembre 2021
*/
export default function CoeffDirecteurDroite () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let xA, yA, xB, yB, n, d, a, b, rep
    switch (choice([1, 2, 3, 4])) {
      case 1:// coefficient directeur droite
        xA = randint(0, 7)
        yA = randint(0, 7)
        xB = randint(0, 7, xA)
        yB = randint(0, 7)
        n = yB - yA
        d = xB - xA

        this.reponse = new FractionX(n, d)
        this.formatInteractif = 'fractionEgale'
        this.question = `Dans un repère du plan, on considère les points $A(${xA};${yA})$ et $B(${xB};${yB})$.<br>
          Calculer le coefficient directeur de la droite $(AB)$.
         `
        this.correction = 'On observe que $ x_B\\neq x_A$.'
        this.correction += '<br>La droite $(AB)$ n\'est donc pas verticale.'
        this.correction += '<br>On peut donc calculer le coefficient directeur de la droite.'
        this.correction += '<br>On sait d\'après le cours : $m=\\dfrac{y_B-y_A}{x_B-x_A}$.'
        this.correction += `<br>On applique avec les données de l'énoncé : 
        $m=\\dfrac{${yB}-${ecritureParentheseSiNegatif(yA)}}{${xB}-${ecritureParentheseSiNegatif(xA)}}=
        ${this.reponse.texFraction}${this.reponse.texSimplificationAvecEtapes()}$.`

        break
      case 2:// coefficient directeur droite
        a = randint(-4, 4, 0)
        b = randint(-4, 4, 0)
        xA = randint(-3, 3, [-1, 0])
        yA = calcul(a * xA + b)
        xB = xA + 1
        yB = calcul(b + a * xB)
        rep = repere({ xMin: -5, yMin: -5, xMax: 5, yMax: 5 })
        this.formatInteractif = 'calcul'
        this.question = 'Donner le coefficient directeur de la droite bleue.<br>'
        this.question += `${mathalea2d({ xmin: -5, ymin: -5, xmax: 5, ymax: 5, pixelsParCm: 18, scale: 0.7, style: 'margin: auto' }, rep, courbe(x => a * x + b, { repere: rep, color: 'blue' }))}`
        this.correction = `Le coefficient directeur est $${a}$.`
        this.reponse = a
        break
      case 3:// coefficient directeur droite a partir equ reduite
        a = randint(-9, 9, 0)
        b = randint(-9, 9, 0)
        this.formatInteractif = 'calcul'
        if (choice([true, false])) {
          this.question = `On considère la droite d'équation $y=${reduireAxPlusB(a, b)}$. <br>
            Le coefficient directeur est :<br>`
          this.correction = `Le coefficient directeur est $${a}$.`
          this.reponse = a
        } else {
          if (a < 0) {
            this.question = `On considère la droite d'équation $y=${b}${reduireAxPlusB(a, 0)}$. <br>
          Le coefficient directeur est :<br>`
            this.correction = `Le coefficient directeur est $${a}$.`
            this.reponse = a
          } else {
            this.question = `On considère la droite d'équation $y=${b}+${reduireAxPlusB(a, 0)}$. <br>Le coefficient directeur est :<br>`
            this.correction = `Le coefficient directeur est $${a}$.`
            this.reponse = a
          }
        }
        break
      case 4:// coefficient directeur fct linéaire
        xA = randint(1, 10)
        yA = randint(-10, 10, 0)
        this.reponse = fraction(yA, xA).simplifie()
        this.formatInteractif = 'fractionEgale'
        this.question = `Le coefficient directeur d'une droite représentant une fonction linéaire passant par le point $A(${xA};${yA})$ est :<br>
          On donnera le résultat sous la forme d'une fraction irréductible ou d'un entier le cas échéant.`
        this.correction = `Le coefficient directeur de la droite est donné par : $m=\\dfrac{y_A}{x_A}=\\dfrac{${yA}}{${xA}}=${this.reponse.texFraction}$.`
        break
    }
  }
}
