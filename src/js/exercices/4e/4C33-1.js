import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, choice, combinaisonListes, lettreDepuisChiffre, texteGras, simpNotPuissance, eclatePuissance, reorganiseProduitPuissance, modalPdf } from '../../modules/outils.js'

import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Puissances : Le sens des règles de calculs'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true // pour définir que l'exercice est exportable AMC
export const amcType = 'AMCNum'

/**
 * Puissances d'un relatif (1)
 * * L\'objectif est de travailler le sens des règles de calcul sur les puissances plutôt que les formules magiques
 *
 * Paramétrages possibles :
 * * 1 : produit de puissances de même base
 * * 2 : quotient de puissances de même base
 * * 3 : puissance de puissance
 * * 4 : produit de puissances de même exposant
 * * 5 : mélange des trois autres niveaux
 * @author Sébastien Lozano
 * 4C33-1
 */
export default function PuissancesDunRelatif1 () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1
  this.titre = titre
  context.isHtml
    ? (this.consigne = 'Écrire sous la forme $\\mathbf{a^n}$.')
    : (this.consigne = 'Écrire sous la forme $a^n$.')
  context.isHtml ? (this.spacing = 3) : (this.spacing = 2)
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)
  this.nbQuestions = 5
  this.correctionDetailleeDisponible = true
  this.nbColsCorr = 1
  this.sup = 5

  this.listePackages = 'bclogo'

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
    this.autoCorrection = []

    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1] // produit de puissances de même base
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2] // quotient de puissances de même base
    } else if (this.sup === 3) {
      typesDeQuestionsDisponibles = [3] // puissance de puissance
    } else if (this.sup === 4) {
      typesDeQuestionsDisponibles = [4] // produit de puissances de même exposant
    } else if (this.sup === 5) {
      typesDeQuestionsDisponibles = [1, 2, 3, 4] // mélange
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
        base0,
        base1,
        base,
        baseUtile,
        baseUtileBisAMC,
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
      // une fonction pour des infos supp sur les exposants
      function remarquesPuissances (base, baseUtile, exposant) {
        let sortie = ''
        if (base < 0 && exposant % 2 === 0) {
          sortie += '<br>'
          sortie += `${texteGras('Remarque : ')} Dans ce cas comme les puissances d'exposant pair de deux nombres opposés sont égaux, on peut écrire $${simpNotPuissance(base, exposant)}$ à la place de $${baseUtile}^{${exposant}}$`
        };
        if (base < 0 && exposant % 2 === 1) {
          sortie += '<br>'
          sortie += `${texteGras('Remarque : ')} Dans ce cas comme les puissances d'exposant impair de deux nombres négatifs sont opposées, on pourrait écrire $${simpNotPuissance(base, exposant)}$  à la place de $${baseUtile}^{${exposant}}$`
        };

        return sortie
      };

      typesDeQuestions = listeTypeDeQuestions[i]

      base = randint(2, 9) * choice([-1, 1]) // on choisit une base sauf 1 ... penser à gérer le cas des bases qui sont des puissances
      exp0 = randint(1, 9)
      exp1 = randint(1, 9, [exp0])
      exp = [exp0, exp1] // on choisit deux exposants différents c'est mieux
      lettre = lettreDepuisChiffre(i + 1) // on utilise des lettres pour les calculs

      if (base < 0) {
        baseUtile = '(' + base + ')' // on définit une base avec des parenthèses pour l'affichage du cas negatif
      } else {
        baseUtile = base
      }

      texteCorr = ''

      switch (typesDeQuestions) {
        case 1: // produit de puissances de même base
          texte = `$${lettre}=${baseUtile}^${exp[0]}\\times ${baseUtile}^${exp[1]}$`

          texteCorr += `$${lettre}=${baseUtile}^${exp[0]}\\times ${baseUtile}^${exp[1]}$`
          if (this.correctionDetaillee) {
            texteCorr += '<br>'
            texteCorr += `$${lettre}=${eclatePuissance(
              baseUtile,
              exp[0],
              coul0
            )} \\times ${eclatePuissance(baseUtile, exp[1], coul1)}$`
          }
          texteCorr += '<br>'
          texteCorr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[0]}}~\\color{black}{+}~\\color{${coul1}}{${exp[1]}}}$ facteurs tous égaux à $${baseUtile}$`
          texteCorr += '<br>'
          texteCorr += `$${lettre}=${baseUtile}^{${exp[0]}+${exp[1]}} = ${baseUtile}^{${exp[0] + exp[1]}}`
          // attention la baseUtile est de type str alors que la fonction switch sur un type number
          if ((base < 0) && ((exp[1] + exp[0]) % 2 === 0)) {
            texteCorr += `=${simpNotPuissance(base, exp[1] + exp[0])}$`
          } else {
            texteCorr += '$'
          }
          texteCorr += remarquesPuissances(base, baseUtile, exp[1] + exp[0])
          texteCorr += '<br>'
          if (base < 0 && ((exp[0] + exp[1]) % 2) === 0) {
            reponseInteractive = [`${baseUtile}^${exp[1] + exp[0]}`, `${-base}^${exp[1] + exp[0]}`]
            baseUtileBisAMC = -base
          } else {
            reponseInteractive = `${baseUtile}^${exp[1] + exp[0]}`
          }
          exposantInteractif = exp[1] + exp[0]
          break
        case 2: // quotient de puissances de même base
          // Pour que la couleur de la base associée à l'exposant max soit toujours rouge.
          if (Math.max(exp[0], exp[1]) === exp[0]) {
            couleurExp0 = coul0
            couleurExp1 = coul1
          } else {
            couleurExp0 = coul1
            couleurExp1 = coul0
          };

          texte = `$${lettre}=\\dfrac{${baseUtile}^${exp[0]}}{${baseUtile}^${exp[1]}}$`

          texteCorr += `$${lettre}=\\dfrac{${baseUtile}^${exp[0]}}{${baseUtile}^${exp[1]}}$`

          if (this.correctionDetaillee) {
            texteCorr += '<br><br>'
            texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(baseUtile, exp[0], couleurExp0)}}{${eclatePuissance(baseUtile, exp[1], couleurExp1)}}$`
          }
          texteCorr += '<br><br>'
          texteCorr += `Il y a donc $\\mathbf{\\color{${coul1}}{${Math.min(exp[0], exp[1])}}}$ simplifications par $${baseUtile}$ possibles.`
          if (this.correctionDetaillee) {
            texteCorr += '<br><br>'
          }
          if (exp[0] - exp[1] === 0) {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[0],
                couleurExp0
              )}}{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[0],
                couleurExp1
              )}}$`
            }
            texteCorr += '<br><br>'
            texteCorr += `$${lettre}=1$`
          } else if (exp[0] - exp[1] < 0) {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[0],
                couleurExp0
              )}}{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[0],
                couleurExp1
              )}\\times${eclatePuissance(
                baseUtile,
                exp[1] - exp[0],
                couleurExp1
              )}}$`
            }
            texteCorr += '<br><br>'
            texteCorr += `$${lettre}=\\dfrac{1}{${baseUtile}^{${exp[1]}-${exp[0]}}}=\\dfrac{1}{${baseUtile}^{${exp[1] - exp[0]}}}`
            if ((base < 0) && ((exp[1] - exp[0]) % 2 === 0)) {
              texteCorr += `=\\dfrac{1}{${simpNotPuissance(
                base,
                exp[1] - exp[0]
              )}}=${simpNotPuissance(base, exp[0] - exp[1])}$`
            } else {
              texteCorr += `=${baseUtile}^{${exp[0] - exp[1]}}$`
            }
          } else {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[1],
                couleurExp0
              )}\\times${eclatePuissance(
                baseUtile,
                exp[0] - exp[1],
                couleurExp0
              )}}{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[1],
                couleurExp1
              )}}$`
            }
            texteCorr += '<br><br>'
            texteCorr += `$${lettre}=${baseUtile}^{${exp[0]}-${exp[1]}}=${baseUtile}^{${exp[0] - exp[1]}}`
            if ((base < 0) && ((exp[0] - exp[1]) % 2 === 0)) {
              texteCorr += `=${simpNotPuissance(base, exp[0] - exp[1])}$`
            } else {
              texteCorr += '$'
            }
          }
          texteCorr += remarquesPuissances(base, baseUtile, exp[0] - exp[1])
          texteCorr += '<br>'
          if (base < 0 && ((exp[0] - exp[1]) % 2) === 0) {
            reponseInteractive = [`${baseUtile}^${exp[0] - exp[1]}`, `${-base}^${exp[0] - exp[1]}`]
            baseUtileBisAMC = -base
          } else {
            reponseInteractive = `${baseUtile}^${exp[0] - exp[1]}`
          }
          exposantInteractif = exp[0] - exp[1]
          break
        case 3: // exponentiation
          exp = [randint(2, 4), randint(2, 4)] // on redéfinit les deux exposants pour ne pas avoir d'écritures trop longues et pour éviter 1
          texte = `$${lettre}=(${baseUtile}^${exp[0]})^{${exp[1]}}$`

          texteCorr += `$${lettre}=(${baseUtile}^${exp[0]})^{${exp[1]}}$`

          if (this.correctionDetaillee) {
            texteCorr += '<br>'
            texteCorr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(${baseUtile}^${exp[0]})`,
              exp[1],
              coul0
            )}}_{${exp[1]}\\thickspace\\text{facteurs}}}$`
            texteCorr += '<br>'
            texteCorr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(\\color{${coul1}}{\\underbrace{${eclatePuissance(
                baseUtile,
                exp[0],
                coul1
              )}}_{${exp[0]}\\thickspace\\text{facteurs}}}\\color{${coul0}})`,
              exp[1],
              coul0
            )}}_{${exp[1]}\\times\\color{${coul1}}{${exp[0]
              }}\\thickspace\\color{black}{\\text{facteurs}}}}$`
          }
          texteCorr += '<br>'
          texteCorr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[1]}}~\\color{black}{\\times}~\\color{${coul1}}{${exp[0]}}}$ facteurs tous égaux à $${baseUtile}$`
          texteCorr += '<br>'
          texteCorr += `$${lettre}=${baseUtile}^{${exp[0]}\\times${exp[1]
            }} = ${baseUtile}^{${exp[0] * exp[1]}}`
          if ((base < 0) && ((exp[1] * exp[0]) % 2 === 0)) {
            texteCorr += `= ${simpNotPuissance(base, exp[0] * exp[1])}$`
          } else {
            texteCorr += '$'
          }
          texteCorr += remarquesPuissances(base, baseUtile, exp[0] * exp[1])
          texteCorr += '<br>'
          if (base < 0 && (exp[0] * exp[1] % 2) === 0) {
            reponseInteractive = [`${baseUtile}^${exp[0] * exp[1]}`, `${-base}^${exp[0] * exp[1]}`]
            baseUtileBisAMC = -base
          } else {
            reponseInteractive = `${baseUtile}^${exp[0] * exp[1]}`
          }
          exposantInteractif = exp[0] * exp[1]
          break
        case 4: // produit de puissances de même exposant
          base0 = randint(2, 8, [4, 6])
          base1 = randint(2, 8, [4, 6, base0])
          base = [base0, base1] // on choisit 2 bases différentes c'est mieux
          exp = randint(2, 5, 6) // on choisit un exposant
          texte = `$${lettre}=${base[0]}^${exp}\\times ${base[1]}^${exp}$`
          texteCorr += '<br>'
          texteCorr += `$${lettre}=${base[0]}^${exp}\\times ${base[1]}^${exp}$`

          if (this.correctionDetaillee) {
            texteCorr += '<br>'
            texteCorr += `$${lettre}=${eclatePuissance(
              base[0],
              exp,
              coul0
            )} \\times ${eclatePuissance(base[1], exp, coul1)}$`
            texteCorr += '<br>'
            texteCorr += `$${lettre}=${reorganiseProduitPuissance(
              base[0],
              base[1],
              exp,
              coul0,
              coul1
            )}$`
          }
          texteCorr += '<br>'
          texteCorr += `$${lettre}= (\\color{${coul0}}{\\mathbf{${base[0]
            }}} \\color{black}{\\times} \\color{${coul1}}{\\mathbf{${base[1]
            }}}\\color{black}{)^{${exp}}}=${base[0] * base[1]}^${exp}$`
          texteCorr += '<br>'
          // Ici la base ne peut jamais être négative
          reponseInteractive = `${base[0] * base[1]}^${exp}`
          baseUtile = base[0] * base[1]
          baseUtileBisAMC = base[0] * base[1] // juste pour ne pas avoir à ajouter un batterie de ligne spécifique pour ce cas, je mets deux fois la même chose
          base = baseUtile
          exposantInteractif = exp
          break
      }
      if (this.interactif && !context.isAmc) {
        setReponse(this, i, reponseInteractive, { formatInteractif: 'puissance' })
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: ' $=$' })
      }
      if (context.isAmc) {
        setReponse(this, i, reponseInteractive, { formatInteractif: 'puissance', basePuissance: base, exposantPuissance: exposantInteractif, exposantNbChiffres: 2, signe: true, aussiCorrect: baseUtileBisAMC })
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = [
    'Règle à travailler',
    5,
    '1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissances\n4 : Produit de puissances de même exposant\n5 : Mélange'
  ]
}
