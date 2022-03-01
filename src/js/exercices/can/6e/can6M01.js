import { context } from '../../../modules/context'
import { propositionsQcm } from '../../../modules/interactif/questionQcm'
import { listeQuestionsToContenu, randint, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Comparer des périmètres (V/F)'
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
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const a = randint(3, 25)
    const b = randint(0, 1)
    const VF = [false, true]
    let texte = `Est-il vrai qu'un carré de côté $${a}$ cm a le même périmètre qu'un rectangle de largeur $${a - b}$ cm et de longueur $${a + 1}$ cm ? `
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
    this.correction = VF[b]
      ? `Vrai <br>
      $\\bullet$ Pour le carré : $4\\times ${a}=${4 * a}$ cm.<br>
      $\\bullet$ Pour le rectangle  : $2\\times (${a - b}+ ${a + 1}) = ${4 * a}$ cm.`
      : `Faux <br>
      $\\bullet$ Pour le carré : $4\\times ${a}=${4 * a}$ cm.<br>
      $\\bullet$ Pour le rectangle  : $2\\times (${a}+${a + 1})= ${2 * 2 * a + 2}$ cm.`
    this.correction += VF[b]
      ? texteEnCouleur(`<br> Mentalement : <br>
           Pour le rectangle, la somme de la longueur $${a + 1}$ et de la largeur $${a - b}$ donne le demi-périmètre : $${2 * a - b + 1}$.<br>
      Pour avoir son périmètre, on multiplie  par $2$, on obtient : $2\\times ${2 * a - b + 1}=${4 * a - 2 * b + 2}$.`)
      : texteEnCouleur(`<br> Mentalement : <br>
      Pour le rectangle, la somme de la longueur $${a + 1}$ et de la largeur $${a}$ donne le demi-périmètre : $${2 * a + 1}$.<br>
      Pour avoir son périmètre, on multiplie  par $2$, on obtient : $2\\times ${2 * a + 1}=${4 * a + 2}$.
      `)

    this.listeQuestions.push(texte)
    this.listeCorrections.push(this.correction)
    listeQuestionsToContenu(this)
  }
}
