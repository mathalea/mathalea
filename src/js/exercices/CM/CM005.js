import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, modalTexteCourt } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Ajouter 9'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @author Rémi Angot
 * Référence CM005
*/
export const uuid = '30800'
export const ref = 'CM005'
export default function Ajouter9 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer.'
  this.nbQuestions = 10
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 3

  this.nouvelleVersion = function (numeroExercice) {
    this.boutonAide = modalTexteCourt(
      numeroExercice,
      'Ajouter 9 revient à ajouter 10 et à soustraire 1.'
    )
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (
      let i = 0, texte, texteCorr, a, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(0, 9) * 10 + randint(1, 9)
      texte = `$${a}+9 = $`
      texteCorr = `$${a}+9=${a + 9}$`
      setReponse(this, i, a + 9)
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
