import { not } from 'mathjs'
import { listeQuestionsToContenu, randint, combinaisonListes, MatriceCarree, abs,ppcm,ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { simplify } from 'mathjs'
import Exercice from '../Exercice.js'
export const titre = '2G25-3' // Résoudre un système 2x2 par combinaisons linéaire

// Représentation d'un système 2x2

const axby = (a,b) => simplify(a+"*x+"+b+"*y").toString().replaceAll('*', '')
const dessSysteme = (s,d) => 
    `\\begin{cases} ${axby(s.a11,s.a12)} & = & ${d[0]} \\\\ 
                    ${axby(s.a21,s.a22)} & = & ${d[1]} \\end{cases}`

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Résoudre chacun des systèmes suivants <i>par combinaisons</i>'
  this.nbQuestions = 2
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.typeExercice = 'XCas'
  this.spacingCorr = 2
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles =  ['type1']
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texteCorr, sys, varSol,varCoeff,coeff,droit,mat,equationX, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      sys = {}
      varSol = ['xS','yS']                 // Noms des variables pour la solution 
      varCoeff = ['a11','a12','a21','a22']      // Noms des coefficients de la matrice
      do {
          varSol.concat(varCoeff).forEach(v => sys[v] = randint(-10,10,0))          // Affectation des 6 valeurs
          coeff = new MatriceCarree([[sys.a11, sys.a12], [sys.a21, sys.a22]])       // Création de la matrice
      } while (coeff.determinant == 0)                                              // On veut une unique solution
      droit = coeff.multiplieVecteur([sys.xS, sys.yS])                              // Vecteur à droite du système
      mat = dessSysteme(sys,droit)          // Représentation du système
      equationX = simplify(sys.a11+"*x+" + sys.a12 * sys.yS).toString().replaceAll('*', '') + '=' + droit[0]    // Equation finale en x

      switch (listeTypeDeQuestions[i]) { 
        case 'type1': 
          // Enoncé                     
         texte = `$${mat}$`     
         break     
      }

      texteCorr = `Donnons un nom à chacune des lignes du système :<br>`
      texteCorr += `$\\begin{matrix} L_1 \\\\ L_2 \\end{matrix}${mat}$<br>`

          let m = ppcm(abs(sys.a11),abs(sys.a21))   // ppcm entre les coefficients en x 
          let c1 = m / sys.a11                      // coeff multiplicateur
          let c2 = m / sys.a21
          if (c1 != 1 || c2 != 1) {
            texteCorr += `Faisons apparaître le même coefficient devant $x$ pour les 2 lignes :<br>`
            texteCorr += `Le plus petit multiple commun entre les coefficients ${sys.a11} et ${sys.a21} est ${m}, pour cela :<br>`
            if (c1 !=1) {texteCorr += `- Multiplions la ligne $L_1$ par ${c1}<br>`}
            if (c2 !=1) {texteCorr += `- Multiplions la ligne $L_2$ par ${c2}<br>`}
            sys.a11 *= c1       // Màj des coeff de la matrice
            sys.a12 *= c1
            sys.a21 *= c2
            sys.a22 *= c2   
            coeff = new MatriceCarree([[sys.a11, sys.a12], [sys.a21, sys.a22]])     // Nouveau système
            droit = coeff.multiplieVecteur([sys.xS, sys.yS])  // Terme à droite de l'égalité
            mat = dessSysteme(sys,droit)  
            texteCorr += `On obtient alors le système :<br>$\\begin{array}{r}`
            if (c1 !=1) {texteCorr += `${ecritureParentheseSiNegatif(c1)}\\times `} // on n'affiche pas les "1 *
            texteCorr += `L_1 \\\\`
            if (c2 !=1) {texteCorr += `${ecritureParentheseSiNegatif(c2)}\\times `}
            texteCorr += `L_2 \\end{array}${mat}$<br>`
          } 
          texteCorr += `Soustrayons les lignes pour éliminer les $x$ : <br>`
          // Elimination des x et résolution de l'équation en y
          texteCorr += `$${axby(sys.a11,sys.a12)}-(${axby(sys.a21,sys.a22)}) = ${droit[0]} - ${ecritureParentheseSiNegatif(droit[1])}$ <br>`
          texteCorr += `On obtient l'équation à une inconnue : $${axby(sys.a11-sys.a21,sys.a12-sys.a22)} = ${droit[0]-droit[1]}$ <br>`
          texteCorr += `qui admet comme solution $y=${sys.yS}$ <br>`
          // Calcul du x
          texteCorr += `Remplaçons $y$ par $${sys.yS}$ dans $L_1$ (on aurait pu aussi utiliser $L_2$):<br>`
          texteCorr += `$L_1$ : $${equationX}$ et donc $x=${sys.xS}$<br>`
          texteCorr += `<u>Conclusion</u> : $S=\\{(${sys.xS},${sys.yS})\\}$<br>`



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
  //this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu
