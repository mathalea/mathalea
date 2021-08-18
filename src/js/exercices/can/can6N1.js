import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif'
import { calcul, listeQuestionsToContenuSansNumero, randint, texNombrec } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Double et moitié'
export const interactifReady = true
export const interactifType = 'mathLive'

export default function doubleEtMoitie () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.interactif = true

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const a = randint(1, 25) // variables aléatoires
    let contenu = `Le double d'un nombre vaut ${2 * a}, combien vaut sa moitié ?<br>`
    contenu += ajouteChampTexteMathLive(this, 0, 'largeur10 inline')
    setReponse(this, 0, calcul(a / 2))
    const contenuCorrection = `Le nombre est ${a}, sa moitié est ${texNombrec(a / 2)}.` // Correction détaillée
    this.listeQuestions.push(contenu)
    this.listeCorrections.push(contenuCorrection)
    listeQuestionsToContenuSansNumero(this)
  }
}
