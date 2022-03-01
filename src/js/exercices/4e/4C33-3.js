import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, simpExp, modalPdf } from '../../modules/outils.js'

import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Puissances : Calculs automatisés et règles de calculs'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true // pour définir que l'exercice est exportable AMC
export const amcType = 'AMCNum'

/**
 * Puissances d'un relatif (2)
 * * Travailler des résultats automatisés
 * * mais aussi d'utiliser les propriétés du produit de puissance, du quotient de puissances et des puissances de puissances
 * * Date initiale non renseignée
 * * Mise à jour le 2021-01-24
 * @author Sébastien Lozano
 * 4C33-3
 */
export default function PuissancesDUnRelatif2 () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  context.isHtml
    ? (this.consigne = 'Écrire sous la forme $\\mathbf{a^n}$.')
    : (this.consigne = 'Écrire sous la forme $a^n$.')
  this.spacing = 2
  this.spacingCorr = 2.5
  this.nbQuestions = 8
  this.nbColsCorr = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8]
    // const typesDeQuestionsDisponibles = [1]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )

    this.boutonAide = modalPdf(
      numeroExercice,
      'assets/pdf/FichePuissances-4N21.pdf',
      'Aide mémoire sur les puissances (Sébastien Lozano)',
      'Aide mémoire'
    )

    for (
      let i = 0, base, exp, texte, texteCorr, reponseInteractive, exposantInteractif, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const typesDeQuestions = listeTypeDeQuestions[i]

      switch (typesDeQuestions) {
        case 1:
          base = 3 // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 7, [1])] // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{${base}^${exp[0]}\\times ${base * base}}{${base}^${exp[1]
            } \\times ${base}^${exp[2]}}$`
          texteCorr = `$\\dfrac{${base}^${exp[0]}\\times ${base * base
            }}{${base}^${exp[1]} \\times ${base}^${exp[2]}}`
          texteCorr += ` = \\dfrac{${base}^${exp[0]}\\times ${base}^{2}}{${base}^${exp[1]} \\times ${base}^${exp[2]}}`
          texteCorr += ` = \\dfrac{${base}^{${exp[0]}+2}}{${base}^{${exp[1]}+${exp[2]}}}`
          texteCorr += ` = \\dfrac{${base}^{${exp[0] + 2}}}{${base}^{${exp[1] + exp[2]
            }}}`
          texteCorr += ` = ${base}^{${exp[0] + 2}-${exp[1] + exp[2]}}`
          texteCorr += ` = ${base}^{${exp[0] + 2 - exp[1] - exp[2]}}`
          if (
            exp[0] + 2 - exp[1] - exp[2] === 0 ||
            exp[0] + 2 - exp[1] - exp[2] === 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += '=' + simpExp(base, exp[0] + 2 - exp[1] - exp[2])
          }
          texteCorr += '$'
          reponseInteractive = `${base}^{${exp[0] + 2 - exp[1] - exp[2]}}`
          exposantInteractif = exp[0] + 2 - exp[1] - exp[2]
          break
        case 2:
          base = 2 // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 7, [1])] // on a besoin de 2 exposants distincts
          texte = `$\\dfrac{${base}^${exp[0]}\\times ${base ** 3}}{${base}^${exp[1]
            }}$`
          texteCorr = `$\\dfrac{${base}^${exp[0]}\\times ${base ** 3
            }}{${base}^${exp[1]}}`
          texteCorr += ` = \\dfrac{${base}^${exp[0]}\\times ${base}^3}{${base}^${exp[1]}}`
          texteCorr += ` = \\dfrac{${base}^{${exp[0]}+3}}{${base}^${exp[1]}}`
          texteCorr += ` = \\dfrac{${base}^{${exp[0] + 3}}}{${base}^${exp[1]
            }}`
          texteCorr += ` = ${base}^{${exp[0] + 3}-${exp[1]}}`
          texteCorr += ` = ${base}^{${exp[0] + 3 - exp[1]}}`
          if (exp[0] + 3 - exp[1] === 0 || exp[0] + 3 - exp[1] === 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += '=' + simpExp(base, exp[0] + 3 - exp[1])
          }
          texteCorr += '$'
          reponseInteractive = `${base}^{${exp[0] + 3 - exp[1]}}`
          exposantInteractif = exp[0] + 3 - exp[1]
          break
        case 3:
          base = 5 // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 2)] // on a besoin de 2 exposants distincts
          // le second exposant ne peut valoir que 1 ou 2 la fonction testExp ne convient pas à l'affichage ici
          if (exp[1] === 2) {
            texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2}^${exp[1]
              }}$`
            texteCorr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
              }^${exp[1]}}`
            texteCorr += `=\\dfrac{${base}^{1+${exp[0]}}}{(${base}^2)^${exp[1]}}`
            texteCorr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^{2 \\times ${exp[1]}}}`
            texteCorr += `=\\dfrac{${base}^{${1 + exp[0]}}}{${base}^{${2 * exp[1]
              }}}`
          } else {
            texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2}}$`
            texteCorr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
              }}`
            texteCorr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^2}`
          }
          texteCorr += `=${base}^{${1 + exp[0]}-${2 * exp[1]}}`
          texteCorr += `=${base}^{${1 + exp[0] - 2 * exp[1]}}`
          if (1 + exp[0] - 2 * exp[1] === 0 || 1 + exp[0] - 2 * exp[1] === 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += '=' + simpExp(base, 1 + exp[0] - 2 * exp[1])
          }
          texteCorr += '$'
          reponseInteractive = `${base}^{${1 + exp[0] - 2 * exp[1]}}`
          exposantInteractif = 1 + exp[0] - 2 * exp[1]
          break
        case 4:
          base = 2 // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1])] // on a besoin de 1 exposant
          texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
            }\\times ${base ** 2}}$`
          texteCorr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
            }\\times ${base ** 2}}`
          texteCorr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^2\\times ${base}^2}`
          texteCorr += `=\\dfrac{${base}^{${1 + exp[0]}}}{${base}^{2+2}}`
          texteCorr += `=\\dfrac{${base}^{${1 + exp[0]}}}{${base}^{${2 + 2}}}`
          texteCorr += `=${base}^{${1 + exp[0]}-${2 + 2}}`
          texteCorr += `=${base}^{${1 + exp[0] - 2 - 2}}`
          if (1 + exp[0] - 2 - 2 === 0 || 1 + exp[0] - 2 - 2 === 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += '=' + simpExp(base, 1 + exp[0] - 2 - 2)
          }
          texteCorr += '$'
          reponseInteractive = `${base}^{${1 + exp[0] - 2 - 2}}`
          exposantInteractif = 1 + exp[0] - 2 - 2
          break
        case 5:
          base = 2 // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1])] // on a besoin de 1 exposant
          texte = `$\\dfrac{${base ** 2}^${exp[0]}}{${base}}$`
          texteCorr = `$\\dfrac{${base ** 2}^${exp[0]}}{${base}}`
          texteCorr += `=\\dfrac{(${base}^2)^${exp[0]}}{${base}}`
          texteCorr += `=\\dfrac{${base}^{2\\times ${exp[0]}}}{${base}}`
          texteCorr += `=\\dfrac{${base}^{${2 * exp[0]}}}{${base}}`
          texteCorr += `=${base}^{${2 * exp[0]}-1}`
          texteCorr += `=${base}^{${2 * exp[0] - 1}}$`
          // Inutile de tester l'exposant final car il vaut au minimum 3
          reponseInteractive = `${base}^{${2 * exp[0] - 1}}`
          exposantInteractif = 2 * exp[0] - 1
          break
        case 6:
          base = 3 // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 3, [1])] // on a besoin de 1 exposant
          texte = `$\\dfrac{${base ** 3}^${exp[0]}}{${base}}$`
          texteCorr = `$\\dfrac{${base ** 3}^${exp[0]}}{${base}}`
          texteCorr += `=\\dfrac{(${base}^3)^${exp[0]}}{${base}}`
          texteCorr += `=\\dfrac{${base}^{3\\times ${exp[0]}}}{${base}}`
          texteCorr += `=\\dfrac{${base}^{${3 * exp[0]}}}{${base}}`
          texteCorr += `=${base}^{${3 * exp[0]}-1}`
          texteCorr += `=${base}^{${3 * exp[0] - 1}}$`
          // inutile de tester l'exposant final car il vaut au minimum 5
          reponseInteractive = `${base}^{${3 * exp[0] - 1}}`
          exposantInteractif = 3 * exp[0] - 1
          break
        case 7:
          base = 3 // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 4, [1])] // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{${base}^${exp[0]}\\times ${base}^${exp[1]}}{${base ** 2
            }^${exp[2]}}\\times ${base}$`
          texteCorr = `$\\dfrac{${base}^${exp[0]}\\times ${base}^${exp[1]}}{${base ** 2
            }^${exp[2]}}\\times ${base}`
          texteCorr += `=\\dfrac{${base}^{${exp[0]}+${exp[1]}}}{(${base}^2)^${exp[2]}}\\times ${base}`
          texteCorr += `=\\dfrac{${base}^{${exp[0] + exp[1]
            }}}{${base}^{2\\times ${exp[2]}}}\\times ${base}`
          texteCorr += `=\\dfrac{${base}^{${exp[0] + exp[1]}}}{${base}^{${2 * exp[2]
            }}}\\times ${base}`
          texteCorr += `=\\dfrac{${base}^{${exp[0] + exp[1]
            }}\\times ${base}}{${base}^{${2 * exp[2]}}}`
          texteCorr += `=\\dfrac{${base}^{${exp[0] + exp[1]}+1}}{${base}^{${2 * exp[2]
            }}}`
          texteCorr += `=\\dfrac{${base}^{${exp[0] + exp[1] + 1}}}{${base}^{${2 * exp[2]
            }}}`
          texteCorr += `=${base}^{${exp[0] + exp[1] + 1}-${2 * exp[2]}}`
          texteCorr += `=${base}^{${exp[0] + exp[1] + 1 - 2 * exp[2]}}`
          if (
            exp[0] + exp[1] + 1 - 2 * exp[2] === 0 ||
            exp[0] + exp[1] + 1 - 2 * exp[2] === 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texteCorr += '=' + simpExp(base, exp[0] + exp[1] + 1 - 2 * exp[2])
          }
          texteCorr += '$'
          reponseInteractive = `${base}^{${exp[0] + exp[1] + 1 - 2 * exp[2]}}`
          exposantInteractif = exp[0] + exp[1] + 1 - 2 * exp[2]
          break
        case 8:
          base = 2 // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1])] // on a besoin de 1 exposant
          texte = `$\\dfrac{${base ** 3}\\times ${base}}{${base ** 2}^${exp[0]
            }}$`
          texteCorr = `$\\dfrac{${base ** 3}\\times ${base}}{${base ** 2}^${exp[0]
            }}`
          texteCorr += `=\\dfrac{${base}^3\\times ${base}}{(${base}^2)^${exp[0]}}`
          texteCorr += `=\\dfrac{${base}^{3+1}}{${base}^{2\\times${exp[0]}}}`
          texteCorr += `=\\dfrac{${base}^{4}}{${base}^{${2 * exp[0]}}}`
          texteCorr += `=${base}^{4-${2 * exp[0]}}`
          texteCorr += `=${base}^{${3 + 1 - 2 * exp[0]}}`
          if (3 + 1 - 2 * exp[0] === 0 || 3 + 1 - 2 * exp[0] === 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texteCorr += '=' + simpExp(base, 3 + 1 - 2 * exp[0])
          }
          texteCorr += '$'
          reponseInteractive = `${base}^{${3 + 1 - 2 * exp[0]}}`
          exposantInteractif = 3 + 1 - 2 * exp[0]
          break
      }
      if (this.interactif && !context.isAmc) {
        setReponse(this, i, reponseInteractive, { formatInteractif: 'puissance' })
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        // texte += 'rep : ' + reponseInteractive + ' -- '
        // texte += 'case : ' + typesDeQuestions
      }
      if (context.isAmc) {
        setReponse(this, i, reponseInteractive, { formatInteractif: 'puissance', basePuissance: base, exposantPuissance: exposantInteractif })
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
}
