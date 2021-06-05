import Exercice from '../Exercice.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
export const titre = 'Somme de deux nombres mariés'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'numerique'
export const amcType = 4

/**
 * Somme de deux nombres dont les chiffres des unités sont des compléments à 10
 * @author Rémi Angot
 * Référence CM015
*/
export default function SommeDeDeuxNombresMaries () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer'
  this.nbQuestions = 10
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 100
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (
      let i = 0, texte, texteCorr, a, b, u1, u2, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      u1 = randint(1, 9)
      u2 = 10 - u1
      a = randint(1, 9) * 10 + u1
      b = randint(1, 9) * 10 + u2

      texte = `$${a}+${b}=$`
      texteCorr = `$${a}+${b}=${a + b}$`
      setReponse(this, i, a + b)
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
