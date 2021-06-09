import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texFraction, texFractionReduite, pgcd, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Déterminer le coefficient directeur d\'une droite.'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['Droite oblique', 'Droite oblique', 'Droite oblique', 'Droite oblique', 'Droite verticale'] // On créé 2 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, xA, yA, xB, yB, n, d, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'Droite oblique':
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xB = randint(-5, 5, xA)
          yB = randint(-5, 5)
          n = yB - yA
          d = xB - xA

          texte = `avec $A(${xA};${yA})$ et $B(${xB};${yB})$. `
          texteCorr = 'On observe que $ x_B\\neq x_A$.'
          texteCorr += '<br>La droite $(AB)$ n\'est donc pas verticale.'
          texteCorr += '<br>On peut donc calculer le coefficient directeur de la droite.'
          texteCorr += '<br>On sait d\'après le cours : $m=\\dfrac{y_B-y_A}{x_B-x_A}$.'
          texteCorr += `<br>On applique avec les données de l'énoncé : $m=\\dfrac{${yB}-${ecritureParentheseSiNegatif(yA)}}{${xB}-${ecritureParentheseSiNegatif(xA)}}=${texFraction(n, d)}`
          if ((pgcd(n, d) !== 1 || d === 1 || d < 0) && n !== 0) {
            texteCorr += `=${texFractionReduite(n, d)}`
          }
          texteCorr += '$'
          setReponse(this, i, texFractionReduite(n, d))
          break
        case 'Droite verticale':
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xB = xA
          yB = randint(-5, 5)
          n = yB - yA
          d = xB - xA

          texte = `avec $A(${xA};${yA})$ et $B(${xB};${yB})$. `
          texteCorr = 'On observe que $ x_B = x_A$.'
          texteCorr += '<br>La droite $(AB)$ est donc verticale.'
          texteCorr += '<br>Elle n\'admet donc pas de coefficient directeur.'
          setReponse(this, i, ['non', '\\times'])
          break
      }
      if (!this.interactif) {
        this.consigne = 'Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal.  Déterminer, s\'il existe et en l\'expliquant, le coefficient directeur de la droite $\\bm{(AB)}$,'
      } else {
        this.consigne = 'Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal.  Déterminer, s\'il existe et en l\'expliquant, le coefficient directeur de la droite $\\bm{(AB)}$, écrire "non" si la droite n\'a pas de coefficicient directeur,'
      }
      texte += ajouteChampTexteMathLive(this, i)
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
