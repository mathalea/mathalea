import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { modalPdf } from '../../modules/outils/modaux.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { lettreDepuisChiffre } from '../../modules/outils/lettres.js'
import { eclatePuissance, simpExp, simpNotPuissance } from '../../modules/outils/puissances.js'
export const titre = 'Puissances de 10 : Le sens des règles de calculs'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * 4C30 -- Puissances de 10
 * * Travailler des résultats automatisés
 * @author Sébastien Lozano
 */
export const uuid = 'f5dcf'
export const ref = '4C30'
export default function PuissancesDeDix () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1
  this.titre = titre
  context.isHtml
    ? (this.consigne = 'Écrire sous la forme $\\mathbf{10^n}$.')
    : (this.consigne = 'Écrire sous la forme $10^n$.')
  context.isHtml ? (this.spacing = 3) : (this.spacing = 2)
  context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
  this.nbQuestions = 5
  this.correctionDetailleeDisponible = true
  this.nbColsCorr = 1
  this.sup = 1
  this.nouvelleVersion = function (numeroExercice) {
    this.sup = Number(this.sup)
    let typesDeQuestions
    this.boutonAide = modalPdf(
      numeroExercice,
      'assets/pdf/FichePuissances-4N21.pdf',
      'Aide mémoire sur les puissances (Sébastien Lozano)',
      'Aide mémoire'
    )

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1, 2, 3] // produit, quotient et exponentiation de puissances de 10
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = [4, 5, 6, 7, 8, 9, 10, 11] // calculs première série
    } else if (this.sup === 3) {
      typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] // calculs deuxième série
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )

    // pour pouvoir adapter les couleurs en cas de besoin
    const coul0 = 'red'
    const coul1 = 'blue'

    for (
      let i = 0,
        exp0,
        exp1,
        exp,
        couleurExp0,
        couleurExp1,
        lettre,
        texte,
        texteCorr,
        reponseInteractive,
        exposantInteractif,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]

      exp0 = randint(1, 9)
      exp1 = randint(1, 9, [exp0])
      exp = [exp0, exp1] // on choisit deux exposants différents c'est mieux
      lettre = lettreDepuisChiffre(i + 1) // on utilise des lettres pour les calculs

      switch (typesDeQuestions) {
        case 1: // produit de puissances de même base
          texte = `$${lettre}=10^${exp[0]}\\times 10^${exp[1]}$`
          texteCorr = `$${lettre}=10^${exp[0]}\\times 10^${exp[1]}$`
          if (this.correctionDetaillee) {
            texteCorr += '<br>'
            texteCorr += `$${lettre}=${eclatePuissance(
              10,
              exp[0],
              coul0
            )} \\times ${eclatePuissance(10, exp[1], coul1)}$`
          }
          texteCorr += '<br>'
          texteCorr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[0]}}~\\color{black}{+}~\\color{${coul1}}{${exp[1]}}}$ facteurs tous égaux à $10$.`
          texteCorr += '<br>'
          texteCorr += `$${lettre}=10^{${exp[0]}+${exp[1]}} = 10^{${exp[0] + exp[1]}}`
          // attention la base est de type str alors que la fonction switch sur un type number
          // if ((exp[1] + exp[0]) % 2 === 0) {
          //  texteCorr += `=${simpNotPuissance(10, exp[0] + exp[1])}`
          // }
          texteCorr += '$'
          texteCorr += '<br>'
          reponseInteractive = `10^{${exp[0] + exp[1]}}`
          exposantInteractif = exp[0] + exp[1]
          break
        case 2: // quotient de puissances de même base
          // Pour que la couleur de la 10 associée à l'exposant max soit toujours rouge.
          if (Math.max(exp[0], exp[1]) === exp[0]) {
            couleurExp0 = coul0
            couleurExp1 = coul1
          } else {
            couleurExp0 = coul1
            couleurExp1 = coul0
          }
          texte = `$${lettre}=\\dfrac{10^${exp[0]}}{10^${exp[1]}}$`
          texteCorr = `$${lettre}=\\dfrac{10^${exp[0]}}{10^${exp[1]}}$`
          if (this.correctionDetaillee) {
            texteCorr += '<br><br>'
            texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
              10,
              exp[0],
              couleurExp0
            )}}{${eclatePuissance(10, exp[1], couleurExp1)}}$`
          }
          texteCorr += '<br><br>'
          texteCorr += `Il y a donc $\\mathbf{\\color{${coul1}}{${Math.min(
            exp[0],
            exp[1]
          )}}}$ simplifications par $10$ possibles.`
          if (this.correctionDetaillee) {
            texteCorr += '<br><br>'
          }
          if (exp[0] - exp[1] === 0) {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                '\\cancel{10}',
                exp[0],
                couleurExp0
              )}}{${eclatePuissance('\\cancel{10}', exp[0], couleurExp1)}}$`
            }
            texteCorr += '<br><br>'
            texteCorr += `$${lettre}=1`
          } else if (exp[0] - exp[1] < 0) {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                '\\cancel{10}',
                exp[0],
                couleurExp0
              )}}{${eclatePuissance(
                '\\cancel{10}',
                exp[0],
                couleurExp1
              )}\\times${eclatePuissance(10, exp[1] - exp[0], couleurExp1)}}$`
            }
            texteCorr += '<br><br>'
            texteCorr += `$${lettre}=\\dfrac{1}{10^{${exp[1]}-${exp[0]}}}=\\dfrac{1}{10^{${exp[1] - exp[0]}}}`
            if ((exp[1] - exp[0]) % 2 === 0) {
              texteCorr += `=\\dfrac{1}{${simpNotPuissance(
                10,
                exp[1] - exp[0]
              )}}=${simpNotPuissance(10, exp[0] - exp[1])}`
            } else {
              texteCorr += `=10^{${exp[0] - exp[1]}}`
            }
          } else {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                '\\cancel{10}',
                exp[1],
                couleurExp0
              )}\\times${eclatePuissance(
                10,
                exp[0] - exp[1],
                couleurExp0
              )}}{${eclatePuissance('\\cancel{10}', exp[1], couleurExp1)}}$`
            }
            texteCorr += '<br><br>'
            texteCorr += `$${lettre}=10^{${exp[0]}-${exp[1]}}=10^{${exp[0] - exp[1]
              }}`
          }
          setReponse(this, i, `10^{${exp[0] - exp[1]}}`, { formatInteractif: 'puissance' })
          texteCorr += '$'
          texteCorr += '<br>'
          reponseInteractive = `10^{${exp[0] - exp[1]}}`
          exposantInteractif = exp[0] - exp[1]
          break
        case 3: // exponentiation
          exp = [randint(2, 4), randint(2, 4)] // on redéfinit les deux exposants pour ne pas avoir d'écritures trop longues et pour éviter 1
          texte = `$${lettre}=(10^${exp[0]})^{${exp[1]}}$`
          texteCorr = `$${lettre}=(10^${exp[0]})^{${exp[1]}}$`
          if (this.correctionDetaillee) {
            texteCorr += '<br>'
            texteCorr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(10^${exp[0]})`,
              exp[1],
              coul0
            )}}_{${exp[1]}\\thickspace\\text{facteurs}}}$`
            texteCorr += '<br>'
            texteCorr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(\\color{${coul1}}{\\underbrace{${eclatePuissance(
                10,
                exp[0],
                coul1
              )}}_{${exp[0]}\\thickspace\\text{facteurs}}}\\color{${coul0}})`,
              exp[1],
              coul0
            )}}_{${exp[1]}\\times\\color{${coul1}}{${exp[0]
              }}\\thickspace\\color{black}{\\text{facteurs}}}}$`
          }
          texteCorr += '<br>'
          texteCorr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[1]}}~\\color{black}{\\times}~\\color{${coul1}}{${exp[0]}}}$ facteurs tous égaux à $10$.`
          texteCorr += '<br>'
          texteCorr += `$${lettre}=10^{${exp[0]}\\times${exp[1]}} = 10^{${exp[0] * exp[1]
            }}`
          texteCorr += '$'
          texteCorr += '<br>'
          reponseInteractive = `10^{${exp[0] * exp[1]}}`
          exposantInteractif = exp[0] * exp[1]
          break
        case 4:
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 7, [1])] // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 100}{10^${exp[1]} \\times 10^${exp[2]}}$`
          texteCorr = `$\\dfrac{10^${exp[0]}\\times 100}{10^${exp[1]} \\times 10^${exp[2]}}`
          texteCorr += ` = \\dfrac{10^${exp[0]}\\times 10^{2}}{10^${exp[1]} \\times 10^${exp[2]}}`
          texteCorr += ` = \\dfrac{10^{${exp[0]}+2}}{10^{${exp[1]}+${exp[2]}}}`
          texteCorr += ` = \\dfrac{10^{${exp[0] + 2}}}{10^{${exp[1] + exp[2]
            }}}`
          texteCorr += ` = 10^{${exp[0] + 2}-${exp[1] + exp[2]}}`
          texteCorr += ` = 10^{${exp[0] + 2 - exp[1] - exp[2]}}`
          if (
            exp[0] + 2 - exp[1] - exp[2] === 0 ||
            exp[0] + 2 - exp[1] - exp[2] === 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += '=' + simpExp(10, exp[0] + 2 - exp[1] - exp[2])
          }
          texteCorr += '$'
          reponseInteractive = `10^{${exp[0] + 2 - exp[1] - exp[2]}}`
          exposantInteractif = exp[0] + 2 - exp[1] - exp[2]
          break
        case 5:
          exp = [randint(1, 7, [1]), randint(1, 7, [1])] // on a besoin de 2 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 1000}{10^${exp[1]}}$`
          texteCorr = `$\\dfrac{10^${exp[0]}\\times 1000}{10^${exp[1]}}`
          texteCorr += ` = \\dfrac{10^${exp[0]}\\times 10^3}{10^${exp[1]}}`
          texteCorr += ` = \\dfrac{10^{${exp[0]}+3}}{10^${exp[1]}}`
          texteCorr += ` = \\dfrac{10^{${exp[0] + 3}}}{10^${exp[1]}}`
          texteCorr += ` = 10^{${exp[0] + 3}-${exp[1]}}`
          texteCorr += ` = 10^{${exp[0] + 3 - exp[1]}}`
          if (exp[0] + 3 - exp[1] === 0 || exp[0] + 3 - exp[1] === 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += '=' + simpExp(10, exp[0] + 3 - exp[1])
          }
          texteCorr += '$'
          reponseInteractive = `10^{${exp[0] + 3 - exp[1]}}`
          exposantInteractif = exp[0] + 3 - exp[1]
          break
        case 6:
          exp = [randint(1, 7, [1]), randint(1, 2)] // on a besoin de 2 exposants distincts
          // le second exposant ne peut valoir que 1 ou 2 la fonction testExp ne convient pas à l'affichage ici
          if (exp[1] === 2) {
            texte = `$\\dfrac{10\\times 10^${exp[0]}}{100^${exp[1]}}$`
            texteCorr = `$\\dfrac{10\\times 10^${exp[0]}}{100^${exp[1]}}`
            texteCorr += `=\\dfrac{10^{1+${exp[0]}}}{(10^2)^${exp[1]}}`
            texteCorr += `=\\dfrac{10^{1+${exp[0]}}}{10^{2 \\times ${exp[1]}}}`
            texteCorr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{${2 * exp[1]}}}`
          } else {
            texte = `$\\dfrac{10\\times 10^${exp[0]}}{100}$`
            texteCorr = `$\\dfrac{10\\times 10^${exp[0]}}{100}`
            texteCorr += `=\\dfrac{10^{1+${exp[0]}}}{10^2}`
          }
          texteCorr += `=10^{${1 + exp[0]}-${2 * exp[1]}}`
          texteCorr += `=10^{${1 + exp[0] - 2 * exp[1]}}`
          if (1 + exp[0] - 2 * exp[1] === 0 || 1 + exp[0] - 2 * exp[1] === 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += '=' + simpExp(10, 1 + exp[0] - 2 * exp[1])
          }
          texteCorr += '$'
          reponseInteractive = `10^{${1 + exp[0] - 2 * exp[1]}}`
          exposantInteractif = 1 + exp[0] + 2 * exp[1]
          break
        case 7:
          exp = [randint(1, 7, [1])] // on a besoin de 1 exposant
          texte = `$\\dfrac{10\\times 10^${exp[0]}}{100\\times 100}$`
          texteCorr = `$\\dfrac{10\\times 10^${exp[0]}}{100\\times 100}`
          texteCorr += `=\\dfrac{10^{1+${exp[0]}}}{10^2\\times 10^2}`
          texteCorr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{2+2}}`
          texteCorr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{${2 + 2}}}`
          texteCorr += `=10^{${1 + exp[0]}-${2 + 2}}`
          texteCorr += `=10^{${1 + exp[0] - 2 - 2}}`
          if (1 + exp[0] - 2 - 2 === 0 || 1 + exp[0] - 2 - 2 === 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += '=' + simpExp(10, exp[0] - 3)
          }

          texteCorr += '$'
          reponseInteractive = `10^{${exp[0] - 3}}`
          exposantInteractif = exp[0] - 3
          break
        case 8:
          exp = [randint(1, 7, [1])] // on a besoin de 1 exposant
          texte = `$\\dfrac{100^${exp[0]}}{10}$`
          texteCorr = `$\\dfrac{100^${exp[0]}}{10}`
          texteCorr += `=\\dfrac{(10^2)^${exp[0]}}{10}`
          texteCorr += `=\\dfrac{10^{2\\times ${exp[0]}}}{10}`
          texteCorr += `=\\dfrac{10^{${2 * exp[0]}}}{10}`
          texteCorr += `=10^{${2 * exp[0]}-1}`
          texteCorr += `=10^{${2 * exp[0] - 1}}$`
          reponseInteractive = `10^{${2 * exp[0] - 1}}`
          exposantInteractif = 2 * exp[0] - 1
          // Inutile de tester l'exposant final car il vaut au minimum 3
          break
        case 9:
          exp = [randint(1, 3, [1])] // on a besoin de 1 exposant
          texte = `$\\dfrac{1000^${exp[0]}}{10}$`
          texteCorr = `$\\dfrac{1000^${exp[0]}}{10}`
          texteCorr += `=\\dfrac{(10^3)^${exp[0]}}{10}`
          texteCorr += `=\\dfrac{10^{3\\times ${exp[0]}}}{10}`
          texteCorr += `=\\dfrac{10^{${3 * exp[0]}}}{10}`
          texteCorr += `=10^{${3 * exp[0]}-1}`
          texteCorr += `=10^{${3 * exp[0] - 1}}$`
          reponseInteractive = `10^{${3 * exp[0] - 1}}`
          exposantInteractif = 3 * exp[0] - 1
          // inutile de tester l'exposant final car il vaut au minimum 5
          break
        case 10:
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 4, [1])] // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 10^${exp[1]}}{100^${exp[2]}}\\times 10$`
          texteCorr = `$\\dfrac{10^${exp[0]}\\times 10^${exp[1]}}{100^${exp[2]}}\\times 10`
          texteCorr += `=\\dfrac{10^{${exp[0]}+${exp[1]}}}{(10^2)^${exp[2]}}\\times 10`
          texteCorr += `=\\dfrac{10^{${exp[0] + exp[1]}}}{10^{2\\times ${exp[2]
            }}}\\times 10`
          texteCorr += `=\\dfrac{10^{${exp[0] + exp[1]}}}{10^{${2 * exp[2]
            }}}\\times 10`
          texteCorr += `=\\dfrac{10^{${exp[0] + exp[1]}}\\times 10}{10^{${2 * exp[2]
            }}}`
          texteCorr += `=\\dfrac{10^{${exp[0] + exp[1]}+1}}{10^{${2 * exp[2]
            }}}`
          texteCorr += `=\\dfrac{10^{${exp[0] + exp[1] + 1}}}{10^{${2 * exp[2]
            }}}`
          texteCorr += `=10^{${exp[0] + exp[1] + 1}-${2 * exp[2]}}`
          texteCorr += `=10^{${exp[0] + exp[1] + 1 - 2 * exp[2]}}`
          if (
            exp[0] + exp[1] + 1 - 2 * exp[2] === 0 ||
            exp[0] + exp[1] + 1 - 2 * exp[2] === 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texteCorr += '=' + simpExp(10, exp[0] + exp[1] + 1 - 2 * exp[2])
          }
          texteCorr += '$'
          reponseInteractive = `10^{${exp[0] + exp[1] + 1 - 2 * exp[2]}}`
          exposantInteractif = exp[0] + exp[1] + 1 - 2 * exp[2]
          break
        case 11:
          exp = [randint(1, 7, [1])] // on a besoin de 1 exposant
          texte = `$\\dfrac{1000\\times 10}{100^${exp[0]}}$`
          texteCorr = `$\\dfrac{1000\\times 10}{100^${exp[0]}}`
          texteCorr += `=\\dfrac{10^3\\times 10}{(10^2)^${exp[0]}}`
          texteCorr += `=\\dfrac{10^{3+1}}{10^{2\\times${exp[0]}}}`
          texteCorr += `=\\dfrac{10^{4}}{10^{${2 * exp[0]}}}`
          texteCorr += `=10^{4-${2 * exp[0]}}`
          texteCorr += `=10^{${3 + 1 - 2 * exp[0]}}`
          if (3 + 1 - 2 * exp[0] === 0 || 3 + 1 - 2 * exp[0] === 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texteCorr += '=' + simpExp(10, 3 + 1 - 2 * exp[0])
          }
          texteCorr += '$'
          reponseInteractive = `10^{${4 - 2 * exp[0]}}`
          exposantInteractif = 4 - 2 * exp[0]
          break
      }
      if (this.interactif && !context.isAmc) {
        setReponse(this, i, reponseInteractive, { formatInteractif: 'puissance' })
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
      }
      if (context.isAmc) {
        setReponse(this, i, reponseInteractive, { formatInteractif: 'puissance', basePuissance: 10, exposantPuissance: exposantInteractif })
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Règle à travailler',
    3,
    '1 : Calculs de base\n2 : Calculs plus complexes\n3 : Mélange'
  ]
}
