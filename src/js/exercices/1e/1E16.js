import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { tableauDeVariation } from '../../modules/2d.js'
export const titre = 'Résoudre une inéquation du second degré'

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @author Stéphane Guyon
 * Référence 1E11
*/
export const uuid = '77bcc'
export const ref = '1E16'
export default function ResoudreEquationDegre2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre dans $\\mathbb{R}$ les inéquations suivantes.'
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.spacingCorr = 3
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions
    if (this.sup === 1) {
      listeTypeDeQuestions = combinaisonListes(['supérieur ou égal', 'supérieur ou égal', 'strictement supérieur', 'strictement supérieur', 'strictement supérieur', 'inférieur ou égal', 'inférieur ou égal', 'strictement inférieur', 'strictement inférieur', 'pasDeSolution1', 'pasDeSolution2', 'pasDeSolution3', 'pasDeSolution4'], this.nbQuestions)
    }

    for (let i = 0, texte, texteCorr, a, b, c, x1, x2, y1, k, ligne1, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      //* ***************************************************
      if (listeTypeDeQuestions[i] === 'strictement supérieur') {
        // k(x-x1)(x-x2)
        x1 = randint(-5, 2, [0])
        x2 = randint(x1 + 1, 5, [0, -x1])
        k = randint(-4, 4, [0])
        a = k
        b = -k * x1 - k * x2
        c = k * x1 * x2
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}>0$`
        texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        texteCorr += '<br>On cherche à résoudre $P(x)>0$.'
        texteCorr += '<br>Pour cela, on cherche ses racines éventuelles.'
        texteCorr += `<br>$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta>0$ donc le polynôme admet deux racines : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
        texteCorr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x1}$`
        texteCorr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x2}$`
        texteCorr += '<br>On sait qu\'un polynôme du second degré est du signe de $a$ à l\'extérieur de ses racines.'
        texteCorr += `<br>Comme $a=${a}`
        if (a > 0) {
          texteCorr += '>0$'

          ligne1 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]
          // '' indique qu'il n'y a rien à afficher dans un tableau de signes (pour laisser un espace sous la borne par exemple)
          // 'z' pour avoir un zéro sur des pointillés, 't' pour juste les pointillés, 'd' pour des double barres
          // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

        // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
        } else {
          texteCorr += '<0$'
          ligne1 = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20]
        }
        texteCorr += '<br>On en déduit le signe du polynôme dans un tableau de signes :'
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -4.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
              ['$x$', 2, 30], [`$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`, 2, 50]],
            // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
            ['$-\\infty$', 30, `${x1}`, 20, `${x2}`, 20, '$+\\infty$', 30]
          ],
          // tabLines ci-dessous contient les autres lignes du tableau.
          tabLines: [ligne1],
          colorBackground: '',
          espcl: 3.5, // taille en cm entre deux antécédents
          deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
          lgt: 8, // taille de la première colonne en cm
          hauteurLignes: [12, 15]
        }))
        if (a > 0) { texteCorr += `<br>On en déduit que $S=]-\\infty;${x1}[\\cup]${x2};+\\infty[$` } else { texteCorr += `<br> On en déduit que $S=]${x1};${x2}[$` }
      }
      //* ********************************************************
      if (listeTypeDeQuestions[i] === 'supérieur ou égal') {
        // k(x-x1)(x-x2)
        x1 = randint(-5, 2, [0])
        x2 = randint(x1 + 1, 5, [0, -x1])
        k = randint(-4, 4, [0])
        a = k
        b = -k * x1 - k * x2
        c = k * x1 * x2
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}\\geq 0$`
        texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        texteCorr += '<br>On cherche à résoudre $P(x)\\geq 0$.'
        texteCorr += '<br>Pour cela, on cherche ses racines éventuelles.'
        texteCorr += `<br>$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta>0$ donc  le polynôme admet deux racines : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
        texteCorr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x1}$`
        texteCorr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x2}$`
        texteCorr += '<br>On sait qu\'un polynôme du second degré est du signe de $a$ à l\'extérieur de ses racines.'
        texteCorr += `<br>Comme $a=${a}`
        if (a > 0) {
          texteCorr += '>0$.'

          ligne1 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]
          // '' indique qu'il n'y a rien à afficher dans un tableau de signes (pour laisser un espace sous la borne par exemple)
          // 'z' pour avoir un zéro sur des pointillés, 't' pour juste les pointillés, 'd' pour des double barres
          // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

        // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
        } else {
          texteCorr += `<0$, on peut dire que $P(x)\\geq 0$ sur $S=]-\\infty;${x1}]\\cup[${x2};+\\infty[$`
          ligne1 = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20]
        }
        texteCorr += '<br>On peut résumer le signe du polynôme dans un tableau de signes :'
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -3.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
              ['$x$', 2, 30], [`$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`, 2, 50]],
            // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
            ['$-\\infty$', 30, `${x1}`, 20, `${x2}`, 20, '$+\\infty$', 30]
          ],
          // tabLines ci-dessous contient les autres lignes du tableau.
          tabLines: [ligne1],
          colorBackground: '',
          espcl: 3.5, // taille en cm entre deux antécédents
          deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
          lgt: 8, // taille de la première colonne en cm
          hauteurLignes: [10, 10]
        }))
        if (a > 0) { texteCorr += `<br>On en déduit que $S=]-\\infty;${x1}]\\cup[${x2};+\\infty[$` } else { texteCorr += `<br> On en déduit que $S=[${x1};${x2}]$` }
      }
      //* ******************************************************************
      if (listeTypeDeQuestions[i] === 'inférieur ou égal') {
        // k(x-x1)(x-x2)
        x1 = randint(-5, 2, [0])
        x2 = randint(x1 + 1, 5, [0, -x1])
        k = randint(-4, 4, [0])
        a = k
        b = -k * x1 - k * x2
        c = k * x1 * x2
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}\\leq 0$`
        texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        texteCorr += '<br>On cherche à résoudre $P(x)\\leq 0$.'
        texteCorr += '<br>Pour cela, on cherche ses racines éventuelles.'
        texteCorr += `<br>$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta>0$ donc  le polynôme admet deux racines : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
        texteCorr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x1}$`
        texteCorr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x2}$`
        texteCorr += '<br>On sait qu\'un polynôme du second degré est du signe de $a$ à l\'extérieur de ses racines.'
        texteCorr += `<br>Comme $a=${a}`
        if (a > 0) {
          texteCorr += '>0 :$'

          ligne1 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]
          // '' indique qu'il n'y a rien à afficher dans un tableau de signes (pour laisser un espace sous la borne par exemple)
          // 'z' pour avoir un zéro sur des pointillés, 't' pour juste les pointillés, 'd' pour des double barres
          // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

        // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
        } else {
          texteCorr += '<0 :$'
          ligne1 = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20]
        }
        texteCorr += '<br>On peut résumer le signe du polynôme dans un tableau de signes :'
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -4.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
              ['$x$', 2, 30], [`$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`, 2, 50]],
            // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
            ['$-\\infty$', 30, `${x1}`, 20, `${x2}`, 20, '$+\\infty$', 30]
          ],
          // tabLines ci-dessous contient les autres lignes du tableau.
          tabLines: [ligne1],
          colorBackground: '',
          espcl: 3.5, // taille en cm entre deux antécédents
          deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
          lgt: 8, // taille de la première colonne en cm
          hauteurLignes: [15, 15]
        }))
        if (a < 0) { texteCorr += `<br>On en déduit que $S=]-\\infty;${x1}]\\cup[${x2};+\\infty[$` } else { texteCorr += `<br> On en déduit que $S=[${x1};${x2}]$` }
      }
      //* **************************************
      if (listeTypeDeQuestions[i] === 'strictement inférieur') {
        // k(x-x1)(x-x2)
        x1 = randint(-5, 2, [0])
        x2 = randint(x1 + 1, 5, [0, -x1])
        k = randint(-4, 4, [0])
        a = k
        b = -k * x1 - k * x2
        c = k * x1 * x2
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}< 0$`
        texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        texteCorr += '<br>On cherche à résoudre $P(x)< 0$.'
        texteCorr += '<br>Pour cela, on cherche ses racines éventuelles.'
        texteCorr += `<br>$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta>0$ donc le polynôme admet deux racines : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
        texteCorr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x1}$`
        texteCorr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x2}$`
        texteCorr += '<br>On sait qu\'un polynôme du second degré est du signe de $a$ à l\'extérieur de ses racines.'
        texteCorr += `<br>Comme $a=${a}`
        if (a > 0) {
          texteCorr += '>0 :$'

          ligne1 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]
          // '' indique qu'il n'y a rien à afficher dans un tableau de signes (pour laisser un espace sous la borne par exemple)
          // 'z' pour avoir un zéro sur des pointillés, 't' pour juste les pointillés, 'd' pour des double barres
          // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

        // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
        } else {
          texteCorr += '<0 :$'
          ligne1 = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20]
        }
        texteCorr += '<br>On peut résumer le signe du polynôme dans un tableau de signes :'
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -4.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
              ['$x$', 2, 30], [`$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`, 2, 50]],
            // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
            ['$-\\infty$', 30, `${x1}`, 20, `${x2}`, 20, '$+\\infty$', 30]
          ],
          // tabLines ci-dessous contient les autres lignes du tableau.
          tabLines: [ligne1],
          colorBackground: '',
          espcl: 3.5, // taille en cm entre deux antécédents
          deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
          lgt: 8, // taille de la première colonne en cm
          hauteurLignes: [15, 15]
        }))
        if (a < 0) { texteCorr += `<br>On en déduit que $S=]-\\infty;${x1}[\\cup]${x2};+\\infty[$` } else { texteCorr += `<br> On en déduit que $S=]${x1};${x2}[$` }
      }
      //* *************************************************************
      if (listeTypeDeQuestions[i] === 'pasDeSolution1') {
        k = randint(1, 5)
        x1 = randint(-3, 3, [0])
        y1 = randint(1, 5)
        if (choice(['+', '-']) === '+') { // k(x-x1)^2 + y1 avec k>0 et y1>0
          a = k
          b = -2 * k * x1
          c = k * x1 * x1 + y1
        } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
          a = -k
          b = 2 * k * x1
          c = -k * x1 * x1 - y1
        }
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}< 0$`
        if (b === 0) {
          texte = `$${rienSi1(a)}x^2${ecritureAlgebrique(c)}< 0$`
        }
        texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        if (b === 0) {
          texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=$${rienSi1(a)}x^2${ecritureAlgebrique(c)}$`
        }
        texteCorr += '<br>On cherche à résoudre $P(x)< 0$.'
        texteCorr += '<br>Pour cela, on cherche ses racines éventuelles.'
        texteCorr += `<br>$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta<0$ donc le polynôme $P$ n\'admet pas de racine.'
        texteCorr += `<br> Il est toujours du signe de $a=${a}`
        if (a > 0) {
          texteCorr += '>0$, donc $P(x)>0$ pour tout $x$ de $\\mathbb{R}$.'
          texteCorr += '<br> On en déduit $S=\\emptyset$.'
        } else {
          texteCorr += '<0$, donc $P(x)<0$ pour tout $x$ de $\\mathbb{R}$.'
          texteCorr += '<br> On en déduit $S=\\mathbb{R}$.'
        }
      }
      //* *******************************
      if (listeTypeDeQuestions[i] === 'pasDeSolution2') {
        k = randint(1, 5)
        x1 = randint(-3, 3, [0])
        y1 = randint(1, 5)
        if (choice(['+', '-']) === '+') { // k(x-x1)^2 + y1 avec k>0 et y1>0
          a = k
          b = -2 * k * x1
          c = k * x1 * x1 + y1
        } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
          a = -k
          b = 2 * k * x1
          c = -k * x1 * x1 - y1
        }
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}\\leq 0$`
        if (b === 0) {
          texte = `$${rienSi1(a)}x^2${ecritureAlgebrique(c)}\\leq0$`
        }
        texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        if (b === 0) {
          texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=$${rienSi1(a)}x^2${ecritureAlgebrique(c)}$`
        }
        texteCorr += '<br>On cherche à résoudre $P(x)\\leq 0$.'
        texteCorr += '<br>Pour cela, on cherche ses racines éventuelles.'
        texteCorr += `<br>$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta<0$ donc le polynôme $P$ n\'admet pas de racine.'
        texteCorr += `<br> Il est toujours du signe de $a=${a}`
        if (a > 0) {
          texteCorr += '>0$, donc $P(x)>0$ pour tout $x$ de $\\mathbb{R}$.'
          texteCorr += '<br> On en déduit $S=\\emptyset$.'
        } else {
          texteCorr += '<0$, donc $P(x)<0$ pour tout $x$ de $\\mathbb{R}$.'
          texteCorr += '<br> On en déduit $S=\\mathbb{R}$.'
        }
      }
      //* ************************************************ */
      if (listeTypeDeQuestions[i] === 'pasDeSolution3') {
        k = randint(1, 5)
        x1 = randint(-3, 3, [0])
        y1 = randint(1, 5)
        if (choice(['+', '-']) === '+') { // k(x-x1)^2 + y1 avec k>0 et y1>0
          a = k
          b = -2 * k * x1
          c = k * x1 * x1 + y1
        } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
          a = -k
          b = 2 * k * x1
          c = -k * x1 * x1 - y1
        }
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}\\geq 0$`
        if (b === 0) {
          texte = `$${rienSi1(a)}x^2${ecritureAlgebrique(c)}\\geq0$`
        }
        texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        if (b === 0) {
          texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=$${rienSi1(a)}x^2${ecritureAlgebrique(c)}$`
        }
        texteCorr += '<br>On cherche à résoudre $P(x)\\geq 0$.'
        texteCorr += '<br>Pour cela, on cherche ses racines éventuelles.'
        texteCorr += `<br>$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta<0$ donc le polynôme $P$ n\'admet pas de racine.'
        texteCorr += `<br> Il est toujours du signe de $a=${a}`
        if (a < 0) {
          texteCorr += '<0$, donc $P(x)<0$ pour tout $x$ de $\\mathbb{R}$.'
          texteCorr += '<br> On en déduit $S=\\emptyset$.'
        } else {
          texteCorr += '>0$, donc $P(x)>0$ pour tout $x$ de $\\mathbb{R}$.'
          texteCorr += '<br> On en déduit $S=\\mathbb{R}$.'
        }
      }
      if (listeTypeDeQuestions[i] === 'pasDeSolution4') {
        k = randint(1, 5)
        x1 = randint(-3, 3, [0])
        y1 = randint(1, 5)
        if (choice(['+', '-']) === '+') { // k(x-x1)^2 + y1 avec k>0 et y1>0
          a = k
          b = -2 * k * x1
          c = k * x1 * x1 + y1
        } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
          a = -k
          b = 2 * k * x1
          c = -k * x1 * x1 - y1
        }
        texte = `$${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}> 0$`
        if (b === 0) {
          texte = `$${rienSi1(a)}x^2${ecritureAlgebrique(c)}> 0$`
        }
        texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
        if (b === 0) {
          texteCorr = `Soit $P$ le polynôme défini pour tout $x$ de $\\mathbb R$ par $P(x)=$${rienSi1(a)}x^2${ecritureAlgebrique(c)}$`
        }
        texteCorr += '<br>On cherche à résoudre $P(x)> 0$.'
        texteCorr += '<br>Pour cela, on cherche ses racines éventuelles.'
        texteCorr += `<br>$\\Delta = ${ecritureParentheseSiNegatif(b)}^2-4\\times${ecritureParentheseSiNegatif(a)}\\times${ecritureParentheseSiNegatif(c)}=${b * b - 4 * a * c}$`
        texteCorr += '<br>$\\Delta<0$ donc le polynôme $P$ n\'admet pas de racine.'
        texteCorr += `<br> Il est toujours du signe de $a=${a}`
        if (a > 0) {
          texteCorr += '>0$, donc $P(x)>0$ pour tout $x$ de $\\mathbb{R}$.'
          texteCorr += '<br> On en déduit $S=\\mathbb{R}$.'
        } else {
          texteCorr += '<0$, donc $P(x)<0$ pour tout $x$ de $\\mathbb{R}$.'
          texteCorr += '<br> On en déduit $S=\\emptyset$.'
        }
      }
      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Solutions entières\n2 : Solutions réelles et calcul du discriminant non obligatoire']
}
