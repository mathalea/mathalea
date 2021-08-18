import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif'
import { calcul, listeQuestionsToContenuSansNumero, randint, texNombrec } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Somme de deux décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'

export default function FSomme4EntiersQuiSeMarient () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.interactif = true

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []

    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const d = randint(1, 9, [a, b, c])
    const resultat = calcul(10 + (b + d) * 0.1 + c * 0.01)
    let texte = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}$`
    const texteCorr = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}=${texNombrec(10 + (b + d) * 0.1 + c * 0.01)}$`
    setReponse(this, 0, resultat, { formatInteractif: 'calcul' })
    texte += ajouteChampTexteMathLive(this, 0, 'largeur10 inline')
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
}
