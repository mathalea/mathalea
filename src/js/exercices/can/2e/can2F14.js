import Exercice from '../../Exercice.js'
import {
  randint, choice, ecritureParentheseSiNegatif, reduirePolynomeDegre3, texteCentre, reduireAxPlusB,
  ecritureAlgebrique
} from '../../../modules/outils.js'
export const titre = 'Calculer une ordonnée à partir de l’abscisse d’un point'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '27/09/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2F14
 * Date de publication
*/

export default function CalculOrdonneePoint () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  const nomF = [
    ['f'], ['g'], ['h'], ['u'],
    ['v'], ['w']
  ]
  const pointM = [
    ['M'], ['N'], ['P'], ['R'],
    ['S'], ['T']
  ]
  this.nouvelleVersion = function () {
    let a, b, c, abs, ord, nom, point
    switch (choice([1, 2])) { //, , 'b', 'c', 'd'
      case 1:
        a = randint(-10, 10, [0, 1])
        b = randint(-9, 9, 0)
        abs = randint(-10, 10, 0)
        ord = a * abs + b
        nom = choice(nomF)
        point = choice(pointM)
        this.question = `Soit $${nom}$ la fonctiron définie sur $\\mathbb{R}$ par :
        ${texteCentre(`$${nom}(x)=${reduireAxPlusB(a, b)}$`)}  
        On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
       $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs}$. Quelle est son ordonnée ?`

        this.correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>
          $${nom}(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}${ecritureAlgebrique(b)}=${ord}$.<br>
          L'ordonnée du point $${point}$ est $${ord}$.`
        this.reponse = ord
        break
      case 2:
        a = randint(-2, 2, 0)
        b = randint(-3, 3, 0)
        c = randint(-10, 10)
        abs = randint(-5, 5)
        ord = a * abs ** 2 + b * abs + c
        nom = choice(nomF)
        point = choice(pointM)
        this.question = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
  ${texteCentre(`$${nom}(x)=${reduirePolynomeDegre3(0, a, b, c)}$`)}  
  On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
  $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs}$. Quelle est son ordonnée ?`

        this.correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br> `
        if (a !== 1) {
          this.correction += `$${nom}(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}
  =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}=${ord}$.<br>
  L'ordonnée du point $${point}$ est $${ord}$.`
        } else {
          this.correction += `$${nom}(${abs})= ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}
  =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}=${ord}$.<br>
  L'ordonnée du point $${point}$ est $${ord}$.`
        }
        this.reponse = ord

        break
    }
  }
}
