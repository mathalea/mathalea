import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, texNombre, texFraction, calcul } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Donner l\'écriture décimale d\'une fraction décimale'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * On donne une fraction qui a pour dénominateur 10, 100 ou 1 000, il faut donner l'écriture décimale.
 *
 * Le numérateur est de la forme X, XX, X0X, X00X ou XXX
 * @author Rémi Angot
 * 6N23
 */
export default function ExerciceEcritureDecimaleApartirDeFractionDecimale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Donner l'écriture décimale."
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 8

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (
      let i = 0, a, b, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = choice(
        [
          randint(2, 9),
          randint(11, 99),
          randint(1, 9) * 100 + randint(1, 9),
          randint(1, 9) * 1000 + randint(1, 9)
        ],
        randint(101, 999)
      )
      // X, XX, X0X, X00X,XXX
      b = choice([10, 100, 1000])
      setReponse(this, i, calcul(a / b))
      this.autoCorrection[i].reponse.param.digits = 6
      this.autoCorrection[i].reponse.param.decimals = 3
      texte = `$${texFraction(texNombre(a), texNombre(b))} ${!this.interactif ? ' = \\dotfill $' : '=$' + ajouteChampTexteMathLive(this, i, 'largeur25 inline')}`
      texteCorr =
        '$ ' +
        texFraction(texNombre(a), texNombre(b)) +
        ' = ' +
        texNombre(calcul(a / b)) +
        ' $'
      if (this.questionJamaisPosee(i, a, b)) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (context.isDiaporama) {
          texte = texte.replace('=\\dotfill', '')
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
