import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, extraireRacineCarree, randint, sp, calcul, choice, texFractionReduite } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Résoudre une équation avec une fonction de référence'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '27/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = 'a7515'
export const ref = 'can2F09'
export default function ResoudreEquationsFonctionDeReference () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.spacing = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let texte, texteCorr, a, k, b, c
    switch (choice([1, 1, 2, 3])) { //
      case 1 :
        a = calcul(randint(0, 10) ** 2)
        b = choice([2, 3, 5, 7, 10, 11, 13, 14, 15, 17, 19, 21, 23])
        c = choice([-1, -2, -3, -5, -7, -10, -11, -13, -14, -15, -4, -9, -16, -25, -36, -49, -64, -81, -100])
        k = choice([a, a, b, b, c])
        if (this.interactif) {
          texte = `L'ensemble des solutions $S$ de l'équation $x^2=${k}$ est :
               `
          if (k === a) {
            if (k === 0) {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: '$S=\\{0\\}$',
                    statut: true
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false
                  },
                  {
                    texte: '$S=\\{1\\}$',
                    statut: false
                  }
                ]
              }
            } else {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\{-${Math.sqrt(k)};${Math.sqrt(k)}\\}$`,
                    statut: true
                  },
                  {
                    texte: `$S=\\{${Math.sqrt(k)}\\}$`,
                    statut: false
                  },
                  {
                    texte: `$S=\\{${k}\\}$`,
                    statut: false
                  }
                ]
              }
            }
          }
          if (k === b) {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$S=\\{-\\sqrt{${k}};\\sqrt{${k}}\\}$`,
                  statut: true
                },
                {
                  texte: `$S=\\{\\sqrt{${k}}\\}$`,
                  statut: false
                },
                {
                  texte: '$S=\\emptyset$',
                  statut: false
                }
              ]
            }
          }
          if (k === c) {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: '$S=\\emptyset$',
                  statut: true
                },
                {
                  texte: `$S=\\{-\\sqrt{${-k}};\\sqrt{${-k}}\\}$`,
                  statut: false
                },
                {
                  texte: `$S=\\{\\sqrt{${-k}}\\}$`,
                  statut: false
                }
              ]
            }
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Résoudre dans $\\mathbb{R}$ :<br>

       $x^2=${k}$`
        }

        texteCorr = ''
        if (k > 0) {
          texteCorr += `L'équation est de la forme $x^2=k$ avec $k=${k}$. Comme  $${k}>0$ alors l'équation admet deux solutions : $-\\sqrt{${k}}$ et $\\sqrt{${k}}$.<br>
          `
          if (extraireRacineCarree(k)[1] === k) {
            if (k === 1) {
              texteCorr += `Comme $-\\sqrt{${k}}=-${Math.sqrt(k)}$ et $\\sqrt{${k}}=${Math.sqrt(k)}$ alors
          les solutions de l'équation peuvent s'écrire plus simplement : $-${Math.sqrt(k)}$ et $${Math.sqrt(k)}$.<br>
          Ainsi,  $S=\\{-${Math.sqrt(k)}${sp(1)};${sp(1)}${Math.sqrt(k)}\\}$.`
            } else {
              texteCorr += `Ainsi, $S=\\{-\\sqrt{${k}}${sp(1)};${sp(1)}\\sqrt{${k}}\\}$.`
            }
          } else {
            if (k === a) {
              texteCorr += `Comme $-\\sqrt{${k}}=-${Math.sqrt(k)}$ et $\\sqrt{${k}}=${Math.sqrt(k)}$ alors
          les solutions de l'équation peuvent s'écrire plus simplement : $-${Math.sqrt(k)}$ et $${Math.sqrt(k)}$.<br>
          Ainsi,  $S=\\{-${Math.sqrt(k)}${sp(1)};${sp(1)}${Math.sqrt(k)}\\}$.`
            } else {
              texteCorr += `Comme $-\\sqrt{${k}}=-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ alors
              les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$.<br>
              Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}\\}$.`
            }
          }
        } else {
          if (k === 0) {
            texteCorr += `L'équation est de la forme $x^2=k$ avec $k=${k}$. Comme $k=${k}$ alors L'équation admet une unique solution : $0$.<br>
          Ainsi, $S=\\{0\\}$.`
          } else {
            texteCorr += `L'équation est de la forme $x^2=k$. Comme $k=${k}$ et $${k}<0$, alors l'équation n'admet aucune solution.<br>
            Ainsi, $S=\\emptyset$.`
          }
        }
        this.canEnonce = `Résoudre dans $\\mathbb{R}$ l'équation $x^2=${k}$.`
        this.canReponseACompleter = ''
        break
      case 2 :
        k = randint(-5, 10)
        if (this.interactif) {
          texte = `L'ensemble des solutions $S$ de l'équation $\\sqrt{x}=${k}$ est :
                 `
          if (k > 0) {
            if (k !== 1) {
              if (k !== 1) {
                if (k === 2) {
                  this.autoCorrection[0] = {
                    enonce: texte,
                    options: { horizontal: true },
                    propositions: [
                      {
                        texte: `$S=\\{${k ** 2}\\}$`,
                        statut: true
                      },
                      {
                        texte: '$S=\\emptyset$',
                        statut: false
                      },
                      {
                        texte: `$S=\\{${k}\\}$`,
                        statut: false
                      }
                    ]
                  }
                } else {
                  this.autoCorrection[0] = {
                    enonce: texte,
                    options: { horizontal: true },
                    propositions: [
                      {
                        texte: `$S=\\{${k ** 2}\\}$`,
                        statut: true
                      },
                      {
                        texte: `$S=\\{${2 * k}\\}$`,
                        statut: false
                      },
                      {
                        texte: `$S=\\{${k}\\}$`,
                        statut: false
                      }
                    ]
                  }
                }
              }
            } else {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\{${k}\\}$`,
                    statut: true
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false
                  },
                  {
                    texte: `$S=\\{${2 * k}\\}$`,
                    statut: false
                  }
                ]
              }
            }
          }

          if (k < 0) {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: '$S=\\emptyset$',
                  statut: true
                },
                {
                  texte: `$S=\\{\\sqrt{${-k}}\\}$`,
                  statut: false
                },
                {
                  texte: `$S=\\{${k ** 2}\\}$`,
                  statut: false
                }
              ]
            }
          }
          if (k === 0) {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: '$S=\\{0\\}$',
                  statut: true
                },
                {
                  texte: `$S=\\{${k + 1}\\}$`,
                  statut: false
                },
                {
                  texte: '$S=\\emptyset$',
                  statut: false
                }
              ]
            }
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Résoudre dans $[0${sp(1)};${sp(1)}+\\infty[$ :<br>

              $\\sqrt{x}=${k}$`
        }

        texteCorr = `Pour tout réel $x$ positif ou nul, l'équation $\\sqrt{x}=k$ admet :<br>
            $\\bullet~$ une solution  si $k\\geqslant 0$ : $k^2$ ;<br>
            $\\bullet~$  aucune solution si $k<0$.<br>
           `

        if (k < 0) {
          texteCorr += `L'équation est de la forme $\\sqrt{x}=k$. Comme $k=${k}$ et $${k}<0$ alors l'équation n'admet pas de solution.<br>
          Ainsi,   $S=\\emptyset$.
          `
        }
        if (k > 0 || k === 0) {
          texteCorr += `$k=${k}$ et $${k}>0$ donc l'équation admet une solution : $${k}^2=${k ** 2}$.<br>
           Ainsi $S=\\{${k ** 2}\\}$.
          `
        }
        this.canEnonce = `Résoudre dans $[0${sp(1)};${sp(1)}+\\infty[$ l'équation $\\sqrt{x}=${k}$.`
        this.canReponseACompleter = ''
        break

      case 3 :
        k = randint(-10, 10)
        if (this.interactif) {
          texte = `L'ensemble des solutions $S$ de l'équation $\\dfrac{1}{x}=${k}$ est :
                   `
          if (k !== 0) {
            if (k === 1) {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\left\\{${texFractionReduite(1, k)}\\right\\}$`,
                    statut: true
                  },
                  {
                    texte: `$S=\\left\\{${texFractionReduite(1, -k)}\\right\\}$`,
                    statut: false
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false
                  }
                ]
              }
            } else {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\left\\{${texFractionReduite(1, k)}\\right\\}$`,
                    statut: true
                  },
                  {
                    texte: `$S=\\left\\{${texFractionReduite(1, -k)}\\right\\}$`,
                    statut: false
                  },
                  {
                    texte: `$S=\\left\\{${k}\\right\\}$`,
                    statut: false
                  }
                ]
              }
            }
          }
          if (k === 0) {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: '$S=\\emptyset$',
                  statut: true
                },
                {
                  texte: '$S=\\left\\{0\\right\\}$',
                  statut: false
                },
                {
                  texte: '$S=\\left\\{-1\\right\\}$',
                  statut: false
                }
              ]
            }
          }
          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Résoudre dans $\\mathbb{R}^*$ :<br>

                $\\dfrac{1}{x}=${k}$`
        }

        texteCorr = `L'équation $\\dfrac{1}{x}=k$ admet :<br>
          $\\bullet~$ une unique solution si $k\\neq 0$ : $\\dfrac{1}{k}$.<br>
          $\\bullet~$ aucune solution si $k= 0$.<br>`

        if (k === 0) {
          texteCorr += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Comme $k=${k}$, alors l'équation n'admet pas de solution.<br>
            Ainsi,   $S=\\emptyset$.
            `
        }
        if (k !== 0) {
          texteCorr += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Comme $${k}\\neq 0$ alors l'équation admet une solution :
            $${texFractionReduite(1, k)}$.<br>
           Ainsi $S=\\left\\{${texFractionReduite(1, k)}\\right\\}$.
          `
        }
        this.canEnonce = `Résoudre dans $\\mathbb{R}^*$ l'équation $\\dfrac{1}{x}=${k}$.`
        this.canReponseACompleter = ''
        break
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
