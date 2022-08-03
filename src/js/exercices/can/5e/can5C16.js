import Exercice from '../../Exercice.js'
import { randint, texNombre, choice, calcul } from '../../../modules/outils.js'
export const titre = 'Calculer astucieusement avec une factorisation'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can5C17
 * Date de publication 18/10/2021
*/
export default function CalculAstucieuxAvecFactorisation () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, d
    switch (choice(['a', 'b', 'c', 'c', 'd', 'e'])) { //
      case 'a':

        a = randint(5, 99) / 10
        b = calcul(randint(2, 9) * 5)
        c = 100 - b
        this.question = `$${b}\\times${texNombre(a)} + ${texNombre(a)}\\times${c}=$ 
`
        this.correction = `On remarque de part et d'autre  du signe "$+$" un facteur commun : $${texNombre(a)}$.<br>
En factorisant par ce nombre, on obtient : <br>
$\\begin{aligned}
${texNombre(b)}\\times${texNombre(a)} + ${texNombre(a)}\\times${c}&=${texNombre(a)}\\underbrace{(${texNombre(b)}+${texNombre(c)})}_{=100}\\\\
&=${texNombre(a)}\\times 100\\\\
&=${texNombre(100 * a)}
\\end{aligned}$`
        this.reponse = 100 * a
        break

      case 'b':
        a = randint(5, 99) / 100
        b = randint(2, 8)
        c = 10 - b
        this.question = `$ ${b}\\times${texNombre(a)}+ ${c}\\times${texNombre(a)}=$ 
`
        this.correction = `On remarque de part et d'autre  du signe "$+$" un facteur commun : $${texNombre(a)}$.<br>
        En factorisant par ce nombre, on obtient : <br>
        $\\begin{aligned}
        ${texNombre(b)}\\times${texNombre(a)} + ${texNombre(c)}\\times${texNombre(a)}&=${texNombre(a)}\\underbrace{(${texNombre(b)}+${texNombre(c)})}_{=10}\\\\
        &=${texNombre(a)}\\times 10\\\\
        &=${texNombre(10 * a)}
        \\end{aligned}$`
        this.reponse = 10 * a
        break

      case 'c':
        a = randint(5, 99, [10, 20, 30, 40, 50, 60, 70, 80, 90]) / 10
        b = randint(2, 8) / 10
        d = randint(1, 2)
        c = d - b
        this.question = `$ ${texNombre(b)}\\times${texNombre(a)}+ ${texNombre(c)}\\times${texNombre(a)}=$ 
`
        this.correction = `On remarque de part et d'autre  du signe "$+$" un facteur commun : $${texNombre(a)}$.<br>
        En factorisant par ce nombre, on obtient : <br>
$\\begin{aligned}
${texNombre(a)}\\times ${texNombre(b)}+${texNombre(a)}\\times ${texNombre(c)}&=${texNombre(a)}\\underbrace{(${texNombre(b)}+${texNombre(c)})}_{=${d}}\\\\
&=${texNombre(a)}\\times ${d}\\\\
&=${texNombre(d * a)}
\\end{aligned}$`
        this.reponse = d * a
        break
      case 'd':
        a = calcul(randint(5, 99) / 100)
        b = calcul(randint(2, 99) / 10)
        c = 10 - b
        this.question = `$ ${texNombre(b)}\\times${texNombre(a)}+ ${texNombre(c)}\\times${texNombre(a)}=$ 
    `
        this.correction = `On remarque de part et d'autre  du signe "$+$" un facteur commun : $${texNombre(a)}$.<br>
            En factorisant par ce nombre, on obtient : <br>
            $\\begin{aligned}
            ${texNombre(b)}\\times${texNombre(a)} + ${texNombre(c)}\\times${texNombre(a)}&=${texNombre(a)}\\underbrace{(${texNombre(b)}+${texNombre(c)})}_{=10}\\\\
            &=${texNombre(a)}\\times 10\\\\
            &=${texNombre(10 * a)}
            \\end{aligned}$`
        this.reponse = 10 * a
        break
      case 'e':
        a = calcul(randint(1, 12) * 10)
        b = calcul(randint(2, 9) / 10)
        c = 5 - b
        this.question = `$ ${texNombre(a)}\\times${texNombre(b)}+ ${texNombre(c)}\\times${texNombre(a)}=$ 
    `
        this.correction = `On remarque de part et d'autre  du signe "$+$" un facteur commun : $${texNombre(a)}$.<br>
            En factorisant par ce nombre, on obtient : <br>
            $\\begin{aligned}
            ${texNombre(a)}\\times${texNombre(b)}+ ${texNombre(c)}\\times${texNombre(a)}&=${texNombre(a)}\\underbrace{(${texNombre(b)}+${texNombre(c)})}_{=5}\\\\
            &=${texNombre(a)}\\times 5\\\\
            &=${texNombre(5 * a)}
            \\end{aligned}$`
        this.reponse = 5 * a
        break
    }
  }
}
