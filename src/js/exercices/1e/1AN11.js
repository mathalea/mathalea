import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, ecritureAlgebrique, randint, ecritureParentheseSiNegatif, ecritureAlgebriqueSauf1, reduireAxPlusB } from '../../modules/outils.js'
export const titre = 'Déterminer une équation de tangente'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export const uuid = '4c8c7'
export const ref = '1AN11'
export default function Equationdetangente () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.sup = parseInt(this.sup)
  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let typesDeQuestionsDisponibles = [1, 2]
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1]
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2]
    }
    const listeTypeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    for (let i = 0, a, b, c, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) {
        case 2 :// Sans formule
          a = randint(-5, 5)
          b = randint(-5, 5)// f(a)
          c = randint(-5, 5)// f'(a)
          texte = 'Soit $f$ une fonction dérivable sur $[-5;5]$ et $\\mathcal{C}_f$ sa courbe représentative.<br>'
          texte += `On sait que  $f(${a})=${b}~~$ et que $~~f'(${a})=${c}$.`
          texte += `<br>Déterminer une équation de la tangente $(T)$ à la courbe $\\mathcal{C}_f$ au point d'abscisse $${a}$,`
          texte += '<br>sans utiliser la formule de cours de l\'équation de tangente.'

          texteCorr = 'On sait que la tangente n\'est pas une droite verticale, puisque la fonction est dérivable sur l\'intervalle.'
          texteCorr += `<br>On en déduit que la tangente $(T)$ au point d'abscisse $${a}$, admet une équation réduite de la forme :  `
          texteCorr += '$(T) : y=m x + p$. <br>'
          texteCorr += '<br>$\\bullet$ Détermination de $m$ :'
          texteCorr += `<br>On sait que le nombre dérivé en $${a}$ est par définition, le coefficient directeur de la tangente au point d'abscisse $${a}$.`
          texteCorr += `<br>Par conséquent, on a déjà : $m=f'(${a})=${c}$.`
          texteCorr += `<br> On en déduit que  $(T) : y= ${c} x + p$`
          texteCorr += '<br>$\\bullet$ Détermination de $p$ :'
          texteCorr += `<br> Pour cela, on utilise que si $f(${a})=${b}~~$, alors le point $A$ de coordonnées $(${a};${b})$ appartient à $\\mathcal{C}_f$ mais aussi à $(T)$.`
          texteCorr += `<br> On peut écrire $A(${a};${b}) = \\mathcal{C}_f \\cap (T)$.`
          texteCorr += `<br> On remplace alors les coordonnées de $A(${a};${b})$ dans l'équation  $(T) : y= ${c} x + p$.`
          texteCorr += `<br> $\\begin{aligned} \\phantom{\\iff}&A(${a};${b})\\in (T)\\\\`
          texteCorr += ` \\iff& ${b}= ${c} \\times ${ecritureParentheseSiNegatif(a)}  + p\\\\`
          texteCorr += ` \\iff& p=${b} ${ecritureAlgebriqueSauf1(-c)} \\times ${ecritureParentheseSiNegatif(a)}  \\\\`
          texteCorr += ` \\iff& p=${b} ${ecritureAlgebriqueSauf1(-c * a)}   \\\\`
          texteCorr += ` \\iff& p=${b - c * a}\\\\`
          texteCorr += '\\end{aligned}$'
          texteCorr += `<br>On peut conclure que : $(T) : y=${reduireAxPlusB(c, b - c * a)}$.`
          break
        case 1 :// 'formule':
          a = randint(-5, 5)
          b = randint(-5, 5)// f(a)
          c = randint(-5, 5, [1])// f'(a)
          texte = 'Soit $f$ une fonction dérivable sur $[-5;5]$ et $\\mathcal{C}_f$ sa courbe représentative.<br>'
          texte += `On sait que  $f(${a})=${b}~~$ et que $~~f'(${a})=${c}$.`
          texte += `<br>Déterminer une équation de la tangente $(T)$ à la courbe $\\mathcal{C}_f$ au point d'abscisse $${a}$,`
          texte += '<br>en utilisant la formule de cours de l\'équation de tangente.'
          texteCorr = ` $${a}\\in[-5;5]$ donc la fonction est dérivable en $${a}$.`
          texteCorr += ` <br> On peut donc appliquer la formule de cours qui donne une équation de la tangente $(T)$ au point d'abscisse $${a}$ : `
          texteCorr += '<br> $\\begin{aligned} '
          texteCorr += '(T) : y&=f\'(a)(x-a)+f(a)&\\text{On cite la relation de cours.}\\\\ '
          texteCorr += `(T) : y&=f'(${a})(x-${ecritureParentheseSiNegatif(a)})+f(${a})&\\text{On applique à l'énoncé.}\\\\ `
          texteCorr += `(T) : y&=${c}(x-${ecritureParentheseSiNegatif(a)})${ecritureAlgebrique(b)}&\\text{On remplace les valeurs connues.}\\\\ `
          if (a < 0) { texteCorr += `(T) : y&=${c}(x${ecritureAlgebrique(-a)})${ecritureAlgebrique(b)}&\\text{On simplifie l'expression.}\\\\ ` }
          texteCorr += `(T) : y&=${reduireAxPlusB(c, -a * c)}${ecritureAlgebrique(b)}&\\text{On développe.}\\\\ `

          texteCorr += '\\end{aligned}$'
          texteCorr += `<br>On peut conclure que : $(T) : y=${reduireAxPlusB(c, b - c * a)}$.`
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
  this.besoinFormulaireNumerique = ['Consigne ', 2, '1 : avec formule. 2 : avec démonstration.']
}
