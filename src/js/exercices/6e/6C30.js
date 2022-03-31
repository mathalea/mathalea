/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombre } from '../../modules/outils.js'
import Operation from '../../modules/operations.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const amcReady = true
export const amcType = 'AMCNum' // Question numérique
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Poser des multiplications de nombres décimaux'

/**
 * Multiplication de deux nombres décimaux
 *
 * * xxx * xx,x chiffres inférieurs à 5
 * * xx,x * x,x
 * * x,xx * x0x
 * * 0,xx * x,x
 * @author Rémi Angot
 * Référence 6C30
 */
export default function MultiplierDecimaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Poser et effectuer les calculs suivants.'
  this.spacing = 2
  this.spacingCorr = 1 // Important sinon le calcul posé ne fonctionne pas avec opmul et spacing
  this.nbQuestions = 4
  this.listePackages = 'xlop'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typesDeQuestionsDisponibles = [1, 2, 3, 4]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let typesDeQuestions, reponse
    for (let i = 0, texte, texteCorr, cpt = 0, a, b; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 1: // xxx * xx,x chiffres inférieurs à 5
          a = randint(2, 5) * 100 + randint(2, 5) * 10 + randint(2, 5)
          b = calcul(randint(2, 5) * 10 + randint(2, 5) + randint(2, 5) / 10)
          break
        case 2: // xx,x * x,x
          a = calcul(randint(2, 9) * 10 + randint(2, 9) + randint(2, 9) / 10)
          b = calcul(randint(6, 9) + randint(6, 9) / 10)
          break
        case 3: // x,xx * x0x
          a = calcul(randint(2, 9) + randint(2, 9) / 10 + randint(2, 9) / 100)
          b = calcul(randint(2, 9) * 100 + randint(2, 9))
          break
        case 4: // 0,xx * x,x
          a = calcul(randint(2, 9) / 10 + randint(2, 9) / 100)
          b = calcul(randint(2, 9) + randint(2, 9) / 10)
          break
      }

      texte = `$${texNombre(a)}\\times${texNombre(b)}$`
      reponse = calcul(a * b)
      texteCorr = Operation({ operande1: a, operande2: b, type: 'multiplication' })
      if (context.isHtml && this.interactif) texte += '$~=$' + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
      setReponse(this, i, reponse)
      this.autoCorrection[i].options = { digits: 0, decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
