import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, choice } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Reconnaître une expression numérique (QCM)'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '24/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function ReconnaitreExp () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.spacing = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []

    let texte, texteCorr, a, b, c, d, choix, listeFractions1, fractionR
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2, 3, 4])) { // 1
        case 1 :// a+b*c a*b+c  a*b-c
          choix = choice([1, 2, 3])// 1,2
          if (choix === 1) { // a+b*c
            a = randint(1, 10)
            b = randint(1, 10)
            c = randint(2, 10)
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $${a}+${b}\\times ${c}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: true
                },
                {
                  texte: 'Une différence',
                  statut: false
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication est priporitraire sur l’addition). <br>
            On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{${a}}_{A}+\\underbrace{${b}\\times ${c}}_{B}$`
          }
          if (choix === 2) { // a*b+c
            a = randint(1, 10)
            b = randint(1, 10)
            c = randint(2, 10)
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $${a}\\times${b}+ ${c}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: true
                },
                {
                  texte: 'Une différence',
                  statut: false
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication est priporitraire sur l’addition).<br>
             On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{${a}\\times  ${b}}_{A}+\\underbrace{ ${c}}_{B}$`
          }
          if (choix === 3) { // a*b-c
            a = randint(1, 10)
            b = randint(1, 10)
            c = randint(2, 10)
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $${a}\\times${b}- ${c}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: false
                },
                {
                  texte: 'Une différence',
                  statut: true
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une différence (la multiplication est priporitraire sur la soustraction).<br>
             On en déduit que l’expression est une différence de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{${a}\\times  ${b}}_{A}-\\underbrace{ ${c}}_{B}$`
          }
          break

        case 2 :// a*b+/-c*d
          choix = choice([1, 2])// 1,2
          if (choix === 1) { // a*b+c*d
            a = randint(2, 10)
            b = randint(2, 10)
            c = randint(2, 10)
            d = randint(2, 10)
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $${a}\\times${b}+${c}\\times ${d}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: true
                },
                {
                  texte: 'Une différence',
                  statut: false
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme (la multiplication est priporitraire sur l’addition). <br>
            On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{${a}\\times${b}}_{A}+\\underbrace{${c}\\times ${d}}_{B}$`
          }
          if (choix === 2) { // a*b-c*d
            a = randint(5, 10)
            b = randint(5, 10)
            c = randint(2, 5)
            d = randint(2, 5)
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $${a}\\times${b}-${c}\\times ${d}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: false
                },
                {
                  texte: 'Une différence',
                  statut: true
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une différence (la multiplication est priporitraire sur l’addition). <br>
            On en déduit que l’expression est une différence de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{${a}\\times${b}}_{A}-\\underbrace{${c}\\times ${c}}_{B}$`
          }

          break
        case 3 :// avec parenthèses
          choix = choice([1, 2, 3, 4, 5, 6])// 1,2
          if (choix === 1) { // a*(b+c)
            a = randint(2, 10)
            b = randint(1, 10)
            c = randint(2, 10)
            choix = choice([true, false])
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $${a}${choix ? '\\times' : ''}(${b}+${c})$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: false
                },
                {
                  texte: 'Une différence',
                  statut: false
                },
                {
                  texte: 'Un produit',
                  statut: true
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est un produit. <br>
            On en déduit que l’expression est un produit de deux facteurs $A$ et $B$ :`
            if (choix === true) { texteCorr += `<br>$\\underbrace{${a}}_{A}\\times\\underbrace{(${b}+ ${c})}_{B}$` } else { texteCorr += `<br>$${a}(${b}+ ${c})=\\underbrace{${a}}_{A}\\times\\underbrace{(${b}+ ${c})}_{B}$` }
          }

          if (choix === 2) { // (b+c)*a
            a = randint(2, 10)
            b = randint(1, 10)
            c = randint(2, 10)
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $(${b}+${c})\\times ${a}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: false
                },
                {
                  texte: 'Une différence',
                  statut: false
                },
                {
                  texte: 'Un produit',
                  statut: true
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est un produit. <br>
            On en déduit que l’expression est un produit de deux facteurs $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{(${b}+ ${c})}_{A}\\times\\underbrace{${a}}_{B}$`
          }
          if (choix === 3) { // (a+b):c
            a = randint(2, 10)
            b = randint(1, 10)
            c = randint(2, 10)
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $(${a}+${b})\\div${c}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: false
                },
                {
                  texte: 'Une différence',
                  statut: false
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: true
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une division. <br>
          On en déduit que l’expression est le quotient de $A$ par $B$ :`
            texteCorr += `<br> $(\\underbrace{${a}+${b}}_{A})\\div\\underbrace{${c}}_{B}$`
          }

          if (choix === 4) { // a*(b+c)*d
            a = randint(2, 10)
            b = randint(1, 10)
            c = randint(2, 10)
            d = randint(2, 10)
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $${a}\\times (${b}+ ${c})\\times ${d}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: false
                },
                {
                  texte: 'Une différence',
                  statut: false
                },
                {
                  texte: 'Un produit',
                  statut: true
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est un produit. <br>
            On en déduit que l’expression est un produit de trois facteurs $A$,  $B$ et $C$ :`
            texteCorr += `<br>$\\underbrace{${a}}_{A}\\times (\\underbrace{${b}+ ${c}}_{B})\\times \\underbrace{${d}}_{C}$`
          }
          if (choix === 5) { // a*(b+c)+d
            a = randint(2, 10)
            b = randint(1, 10)
            c = randint(2, 10)
            d = randint(2, 10)
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $${a}\\times (${b}+ ${c})+ ${d}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: true
                },
                {
                  texte: 'Une différence',
                  statut: false
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme. <br>
            On en déduit que l’expression est une somme de deux termes $A$ et  $B$ :`
            texteCorr += `<br>$\\underbrace{${a}\\times (${b}+ ${c})}_{A}+ \\underbrace{${d}}_{B}$`
          }
          if (choix === 6) { // a*(b+c)-d
            a = randint(2, 10)
            b = randint(1, 10)
            c = randint(2, 10)
            d = randint(2, 10)
            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $${a}\\times (${b}+ ${c})- ${d}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: false
                },
                {
                  texte: 'Une différence',
                  statut: true
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une différence. <br>
            On en déduit que l’expression est une différence de deux termes $A$ et  $B$ :`
            texteCorr += `<br>$\\underbrace{${a}\\times (${b}+ ${c})}_{A}- \\underbrace{${d}}_{B}$`
          }
          break
        case 4 :// avec des fractions
          choix = choice([1, 2, 3, 4])// 1,2
          if (choix === 1) { // a/b+c
            listeFractions1 = [
              [10, 3], [5, 4], [7, 4], [10, 7], [11, 7], [12, 7], [9, 7], [13, 7], [11, 8], [11, 9], [7, 6], [12, 11], [4, 3],
              [7, 5], [13, 7], [13, 9], [13, 11], [13, 12], [14, 11]
            ] // Couples de nombres premiers entre eux >1
            fractionR = choice(listeFractions1)
            a = fractionR[0]
            b = fractionR[1]
            c = randint(2, 10)

            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $\\dfrac{${a}}{${b}}+${c}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: true
                },
                {
                  texte: 'Une différence',
                  statut: false
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une somme. <br>
            On en déduit que l’expression est une somme de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{\\dfrac{${a}}{${b}}}_{A}+\\underbrace{${c}}_{B}$`
          }
          if (choix === 2) { // a/b-c
            listeFractions1 = [
              [10, 3], [5, 4], [7, 4], [10, 7], [11, 7], [12, 7], [9, 7], [13, 7], [11, 8], [11, 9], [7, 6], [12, 11], [4, 3],
              [7, 5], [13, 7], [13, 9], [13, 11], [13, 12], [14, 11]
            ] // Couples de nombres premiers entre eux >1
            fractionR = choice(listeFractions1)
            a = fractionR[0]
            b = fractionR[1]
            c = randint(2, 10)

            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $\\dfrac{${a}}{${b}}-${c}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: false
                },
                {
                  texte: 'Une différence',
                  statut: true
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une différence. <br>
            On en déduit que l’expression est une différence de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{\\dfrac{${a}}{${b}}}_{A}-\\underbrace{${c}}_{B}$`
          }
          if (choix === 3) { // a/b-c
            listeFractions1 = [
              [10, 3], [5, 4], [7, 4], [10, 7], [11, 7], [12, 7], [9, 7], [13, 7], [11, 8], [11, 9], [7, 6], [12, 11], [4, 3],
              [7, 5], [13, 7], [13, 9], [13, 11], [13, 12], [14, 11]
            ] // Couples de nombres premiers entre eux >1
            fractionR = choice(listeFractions1)
            a = fractionR[0]
            b = fractionR[1]
            c = randint(2, 10)

            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $${c}-\\dfrac{${a}}{${b}}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: false
                },
                {
                  texte: 'Une différence',
                  statut: true
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est une différence. <br>
            On en déduit que l’expression est une différence de deux termes $A$ et $B$ :`
            texteCorr += `<br>$\\underbrace{${c}}_{A}-\\underbrace{\\dfrac{${a}}{${b}}}_{B}$`
          }

          if (choix === 4) { // (a+b)/c
            a = randint(2, 10)
            b = randint(2, 10)
            c = randint(2, 10)

            texte = `Quelle est la nature de l'expression numérique suivante ?<br>
            $\\dfrac{${a}+${b}}{${c}}$`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'Une somme',
                  statut: false
                },
                {
                  texte: 'Une différence',
                  statut: false
                },
                {
                  texte: 'Un produit',
                  statut: false
                },
                {
                  texte: 'Un quotient',
                  statut: true
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `La dernière oprération à effectuer pour faire ce calcul est un quotient. <br>
            On en déduit que l’expression est le quotient de  $A$ par $B$ :`
            texteCorr += `<br>$\\dfrac{${a}+${b}}{${c}}=\\underbrace{(${a}+${b})}_{A}\\div\\underbrace{${c}}_{B}$`
          }
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
