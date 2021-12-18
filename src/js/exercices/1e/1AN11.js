import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, ecritureAlgebrique, randint, ecritureParentheseSiNegatif, ecritureAlgebriqueSauf1 } from '../../modules/outils.js'
export const titre = 'Equation de tangente'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/12/21' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function equationdetangente () {
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
        case 1 :// Sans formule
          a = randint(-5, 5)
          b = randint(-5, 5)// f(a)
          c = randint(-5, 5, [1])// f'(a)
          texte = 'Soit $f$ une fonction dérivable sur $[-5;5]$ et $\\mathcal{C}_f$ sa courbe représentative.<br>'
          texte += `On sait que  $f(${a})=${b}~~$ et que $~~f'(${a})=${c}$.`
          texte += `<br>Déterminer une équation de la tangente $(T)$ à la courbe $\\mathcal{C}_f$ au point d'abscisse $${a}$,`
          texte += '<br>sans utiliser la formule de cours de l\'équation de tangente.'

          texteCorr = 'On sait que la tangente n\'est pas une droite verticale, puisque la fonction est dérivable sur l\'intervale.'
          texteCorr += `<br>On en déduit que la tangente $(T)$ au point d'abscisse $${a}$, admet une équation réduite de la forme :  `
          texteCorr += '$(T) : y=m x + p$. <br>'
          texteCorr += '<br>Il nous faut trouver $m$  et  $p$.'
          texteCorr += `<br>On sait que le nombre dérivé en $${a}$ est par définition, le coefficient directeur de la tangente au point d'abscisse $${a}$.`
          texteCorr += `<br>Par conséquent, on a déjà : $m=f'(${a})=${c}$`
          texteCorr += `<br> On en déduit que : $(T) : y= ${c} x + p$. `
          texteCorr += '<br> Il nous faut maintenant déterminer la valeur de $p$.'
          texteCorr += `<br> Pour cela, on utilise que si $f(${a})=${b}~~$, alors le point $A$ de coordonnées $(${a};${b})$ appartient à $\\mathcal{C}_f$ mais aussi à $(T)$.`
          texteCorr += `<br> On peut écrire $A(${a};${b}) = \\mathcal{C}_f \\cap (T)$.`
          texteCorr += `<br> On remplace alors les coordonnées de $A(${a};${b})$ dans l'équation  $(T) : y= ${c} x + p$`
          texteCorr += `<br> $\\begin{aligned} \\phantom{\\iff}&A(${a};${b})\\in (T)\\\\`
          texteCorr += ` \\iff& ${b}= ${c} \\times ${ecritureParentheseSiNegatif(a)}  + p\\\\`
          texteCorr += ` \\iff& p=${b} ${ecritureAlgebriqueSauf1(-c)} \\times ${ecritureParentheseSiNegatif(a)}  \\\\`
          texteCorr += ` \\iff& p=${b} ${ecritureAlgebriqueSauf1(-c * a)}   \\\\`
          texteCorr += ` \\iff& p=${b - c * a}\\\\`
          texteCorr += '\\end{aligned}$'
          texteCorr += `<br>On peut conclure que : $(T) : y=${c}x ${ecritureAlgebrique(b - c * a)}$`
          break
        case 2 :// 'inverse':
          a = randint(-5, 5, [0])
          texte = 'Soit $f$ la fonction définie pour tout $x$ de $\\mathbb{R}^{*}$ par $f(x)=\\dfrac{1}{x}$.<br>'
          texte += `Déterminer la valeur de  $f'(${a})$, en utilisant la définition de cours.`
          texteCorr = `Pour déterminer $f'(${a})$, `
          texteCorr += `on commence par calculer le taux de variation de $f$, <br> entre $${a}$ et $${a}+h$ , `
          texteCorr += 'noté $\\tau(h)$, où $h$ est un réel non-nul.<br>'
          texteCorr += `$\\begin{aligned}\\tau(h) &= \\dfrac{f(${a}+h)-f(${a})}{h}&\\text{Définition du taux de variation}\\\\`
          texteCorr += `&= \\dfrac{\\dfrac{1}{${a}+h}-\\dfrac{1}{${a}}}{h}&\\text{Application à la fonction inverse.}\\\\`
          texteCorr += `&= \\dfrac{\\dfrac{${a}}{(${a}+h)\\times ${ecritureParentheseSiNegatif(a)}}-\\dfrac{${a}+h}{${a}\\times (${a}+h)}}{h}&\\text{Mise au même dénominateur.}\\\\`
          texteCorr += `&= \\dfrac{\\dfrac{${a}${ecritureAlgebriqueSauf1(-a)}-h}{(${a}+h)\\times ${ecritureParentheseSiNegatif(a)}}}{h}&\\text{Réduction au numérateur.}\\\\`
          texteCorr += `&= \\dfrac{-h}{(${a}+h)\\times ${ecritureParentheseSiNegatif(a)}}\\times \\dfrac{1}{h}&\\text{Diviser par } h, \\text{c'est multiplier par }\\dfrac{1}{h}.\\\\`
          texteCorr += `&= \\dfrac{-1}{(${a}+h)\\times ${ecritureParentheseSiNegatif(a)}}&\\text{Simplification par }h \\\\`
          texteCorr += '\\end{aligned}$'
          texteCorr += '<br>On cherche maintenant la limite du taux de variations quand $h$ tend vers $0$.'
          texteCorr += `<br>$\\lim\\limits_{h \\rightarrow 0} \\dfrac{-1}{(${a}+h)\\times ${ecritureParentheseSiNegatif(a)}}= \\dfrac{-1}{${a * a}} $`
          if (a !== 1 && a !== -1) { texteCorr += `<br>On peut donc conclure que $f'(${a})=\\dfrac{-1}{${a * a}} $` } else { texteCorr += `<br>On peut donc conclure que $f'(${a})=-1 $` }
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
  this.besoinFormulaireNumerique = ['Type de fonctions :', 5, '1 : Fonction affine 2 : Fonction carré 3: Fonction inverse 4: Fonction racine carrée 5: Méli-mélo']
}
