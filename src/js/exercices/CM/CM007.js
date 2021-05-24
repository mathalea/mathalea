import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Ajouter 11'
export const amcReady = true
export const interactifReady = true
export const interactifType = ''
export const amcType = 4

/**
 * Un nombre à 2 chiffres non multiple de 10 + 11
 * @author Rémi Angot
 * Référence CM007
*/
export default function Ajouter11 () {
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
      a = randint(0, 9) * 10 + randint(1, 9)
      texte = `$${a}+11 = $`
      texteCorr = `$${a}+11=${a + 11}$`
      setReponse(this, i, a + 11)
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
