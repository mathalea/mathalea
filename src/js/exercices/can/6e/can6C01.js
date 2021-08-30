import { propositionsQcm } from '../../../modules/gestionInteractif'
import { calcul, listeQuestionsToContenu, randint, texNombre, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Ordre de grandeur'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/*!
 * @author Jean-Claude Lhote
 */
export default function OrdreDeGrandeur () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const a = randint(3, 7)
    const b = randint(2, 9)
    const c = randint(1, 9)
    const d = randint(5, 9)
    const resultat = calcul((a * 100 + b * 10 + c) * d)
    let texte = `$${texNombrec(a * 100 + b * 10 + c)}\\times ${d}$<br> Choisis la bonne réponse sans effectuer précisément le calcul<br>`
    this.autoCorrection[0] = {
      enonce: texte,
      propositions: [
        {
          texte: `$${texNombre(resultat)}$`,
          statut: true
        },
        {
          texte: `$${texNombrec(d * 1000 + a * 100 + b * 10 + c)}$`,
          statut: false
        },
        {
          texte: `$${texNombrec((a * 1000 + b * 100 + c) * d)}$`,
          statut: false
        }
      ]
    }
    if (this.interactif) {
      texte += propositionsQcm(this, 0).texte
    }
    const texteCorr = `$${texNombrec(a * 100 + b * 10 + c)} \\times ${d} = ${texNombre(resultat)}$`
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
