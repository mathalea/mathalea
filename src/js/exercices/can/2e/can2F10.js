import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, ecritureAlgebrique, extraireRacineCarree, ecritureParentheseSiNegatif, texNombrec, miseEnEvidence, randint, sp, calcul, choice, texFractionReduite } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Résoudre une équation avec une fonction de référence*'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '27/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function ResoudreEquationsFonctionDeReference2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.spacing = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let texte, texteCorr, k, b, c
    switch (choice([1, 2, 3, 4, 5, 6])) {
      case 1 :
        b = randint(-5, 5, 0)
        c = randint(-5, 5, 0)
        k = calcul(c - b)
        if (this.interactif) {
          texte = `L'ensemble des solutions $S$ de l'équation $x^2${ecritureAlgebrique(b)}=${c}$ est :
               `
          if (k > 0) {
            if (k === 1 || k === 4 || k === 9 || k === 16 || k === 25) {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\}$`,
                    statut: true
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false
                  },
                  {
                    texte: `$S=\\{${extraireRacineCarree(k)[0]}\\}$`,
                    statut: false
                  }
                ]
              }
            } else {
              if (extraireRacineCarree(k)[1] === k) {
                this.autoCorrection[0] = {
                  enonce: texte,
                  options: { horizontal: true },
                  propositions: [
                    {
                      texte: `$S=\\{-\\sqrt{${c - b}}${sp(1)};${sp(1)}\\sqrt{${c - b}}\\}$`,
                      statut: true
                    },
                    {
                      texte: '$S=\\emptyset$',
                      statut: false
                    },
                    {
                      texte: `$S=\\{\\sqrt{${c - b}}\\}$`,
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
                  texte: '$S=\\{1}\\}$',
                  statut: false
                },
                {
                  texte: '$S=\\emptyset$',
                  statut: false
                }
              ]
            }
          }
          if (k < 0) {
            if (k === -1 || k === -4 || k === -9 || k === -16 || k === -25) {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: '$S=\\emptyset$',
                    statut: true
                  },
                  {
                    texte: `$S=\\{-${Math.sqrt(-k)};${Math.sqrt(-k)}\\}$`,
                    statut: false
                  },
                  {
                    texte: `$S=\\{-${Math.sqrt(-k)}\\}$`,
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
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Résoudre dans $\\mathbb{R}$ :<br>
      ${sp(50)} $x^2${ecritureAlgebrique(b)}=${c}$`
        }

        if (b > 0) {
          texteCorr = `$\\begin{aligned}
         x^2${ecritureAlgebrique(b)}&=${c}\\\\
         x^2${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
         x^2&=${c - b}
         \\end{aligned}$`
        } else {
          texteCorr = `$\\begin{aligned}
         x^2${ecritureAlgebrique(b)}&=${c}\\\\
         x^2${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
         x^2&=${c - b}
         \\end{aligned}$`
        }
        if (k > 0) {
          if (k === 1 || k === 4 || k === 9 || k === 16 || k === 25) {
            texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombrec(k)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombrec(k)}}$ et $\\sqrt{${texNombrec(k)}}$.
            <br> Comme $-\\sqrt{${texNombrec(k)}}=-${extraireRacineCarree(k)[0]}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}$ alors
            les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}$ et $${extraireRacineCarree(k)[0]}$.<br>
            Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\}$.`
          } else {
            if (extraireRacineCarree(k)[1] !== k) {
              texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombrec(k)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombrec(k)}}$ et $\\sqrt{${texNombrec(k)}}$. <br>
                Comme $-\\sqrt{${k}}=-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ alors
                les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$.<br>
                Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}\\}$.`
            } else {
              texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${c - b}>0$,
                donc l'équation a deux solutions : $-\\sqrt{${c - b}}$ et $\\sqrt{${c - b}}$.<br>
                Ainsi,  $S=\\{-\\sqrt{${c - b}}${sp(1)};${sp(1)}\\sqrt{${c - b}}\\}$.`
            }
          }
        }
        if (k === 0) {
          texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombrec(k)}$, alors l'équation a une solution : $0$.<br>
          Ainsi, $S=\\{0\\}$. `
        }
        if (k < 0) {
          texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombrec(c - b)}$, alors l'équation n'a pas de solution.
            <br>Ainsi, $S=\\emptyset$. `
        }
        break
      case 2 :
        b = randint(-5, 5, 0)
        c = randint(-5, 5, 0)
        k = calcul(b - c)
        if (this.interactif) {
          texte = `L'ensemble des solutions $S$ de l'équation $-x^2${ecritureAlgebrique(b)}=${c}$ est :
         `
          if (k > 0) {
            if (k === 1 || k === 4 || k === 9 || k === 16 || k === 25) {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$S=\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\}$`,
                    statut: true
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false
                  },
                  {
                    texte: `$S=\\{${extraireRacineCarree(k)[0]}\\}$`,
                    statut: false
                  }
                ]
              }
            } else {
              if (extraireRacineCarree(k)[1] === k) {
                this.autoCorrection[0] = {
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
                      texte: `$S=\\{\\sqrt{${k}}\\}$`,
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
                  texte: '$S=\\{1}\\}$',
                  statut: false
                },
                {
                  texte: '$S=\\emptyset$',
                  statut: false
                }
              ]
            }
          }
          if (k < 0) {
            if (k === -1 || k === -4 || k === -9 || k === -16 || k === -25) {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: '$S=\\emptyset$',
                    statut: true
                  },
                  {
                    texte: `$S=\\{-${Math.sqrt(-k)};${Math.sqrt(-k)}\\}$`,
                    statut: false
                  },
                  {
                    texte: `$S=\\{-${Math.sqrt(-k)}\\}$`,
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
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Résoudre dans $\\mathbb{R}$ :<br>
${sp(50)} $-x^2${ecritureAlgebrique(b)}=${c}$`
        }

        if (b > 0) {
          texteCorr = `$\\begin{aligned}
   -x^2${ecritureAlgebrique(b)}&=${c}\\\\
   -x^2${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
   x^2&=${b - c}
   \\end{aligned}$`
        } else {
          texteCorr = `$\\begin{aligned}
   -x^2${ecritureAlgebrique(b)}&=${c}\\\\
  - x^2${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
   x^2&=${b - c}
   \\end{aligned}$`
        }
        if (k > 0) {
          if (k === 1 || k === 4 || k === 9 || k === 16 || k === 25) {
            texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombrec(k)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombrec(k)}}$ et $\\sqrt{${texNombrec(k)}}$.
      <br> Comme $-\\sqrt{${texNombrec(k)}}=-${extraireRacineCarree(k)[0]}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}$ alors
      les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}$ et $${extraireRacineCarree(k)[0]}$.<br>
      Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\}$.`
          } else {
            if (extraireRacineCarree(k)[1] !== k) {
              texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombrec(k)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombrec(k)}}$ et $\\sqrt{${texNombrec(k)}}$. <br>
          Comme $-\\sqrt{${k}}=-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ alors
          les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$.<br>
          Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}\\}$.`
            } else {
              texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${k}>0$,
          donc l'équation a deux solutions : $-\\sqrt{${k}}$ et $\\sqrt{${k}}$.<br>
          Ainsi,  $S=\\{-\\sqrt{${k}}${sp(1)};${sp(1)}\\sqrt{${k}}\\}$.`
            }
          }
        }
        if (k === 0) {
          texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombrec(k)}$, alors l'équation a une solution : $0$.<br>
    Ainsi, $S=\\{0\\}$. `
        }
        if (k < 0) {
          texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombrec(k)}$, alors l'équation n'a pas de solution.
      <br>Ainsi, $S=\\emptyset$. `
        }
        break

      case 3 :
        b = randint(-5, 5, 0)
        c = randint(-5, 5)
        k = calcul(c - b)
        if (this.interactif) {
          texte = `L'ensemble des solutions $S$ de l'équation $\\sqrt{x}${ecritureAlgebrique(b)}=${c}$ est :
                     `
          if (k > 0) {
            if (k !== 1) {
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
            ${sp(50)} $\\sqrt{x}${ecritureAlgebrique(b)}=${c}$`
        }
        if (b > 0) {
          texteCorr = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
            $\\begin{aligned}
            \\sqrt{x}${ecritureAlgebrique(b)}&=${c}\\\\
            \\sqrt{x}${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
            \\sqrt{x}&=${c - b}
                           \\end{aligned}$<br>`
        } else {
          texteCorr = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                           $\\begin{aligned}
                           \\sqrt{x}${ecritureAlgebrique(b)}&=${c}\\\\
                           \\sqrt{x}${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                           \\sqrt{x}&=${c - b}
                                          \\end{aligned}$<br>`
        }
        if (c - b < 0) {
          texteCorr += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${k}$. Comme $${k}<0$ alors l'équation n'admet pas de solution. <br>
Ainsi,   $S=\\emptyset$.<br>
`
        }
        if (c - b > 0 || c - b === 0) {
          texteCorr += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${c - b}$. Comme $${c - b}\\geqslant 0$ alors l'équation admet une solution : $${k}^2=${k ** 2}$.<br>
Ainsi $S=\\{${k ** 2}\\}$.
`
        }
        break
      case 4 :
        b = randint(-5, 5, 0)
        c = randint(-5, 5)
        k = calcul(b - c)
        if (this.interactif) {
          texte = `L'ensemble des solutions $S$ de l'équation $${b}-\\sqrt{x}=${c}$ est :
                         `
          if (k > 0) {
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
                ${sp(50)} $-\\sqrt{x}${ecritureAlgebrique(b)}=${c}$`
        }
        if (b > 0) {
          texteCorr = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                $\\begin{aligned}
                ${b}-\\sqrt{x}&=${c}\\\\
                ${b}-\\sqrt{x}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
                -\\sqrt{x}&=${c - b}\\\\
                \\sqrt{x}&=${b - c}
                               \\end{aligned}$<br>`
        } else {
          texteCorr = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                               $\\begin{aligned}
                               ${b}-\\sqrt{x}&=${c}\\\\
                               ${b}-\\sqrt{x}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                               -\\sqrt{x}&=${c - b}\\\\
                               \\sqrt{x}&=${b - c}
                                              \\end{aligned}$<br>`
        }
        if (k < 0) {
          texteCorr += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${k}$. Comme $${k}<0$ alors l'équation n'admet pas de solution. <br>
Ainsi,   $S=\\emptyset$.<br>
`
        }
        if (k > 0 || k === 0) {
          texteCorr += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${b - c}$. Comme $${b - c}\\geqslant0$ alors l'équation admet une solution : $${k}^2=${k ** 2}$.<br>
   Ainsi $S=\\{${k ** 2}\\}$.
  `
        }
        break
      case 5 :
        b = randint(-10, 10, 0)
        c = randint(-10, 10)
        k = c - b
        if (this.interactif) {
          texte = `L'ensemble des solutions $S$ de l'équation $\\dfrac{1}{x}${ecritureAlgebrique(b)}=${c}$ est :
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
              if (k === -1) {
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
          texte = `
                     Résoudre dans $\\mathbb{R}^*$ :<br>
                    ${sp(50)} $\\dfrac{1}{x}${ecritureAlgebrique(b)}=${c}$`
        }

        texteCorr = `On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
            $\\begin{aligned}
            \\dfrac{1}{x}${ecritureAlgebrique(b)}&=${c}\\\\
            \\dfrac{1}{x}${ecritureAlgebrique(b)}+${ecritureParentheseSiNegatif(miseEnEvidence(-b))}&=${c}+${miseEnEvidence(-b)}\\\\
            \\dfrac{1}{x}&=${c - b}
                                        \\end{aligned}$<br>`

        if (k === 0) {
          texteCorr += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation n'admet pas de solution.<br>
Ainsi,   $S=\\emptyset$.
`
        }
        if (k !== 0) {
          texteCorr += `$k=${k}$ et $${k}\\neq 0$, donc l'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation admet une solution :
$${texFractionReduite(1, k)}$.<br>
Ainsi $S=\\left\\{${texFractionReduite(1, k)}\\right\\}$.
`
        }

        break
      case 6 :
        b = randint(-10, 10, 0)
        c = randint(-10, 10)
        k = b - c
        if (this.interactif) {
          texte = `L'ensemble des solutions $S$ de l'équation $${b}-\\dfrac{1}{x}=${c}$ est :
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
              if (k === -1) {
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
          texte = `
                         Résoudre dans $\\mathbb{R}^*$ :<br>
                        ${sp(50)} $${b}-\\dfrac{1}{x}=${c}$`
        }

        texteCorr = `On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                $\\begin{aligned}
                ${b}-\\dfrac{1}{x}&=${c}\\\\
                ${b}-\\dfrac{1}{x}+${ecritureParentheseSiNegatif(miseEnEvidence(-b))}&=${c}+${ecritureParentheseSiNegatif(miseEnEvidence(-b))}\\\\
                \\dfrac{1}{x}&=${b - c}
                                            \\end{aligned}$<br>`

        if (k === 0) {
          texteCorr += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation n'admet pas de solution.<br>
    Ainsi,   $S=\\emptyset$.
    `
        }
        if (k !== 0) {
          texteCorr += `$k=${k}$ et $${k}\\neq 0$, donc l'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation admet une solution :
    $${texFractionReduite(1, k)}$.<br>
    Ainsi $S=\\left\\{${texFractionReduite(1, k)}\\right\\}$.
    `
        }

        break
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
