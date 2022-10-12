import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { randint } from '../../modules/outils/entiers.js'
import { segment } from '../../modules/2d/segment.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { latexParPoint } from '../../modules/2d/textes.js'
import { arrondi } from '../../modules/outils/nombres.js'
import { rotation } from '../../modules/2d/transformations.js'
import { tracePoint } from '../../modules/2d/tracePoint.js'
import { texNombre, texNombrec } from '../../modules/outils/texNombres.js'
import { pointAdistance } from '../../modules/2d/pointSur.js'
import { afficheLongueurSegment } from '../../modules/2d/codages.js'
import { stringNombre } from '../../modules/outils/stringNombre.js'
import { contraindreValeur } from '../../modules/outils/comparateurs.js'
import { cercle } from '../../modules/2d/cercle.js'

export const titre = 'Calculer périmètre et aire de disques'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * 4 cercles sont tracés, 2 dont on connaît le rayon et 2 dont on connaît le diamètre.
 * * 1 : Calculer le périmètre de cercles
 * * 2 : Calculer l'aire de disques
 * * 3 : Calculer le périmètre et l'aire de disques
 *
 * Pas de version LaTeX
 * @author Rémi Angot (AMC par EE)
 * Référence 6M22-1
 */
export const uuid = 'f9a02'
export const ref = '6M22-1'
export default function PerimetreAireDisques (pa = 3) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.sup = pa // 1 : périmètre, 2 : aire, 3 : périmètres et aires
  this.sup2 = true // rayon ou périmètre entier
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 4
  function interactivite (exercice) {
    if (context.isHtml) {
      if (exercice.interactif) return 'I-html'
      else return 'html'
    } else if (context.isAmc) return 'AMC'
    else if (exercice.interactif) return 'I-latex'
    else return 'latex'
  }
  this.nouvelleVersion = function (numeroExercice) {
    this.sup = contraindreValeur(1, 3, this.sup, 3)
    this.listeQuestions = []
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, cpt = 0, r, type, A, C, M, B, S, texte, texteCorr, reponseL1, reponseL2, reponseA1, reponseA2; i < this.nbQuestions && cpt < 50;) {
      if (this.sup2) r = randint(2, 9)
      else r = arrondi(randint(2, 8) + randint(1, 9) / 10, 1)
      A = point(r + 0.5, r + 0.5)
      C = cercle(A, r)
      M = pointAdistance(A, r)
      B = rotation(M, A, 180)
      if (i % 2 === 0) {
        S = segment(A, M)
      } else {
        S = segment(M, B)
      }
      S.pointilles = 2
      texte = mathalea2d({ xmin: 0, ymin: 0, xmax: 2 * r + 1, ymax: 2 * r + 1, pixelsParCm: arrondi(50 / r), scale: arrondi(2.4 / r, 2) }, C, tracePoint(A), S, afficheLongueurSegment(S.extremite1, S.extremite2), latexParPoint('\\mathcal{C}_1', pointAdistance(A, 1.25 * r, 135), 'black', 20, 0, ''))

      if (this.sup === 1) {
        this.consigne = this.nbQuestions > 1 ? 'Calculer le périmètre des cercles suivants.' : 'Calculer le périmètre du cercle suivant.'
      }
      if (this.sup === 2) {
        this.consigne = this.nbQuestions > 1 ? "Calculer l'aire des disques suivants." : "Calculer l'aire du disque suivant."
      }
      if (this.sup === 3) {
        this.consigne = this.nbQuestions > 1 ? "Calculer le périmètre et l'aire des disques suivants." : "Calculer le périmètre et l'aire du disque suivant."
      }
      switch (interactivite(this)) {
        case 'AMC' :
          this.consigne += '<br>Donner la valeur exacte et une valeur approchée au dixième près.'
          break
        default : this.consigne += '<br>Donner la valeur exacte et une valeur approchée au dixième près.'
      }
      if (this.sup === 1) {
      // si on ne demande pas les aires
        if (i % 2 === 0) {
          texteCorr = `$\\mathcal{P}_1=2\\times${texNombre(r)}\\times \\pi=${texNombrec(2 * r)
        }\\pi\\approx${texNombre(
          arrondi(2 * r * Math.PI, 1)
        )}$ cm<br>`
        } else {
          texteCorr = `$\\mathcal{P}_1=${texNombrec(2 * r)}\\times \\pi=${texNombrec(2 * r)
        }\\pi\\approx${texNombre(
          arrondi(2 * r * Math.PI, 1)
        )}$ cm<br>`
        }
        reponseL1 = arrondi(2 * r, 2)
        reponseL2 = arrondi(2 * r * Math.PI, 1)
        reponseA1 = 0
        reponseA2 = 0
      }
      if (this.sup === 2) {
        if (i % 2 === 0) {
          texteCorr = `$\\mathcal{A}_1=${texNombre(r)}\\times ${texNombre(r)}\\times\\pi=${texNombrec(r * r)
        }\\pi\\approx${texNombre(
          arrondi(r * r * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
        } else {
          texteCorr = `$\\mathcal{A}_1=\\dfrac{${texNombrec(2 * r)}}{2}\\times \\dfrac{${texNombrec(2 * r)}}{2}\\times\\pi=${texNombrec(r * r)
          }\\pi\\approx${texNombre(
            arrondi(r * r * Math.PI, 1)
          )}~\\text{cm}^2$<br>`
        }
        reponseA1 = arrondi(r * r, 2)
        reponseA2 = arrondi(r * r * Math.PI, 1)
        reponseL1 = 0
        reponseL2 = 0
      }
      if (this.sup === 3) {
        if (i % 2 === 0) {
          texteCorr = `$\\mathcal{P}_1=2\\times${texNombre(r)}\\times \\pi=${texNombrec(2 * r)
        }\\pi\\approx${texNombre(
          arrondi(2 * r * Math.PI, 1)
        )}$ cm<br>`
          texteCorr += '<br>'
          texteCorr += `$\\mathcal{A}_1=${texNombre(r)}\\times ${texNombre(r)}\\times \\pi=${texNombrec(r * r)
        }\\pi\\approx${texNombre(
          arrondi(r * r * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
        } else {
          texteCorr = `$\\mathcal{P}_1=${texNombrec(2 * r)}\\times \\pi=${texNombrec(2 * r)
          }\\pi\\approx${texNombre(
            arrondi(2 * r * Math.PI, 1)
          )}$ cm<br>`
          texteCorr += '<br>'
          texteCorr += `$\\mathcal{A}_1=\\dfrac{${texNombrec(2 * r)}}{2}\\times \\dfrac{${texNombrec(2 * r)}}{2}\\times\\pi=${texNombrec(r * r)
          }\\pi\\approx${texNombre(
            arrondi(r * r * Math.PI, 1)
          )}~\\text{cm}^2$<br>`
        }
        reponseL1 = arrondi(2 * r, 2)
        reponseL2 = arrondi(2 * r * Math.PI, 1)
        reponseA1 = arrondi(r * r, 2)
        reponseA2 = arrondi(r * r * Math.PI, 1)
      }
      if (this.questionJamaisPosee(i, r, type)) {
        if (this.sup === 1) {
          if (context.isHtml && this.interactif) {
            setReponse(this, 2 * i, stringNombre(reponseL1) + '\\pi', { formatInteractif: 'texte' })
            setReponse(this, 2 * i + 1, reponseL2, { formatInteractif: 'calcul' })
            texte += 'Périmètre : ' + ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texteApres: ' cm' })
            texte += ' $\\approx$' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texteApres: ' cm' })
          } else {
            this.autoCorrection[i] = {
              enonce: 'Calculer le périmètre du cercle suivant :<br>' + texte,
              enonceAvantUneFois: true,
              enonceAGauche: [0.3, 0.7],
              options: { multicols: true },
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'Périmètre en cm (valeur exacte en nombre de $\\pi$)',
                        valeur: [reponseL1],
                        param: {
                          digits: this.sup2 ? 2 : 3,
                          decimals: this.sup2 ? 0 : 1,
                          signe: false,
                          approx: 1,
                          scoreapprox: 0.667
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'Périmètre en cm (valeur arrondie à 0,1 près)',
                        valeur: [reponseL2],
                        param: {
                          digits: this.sup2 ? 3 : 4,
                          signe: false,
                          decimals: 1,
                          approx: 1,
                          scoreapprox: 0.667
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        } else if (this.sup === 2) {
          if (context.isHtml && this.interactif) {
            setReponse(this, 2 * i, stringNombre(reponseA1) + '\\pi', { formatInteractif: 'texte' })
            setReponse(this, 2 * i + 1, reponseA2, { formatInteractif: 'calcul' })
            texte += 'Aire : ' + ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texteApres: ' cm²' })
            texte += ' $\\approx$' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texteApres: ' cm²' })
          } else {
            this.autoCorrection[i] = {
              enonce: "Calculer l'aire du cercle suivant :<br>" + texte,
              enonceAvantUneFois: true,
              enonceAGauche: [0.3, 0.7],
              options: { multicols: true },
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        valeur: [reponseA1],
                        texte: 'Aire en cm² (valeur exacte en nombre de $\\pi$)\\\\',
                        param: {
                          digits: this.sup2 ? 2 : 3,
                          signe: false,
                          decimals: this.sup2 ? 0 : 1,
                          approx: 1,
                          scoreapprox: 0.667
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'Aire en cm² (valeur arrondie à 0,1 près)',
                        valeur: [reponseA2],
                        param: {
                          digits: this.sup2 ? 3 : 4,
                          signe: false,
                          decimals: 1,
                          approx: 1,
                          scoreapprox: 0.667
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        } else {
          if (context.isHtml && this.interactif) {
            setReponse(this, 4 * i, stringNombre(reponseL1) + '\\pi', { formatInteractif: 'texte' })
            setReponse(this, 4 * i + 1, reponseL2, { formatInteractif: 'calcul' })
            setReponse(this, 4 * i + 2, stringNombre(reponseA1) + '\\pi', { formatInteractif: 'texte' })
            setReponse(this, 4 * i + 3, reponseA2, { formatInteractif: 'calcul' })
            texte += 'Périmètre : ' + ajouteChampTexteMathLive(this, 4 * i, 'largeur10 inline')
            texte += ' cm $\\approx $' + ajouteChampTexteMathLive(this, 4 * i + 1, 'largeur10 inline') + ' cm'
            texte += '<br>Aire : ' + ajouteChampTexteMathLive(this, 4 * i + 2, 'largeur10 inline')
            texte += ' cm² $\\approx $' + ajouteChampTexteMathLive(this, 4 * i + 3, 'largeur10 inline') + ' cm²'
          } else {
            this.autoCorrection[i] = {
              enonce: "Calculer le périmètre et l'aire du cercle suivant :<br>" + texte,
              enonceAGauche: [0.3, 0.7],
              options: { multicols: true },
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'Périmètre en cm (valeur exacte en nombre de $\\pi$)',
                        valeur: [reponseL1],
                        param: {
                          digits: this.sup2 ? 2 : 3,
                          decimals: this.sup2 ? 0 : 1,
                          signe: false,
                          approx: 1,
                          scoreapprox: 0.667

                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'Périmètre en cm (valeur arrondie à 0,1 près)',
                        valeur: [reponseL2],
                        param: {
                          digits: this.sup2 ? 3 : 4,
                          decimals: 1,
                          signe: false,
                          approx: 1,
                          scoreapprox: 0.667
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'Aire en cm² (valeur exacte en nombre de $\\pi$)\\\\',
                        valeur: [reponseA1],
                        param: {
                          digits: this.sup2 ? 2 : 3,
                          decimals: this.sup2 ? 0 : 1,
                          signe: false,
                          approx: 1,
                          scoreapprox: 0.667
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',

                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        valeur: [reponseA2],
                        texte: 'Aire en cm² (valeur arrondie au dixième)',
                        param: {
                          digits: this.sup2 ? 3 : 4,
                          decimals: 1,
                          signe: false,
                          approx: 1,
                          scoreapprox: 0.667
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        }

        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Périmètres\n2 : Aires\n3 : Périmètres et aires']
  this.besoinFormulaire2CaseACocher = ['Rayon et diamètre entier', true]
}
