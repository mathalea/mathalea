import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texFraction, texNombre, arrondi, texNombrec } from '../../modules/outils.js'
import { latexParCoordonnees, mathalea2d, point, segment } from '../../modules/2d.js'
export const titre = 'Nom de l\'exercice'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function ProbabilitésConditionnelles () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.besoinFormulaireCaseACocher = ['Probabilités fractionnaires', false]
  this.sup = false
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let objets
    const typeQuestionsDisponibles = ['type1'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, v, av, A, B, A1, A2, A3, A4, O, k1, k2, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      objets = []
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          a = randint(30, 70)// p(A)
          v = randint(30, 70)// P_T(V)

          av = randint(20, a - 5)// P(A \cap V)
          // ici on économise des variables qui ne servent qu'une fois en les stoquant dans un tableau. (Jean-Claude Lhote)
          O = point(0.6, 2.3)
          A = point(5, 5)
          B = point(5, 1)
          A1 = point(9, 7.5)
          A2 = point(9, 4)
          A3 = point(9, 3)
          A4 = point(9, 0)
          // On met les segments d'abord pour ne pas qu'ils passent par dessus le texte.(Jean-Claude Lhote)
          objets.push(segment(O, A, 'blue'))
          objets.push(segment(O, B, 'blue'))
          objets.push(segment(A, A1, 'blue'))
          objets.push(segment(A, A2, 'blue'))
          objets.push(segment(B, A3, 'blue'))
          objets.push(segment(B, A4, 'blue'))
          objets.push(latexParCoordonnees('A', 5, 5.2, 'black', 20, 12, 'white', 10)) // 1er noeud Avion) = A
          objets.push(latexParCoordonnees('\\bar A', 5, 1.3, 'black', 20, 12, 'white', 10))// 1er noeud événement contraire \bar A
          objets.push(latexParCoordonnees('\\Omega', 0, 2.3))// Univers, point de départ de l'arbre Omega
          if (this.sup) {
            objets.push(latexParCoordonnees(`\\dfrac{${a}}{100}`, 2.5, 4.1, 'black', 20, 20, 'white', 6))// proba de A, ici ${a}
            objets.push(latexParCoordonnees(`\\dfrac{${100 - a}}{100}`, 2.5, 2.1, 'black', 20, 20, 'white', 6))// proba de \\bar A 1-${a}
            objets.push(latexParCoordonnees(`\\dfrac{${100 - v}}{100}`, 6.8, 6.8, 'black', 20, 20, 'white', 6))// proba de B sachant A
            objets.push(latexParCoordonnees(`\\dfrac{${v}}{100}`, 6.8, 4.9, 'black', 20, 20, 'white', 6))// proba de B sachant A  \\bar A
          } else {
            objets.push(latexParCoordonnees(texNombrec(a / 100), 2.5, 4, 'black', 20, 12, 'white', 6))
            objets.push(latexParCoordonnees(texNombrec(1 - a / 100), 2.5, 2, 'black', 20, 12, 'white', 6))
            objets.push(latexParCoordonnees(texNombrec(1 - v / 100), 6.8, 6.5, 'black', 20, 12, 'white', 6))
            objets.push(latexParCoordonnees(texNombrec(v / 100), 6.8, 4.8, 'black', 20, 12, 'white', 6))
          }

          objets.push(latexParCoordonnees('B', 9, 7.7, 'black', 20, 12, 'white', 10)) // 2ème noeud issu de A
          objets.push(latexParCoordonnees('\\bar B', 9, 4.3, 'black', 20, 12, 'white', 10))// 2ème noeud issu de A
          objets.push(latexParCoordonnees('B', 9, 3.1, 'black', 20, 12, 'white', 10)) // 2ème noeud issu de \bar A
          objets.push(latexParCoordonnees('\\bar B', 9, 0.2, 'black', 20, 12, 'white', 10))// 2ème noeud issu de \bar A

          // p2 = texteParPoint(Number(1 - a / 100).toString(), pA1)
          // p3 = texteParPoint((1 - v / 100).toString(), pA2)
          // p4 = texteParPoint(Number(v / 100).toString(), pA3)
          // Il manque le 2ème noeud avec  V et \\bar V

          texte = 'Une agence de voyage propose deux formules week-end pour se rendre à Londres depuis Paris.'
          texte += '<br> Les clients choisissent leur moyen de transport : train ou avion.'
          texte += '<br> De plus, s\'ils le souhaitent, ils peuvent compléter leur formule par l\'option "visites guidées".'
          texte += '<br> Une étude a produit les données suivantes:'
          texte += `<br> $\\bullet~~ ${a}$% des clients optent pour l'avion;`
          texte += `<br> $\\bullet~~$ Parmi   les clients ayant choisi le train, $${v}$ % choisissent aussi l'option "visites guidées".`
          texte += `<br> $\\bullet~~ ${av}$% des clients ont choisi à la fois l'avion et l'option "visites guidées".<br>`
          texte += '<br> On interroge au hasard un client de l\'agence ayant souscrit à une formule week-end à Londres.'
          texte += '<br> On considère les évènements suivants:'
          texte += '<br> $\\bullet~~$ $A$ :  le client a choisi l\'avion.'
          texte += '<br> $\\bullet~~$ $V$ : le client a choisi l\'option "visites guidées".<br>'
          texte += '<br> 1. Déterminer $P_A(V)$.'
          texte += `<br> 2.  Démontrer que la probabilité pour que le client interrogé ait choisi l'option "visites guidées" est égale à $${texNombre(av / 100 + (1 - a / 100) * v / 100)}$.`
          texte += '<br> 3. Calculer la probabilité pour que le client interrogé ait pris l\'avion sachant qu\'il n\'a pas choisi l\'option "visites guidées". Arrondir le résultat au centième.'
          texte += '<br> 4. On interroge au hasard deux clients de manière aléatoire et indépendante.'
          texte += '<br> Quelle est la probabilité qu\'aucun des deux ne prennent l\'option "visites guidées" ?'
          texteCorr = '1. De l\'énoncé on déduit que :'
          texteCorr += `<br> $P(A)=${a / 100}$`
          texteCorr += `<br> $P_{\\bar{A}}(V)=${v / 100}$`
          texteCorr += `<br> $P(A \\cap V)=${av / 100}$`
          texteCorr += `<br>On a donc $P_{A}(V)=\\dfrac{P(A \\cap V)}{P(A)}=\\dfrac{${av / 100}}{${a / 100}}=${texFraction(av, a)} $.`
          texteCorr += '<br><br>2. Comme $A$ et $\\bar A$ forment une partition de l\'univers, d\'après la loi des probabilités totales :'
          texteCorr += ' <br>$P(V)=P(A \\cap V)+P(\\bar{A} \\cap V) . $'
          texteCorr += ' <br>On peut construire cet arbre pondéré : <br>'
          // texteCorr += mathalea2d({ xmin: -5, ymin: -1, xmax: 12, ymax: 7 }, objets)
          texte = mathalea2d({ xmin: -5, ymin: -1, xmax: 12, ymax: 8 }, objets)
          texteCorr += `<br>Or $P(\\bar{A} \\cap V)=P(\\bar{A}) \\times P_{\\bar{A}}(V)=(1-${a / 100}) \\times ${v / 100}=${texNombre((1 - a / 100) * v / 100)}$.`
          texteCorr += `<br>Donc $P(V)=${av / 100}+${(1 - a / 100) * v / 100}=${texNombre(av / 100 + (1 - a / 100) * v / 100)}$.`
          texteCorr += '<br><br>3. On a $P_{\\bar{V}}(A)=\\dfrac{P(\\bar{V} \\cap A)}{P(\\bar{V})}=\\dfrac{P(A \\cap \\bar{V})}{P(\\bar{V})}=\\dfrac{P(A) \\times P_A(\\bar{V})}{P(\\bar{V})}$.'
          texteCorr += `<br>Or d'après la question précédente: $P(\\bar{V})=1-P(V)=1-${texNombre(av / 100 + (1 - a / 100) * v / 100)}=${texNombre(1 - (av / 100 + (1 - a / 100) * v / 100))}$`
          texteCorr += `<br>et d'après la question $1: P_{A}(\\bar{V})=1-P_{A}(V)=1-${texFraction(av, a)}=${texFraction(a - av, a)}$.`
          k1 = (a - av) / a
          k2 = 1 - (av / 100 + (1 - a / 100) * v / 100)
          texteCorr += `<br>Donc $P_{\\bar{V}}(A)=\\dfrac{${a / 100} \\times ${texFraction(a - av, a)}}{${texNombre(k2)}} \\approx ${arrondi(((a / 100) * k1) / k2)}$.`
          texteCorr += `<br><br>4. On a vu que $P(\\bar{V})=1-${k2}=${1 - k2}$.`
          texteCorr += '<br>Comme les deux événements sont indépendants, en les appelant $\\bar {V_1}$ et $\\bar{V_2}$, on a : $P(\\bar{V_1}\\cap\\bar{V_2})=P(\\bar{V_1})\\times P(\\bar{V_2})$'
          texteCorr += `<br>La probabilité cherchée est donc égale à $P(\\bar{V_1}\\cap\\bar{V_2})=${1 - k2} \\times ${1 - k2}\\approx ${arrondi((1 - k2) ** 2)}$.`

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

// permet de repérer les points A et C sur la droite (AC)
