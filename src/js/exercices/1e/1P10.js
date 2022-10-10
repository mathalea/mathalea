import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texFraction, arrondi, contraindreValeur, egalOuApprox } from '../../modules/outils.js'
import { number, fraction } from 'mathjs'
import { point } from '../../modules/2d/point.js'
import { segment } from '../../modules/2d/segment.js'
import { latexParCoordonnees } from '../../modules/2d/textes.js'
export const titre = 'Probabilités conditionnelles'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export const uuid = '9ccfd'
export const ref = '1P10'
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
  /**
   *
   * @param {Number} proba La probabilité à afficher
   * @param {Boolean} rationnel Si true alors // \\dfrac sinon 0,..
   * @returns la chaine latex pour écrire la proba.
   * version arrondie au millième
   */
  function texProba (proba, rationnel) {
    return rationnel ? fraction(arrondi(proba, 3)).toLatex().replace('frac', 'dfrac') : number(arrondi(proba, 3)).toString().replace('.', '{,}')
  }
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let objets
    let listeTypeDeQuestions
    this.sup2 = contraindreValeur(1, 3, this.sup2, 3)
    if (this.sup2 === 3) {
      listeTypeDeQuestions = combinaisonListes(['sujetE3C1', 'sujetE3C2'], this.nbQuestions)
    } else {
      listeTypeDeQuestions = combinaisonListes([`sujetE3C${this.sup2}`], this.nbQuestions)
    }

    // const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, c, ec, ce, v, av, A, B, A1, A2, A3, A4, O, k1, k2, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      objets = []
      switch (listeTypeDeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'sujetE3C1':
          a = randint(30, 70)// p(A)
          v = randint(30, 70)// P_T(V)

          av = randint(20, a - 5)// P(A \cap V)
          // ici on économise des variables qui ne servent qu'une fois en les stockant dans un tableau. (Jean-Claude Lhote)
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
          // if (this.sup) {
          objets.push(latexParCoordonnees(texProba(a / 100, this.sup), 2.5, 4.1, 'black', 20, 20, 'white', 6))// proba de A, ici ${a}
          objets.push(latexParCoordonnees(texProba(1 - a / 100, this.sup), 2.5, 2.1, 'black', 20, 20, 'white', 6))// proba de \\bar A 1-${a}
          // objets.push(latexParCoordonnees(`\\dfrac{${100 - v}}{100}`, 6.8, 6.8, 'black', 20, 20, 'white', 6))// proba de B sachant A
          // objets.push(latexParCoordonnees(`\\dfrac{${v}}{100}`, 6.8, 4.9, 'black', 20, 20, 'white', 6))// proba de \\bar B sachant A
          objets.push(latexParCoordonnees(texProba(1 - v / 100, this.sup), 6.8, 0.9, 'black', 20, 20, 'white', 6))// proba de \\bar B sachant \\bar A
          objets.push(latexParCoordonnees(texProba(v / 100, this.sup), 6.8, 2.7, 'black', 20, 20, 'white', 6))// proba de B sachant \\bar A
          objets.push(latexParCoordonnees(`P(A\\cap V)=${texProba(av / 100, this.sup)}`, 10.5, 7.8, 'red', 20, 20, 'white', 10))// proba de B \\cap A
          /*  } else {
            objets.push(latexParCoordonnees(texNombrec(a / 100), 2.5, 4, 'black', 20, 12, 'white', 6))
            objets.push(latexParCoordonnees(texNombrec(1 - a / 100), 2.5, 2, 'black', 20, 12, 'white', 6))
            // objets.push(latexParCoordonnees(texNombrec(1 - v / 100), 6.8, 6.5, 'black', 20, 12, 'white', 6))
            // objets.push(latexParCoordonnees(texNombrec(v / 100), 6.8, 4.8, 'black', 20, 12, 'white', 6))
            objets.push(latexParCoordonnees(texNombrec((100 - v) / 100), 6.8, 0.7, 'black', 20, 20, 'white', 6))// proba de \\bar B sachant \\bar A
            objets.push(latexParCoordonnees(texNombrec(v / 100), 6.8, 2.5, 'black', 20, 20, 'white', 6))// proba de B sachant \\bar A
            objets.push(latexParCoordonnees('P(A\\cap V)=', 10.5, 7.8, 'red', 20, 20, 'white', 10))// proba de B sachant \\bar A
            objets.push(latexParCoordonnees(texNombrec(av / 100), 14.5, 7.8, 'red', 20, 20, 'white', 10))// proba de B sachant \\bar A
          }
*/
          objets.push(latexParCoordonnees('V', 9, 7.7, 'black', 20, 12, 'white', 10)) // 2ème noeud issu de A
          objets.push(latexParCoordonnees('\\bar V', 9, 4.3, 'black', 20, 12, 'white', 10))// 2ème noeud issu de A
          objets.push(latexParCoordonnees('V', 9, 3.1, 'black', 20, 12, 'white', 10)) // 2ème noeud issu de \bar A
          objets.push(latexParCoordonnees('\\bar V', 9, 0.2, 'black', 20, 12, 'white', 10))// 2ème noeud issu de \bar A

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
          texte += `<br> 2.  Démontrer que la probabilité pour que le client interrogé ait choisi l'option "visites guidées" est environ égale à $${texProba(av / 100 + (1 - a / 100) * v / 100, false)}$.`
          texte += '<br> 3. Calculer la probabilité pour que le client interrogé ait pris l\'avion sachant qu\'il n\'a pas choisi l\'option "visites guidées". Arrondir le résultat au centième.'
          texte += '<br> 4. On interroge au hasard deux clients de manière aléatoire et indépendante.'
          texte += '<br> Quelle est la probabilité qu\'aucun des deux ne prennent l\'option "visites guidées" ?'
          texte += 'On donnera les résultats sous forme de valeurs approchées à $10^{-3}$ près.'
          texteCorr = '1. De l\'énoncé on déduit que :'
          texteCorr += `<br> $P(A)=${texProba(a / 100, this.sup)}$`
          texteCorr += `<br> $P_{\\bar{A}}(V)=${texProba(v / 100, this.sup)}$`
          texteCorr += `<br> $P(A \\cap V)=${texProba(av / 100, this.sup)}$`
          texteCorr += ' <br>On peut alors construire cet arbre pondéré : <br>'
          // texteCorr += mathalea2d({ xmin: -5, ymin: -1, xmax: 12, ymax: 7 }, objets)
          texteCorr += mathalea2d({ xmin: -5, ymin: -1, xmax: 18, ymax: 10 }, objets)
          texteCorr += `<br>On a donc $P_{A}(V)=\\dfrac{P(A \\cap V)}{P(A)}=\\dfrac{${texProba(av / 100, this.sup)}}{${texProba(a / 100, this.sup)}}=${texFraction(av, a)} $.`
          texteCorr += '<br><br>2. Comme $A$ et $\\bar A$ forment une partition de l\'univers, d\'après la loi des probabilités totales :'
          texteCorr += ' <br>$P(V)=P(A \\cap V)+P(\\bar{A} \\cap V) . $'

          texteCorr += `<br>Or $P(\\bar{A} \\cap V)=P(\\bar{A}) \\times P_{\\bar{A}}(V)=(1-${texProba(a / 100, this.sup)}) \\times ${texProba(v / 100, this.sup)}=${texProba((1 - a / 100) * v / 100, this.sup)}$.`
          texteCorr += `<br>Donc $P(V)=${texProba(av / 100, this.sup)}+${texProba((1 - a / 100) * v / 100, this.sup)}=${texProba(av / 100 + (1 - a / 100) * v / 100, this.sup)}$.`
          texteCorr += '<br><br>3. On a $P_{\\bar{V}}(A)=\\dfrac{P(\\bar{V} \\cap A)}{P(\\bar{V})}=\\dfrac{P(A \\cap \\bar{V})}{P(\\bar{V})}=\\dfrac{P(A) \\times P_A(\\bar{V})}{P(\\bar{V})}$.'
          texteCorr += `<br>Or d'après la question précédente: $P(\\bar{V})=1-P(V)=1-${texProba(av / 100 + (1 - a / 100) * v / 100, this.sup)}=${texProba(1 - (av / 100 + (1 - a / 100) * v / 100), this.sup)}$`
          texteCorr += `<br>et d'après la question $1: P_{A}(\\bar{V})=1-P_{A}(V)=1-${texFraction(av, a)}=${texFraction(a - av, a)}$.`
          k1 = (a - av) / a
          k2 = 1 - (av / 100 + (1 - a / 100) * v / 100)
          texteCorr += `<br>Donc $P_{\\bar{V}}(A)=\\dfrac{${texProba(a / 100, this.sup)} \\times ${texFraction(a - av, a)}}{${texProba(k2, this.sup)}} ${egalOuApprox((a / 100) * k1 / k2, 3)}${texProba(((a / 100) * k1) / k2, false)}$.`
          texteCorr += `<br><br>4. On a vu que $P(\\bar{V})=1-${texProba(k2, this.sup)}=${texProba(1 - k2, this.sup)}$.`
          texteCorr += '<br>Comme les deux événements sont indépendants, en les appelant $\\bar {V_1}$ et $\\bar{V_2}$, on a : $P(\\bar{V_1}\\cap\\bar{V_2})=P(\\bar{V_1})\\times P(\\bar{V_2})$'
          texteCorr += `<br>La probabilité cherchée est donc égale à $P(\\bar{V_1}\\cap\\bar{V_2})=${texProba(1 - k2, this.sup)} \\times ${texProba(1 - k2, this.sup)}\\approx${texProba((1 - k2) ** 2, false)}$.`
          break
        case 'sujetE3C2':
          c = randint(30, 70)// p(C)
          ec = randint(20, 95 - c)// P_\bar C(E)
          ce = randint(20, 95 - c)// P(E \cap C)
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
          objets.push(latexParCoordonnees('C', 5, 5.2, 'black', 20, 12, 'white', 10)) // 1er noeud  = C
          objets.push(latexParCoordonnees('\\bar C', 5, 1.3, 'black', 20, 12, 'white', 10))// 1er noeud événement contraire \bar C
          objets.push(latexParCoordonnees('\\Omega', 0, 2.3))// Univers, point de départ de l'arbre Omega
          // if (this.sup) {
          objets.push(latexParCoordonnees(texProba(c / 100, this.sup), 2.5, 4.1, 'black', 20, 20, 'white', 6))// proba de C, ici ${c}
          objets.push(latexParCoordonnees(texProba(1 - c / 100, this.sup), 2.5, 2.1, 'black', 20, 20, 'white', 6))// proba de \\bar C 1-${c}
          // objets.push(latexParCoordonnees(`\\dfrac{${100 - v}}{100}`, 6.8, 6.8, 'black', 20, 20, 'white', 6))// proba de B sachant A
          // objets.push(latexParCoordonnees(`\\dfrac{${v}}{100}`, 6.8, 4.9, 'black', 20, 20, 'white', 6))// proba de \\bar B sachant A
          objets.push(latexParCoordonnees(texProba(1 - ec / 100, this.sup), 6.8, 0.9, 'black', 20, 20, 'white', 6))// proba de \\bar E sachant \\bar C
          objets.push(latexParCoordonnees(texProba(ec / 100, this.sup), 6.8, 2.7, 'black', 20, 20, 'white', 6))// proba de E sachant \\bar C
          objets.push(latexParCoordonnees(`P(C\\cap E)=${texProba(ce / 100, this.sup)}`, 10.5, 7.8, 'red', 20, 20, 'white', 10))// proba de C \\cap E
          /*  } else {
            objets.push(latexParCoordonnees(texNombrec(a / 100), 2.5, 4, 'black', 20, 12, 'white', 6))
            objets.push(latexParCoordonnees(texNombrec(1 - a / 100), 2.5, 2, 'black', 20, 12, 'white', 6))
            // objets.push(latexParCoordonnees(texNombrec(1 - v / 100), 6.8, 6.5, 'black', 20, 12, 'white', 6))
            // objets.push(latexParCoordonnees(texNombrec(v / 100), 6.8, 4.8, 'black', 20, 12, 'white', 6))
            objets.push(latexParCoordonnees(texNombrec((100 - v) / 100), 6.8, 0.7, 'black', 20, 20, 'white', 6))// proba de \\bar B sachant \\bar A
            objets.push(latexParCoordonnees(texNombrec(v / 100), 6.8, 2.5, 'black', 20, 20, 'white', 6))// proba de B sachant \\bar A
            objets.push(latexParCoordonnees('P(A\\cap V)=', 10.5, 7.8, 'red', 20, 20, 'white', 10))// proba de B sachant \\bar A
            objets.push(latexParCoordonnees(texNombrec(av / 100), 14.5, 7.8, 'red', 20, 20, 'white', 10))// proba de B sachant \\bar A
          }
*/
          objets.push(latexParCoordonnees('E', 9, 7.7, 'black', 20, 12, 'white', 10)) // 2ème noeud issu de A
          objets.push(latexParCoordonnees('\\bar E', 9, 4.3, 'black', 20, 12, 'white', 10))// 2ème noeud issu de A
          objets.push(latexParCoordonnees('E', 9, 3.1, 'black', 20, 12, 'white', 10)) // 2ème noeud issu de \bar A
          objets.push(latexParCoordonnees('\\bar E', 9, 0.2, 'black', 20, 12, 'white', 10))// 2ème noeud issu de \bar A
          texte = 'Une chaîne de salons de coiffure propose à ses clients qui viennent pour une coupe deux prestations supplémentaires cumulables :'
          texte += '<br>$\\bullet$ Une coloration naturelle à base de plantes appelée "couleur-soin",'
          texte += '<br>$\\bullet$  Des mèches blondes pour donner du relief à la chevelure, appelées  "effet coup de soleil".'
          texte += `<br><br> Il apparaît que : <br>$\\diamond ~~ ${c}~\\%$ des clients demandent une "couleur-soin".`
          texte += `<br>$\\diamond ~~$Parmi ceux qui ne veulent pas de "couleur soin", $${ec}~\\%$ des clients demandent un "effet coup de soleil".`
          texte += `<br>$\\diamond ~~$ Par ailleurs, $${ce}\\%$ des clients demandent une "couleur soin" et un "effet coup de soleil" .`
          texte += '<br>On interroge un client au hasard.'
          texte += '<br>On notera $C$ l\'évènement : "Le client souhaite une "couleur-soin."'
          texte += '<br>On notera $E$ l\'évènement: "Le client souhaite un "effet coup de soleil."<br>'

          texte += '$1.$ Donner les valeurs de $P(C)$, $P( C \\cap E)$ et $P_{\\bar{C}}(E)$.<br>'
          texte += '$2.$ Calculer la probabilité que le client ne souhaite ni une "couleur-soin", ni un "effet coup de soleil".<br>'
          texte += '$3.$ Calculer la probabilité qu\'un client choisisse l\'"effet coup de soleil" sachant qu\'il a pris une "couleur soin".<br>'
          texte += `$4.$ Montrer que la probabilité de l'évènement $E$ est égale à $${texProba(ce / 100 + (1 - c / 100) * ec / 100, false)}$ (à $10^{-3}$ près).<br>`
          texte += '$5.$ Les évènements $C$ et $E$ sont-ils indépendants ?<br>'
          texte += 'On donnera les résultats sous forme de valeurs approchées à $10^{-3}$ près.'
          texteCorr = `1. D'après l'énoncé, on a :<br>$\\bullet~~P(C)=${texProba(c / 100, this.sup)}$.`
          texteCorr += `<br>$\\bullet~~P(C \\cap E)=${texProba(ce / 100, this.sup)}$.`
          texteCorr += `<br>$\\bullet~~P_{\\bar C}(E)=${texProba(ec / 100, this.sup)}$.`
          texteCorr += '<br>Ce qui permet de construire cet arbre de probabilités : '
          texteCorr += mathalea2d({ xmin: -5, ymin: -1, xmax: 18, ymax: 10 }, objets)
          texteCorr += '<br>$2.$ L\'événement  : le client ne souhaite ni une "couleur-soin", ni un "effet coup de soleil" correspond à $\\bar{C} \\cap \\bar{E}$'
          texteCorr += `<br>On a $P(\\bar{C} \\cap \\bar{E})=P(\\bar{C}) \\times P_{\\bar{C}}(\\bar{E})=P(\\bar{C}) \\times (1-P_{\\bar{C}}(E))=${texProba(1 - c / 100, false)} \\times ${texProba(1 - ec / 100, false)}\\approx ${texProba((1 - c / 100) * (1 - ec / 100), false)}$.`
          texteCorr += '<br>$3.$  La probabilité qu\'un client choisisse l\'"effet coup de soleil" sachant qu\'il a pris une "couleur soin" est $P_{C}(E)$.'
          texteCorr += '<br>On a alors d\'après l\'arbre pondéré :'
          texteCorr += `<br>$P(C) \\times P_{C}(E)=${texProba(c / 100, false)} \\times P_{C}(E)=${texProba(ce / 100, false)}$.`
          texteCorr += `<br>On en déduit que $P_{C}(E)=\\dfrac{${texProba(ce / 100, false)}}{${texProba(c / 100, false)}}\\approx${texProba(ce / c, false)}$.`
          texteCorr += '<br>$4.$   On cherche $P(E)$ qui est une probabilité totale.'
          texteCorr += '<br>Comme $C$ et $\\bar C$ forment une partition de l\'univers, on peut appliquer la loi des probabilités totales :'
          texteCorr += '<br>$P(E)=P(E \\cap C)+P(E \\cap \\bar{C} )$'
          texteCorr += `<br>$P(E)=${texProba(ce / 100, false)}+${texProba(1 - c / 100, false)}\\times ${texProba(ec / 100, false)}$`
          texteCorr += `<br>$P(E)\\approx${texProba(ce / 100 + (1 - c / 100) * ec / 100, false)}$`
          texteCorr += '<br>$5.$   Pour savoir si les évènements $C$ et $E$ sont-indépendants, on calcule séparément : '
          texteCorr += '<br>$P(C \\cap E)$ et $P(C) \\times P(E)$, pour tester s\'ils sont égaux.'
          texteCorr += `<br>On a $P(C \\cap E)=${texProba(ce / 100, false)}$ `
          texteCorr += `et $P(C) \\times P(E)\\approx${texProba(c / 100 * (ce / 100 + (1 - c / 100) * ec / 100), false)}$`
          texteCorr += '<br>On en déduit que les évènements $C$ et $E$ ne sont pas indépendants.'
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
  this.besoinFormulaire2Numerique = ['Choix d\'exercices : ', 3, '1 : Sujet 1 issu E3C\n2 : Sujet 2 issu E3C\n3 : Mélange']
}

// permet de repérer les points A et C sur la droite (AC)
