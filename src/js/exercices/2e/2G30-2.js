import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texFraction, texFractionReduite, pgcd, ecritureParentheseSiNegatif } from '../../modules/outils.js'
export const titre = 'Déterminer une équation réduite de droite'

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence 2G30-2, ex 2G50-1
*/
export const uuid = '0cee9'
export const ref = '2G30-2'
export default function EquationReduiteDeDroites () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal. '
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    // const typeQuestionsDisponibles = ['A et B', 'A et u'] // On créé 2 types de questions
    // const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, xA, yA, xB, yB, n, d, texteCorr, xu, yu, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      // switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
      if (this.sup === 1) {
        // case 'A et B':
        xA = randint(-5, 5)
        yA = randint(-5, 5)
        xB = randint(-5, 5, xA)
        yB = randint(-5, 5)
        xu = xB - xA
        yu = yB - yA
        n = yB - yA
        d = xB - xA

        texte = `Déterminer une équation réduite de la droite $(AB)$ avec les point $A$ et $B$ de coordonnées : $A(${xA};${yA})$ et $B(${xB};${yB})$ `
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
        texteCorr += '<br>Au final, $(AB) : y='
        if (d * yA - n * xA === 0) { // cas où p=0
          if (n === d) { // cas où m=1 et p=0
            texteCorr += 'x'
          }
          if (n === -d) { // cas où m=-1 et p=0
            texteCorr += '-x'
          }
          if ((pgcd(n, d) !== 1 || d === 1) && n !== 0) { // m entier  non nul ou fraction réductible
            texteCorr += `${texFractionReduite(n, d)}x$`
          } else { // m fraction irréductible
            if (n !== 0) { texteCorr += `${texFractionReduite(n, d)}x$` }
          }
        }
        // cas ou p!=0 :
        if (d * yA - n * xA !== 0) {
        // on gère cas particulier ou m=+/-1
          if (n === d) { // m =1, on écrit x
            texteCorr += 'x' // on écrit x
            if (d * d * yA - n * xA * d > 0) { // p>0
              texteCorr += '+'
            }
          }
          if (n === -d) { // m=-1
            texteCorr += '-x' // on écrit -x
            if (d * d * yA - n * xA * d > 0) { // p>0
              texteCorr += '+'
            }
          }
          // cas ou m=+/- 1 traités.
          // cas général :
          if ((pgcd(n, d) !== 1 || d === 1) && n !== 0 && n / d !== 1 && n / d !== -1) {
            // m fraction réductible ou entier non nul.
            texteCorr += `${texFractionReduite(n, d)}x` // on affiche m
          } else {
            // m fraction irréductible non nul :
            if (n !== 0 && n / d !== 1 && n / d !== -1) { texteCorr += `${texFractionReduite(n, d)}x` }
          }
          if (d * d * yA - n * xA * d > 0 && n / d !== 1 && n / d !== -1) { // p>0
            texteCorr += '+'
          }
          // tous les cas précédents :
          texteCorr += `${texFractionReduite(d * yA - n * xA, d)} .$`
        }
        // break
      }
      if (this.sup === 2) {
        // case 'A et u':
        xA = randint(-5, 5)
        yA = randint(-5, 5)
        xu = randint(-5, 5, 0)
        yu = randint(-5, 5)
        n = yu
        d = xu

        texte = `Déterminer une équation réduite de la droite $(d)$ passant par le point $A$ de coordonnées : $A(${xA};${yA})$ et ayant le vecteur $\\vec {u} \\begin{pmatrix}${xu}\\\\${yu}\\end{pmatrix}$ comme vecteur directeur. `
        texteCorr = 'On observe que $ \\vec u$ n\'est pas colinéaire au vecteur $\\vec j$, puisque son déplacement horizontal est non-nul.'
        texteCorr += '<br>La droite $(AB)$ n\'est donc pas verticale. Elle admet donc une équation du type : $(AB) :y=mx+p$.'
        texteCorr += '<br>On commence par calculer le coefficient directeur $m$ :'
        texteCorr += '<br>On sait d\'après le cours que si $\\vec u \\begin{pmatrix}a\\\\b\\end{pmatrix}$, alors $m=\\dfrac{b}{a}$.'
        texteCorr += `<br>On applique avec les données de l'énoncé : $m=\\dfrac{${yu}}{${xu}}`
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
      }
      // }
      if (this.questionJamaisPosee(i, xA, yA, xu, yu)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Détermination équation réduite de droite à partir de 2 points \n2 : Détermination équation réduite à partir d\'un point et d\'un vecteur directeur.']
}
