import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, combinaisonListes, miseEnEvidence, texFraction } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'
export const titre = 'Égalités entre fractions simples'
export const amcReady = true
export const amcType =1 // QCM 
export const interactifReady = true
export const interactifType = ''

/**
 * Écrire une fraction avec un nouveau dénominateur qui est un multiple de son dénominateur (ce multiple est inférieur à une valeur maximale de 11 par défaut)
 * @author Rémi Angot
 * @author Jean-claude Lhote (Mode QCM et alternance numérateur / dénominateur)
 * 5N13-2 et 6N41
 */
export default function EgalitesEntreFractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 11 // Correspond au facteur commun
  this.sup2 = 2 // alternace numérateur ou dénominateur imposé.
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.consigne = 'Compléter les égalités.'
  this.spacing = 2
  this.spacingCorr = 2


  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const listeFractions = [
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [3, 4],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [1, 6],
      [5, 6],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [1, 8],
      [3, 8],
      [5, 8],
      [7, 8],
      [1, 9],
      [2, 9],
      [4, 9],
      [5, 9],
      [7, 9],
      [8, 9],
      [1, 10],
      [3, 10],
      [7, 10],
      [9, 10]
    ] // Couples de nombres premiers entre eux
    const listeTypeDeQuestions = combinaisonListes(
      [1, 1, 1, 1, 2],
      this.nbQuestions
    )
    for (
      let i = 0, fraction, a, b, c, d, k, choix, texte, texteCorr;
      i < this.nbQuestions;
      i++
    ) {
      if (listeTypeDeQuestions[i] === 1) {
        // égalité entre 2 fractions
        fraction = choice(listeFractions) //
        a = fraction[0]
        b = fraction[1]
        if (this.modeQcm) {
          k = randint(3, Math.max(this.sup, 4))
        } else {
          k = randint(2, Math.max(3, this.sup))
        }
        c = k * a
        d = k * b
        enleveElement(listeFractions, fraction) // Il n'y aura pas 2 fois la même fraction de départ
        if (this.sup2 === 3) {
          choix = i % 2
        } else {
          choix = this.sup2 % 2
        }
        switch (choix) {
          case 0 :
            texte = `$${texFraction(a, b)} = ${texFraction('\\phantom{00000000000000}', '\\phantom{00000000000000}')} = ${texFraction('\\phantom{0000}', d)}$`
            texteCorr = `$${texFraction(a, b)} = ${texFraction(a + miseEnEvidence('\\times' + k), b + miseEnEvidence('\\times' + k))} = ${texFraction(c, d)}$`
            this.autoCorrection[i] = {}
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: `$${texFraction(c, d)}$`,
                statut: true
              },
              {
                texte: `$${texFraction(a, d)}$`,
                statut: false
              },
              {
                texte: `$${texFraction((k - 1) * a, d)}$`,
                statut: false
              },
              {
                texte: `$${texFraction((k + 1) * a, d)}$`,
                statut: false
              },
              {
                texte: `$${texFraction(Math.abs(d - a), d)}$`,
                statut: false
              }
            ]
            break
          case 1 :
            texte = `$${texFraction(a, b)} = ${texFraction('\\phantom{00000000000000}', '\\phantom{00000000000000}')} = ${texFraction(c, '\\phantom{0000}')}$`
            texteCorr = `$${texFraction(a, b)} = ${texFraction(a + miseEnEvidence('\\times' + k), b + miseEnEvidence('\\times' + k))} = ${texFraction(c, d)}$`
            this.autoCorrection[i] = {}
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: `$${texFraction(c, d)}$`,
                statut: true
              },
              {
                texte: `$${texFraction(c, b)}$`,
                statut: false
              },
              {
                texte: `$\\dfrac{${c}}{${(k - 1) * b}}$`,
                statut: false
              },
              {
                texte: `$${texFraction(c, (k + 1) * b)}$`,
                statut: false
              },
              {
                texte: `$\\dfrac{${c}}{${Math.abs(c - b)}}$`,
                statut: false
              }
            ]

            break
        }
      } else {
        // écrire un entier sous la forme d'une fraction
        a = randint(1, 9)
        if (this.interactif && !context.isAmc) {
          d = randint(3, 9, [a, 2 * a])
        } else {
          d = randint(2, 9)
        }
        c = a * d
        if (this.sup2 === 3) {
          choix = i % 2
        } else {
          choix = this.sup2 % 2
        }
        switch (choix) {
          case 0 :
            texte = `$${a} = ${texFraction('\\phantom{00000000000000}', '\\phantom{00000000000000}')} = ${texFraction('\\phantom{0000}', d)}$`
            if (this.interactif) {
              texte = `$${a} = \\ldots$`
            }
            texteCorr = `$${a} = \\dfrac{${a}}{1} =${texFraction(a + miseEnEvidence('\\times' + d), '1' + miseEnEvidence('\\times' + d))} = ${texFraction(c, d)}$`
            this.autoCorrection[i] = {}
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: `$${texFraction(c, d)}$`,
                statut: true
              },
              {
                texte: `$${texFraction(a, d)}$`,
                statut: false
              },
              {
                texte: `$${texFraction(d + a, d)}$`,
                statut: false
              },
              {
                texte: `$${texFraction(Math.abs(d - a), d)}$`,
                statut: false
              },
              {
                texte: `$${texFraction((a + 1) * d, d)}$`,
                statut: false
              }
            ]
            break
          case 1 :
            texte = `$${a} = ${texFraction('\\phantom{00000000000000}', '\\phantom{00000000000000}')} = ${texFraction(c, '\\phantom{0000}')}$`
            if (this.interactif) {
              texte = `$${a} = \\ldots$`
            }
            texteCorr = `$${a} = \\dfrac{${a}}{1} =${texFraction(a + miseEnEvidence('\\times' + d), '1' + miseEnEvidence('\\times' + d))} = ${texFraction(c, d)}$`
            this.autoCorrection[i] = {}
            this.autoCorrection[i].enonce = `${texte}\n`
            this.autoCorrection[i].propositions = [
              {
                texte: `$${texFraction(c, d)}$`,
                statut: true
              },
              {
                texte: `$${texFraction(c, c - a)}$`,
                statut: false
              },
              {
                texte: `$${texFraction(c, a)}$`,
                statut: false
              },
              {
                texte: `$${texFraction(c, c + a)}$`,
                statut: false
              },
              {
                texte: `$${texFraction(c, c * a)}$`,
                statut: false
              }
            ]

            break
        }
      }
      if (this.interactif) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Valeur maximale du facteur commun', 99]
  this.besoinFormulaire2Numerique = ['Type de question', 3, '1 : Numérateur imposé\n2 : Dénominateur imposé\n3 : Alternance']
}
