import Exercice from '../Exercice.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
export const titre = 'Complément à 100'
export const amcReady = true
export const interactifReady = true
export const interactifType = ' '
export const amcType = 4

/**
 * 100-...=
 * @author Rémi Angot
* Référence CM012
 */
export default function ComplementA100 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.consigne = 'Calculer'
  this.nbQuestions = 10
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 100

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (
      let i = 0, texte, texteCorr, a, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(11, 89)
      texte = `$100-${a}=$`
      texteCorr = `$100-${a}=${100 - a}$`
      setReponse(this, i, 100 - a)
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
