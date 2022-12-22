import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, combinaisonListes, choice, randint, abs, sp } from '../../modules/outils.js'
import { tableauDeVariation } from '../../modules/TableauDeVariation.js'
export const titre = 'Utiliser les variations des fonctions de référence pour comparer ou encadrer'
export const dateDePublication = '31/01/2022'
/**
 * Description didactique de l'exercice
 * @author Gilles Mora
 * Référence
*/
export const uuid = '1ca05'
export const ref = '2F31-2'
export default function EncadrerAvecFctRef () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 3
  // this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 4
  context.isHtml ? this.spacing = 2 : this.spacing = 1
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.listePackages = ['tkz-tab']
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['carré']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['inverse']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['racine carrée']
    } else if (this.sup === 4) {
      typeDeQuestionsDisponibles = ['carré', 'inverse', 'racine carrée']
    }
    // c = choice([2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26])
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, b, ligne1, ligne1b, N, choix, choix1, choix2, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'carré':
          N = choice([1, 2, 3, 4, 5])

          if (N === 1) { // cas x<a avec a<0 ou a>0
            a = randint(-12, 12, 0)
            choix = choice([true, false])
            ligne1 = ['Var', 10, '+/', 10, `-/$${a ** 2}$`, 10]
            ligne1b = ['Var', 10, '+/', 10, '-/$0$', 10, `+/$${a ** 2}$`, 10]
            texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $x^2$ ......`
            texteCorr = `$x${choix ? '\\leqslant' : ' < '} ${a}$ signifie $x\\in ]-\\infty;${a}${choix ? ']' : ' [ '}$. <br>
                Puisque la fonction carré est strictement décroissante sur $]-\\infty;0]$ et strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                    sur l'intervalle $]-\\infty;${a}]$ : <br>
                `
            if (a < 0) {
              texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1 }, tableauDeVariation({
                tabInit: [
                  [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                    ['$x$', 2, 10], ['$x^2$', 4, 30]
                  ],
                  // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                  ['$-\\infty$', 10, `$${a}$`, 10]
                ],
                // tabLines ci-dessous contient les autres lignes du tableau.
                tabLines: [ligne1],
                colorBackground: '',
                espcl: 3, // taille en cm entre deux antécédents
                deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                lgt: 3, // taille de la première colonne en cm
                hauteurLignes: [15, 15]
              }))

              texteCorr += `<br>On constate que le minimum de $x^2$ sur $]-\\infty;${a}]$ est $${a ** 2}$. <br>
            On en déduit que si  $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $x^2\\geqslant ${a ** 2}$.
            <br> Remarque :  la fonction carré étant strictement décroissante sur $]-\\infty;0]$, elle change l'ordre.<br>
            Ainsi les antécédents et les images sont rangées dans l'ordre inverse : <br>
            Si $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $x^2\\geqslant (${a})^2$ soit $x^2\\geqslant ${a ** 2}$.
        `
            } else {
              texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1.2 }, tableauDeVariation({
                tabInit: [
                  [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                    ['$x$', 2, 10], ['$x^2$', 4, 30]
                  ],
                  // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                  ['$-\\infty$', 10, '$0$', 10, `$${a}$`, 10]
                ],
                // tabLines ci-dessous contient les autres lignes du tableau.
                tabLines: [ligne1b],
                colorBackground: '',
                espcl: 3, // taille en cm entre deux antécédents
                deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                lgt: 3, // taille de la première colonne en cm
                hauteurLignes: [15, 15]
              }))

              texteCorr += `<br>On constate que le minimum de $x^2$ sur $]-\\infty;${a}]$ est $0$. <br>
        On en déduit que si  $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $x^2\\geqslant 0$.
        
    `
            }
          }
          if (N === 2) { // cas x>a
            a = randint(-12, 12, 0)
            choix = choice([true, false])
            ligne1 = ['Var', 10, `-/$${a ** 2}$`, 10, '+/', 10]
            ligne1b = ['Var', 10, `+/$${a ** 2}$`, 10, '-/$0$', 10, '+/', 10]
            texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $x^2$ ......`
            texteCorr = `$x${choix ? '\\geqslant' : ' > '} ${a}$ signifie $x\\in ${choix ? '[' : ' ] '}${a};+\\infty[$. <br>
                Puisque la fonction carré est strictement décroissante sur $]-\\infty;0]$ et strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                    sur l'intervalle $[${a};+\\infty[$ : <br>
                `
            if (a > 0) {
              texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1.2 }, tableauDeVariation({
                tabInit: [
                  [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                    ['$x$', 2, 10], ['$x^2$', 4, 30]
                  ],
                  // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                  [`$${a}$`, 10, '$+\\infty$', 10]
                ],
                // tabLines ci-dessous contient les autres lignes du tableau.
                tabLines: [ligne1],
                colorBackground: '',
                espcl: 3, // taille en cm entre deux antécédents
                deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                lgt: 3, // taille de la première colonne en cm
                hauteurLignes: [15, 15]
              }))

              texteCorr += `<br>On constate que le minimum de $x^2$ sur $[${a};+\\infty[$ est $${a ** 2}$. <br>
            On en déduit que si  $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $x^2${choix ? '\\geqslant' : ' > '} ${a ** 2}$.
            <br> Remarque :  la fonction carré étant strictement croissante sur $[0;+\\infty[$, elle conserve l'ordre sur cet intervalle.<br>
            Ainsi les antécédents et les images sont rangées dans le même ordre : <br>
          Si  $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $x^2${choix ? '\\geqslant' : ' > '} ${a}^2$ soit  $x^2${choix ? '\\geqslant' : ' > '} ${a ** 2}$.`
            } else {
              texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1.2 }, tableauDeVariation({
                tabInit: [
                  [
                    // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                    ['$x$', 2, 10], ['$x^2$', 4, 30]
                  ],
                  // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                  [`$${a}$`, 10, '$0$', 10, '$+\\infty$', 10]
                ],
                // tabLines ci-dessous contient les autres lignes du tableau.
                tabLines: [ligne1b],
                colorBackground: '',
                espcl: 3, // taille en cm entre deux antécédents
                deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                lgt: 3, // taille de la première colonne en cm
                hauteurLignes: [15, 15]
              }))

              texteCorr += `<br>On constate que le minimum de $x^2$ sur $[${a};+\\infty[$ est $0$. <br>
          On en déduit que si  $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $x^2\\geqslant 0$.
          `
            }
          }
          if (N === 3) { // cas a<x<b avec a>0
            a = randint(1, 10)
            b = randint(a + 1, 12)
            choix1 = choice([true, false])
            choix2 = choice([true, false])
            ligne1 = ['Var', 10, `-/$${a ** 2}$`, 10, `+/$${b ** 2}$`, 10]
            texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(3)} .......  $x^2$ ........`
            texteCorr = `$${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${choix1 ? '[' : ' ] '}${a};${b}${choix2 ? ']' : ' [ '}$. <br>
                  Puisque la fonction carré est strictement décroissante sur $]-\\infty;0]$ et strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                      sur l'intervalle $[${a};${b}]$ : <br>
                  `
            texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1.2 }, tableauDeVariation({
              tabInit: [
                [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                  ['$x$', 2, 10], ['$x^2$', 4, 30]
                ],
                // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                [`$${a}$`, 10, `$${b}$`, 10]
              ],
              // tabLines ci-dessous contient les autres lignes du tableau.
              tabLines: [ligne1],
              colorBackground: '',
              espcl: 3, // taille en cm entre deux antécédents
              deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
              lgt: 3, // taille de la première colonne en cm
              hauteurLignes: [15, 15]
            }))

            texteCorr += `<br>On constate que le minimum de $x^2$ sur $[${a};${b}]$  est $${a ** 2}$ et son maximum est $${b ** 2}$. <br>
              On en déduit que si  $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(2)}$${a ** 2} ${choix1 ? '\\leqslant' : ' < '} x^2 ${choix2 ? '\\leqslant' : ' < '}${b ** 2}$.
              <br> Remarque : la fonction carré étant strictement croissante sur $[0;+\\infty[$, elle conserve l'ordre sur cet intervalle.<br>
              Ainsi les antécédents et les images sont rangées dans le même ordre : <br>
            Si  $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors $${sp(2)}${a}^2 ${choix1 ? '\\leqslant' : ' < '} x^2 ${choix2 ? '\\leqslant' : ' < '}${b}^2$, soit $${sp(2)}${a ** 2} ${choix1 ? '\\leqslant' : ' < '} x^2 ${choix2 ? '\\leqslant' : ' < '}${b ** 2}$.
            
            `
          }
          if (N === 4) { // cas a<x<b avec b<0
            a = -randint(2, 12)
            b = randint(a + 1, -1)
            choix1 = choice([true, false])
            choix2 = choice([true, false])
            ligne1 = ['Var', 10, `+/$${a ** 2}$`, 10, `-/$${b ** 2}$`, 10]
            texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(3)} .......  $x^2$  .......`
            texteCorr = `$${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${choix1 ? '[' : ' ] '}${a};${b}${choix2 ? ']' : ' [ '}$. <br>
                      Puisque la fonction carré est strictement décroissante sur $]-\\infty;0]$ et strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                          sur l'intervalle $[${a};${b}]$ : <br>
                      `
            texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1.2 }, tableauDeVariation({
              tabInit: [
                [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                  ['$x$', 2, 10], ['$x^2$', 4, 30]
                ],
                // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                [`$${a}$`, 10, `$${b}$`, 10]
              ],
              // tabLines ci-dessous contient les autres lignes du tableau.
              tabLines: [ligne1],
              colorBackground: '',
              espcl: 3, // taille en cm entre deux antécédents
              deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
              lgt: 3, // taille de la première colonne en cm
              hauteurLignes: [15, 15]
            }))

            texteCorr += `<br>On constate que le minimum de $x^2$ sur $[${a};${b}]$  est $${b ** 2}$ et son maximum est $${a ** 2}$. <br>
                  On en déduit que si  $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(2)}$${b ** 2} ${choix2 ? '\\leqslant' : ' < '} x^2 ${choix1 ? '\\leqslant' : ' < '}${a ** 2}$.
                  <br> Remarque :  la fonction carré étant strictement décroissante sur $]-\\infty;0]$, elle change l'ordre sur cet intervalle.<br>
                  Ainsi les antécédents et les images sont rangées dans l'ordre inverse : <br>
            Si $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(2)}$(${a})^2 ${choix1 ? '\\geqslant' : ' > '} x^2 ${choix2 ? '\\geqslant' : ' > '}(${b})^2$ soit $${a ** 2} ${choix1 ? '\\geqslant' : ' > '} x^2 ${choix2 ? '\\geqslant' : ' > '}${b ** 2}$.`
          }

          if (N === 5) { // cas a<x<b avec a<0 et b>0
            a = randint(-10, -1)
            b = randint(1, 10)
            choix1 = choice([true, false])
            choix2 = choice([true, false])
            ligne1 = ['Var', 10, `+/$${a ** 2}$`, 10, '-/$0$', 10, `+/$${b ** 2}$`, 10]
            texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(3)} .......  $x^2$ ........`
            texteCorr = `$${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${choix1 ? '[' : ' ] '}${a};${b}${choix2 ? ']' : ' [ '}$. <br>
                  Puisque la fonction carré est strictement décroissante sur $]-\\infty;0]$ et strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                      sur l'intervalle $[${a};${b}]$ : <br>
                  `
            texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1.2 }, tableauDeVariation({
              tabInit: [
                [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                  ['$x$', 2, 10], ['$x^2$', 4, 30]
                ],
                // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                [`$${a}$`, 10, '$0$', 10, `$${b}$`, 10]
              ],
              // tabLines ci-dessous contient les autres lignes du tableau.
              tabLines: [ligne1],
              colorBackground: '',
              espcl: 3, // taille en cm entre deux antécédents
              deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
              lgt: 3, // taille de la première colonne en cm
              hauteurLignes: [15, 15]
            }))
            if (abs(a) > abs(b)) {
              texteCorr += `<br>On constate que le minimum de $x^2$ sur $[${a};${b}]$  est $0$ et son maximum est $${a ** 2}$. <br>
              On en déduit que si  $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(2)}$0 ${choix1 ? '\\leqslant' : ' < '} x^2 ${choix2 ? '\\leqslant' : ' < '}${a ** 2}$.
             
            `
            } else {
              texteCorr += `<br>On constate que le minimum de $x^2$ sur $[${a};${b}]$  est $0$ et son maximum est $${b ** 2}$. <br>
            On en déduit que si  $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(2)}$0 ${choix1 ? '\\leqslant' : ' < '} x^2 ${choix2 ? '\\leqslant' : ' < '}${b ** 2}$.
           
          `
            }
          }

          break
        case 'inverse':
          N = choice([1, 2, 3])

          if (N === 1) { // cas a<x<b avec a>0
            a = randint(2, 20)
            b = randint(a + 1, 20)
            choix1 = choice([true, false])
            choix2 = choice([true, false])
            ligne1 = ['Var', 10, `+/$\\dfrac{1}{${a}}$`, 10, `-/$\\dfrac{1}{${b}}$`, 10]
            texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(3)} .......  $\\dfrac{1}{x}$  .......`
            texteCorr = `$${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${choix1 ? '[' : ' ] '}${a};${b}${choix2 ? ']' : ' [ '}$. <br>
                      Puisque la fonction inverse est strictement décroissante sur $]-\\infty;0[$ et strictement décroissante sur $[0;+\\infty[$, on obtient son tableau de variations
                          sur l'intervalle $[${a};${b}]$ : <br>
                      `
            texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.7, zoom: 1.2 }, tableauDeVariation({
              tabInit: [
                [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                  ['$x$', 2, 10], ['$\\dfrac{1}{x}$', 4, 30]
                ],
                // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                [`$${a}$`, 10, `$${b}$`, 10]
              ],
              // tabLines ci-dessous contient les autres lignes du tableau.
              tabLines: [ligne1],
              colorBackground: '',
              espcl: 3, // taille en cm entre deux antécédents
              deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
              lgt: 3, // taille de la première colonne en cm
              hauteurLignes: [15, 15]
            }))

            texteCorr += `<br>On constate que le minimum de $\\dfrac{1}{x}$ sur $[${a};${b}]$  est $\\dfrac{1}{${b}}$ et son maximum est $\\dfrac{1}{${a}}$. <br>
                  On en déduit que si  $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(2)}$\\dfrac{1}{${b}} ${choix2 ? '\\leqslant' : ' < '} \\dfrac{1}{x} ${choix1 ? '\\leqslant' : ' < '}\\dfrac{1}{${a}}$.
                  <br> Remarque :  la fonction inverse étant strictement décroissante sur $]0; +\\infty[$, elle change l'ordre.<br>
                  Ainsi les antécédents et les images sont rangées dans l'ordre inverse : <br>
            Si $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(2)}$\\dfrac{1}{${a}} ${choix1 ? '\\geqslant' : ' > '} \\dfrac{1}{x} ${choix2 ? '\\geqslant' : ' > '}\\dfrac{1}{${b}}$ `
          }
          if (N === 2) { // cas a<x<b avec b<0
            a = randint(-20, -3)
            b = randint(a + 1, -2)
            choix1 = choice([true, false])
            choix2 = choice([true, false])
            ligne1 = ['Var', 10, `+/$-\\dfrac{1}{${-a}}$`, 10, `-/$-\\dfrac{1}{${-b}}$`, 10]
            texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(3)} .......  $\\dfrac{1}{x}$  .......`
            texteCorr = `$${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${choix1 ? '[' : ' ] '}${a};${b}${choix2 ? ']' : ' [ '}$. <br>
                      Puisque la fonction inverse est strictement décroissante sur $]-\\infty;0[$ et strictement décroissante sur $[0;+\\infty[$, on obtient son tableau de variations
                          sur l'intervalle $[${a};${b}]$ : <br>
                      `
            texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.7, zoom: 1.2 }, tableauDeVariation({
              tabInit: [
                [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                  ['$x$', 2, 10], ['$\\dfrac{1}{x}$', 4, 30]
                ],
                // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                [`$${a}$`, 10, `$${b}$`, 10]
              ],
              // tabLines ci-dessous contient les autres lignes du tableau.
              tabLines: [ligne1],
              colorBackground: '',
              espcl: 3, // taille en cm entre deux antécédents
              deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
              lgt: 3, // taille de la première colonne en cm
              hauteurLignes: [15, 15]
            }))

            texteCorr += `<br>On constate que le minimum de $\\dfrac{1}{x}$ sur $[${a};${b}]$  est $-\\dfrac{1}{${-b}}$ et son maximum est $-\\dfrac{1}{${-a}}$. <br>
                  On en déduit que si  $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(2)}$-\\dfrac{1}{${-b}} ${choix2 ? '\\leqslant' : ' < '} \\dfrac{1}{x} ${choix1 ? '\\leqslant' : ' < '}-\\dfrac{1}{${-a}}$.
                  <br> Remarque :  la fonction inverse étant strictement décroissante sur $]-\\infty;0[$, elle change l'ordre.<br>
                  Ainsi les antécédents et les images sont rangées dans l'ordre inverse : <br>
            Si $${a} ${choix1 ? '\\leqslant' : ' < '} x ${choix2 ? '\\leqslant' : ' < '}${b}$ alors ${sp(2)}$-\\dfrac{1}{${-a}} ${choix1 ? '\\geqslant' : ' > '} \\dfrac{1}{x} ${choix2 ? '\\geqslant' : ' > '}-\\dfrac{1}{${-b}}$ `
          }

          if (N === 3) { // cas x<a avec a<0 ou x>a aveca>0
            a = randint(-12, 12, [-1, 0, 1])
            choix = choice([true, false])
            ligne1 = ['Var', 10, '+/', 10, `-/$-\\dfrac{1}{${-a}}$`, 10]
            ligne1b = ['Var', 10, `+/$\\dfrac{1}{${a}}$`, 10, '-/', 10]

            if (a < 0) {
              texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $\\dfrac{1}{x}$ ......`
              texteCorr = `$x${choix ? '\\leqslant' : ' < '} ${a}$ signifie $x\\in ]-\\infty;${a}${choix ? ']' : ' [ '}$. <br>
              Puisque la fonction inverse est strictement décroissante sur $]-\\infty;0[$ et strictement décroissante sur $]0;+\\infty[$, on obtient son tableau de variations
                  sur l'intervalle $]-\\infty;${a}]$ : <br>
              `
              texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1.2 }, tableauDeVariation({
                tabInit: [
                  [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                    ['$x$', 2, 10], ['$\\dfrac{1}{x}$', 4, 30]
                  ],
                  // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                  ['$-\\infty$', 10, `$${a}$`, 10]
                ],
                // tabLines ci-dessous contient les autres lignes du tableau.
                tabLines: [ligne1],
                colorBackground: '',
                espcl: 3, // taille en cm entre deux antécédents
                deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                lgt: 3, // taille de la première colonne en cm
                hauteurLignes: [15, 15]
              }))

              texteCorr += `<br>On constate que le minimum de $\\dfrac{1}{x}$ sur $]-\\infty;${a}]$ est $-\\dfrac{1}{${-a}}$. <br>
            On en déduit que si  $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $\\dfrac{1}{x}${choix ? '\\geqslant' : ' > '} -\\dfrac{1}{${-a}}$.
            <br> Remarque :  la fonction inverse étant strictement décroissante sur $]-\\infty;0[$, elle change l'ordre.<br>
            Ainsi les antécédents et les images sont rangées dans l'ordre inverse : <br>
            Si $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $\\dfrac{1}{x}${choix ? '\\geqslant' : ' > '}-\\dfrac{1}{${-a}}$.
        `
            } else {
              texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $\\dfrac{1}{x}$ ......`
              texteCorr = `$x${choix ? '\\geqslant' : ' > '} ${a}$ signifie $x\\in ${choix ? '[' : ' ] '}${a};+\\infty[$. <br>
                Puisque la fonction inverse est strictement décroissante sur $]-\\infty;0[$ et strictement décroissante sur $]0;+\\infty[$, on obtient son tableau de variations
                    sur l'intervalle $[${a};+\\infty[$ : <br>
                `
              texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1.2 }, tableauDeVariation({
                tabInit: [
                  [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                    ['$x$', 2, 10], ['$\\dfrac{1}{x}$', 4, 30]
                  ],
                  // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                  [`$${a}$`, 10, '$+\\infty$', 10]
                ],
                // tabLines ci-dessous contient les autres lignes du tableau.
                tabLines: [ligne1b],
                colorBackground: '',
                espcl: 3, // taille en cm entre deux antécédents
                deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                lgt: 3, // taille de la première colonne en cm
                hauteurLignes: [15, 15]
              }))

              texteCorr += `<br>On constate que le maximum de $\\dfrac{1}{x}$ sur $[${a};+\\infty[$ est $\\dfrac{1}{${a}}$. <br>
        On en déduit que si  $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $\\dfrac{1}{x}${choix ? '\\leqslant' : ' < '} \\dfrac{1}{${a}}$.
        <br> Remarque :  la fonction inverse étant strictement décroissante sur $]0;+\\infty[$, elle change l'ordre.<br>
        Ainsi les antécédents et les images sont rangées dans l'ordre inverse : <br>
        Si  $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $\\dfrac{1}{x}${choix ? '\\leqslant' : ' < '} \\dfrac{1}{${a}}$.
    `
            }
          }

          break
        case 'racine carrée':
          N = choice([1, 2, 3])
          if (N === 1) { // cas x<a
            a = randint(0, 100)
            b = randint(0, 100)
            if (a === 0 || a === 1 || a === 4 || a === 9 || a === 16 || a === 25 || a === 36 || a === 49 || a === 64 || a === 81 || a === 100) {
              choix = choice([true, false])
              ligne1 = ['Var', 10, '-/$0$', 10, `+/$${Math.sqrt(a)}$`, 10]
              texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $\\sqrt{x}$ ......`
              texteCorr = `$x${choix ? '\\leqslant' : ' < '} ${a}$ signifie $x\\in [0;${a}${choix ? ']' : ' [ '}$ puisque $x\\geqslant 0$. <br>
             Puisque $\\sqrt{${a}}=${Math.sqrt(a)}$ et que la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                    sur l'intervalle $[0;${a}]$ : <br>
                `

              texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1 }, tableauDeVariation({
                tabInit: [
                  [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                    ['$x$', 2, 10], ['$\\sqrt{x}$', 4, 30]
                  ],
                  // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                  ['$0$', 10, `$${a}$`, 10]
                ],
                // tabLines ci-dessous contient les autres lignes du tableau.
                tabLines: [ligne1],
                colorBackground: '',
                espcl: 3, // taille en cm entre deux antécédents
                deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                lgt: 3, // taille de la première colonne en cm
                hauteurLignes: [15, 15]
              }))

              texteCorr += `<br>On constate que le maximum de $\\sqrt{x}$ sur $[0;${a}]$ est $${Math.sqrt(a)}$. <br>
            On en déduit que si  $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $\\sqrt{x}\\leqslant ${Math.sqrt(a)}$.
            <br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
            Ainsi les antécédents et les images sont rangées dans le même ordre : <br>
            Si $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $\\sqrt{x}${choix ? '\\leqslant' : ' < '} ${Math.sqrt(a)}$.
        `
            } else {
              choix = choice([true, false])
              ligne1 = ['Var', 10, '-/$0$', 10, `+/$\\sqrt{${a}}$`, 10]
              texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $\\sqrt{x}$ ......`
              texteCorr = `$x${choix ? '\\leqslant' : ' < '} ${a}$ signifie $x\\in [0;${a}${choix ? ']' : ' [ '}$ puisque $x\\geqslant 0$. <br>
                  Puisque la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                      sur l'intervalle $[0;${a}]$ : <br>
                  `

              texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1 }, tableauDeVariation({
                tabInit: [
                  [
                    // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                    ['$x$', 2, 10], ['$\\sqrt{x}$', 4, 30]
                  ],
                  // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                  ['$0$', 10, `$${a}$`, 10]
                ],
                // tabLines ci-dessous contient les autres lignes du tableau.
                tabLines: [ligne1],
                colorBackground: '',
                espcl: 3, // taille en cm entre deux antécédents
                deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                lgt: 3, // taille de la première colonne en cm
                hauteurLignes: [15, 15]
              }))

              texteCorr += `<br>On constate que le maximum de $\\sqrt{x}$ sur $[0;${a}]$ est $\\sqrt{${a}}$. <br>
              On en déduit que si  $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $\\sqrt{x}${choix ? '\\leqslant' : ' < '} \\sqrt{${a}}$.
              <br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
              Ainsi les antécédents et les images sont rangées dans le même ordre : <br>
              Si $x${choix ? '\\leqslant' : ' < '}${a}$ alors  $\\sqrt{x}${choix ? '\\leqslant' : ' < '} \\sqrt{${a}}$.
          `
            }
          }
          if (N === 2) { // cas x>a
            a = randint(0, 100)
            if (a === 0 || a === 1 || a === 4 || a === 9 || a === 16 || a === 25 || a === 36 || a === 49 || a === 64 || a === 81 || a === 100) {
              choix = choice([true, false])
              ligne1 = ['Var', 10, `-/$${Math.sqrt(a)}$`, 10, '+/', 10]
              texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $\\sqrt{x}$ ......`
              texteCorr = `$x${choix ? '\\geqslant' : ' > '} ${a}$ signifie $x\\in ${choix ? '[' : ' ] '}${a};+\\infty[$. <br>
                Puisque $\\sqrt{${a}}=${Math.sqrt(a)}$ et que la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                    sur l'intervalle $[${a};+\\infty[$ : <br>
                `

              texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1 }, tableauDeVariation({
                tabInit: [
                  [
                  // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                    ['$x$', 2, 10], ['$\\sqrt{x}$', 4, 30]
                  ],
                  // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                  [`$${a}$`, 10, '$+\\infty$', 10]
                ],
                // tabLines ci-dessous contient les autres lignes du tableau.
                tabLines: [ligne1],
                colorBackground: '',
                espcl: 3, // taille en cm entre deux antécédents
                deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                lgt: 3, // taille de la première colonne en cm
                hauteurLignes: [15, 15]
              }))

              texteCorr += `<br>On constate que le minimum de $\\sqrt{x}$ sur $[${a};+\\infty[$ est $${Math.sqrt(a)}$. <br>
            On en déduit que si  $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $\\sqrt{x}\\geqslant ${Math.sqrt(a)}$.
            <br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
            Ainsi les antécédents et les images sont rangées dans le même ordre : <br>
            Si $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $\\sqrt{x}${choix ? '\\geqslant' : ' > '} ${Math.sqrt(a)}$.
        `
            } else {
              choix = choice([true, false])
              ligne1 = ['Var', 10, `-/$\\sqrt{${a}}$`, 10, '+/', 10]
              texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $\\sqrt{x}$ ......`
              texteCorr = `$x${choix ? '\\geqslant' : ' > '} ${a}$ signifie $x\\in ${choix ? '[' : ' ] '}${a};+\\infty[$. <br>
                  Puisque la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                      sur l'intervalle $[${a};+\\infty[$ : <br>
                  `

              texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1 }, tableauDeVariation({
                tabInit: [
                  [
                    // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                    ['$x$', 2, 10], ['$\\sqrt{x}$', 4, 30]
                  ],
                  // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                  [`$${a}$`, 10, '$+\\infty$', 10]
                ],
                // tabLines ci-dessous contient les autres lignes du tableau.
                tabLines: [ligne1],
                colorBackground: '',
                espcl: 3, // taille en cm entre deux antécédents
                deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                lgt: 3, // taille de la première colonne en cm
                hauteurLignes: [15, 15]
              }))

              texteCorr += `<br>On constate que le minimum de $\\sqrt{x}$ sur $[${a};+\\infty[$ est $\\sqrt{${a}}$. <br>
              On en déduit que si  $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $\\sqrt{x}${choix ? '\\geqslant' : ' > '} \\sqrt{${a}}$.
              <br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
              Ainsi les antécédents et les images sont rangées dans le même ordre : <br>
              Si $x${choix ? '\\geqslant' : ' > '}${a}$ alors  $\\sqrt{x}${choix ? '\\geqslant' : ' > '} \\sqrt{${a}}$.
          `
            }
          }
          if (N === 3) { // cas a<x<b
            a = randint(0, 100)
            b = randint(a + 1, 100)
            if (a === 0 || a === 1 || a === 4 || a === 9 || a === 16 || a === 25 || a === 36 || a === 49 || a === 64 || a === 81 || a === 100) {
              if (b === 1 || b === 4 || b === 9 || b === 16 || b === 25 || b === 36 || b === 49 || b === 64 || b === 81 || b === 100) {
                choix = choice([true, false])
                ligne1 = ['Var', 10, `-/$${Math.sqrt(a)}$`, 10, `+/$${Math.sqrt(b)}$`, 10]
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a}${choix ? ' \\leqslant ' : ' < '} x ${choix ? '\\leqslant' : ' < '} ${b}$ alors  ...... $\\sqrt{x}$ ......`
                texteCorr = `$${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${choix ? '[' : ' ] '}${a};${b}${choix ? ']' : ' [ '}$. <br>
                Puisque $\\sqrt{${a}}=${Math.sqrt(a)}$ et $\\sqrt{${b}}=${Math.sqrt(b)}$ et que  la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                    sur l'intervalle $[${a};${b}]$ : <br>
                `

                texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1 }, tableauDeVariation({
                  tabInit: [
                    [
                      // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                      ['$x$', 2, 10], ['$\\sqrt{x}$', 4, 30]
                    ],
                    // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                    [`$${a}$`, 10, `$${b}$`, 10]
                  ],
                  // tabLines ci-dessous contient les autres lignes du tableau.
                  tabLines: [ligne1],
                  colorBackground: '',
                  espcl: 3, // taille en cm entre deux antécédents
                  deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                  lgt: 3, // taille de la première colonne en cm
                  hauteurLignes: [15, 15]
                }))

                texteCorr += `<br>On constate que le minimum de $\\sqrt{x}$ sur $[${a};${b}]$ est $${Math.sqrt(a)}$ et son maximum est $${Math.sqrt(b)}$. <br>
            On en déduit que si $${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ alors  $${Math.sqrt(a)}${choix ? '\\leqslant' : ' < '} \\sqrt{x} ${choix ? '\\leqslant' : ' < '}${Math.sqrt(b)}$.
            <br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
            Ainsi les antécédents et les images sont rangées dans le même ordre : <br>
            Si $${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ alors  $${Math.sqrt(a)}${choix ? '\\leqslant' : ' < '} \\sqrt{x} ${choix ? '\\leqslant' : ' < '}${Math.sqrt(b)}$.
        `
              } else {
                choix = choice([true, false])
                ligne1 = ['Var', 10, `-/$${Math.sqrt(a)}$`, 10, `+/$\\sqrt{${b}}$`, 10]
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a}${choix ? ' \\leqslant ' : ' < '} x ${choix ? '\\leqslant' : ' < '} ${b}$ alors  ...... $\\sqrt{x}$ ......`
                texteCorr = `$${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${choix ? '[' : ' ] '}${a};${b}${choix ? ']' : ' [ '}$. <br>
                Puisque $\\sqrt{${a}}=${Math.sqrt(a)}$  et que  la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                    sur l'intervalle $[${a};${b}]$ : <br>
                `

                texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1 }, tableauDeVariation({
                  tabInit: [
                    [
                      // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                      ['$x$', 2, 10], ['$\\sqrt{x}$', 4, 30]
                    ],
                    // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                    [`$${a}$`, 10, `$${b}$`, 10]
                  ],
                  // tabLines ci-dessous contient les autres lignes du tableau.
                  tabLines: [ligne1],
                  colorBackground: '',
                  espcl: 3, // taille en cm entre deux antécédents
                  deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                  lgt: 3, // taille de la première colonne en cm
                  hauteurLignes: [15, 15]
                }))

                texteCorr += `<br>On constate que le minimum de $\\sqrt{x}$ sur $[${a};${b}]$ est $${Math.sqrt(a)}$ et son maximum est $\\sqrt{${b}$. <br>
            On en déduit que si $${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ alors  $${Math.sqrt(a)}${choix ? '\\leqslant' : ' < '} \\sqrt{x} ${choix ? '\\leqslant' : ' < '}\\sqrt{${b}}$.
            <br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
            Ainsi les antécédents et les images sont rangées dans le même ordre : <br>
            Si $${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ alors  $${Math.sqrt(a)}${choix ? '\\leqslant' : ' < '} \\sqrt{x} ${choix ? '\\leqslant' : ' < '}\\sqrt{${b}}$.
        `
              }
            } else {
              if (b === 1 || b === 4 || b === 9 || b === 16 || b === 25 || b === 36 || b === 49 || b === 64 || b === 81 || b === 100) {
                choix = choice([true, false])
                ligne1 = ['Var', 10, `-/$\\sqrt{${a}}$`, 10, `+/$${Math.sqrt(b)}$`, 10]
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a}${choix ? ' \\leqslant ' : ' < '} x ${choix ? '\\leqslant' : ' < '} ${b}$ alors  ...... $\\sqrt{x}$ ......`
                texteCorr = `$${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${choix ? '[' : ' ] '}${a};${b}${choix ? ']' : ' [ '}$. <br>
                      Puisque $\\sqrt{${b}}=${Math.sqrt(b)}$  et que  la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                          sur l'intervalle $[${a};${b}]$ : <br>
                      `

                texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1 }, tableauDeVariation({
                  tabInit: [
                    [
                    // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                      ['$x$', 2, 10], ['$\\sqrt{x}$', 4, 30]
                    ],
                    // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                    [`$${a}$`, 10, `$${b}$`, 10]
                  ],
                  // tabLines ci-dessous contient les autres lignes du tableau.
                  tabLines: [ligne1],
                  colorBackground: '',
                  espcl: 3, // taille en cm entre deux antécédents
                  deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                  lgt: 3, // taille de la première colonne en cm
                  hauteurLignes: [15, 15]
                }))

                texteCorr += `<br>On constate que le minimum de $\\sqrt{x}$ sur $[${a};${b}]$ est $\\sqrt{${a}}$ et son maximum est $${Math.sqrt(b)}$. <br>
                  On en déduit que si $${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ alors  $\\sqrt{${a}}${choix ? '\\leqslant' : ' < '} \\sqrt{x} ${choix ? '\\leqslant' : ' < '}${Math.sqrt(b)}$.
                  <br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
                  Ainsi les antécédents et les images sont rangées dans le même ordre : <br>
                  Si $${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ alors  $\\sqrt{${a}}${choix ? '\\leqslant' : ' < '} \\sqrt{x} ${choix ? '\\leqslant' : ' < '}${Math.sqrt(b)}$.
              `
              } else {
                choix = choice([true, false])
                ligne1 = ['Var', 10, `-/$\\sqrt{${a}}$`, 10, `+/$\\sqrt{${b}}$`, 10]
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a}${choix ? ' \\leqslant ' : ' < '} x ${choix ? '\\leqslant' : ' < '} ${b}$ alors  ...... $\\sqrt{x}$ ......`
                texteCorr = `$${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${choix ? '[' : ' ] '}${a};${b}${choix ? ']' : ' [ '}$. <br>
                    Puisque  la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                        sur l'intervalle $[${a};${b}]$ : <br>
                    `

                texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1 }, tableauDeVariation({
                  tabInit: [
                    [
                    // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                      ['$x$', 2, 10], ['$\\sqrt{x}$', 4, 30]
                    ],
                    // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                    [`$${a}$`, 10, `$${b}$`, 10]
                  ],
                  // tabLines ci-dessous contient les autres lignes du tableau.
                  tabLines: [ligne1],
                  colorBackground: '',
                  espcl: 3, // taille en cm entre deux antécédents
                  deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
                  lgt: 3, // taille de la première colonne en cm
                  hauteurLignes: [15, 15]
                }))

                texteCorr += `<br>On constate que le minimum de $\\sqrt{x}$ sur $[${a};${b}]$ est $\\sqrt{${a}}$ et son maximum est $\\sqrt{${b}}$. <br>
                On en déduit que si $${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ alors  $\\sqrt{${a}}${choix ? '\\leqslant' : ' < '} \\sqrt{x} ${choix ? '\\leqslant' : ' < '}\\sqrt{${b}}$.
                <br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
                Ainsi les antécédents et les images sont rangées dans le même ordre : <br>
                Si $${a}${choix ? '\\leqslant' : ' < '} x ${choix ? '\\leqslant' : ' < '}${b}$ alors  $\\sqrt{${a}}${choix ? '\\leqslant' : ' < '} \\sqrt{x} ${choix ? '\\leqslant' : ' < '}\\sqrt{${b}}$.
            `
              }
            }
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
  this.besoinFormulaireNumerique = ['Choix des questions', 2, '1 : carré\n2 : inverse\n3 : racine carrée\n4 : mélange']
}
