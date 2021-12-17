import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, ecritureAlgebrique, randint, ecritureParentheseSiNegatif, ecritureAlgebriquec, ecritureAlgebriqueSauf1 } from '../../modules/outils.js'
export const titre = 'Nom de l\'exercice'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/12/21' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function tauxvariation () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.sup = 1
  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['carré', 'inverse'] // On créé 3 types de questions
    if (this.sup === 1) { // On ajuste la difficulté selon le paramètre.
      typeQuestionsDisponibles = ['carré']
    }
    if (this.sup === 2) {
      typeQuestionsDisponibles = ['inverse']
    }
    if (this.sup === 3) {
      typeQuestionsDisponibles = ['carré', 'inverse']
    }
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    for (let i = 0, a, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
  

      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'carré':
          a = randint(-5, 5, [0])
          texte = 'Soit $f$ la fonction définie pour tout $x$ de $\\mathbb{R}$ par $f(x)=x^2$.<br>'
          texte += `Déterminer la valeur de  $f'(${a})$, en utilisant la définition de cours.`
          texteCorr = `Pour déterminer $f'(${a})$, `
          texteCorr += `on commence par calculer le taux de variation de $f$, <br> entre $${a}$ et $${a}+h$ , `
          texteCorr += 'noté $\\tau(h)$, où $h$ est un réel non-nul.<br>'
          texteCorr += `$\\begin{aligned}\\tau(h) &= \\dfrac{f(${a}+h)-f(${a})}{h}&\\text{Définition du taux de variation}\\\\`
          texteCorr += `&= \\dfrac{(${a}+h)^2-(${a})^2}{h}&\\text{Application à la fonction carré.}\\\\`
          texteCorr += `&= \\dfrac{${ecritureParentheseSiNegatif(a)}^2+2\\times${ecritureParentheseSiNegatif(a)}\\times h+h^2-${ecritureParentheseSiNegatif(a)}^2}{h}&\\text{Développement de l'identité remarquable.}\\\\`
          texteCorr += `&= \\dfrac{${a * a}${ecritureAlgebrique(2 * a)} h+h^2-${a * a}}{h}&\\text{Simplification au numérateur.}\\\\`

          texteCorr += `&= \\dfrac{${2 * a} h+h^2}{h}&\\text{Réduction au numérateur.}\\\\`
          texteCorr += `&= \\dfrac{h(${2 * a}+h)}{h}&\\text{Factorisation  par } h \\text{ au numérateur.}\\\\`
          texteCorr += `&=${2 * a} +h&\\text{Simplification par} h\\\\`
          texteCorr += '\\end{aligned}$'
          texteCorr += '<br>On cherche maintenant la limite du taux de variations quand $h$ tend vers $0$.'
          texteCorr += `<br>$\\lim\\limits_{h \\rightarrow 0} ${2 * a} +h=${2 * a} $`
          texteCorr += `<br>Comme la limite existe, on peut en déduire que $f$ est dérivable en $${a}$ <br>et`
          texteCorr += ` on peut conclure que $f'(${a})=${2 * a} $`

          break
        case 'inverse':
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
        case 'type3':
          texte = `Question ${i + 1} de type 3`
          texteCorr = `Correction ${i + 1} de type 3`
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
}
