import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texFraction, calcul, choice, texNombre2 } from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'

export const amcReady = true
export const amcType = 'qcmMono' // QCM
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Donner une écriture fractionnaire'

/**
 * Donner la fraction correspondant à un nombre ou à un calcul
 * @author Jean-Claude Lhote
 * Ref 6N23-5
 * Publié le 10/03/2021
 */
export default function SensDeLaFraction () {
  Exercice.call(this)
  this.nbQuestions = 4
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const typeDeQuestionsDisponibles = [1, 2, 3, 4]
    const listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, texteCorr, a, b, f, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''

      switch (listeTypeDeQuestions[i]) {
        case 1:
          a = randint(10, 25)
          b = randint(10, 25, a)
          texte = `Le quotient de $${a}$ par $${b}$ s'écrit en écriture fractionnaire : $${texFraction(
              '\\phantom{00000}',
              '\\phantom{00000}'
            )}$`
          texteCorr = `Le quotient de $${a}$ par $${b}$ s'écrit $${texFraction(a, b)}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texFraction(a, b)}$`,
              statut: true
            },
            {
              texte: `$${texFraction(b, a)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(Math.abs(a - b), b)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(a + b, b)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(a * 10, b)}$`,
              statut: false
            }
          ]
          break

        case 2:
          a = randint(10, 25)
          b = randint(10, 25, a)
          texte = `Le nombre qui, multiplié par $${b}$, donne $${a}$ s'écrit en écriture fractionnaire : $${texFraction(
              '\\phantom{00000}',
              '\\phantom{00000}'
            )}$`
          texteCorr = `Le nombre qui, multiplié par $${b}$, donne $${a}$ s'écrit $${texFraction(a, b)}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texFraction(a, b)}$`,
              statut: true
            },
            {
              texte: `$${texFraction(b, a)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(Math.abs(a - b), b)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(a + b, b)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(a * 10, b)}$`,
              statut: false
            }
          ]
          break

        case 3:
          a = randint(10, 25)
          b = randint(10, 25, a)
          texte = `$${a}\\div ${b}$ s'écrit en écriture fractionnaire : $${texFraction(
              '\\phantom{00000}',
              '\\phantom{00000}'
            )}$`
          texteCorr = `$${a}\\div ${b}$ s'écrit  $${texFraction(a, b)}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texFraction(a, b)}$`,
              statut: true
            },
            {
              texte: `$${texFraction(b, a)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(Math.abs(a - b), b)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(a + b, b)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(a * 10, b)}$`,
              statut: false
            }
          ]
          break

        case 4:

          a = randint(1, 5) * 2 + 1
          b = choice([2, 4, 5, 10])
          a += b
          if (Number.isInteger(a / b)) {
            a++
          }
          f = fraction(a, b)

          texte = `Le nombre $${texNombre2(calcul(a / b))}$ s'écrit en écriture fractionnaire : $${texFraction(
            '\\phantom{00000}',
            '\\phantom{00000}'
          )}$`
          texteCorr = `Le nombre $${texNombre2(calcul(a / b))}$ s'écrit  $${f.fractionDecimale().texFraction}$`
          if (f.fractionDecimale().texFraction !== f.texFractionSimplifiee) {
            texteCorr += ` ou $${f.texFractionSimplifiee}$.`
          } else texte += '.'
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${f.fractionDecimale().texFraction}$`,
              statut: true
            },
            {
              texte: `$${texFraction(b, a)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(a, b * 10)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(a * 10, b)}$`,
              statut: false
            },
            {
              texte: `$${texFraction(Math.floor(a / b), fraction(calcul((a / b - Math.floor(a / b))) * 100, 100).fractionDecimale().n)}$`,
              statut: false
            }
          ]
          break
      }
      this.autoCorrection[i].options = {
        ordered: false,
        lastChoice: 5
      }
      if (this.interactif) {
        texte += '<br>' + propositionsQcm(this, i).texte
        texte = texte.replace(`$${texFraction('\\phantom{00000}', '\\phantom{00000}')}$`, '')
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  // this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
}
