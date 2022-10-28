import { context } from '../../../modules/context.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
import { choice, texteExposant, listeQuestionsToContenu, randint, texNombrec } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Comparer des aires (V/F)'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6M01
 */
export const uuid = 'bae27'
export const ref = 'can6M08'
export default function QuestionDAires () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const a = randint(2, 9)
    const b = randint(2, 9, a)
    const c = randint(1, 3)
    let VF
    let texte
    if (choice([true, false])) {
      texte = `Est-il vrai qu'un carré de côté $${a}$ cm et un rectangle de largeur $${Math.min(a, b)}$ cm et de longueur $${Math.max(a, b)}$ cm ont une aire qui diffère de $${Math.max(a * a, a * b) - Math.min(a * a, a * b)}$ cm${texteExposant(2)} ?`
      this.canEnonce = texte
      VF = 'V'
    } else {
      VF = 'F'
      texte = `Est-il vrai qu'un carré de côté $${a}$ cm et un rectangle de largeur $${Math.min(a, b)}$ cm et de longueur $${Math.max(a, b)}$ cm ont une aire qui diffère de $${Math.max(a * a, a * b) - Math.min(a * a, a * b) + c}$ cm${texteExposant(2)} ?`
      this.canEnonce = texte
    }
    this.autoCorrection[0] = {
      enonce: texte,
      propositions: [
        {
          texte: 'Vrai',
          statut: VF === 'V'
        },
        {
          texte: 'Faux',
          statut: VF === 'F'
        }
      ]
    }
    if (!context.isAmc) {
      texte += propositionsQcm(this, 0).texte
    }
    let texteCorr = VF === 'V' ? 'Vrai' : 'Faux'
    texteCorr += `<br> $\\bullet$  le carré a une aire de $${a}\\times ${a}=${a * a}$ cm${texteExposant(2)}.<br>
    $\\bullet$  Le rectangle a une aire de $${a}\\times ${b}=${a * b}$ cm${texteExposant(2)}.`
    texteCorr += `<br>Ce qui fait ${VF === 'V' ? 'bien ' : ''} une différence de $${Math.max(a * a, a * b)} - ${Math.min(a * a, a * b)}=${Math.max(a * a, a * b) - Math.min(a * a, a * b)}$ cm${texteExposant(2)} ${VF === 'F' ? ' et non pas de ' + texNombrec(Math.max(a * a, a * b) - Math.min(a * a, a * b) + c) + ' cm' + texteExposant(2) + '.' : '.'}`
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
    this.canReponseACompleter = propositionsQcm(this, 0).texte
  }
}
