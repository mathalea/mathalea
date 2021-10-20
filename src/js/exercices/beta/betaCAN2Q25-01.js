import Exercice from '../Exercice.js'
import { randint, choice, sp, texNombrec, texteEnCouleur, calcul } from '../../modules/outils.js'
export const titre = 'Intervalles'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function Intervalles () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, N, d, e

    switch (choice([1, 2])) {
      case 1:
        a = randint(1, 4) * (-1)
        b = randint(1, 4)
        c = calcul(randint(-4, -1) + randint(-9, -1) / 10)
        N = choice(['a', 'b', 'c', 'd', 'e'])//,
        if (N === 'a') {
          this.question = `Combien y a-t-il d'entiers dans l'intervalle $[${a}${sp(1)} ; ${sp(1)}${b}]$ ?`
          this.correction = ` Il y a $${b - a + 1}$ entiers dans l'intervalle $[${a}${sp(1)}; ${sp(1)}${b}]$.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
  Comptez-les !<br> 
 Ou bien en calculant la différence des bornes et en ajoutant $1$ puisque les bornes de l'intervalles sont "comprises".<br>
 On trouve : $${b}-(${a})+1=${b - a + 1}$.
    `)
          this.reponse = b - a + 1
        }
        if (N === 'b') {
          this.question = `Combien y a-t-il d'entiers dans l'intervalle $]${a}${sp(1)} ; ${sp(1)}${b}]$ ?`
          this.correction = ` Il y a $${b - a}$ entiers dans l'intervalle $]${a}${sp(1)} ; ${sp(1)}${b}]$.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
  Comptez-les !<br> 
 Attention l'entier $${a}$ n'appartient pas à l'intervalle.
    `)
          this.reponse = b - a
        }
        if (N === 'c') {
          this.question = `Combien y a-t-il d'entiers dans l'intervalle $]${a}${sp(1)} ; ${sp(1)}${b}[$ ?`
          this.correction = ` Il y a $${b - a - 1}$ entiers dans l'intervalle $]${a}${sp(1)} ; ${sp(1)}${b}[$.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Comptez-les !<br> 
       Attention les entiers $${a}$ et $${b}$ n'appartiennent pas à l'intervalle.
          `)
          this.reponse = b - a - 1
        }
        if (N === 'd') {
          this.question = `Combien y a-t-il d'entiers dans l'intervalle $[${texNombrec(c)}${sp(1)} ; ${sp(1)} ${b}[$ ?`
          this.correction = `Il y a $${b - Math.trunc(c)}$ entiers dans l'intervalle $[${texNombrec(c)}${sp(1)} ; ${sp(1)} ${b}[$.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Comptez-les !<br> 
                `)
          this.reponse = b - Math.trunc(c)
        }
        if (N === 'e') {
          this.question = `Combien y a-t-il d'entiers dans l'intervalle $[${texNombrec(c)}${sp(1)} ; ${sp(1)} ${b}]$ ?`
          this.correction = `Il y a $${b - Math.trunc(c) + 1}$ entiers dans l'intervalle $[${texNombrec(c)}${sp(1)} ; ${sp(1)} ${b}]$.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Comptez-les !<br> 
            `)
          this.reponse = b - Math.trunc(c) + 1
        }
        break

      case 2 :
        a = randint(1, 4) * (-1)
        b = randint(1, 4)
        c = calcul(randint(-9, -4) + randint(-9, -1) / 10)
        d = calcul(c + randint(2, 3))
        e = randint(-8, -1)
        N = choice(['a', 'b', 'c', 'd'])//, ,,'d'
        if (N === 'a') {
          this.question = `Quel est le plus petit entier appartenant à l'intervalle $]${a}${sp(1)} ; ${sp(1)}${b}[$ ?`
          this.correction = `C'est le plus petit entier strictement supérieur à  $${a}$ : il s'agit de $${a + 1}$.`
          this.reponse = a + 1
        }
        if (N === 'b') {
          this.question = `Quel est le plus petit entier appartenant à l'intervalle $]${texNombrec(c)}${sp(1)} ; ${sp(1)}${b}[$ ?`
          this.correction = `C'est le plus petit entier strictement supérieur à  $${texNombrec(c)}$ : il s'agit de $${Math.trunc(c)}$.`
          this.reponse = Math.trunc(c)
        }
        if (N === 'c') {
          this.question = `Quel est le plus grand entier appartenant à l'intervalle $]${texNombrec(c)}${sp(1)} ; ${sp(1)}${texNombrec(d)}[$ ?`
          this.correction = `C'est le plus grand entier strictement inférieur à  $${texNombrec(d)}$ : il s'agit de $${Math.trunc(d) - 1}$.`
          this.reponse = Math.trunc(d) - 1
        }
        if (N === 'd') {
          this.question = `Quel est le plus grand entier appartenant à l'intervalle $]${texNombrec(c - 6)}${sp(1)} ; ${e}[$ ?`
          this.correction = `C'est le plus grand entier strictement inférieur à  $${e}$ : il s'agit de $${e - 1}$.`
          this.reponse = e - 1
        }
        break
    }
  }
}
