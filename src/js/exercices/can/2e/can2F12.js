import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, miseEnEvidence, randint, calcul, choice, texNombre } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Utiliser une fonction de référence (inverse, cube, racine) pour comparer deux images'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '03/01/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
function ecritureParentheseSiNegatif (a, maximumFractionDigits = 15) {
  const result = Intl.NumberFormat('fr-FR', { maximumFractionDigits: maximumFractionDigits }).format(a).replace(',', '{,}')
  return a < 0 ? `(${result})` : result
}
export default function ComparerAvecFctRef () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.spacing = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let texte, texteCorr, a, b, N
    switch (choice([1, 2, 3])) { //
      case 1 :
        N = randint(1, 2)
        if (N === 1) {
          a = calcul(randint(1, 9) + randint(5, 9) / 10)
          b = calcul(a + (randint(1, 9) / 10) * choice([1, -1]))
          if (this.interactif) {
            texte = 'Sélectionner l’affirmation correcte. '
            if (a < b) {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$\\dfrac{1}{${texNombre(a)}}>\\dfrac{1}{${texNombre(b)}}$`,
                    statut: true
                  },
                  {
                    texte: `$\\dfrac{1}{${texNombre(a)}}<\\dfrac{1}{${texNombre(b)}}$`,
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
                    texte: `$\\dfrac{1}{${texNombre(a)}}<\\dfrac{1}{${texNombre(b)}}$`,
                    statut: true
                  },
                  {
                    texte: `$\\dfrac{1}{${texNombre(a)}}>\\dfrac{1}{${texNombre(b)}}$`,
                    statut: false
                  }
                ]
              }
            }

            texte += propositionsQcm(this, 0).texte
          } else {
            texte = `Comparer $\\dfrac{1}{${texNombre(a)}}$ et $\\dfrac{1}{${texNombre(b)}}$.`
          }

          texteCorr = `         La fonction inverse étant strictement décroissante sur $]0;+\\infty[$, elle change l'ordre. 
        Cela signifie que deux nombres strictement positifs  sont rangés dans l'ordre inverse de leurs inverses.<br>
        Autrement dit, si $a$ et $b$ sont deux nombres strictement positifs et si $a < b$, alors $\\dfrac{1}{a} > \\dfrac{1}{b}$.<br>`

          if (a < b) {
            texteCorr += `Comme $${texNombre(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(b)}$, alors  $\\dfrac{1}{${texNombre(a)}}${miseEnEvidence('\\boldsymbol{>}', 'blue')}\\dfrac{1}{${texNombre(b)}}$`
          } else {
            texteCorr += `Comme $${texNombre(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(a)}$, alors  $\\dfrac{1}{${texNombre(b)}}${miseEnEvidence('\\boldsymbol{>}', 'blue')}\\dfrac{1}{${texNombre(a)}}$`
          }
        }
        if (N === 2) {
          a = calcul(((randint(1, 9) + randint(5, 9) / 10)) * (-1))
          b = calcul(a + (randint(1, 9) / 10) * choice([1, -1]))
          if (this.interactif) {
            texte = 'Sélectionner l’affirmation correcte. '
            if (a < b) {
              this.autoCorrection[0] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `$\\dfrac{1}{${texNombre(a)}}>\\dfrac{1}{${texNombre(b)}}$`,
                    statut: true
                  },
                  {
                    texte: `$\\dfrac{1}{${texNombre(a)}}<\\dfrac{1}{${texNombre(b)}}$`,
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
                    texte: `$\\dfrac{1}{${texNombre(a)}}<\\dfrac{1}{${texNombre(b)}}$`,
                    statut: true
                  },
                  {
                    texte: `$\\dfrac{1}{${texNombre(a)}}>\\dfrac{1}{${texNombre(b)}}$`,
                    statut: false
                  }
                ]
              }
            }

            texte += propositionsQcm(this, 0).texte
          } else {
            texte = `Comparer $\\dfrac{1}{${texNombre(a)}}$ et $\\dfrac{1}{${texNombre(b)}}$.`
          }

          texteCorr = `     La fonction inverse étant strictement décroissante sur $]-\\infty;0[$, elle change l'ordre. 
    Cela signifie que deux nombres strictement négatifs  sont rangés dans l'ordre inverse de leurs inverses.<br>
    Autrement dit, si $a$ et $b$ sont deux nombres strictement négatifs et si $a < b$, alors $\\dfrac{1}{a} > \\dfrac{1}{b}$.<br>`

          if (a < b) {
            texteCorr += `Comme $${texNombre(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(b)}$, alors  $\\dfrac{1}{${texNombre(a)}}${miseEnEvidence('\\boldsymbol{>}', 'blue')}\\dfrac{1}{${texNombre(b)}}$`
          } else {
            texteCorr += `Comme $${texNombre(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(a)}$, alors  $\\dfrac{1}{${texNombre(b)}}${miseEnEvidence('\\boldsymbol{>}', 'blue')}\\dfrac{1}{${texNombre(a)}}$`
          }
        }

        break
      case 2 :
        a = calcul(randint(-10, 10) + (randint(-9, 9, 0) / 10) * choice([-1, 1]))
        b = calcul((a + randint(1, 9) / 10) * choice([-1, 1]))
        if (this.interactif) {
          texte = 'Sélectionner l’affirmation correcte. '
          if (a < b) {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$${ecritureParentheseSiNegatif(b)}^3>${ecritureParentheseSiNegatif(a)}^3$`,
                  statut: true
                },
                {
                  texte: `$${ecritureParentheseSiNegatif(a)}^3>${ecritureParentheseSiNegatif(b)}^3$`,
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
                  texte: `$${ecritureParentheseSiNegatif(b)}^3<${ecritureParentheseSiNegatif(a)}^3$`,
                  statut: true
                },
                {
                  texte: `$(${ecritureParentheseSiNegatif(a)})^3<${ecritureParentheseSiNegatif(b)}^3$`,
                  statut: false
                }
              ]
            }
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Comparer $${ecritureParentheseSiNegatif(a)}^3$ et $${ecritureParentheseSiNegatif(b)}^3$.`
        }

        texteCorr = ` La fonction cube étant strictement croissante sur $\\mathbb{R}$, elle conserve l'ordre.
            Cela signifie que deux nombres réels  sont rangés dans le même ordre que leurs cubes.<br>
            Autrement dit, si $a$ et $b$ sont deux nombres réels et si $a < b$, alors $a^3 < b^3$.<br>`
        if (a < b) {
          texteCorr += `Comme $${texNombre(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(b)}$,
            alors $${ecritureParentheseSiNegatif(a)}^3${miseEnEvidence('\\boldsymbol{<}', 'blue')}${ecritureParentheseSiNegatif(b)}^3$.`
        } else { texteCorr += `Comme $${texNombre(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(a)}$, alors $${ecritureParentheseSiNegatif(b)}^3${miseEnEvidence('\\boldsymbol{<}', 'blue')}${ecritureParentheseSiNegatif(a)}^3$.` }

        break
      case 3 :
        a = calcul(randint(0, 10) + (randint(6, 9) / 10))
        b = calcul((a + (randint(1, 5, 0) / 10) * choice([-1, 1])))
        if (b === 1) { b = 2 }
        if (this.interactif) {
          texte = 'Sélectionner l’affirmation correcte. '
          if (a < b) {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$\\sqrt{${texNombre(b)}}>\\sqrt{${texNombre(a)}}$`,
                  statut: true
                },
                {
                  texte: `$\\sqrt{${texNombre(a)}}>\\sqrt{${texNombre(b)}}$`,
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
                  texte: `$\\sqrt{${texNombre(b)}}<\\sqrt{${texNombre(a)}}$`,
                  statut: true
                },
                {
                  texte: `$\\sqrt{${texNombre(b)}}>\\sqrt{${texNombre(a)}}$`,
                  statut: false
                }
              ]
            }
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Comparer $\\sqrt{${texNombre(a)}}$  et $\\sqrt{${texNombre(b)}}$.`
        }

        texteCorr = `                La fonction racine carrée étant strictement croissante sur $[0;+\\infty[$, elle conserve l'ordre. 
                Cela signifie que deux nombres réels positifs sont rangés dans le même ordre que leurs racines carrées.<br>
                Autrement dit, si $a$ et $b$ sont deux nombres réels positifs et si $a < b$, alors $\\sqrt{a} < \\sqrt{b}$.<br>`
        if (a < b) {
          texteCorr += ` Comme $${texNombre(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(b)}$, alors 
                $\\sqrt{${texNombre(a)}}${miseEnEvidence('\\boldsymbol{<}', 'blue')}\\sqrt{${texNombre(b)}}$.`
        } else {
          texteCorr += ` Comme $${texNombre(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(a)}$, 
                alors $\\sqrt{${texNombre(b)}}${miseEnEvidence('\\boldsymbol{<}', 'blue')}\\sqrt{${texNombre(a)}}$.`
        }

        break
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
