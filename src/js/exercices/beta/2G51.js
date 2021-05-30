import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, ecritureAlgebrique, ecritureParentheseSiNegatif, ecritureAlgebriqueSauf1 } from '../../modules/outils.js'
export const titre = 'Equation cartésienne de droite'

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence
*/
export default function equationcartesienne () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Déterminer l\'équation cartésienne de la droite $(AB)$'
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 2 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['cartesienne1']
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, xA, yA, xB, yB, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'cartesienne1':
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xB = randint(-5, 5)
          yB = randint(-5, 5)
          texte = `avec les point $A$ et $B$ de coordonnées : $A(${xA};${yA})$ et $B(${xB};${yB})$ `
          texteCorr = 'On sait qu\'une équation cartésienne de la droite $(AB)$ est de la forme :'
          texteCorr += ' $(AB) : ax+by+c=0$, avec $(a;b)\\neq (0;0)$.'
          texteCorr += '<br>On sait aussi que dans ces conditions, un vecteur directeur de cette droite a pour coordonnées :'
          texteCorr += ' $\\vec {u} \\begin{pmatrix}-b\\\\a\\end{pmatrix}$'
          texteCorr += ' <br>Il suffit donc de trouver un vecteur directeur à cette droite pour déterminer une valeur possible pour les coefficients $a$ et $b$. <br>Or le vecteur $\\overrightarrow{AB}$ est un vecteur directeur directeur de la droite, dont on peut calculer les coordonnées :'
          texteCorr += ' <br>$\\overrightarrow{AB}  \\begin{pmatrix}x_B-x_A\\\\y_B-y_A\\end{pmatrix}$'
          texteCorr += ` $\\iff\\overrightarrow{AB}  \\begin{pmatrix} ${xB}-${xA}\\\\${yB}-${yA}\\end{pmatrix}$`
          texteCorr += ` $\\iff\\overrightarrow{AB}  \\begin{pmatrix} ${xB - xA}\\\\${yB - yA}\\end{pmatrix}$`
          texteCorr += ` <br>On en déduit donc que :$-b = ${xB - xA}$ et $a=${yB - yA}$`
          texteCorr += ` <br>L'équation cartésienne est donc de la forme : $ ${yB - yA} x ${ecritureAlgebriqueSauf1(xA - xB)} y + c=0$ `
          texteCorr += `<br>On cherche maintenant la valeur correspondante de $c$. <br>On utilise pour cela que $A(${xA};${yA}) \\in(AB)$ `
          texteCorr += ` <br>$\\iff ${yB - yA} \\times ${ecritureParentheseSiNegatif(xA)} ${ecritureAlgebriqueSauf1(xA - xB)} \\times ${ecritureParentheseSiNegatif(yA)}+ c=0$ `
          texteCorr += ` <br>$\\iff  ${yB * xA - yA * xA} ${ecritureAlgebrique(xA * yA - xB * yA)} + c=0$ `
          texteCorr += ` <br>$\\iff  c= ${-xA * yA + xB * yA - yB * xA + yA * xA}$ `
          texteCorr += ` <br>L'équation cartésienne est donc de la forme : $ ${yB - yA} x ${ecritureAlgebriqueSauf1(xA - xB)} y ${ecritureAlgebriqueSauf1(-xA * yA + xB * yA - yB * xA + yA * xA)}=0$ `
          break
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
