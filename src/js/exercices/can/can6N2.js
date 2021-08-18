import Fraction from '../../modules/Fraction'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif'
import { calcul, listeQuestionsToContenuSansNumero, pgcd, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Fraction comme facteur manquant'
export const interactifReady = true
export const interactifType = 'mathLive'

export default function FractionCommeFacteurManquant () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.interactif = true

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let a = randint(2, 25)
    let b = randint(2, 25, a)
    a = calcul(a / pgcd(a, b))
    b = calcul(b / pgcd(a, b))
    const c = new Fraction(a, b)
    const resultat = calcul(a / b)
    let texte = `Quel est le nombre qui, multiplié par ${b} donne ${a} ?`
    const texteCorr = `c'est $${c.texFraction}$ car $${c.texFraction}\\times ${b} = ${a}$`
    if (!c.valeurDecimale) {
      setReponse(this, 0, [c.texFraction, `${Math.floor(a / b)}+\\dfrac{${a % b}}{${b}}`], { formatInteractif: 'calcul' })
    } else {
      setReponse(this, 0, [c.texFraction, resultat, `${Math.floor(a / b)}+\\dfrac{${a % b}}{${b}}`], { formatInteractif: 'calcul' })
    }
    texte += ajouteChampTexteMathLive(this, 0, 'largeur10 inline')
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
}
