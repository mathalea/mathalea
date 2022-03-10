import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, choice, rienSi1, ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Reconnaître une expression littérale (QCM)'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '27/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function ReconnaitreExpL () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.spacing = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []

    let texte, texteCorr, a, b, c, d, e
    const nomVar = ['a', 'b', 'x', 'y']
    const inc = choice(nomVar)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2, 3, 4, 5, 6, 7, 8, 9])) { //
        case 1 :// a(x+b)

          a = randint(-10, 10, [-1, 0, 1])
          b = randint(1, 10)
          texte = `Quelle est la nature de l'expression littérale suivante ?<br>
            $${a}(${inc}+${b})$`

          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: 'Une somme',
                statut: false
              },
              {
                texte: 'Un produit',
                statut: true
              }
            ]
          }
          texte += propositionsQcm(this, i).texte

          texteCorr = `La dernière oprération à effectuer pour faire ce calcul est un produit. <br>
            On en déduit que l’expression est un produit de deux facteurs $A$ et $B$ :`
          texteCorr += `<br>$\\underbrace{${a}}_{A}(\\underbrace{${inc}+ ${b}}_{B})$`

          break

        case 2 :// ax + b ou a+b*x
          if (choice([true, false])) {
            a = randint(-10, 10, [0, 1])
            b = randint(-10, 10, [-1, 0, 1])
            texte = `Quelle est la nature de l'expression littérale suivante ?<br>
            $${ecritureParentheseSiNegatif(a)}\\times ${inc} ${ecritureAlgebrique(b)}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: true
                },

                {
                  texte: 'Un produit',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
            if (b > 0) {
              texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication étant prioritaire). <br>
          On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
              texteCorr += `<br>$\\underbrace{${a}\\times ${inc}}_{A}+\\underbrace{${b}}_{B}$`
            } else {
              texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication étant prioritaire). <br>
          On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
              texteCorr += `<br>$\\underbrace{${rienSi1(a)}${inc}}_{A}+\\underbrace{(${b})}_{B}$`
            }
          } else {
            a = randint(-10, 10, [0, 1])
            b = randint(-10, 10, [-1, 0, 1])
            texte = `Quelle est la nature de l'expression littérale suivante ?<br>
            $${ecritureParentheseSiNegatif(a)}${ecritureAlgebrique(b)}\\times ${inc}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: true
                },

                {
                  texte: 'Un produit',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
            if (b > 0) {
              texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication étant prioritaire). <br>
          On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
              texteCorr += `<br>$\\underbrace{${a}}_{A}+\\underbrace{${b}\\times ${inc}}_{B}$`
            } else {
              texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication étant prioritaire). <br>
          On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
              texteCorr += `<br>$\\underbrace{${a}}_{A}+\\underbrace{(${b})\\times x}_{B}$`
            }
          }
          break

        case 3 :// ax +/- by

          a = randint(-10, 10, [-1, 0, 1])
          b = randint(-10, 10, [-1, 0, 1])
          texte = `Quelle est la nature de l'expression littérale suivante ?<br>
            $${a}a${ecritureAlgebrique(b)}b$`

          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: 'Une somme',
                statut: true
              },
              {
                texte: 'Un produit',
                statut: false
              }
            ]
          }
          texte += propositionsQcm(this, i).texte
          if (b > 0) {
            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication étant prioritaire). <br>
          On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{${a}a}_{A}+\\underbrace{${b}b}_{B}$`
          } else {
            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication étant prioritaire). <br>
          On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{${a}a}_{A}+\\underbrace{(${b}b)}_{B}$`
          }

          break

        case 4 :// ax+b(x+c)
          if (choice([true, false])) {
            a = randint(-10, 10, [-1, 0, 1])
            b = randint(2, 10)
            c = randint(-10, 10, 0)
            texte = `Quelle est la nature de l'expression littérale suivante ?<br>
            $${a}x+${b}\\times(x${ecritureAlgebrique(c)})$`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: true
                },

                {
                  texte: 'Un produit',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication étant prioritaire). <br>
          On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{${a}x}_{A}+\\underbrace{${b}\\times(x${ecritureAlgebrique(c)})}_{B}$`
          } else {
            a = randint(2, 10)
            b = randint(2, 10)
            c = randint(-10, 10, [-1, 0, 1])
            texte = `Quelle est la nature de l'expression littérale suivante ?<br>
            $${b}\\times(x${ecritureAlgebrique(c)})+${a}x$`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: true
                },

                {
                  texte: 'Un produit',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication étant prioritaire). <br>
          On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{${b}\\times(x${ecritureAlgebrique(c)})}_{A}+\\underbrace{${a}x}_{B}$`
          }

          break

        case 5 :// (ax+b)(cx+d)

          a = randint(-10, 10, [-1, 0, 1])
          b = randint(2, 10)
          c = randint(-10, 10, [-1, 0, 1])
          d = randint(-10, 10, 0)
          texte = `Quelle est la nature de l'expression littérale suivante ?<br>
              $(${a}x+${b})(${c}x${ecritureAlgebrique(d)})$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: 'Une somme',
                statut: false
              },

              {
                texte: 'Un produit',
                statut: true
              }
            ]
          }
          texte += propositionsQcm(this, i).texte
          texteCorr = `La dernière oprération à effectuer pour faire ce calcul est un produit. <br>
            On en déduit que l’expression est un produit de deux facteurs  $A$ et $B$ :`
          texteCorr += `<br>$\\underbrace{(${a}x+${b})}_{A}\\underbrace{(${c}x${ecritureAlgebrique(d)})}_{B}$`

          break
        case 6 :// (ax+b)+(cx+d)

          a = randint(-10, 10, [-1, 0, 1])
          b = randint(2, 10)
          c = randint(-10, 10, [-1, 0, 1])
          d = randint(-10, 10, 0)
          texte = `Quelle est la nature de l'expression littérale suivante ?<br>
              $(${a}x+${b})+(${c}x${ecritureAlgebrique(d)})$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: 'Une somme',
                statut: true
              },

              {
                texte: 'Un produit',
                statut: false
              }
            ]
          }
          texte += propositionsQcm(this, i).texte
          texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme. <br>
            On en déduit que l’expression est une somme de deux termes  $A$ et $B$ :`
          texteCorr += `<br>$\\underbrace{(${a}x+${b})}_{A}+\\underbrace{(${c}x${ecritureAlgebrique(d)})}_{B}$`

          break
        case 7 :// (ax+b)+(cx+d)(ax+b)

          a = randint(-10, 10, [-1, 0, 1])
          b = randint(2, 10)
          c = randint(-10, 10, [-1, 0, 1])
          d = randint(-10, 10, 0)
          texte = `Quelle est la nature de l'expression littérale suivante ?<br>
              $(${a}x+${b})+(${c}x${ecritureAlgebrique(d)})(${a}x${ecritureAlgebrique(b)})$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: 'Une somme',
                statut: true
              },

              {
                texte: 'Un produit',
                statut: false
              }
            ]
          }
          texte += propositionsQcm(this, i).texte
          texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme. <br>
            On en déduit que l’expression est une somme de deux termes  $A$ et $B$ :`
          texteCorr += `<br>$\\underbrace{(${a}x+${b})}_{A}+\\underbrace{(${c}x${ecritureAlgebrique(d)})(${a}x${ecritureAlgebrique(b)})}_{B}$<br>
              Dans cette somme, il y a un facteur commun $${a}x${ecritureAlgebrique(b)}$ permettant de factoriser cette expression.`

          break

        case 8 :// (ax+b)(cx+d)+e

          a = randint(-10, 10, [-1, 0, 1])
          b = randint(2, 10)
          c = randint(-10, 10, [-1, 0, 1])
          d = randint(-10, 10, 0)
          e = randint(2, 10)
          texte = `Quelle est la nature de l'expression littérale suivante ?<br>
              $(${a}x+${b})(${c}x${ecritureAlgebrique(d)})+${e}$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: 'Une somme',
                statut: true
              },

              {
                texte: 'Un produit',
                statut: false
              }
            ]
          }
          texte += propositionsQcm(this, i).texte
          texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme. <br>
            On en déduit que l’expression est une somme de deux termes  $A$ et $B$ :`
          texteCorr += `<br>$\\underbrace{(${a}x+${b})(${c}x${ecritureAlgebrique(d)})}_{A}+\\underbrace{${e}}_{B}$
              `

          break

        case 9 :// e(ax+b)(cx+d)

          a = randint(-10, 10, [-1, 0, 1])
          b = randint(2, 10)
          c = randint(-10, 10, [-1, 0, 1])
          d = randint(-10, 10, 0)
          e = randint(2, 10)
          texte = `Quelle est la nature de l'expression littérale suivante ?<br>
              $${e}(${a}x+${b})(${c}x${ecritureAlgebrique(d)})$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: 'Une somme',
                statut: false
              },

              {
                texte: 'Un produit',
                statut: true
              }
            ]
          }
          texte += propositionsQcm(this, i).texte
          texteCorr = `La dernière oprération à effectuer pour faire ce calcul est un produit. <br>
            On en déduit que l’expression est un produit de trois facteurs  $A$, $B$ et $C$ :`
          texteCorr += `<br>$\\underbrace{${e}}_{A}\\underbrace{(${a}x+${b})}_{B}\\underbrace{(${c}x${ecritureAlgebrique(d)})}_{C}$
              `

          break
      }

      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
