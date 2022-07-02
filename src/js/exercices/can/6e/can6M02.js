import { context } from '../../../modules/context'
import { propositionsQcm } from '../../../modules/interactif/questionQcm'
import { enleveElement, listeQuestionsToContenu, randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver la bonne unité'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6M02
 */
export default function LaBonneUnite () {
  Exercice.call(this)
  this.nbQuestions = 1

  const hauteurs = [
    ['chaise', 75, 115, 'cm'],
    ['grue', 120, 250, 'dm'],
    ['tour', 50, 180, 'm'],
    ['girafe', 40, 50, 'dm'],
    ['coline', 75, 150, 'm']
  ]
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const unites = ['cm', 'dm', 'm']
    const a = randint(0, 4)
    const b = randint(hauteurs[a][1], hauteurs[a][2])
    enleveElement(unites, hauteurs[a][3])
    let texte = `Choisir parmi les propositions suivantes la hauteur d'une ${hauteurs[a][0]}.<br>`
    this.autoCorrection[0] = {
      enonce: texte,
      propositions: [
        {
          texte: `$${b}$${hauteurs[a][3]}`,
          statut: true
        },
        {
          texte: `$${b}$${unites[0]}`,
          statut: false
        },
        {
          texte: `$${b}$${unites[1]}`,
          statut: false
        }
      ]
    }
    if (!context.isAmc) {
      texte += propositionsQcm(this, 0).texte
    }
    const texteCorr = `La hauteur d'une ${hauteurs[a][0]} est ${b} ${hauteurs[a][3]}`
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
