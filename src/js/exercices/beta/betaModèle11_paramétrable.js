import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu } from '../../modules/outils.js'
export const titre = 'Nom de l\'exercice'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
 * Date de publication
*/
export default function NomExercice () {
  Exercice.call(this)
  this.consigne = 'Calcule'
  this.nbQuestions = 10

  this.besoinFormulaireNumerique = ['Difficulté', 2, '1 : Facile\n2 : Difficile'] // le paramètre sera numérique de valeur max 2 (le 2 en vert)
  this.sup = 1 // Valeur du paramètre par défaut
  // Remarques : le paramètre peut aussi être un texte avec : this.besoinFormulaireTexte = [texte, tooltip]
  //              il peut aussi être une case à cocher avec : this.besoinFormulaireCaseACocher = [texte] (dans ce cas, this.sup = true ou this.sup = false)

  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 100
  this.video = ''

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []

    this.sup = parseInt(this.sup) // Lorsqu'il est récupéré de l'url, le paramètre peut être un texte, dans le doute on le convertit en nombre

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const a = randint(1, 12) // Comme la valeur ne sera pas modifiée, on la déclare avec const
      let NombreAAjouter // Comme la valeur sera modifiée, on la déclare avec let
      if (this.sup === 1) {
        NombreAAjouter = 1
      } else if (this.sup === 2) {
        NombreAAjouter = 5
      }
      texte = `$${a} + ${NombreAAjouter} $`
      texteCorr = `$${a} + ${NombreAAjouter} = ${a + NombreAAjouter}$`

      if (this.listeQuestions.indexOf(texte) === -1) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
