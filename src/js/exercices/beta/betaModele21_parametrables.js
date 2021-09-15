import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Nom de l\'exercice'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
 * Date de publication
*/
export default function NomExercice () {
  Exercice.call(this)
  this.consigne = 'Consigne'
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

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3']

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, difficulte, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (this.sup === 1) { // On ajuste la difficulté selon le paramètre.
        difficulte = 'facile'
      } else if (this.sup === 2) {
        difficulte = 'difficile'
      }
      switch (listeTypeQuestions[i]) {
        case 'type1':
          texte = `Question ${difficulte} ${i + 1} de type 1` // Les questions sont modifiées en fonction de la difficulté
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'type2':
          texte = `Question ${difficulte} ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
        case 'type3':
          texte = `Question ${difficulte} ${i + 1} de type 3`
          texteCorr = `Correction ${i + 1} de type 3`
          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
