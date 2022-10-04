import Exercice from '../../Exercice.js'
import { choice, randint, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
export const titre = 'Calculer avec une racine carrée (définition)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '19/09/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/

export default function CalculAvecRacineDef () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline nospacebefore'

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, choix
    switch (choice([1, 2, 3, 4, 5, 6, 7, 8])) { //
      case 1 :
        a = choice([1, 4, 9, 16, 25, 36, 49, 64, 81, 100])
        if (choice([true, false])) {
          this.question = `Calculer : <br>$(\\sqrt{${a}})^2=$ `
          this.correction = `$\\sqrt{${a}}$ est le nombre positif dont le carré est $${a}$. <br>
          Ainsi, $(\\sqrt{${a}})^2=\\sqrt{${a}}\\times \\sqrt{${a}}=${a}$.
`
        } else {
          this.question = `Calculer : <br>$(-\\sqrt{${a}})^2=$ `
          this.correction = `$\\sqrt{${a}}$ est le nombre positif dont le carré est $${a}$. <br>
        Ainsi, $(-\\sqrt{${a}})^2=(-\\sqrt{${a}})\\times (-\\sqrt{${a}})=\\sqrt{${a}}\\times \\sqrt{${a}}=${a}$.
`
        }
        if (!this.interactif) {
          this.question += ' $\\dots$'
        }
        this.reponse = a
        break

      case 2 :
        a = randint(1, 10)
        choix = choice([true, false])

        this.question = `Calculer :<br> ${choix ? '' : '$-$'}$\\sqrt{${a * a}}=$ `
        this.correction = `$\\sqrt{${a * a}}$ est le nombre positif dont le carré est $${a * a}$. <br>
          Le nombre positif dont le carré est $${a * a}$ est $${a}$.
          Ainsi, ${choix ? `$\\sqrt{${a * a}}=${a}$` : `$-\\sqrt{${a * a}}=${-a}$`}.
  `
        if (!this.interactif) {
          this.question += ' $\\dots$'
        }
        this.reponse = choix ? a : -a

        break

      case 3 :
        a = choice([2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 25, 36, 49, 64, 81, 100]) * choice([-1, 1])

        this.question = `Calculer :<br> $\\sqrt{${ecritureParentheseSiNegatif(a)}^2}=$ `
        if (a < 0) {
          this.correction = `$\\sqrt{(${a})^2}=\\sqrt{${-a}^2}=\\sqrt{${-a}\\times ${-a}}=\\sqrt{${-a}}\\times \\sqrt{${-a}}=(\\sqrt{${-a}})^2$.<br>
        $\\sqrt{${-a}}$ est le nombre positif dont le carré est $${-a}$, donc $(\\sqrt{${-a}})^2=${-a}$. <br>
         Ainsi, $\\sqrt{(${a})^2}=${-a}$.`
        } else {
          this.correction = `$\\sqrt{${a}^2}=\\sqrt{${a}\\times ${a}}=\\sqrt{${a}}\\times \\sqrt{${a}}=(\\sqrt{${a}})^2$.<br>
         $\\sqrt{${a}}$ est le nombre positif dont le carré est $${a}$, donc $(\\sqrt{${a}})^2=${a}$. <br>
          Ainsi, $\\sqrt{${a}^2}=${a}$.`
        }
        if (!this.interactif) {
          this.question += ' $\\dots$'
        }
        if (a < 0) { this.reponse = -a } else { this.reponse = a }

        break

      case 4 :
        a = randint(2, 30, [4, 9, 16, 25])
        choix = choice([true, false])
        if (choice([true, false])) {
          this.question = `Calculer : <br>$${choix ? '' : '-'}\\sqrt{${a}}\\times \\sqrt{${a}}=$ `
          this.correction = `$ ${choix ? '' : '-'}\\sqrt{${a}}\\times \\sqrt{${a}}= ${choix ? '' : '-'}(\\sqrt{${a}})^2$.<br>
           $\\sqrt{${a}}$ est le nombre positif dont le carré est $${a}$, donc $(\\sqrt{${a}})^2=${a}$. <br>
            Ainsi, $${choix ? '' : '-'}\\sqrt{${a}}\\times \\sqrt{${a}}=${choix ? '' : '-'} ${a}$.`
        } else {
          this.question = `Calculer : <br>$\\sqrt{${a}}\\times${choix ? '' : '(-'} \\sqrt{${a}}${choix ? '' : ')'}=$ `
          this.correction = `$\\sqrt{${a}}\\times${choix ? '' : '(-'} \\sqrt{${a}}${choix ? '' : ')'}= ${choix ? '' : '-'}(\\sqrt{${a}})^2$.<br>
            $\\sqrt{${a}}$ est le nombre positif dont le carré est $${a}$, donc $(\\sqrt{${a}})^2=${a}$. <br>
             Ainsi, $\\sqrt{${a}}\\times${choix ? '' : '(-'} \\sqrt{${a}}${choix ? '' : ')'}=${choix ? '' : '-'} ${a}$.`
        }

        if (!this.interactif) {
          this.question += ' $\\dots$'
        }
        this.reponse = choix ? a : -a

        break

      case 5 :
        a = randint(2, 30, [4, 9, 16, 25])
        choix = choice([true, false])

        this.question = `Écrire plus simplement : <br>$\\sqrt{${a}}+ \\sqrt{${a}}=$ `
        this.correction = `La somme de deux racines carrées n'est pas égale à la racine carrée de la somme.<br> Autrement dit, $\\sqrt{${a}}+ \\sqrt{${a}}$
             n'est pas égal à $\\sqrt{${2 * a}}$.<br>
             En revanche on peut écrire : $\\sqrt{${a}}+ \\sqrt{${a}}= 2\\sqrt{${a}}$.`

        if (!this.interactif) {
          this.question += ' $\\dots$'
        }
        this.reponse = [`2\\sqrt{${a}}`]

        break

      case 6 :
        a = randint(2, 10)
        choix = choice([true, false])

        this.question = `Donner le nombre ${choix ? 'positif' : 'négatif'} dont le carré est $${a}$.`
        if (a === 4) {
          this.correction = `Par définition, le nombre positif dont le carré est $${a}$ est $\\sqrt{${a}}=2$.<br>`
          this.correction += `${choix ? '' : `Ainsi, le nombre négatif dont le carré est $${a}$ est $-\\sqrt{${a}}=-2$`}.`
        }
        if (a === 9) {
          this.correction = `Par définition, le nombre positif dont le carré est $${a}$ est $\\sqrt{${a}}=3$.<br>`
          this.correction += `${choix ? '' : `Ainsi, le nombre négatif dont le carré est $${a}$ est $-\\sqrt{${a}}=-3$`}.`
        }
        if (a !== 4 && a !== 9) {
          this.correction = `Par définition, le nombre positif dont le carré est $${a}$ est $\\sqrt{${a}}$.<br>`
          this.correction += `${choix ? '' : `Ainsi, le nombre négatif dont le carré est $${a}$ est $-\\sqrt{${a}}$`}.`
        }

        this.reponse = choix ? [`\\sqrt{${a}}`, Math.sqrt(a)] : [`-\\sqrt{${a}}`, -Math.sqrt(a)]

        break

      case 7 :
        a = randint(2, 10)
        choix = choice([true, false])
        if (choice([true, false])) {
          this.question = `Un nombre ${choix ? 'positif' : 'négatif'} a pour  carré $${a}$.<br>
                Quel est ce nombre ?`
        } else {
          this.question = `Le carré d'un nombre ${choix ? 'positif' : 'négatif'} est $${a}$.<br>
                Quel est ce nombre ?`
        }

        if (a === 4) {
          this.correction = `Par définition, le nombre positif dont le carré est $${a}$ est $\\sqrt{${a}}=2$.<br>`
          this.correction += `${choix ? '' : `Ainsi, le nombre négatif dont le carré est $${a}$ est $-\\sqrt{${a}}=-2$`}.`
        }
        if (a === 9) {
          this.correction = `Par définition, le nombre positif dont le carré est $${a}$ est $\\sqrt{${a}}=3$.<br>`
          this.correction += `${choix ? '' : `Ainsi, le nombre négatif dont le carré est $${a}$ est $-\\sqrt{${a}}=-3$`}.`
        }
        if (a !== 4 && a !== 9) {
          this.correction = `Par définition, le nombre positif dont le carré est $${a}$ est $\\sqrt{${a}}$.<br>`
          this.correction += `${choix ? '' : `Ainsi, le nombre négatif dont le carré est $${a}$ est $-\\sqrt{${a}}$`}.`
        }
        break
      case 8 :
        a = randint(1, 12)

        this.question = `Quel est le nombre dont la racine carrée vaut $${a}$ ?`

        this.correction = `Comme $\\sqrt{${a ** 2}}=${a}$, le nombre dont la racine carrée est $${a}$ est $${a ** 2}$.`

        this.reponse = a ** 2

        break
    }
  }
}
