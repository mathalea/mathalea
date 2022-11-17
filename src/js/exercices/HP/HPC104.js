import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, MatriceCarree, lettreIndiceeDepuisChiffre, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { create, all } from 'mathjs'
const math = create(all)

export const titre = 'Calcul de déterminant'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Maxime Nguyen
 * Référence HPC104
*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Calcul du déterminant d\'une matrice carrée'
    this.nbQuestions = 3

    this.besoinFormulaireNumerique = ['Difficulté', 2, '1 : Matrice 2x2\n2 : Matrice 3x3'] // le paramètre sera numérique de valeur max 3 (le 3 en vert)
    this.sup = 2 // Valeur du paramètre par défaut
    // Remarques : le paramètre peut aussi être un texte avec : this.besoinFormulaireTexte = [texte, tooltip]
    //              il peut aussi être une case à cocher avec : this.besoinFormulaireCaseACocher = [texte] (dans ce cas, this.sup = true ou this.sup = false)

    this.nbCols = 2
    this.nbColsCorr = 2
    this.tailleDiaporama = 3
    this.video = ''
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let listeTypeDeQuestionsDisponibles
    if (this.sup === 1) { // On ajuste la difficulté selon le paramètre.
      listeTypeDeQuestionsDisponibles = ['type1']
    } else if (this.sup === 2) {
      listeTypeDeQuestionsDisponibles = ['type2']
    }
    const listeTypeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, coefficients, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      coefficients = [-9, -8, -7, -6, -5, -4, -3, -3, -2, -2, -2, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9]
      switch (listeTypeQuestions[i]) {
        case 'type1': {
          const n = 2
          const m = 2
          const table = []
          const nommatrice = lettreIndiceeDepuisChiffre(i + 1)
          let coef = 0
          for (let i = 0; i < n; i++) {
            const ligne = []
            for (let j = 0; j < m; j++) {
              coef = math.pickRandom(coefficients)
              ligne.push(coef)
            }
            table.push(ligne)
          }
          const matrice = new MatriceCarree(table)

          texte = `Calculer le déterminant de la matrice $${nommatrice} = ${matrice.toTex()}$.` // Les questions sont modifiées en fonction de la difficulté
          texteCorr = ''
          texteCorr += `On calcule $det(${nommatrice}) = ${ecritureParentheseSiNegatif(table[0][0])} \\times ${ecritureParentheseSiNegatif(table[1][1])} - ${ecritureParentheseSiNegatif(table[1][0])} \\times ${ecritureParentheseSiNegatif(table[0][1])}  = ${matrice.determinant()}$.`
          break }
        case 'type2': {
          const n = 3
          const m = 3
          const table = []
          const nommatrice = lettreIndiceeDepuisChiffre(i + 1)
          let coef = 0
          for (let i = 0; i < n; i++) {
            const ligne = []
            for (let j = 0; j < m; j++) {
              coef = math.pickRandom(coefficients)
              ligne.push(coef)
            }
            table.push(ligne)
          }
          const matrice = new MatriceCarree(table)
          texte = `Calculer le déterminant de la matrice $${nommatrice} = ${matrice.toTex()}$.` // Les questions sont modifiées en fonction de la difficulté
          texteCorr = ''
          texteCorr += `On calcule $det(${nommatrice}) = ${matrice.determinant()}$.`
          break }
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
