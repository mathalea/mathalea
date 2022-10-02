import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, choice, reduirePolynomeDegre3, reduireAxPlusB } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { droiteParPointEtPente, point, repere, tracePoint, texteParPosition, labelPoint } from '../../modules/2d.js'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMult'
export const titre = 'Vocabulaire et notations des fonctions'
export const dateDePublication = '29/09/2022'
/**
* Répndre à des questions sur les fonctions.
*
* @author Gilles Mora
* 3F10-1
*/

export default function VocabulaireNotationsFonctions2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 5
  this.consigne = ''
  this.spacing = 1.5
  this.nbQuestions = 3
  this.nbQuestionsModifiable = true

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let typesDeQuestionsDisponibles

    const r = repere({
      xMin: -5,
      xMax: 5,
      yMin: -4,
      yMax: 4,
      thickHauteur: 0.1,
      axeXStyle: '->',
      axeYStyle: '->'
    })
    const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
    switch (this.sup) {
      case 1: // vocabulaire1
        typesDeQuestionsDisponibles = ['Traduire une égalité par une phrase']
        break
      case 2: // vocabulaire2
        typesDeQuestionsDisponibles = ['Traduire une phrase par une égalité']
        break
      case 3: // graphique
        typesDeQuestionsDisponibles = ['Interprétation graphique']
        break
      case 4: // avec x
        typesDeQuestionsDisponibles = ['Expression littérale']
        break
      case 5: // mélange
        typesDeQuestionsDisponibles = ['Traduire une égalité par une phrase', 'Traduire une phrase par une égalité', 'Interprétation graphique', 'Expression littérale']
        break
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const nomF = choice(['f', 'g', 'h', 'u', 'v', 'w', 'p', 'm', 't', 'k'])
    const PointC = choice(['A', 'B', 'C', 'D', 'M', 'R', 'S', 'T'])
    for (let i = 0, choix, texte, texteCorr, x, y, A, d, t, fonction1, listeFonction = [], cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 'Traduire une égalité par une phrase':
          x = randint(-9, 9, [0, 1, -1])
          y = randint(-9, 9, x)
          if (this.interactif) { choix = randint(0, 5) } else { choix = randint(0, 3) }
          if (choix === 0) {
            texte = `Traduire l'égalité  $${nomF}(${x})=${y}$ par une phrase contenant le mot « image ».`
            if (this.interactif) { texte += '<br>Une ou plusieurs réponses correctes.' }
            texteCorr = `L'égalité  $${nomF}(${x})=${y}$ se traduit par : <br>
            $\\bullet$ L'image de $${x}$ par la fonction $${nomF}$ est $${y}$.<br>
            $\\bullet$ $${x}$ a pour image $${y}$ par la focntion $${nomF}$.
            `
            this.autoCorrection[i] = { options: { ordered: false, vertical: true } }
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: `L'image de $${x}$ par la fonction $${nomF}$ est $${y}$.`,
                statut: true
              },
              {
                texte: `L'image de $${y}$ par la fonction $${nomF}$ est $${x}$.`,
                statut: false
              },
              {
                texte: ` $${x}$ est l'image $${y}$ par la fonction $${nomF}$.`,
                statut: false
              },
              {
                texte: `$${x}$ a pour image $${y}$ par la focntion $${nomF}$.`,
                statut: true
              }
            ]
          }
          if (choix === 1) {
            texte = `Traduire l'égalité  $${nomF}(${x})=${y}$ par une phrase contenant le mot « image ».`
            if (this.interactif) { texte += '<br>Une ou plusieurs réponses correctes.' }
            if (this.interactif) {
              texteCorr = `L'égalité  $${nomF}(${x})=${y}$ se traduit par : <br>
            Par la fonction $${nomF}$,  $${x}$  a pour image $${y}$.
            `
            } else {
              texteCorr = `L'égalité  $${nomF}(${x})=${y}$ se traduit par : <br>
            $\\bullet$ L'image de $${x}$ par la fonction $${nomF}$ est $${y}$.<br>
            $\\bullet$ $${x}$ a pour image $${y}$ par la focntion $${nomF}$.}
            `
            }
            this.autoCorrection[i] = { options: { ordered: false, vertical: true } }
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: `Par la fonction $${nomF}$,  $${x}$  a pour image $${y}$.`,
                statut: true
              },
              {
                texte: `L'image de $${y}$ par la fonction $${nomF}$ est $${x}$.`,
                statut: false
              },
              {
                texte: `Par la fonction $${nomF}$, $${x}$ est l'image $${y}$.`,
                statut: false
              },
              {
                texte: `$${y}$ a pour image $${x}$ par la focntion $${nomF}$.`,
                statut: false
              }

            ]
          }

          if (choix === 2) {
            texte = `Traduire l'égalité  $${nomF}(${x})=${y}$ par une phrase contenant le mot « antécédent ».`
            if (this.interactif) { texte += '<br>Une ou plusieurs réponses correctes.' }
            texteCorr = `L'égalité  $${nomF}(${x})=${y}$ se traduit par : <br>
            $\\bullet$ Un antécédent de $${y}$ par la fonction $${nomF}$ est $${x}$.<br>
            $\\bullet$ $${x}$ est un antécédent de $${y}$ par la fonction $${nomF}$.
            `
            this.autoCorrection[i] = { options: { ordered: false, vertical: true } }
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: `Un antécédent de $${x}$ par la fonction $${nomF}$ est $${y}$.`,
                statut: false
              },
              {
                texte: `Un antécédent de $${y}$ par la fonction $${nomF}$ est $${x}$.`,
                statut: true
              },
              {
                texte: ` $${x}$ est un antécédent de $${y}$ par la fonction $${nomF}$.`,
                statut: true
              },
              {
                texte: `$${x}$ a pour antécédent $${y}$ par la focntion $${nomF}$.`,
                statut: false
              }
            ]
          }
          if (choix === 3) {
            texte = `Traduire l'égalité  $${nomF}(${x})=${y}$ par une phrase contenant le mot « antécédent ».`
            if (this.interactif) { texte += '<br>Une ou plusieurs réponses correctes.' }
            if (this.interactif) {
              texteCorr = `L'égalité  $${nomF}(${x})=${y}$ se traduit par : <br>
            Par la fonction $${nomF}$,  $${y}$  a pour antécédent $${x}$.
            `
            } else {
              texteCorr = `L'égalité  $${nomF}(${x})=${y}$ se traduit par : <br>
            $\\bullet$ Un antécédent de $${y}$ par la fonction $${nomF}$ est $${x}$.<br>
            $\\bullet$ $${x}$ est un antécédent de $${y}$ par la focntion $${nomF}$.
            `
            }
            this.autoCorrection[i] = { options: { ordered: false, vertical: true } }
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: `Par la fonction $${nomF}$, $${y}$ a pour antécédent $${x}$.`,
                statut: true
              },
              {
                texte: `Un antécédent de $${x}$ par la fonction $${nomF}$ est $${y}$.`,
                statut: false
              },
              {
                texte: `Par la fonction $${nomF}$, $${x}$ a pour antécédent $${y}$.`,
                statut: false
              },
              {
                texte: `$${y}$ est un antécédent de $${x}$ par la fonction $${nomF}$.`,
                statut: false
              }
            ]
          }
          if (choix === 4) {
            texte = `Traduire l'égalité  $${nomF}(${x})=${y}$ par une phrase.`
            texte += '<br>Une ou plusieurs réponses correctes.'
            texteCorr = `L'égalité  $${nomF}(${x})=${y}$ se traduit par : <br>
            $\\bullet$ Un antécédent de $${y}$ par la fonction $${nomF}$ est $${x}$.<br>
            $\\bullet$ L'image de $${x}$ par la fonction $${nomF}$ est $${y}$.<br>
            $\\bullet$ $${y}$ est l'image de $${x}$ par la fonction $${nomF}$.
            `
            this.autoCorrection[i] = { options: { ordered: false, vertical: true } }
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: `Un antécédent de $${y}$ par la fonction $${nomF}$ est $${x}$.`,
                statut: true
              },
              {
                texte: `L'image de $${x}$ par la fonction $${nomF}$ est $${y}$.`,
                statut: true
              },
              {
                texte: ` $${y}$ est l'image de $${x}$ par la fonction $${nomF}$.`,
                statut: true
              },
              {
                texte: `$${x}$ a pour antécédent $${y}$ par la focntion $${nomF}$.`,
                statut: false
              }
            ]
          }
          if (choix === 5) {
            texte = `Traduire l'égalité  $${nomF}(${x})=${y}$ par une phrase.`
            texte += '<br>Une ou plusieurs réponses correctes.'
            texteCorr = `L'égalité  $${nomF}(${x})=${y}$ se traduit par : <br>
            $${x}$ a pour image $${y}$ par la fonction $${nomF}$.
            `
            this.autoCorrection[i] = { options: { ordered: false, vertical: true } }
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: `$${y}$ est un antécédent de $${x}$ par la fonction $${nomF}$.`,
                statut: false
              },
              {
                texte: ` $${x}$ a pour image $${y}$ par la fonction $${nomF}$.`,
                statut: true
              },
              {
                texte: ` $${y}$ a pour image  $${x}$ par la fonction $${nomF}$.`,
                statut: false
              },
              {
                texte: `$${x}$ a pour antécédent $${y}$ par la focntion $${nomF}$.`,
                statut: false
              }
            ]
          }
          break
        case 'Traduire une phrase par une égalité':
          x = randint(-9, 9, [0, 1, -1])
          y = randint(-9, 9, x)
          choix = randint(0, 4)
          if (choix === 0) {
            texte = `L'image de $${x}$ par la fonction $${nomF}$ est $${y}$.<br>
            Traduire cette phrase par une égalité.`
          }
          if (choix === 1) {
            texte = ` $${x}$ est un antécédent de $${y}$ par la fonction $${nomF}$.<br>
            Traduire cette phrase par une égalité.`
          }

          if (choix === 2) {
            texte = ` $${y}$ a pour antécédent  $${x}$ par la fonction $${nomF}$.<br>
            Traduire cette phrase par une égalité.`
          }
          if (choix === 3) {
            texte = ` $${y}$ est l'image de  $${x}$ par la fonction $${nomF}$.<br>
            Traduire cette phrase par une égalité.`
          }
          if (choix === 4) {
            texte = ` Un antécédent de $${y}$ par la fonction $${nomF}$ est  $${x}$ .<br>
            Traduire cette phrase par une égalité.`
          }

          texteCorr = `L'égalité traduisant cette phrase est : $${nomF}(${x})=${y}$
            `
          this.autoCorrection[i] = { options: { ordered: false, horizontal: true } }
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${nomF}(${x})=${y}$`,
              statut: true
            },
            {
              texte: `$${nomF}(${y})=${x}$`,
              statut: false
            }
          ]
          break

        case 'Interprétation graphique':
          x = randint(-4, 4, [0, 1, -1])
          y = randint(-3, 3, x)
          choix = randint(0, 3)
          if (choix === 0) {
            A = point(x, y, `${PointC}`)
            A.positionLabel = 'above'
            d = droiteParPointEtPente(A, randint(-3, 3, 0) / 2, '', 'red')
            d.epaisseur = 3
            A.epaisseur = 3
            t = tracePoint(A, 'blue')
            t.epaisseur = 2

            texte = `La fonction $${nomF}$ est représentée par la droite rouge ci-dessous.<br>
            Le point $${PointC}$ est sur la droite. Donner l'égalité correspondante.<br>`
            texte += mathalea2d({ xmin: -5.1, ymin: -4.1, xmax: 5.1, ymax: 4.1, pixelsParCm: 30, scale: 0.7 }, r, d, o, t, labelPoint(A))
            texteCorr = `L'égalité traduisant que $${PointC}$ est sur la courbe représentant $${nomF}$ est : $${nomF}(${x})=${y}$
            `
            if (this.interactif) {
              this.autoCorrection[i] = { options: { ordered: false, horizontal: true } }
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `$${nomF}(${x})=${y}$`,
                  statut: true
                },
                {
                  texte: `$${nomF}(${y})=${x}$`,
                  statut: false
                }
              ]
            }
          }
          if (choix === 1) {
            texte = `Le point $${PointC}(${x}\\;;\\;${y})$  est un point de la courbe représentant la fonction $${nomF}$.<br>
              Donner l'égalité correspondante.`
            texteCorr = `L'égalité traduisant que $${PointC}$ est sur la courbe représentant $${nomF}$ est : $${nomF}(${x})=${y}$.
              `
            if (this.interactif) {
              this.autoCorrection[i] = { options: { ordered: false, horizontal: true } }
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `$${nomF}(${x})=${y}$`,
                  statut: true
                },
                {
                  texte: `$${nomF}(${y})=${x}$`,
                  statut: false
                }
              ]
            }
          }

          if (choix === 2) {
            texte = ` La courbe représentant la fonction $${nomF}$ passe par le point $${PointC}(${x}\\;;\\;${y})$.<br>
              Donner l'égalité correspondante. `
            texteCorr = `L'égalité traduisant que $${PointC}$ est sur la courbe représentant $${nomF}$ est : $${nomF}(${x})=${y}$
              `
            if (this.interactif) {
              this.autoCorrection[i] = { options: { ordered: false, horizontal: true } }
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `$${nomF}(${x})=${y}$`,
                  statut: true
                },
                {
                  texte: `$${nomF}(${y})=${x}$`,
                  statut: false
                }
              ]
            }
          }
          if (choix === 3) {
            texte = `
           Les coordonnées du point $${PointC}$ de la courbe représentant $${nomF}$ vérifient $${nomF}(${x})=${y}$.<br>
           Quelles sont les coordonnées du point $${PointC}$ ? `
            texteCorr = `L'égalité $${nomF}(${x})=${y}$ permet d'affirmer que le point  $${PointC}(${x}\\;;\\;${y})$ est sur la courbe représentant $${nomF}$.
              `
            if (this.interactif) {
              this.autoCorrection[i] = { options: { ordered: false, horizontal: true } }
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `$${PointC}(${x}\\;;\\;${y})$`,
                  statut: true
                },
                {
                  texte: `$${PointC}(${y};${x})$`,
                  statut: false
                }
              ]
            }
          }

          break

        case 'Expression littérale':
          x = randint(-9, 9, [0, 1, -1])
          y = randint(-9, 9, x)

          listeFonction = [`${x}x`, `${x}x^2`, `${reduireAxPlusB(x, y)}`, `${reduirePolynomeDegre3(0, x, 0, y)}`]
          fonction1 = choice(listeFonction)
          if (!this.interactif) {
            choix = randint(0, 4)
            if (choix === 0) {
              texte = `$x$ a pour image $${fonction1}$ par la fonction $${nomF}$.<br>
              Traduire cette phrase par une égalité.`
            }
            if (choix === 1) {
              texte = ` L'image de $x$ par la fonction $${nomF}$ est $${fonction1}$.<br>
              Traduire cette phrase par une égalité.`
            }

            if (choix === 2) {
              texte = `Par la fonction $${nomF}$, $${fonction1}$ est l'image de $x$.<br>
              Traduire cette phrase par une égalité.`
            }
            if (choix === 3) {
              texte = ` $${fonction1}$ est l'image de  $${x}$ par la fonction $${nomF}$.<br>
              Traduire cette phrase par une égalité.`
            }
            if (choix === 4) {
              texte = ` La fonction $${nomF}$ associe, à tout nombre $x$, le nombre $${fonction1}$.<br>
              Traduire cette phrase par une égalité.`
            }

            texteCorr = `L'égalité traduisant cette phrase est : $${nomF}(x)=${fonction1}$
              `
          } else {
            choix = randint(0, 2)
            if (choix === 0) {
              texte = `$x$ a pour image $${fonction1}$ par la fonction $${nomF}$.<br>
             Alors :`
              texte += '<br>Une ou plusieurs réponses correctes.'
              this.autoCorrection[i] = { options: { ordered: false, vertical: true } }
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `$${nomF}(x)=${fonction1}$`,
                  statut: true
                },
                {
                  texte: `$x$ est l'image de $${fonction1}$ par la fonction $${nomF}$`,
                  statut: false
                },
                {
                  texte: `Par la fonction $${nomF}$,  $${fonction1}$ a pour image $x$. `,
                  statut: false
                }
              ]
              texteCorr = `$x$ a pour image $${fonction1}$ par la fonction $${nomF}$.<br>
              Alors :<br>
              $${nomF}(x)=${fonction1}$
              `
            }

            if (choix === 1) {
              texte = ` L'image de $x$ par la fonction $${nomF}$ est $${fonction1}$.<br>
              Alors :`
              texte += '<br>Une ou plusieurs réponses correctes.'
              this.autoCorrection[i] = { options: { ordered: false, vertical: true } }
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `$${nomF}(${fonction1})=x$`,
                  statut: false
                },
                {
                  texte: `$x$ a pour image $${fonction1}$ par la fonction $${nomF}$`,
                  statut: true
                },
                {
                  texte: `Par la fonction $${nomF}$,  $x$ est l'image de $${fonction1}$. `,
                  statut: false
                }
              ]
              texteCorr = ` L'image de $x$ par la fonction $${nomF}$ est $${fonction1}$.<br>
              Alors :<br>
              $x$ a pour image $${fonction1}$ par la fonction $${nomF}$.
              `
            }

            if (choix === 2) {
              texte = `Par la fonction $${nomF}$, $${fonction1}$ est l'image de $x$.<br>
              Alors :`
              texte += '<br>Une ou plusieurs réponses correctes.'
              this.autoCorrection[i] = { options: { ordered: false, vertical: true } }
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `$${nomF}(x)=${fonction1}$`,
                  statut: true
                },
                {
                  texte: `$x$ a pour image $${fonction1}$ par la fonction $${nomF}$`,
                  statut: true
                },
                {
                  texte: `L'image de $${fonction1}$ par la fonction $${nomF}$ est $x$`,
                  statut: false
                }
              ]
              texteCorr = `Par la fonction $${nomF}$, $${fonction1}$ est l'image de $x$.<br>
              Alors :<br>
              $\\bullet$ $${nomF}(x)=${fonction1}$, <br>
              $\\bullet$ $x$ a pour image $${fonction1}$ par la fonction $${nomF}$.
              `
            }
          }
          break
      }
      if (this.interactif) {
        texte += propositionsQcm(this, i).texte
      }
      if (this.questionJamaisPosee(i, x, y)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Choix des questions',
    5,
    '1 : Traduire une égalité par une phrase\n2 : Traduire une phrase par une égalité\n3 : Interprétation graphique\n4 : Expression littérale\n5 : Mélange'
  ]
}
