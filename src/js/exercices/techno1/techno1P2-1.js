import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, texNombrec, randint } from '../../modules/outils.js'
export const titre = 'Proportion d\'une sous-population'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence
*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Consigne'
    this.nbQuestions = 2 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.video = '' // Id YouTube ou url
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, n, p, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          n = randint(200, 1500) * 2
          p = randint(50, n / 2)
          texte = `Parmi les ${n} spectateurs d’un match de basket-ball, ${p} ont moins de 20 ans. Calculer la proportion de spectateurs
          ayant moins de 20 ans.` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `La population de référence est celle des spectateurs du match. On peut appeler $n=${n}$ son effectif.<br>
          La sous-population étudiée est celle des spectateurs de moins de 20 ans. On peut appeler $p=${p}$ son effectif.<br>
          D'après le cours, on sait que la proportion d'une sous-population dans une population est :<br>
          $\\dfrac{\\text{Effectif de la sous population}}{\\text{Effectif de la population de référence}}=\\dfrac{n}{p}=\\dfrac{${n}}{${p}}=${texNombrec(n / p)}`
          break
        case 'type2':
          texte = `Question ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
        case 'type3':
          texte = `Question ${i + 1} de type 3`
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
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
