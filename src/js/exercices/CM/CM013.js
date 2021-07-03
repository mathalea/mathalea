import Exercice from '../Exercice.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'

import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
export const titre = 'Complément à une dizaine'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'numerique'
export const amcType = 'AMCNum'

/**
 * Une soustraction dont le premier terme est un multiple de 10
 * @author Rémi Angot
 * Référence CM013
*/
export default function ComplementAUneDizaine () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer'
  this.nbQuestions = 10
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 100

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(2, 9) * 10
      b = randint(2, a - 11)
      texte = `$${a}-${b}=$`
      texteCorr = `$${a}-${b}=${a - b}$`
      setReponse(this, i, a - b)
      if (this.interactif) texte += ajouteChampTexte(this, i)

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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
