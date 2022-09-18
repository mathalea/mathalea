import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, ecritureAlgebriqueSauf1, randint, rienSi1, sp, abs, choice, ecritureAlgebrique } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Résoudre une équation du second degré sans $\\Delta$'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '17/09/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/

export default function ResoudreEquationsSecondDegreSansDelta () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.spacing = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const choixab1 = [[2, 8], [-2, -8], [-2, 8], [2, -8], [2, 2], [3, -3], [3, 3], [10, 10], [4, 16], [5, 20], [10, 40], [-5, 20], [-5, -20],
      [2, 32], [-2, 32], [-9, 81], [9, 36], [-6, 24], [4, -36], [2, 50], [-2, 50], [3, -12], [3, -48], [3, 48], [-4, 36], [-4, -36]]//
    let texte, texteCorr, a, k, b, c, fraction
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2, 3, 3, 4])) { //
        case 1 :// ax^2-b=0  pour x^2=b/a avec b/a carré parfait positif ou négatif
          fraction = choice(choixab1)
          a = fraction[0]
          b = fraction[1]

          k = -b / a
          if (this.interactif) {
            if (choice([true, false])) {
              texte = `L'ensemble des solutions $S$ de l'équation  $${a}x^2${ecritureAlgebrique(b)}=0$ est :
               `
            } else {
              texte = `L'ensemble des solutions $S$ de l'équation  $${b}${ecritureAlgebrique(a)}x^2=0$ est :
               `
            }
            if (k > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\{-${Math.sqrt(k)}${sp(1)};${sp(1)}${Math.sqrt(k)}\\}$`,
                    statut: true
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false
                  },
                  {
                    texte: `$S=\\{-\\sqrt{${abs(b)}}${sp(1)};${sp(1)}\\sqrt{${abs(b)}}\\}$`,
                    statut: false
                  }
                ]

              }
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: '$S=\\emptyset$',
                    statut: true
                  },
                  {
                    texte: `$S=\\{-\\sqrt{${abs(b)}}${sp(1)};${sp(1)}\\sqrt{${abs(b)}}\\}$`,
                    statut: false
                  },
                  {
                    texte: `$S=\\{-${Math.sqrt(-k)}${sp(1)};${sp(1)}${Math.sqrt(-k)}\\}$`,
                    statut: false
                  }
                ]
              }
            }

            texte += propositionsQcm(this, i).texte
          } else {
            if (choice([true, false])) {
              texte = `Résoudre dans $\\mathbb{R}$ :${sp(2)}
            $${a}x^2${ecritureAlgebrique(b)}=0$`
            } else {
              texte = `Résoudre dans $\\mathbb{R}$ :${sp(2)}
            $${b}${ecritureAlgebrique(a)}x^2=0$`
            }
          }

          texteCorr = ''
          if (k > 0) {
            texteCorr += `En isolant le carré, on obtient l'équation $x^2=${k}$ qui est de la forme $x^2=k$ avec $k=${k}$. <br>
            Comme  $${k}>0$ alors l'équation admet deux solutions : $-\\sqrt{${k}}=-${Math.sqrt(k)}$ et $\\sqrt{${k}}=${Math.sqrt(k)}$.
             <br>Ainsi,  $S=\\{-${Math.sqrt(k)}${sp(1)};${sp(1)}${Math.sqrt(k)}\\}$.
          `
          } else {
            texteCorr += `En isolant le carré, on obtient l'équation  $x^2=${k}$ qui est de la forme $x^2=k$. Comme $k=${k}$ et $${k}<0$, alors l'équation n'admet aucune solution.<br>
            Ainsi, $S=\\emptyset$.`
          }

          break

        case 2 :// ax^2-b=0  pour x^2=b/a avec b/a pas carré parfait positif ou négatif
          a = randint(-3, 9, [-1, 0, 1])
          b = a * choice([2, 3, 5, 7, 10, -2, -3, -10])

          k = -b / a
          if (this.interactif) {
            if (choice([true, false])) {
              texte = `L'ensemble des solutions $S$ de l'équation  $${a}x^2${ecritureAlgebrique(b)}=0$ est :
               `
            } else {
              texte = `L'ensemble des solutions $S$ de l'équation  $${b}${ecritureAlgebrique(a)}x^2=0$ est :
               `
            }
            if (k > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\{-\\sqrt{${k}}${sp(1)};${sp(1)}\\sqrt{${k}}\\}$`,
                    statut: true
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false
                  },
                  {
                    texte: `$S=\\{-\\sqrt{${abs(b)}}${sp(1)};${sp(1)}\\sqrt{${abs(b)}}\\}$`,
                    statut: false
                  }
                ]

              }
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: '$S=\\emptyset$',
                    statut: true
                  },
                  {
                    texte: `$S=\\{-\\sqrt{${abs(b)}}${sp(1)};${sp(1)}\\sqrt{${abs(b)}}\\}$`,
                    statut: false
                  },
                  {
                    texte: `$S=\\{-\\sqrt{${-k}}${sp(1)};${sp(1)}\\sqrt{${-k}}\\}$`,
                    statut: false
                  }
                ]
              }
            }

            texte += propositionsQcm(this, i).texte
          } else {
            if (choice([true, false])) {
              texte = `Résoudre dans $\\mathbb{R}$ :${sp(2)}
            $${a}x^2${ecritureAlgebrique(b)}=0$`
            } else {
              texte = `Résoudre dans $\\mathbb{R}$ :${sp(2)}
            $${b}${ecritureAlgebrique(a)}x^2=0$`
            }
          }

          texteCorr = ''
          if (k > 0) {
            texteCorr += `En isolant le carré, on obtient l'équation $x^2=${k}$ qui est de la forme $x^2=k$ avec $k=${k}$. <br>
            Comme  $${k}>0$ alors l'équation admet deux solutions : $-\\sqrt{${k}}$ et $\\sqrt{${k}}$.
             <br>Ainsi,  $S=\\{-\\sqrt{${k}}${sp(1)};${sp(1)}\\sqrt{${k}}\\}$.
          `
          } else {
            texteCorr += `En isolant le carré, on obtient l'équation  $x^2=${k}$ qui est de la forme $x^2=k$. Comme $k=${k}$ et $${k}<0$, alors l'équation n'admet aucune solution.<br>
            Ainsi, $S=\\emptyset$.`
          }

          break

        case 3 :// ax^2+bx=0

          a = randint(-5, 3, 0)
          b = randint(-3, 5, 0)

          k = new FractionX(-b, a)
          if (this.interactif) {
            if (choice([true, false])) {
              texte = `L'ensemble des solutions $S$ de l'équation  $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x=0$ est :
               `
            } else {
              texte = `L'ensemble des solutions $S$ de l'équation  $${rienSi1(b)}x${ecritureAlgebriqueSauf1(a)}x^2=0$ est :
               `
            }

            if (k > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\left\\{0${sp(1)};${sp(1)}${k.texFractionSimplifiee}\\right\\}$`,
                    statut: true
                  },
                  {
                    texte: `$S=\\left\\{${k.oppose().texFractionSimplifiee}${sp(1)};${sp(1)}0\\right\\}$`,
                    statut: false
                  },
                  {
                    texte: `$S=\\left\\{0${sp(1)};${sp(1)}${k.inverse().texFractionSimplifiee}\\right\\}$`,
                    statut: false
                  }
                ]
              }
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\left\\{${k.texFractionSimplifiee}${sp(1)};${sp(1)}0\\right\\}$`,
                    statut: true
                  },
                  {
                    texte: `$S=\\left\\{0${sp(1)};${sp(1)}${k.oppose().texFractionSimplifiee}\\right\\}$`,
                    statut: false
                  },
                  {
                    texte: `$S=\\left\\{${k.inverse().texFractionSimplifiee}${sp(1)};${sp(1)}0\\right\\}$`,
                    statut: false
                  }
                ]
              }
            }
            //
            texte += propositionsQcm(this, i).texte
          } else {
            if (choice([true, false])) {
              texte = `Résoudre dans $\\mathbb{R}$ :${sp(2)}
              $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x=0$`
            } else {
              texte = `Résoudre dans $\\mathbb{R}$ :${sp(2)}
              $${rienSi1(b)}x${ecritureAlgebriqueSauf1(a)}x^2=0$`
            }
          }

          if (k > 0) {
            texteCorr = `En factorisant le premier membre de l'équation on obtient : 
            $x(${rienSi1(a)}x${ecritureAlgebrique(b)})$.<br>
            L'équation s'écrit alors : $x(${rienSi1(a)}x${ecritureAlgebrique(b)})=0$.<br>
            On reconnaît une équation produit nul. Un rpoduit de deux facteurs est nul si et seulement si l'un au moins des deux facteurs est nul.<br>
            $x=0$ ou $ ${rienSi1(a)}x${ecritureAlgebrique(b)}=0$ soit $x=${k.texFraction}${k.texSimplificationAvecEtapes()}$.<br>
            Ainsi, $S=\\left\\{0${sp(1)};${sp(1)}${k.texFractionSimplifiee}\\right\\}$.`
          } else {
            texteCorr = `En factorisant le premier membre de l'équation on obtient : 
            $x(${rienSi1(a)}x${ecritureAlgebrique(b)})$.<br>
            L'équation s'écrit alors : $x(${rienSi1(a)}x${ecritureAlgebrique(b)})=0$.<br>
            On reconnaît une équation produit nul. Un rpoduit de deux facteurs est nul si et seulement si l'un au moins des deux facteurs est nul.<br>
            $x=0$ ou $ ${rienSi1(a)}x${ecritureAlgebrique(b)}=0$ soit $x=${k.texFraction}${k.texSimplificationAvecEtapes()}$.<br>
            Ainsi, $S=\\left\\{${k.texFractionSimplifiee}${sp(1)};${sp(1)}0\\right\\}$.`
          }

          break

        case 4 :// egalite remarquable

          a = choice([1, 2])
          b = randint(-3, 5, 0)
          c = b ** 2
          k = new FractionX(-b, a)
          if (this.interactif) {
            if (choice([true, false])) {
              texte = `L'ensemble des solutions $S$ de l'équation  $${rienSi1(a * a)}x^2${ecritureAlgebriqueSauf1(b * 2 * a)}x+${c}=0$ est :
               `
            } else {
              texte = `L'ensemble des solutions $S$ de l'équation  $${rienSi1(b * 2 * a)}x${ecritureAlgebriqueSauf1(a * a)}x^2+${c}=0$ est :
               `
            }

            if (k > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\left\\{${k.texFractionSimplifiee}\\right\\}$`,
                    statut: true
                  },
                  {
                    texte: `$S=\\left\\{${k.oppose().texFractionSimplifiee}\\right\\}$`,
                    statut: false
                  },
                  {
                    texte: `$S=\\left\\{0${sp(1)};${sp(1)}${k.texFractionSimplifiee}\\right\\}$`,
                    statut: false
                  }
                ]
              }
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\left\\{${k.texFractionSimplifiee}\\right\\}$`,
                    statut: true
                  },
                  {
                    texte: `$S=\\left\\{${k.oppose().texFractionSimplifiee}\\right\\}$`,
                    statut: false
                  },
                  {
                    texte: `$S=\\left\\{0${sp(1)};${sp(1)}${k.texFractionSimplifiee}\\right\\}$`,
                    statut: false
                  }
                ]
              }
            }
            //
            texte += propositionsQcm(this, i).texte
          } else {
            if (choice([true, false])) {
              texte = `Résoudre dans $\\mathbb{R}$ :${sp(2)}
              $${rienSi1(a * a)}x^2${ecritureAlgebriqueSauf1(b * 2 * a)}x+${c}=0$`
            } else {
              texte = `Résoudre dans $\\mathbb{R}$ :${sp(2)}
              $${rienSi1(b * 2 * a)}x${ecritureAlgebriqueSauf1(a * a)}x^2+${c}=0$`
            }
          }

          texteCorr = `On reconnaît dans le premier membre de l'équation le développement d'une égalité remarquable :  $(${rienSi1(a)}x${ecritureAlgebrique(b)})=${rienSi1(a * a)}x^2${ecritureAlgebriqueSauf1(b * 2 * a)}x+${c}$.
           <br>
            L'équation s'écrit alors : $(${rienSi1(a)}x${ecritureAlgebrique(b)})^2=0$.<br>
           Elle a pour unique solution $x=${k.texFractionSimplifiee}$.<br>
           
            Ainsi, $S=\\left\\{${k.texFractionSimplifiee}\\right\\}$.`

          break
      }

      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
