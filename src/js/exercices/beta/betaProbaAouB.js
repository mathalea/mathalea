import { not } from 'mathjs'
import { listeQuestionsToContenu, randint, combinaisonListes, choice, texFraction, texFractionReduite } from '../../modules/outils.js'

import Exercice from '../Exercice.js'
export const titre = '2S30-6' // Probabilité A ou B dans situation concrète

const multiple = (n, d) => n % d == 0
const impair = (n, _) => n % 2   // ou not(multiple(n,2))
const pair = (n, _) => !(n % 2)
const inf = (n, d) => n < d
const sup = (n, d) => n > d
const egal = (n, d) => n == d
const choixFnct = [
    [multiple,'multiple de',2], 
    [impair,'impair',1], 
    [pair,'pair',1],
    [inf,'strictement inférieur à',2], 
    [sup,'strictement supérieur à',2], 
    [egal,'égal à',2]
]

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Pour chaque expérience, calculer $P(A)$, $P(B)$, $P(A\\cap B)$ et $P(A\\cup B)$'
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

    for (let i = 0, texte, texteCorr, n,a,b,faces,res_a,res_b,nb_a,nb_b,res_aEtb,nb_aEtb,res_aOub,nb_aOub, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
       n = choice([4,6,8,10,12,20]) // nb de faces du dé
       faces = Array(n).fill(0).map((_,i) => 1 + i)   // [1, 2,..., n]
       a = [choice(choixFnct),randint(2,n)]
       b = [choice(choixFnct),randint(2,n)]
       res_a = faces.filter(v => a[0][0](v, a[1]))
       nb_a = res_a.length
       res_b = faces.filter(v => b[0][0](v, b[1]))
       nb_b = res_b.length
       res_aEtb = res_a.filter(v => b[0][0](v, b[1]))
       nb_aEtb = res_aEtb.length
       res_aOub = faces.filter(v => a[0][0](v, a[1]) || b[0][0](v, b[1]))
       nb_aOub = res_aOub.length

      switch (listeTypeDeQuestions[i]) { 
        case 'type1': 

          // Enoncé                     
          texte = `On lance un dé équilibré à $${n}$ faces. On considère les 2 événements :<br>` 
          texte += `$A$ = "Obtenir un résultat ${a[0][1]} ${a[0][2] == 2 ? a[1] : ''}"<br>` 
          texte += `$B$ = "Obtenir un résultat ${b[0][1]} ${b[0][2] == 2 ? b[1] : ''}"`
          
         break
        
      }
      texteCorr = `Les résultats possibles (appelés <b>éventualités</b>) du lancer d'un dé à ${n} faces sont les nombres entiers entre $1$ à $${n}$<br>`
      texteCorr += `L'événement $A$ = "Obtenir un résultat ${a[0][1]} ${a[0][2] == 2 ? a[1] : ''}" est constitué de $${nb_a}$ éventualité${nb_a > 1 ? 's' : ''} : $${res_a.toString()}$<br>`
      texteCorr += `L'événement $B$ = "Obtenir un résultat ${b[0][1]} ${b[0][2] == 2 ? b[1] : ''}" est constitué de $${nb_b}$ éventualité${nb_b > 1 ? 's' : ''} : $${res_b.toString()}$<br>`
      texteCorr += `On en déduit que $P(A) = ${nb_a} \\times ${texFraction(1, n)} = ${texFractionReduite(nb_a, n)}$<br>`
      texteCorr += `Et $P(B) = ${nb_b} \\times ${texFraction(1, n)} = ${texFractionReduite(nb_b, n)}$<br>`
      texteCorr += `$A\\cap B$ est l'intersection des événements $A$ et $B$, c'est-à-dire les éventualités appartenant à la fois à $A$ et à $B$<br>`
      if (nb_aEtb == 0) {
        texteCorr += `Il n'y en a aucune (on dit que $A$ et $B$ sont <b>incompatibles</b>). Donc $P(A\\cap B) = 0$<br>`
      } else {
        texteCorr += `Il y a $${nb_aEtb}$ éventualité${nb_aEtb > 1 ? 's' : ''} : $${res_aEtb.toString()}$<br>`
        texteCorr += `Donc $P(A\\cap B) = ${nb_aEtb} \\times ${texFraction(1, n)} = ${texFractionReduite(nb_aEtb, n)}$<br>`
      }
      texteCorr += `Comme $P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$, on en déduit que :<br>`
      texteCorr += `$P(A\\cup B) = ${texFractionReduite(nb_a, n)} + ${texFractionReduite(nb_b, n)} - ${texFractionReduite(nb_aEtb, n)} = ${texFractionReduite(nb_aOub, n)}$`

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
