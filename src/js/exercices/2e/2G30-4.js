import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, ecritureAlgebrique, ecritureParentheseSiNegatif, ecritureAlgebriqueSauf1, reduireAxPlusB } from '../../modules/outils.js'
export const titre = 'Déterminer une équation cartésienne de droite à partir d\'un point et d\'un vecteur directeur.'
// totoche
/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence 2G30-4, ex 2G51-1
*/
export const uuid = '0ec77'
export const ref = '2G30-4'
export default function equationcartesienne () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Déterminer une équation cartésienne de la droite $\\bm(d)$.'
  this.nbQuestions = 2
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
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
            texte += '<br><i>On demande une rédaction utilisant un résultat de cours.</i>'
            texteCorr = 'On sait, d\'après le cours, que si une droite $(d)$ admet un vecteur directeur de coordonnées :'
            texteCorr += ' $\\vec {u} \\begin{pmatrix}-b\\\\a\\end{pmatrix}$, '
            texteCorr += '<br>alors une équation cartésienne de la droite $(d)$ est de la forme $ax+by+c=0$. '
            texteCorr += `<br>Avec les données de l'énoncé, $\\vec u \\begin{pmatrix}${xu}\\\\${yu}\\end{pmatrix}$,`
            texteCorr += ` <br>on en déduit donc que :$-b = ${xu}$ et $a=${yu}$.`
            texteCorr += ` <br>L'équation cartésienne est donc de la forme : $ ${yu} x ${ecritureAlgebriqueSauf1(-xu)} y + c=0$. `
            texteCorr += `<br>On cherche maintenant la valeur correspondante de $c$. <br>On utilise pour cela que $A(${xA};${yA}) \\in(d)$. `
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
            texte += '<br><i>On demande une démonstration n\'utilisant pas de résultat de cours.</i>'

            texteCorr = '<br>Soit $M(x;y)$ un point du plan distinct de $A$.'
            texteCorr += '<br>$M(x;y) \\in (d)$'
            texteCorr += ' <br>$\\iff \\overrightarrow {AM}$ est un vecteur directeur de la droite $(d)$. '
            texteCorr += ' <br>$\\iff \\overrightarrow {AM}$ et $\\vec u$ sont donc des vecteurs colinéaires. '
            texteCorr += ' <br>$\\iff Det\\big(\\overrightarrow {AM};\\vec u\\big)=0$ <br>'
            texteCorr += ' <br>$\\iff \\begin{vmatrix}x-x_A&x_u\\\\y-y_A&y_u\\end{vmatrix}=0$ <br>'
            texteCorr += `<br>$\\iff \\begin{vmatrix}x-${ecritureParentheseSiNegatif(xA)}&${xu}\\\\y-${ecritureParentheseSiNegatif(yA)}&${yu}\\end{vmatrix}=0$<br>`
            texteCorr += `<br>$\\iff (x-${ecritureParentheseSiNegatif(xA)})\\times ${yu}-( y-${ecritureParentheseSiNegatif(yA)}) \\times ${ecritureParentheseSiNegatif(xu)}=0$`
            texteCorr += `<br>$\\iff ${yu} x ${ecritureAlgebriqueSauf1(-xu)} y -${ecritureParentheseSiNegatif(xA)} \\times ${yu} ${ecritureAlgebrique(yA)} \\times ${ecritureParentheseSiNegatif(xu)}=0$`
            texteCorr += ` <br>Après réduction, une équation cartésienne est de la forme : $ (d): ${reduireAxPlusB(yu, -xu)}y ${ecritureAlgebriqueSauf1(-xA * yu + yA * xu)}=0$ `
          }
          break
      }
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
  this.besoinFormulaireNumerique = ['Type de correction :', 2, '1 : Correction avec le cours\n2 : Correction avec la démonstration']
}
