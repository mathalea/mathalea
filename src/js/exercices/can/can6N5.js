import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif'
import { calcul, choice, listeQuestionsToContenuSansNumero, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Double ou triple'
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
    const a = randint(1, 3)
    const b = randint(1, 9, a)
    const c = calcul(a * 10 + b)
    let resultat, texte, texteCorr
    if (choice([true, false])) {
      resultat = calcul(3 * c)
      texte = `Quel est le triple de $${c}$ ?`
      texteCorr = `Le triple de $${c}$ est $3 \\times ${c}=${calcul(3 * c)}$.`
    } else {
      resultat = calcul(2 * c)
      texte = `Quel est le double de $${c}$ ?`
      texteCorr = `Le double de $${c}$ est $2 \\times ${c}=${calcul(2 * c)}$.`
    }
    setReponse(this, 0, resultat, { formatInteractif: 'calcul' })
    texte += ajouteChampTexteMathLive(this, 0, 'largeur10 inline')
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
}
