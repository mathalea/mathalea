
import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { modalTexteCourt } from '../../modules/outils/modaux.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'

export const titre = 'Mon test'

/**
 * Exercice de test
 * @author
 * Référence 6test2
*/
export default function MaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer'
  this.nbQuestions = 10
  this.nbCols = 2 // Nombre de colonnes pour la sortie LaTeX
  this.nbColsCorr = 2 // Nombre de colonnes dans la correction pour la sortie LaTeX

  this.nouvelleVersion = function (numeroExercice) {
    this.boutonAide = modalTexteCourt(numeroExercice, 'Ajouter 9 revient à ajouter 10 et à soustraire 1.')
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let listeTypeDeQuestionsDisponibles
    this.sup = parseInt(this.sup) // pour s'assurer d'avoir un nombre
    if (this.sup === 1) {
      listeTypeDeQuestionsDisponibles = ['niveau1']
    }
    if (this.sup === 2) {
      listeTypeDeQuestionsDisponibles = ['niveau1', 'niveau2', 'niveau2']
    }
    if (this.sup === 3) {
      listeTypeDeQuestionsDisponibles = ['niveau1', 'niveau2', 'niveau3', 'niveau3', 'niveau3']
    }
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, texteCorr, a, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 'niveau1':
          a = randint(1, 9) * 10 + randint(1, 9)
          break

        case 'niveau2':
          a = randint(1, 9) * 100 + randint(0, 9) * 10 + randint(1, 9)
          break

        case 'niveau3':
          a = randint(1, 9) * 1000 + randint(0, 9) * 100 + randint(0, 9) * 10 + randint(1, 9)
          break
      }

      texte = `$ ${a} + 9 $`
      texteCorr = `$ ${a} + 9 = ${a + 9} $`

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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Nombre inférieur à 100 n2 : Nombre inférieur à 1 000\n3 : Nombre inférieur à 10 000']
}
