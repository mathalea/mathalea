import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre, texFraction } from '../../modules/outils.js'
import { context } from '../../modules/context.js'
import { fraction } from '../../modules/fractions.js'
import { ajouteChampFractionMathLive, ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Donner différentes écritures de nombres décimaux'
export const amcReady = true
export const amcType = 'AMCHybride'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDeModifImportante = '25/09/2022'
// Mickael Guironnet a ajouté un type et le paramétrage

/**
 * Compléter des égalités sur les nombres décimaux
 * * 1) n/100 = ...+.../10 + .../100
 * * 2) n/100 = ...+.../100 + .../10
 * * 3).../100 = u + d/10 + c/100
 * * 4) u = .../10
 * * 5) u = .../100
 * * 6) n/10 = ... + .../10 + .../100
 * * 7) .../100 = u + d/10
 * @author Rémi Angot
 * 6N23-1
 */
export const uuid = '1acf7'
export const ref = '6N23-1'
export default function ExerciceDifferentesEcrituresNombresDecimaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Compléter l'égalité puis donner l'écriture décimale."
  this.spacing = 2
  this.spacingCorr = 2
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = '1-2-3' // Type de question

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestions
    const a = context.isAmc
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7]
    let listeTypeDeQuestions = []
    if (!this.sup) { // Si aucune liste n'est saisie ou mélange demandé
      listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
      if (this.nbQuestions === 3) listeTypeDeQuestions = combinaisonListes([choice([1, 2, 6]), 3, choice([4, 5])], this.nbQuestions)
    } else {
      const quests = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < quests.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
        const choixtp = parseInt(quests[i])
        if (choixtp >= 1 && choixtp <= 7) {
          listeTypeDeQuestions.push(choixtp)
        }
      }
      if (listeTypeDeQuestions.length === 0) { listeTypeDeQuestions = typesDeQuestionsDisponibles }
      listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    }

    for (
      let i = 0, indexQ = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50; cpt++) {
      typesDeQuestions = listeTypeDeQuestions[i]
      const u = (typesDeQuestions >= 4 && typesDeQuestions <= 5) ? randint(2, 19) : randint(2, 9) // chiffre des unités
      const d = (typesDeQuestions >= 4 && typesDeQuestions <= 5) ? 0 : randint(1, 9) // chiffre des dixièmes
      const c = ((typesDeQuestions >= 4 && typesDeQuestions <= 5) || typesDeQuestions === 7) ? 0 : randint(1, 9) // chiffre des centièmes
      const n = 100 * u + 10 * d + c
      if (!this.questionJamaisPosee(i, u, d, c)) {
        // Si la question a été posée, on passe
        // et pas la fin de la boucle à cause de indexQ++
        continue
      }
      let ecritureDecimale
      switch (typesDeQuestions) {
        case 1: // n/100 = .... + .../10 + .../100=...
          ecritureDecimale = texNombre(calcul(u + d / 10 + c / 100))
          texteCorr = `$${texFraction(n, '100')}=${u}+${texFraction(
            d,
            '10'
          )}+${texFraction(c, '100')}=${ecritureDecimale}$`
          if (this.interactif && !context.isAmc) {
            texte = `$${texFraction(n, '100')}=$` + ajouteChampTexteMathLive(this, indexQ, 'largeur10 inline nospacebefore')
            setReponse(this, indexQ, u, { formatInteractif: 'calcul' })
            indexQ++
            texte += '$+$' + ajouteChampFractionMathLive(this, indexQ, false, 10)
            setReponse(this, indexQ, fraction(d, 10), { formatInteractif: 'Num' })
            indexQ++
            texte += '$+$' + ajouteChampFractionMathLive(this, indexQ, false, 100)
            setReponse(this, indexQ, fraction(c, 100), { formatInteractif: 'Num' })
            indexQ++
            texte += '$=$' + ajouteChampTexteMathLive(this, indexQ, 'largeur10 inline nospacebefore')
            setReponse(this, indexQ, calcul(u + d / 10 + c / 100), { formatInteractif: 'calcul' })
            indexQ++
          } else {
            texte = `$${texFraction(n, '100')}=${a ? 'a' : '\\ldots\\ldots'}+${texFraction(
              a ? 'b' : '\\ldots\\ldots',
              10
            )}+${texFraction(a ? 'c' : '\\ldots\\ldots', 100)}=${a ? 'd' : '\\ldots\\ldots'}$`
            texteCorr = `$${texFraction(n, '100')}=${u}+${texFraction(
              d,
              '10'
            )}+${texFraction(c, '100')}=${ecritureDecimale}$`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { multicols: true },
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: u,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'b',
                        valeur: d,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'c',
                        valeur: c,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'd',
                        valeur: calcul(u + d / 10 + c / 100),
                        param: {
                          signe: false,
                          digits: 5,
                          decimals: 3
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
          break
        case 2: // n/100 = ... + .../100 + .../10
          ecritureDecimale = texNombre(calcul(u + d / 10 + c / 100))
          texteCorr = `$${texFraction(n, '100')}=${u}+${texFraction(
            c,
            100
          )}+${texFraction(d, 10)}=${ecritureDecimale}$`
          if (this.interactif && !context.isAmc) {
            texte = `$${texFraction(n, '100')}=$`
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur10 inline nospacebefore')
            setReponse(this, indexQ, u, { formatInteractif: 'calcul' })
            indexQ++
            texte += '$+$' + ajouteChampFractionMathLive(this, indexQ, false, 100)
            setReponse(this, indexQ, fraction(c, 100), { formatInteractif: 'Num' })
            indexQ++
            texte += '$+$' + ajouteChampFractionMathLive(this, indexQ, false, 10)
            setReponse(this, indexQ, fraction(d, 10), { formatInteractif: 'Num' })
            indexQ++
            texte += '$=$' + ajouteChampTexteMathLive(this, indexQ, 'largeur10 inline nospacebefore')
            setReponse(this, indexQ, calcul(u + d / 10 + c / 100), { formatInteractif: 'calcul' })
            indexQ++
          } else {
            texte = `$${texFraction(n, '100')}=${a ? 'a' : '\\ldots\\ldots'}+${texFraction(
              a ? 'b' : '\\ldots\\ldots',
              100
            )}+${texFraction(a ? 'c' : '\\ldots\\ldots', 10)}=${a ? 'd' : '\\ldots\\ldots'}$`
            this.autoCorrection[i] = {
              options: { multicols: true },
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: u,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'b',
                        valeur: c,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'c',
                        valeur: d,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'd',
                        valeur: calcul(u + d / 10 + c / 100),
                        param: {
                          signe: false,
                          digits: 5,
                          decimals: 3
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }

          break
        case 3: // .../... = u + d/10 + c/100=...
          ecritureDecimale = texNombre(calcul(u + d / 10 + c / 100))
          texteCorr = `$${texFraction(n, '100')}=${u}+${texFraction(
            d,
            '10'
          )}+${texFraction(c, '100')}=${ecritureDecimale}$`
          if (this.interactif && !context.isAmc) {
            texte = ajouteChampFractionMathLive(this, indexQ, false, false)
            setReponse(this, indexQ, u * 100 + d * 10 + c, { formatInteractif: 'calcul' })
            setReponse(this, indexQ + 1, 100, { formatInteractif: 'calcul' })
            indexQ += 2
            texte += `$=${u}+${texFraction(d, '10')}+${texFraction(c, '100')}=$`
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur10 inline nospacebefore')
            setReponse(this, indexQ, calcul(u + d / 10 + c / 100), { formatInteractif: 'calcul' })
            indexQ++
          } else {
            texte = `$${texFraction(a ? 'a' : '\\ldots\\ldots', '100')}=${u}+${texFraction(
            d,
            '10'
          )}+${texFraction(c, '100')}=${a ? 'b' : '\\ldots\\ldots'}$`
            this.autoCorrection[i] = {
              options: { multicols: true },
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: n,
                        param: {
                          signe: false,
                          digits: 4,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'b',
                        valeur: calcul(u + d / 10 + c / 100),
                        param: {
                          signe: false,
                          digits: 5,
                          decimals: 3
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
          break
        case 4: // u = .../10
          texteCorr = `$${u}=${texFraction(10 * u, '10')}$`
          if (this.interactif && !context.isAmc) {
            texte = `$${u}=$`
            texte += ajouteChampFractionMathLive(this, indexQ, false, 10)
            setReponse(this, indexQ, fraction(10 * u, 10), { formatInteractif: 'Num' })
            indexQ++
          } else {
            texte = `$${u}=${texFraction(a ? 'a' : '\\ldots\\ldots', '10')}$`
            this.autoCorrection[i] = {
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: calcul(10 * u),
                        param: {
                          signe: false,
                          digits: 3,
                          decimals: 0
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }

          break
        case 5: // u = .../100
          texteCorr = `$${u}=${texFraction(100 * u, '100')}$`
          if (this.interactif && !context.isAmc) {
            texte = `$${u}=$`
            texte += ajouteChampFractionMathLive(this, indexQ, false, 100)
            setReponse(this, indexQ, fraction(100 * u, 100), { formatInteractif: 'Num' })
            indexQ++
          } else {
            texte = `$${u}=${texFraction(a ? 'a' : '\\ldots\\ldots', '100')}$`
            this.autoCorrection[i] = {
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: calcul(100 * u),
                        param: {
                          signe: false,
                          digits: 3,
                          decimals: 0
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
          break
        case 6: // n/10 = ... + .../10 + .../100 = ...
          ecritureDecimale = texNombre(calcul(n / 10))
          texteCorr = `$${texFraction(n, 10)}=${u * 10 + d}+${texFraction(c, 10)}+${texFraction(0, 100)}=${ecritureDecimale}$`
          if (this.interactif && !context.isAmc) {
            texte = `$${texFraction(n, 10)}=$`
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur10 inline nospacebefore')
            setReponse(this, indexQ, u * 10 + d, { formatInteractif: 'calcul' })
            indexQ++
            texte += '$+$' + ajouteChampFractionMathLive(this, indexQ, false, 10)
            setReponse(this, indexQ, fraction(c, 10), { formatInteractif: 'Num' })
            indexQ++
            texte += '$+$' + ajouteChampFractionMathLive(this, indexQ, false, 100)
            setReponse(this, indexQ, fraction(0, 100), { formatInteractif: 'Num' })
            indexQ++
            texte += '$=$' + ajouteChampTexteMathLive(this, indexQ, 'largeur10 inline nospacebefore')
            setReponse(this, indexQ, calcul(n / 10), { formatInteractif: 'calcul' })
            indexQ++
          } else {
            texte = `$${texFraction(n, 10)}=${a ? 'a' : '\\ldots\\ldots'}+${texFraction(a ? 'b' : '\\ldots\\ldots', 10)}+${texFraction(a ? 'c' : '\\ldots\\ldots', 100)}=${a ? 'd' : '\\ldots\\ldots'}$`
            this.autoCorrection[i] = {
              options: { multicols: true },
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: calcul(u * 10 + d),
                        param: {
                          signe: false,
                          digits: 3,
                          decimals: 0
                        }
                      }
                    }
                  ]

                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'b',
                        valeur: c,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'c',
                        valeur: 0,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'd',
                        valeur: calcul(n / 10),
                        param: {
                          signe: false,
                          digits: 5,
                          decimals: 3
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
          break
        case 7: // .../100 = u + d/10 =...
          ecritureDecimale = texNombre(calcul(u + d / 10))
          texteCorr = `$${texFraction(n, '100')}=${u}+${texFraction(d, '10')}=${ecritureDecimale}$`
          if (this.interactif && !context.isAmc) {
            texte = ajouteChampFractionMathLive(this, indexQ, false, 100)
            setReponse(this, indexQ, u * 100 + d * 10 + c, { formatInteractif: 'calcul' })
            indexQ++
            texte += `$=${u}+${texFraction(d, '10')}=$`
            texte += ajouteChampTexteMathLive(this, indexQ, 'largeur10 inline nospacebefore')
            setReponse(this, indexQ, calcul(u + d / 10 + c / 100), { formatInteractif: 'calcul' })
            indexQ++
          } else {
            texte = `$${texFraction(a ? 'a' : '\\ldots\\ldots', '100')}=${u}+${texFraction(d, '10')}=${a ? 'b' : '\\ldots\\ldots'}$`
            this.autoCorrection[i] = {
              options: { multicols: true },
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: n,
                        param: {
                          signe: false,
                          digits: 4,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'b',
                        valeur: calcul(u + d / 10 + c / 100),
                        param: {
                          signe: false,
                          digits: 5,
                          decimals: 3
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
          break
      }

      // if (this.questionJamaisPosee(i, u, d, c)) {
      // Si la question n'a jamais été posée, on en crée une autre
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      i++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Type de question', [
      'Choix séparés par des tirets',
      '0 : mélange',
      '1 : n/100 = ...+.../10 + .../100',
      '2 : n/100 = ...+.../100 + .../10',
      '3 : .../100 = u + d/10 + c/100',
      '4 : u = .../10',
      '5 : u = .../100',
      '6 : n/10 = ... + .../10 + .../100',
      '7 :  .../100 = u + d/10'
    ].join('\n')
  ]
}
