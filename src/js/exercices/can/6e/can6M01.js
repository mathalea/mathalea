import { context } from '../../../modules/context'
import { propositionsQcm } from '../../../modules/gestionInteractif'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Question de périmètres'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6M01
 */
export default function QuestionDePerimetres () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const a = randint(3, 25)
    const b = randint(0, 1)
    const VF = [false, true]
    let texte = `Est-il vrai qu'un carré de côté ${a} cm a le même périmètre qu'un rectangle de largeur ${a - b} cm et de longueur ${a + 1} cm ? (V ou F)`
    this.autoCorrection[0] = {
      enonce: texte,
      propositions: [
        {
          texte: 'Vrai',
          statut: VF[b]
        },
        {
          texte: 'Faux',
          statut: VF[1 - b]
        }
      ]
    }
    if (!context.isAmc) {
      texte += propositionsQcm(this, 0).texte
    }
    const texteCorr = VF[b] ? `Vrai car $4\\times ${a}$ cm = $2\\times ${a - 1}$ cm $+ 2\\times ${a + 1} $ cm $= ${4 * a}$ cm.` : `Faux car $4\\times ${a}$ cm $\\neq 2\\times ${a}$ cm $+ 2\\times ${a + 1}$ cm.`
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
