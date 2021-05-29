import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texFraction, texFractionReduite, pgcd, ecritureParentheseSiNegatif } from '../../modules/outils.js'
export const titre = 'Coefficient directeur'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Déterminer une équation réduite de la droite $(d)$ :'
  this.nbQuestions = 5
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['A et B', 'A et u'] // On créé 2 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, xA, yA, xB, yB, n, d, texteCorr, xu, yu, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'A et B':
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xB = randint(-5, 5, xA)
          yB = randint(-5, 5)
          n = yB - yA
          d = xB - xA

          texte = `passant par les point $A$ et $B$ de coordonnées : $A(${xA};${yA})$ et $B(${xB};${yB})$ `
          texteCorr = 'On observe que $ x_B\\neq x_A$.'
          texteCorr += '<br>La droite $(AB)$ a donc une équation du type $y=mx+p$.'
          texteCorr += '<br>On commence par calculer le coefficient directeur $m$ :'
          texteCorr += '<br>On sait d\'après le cours : $m=\\dfrac{y_B-y_A}{x_B-x_A}$.'
          texteCorr += `<br>On applique avec les données de l'énoncé : $m=\\dfrac{${yB}-${ecritureParentheseSiNegatif(yA)}}{${xB}-${ecritureParentheseSiNegatif(xA)}}=${texFraction(n, d)}`
          if ((pgcd(n, d) !== 1 || d === 1 || d < 0) && n !== 0) {
            texteCorr += `=${texFractionReduite(n, d)}`
          }
          texteCorr += '$'
          texteCorr += '<br>L\'équation de la droite $(AB)$ est de la forme : $y='
          if ((pgcd(n, d) !== 1 || d === 1 || d < 0) && n !== 0) {
            texteCorr += `${texFractionReduite(n, d)}x`
          } else {
            // eslint-disable-next-line no-empty
            if (n === 0) {} else { texteCorr += `${texFraction(n, d)}x` }
          }
          texteCorr += '+p$.<br>'
          texteCorr += 'Comme $A \\in (AB)$, les coordonnées du point $A$ vérifient l\'équation, donc :'
          texteCorr += `<br>$${yA}=${texFractionReduite(n, d)} \\times ${ecritureParentheseSiNegatif(xA)} +p$`
          texteCorr += `<br>$\\iff p=${yA}-${texFractionReduite(n, d)} \\times ${ecritureParentheseSiNegatif(xA)}$`
          texteCorr += `<br>$\\iff p=${texFractionReduite(d * yA - n * xA, d)} .$`
          texteCorr += '<br>Au final, $(AB) : y=$'
          if ((pgcd(n, d) !== 1 || d === 1 || d < 0) && n !== 0) {
            texteCorr += `$${texFractionReduite(n, d)}x$`
          } else {
            if (n !== 0) { texteCorr += `$${texFraction(n, d)}x$` }
          }
          if (d * d * yA - n * xA * d > 0) { texteCorr += '$+$' }
          texteCorr += `$${texFractionReduite(d * yA - n * xA, d)} .$`

          break
        case 'A et u':
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xu = randint(-5, 5)
          yu = randint(-5, 5)
          n = yB - yA
          d = xB - xA

          texte = `passant par le point $A$ de coordonnées : $A(${xA};${yA})$ et ayant le vecteur $\\vec {u} \\begin{pmatrix}${xu}\\\\${yu}\\end{pmatrix}$ comme vecteur directeur. `
          texteCorr = 'On observe que $ x_B\\neq x_A$.'
          texteCorr += '<br>La droite $(AB)$ a donc une équation du type $y=mx+p$.'
          texteCorr += '<br>On commence par calculer le coefficient directeur $m$ :'
          texteCorr += '<br>On sait d\'après le cours : $m=\\dfrac{y_B-y_A}{x_B-x_A}$.'
      }
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
