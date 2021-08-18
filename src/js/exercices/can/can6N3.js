import Fraction from '../../modules/Fraction'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif'
import { calcul, listeQuestionsToContenuSansNumero, pgcd, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Somme de 4 entiers qui se marient'
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
    const c = randint(3, 7) * 10
    const d = randint(10, 15) * 10 - c
    const resultat = calcul(2 * (c + d))
    let texte = `$${c - a} + ${d + b} + ${c + a} + ${d - b}$`
    const texteCorr = `$${c - a} + ${c + a} + ${d + b}  + ${d - b} = ${2 * c} + ${2 * d}= ${2 * (c + d)}$`
    setReponse(this, 0, resultat, { formatInteractif: 'calcul' })
    texte += ajouteChampTexteMathLive(this, 0, 'largeur10 inline')
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
}
