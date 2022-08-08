import Exercice from '../../Exercice.js'
import { fraction } from '../../../modules/fractions.js'
import { randint, listeQuestionsToContenu, texteEnCouleur, reduireAxPlusB, sp, ecritureParentheseSiNegatif, choice } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Résoudre une inéquation (QCM)'
export const interactifReady = true
export const interactifType = 'qcm'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2L05 // pour l'instant
 * Date de publication 24/10/2021
*/
export default function SolutionInequationQCM () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.spacing = 3
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.date = 1635094684684
    let texte, texteCorr, a, b, maFraction, n, N
    switch (choice([1, 2])) { //, 'b'
      case 1 :// cas a>0
        a = randint(2, 6)
        n = randint(2, 7) * choice([-1, 1])
        b = n * a
        maFraction = fraction(-b, a)
        N = choice(['a', 'b', 'c', 'd'])//, 'a', 'b'
        if (N === 'a') {
          texte = `L'inéquation ${sp(1)} $${reduireAxPlusB(a, b)}>0$ a pour ensemble de solutions :`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { vertical: true },
            propositions: [
              {
                texte: `$\\bigg]${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: true
              },
              {
                texte: `$\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: false
              },
              {
                texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)} ${maFraction.texFractionSimplifiee} \\bigg[$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte

          texteCorr = `L'ensemble de solutions est : $\\bigg]${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$<br>
            En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
            $${a}x>${-b}$<br>
            En divisant par $${a}$ dans chaque membre, on obtient :<br>
            $x>${maFraction.texFractionSimplifiee}$<br>
            Les solutions sont les nombres strictement supérieurs à $${maFraction.texFractionSimplifiee}$.   `
        }
        if (N === 'b') {
          texte = `L'inéquation ${sp(1)} $${reduireAxPlusB(a, b)}\\geqslant 0$ a pour ensemble de solutions :`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { vertical: true },
            propositions: [
              {
                texte: `$\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: true
              },
              {
                texte: `$\\bigg]${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: false
              },
              {
                texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)} ${maFraction.texFractionSimplifiee} \\bigg]$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte

          texteCorr = `L'ensemble de solutions est : $\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$.<br>
                    En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
                    $${a}x\\geqslant${-b}$<br>
                    En divisant par $${a}$ dans chaque membre, on obtient :<br>
                    $x\\geqslant${maFraction.texFractionSimplifiee}$<br>
                    Les solutions sont les nombres  supérieurs ou égaux  à $${maFraction.texFractionSimplifiee}$.   `
        }
        if (N === 'c') {
          texte = `L'inéquation ${sp(1)} $${reduireAxPlusB(a, b)}\\leqslant 0$ a pour ensemble de solutions :`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { vertical: true },
            propositions: [
              {
                texte: `$\\bigg]-\\infty${sp(1)} ; ${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$ `,
                statut: true
              },
              {
                texte: `$\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: false
              },
              {
                texte: `$\\bigg]-\\infty${sp(1)} ; ${sp(1)}${maFraction.texFractionSimplifiee} \\bigg[$ `,
                statut: false
              }
            ]
          }
          texte += propositionsQcm(this, 0).texte
          texteCorr = `L'ensemble de solutions est : $\\bigg]-\\infty${sp(1)} ; ${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$.<br>
                      En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
                      $${a}x\\leqslant${-b}$<br>
                      En divisant par $${a}$ dans chaque membre, on obtient :<br>
                      $x\\leqslant${maFraction.texFractionSimplifiee}$<br>
                      Les solutions sont les nombres  inférieurs ou égaux  à $${maFraction.texFractionSimplifiee}$.   `
        }
        if (N === 'd') {
          texte = `L'inéquation ${sp(1)} $${reduireAxPlusB(a, b)}< 0$ a pour ensemble de solutions :`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { vertical: true },
            propositions: [
              {
                texte: `$\\bigg]-\\infty${sp(1)} ; ${sp(1)}${maFraction.texFractionSimplifiee} \\bigg[$ `,
                statut: true
              },
              {
                texte: `$\\bigg]${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: false
              },
              {
                texte: `$\\bigg]-\\infty${sp(1)} ; ${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte

          texteCorr = `L'ensemble de solutions est : $\\bigg]-\\infty${sp(1)} ; ${sp(1)}${maFraction.texFractionSimplifiee} \\bigg[$.<br>
                      En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
                      $${a}x<${-b}$<br>
                      En divisant par $${a}$ dans chaque membre, on obtient :<br>
                      $x<${maFraction.texFractionSimplifiee}$<br>
                      Les solutions sont les nombres strictement inférieurs   à $${maFraction.texFractionSimplifiee}$.   `
        }
        break

      case 2:// cas a<0
        a = randint(-6, -2)
        n = randint(2, 7) * choice([-1, 1])
        b = n * a
        maFraction = fraction(-b, a)
        N = choice(['a', 'b', 'c', 'd'])//
        if (N === 'a') {
          texte = `L'inéquation ${sp(1)} $${reduireAxPlusB(a, b)}>0$ a pour ensemble de solutions :`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { vertical: true },
            propositions: [
              {
                texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)}${maFraction.texFractionSimplifiee} \\bigg[$ `,
                statut: true
              },
              {
                texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$ `,
                statut: false
              },
              {
                texte: `$\\bigg]${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte

          texteCorr = `L'ensemble de solutions est : $\\bigg]-\\infty${sp(1)} ;${sp(1)}${maFraction.texFractionSimplifiee} \\bigg[$.<br>
            En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
            $${a}x>${-b}$<br>
            En divisant par $(${a})$ dans chaque membre, on obtient :<br>
            $x$${texteEnCouleur('$<$')}$${maFraction.texFractionSimplifiee}$ ${sp(3)} 
            ${texteEnCouleur('(quand on divise par un nombre strictement négatif, on change le sens de l’inégalité).')}<br>
            Les solutions sont les nombres strictement inférieurs   à $${maFraction.texFractionSimplifiee}$. `
        }
        if (N === 'b') {
          texte = `L'inéquation ${sp(1)} $${reduireAxPlusB(a, b)}\\geqslant 0$ a pour ensemble de solutions :`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { vertical: true },
            propositions: [
              {
                texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)} ${maFraction.texFractionSimplifiee} \\bigg]$ `,
                statut: true
              },
              {
                texte: `$\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: false
              },
              {
                texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)} ${maFraction.texFractionSimplifiee} \\bigg[$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte

          texteCorr = `L'ensemble de solutions est : $\\bigg]-\\infty${sp(1)} ;${sp(1)} ${maFraction.texFractionSimplifiee} \\bigg]$.<br>
          En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
          $${a}x\\geqslant${-b}$<br>
          En divisant par $(${a})$ dans chaque membre, on obtient :<br>
          $x$${texteEnCouleur('$\\leqslant$')}$${maFraction.texFractionSimplifiee}$ ${sp(3)} 
          ${texteEnCouleur('(quand on divise par un nombre strictement négatif, on change le sens de l’inégalité).')}<br>
          Les solutions sont les nombres  inférieurs ou égaux  à $${maFraction.texFractionSimplifiee}$. `
        }
        if (N === 'c') {
          texte = `L'inéquation ${sp(1)} $${reduireAxPlusB(a, b)}\\leqslant 0$ a pour ensemble de solutions :`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { vertical: true },
            propositions: [
              {
                texte: `$\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: true
              },
              {
                texte: `$\\bigg]-\\infty${sp(1)} ; ${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$ `,
                statut: false
              },
              {
                texte: `$\\bigg]${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte

          texteCorr = `L'ensemble de solutions est : $\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$.<br>
          En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
          $${a}x\\leqslant${-b}$<br>
          En divisant par $(${a})$ dans chaque membre, on obtient :<br>
          $x$${texteEnCouleur('$\\geqslant$')}$${maFraction.texFractionSimplifiee}$ ${sp(3)} 
          ${texteEnCouleur('(quand on divise par un nombre strictement négatif, on change le sens de l’inégalité).')}<br>
          Les solutions sont les nombres  supérieurs ou égaux  à $${maFraction.texFractionSimplifiee}$. `
        }
        if (N === 'd') {
          texte = `L'inéquation ${sp(1)} $${reduireAxPlusB(a, b)}< 0$ a pour ensemble de solutions :`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { vertical: true },
            propositions: [
              {
                texte: `$\\bigg]${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: true
              },
              {
                texte: `$\\bigg]-\\infty${sp(1)} ; ${sp(1)}${maFraction.texFractionSimplifiee} \\bigg[$ `,
                statut: false
              },
              {
                texte: `$\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte

          texteCorr = `L'ensemble de solutions est : $\\bigg]${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$.<br>
                      En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
                      $${a}x<${-b}$<br>
                      En divisant par $(${a})$ dans chaque membre, on obtient :<br>
          $x$${texteEnCouleur('$>$')}$${maFraction.texFractionSimplifiee}$ ${sp(3)} 
          ${texteEnCouleur('(quand on divise par un nombre strictement négatif, on change le sens de l’inégalité).')}<br>
          Les solutions sont les nombres strictement supérieurs   à $${maFraction.texFractionSimplifiee}$. `
        }
        break
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
