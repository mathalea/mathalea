import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, ecritureAlgebrique, ecritureParentheseSiNegatif, ecritureAlgebriqueSauf1, reduireAxPlusB } from '../../modules/outils.js'
export const titre = 'Déterminer une équation cartésienne de droite à partir d\'un point et d\'un vecteur directeur.'
// totoche
/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence
*/
export default function equationcartesienne () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Déterminer une équation cartésienne de la droite $\\bm(d)$'
  this.nbQuestions = 2
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['cartesienne1']
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, xA, yA, xu, yu, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'cartesienne1':
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xu = randint(-5, 5)
          yu = randint(-5, 5)
          texte = `passant par le point $A$ de coordonnées : $A(${xA};${yA})$ et ayant le vecteur $\\vec u \\begin{pmatrix}${xu}\\\\${yu}\\end{pmatrix}$ comme vecteur directeur.`
          if (this.sup === 1) {
            texteCorr = 'On sait qu\'une équation cartésienne de la droite $(AB)$ est de la forme '
            texteCorr += ' $(d) : ax+by+c=0$, avec $(a;b)\\neq (0;0)$.'
            texteCorr += '<br>On sait aussi que dans ces conditions, un vecteur directeur de cette droite a pour coordonnées :'
            texteCorr += ' $\\vec {u} \\begin{pmatrix}-b\\\\a\\end{pmatrix}$.'
            texteCorr += `<br>Avec les données de l'énoncé, $\\vec u \\begin{pmatrix}${xu}\\\\${yu}\\end{pmatrix}$.`
            texteCorr += ` <br>On en déduit donc que :$-b = ${xu}$ et $a=${yu}$.`
            texteCorr += ` <br>L'équation cartésienne est donc de la forme : $ ${yu} x ${ecritureAlgebriqueSauf1(-xu)} y + c=0$. `
            texteCorr += `<br>On cherche maintenant la valeur correspondante de $c$. <br>On utilise pour cela que $A(${xA};${yA}) \\in(AB)$. `
            texteCorr += ` <br>$\\iff ${yu} \\times ${ecritureParentheseSiNegatif(xA)} ${ecritureAlgebrique(-xu)} \\times ${ecritureParentheseSiNegatif(yA)}+ c=0$ `
            texteCorr += ` <br>$\\iff  ${yu * xA} ${ecritureAlgebrique(-xu * yA)} + c=0$ `
            texteCorr += ` <br>$\\iff  c= ${-xA * yu + yA * xu}$ `
            if (xu === 0) { texteCorr += ` <br>Une équation cartésienne est donc de la forme : $ (d): ${reduireAxPlusB(yu, 0)} ${ecritureAlgebrique(-xA * yu + yA * xu)}=0$ ` } else {
              if (xu === 1) { texteCorr += ` <br>Une équation cartésienne est donc de la forme : $ (d): ${reduireAxPlusB(yu, 0)}-y ${ecritureAlgebrique(-xA * yu + yA * xu)}=0$ ` }
              if (xu === -1 & yu !== 0) { texteCorr += ` <br>Une équation cartésienne est donc de la forme : $ (d): ${reduireAxPlusB(yu, 0)}+y ${ecritureAlgebrique(-xA * yu + yA * xu)}=0$ ` }
              if (xu === -1 & yu === 0) { texteCorr += ` <br>Une équation cartésienne est donc de la forme : $ (d): y ${ecritureAlgebrique(-xA * yu + yA * xu)}=0$ ` }
              if (xu !== 0 & xu !== 1 & xu !== -1) { texteCorr += ` <br>Une équation cartésienne est donc de la forme : $ (d): ${reduireAxPlusB(yu, -xu)}y ${ecritureAlgebrique(-xA * yu + yA * xu)}=0$ ` }
            }
          }
          if (this.sup === 2) {
            texteCorr = 'On sait qu\'une équation cartésienne de la droite $(d)$ est de la forme '
            texteCorr += ' $(d) : ax+by+c=0$, avec $(a;b)\\neq (0;0)$.'
            texteCorr += '<br>Soit $M(x;y) \\in (d)$'
            texteCorr += ' <br>$\\overrightarrow {AM}$ est donc un vecteur directeur de la droite $(d)$. '
            texteCorr += ' <br>$\\overrightarrow {AM}$ et $\\vec u$ sont donc des vecteurs colinéaires. '
            texteCorr += ' <br>On en déduit que $Det\\big(\\overrightarrow {AM};\\vec u\\big)=0$ <br>'
            texteCorr += ' <br>$\\phantom{On en déduit que} \\iff \\begin{vmatrix}x-x_A&x_u\\\\y-y_A&y_u\\end{vmatrix}=0$ <br>'
            texteCorr += `<br>$\\phantom{On en déduit que} \\iff \\begin{vmatrix}x-${ecritureParentheseSiNegatif(xA)}&${xu}\\\\y-${ecritureParentheseSiNegatif(yA)}&${yu}\\end{vmatrix}=0$<br>`
            texteCorr += `<br>$\\phantom{On en déduit que} \\iff (x-${ecritureParentheseSiNegatif(xA)})\\times ${yu}-( y-${ecritureParentheseSiNegatif(yA)}) \\times ${ecritureParentheseSiNegatif(xu)}=0$`
            texteCorr += `<br>$\\phantom{On en déduit que} \\iff ${yu} x ${ecritureAlgebriqueSauf1(-xu)} y -${ecritureParentheseSiNegatif(xA)} \\times ${yu} ${ecritureAlgebrique(yA)} \\times ${ecritureParentheseSiNegatif(xu)}=0$`
            texteCorr += ` <br>Après réduction, une équation cartésienne est de la forme : $ (d): ${reduireAxPlusB(yu, -xu)}y ${ecritureAlgebriqueSauf1(-xA * yu + yA * xu)}=0$ `
          }
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
  this.besoinFormulaireNumerique = ['Type de correction :', 2, '1 : Correction avec le cours\n2 : Correction avec la démonstration']
}
