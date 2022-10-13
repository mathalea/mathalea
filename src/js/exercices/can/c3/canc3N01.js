import { context } from '../../../modules/context.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
import { choice } from '../../../modules/outils/arrays.js'
import { randint } from '../../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../../modules/outils/miseEnForme.js'
import { nombreEnLettres } from '../../../modules/outils/nombreenlettres.js'
import { texNombre } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Écrire en lettres un nombre entier (QCM)'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/*!
 * @author Jean-Claude Lhote
 * Date de publication septembre 2021
 * Référence canc3N01
 */
export const uuid = 'f7ad2'
export const ref = 'canc3N01'
export default function EcritureDeNombreEntier () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    let N1, N2, N3
    switch (choice([1, 2, 3])) {
      case 1:
        N1 = a * 1000 + b * 100 + c
        N2 = a * 1000 + b * 10 + c
        N3 = a * 1000 + b * 100 + c * 10
        break
      case 2:
        N1 = a * 1000 + b * 10 + c
        N2 = a * 1000 + b * 100 + c
        N3 = a * 1000 + b * 100 + c * 10
        break
      case 3:
        N1 = a * 1000 + b * 100 + c * 10
        N2 = a * 1000 + b * 100 + c
        N3 = a * 1000 + b * 10 + c
        break
    }
    let texte = `Le nombre $${texNombre(N1)}$ s'écrit (coche la bonne réponse) :<br>`
    this.canEnonce = `Quelle est l'écriture du nombre $${texNombre(N1)}$ ?`
    this.autoCorrection[0] = {
      enonce: texte,
      options: { vertical: true },
      propositions: [
        {
          texte: nombreEnLettres(N1),
          statut: true
        },
        {
          texte: nombreEnLettres(N2),
          statut: false
        },
        {
          texte: nombreEnLettres(N3),
          statut: false
        }
      ]
    }
    if (!context.isAmc) {
      texte += propositionsQcm(this, 0).texte
    }
    const texteCorr = `$${texNombre(N1)}$ s'écrit ${nombreEnLettres(N1)}.`
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
    this.canReponseACompleter = propositionsQcm(this, 0).texte
  }
}
