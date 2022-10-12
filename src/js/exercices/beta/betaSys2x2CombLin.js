import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { ppcm, randint } from '../../modules/outils/entiers.js'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif, rienSi1 } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { abs } from '../../modules/outils/nombres.js'
import { simplify } from 'mathjs'
import { matriceCarree } from '../../modules/outils/matrices.js'
export const titre = '2G35-3' // Résoudre un système 2x2 par combinaisons linéaire

// Représentation d'un système 2x2

const axby = (a, b, niveau) => niveau === 1
  ? rienSi1(a) + 'x' + ecritureAlgebriqueSauf1(b) + 'y' // Ecriture simple (niveau 1)
  : simplify(a + '*x+' + b + '*y').toString().replaceAll('*', '') // Ecriture avec factorisation ou parenthèse (niveau 2)

const dessSysteme = (s, d, niveau) =>
    `\\begin{cases} ${axby(s.a11, s.a12, niveau)} & =  ${d[0]} \\\\ 
                    ${axby(s.a21, s.a22, niveau)} & =  ${d[1]} \\end{cases}`

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence
*/
export default function Systeme2x2parCombinaisonLineaire () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Résoudre chacun des systèmes suivants $\\emph{par combinaisons}$'
  this.nbQuestions = 2
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)
  this.sup = 1 // Ecriture simple du système
  this.nouvelleVersion = function () {
    const niveau = +this.sup // Niveau 1 = écriture ax+by = c ; Niveau 2 = parenthèses ou factorisation
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, texteCorr, sys, varSol, varCoeff, coeff, droit, mat, equationX, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      sys = {}
      varSol = ['xS', 'yS'] // Noms des variables pour la solution
      varCoeff = ['a11', 'a12', 'a21', 'a22'] // Noms des coefficients de la matrice
      do {
        varSol.concat(varCoeff).forEach(v => (sys[v] = randint(-10, 10, 0))) // Affectation des 6 valeurs
        coeff = matriceCarree([[sys.a11, sys.a12], [sys.a21, sys.a22]]) // Création de la matrice
      } while (coeff.determinant === 0) // On veut une unique solution
      droit = coeff.multiplieVecteur([sys.xS, sys.yS]) // Vecteur à droite du système
      mat = dessSysteme(sys, droit, niveau) // Représentation du système
      equationX = rienSi1(sys.a11) + 'x' + ecritureAlgebrique(sys.a12 * sys.yS) + '=' + droit[0] // Equation finale en x

      texte = `$${mat}$`

      texteCorr = 'Donnons un nom à chacune des lignes du système :<br>'
      texteCorr += `$\\begin{matrix} L_1 \\\\ L_2 \\end{matrix}${mat}$<br>`

      const m = ppcm(abs(sys.a11), abs(sys.a21)) // ppcm entre les coefficients en x
      const c1 = m / sys.a11 // coeff multiplicateur
      const c2 = m / sys.a21
      if (c1 !== 1 || c2 !== 1) {
        texteCorr += 'Faisons apparaître le même coefficient devant $x$ pour les 2 lignes :<br>'
        texteCorr += `Le plus petit multiple commun entre les coefficients ${sys.a11} et ${sys.a21} est ${m}, pour cela :<br>`
        if (c1 !== 1) { texteCorr += `- Multiplions la ligne $L_1$ par ${c1}<br>` }
        if (c2 !== 1) { texteCorr += `- Multiplions la ligne $L_2$ par ${c2}<br>` }
        sys.a11 *= c1 // Màj des coeff de la matrice
        sys.a12 *= c1
        sys.a21 *= c2
        sys.a22 *= c2
        coeff = matriceCarree([[sys.a11, sys.a12], [sys.a21, sys.a22]]) // Nouveau système
        droit = coeff.multiplieVecteur([sys.xS, sys.yS]) // Terme à droite de l'égalité
        mat = dessSysteme(sys, droit, niveau)
        texteCorr += 'On obtient alors le système :<br>$\\begin{array}{r}'
        if (c1 !== 1) { texteCorr += `${ecritureParentheseSiNegatif(c1)}\\times ` } // on n'affiche pas les "1 *
        texteCorr += 'L_1 \\\\'
        if (c2 !== 1) { texteCorr += `${ecritureParentheseSiNegatif(c2)}\\times ` }
        texteCorr += `L_2 \\end{array}${mat}$<br>`
      }
      texteCorr += 'Soustrayons les lignes pour éliminer les $x$ : <br>'
      // Elimination des x et résolution de l'équation en y
      texteCorr += `$${axby(sys.a11, sys.a12, niveau)}-(${axby(sys.a21, sys.a22, niveau)}) = ${droit[0]} - ${ecritureParentheseSiNegatif(droit[1])}$ <br>`
      texteCorr += `On obtient l'équation à une inconnue : $${rienSi1(sys.a12 - sys.a22)}y = ${droit[0] - droit[1]}$ <br>`
      texteCorr += `qui admet comme solution $y=${sys.yS}$ <br>`
      // Calcul du x
      texteCorr += `Remplaçons $y$ par $${sys.yS}$ dans $L_1$ (on aurait pu aussi utiliser $L_2$):<br>`
      texteCorr += `$L_1$ : $${equationX}$ et donc $x=${sys.xS}$<br>`
      texteCorr += `$\\underline{Conclusion}$ : $S=\\{(${sys.xS},${sys.yS})\\}$<br>`

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
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté', 2,
    '1 : Ecriture simplifiée du système\n2 : Ecriture quelconque du système'
  ]
}
