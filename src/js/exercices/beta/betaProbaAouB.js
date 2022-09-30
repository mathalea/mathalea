import { listeQuestionsToContenu, randint, combinaisonListes, choice, texFraction, texFractionReduite } from '../../modules/outils.js'
import { context } from '../../modules/context.js'
import Exercice from '../Exercice.js'
export const titre = '2S30-6' // Probabilité A ou B dans situation concrète

const multiple = (n, d) => n % d === 0
const impair = (n, _) => n % 2 // ou not(multiple(n,2))
const pair = (n, _) => !(n % 2)
const inf = (n, d) => n < d
const sup = (n, d) => n > d
const egal = (n, d) => n === d
const choixFnct = [
  [multiple, 'multiple de', 2], // besoin de 2 paramètres pour "est multiple de..."
  [impair, 'impair', 1], // 1 seul paramètre
  [pair, 'pair', 1],
  [inf, 'strictement inférieur à', 2],
  [sup, 'strictement supérieur à', 2],
  [egal, 'égal à', 2]
]

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence
*/
export default function CalculDeProbabilitesAvecDeuxEnsemblesAetB () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Pour chaque expérience, calculer $P(A)$, $P(B)$, $P(A\\cap B)$ et $P(A\\cup B)$'
  this.nbQuestions = 2
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1)
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const typesDeQuestionsDisponibles = ['type1']
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texteCorr, n, a, b, faces, resA, resB, nbA, nbB, resAEtB, nbAEtB, resAOuB, nbAOuB, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      n = choice([4, 6, 8, 10, 12, 20]) // nb de faces du dé
      faces = Array(n).fill(0).map((_, i) => 1 + i) // [1, 2,..., n]
      a = [choice(choixFnct), randint(2, n - 1)] // choix de la fonction à utiliser (multiple, impair...) et du paramètre éventuel
      b = [choice(choixFnct), randint(2, n - 1)]
      resA = faces.filter(v => a[0][0](v, a[1])) // Eléments vérifiant A
      nbA = resA.length // Cardinal de A
      resB = faces.filter(v => b[0][0](v, b[1])) // Eléments vérifiant B
      nbB = resB.length
      resAEtB = resA.filter(v => b[0][0](v, b[1])) // Eléments vérifiant A et B
      nbAEtB = resAEtB.length
      resAOuB = faces.filter(v => a[0][0](v, a[1]) || b[0][0](v, b[1])) // Eléments vérifiant A ou B
      nbAOuB = resAOuB.length

      switch (listeTypeDeQuestions[i]) {
        case 'type1':

          // Enoncé
          texte = `On lance un dé équilibré à $${n}$ faces numéroté de 1 à $${n}$. On considère les 2 événements :<br>`
          texte += `$A$ = "Obtenir un résultat ${a[0][1]} ${a[0][2] === 2 ? a[1] : ''}"<br>`
          texte += `$B$ = "Obtenir un résultat ${b[0][1]} ${b[0][2] === 2 ? b[1] : ''}"`

          break
      }
      texteCorr = `Les $\\textbf{\\text{issues}}$ possibles (appelées aussi $\\textbf{\\text{événements élémentaires}}$) du lancer d'un dé à ${n} faces sont les nombres entiers entre $1$ à $${n}$. `
      texteCorr += `L'$\\textbf{\\text{univers}}$ est  $\\Omega = \\{1,2,${n > 4 ? '...' : 3},${n}\\}$<br>`
      texteCorr += `L'$\\textbf{\\text{événement}}$ $A$ = "Obtenir un résultat ${a[0][1]} ${a[0][2] === 2 ? a[1] : ''}" est constitué de l'${nbA > 1 ? `ensemble des $${nbA}$ ` : ''}issue${nbA > 1 ? 's' : ''} : $${resA.toString()}$<br>`
      texteCorr += `L'$\\textbf{\\text{événement}}$ $B$ = "Obtenir un résultat ${b[0][1]} ${b[0][2] === 2 ? b[1] : ''}" est constitué de l'${nbB > 1 ? `ensemble des $${nbB}$ ` : ''}issue${nbB > 1 ? 's' : ''} : $${resB.toString()}$<br>`
      texteCorr += `Comme $A=\\{${resA.toString()}\\}$ et $B=\\{${resB.toString()}\\}$, on en déduit que :<br>`
      texteCorr += `$P(A) = ${nbA} \\times ${texFraction(1, n)} = ${texFractionReduite(nbA, n)}$<br>`
      texteCorr += `$P(B) = ${nbB} \\times ${texFraction(1, n)} = ${texFractionReduite(nbB, n)}$<br>`
      texteCorr += '$A\\cap B$ est l\'intersection des événements $A$ et $B$, c\'est-à-dire les issues appartenant à la fois à $A$ et à $B$<br>'
      if (nbAEtB === 0) {
        texteCorr += 'Il n\'y en a aucune (on dit que $A$ et $B$ sont $\\textbf{\\text{incompatibles}}$). Donc $P(A\\cap B) = 0$<br>'
      } else {
        texteCorr += `Il y a ${nbAEtB > 1 ? `${nbAEtB} issues` : 'une seule issue'} : $A\\cap B=\\{${resAEtB.toString()}\\}$<br>`
        texteCorr += `Donc $P(A\\cap B) = ${nbAEtB} \\times ${texFraction(1, n)} = ${texFractionReduite(nbAEtB, n)}$<br>`
      }
      texteCorr += 'Comme $P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$, on en déduit que :<br>'
      texteCorr += `$P(A\\cup B) = ${texFractionReduite(nbA, n)} + ${texFractionReduite(nbB, n)} - ${texFractionReduite(nbAEtB, n)} = ${texFractionReduite(nbAOuB, n)}$`

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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]
}
