import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, creerNomDePolygone, miseEnEvidence, choice, sp } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Utiliser la relation de Chasles/réductions vectorielles*'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '30/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '03/01/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function RelationChasles2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.spacing = 3
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let texte, texteCorr, n
    const nom = creerNomDePolygone(7, ['Q'])
    switch (choice([1, 2, 3, 3])) { //, 'b'
      case 1 :
        if (this.interactif) {
          texte = `$\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[2]}${nom[3]}}+\\overrightarrow{${nom[1]}${nom[2]}}=$`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: `$\\overrightarrow{${nom[0]}${nom[3]}}$ `,
                statut: true
              },
              {
                texte: `$\\overrightarrow{${nom[0]}${nom[2]}}$ `,
                statut: false
              },
              {
                texte: `$\\overrightarrow{${nom[1]}${nom[2]}}$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Ecrire à l'aide d'un seul vecteur : <br>
      $\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[2]}${nom[3]}}+\\overrightarrow{${nom[1]}${nom[2]}}=$`
        }
        texteCorr = `On utilise la relation de Chasles :<br>
        $\\begin{aligned}
        \\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[2]}${nom[3]}}+\\overrightarrow{${nom[1]}${nom[2]}}
        &=\\underbrace{\\overrightarrow{${nom[0]}${miseEnEvidence(nom[1])}}+
        \\overrightarrow{${miseEnEvidence(nom[1])}${nom[2]}}}_{\\overrightarrow{${nom[0]}${nom[2]}}}+
        \\overrightarrow{${nom[2]}${nom[3]}}\\\\
        &=\\underbrace{\\overrightarrow{${nom[0]}${miseEnEvidence(nom[2])}}+
        \\overrightarrow{${miseEnEvidence(nom[2])}${nom[3]}}}_{\\overrightarrow{${miseEnEvidence(nom[0])}${nom[3]}}}\\\\
        &=\\overrightarrow{${nom[0]}${nom[3]}}
        \\end{aligned}$
        `

        break
      case 2 :
        n = choice(['a', 'b'])
        if (n === 'a') {
          if (this.interactif) {
            texte = `$\\overrightarrow{${nom[5]}${nom[1]}}+\\overrightarrow{${nom[2]}${nom[3]}}-\\overrightarrow{${nom[2]}${nom[1]}}=$`
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$\\overrightarrow{${nom[5]}${nom[3]}}$ `,
                  statut: true
                },
                {
                  texte: `$\\overrightarrow{${nom[5]}${nom[2]}}$ `,
                  statut: false
                },
                {
                  texte: `$\\overrightarrow{${nom[1]}${nom[2]}}$ `,
                  statut: false
                }
              ]
            }

            texte += propositionsQcm(this, 0).texte
          } else {
            texte = `Ecrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${nom[5]}${nom[1]}}+\\overrightarrow{${nom[2]}${nom[3]}}-\\overrightarrow{${nom[2]}${nom[1]}}=$`
          }

          texteCorr = `On utilise la relation de Chasles :<br>
        $\\begin{aligned}
        \\overrightarrow{${nom[5]}${nom[1]}}+\\overrightarrow{${nom[2]}${nom[3]}}\\underbrace{-\\overrightarrow{${nom[2]}${nom[1]}}}_{+\\overrightarrow{${nom[1]}${nom[2]}}}
        &=  \\overrightarrow{${nom[5]}${nom[1]}}+\\overrightarrow{${nom[2]}${nom[3]}}+\\overrightarrow{${nom[1]}${nom[2]}}\\\\
        &=\\underbrace{\\overrightarrow{${nom[5]}${miseEnEvidence(nom[1])}}+
        \\overrightarrow{${miseEnEvidence(nom[1])}${nom[2]}}}_{\\overrightarrow{${nom[5]}${nom[2]}}}+
        \\overrightarrow{${nom[2]}${nom[3]}}\\\\
        &=\\underbrace{\\overrightarrow{${nom[5]}${miseEnEvidence(nom[2])}}+
        \\overrightarrow{${miseEnEvidence(nom[2])}${nom[3]}}}_{\\overrightarrow{${miseEnEvidence(nom[5])}${nom[3]}}}\\\\
        &=\\overrightarrow{${nom[5]}${nom[3]}}
        \\end{aligned}$
        `
        }
        if (n === 'b') {
          if (this.interactif) {
            texte = `$\\overrightarrow{${nom[0]}${nom[1]}}-\\overrightarrow{${nom[3]}${nom[2]}}+\\overrightarrow{${nom[1]}${nom[2]}}=$`
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$\\overrightarrow{${nom[0]}${nom[3]}}$ `,
                  statut: true
                },
                {
                  texte: `$\\overrightarrow{${nom[0]}${nom[2]}}$ `,
                  statut: false
                },
                {
                  texte: `$\\overrightarrow{${nom[1]}${nom[2]}}$ `,
                  statut: false
                }
              ]
            }

            texte += propositionsQcm(this, 0).texte
          } else {
            texte = `Ecrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${nom[0]}${nom[1]}}-\\overrightarrow{${nom[3]}${nom[2]}}+\\overrightarrow{${nom[1]}${nom[2]}}=$`
          }

          texteCorr = `On utilise la relation de Chasles       :<br>
        $\\begin{aligned}
        \\overrightarrow{${nom[0]}${nom[1]}}\\underbrace{-\\overrightarrow{${nom[3]}${nom[2]}}}_{+\\overrightarrow{${nom[2]}${nom[3]}}}+\\overrightarrow{${nom[1]}${nom[2]}}
        &=  \\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[2]}${nom[3]}}+\\overrightarrow{${nom[1]}${nom[2]}}\\\\
        &=\\underbrace{\\overrightarrow{${nom[0]}${miseEnEvidence(nom[1])}}+
        \\overrightarrow{${miseEnEvidence(nom[1])}${nom[2]}}}_{\\overrightarrow{${nom[0]}${nom[2]}}}+
        \\overrightarrow{${nom[2]}${nom[3]}}\\\\
        &=\\underbrace{\\overrightarrow{${nom[0]}${miseEnEvidence(nom[2])}}+
        \\overrightarrow{${miseEnEvidence(nom[2])}${nom[3]}}}_{\\overrightarrow{${nom[0]}${nom[3]}}}\\\\
        &=\\overrightarrow{${nom[0]}${nom[3]}}
        \\end{aligned}$
        `
        }
        break
      case 3 :
        n = choice(['a', 'b', 'c', 'd'])//, 'b'
        if (n === 'a') {
          if (this.interactif) {
            texte = `$\\overrightarrow{${nom[3]}${nom[4]}}+\\overrightarrow{${nom[5]}${nom[0]}}+\\overrightarrow{${nom[4]}${nom[3]}}=$`
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$\\overrightarrow{${nom[5]}${nom[0]}}$ `,
                  statut: true
                },
                {
                  texte: '$\\overrightarrow{0}$ ',
                  statut: false
                },
                {
                  texte: `$2${sp(1)}\\overrightarrow{${nom[4]}${nom[3]}}$ `,
                  statut: false
                }
              ]
            }

            texte += propositionsQcm(this, 0).texte
          } else {
            texte = `Ecrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${nom[3]}${nom[4]}}+\\overrightarrow{${nom[5]}${nom[0]}}+\\overrightarrow{${nom[4]}${nom[3]}}=$`
          }

          texteCorr = `On utilise la relation de Chasles :<br>
        $\\begin{aligned}
        \\overrightarrow{${nom[3]}${nom[4]}}+\\overrightarrow{${nom[5]}${nom[0]}}+\\overrightarrow{${nom[4]}${nom[3]}}
        &=\\underbrace{\\overrightarrow{${nom[3]}${miseEnEvidence(nom[4])}}+\\overrightarrow{${miseEnEvidence(nom[4])}${nom[3]}}}_{\\overrightarrow{${nom[3]}${nom[3]}}}+\\overrightarrow{${nom[5]}${nom[0]}}\\\\
&= \\overrightarrow{0}+\\overrightarrow{${nom[5]}${nom[0]}}\\\\
&= \\overrightarrow{${nom[5]}${nom[0]}}
        \\end{aligned}$
        `
        }
        if (n === 'b') {
          if (this.interactif) {
            texte = `$\\overrightarrow{${nom[2]}${nom[0]}}+\\overrightarrow{${nom[3]}${nom[2]}}+\\overrightarrow{${nom[0]}${nom[3]}}=$`
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: '$\\overrightarrow{0}$ ',
                  statut: true
                },
                {
                  texte: `$2${sp(1)}\\overrightarrow{${nom[0]}${nom[2]}}$ `,
                  statut: false
                },
                {
                  texte: `$\\overrightarrow{${nom[2]}${nom[3]}}$ `,
                  statut: false
                }
              ]
            }

            texte += propositionsQcm(this, 0).texte
          } else {
            texte = `Ecrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${nom[2]}${nom[0]}}+\\overrightarrow{${nom[3]}${nom[2]}}+\\overrightarrow{${nom[0]}${nom[3]}}=$`
          }

          texteCorr = `On utilise la relation de Chasles       :<br>
        $\\begin{aligned}
        \\overrightarrow{${nom[2]}${nom[0]}}+\\overrightarrow{${nom[3]}${nom[2]}}+\\overrightarrow{${nom[0]}${nom[3]}}
        &=  \\underbrace{\\overrightarrow{${nom[2]}${miseEnEvidence(nom[0])}}+\\overrightarrow{${miseEnEvidence(nom[0])}${nom[3]}}}_{\\overrightarrow{${nom[2]}${nom[3]}}}+\\overrightarrow{${nom[3]}${nom[2]}}\\\\
        &=  \\underbrace{\\overrightarrow{${nom[2]}${miseEnEvidence(nom[3])}}+\\overrightarrow{${miseEnEvidence(nom[3])}${nom[2]}}}_{\\overrightarrow{${nom[2]}${nom[2]}}}\\\\
        &=\\overrightarrow{${nom[2]}${nom[2]}}\\\\
        &=\\overrightarrow{0}
        \\end{aligned}$
        `
        }
        if (n === 'c') {
          if (this.interactif) {
            texte = `$\\overrightarrow{${nom[4]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[4]}}=$`
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$2${sp(1)}\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                  statut: true
                },
                {
                  texte: '$\\overrightarrow{0}$ ',
                  statut: false
                },
                {
                  texte: `$\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                  statut: false
                }
              ]
            }

            texte += propositionsQcm(this, 0).texte
          } else {
            texte = `Ecrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${nom[4]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[4]}}=$`
          }

          texteCorr = `On utilise la relation de Chasles       :<br>
        $\\begin{aligned}
        \\overrightarrow{${nom[4]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[4]}}
        &= \\underbrace{\\overrightarrow{${nom[0]}${miseEnEvidence(nom[4])}}+\\overrightarrow{${miseEnEvidence(nom[4])}${nom[1]}}}_{\\overrightarrow{${nom[0]}${nom[1]}}}+\\overrightarrow{${nom[0]}${nom[1]}}\\\\
        &=  \\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}\\\\
        &=  2\\overrightarrow{${nom[0]}${nom[1]}}
        \\end{aligned}$
        `
        }
        if (n === 'd') {
          if (this.interactif) {
            texte = `$\\overrightarrow{${nom[6]}${nom[1]}}-\\overrightarrow{${nom[6]}${nom[0]}}+\\overrightarrow{${nom[1]}${nom[0]}}=$`
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: '$\\overrightarrow{0}$ ',
                  statut: true
                },
                {
                  texte: `$2${sp(1)}\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                  statut: false
                },
                {
                  texte: `$\\overrightarrow{${nom[1]}${nom[0]}}$ `,
                  statut: false
                }
              ]
            }

            texte += propositionsQcm(this, 0).texte
          } else {
            texte = `Ecrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${nom[6]}${nom[1]}}-\\overrightarrow{${nom[6]}${nom[0]}}+\\overrightarrow{${nom[1]}${nom[0]}}=$`
          }

          texteCorr = `On utilise la relation de Chasles       :<br>
        $\\begin{aligned}
        \\overrightarrow{${nom[6]}${nom[1]}}\\underbrace{-\\overrightarrow{${nom[6]}${nom[0]}}}_{+\\overrightarrow{${nom[0]}${nom[6]}}}+\\overrightarrow{${nom[1]}${nom[0]}}
        &=\\overrightarrow{${nom[6]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[6]}}+\\overrightarrow{${nom[1]}${nom[0]}}\\\\
        &= \\underbrace{\\overrightarrow{${nom[1]}${miseEnEvidence(nom[0])}}+\\overrightarrow{${miseEnEvidence(nom[0])}${nom[6]}}}_{\\overrightarrow{${nom[1]}${nom[6]}}}+\\overrightarrow{${nom[6]}${nom[1]}}\\\\
        &=\\underbrace{\\overrightarrow{${nom[1]}${miseEnEvidence(nom[6])}}+\\overrightarrow{${miseEnEvidence(nom[6])}${nom[1]}}}_{\\overrightarrow{${nom[1]}${nom[1]}}}\\\\
        &=\\overrightarrow{${nom[1]}${nom[1]}}\\\\
        &=\\overrightarrow{0}
        \\end{aligned}$
        `
        }

        break
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
