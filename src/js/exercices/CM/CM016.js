import Exercice from '../Exercice.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { listeQuestionsToContenu, randint, choice, texNombrec, texNombre, calcul } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Diviser un entier par 10, 100 ou 1000'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'

export const amcType = 'AMCNum'
/**
 * Division d'un entier par 10, 100, 1000
 * @author Rémi Angot
 * Référence CM016
*/
export const uuid = '8f2a4'
export const ref = 'CM016'
export default function DiviserPar101001000 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer.'
  this.nbQuestions = 10
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = choice([randint(1, 9), randint(11, 99), randint(101, 999)])
      b = choice([10, 100, 1000])
      texte = `$${texNombre(a)}\\div${texNombre(b)}=$`
      texteCorr = `$${texNombre(a)}\\div${texNombre(b)}=${texNombrec(
        a / b
      )}$`
      setReponse(this, i, calcul(a / b))
      if (this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')

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
