import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { texNombrec } from '../../../modules/outils/texNombres.js'
export const titre = 'Déterminer le plus petit ensemble de nombres'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '07/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = 'e31d1'
export const ref = 'can2N02'
export default function PlusPetitEnsemble () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'texte'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, b, c, d, listeFractions1, listeFractions2, fraction1, fraction2, choix, choix2, N
    switch (choice(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'])) { //
      case 'a':
        a = randint(0, 150)
        this.question = `Quel est le plus petit ensemble de nombres auquel appartient $${a}$ ?`
        this.correction = `$${a}$ est un entier naturel, on a donc $${a}\\in \\mathbb{N}$`
        this.reponse = ['n', 'N']
        break
      case 'b':
        a = randint(0, 150) * (-1)
        this.question = `Quel est le plus petit ensemble de nombres auquel appartient $${a}$ ?`
        this.correction = `$${a}$ est un entier relatif, on a donc $${a}\\in \\mathbb{Z}$`
        this.reponse = ['z', 'Z']
        break
      case 'c':
        d = randint(0, 9, 0)
        b = randint(0, 9) * choice([-1, 1])
        c = randint(0, 9)
        this.question = `Quel est le plus petit ensemble de nombres auquel appartient $${texNombrec(b + c / 10 + d / 100)}$ ?`
        this.correction = `$${texNombrec(b + c / 10 + d / 100)}$ est un nombre décimal, on a donc $${texNombrec(b + c / 10 + d / 100)}\\in \\mathbb{D}$
            `
        this.reponse = ['d', 'D']
        break
      case 'd':
        choix = choice([true, false])
        a = randint(1, 12)
        this.question = `Quel est le plus petit ensemble de nombres auquel appartient $${choix ? '-' : ''}\\sqrt{${texNombrec(a * a)}}$ ?`
        this.correction = `$${choix ? '-' : ''}\\sqrt{${a * a}}=${choix ? '-' : ''}${a}$  est un entier ${choix ? 'relatif' : 'naturel'}, 
        on a donc $${choix ? '-' : ''}\\sqrt{${texNombrec(a * a)}}\\in ${choix ? '\\mathbb{Z}' : '\\mathbb{N}'}$
            `
        this.reponse = choix ? ['z', 'Z'] : ['n', 'N']
        break
      case 'e':
        a = randint(2, 10)
        b = randint(2, 6)
        choix = choice([true, false])
        this.question = `Quel est le plus petit ensemble de nombres auquel appartient $${choix ? '-' : ''}\\dfrac{${texNombrec(b * a)}}{${a}}$ ?`
        this.correction = `$${choix ? '-' : ''}\\dfrac{${texNombrec(b * a)}}{${a}}=${choix ? '-' : ''}\\dfrac{${b}\\times ${a}}{${a}}=${choix ? '-' : ''}${b}$  est un entier ${choix ? 'relatif' : 'naturel'}, on a donc $${choix ? '-' : ''}\\dfrac{${texNombrec(b * a)}}{${a}}\\in ${choix ? '\\mathbb{Z}' : '\\mathbb{N}'}$
            `

        this.reponse = choix ? ['z', 'Z'] : ['n', 'N']
        break

      case 'f':
        choix = choice([true, false])
        choix2 = choice([true, false])
        listeFractions1 = [[1, 3], [2, 3], [5, 3], [7, 3], [10, 3], [11, 3], [1, 7], [2, 7],
          [3, 7], [4, 7], [6, 7], [5, 7]]
        listeFractions2 = [[1, 2], [1, 4], [3, 4], [1, 5],
          [2, 5], [3, 5], [4, 5], [6, 5], [7, 5], [8, 5], [9, 5], [5, 4], [7, 4], [1, 10], [3, 10], [7, 10], [9, 10], [17, 100], [23, 100]]
        fraction1 = choice(listeFractions1)
        fraction2 = choice(listeFractions2)
        a = fraction1[0]
        b = fraction1[1]
        c = fraction2[0]
        d = fraction2[1]
        this.question = `Quel est le plus petit ensemble de nombres auquel appartient $${choix ? '-' : ''}${choix2 ? `\\dfrac{${a}}{${b}}` : `\\dfrac{${c}}{${d}}`}$ ?`
        this.correction = `$${choix ? '-' : ''}${choix2 ? `\\dfrac{${a}}{${b}}` : `\\dfrac{${c}}{${d}}=${choix ? '-' : ''}${texNombrec(c / d)}`}$ ${choix2 ? 'n’' : ''} est ${choix2 ? 'pas' : ''} un nombre décimal.
          On a donc $${choix ? '-' : ''}${choix2 ? `\\dfrac{${a}}{${b}}` : `\\dfrac{${c}}{${d}}`}\\in$ ${choix2 ? '$\\mathbb{Q}$' : '$\\mathbb{D}$'}
              `
        this.reponse = choix2 ? ['q', 'Q'] : ['d', 'D']

        break
      case 'g':
        choix = choice([true, false])
        listeFractions1 = [[1, 2], [1, 4], [3, 4], [1, 5],
          [2, 5], [3, 5], [4, 5], [6, 5], [7, 5], [8, 5], [9, 5], [5, 4], [7, 4]]
        fraction1 = choice(listeFractions1)
        a = fraction1[0]
        b = fraction1[1]
        this.question = `Quel est le plus petit ensemble de nombres auquel appartient $${choix ? '-' : ''}\\sqrt{\\dfrac{${a * a}}{${b * b}}}$ ?`
        this.correction = `$${choix ? '-' : ''}\\sqrt{\\dfrac{${a * a}}{${b * b}}}=${choix ? '-' : ''}\\dfrac{${a}}{${b}}=${choix ? '-' : ''}${texNombrec(a / b)}$ est  un nombre décimal. On a donc $${choix ? '-' : ''}\\sqrt{\\dfrac{${a * a}}{${b * b}}}\\in \\mathbb{D}$
              `
        this.reponse = ['d', 'D']

        break

      case 'h':
        choix = choice([true, false])
        if (choix === true) {
          a = randint(2, 100, [4, 9, 16, 25, 36, 49, 64, 81])
          this.question = `Quel est le plus petit ensemble de nombres auquel appartient $\\sqrt{${a}}$ ?`
          this.correction = `$\\sqrt{${a}}$  est un nombre irrationnel. On a donc $\\sqrt{${a}}\\in \\mathbb{R}$
            `
          this.reponse = ['r', 'R']
        } else {
          a = randint(1, 12, 10)
          this.question = `Quel est le plus petit ensemble de nombres auquel appartient $\\sqrt{${texNombrec(a * a / 100)}}$ ?`
          this.correction = `$\\sqrt{${texNombrec(a * a / 100)}}=${texNombrec(a / 10)}$  est un nombre décimal. On a donc $\\sqrt{${texNombrec(a * a / 100)}}\\in \\mathbb{D}$`
          this.reponse = ['d', 'D']
        }
        break
      case 'i':// un peu de tout
        choix = choice([true, false])
        N = choice([1, 2, 3])
        if (N === 1) {
          a = randint(2, 9)
          this.question = `Quel est le plus petit ensemble de nombres auquel appartient $${a}${choix ? '+' : ''}\\pi$ ?`
          this.correction = `$${a}${choix ? '+' : ''}\\pi$   est un nombre irrationnel. On a donc $${a}${choix ? '+' : ''}\\pi \\in \\mathbb{R}$ `
          this.reponse = ['r', 'R']
        }
        if (N === 2) {
          a = choice([2, 4, 5])
          b = randint(2, 5)
          this.question = `Quel est le plus petit ensemble de nombres auquel appartient $${choix ? `${a}^{-1}` : `${a}^{${b}}`}$ ?`
          this.correction = `$${choix ? `${a}^{-1}` : `${a}^{${b}}`}=${choix ? `\\dfrac{1}{${a}}` : `${a ** b}`}${choix ? `=${texNombrec(1 / a)}` : ''}$   est un nombre ${choix ? 'décimal' : 'entier naturel'}. 
          On a donc $${choix ? `${a}^{-1} \\in \\mathbb{D}` : `${a}^{${b}}\\in \\mathbb{N}`}$ `
          this.reponse = choix ? ['d', 'D'] : ['n', 'N']
        }
        if (N === 3) {
          a = randint(1, 4)
          b = randint(1, 9)
          this.question = `Quel est le plus petit ensemble de nombres auquel appartient $${b}\\times 10^{${choix ? '-' : ''}${a}}$ ?`
          this.correction = `$${b}\\times 10^{${choix ? '-' : ''}${a}}=${choix ? `${texNombrec(b * 10 ** (-a))}` : `${texNombrec(b * 10 ** a)}`}$   est un nombre ${choix ? 'décimal' : 'entier naturel'}. On a donc $${b}\\times 10^{${choix ? '-' : ''}${a}} \\in ${choix ? '\\mathbb{D}' : '\\mathbb{N}'}$ `
          this.reponse = choix ? ['d', 'D'] : ['n', 'N']
        }
        break
    }
  }
}
