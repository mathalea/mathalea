import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, creerNomDePolygone, miseEnEvidence, choice, sp } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Utiliser la relation de Chasles/réductions vectorielles'
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
export const uuid = '26f3b'
export const ref = 'can2G10'
export default function RelationChasles1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.spacing = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let texte, texteCorr
    const nom = creerNomDePolygone(6, ['QD'])
    switch (choice([1, 2, 3, 4, 5, 6])) {
      case 1 :
        if (this.interactif) {
          texte = `$\\overrightarrow{${nom[5]}${nom[0]}}+\\overrightarrow{${nom[2]}${nom[5]}}=$`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: `$\\overrightarrow{${nom[2]}${nom[0]}}$ `,
                statut: true
              },
              {
                texte: '$\\overrightarrow{0}$ ',
                statut: false
              },
              {
                texte: `$\\overrightarrow{${nom[0]}${nom[5]}}$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Ecrire à l'aide d'un seul vecteur : <br>
        $\\overrightarrow{${nom[5]}${nom[0]}}+\\overrightarrow{${nom[2]}${nom[5]}}=$`
        }

        texteCorr = `On utilise la relation de Chasles :<br>
        $\\begin{aligned}
        \\overrightarrow{${nom[5]}${nom[0]}}+\\overrightarrow{${nom[2]}${nom[5]}}
        &=\\underbrace{\\overrightarrow{${nom[2]}${miseEnEvidence(nom[5])}}+\\overrightarrow{${miseEnEvidence(nom[5])}${nom[0]}}}_{\\overrightarrow{${nom[2]}${nom[0]}}}\\\\
        &=\\overrightarrow{${nom[2]}${nom[0]}}
        \\end{aligned}$
        `

        break
      case 2 :
        if (this.interactif) {
          texte = `$\\overrightarrow{${nom[0]}${nom[1]}}-\\overrightarrow{${nom[1]}${nom[0]}}=$`
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
                texte: `$2${sp(1)}\\overrightarrow{${nom[1]}${nom[0]}}$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Ecrire à l'aide d'un seul vecteur : <br>
        $\\overrightarrow{${nom[0]}${nom[1]}}-\\overrightarrow{${nom[1]}${nom[0]}}=$`
        }

        texteCorr = `
            $\\begin{aligned}
            \\overrightarrow{${nom[0]}${nom[1]}}\\underbrace{-\\overrightarrow{${nom[1]}${nom[0]}}}_{+\\overrightarrow{${nom[0]}${nom[1]}}}
            &=\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}\\\\
            &=2${sp(1)}\\overrightarrow{${nom[0]}${nom[1]}}
            \\end{aligned}$
            `

        break
      case 3 :
        if (this.interactif) {
          texte = `$-\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[1]}${nom[0]}}=$`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[1]}${nom[0]}}$ `,
                statut: true
              },
              {
                texte: '$\\overrightarrow{0}$ ',
                statut: false
              },
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Ecrire à l'aide d'un seul vecteur : <br>
        $-\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[1]}${nom[0]}}=$`
        }

        texteCorr = `
            $\\begin{aligned}
            \\underbrace{-\\overrightarrow{${nom[0]}${nom[1]}}}_{+\\overrightarrow{${nom[1]}${nom[0]}}}+\\overrightarrow{${nom[1]}${nom[0]}}
            &=\\overrightarrow{${nom[1]}${nom[0]}}+\\overrightarrow{${nom[1]}${nom[0]}}\\\\
            &=2${sp(1)}\\overrightarrow{${nom[1]}${nom[0]}}
            \\end{aligned}$
            `

        break
      case 4 :
        if (this.interactif) {
          texte = `$-\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}=$`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: '$\\overrightarrow{0}$ ',
                statut: true
              },
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[1]}${nom[0]}}$ `,
                statut: false
              },
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Ecrire à l'aide d'un seul vecteur : <br>
        $-\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}=$`
        }

        texteCorr = `
                $\\begin{aligned}
                \\underbrace{-\\overrightarrow{${nom[0]}${nom[1]}}}_{+\\overrightarrow{${nom[1]}${nom[0]}}}+\\overrightarrow{${nom[0]}${nom[1]}}
                &=\\underbrace{\\overrightarrow{${nom[1]}${miseEnEvidence(nom[0])}}+\\overrightarrow{${miseEnEvidence(nom[0])}${nom[1]}}}_{\\overrightarrow{${nom[1]}${nom[1]}}}\\\\
                &=\\overrightarrow{0}
                \\end{aligned}$
                `

        break

      case 5 :
        if (this.interactif) {
          texte = `$\\overrightarrow{${nom[4]}${nom[1]}}-\\overrightarrow{${nom[4]}${nom[2]}}=$`
          this.autoCorrection[0] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: `$\\overrightarrow{${nom[2]}${nom[1]}}$ `,
                statut: true
              },
              {
                texte: '$\\overrightarrow{0}$ ',
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
        $\\overrightarrow{${nom[4]}${nom[1]}}-\\overrightarrow{${nom[4]}${nom[2]}}=$`
        }

        texteCorr = `On utilise la relation de Chasles :<br>
            $\\begin{aligned}
            \\overrightarrow{${nom[4]}${nom[1]}}\\underbrace{-\\overrightarrow{${nom[4]}${nom[2]}}}_{+\\overrightarrow{${nom[2]}${nom[4]}}}
            &=\\underbrace{\\overrightarrow{${nom[2]}${miseEnEvidence(nom[4])}}+\\overrightarrow{${miseEnEvidence(nom[4])}${nom[1]}}}_{\\overrightarrow{${nom[2]}${nom[1]}}}\\\\
            &=\\overrightarrow{${nom[2]}${nom[1]}}
            \\end{aligned}$
            `

        break
      case 6 :
        if (this.interactif) {
          texte = `$\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[1]}${nom[0]}}=$`
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
                texte: `$\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                statut: false
              }
            ]
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Ecrire à l'aide d'un seul vecteur : <br>
        $\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[1]}${nom[0]}}=$`
        }

        texteCorr = `
                $\\begin{aligned}
                \\underbrace{\\overrightarrow{${nom[0]}${miseEnEvidence(nom[1])}}+\\overrightarrow{${miseEnEvidence(nom[1])}${nom[0]}}}_{\\overrightarrow{${nom[0]}${nom[0]}}}
                                &=\\overrightarrow{${nom[0]}${nom[0]}}\\\\
                                &=\\overrightarrow{0}
                \\end{aligned}$
                `

        break
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
