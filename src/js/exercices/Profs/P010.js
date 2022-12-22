import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { reduirePolynomeDegre3, calcul, texFractionSigne, fractionSimplifiee, listeQuestionsToContenu, printlatex, texNombre, xcas } from '../../modules/outils.js'
import { repere, courbe, segment, vecteur, rotation, translation, point, tracePoint } from '../../modules/2d.js'
import { tableauDeVariation } from '../../modules/TableauDeVariation'
export const titre = 'Étude de fonctions de degré 3'

/**
 * tableau de variation d'une fonction et tracé de la courbe (polynomes de degré <= 3)
 * @author Jean-Claude Lhote
 * Référence P010
*/
export default function VariationPolynomeDegre3 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = '-1/-2/3/1' // Niveau de difficulté
  this.sup2 = true
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.listePackages = 'tkz-tab'
  this.typeExercice = 'XCas'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    // un tableau correct en exemple
    // escpl=taille en cm entre deux antécédents, deltacl=distance entre la bordure et les premiers et derniers antécédents
    // lgt = taille de la première colonne tout est en cm
    // tabInit contient 2 tableaux
    // le premier contient des triplets [chaine d'entête,hauteur de ligne,nombre de pixels de largeur estimée du texte pour le centrage]
    // le deuxième contient une succession de chaines et de largeurs en pixels : ce sont les antécédent de la ligne d'entête
    // tabLines contient des tableaux de la forme ['type',...]
    // type est 'Line' pour une ligne de signes et valeurs. Les valeurs sont données avec à la suite leur largeur estimée en pixels.
    // type est 'Var' pour une ligne de variations. Les variations sont des chaines respectant une syntaxe particulière.
    // On intercale une largeur estimée pour le texte éventuel
    // Pour plus d'info sur le codage des variations, voir ce tuto : https://zestedesavoir.com/tutoriels/439/des-tableaux-de-variations-et-de-signes-avec-latex/
    // reste à faire les types 'Ima', 'Val' et 'Slope"

    let a; let b; let c; let a1; let b1; let c1; let xx; let xxs; let rac = []; let tableau; let x1s; let fx1s; let x3s; let x2s
    let delta, x1, x2, x3, X1, X3, XXs, minima, mafonction, maderivee, MaFonction, solutions
    let YMAXI, YMINI, XMINI, XMAXI, texte, scalex, scaley
    const coefF = this.sup.split('/')
    for (let i = 0; i < coefF.length; i++) {
      coefF[i] = parseFloat(coefF[i])
    }
    const vecteurs = []; let A; let B; let C; let tangente

    const trouverLesRacines = function (a0, b0, c0) { // Une fonction locale pour trouver les racines d'une équation du 2nd degré
      delta = b0 * b0 - 4 * a0 * c0 // on calcule les racines de f'
      if (delta < 0) {
        return []
      } else if (delta === 0) {
        return [-b0 / 2 / a0]
      }
      x1 = (-b0 - Math.sqrt(delta)) / 2 / a0
      x3 = (-b0 + Math.sqrt(delta)) / 2 / a0
      X1 = `(${-b0}-sqrt(${b0 * b0}-${4 * a0 * c0}))/${2 * a0}`
      X3 = `(${-b0}+sqrt(${b0 * b0}-${4 * a0 * c0}))/${2 * a0}`
      x1s = xcas(`simplify((${-b0}-sqrt(${delta}))/${2 * a0})`)
      x3s = xcas(`simplify((${-b0}+sqrt(${delta}))/${2 * a0})`)
      if (x3 < x1) { // on ordonne les racines de f'
        xx = x3
        xxs = x3s
        XXs = X3
        x3 = x1
        x3s = x1s
        X3 = X1
        x1 = xx
        x1s = xxs
        X1 = XXs
      }
      x1s = x1s.replace('(', '')
      x1s = x1s.replace(')', '')
      x3s = x3s.replace('(', '')
      x3s = x3s.replace(')', '')
      return [x1, x3, x1s, x3s, X1, X3]
    }
    a = parseFloat(coefF[0])
    b = parseFloat(coefF[1])
    c = parseFloat(coefF[2])
    const d = parseFloat(coefF[3])
    // [a, b, c, d] = coef_f //On récupère les coefficient du polynome
    const fxstring = `${reduirePolynomeDegre3(a, b, c, d)}`
    if (a !== 0) { // degré 3
      a1 = 3 * a
      b1 = 2 * b
      c1 = 1 * c
      // a2 = 6 * a
      mafonction = x => a * x ** 3 + b * x ** 2 + c * x + d
      MaFonction = `${a}*x^3+${b}*x^2+${c}x+${d}`
      maderivee = x => 3 * a * x ** 2 + 2 * b * x + c

      if (a < 0) {
        if (maderivee(-b / 3 / a) > 0) { // la dérivée croit jusqu'à un maximum >0 , il y a deux zéros donc négatif-positif-négatif
          rac = trouverLesRacines(a1, b1, c1)
          if (this.sup3) {
            tableau = tableauDeVariation({
              colorBackground: 'white',
              escpl: 5,
              delatcl: 0.8,
              lgt: 3.5,
              hauteurLignes: [30, 20, 30],
              tabInit: [[['$x$', 1.5, 30], ["$f'(x)$", 1, 60], ['$f(x)$', 1.5, 60]],
                ['$-\\infty$', 30, `$${rac[2]}$`, 70, `$${rac[3]}$`, 70, '$+\\infty$', 30]],
              tabLines:
              [['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20],
                ['Var', 10, '+/$+\\infty$', 30, `-/$${xcas(`simplifier(subst(${MaFonction},x=${rac[4]}))`)}$`, 90, `+/$${xcas(`simplifier(subst(${MaFonction},x=${rac[5]}))`)}$`, 90, '-/$-\\infty$', 30]
              ]
            })
          } else {
            tableau = tableauDeVariation({
              colorBackground: 'white',
              escpl: 5,
              delatcl: 0.8,
              lgt: 3.5,
              hauteurLignes: [30, 20, 30],
              tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 1.5, 25]],
                ['$-\\infty$', 30, `$${rac[2]}$`, 70, `$${rac[3]}$`, 70, '$+\\infty$', 30]],
              tabLines:
              [['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20],
                ['Var', 10, '+/$+\\infty$', 30, `-/$${texNombre(mafonction(rac[0]), 2)}$`, 50, `+/$${texNombre(mafonction(rac[1]), 2)}$`, 50, '-/$-\\infty$', 30]
              ]
            })
          }
          XMINI = Math.round(rac[0]) - 2
          XMAXI = Math.round(rac[1]) + 2
          YMINI = Math.min(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)), Math.round(mafonction(rac[0])), Math.round(mafonction(rac[1])))
          YMAXI = Math.max(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)), Math.round(mafonction(rac[0])), Math.round(mafonction(rac[1])))
          scalex = Math.abs(10 / (XMAXI - XMINI))
          scaley = 20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI)))
          A = point(rac[0] * scalex, mafonction(rac[0]) * scaley)
          B = translation(A, vecteur(1 * scalex, maderivee(rac[0]) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'blue')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
          A = point(rac[1] * scalex, mafonction(rac[1]) * scaley)
          B = translation(A, vecteur(1 * scalex, maderivee(rac[1]) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'blue')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
          A = point(-b / (3 * a) * scalex, mafonction(-b / (3 * a)) * scaley)
          vecteurs.push(tracePoint(A))
          B = translation(A, vecteur(1 * scalex, maderivee(-b / (3 * a)) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'red')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
        } else { //  la dérivée croit jusqu'à un maximum <0 , il n'y a pas de zéro donc négatif sur tout l'interval
          tableau = tableauDeVariation({
            colorBackground: 'white',
            escpl: 5,
            delatcl: 0.8,
            lgt: 3.5,
            hauteurLignes: [30, 20, 30],
            tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2, 25]],
              ['$-\\infty$', 30, '$+\\infty$', 30]],
            tabLines:
              [['Line', 30, '', 0, '-', 20],
                ['Var', 10, '+/$+\\infty$', 30, '-/$-\\infty$', 30]
              ]
          })
          XMINI = -4
          XMAXI = 4
          YMINI = Math.min(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)))
          YMAXI = Math.max(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)))
          scalex = Math.abs(10 / (XMAXI - XMINI))
          scaley = 20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI)))
          A = point(-b / (3 * a) * scalex, mafonction(-b / (3 * a)) * scaley)
          vecteurs.push(tracePoint(A))
          B = translation(A, vecteur(1 * scalex, maderivee(-b / (3 * a)) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'red')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
        }
      } else {
        if (maderivee(-b / 3 / a) > 0) { //  la dérivée décroit jusqu'à un minimum >0 , il n'y a pas de zéro donc positif sur tout l'interval
          tableau = tableauDeVariation({
            colorBackground: 'white',
            escpl: 3.5,
            deltacl: 0.6,
            lgt: 3.5,
            hauteurLignes: [30, 20, 30],
            tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
              ['$-\\infty$', 30, '$+\\infty$', 30]],
            tabLines:
              [['Line', 30, '', 0, '+', 20],
                ['Var', 20, '-/$-\\infty$', 30, '+/$+\\infty$', 30]
              ]
          })
          XMINI = -4
          XMAXI = 4
          YMINI = Math.min(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)))
          YMAXI = Math.max(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)))
          scalex = Math.abs(10 / (XMAXI - XMINI))
          scaley = 20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI)))
          A = point(-b / (3 * a) * scalex, mafonction(-b / (3 * a)) * scaley)
          vecteurs.push(tracePoint(A))
          B = translation(A, vecteur(1 * scalex, maderivee(-b / (3 * a)) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'red')
          tangente.styleExtremites = '<->' /
          vecteurs.push(tangente)
        } else { // la dérivée décroit jusqu'à un minimum <0 , il y a deux zéros donc positif-négatif-positif
          rac = trouverLesRacines(a1, b1, c1)
          if (this.sup3) {
            tableau = tableauDeVariation({
              colorBackground: 'white',
              escpl: 3.5,
              delatcl: 0.8,
              lgt: 3.5,
              tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
                ['$-\\infty$', 30, `$${texNombre(rac[0], 2)}$`, 60, `$${texNombre(rac[1], 2)}$`, 60, '$+\\infty$', 30]],
              tabLines:
              [['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20],
                ['Var', 10, '-/$-\\infty$', 30, `+/$${xcas(`simplifier(subst(${MaFonction},x=${rac[4]}))`)}$`, 90, `-/$${xcas(`simplifier(subst(${MaFonction},x=${rac[5]}))`)}$`, 90, '+/$+\\infty$', 30]
              ]
            })
          } else {
            tableau = tableauDeVariation({
              colorBackground: 'white',
              escpl: 3.5,
              delatcl: 0.8,
              lgt: 3.5,
              tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
                ['$-\\infty$', 30, `$${texNombre(rac[0], 2)}$`, 60, `$${texNombre(rac[1], 2)}$`, 60, '$+\\infty$', 30]],
              tabLines:
              [['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20],
                ['Var', 10, '-/$-\\infty$', 30, `+/$${texNombre(mafonction(rac[0]), 2)}$`, 50, `-/$${texNombre(mafonction(rac[1]), 2)}$`, 50, '+/$+\\infty$', 30]
              ]
            })
          }
          XMINI = Math.round(rac[0]) - 2
          XMAXI = Math.round(rac[1]) + 2
          YMINI = Math.min(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)), Math.round(mafonction(rac[0])), Math.round(mafonction(rac[1])))
          YMAXI = Math.max(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)), Math.round(mafonction(rac[0])), Math.round(mafonction(rac[1])))
          scalex = Math.abs(10 / (XMAXI - XMINI))
          scaley = 20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI)))
          A = point(rac[0] * scalex, mafonction(rac[0]) * scaley)
          B = translation(A, vecteur(1 * scalex, maderivee(rac[0]) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'blue')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
          A = point(rac[1] * scalex, mafonction(rac[1]) * scaley)
          B = translation(A, vecteur(1 * scalex, maderivee(rac[1]) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'blue')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
          A = point(-b / (3 * a) * scalex, mafonction(-b / (3 * a)) * scaley)
          vecteurs.push(tracePoint(A))
          B = translation(A, vecteur(1 * scalex, maderivee(-b / (3 * a)) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'red')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
        }
      }
    } else if (b !== 0) { // degré 2
      a = b
      b = c
      c = d
      mafonction = x => a * x ** 2 + b * x + c
      maderivee = x => 2 * a * x + b
      a1 = 2 * a
      b1 = b
      x1 = -b1 / a1
      x2 = -b / (a * 2)
      minima = (-b * b + 4 * a * c) / 4 / a
      if (b !== 0) {
        x2s = `${texFractionSigne(fractionSimplifiee(-b, 2 * a)[0], fractionSimplifiee(-b, 2 * a)[1])}`
      } else {
        x2s = '0'
      }
      fx1s = `${texFractionSigne(fractionSimplifiee(-b * b + 4 * a * c, 4 * a)[0], fractionSimplifiee(-b * b + 4 * a * c, 4 * a)[1])}`
      if (a > 0) {
        if (minima < 0) { // f(x)=0 a deux solutions
          rac = trouverLesRacines(a, b, c)
          tableau = tableauDeVariation({
            colorBackground: 'white',
            escpl: 3.5,
            delatcl: 0.8,
            lgt: 3.5,
            hauteurLignes: [20, 20, 20, 20, 20],
            tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
              ['$-\\infty$', 30, `$${rac[2]}$`, 60, `$${x2s}$`, 60, `$${rac[3]}$`, 60, '$+\\infty$', 30]],
            tabLines:
              [['Line', 30, 'R/', 0, 'R/', 0, '-', 20, 'R/', 0, 'z', 20, 'R/', 0, '+', 20, 'R/', 0],
                ['Var', 10, '+/$+\\infty$', 30, 'R/', 0, `-/$${fx1s}$`, 50, 'R/', 0, '+/$+\\infty$', 30],
                ['Ima', 1, 3, '$0$', 12],
                ['Ima', 3, 5, '$0$', 12]
              ]
          })
          XMINI = Math.round(x2 - 3)
          XMAXI = Math.round(x2 + 3)
          YMINI = Math.round(mafonction(x2)) - 2
          YMAXI = Math.max(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)), Math.round(mafonction(x2)))
          scalex = Math.abs(10 / (XMAXI - XMINI))
          scaley = 20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI)))
          A = point(x2 * scalex, mafonction(x2) * scaley)
          B = translation(A, vecteur(1 * scalex, maderivee(x2) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'blue')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
        } else if (minima > 0) { // f(x)=0 n'a pas de solution f(x)>0 pour tout x
          tableau = tableauDeVariation({
            colorBackground: 'white',
            escpl: 3.5,
            delatcl: 0.8,
            lgt: 3.5,
            hauteurLignes: [20, 20, 20, 20, 20],
            tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
              ['$-\\infty$', 30, `$${x2s}$`, 60, '$+\\infty$', 30]],
            tabLines:
              [['Line', 30, 'R/', 0, '-', 20, 'z', 20, '+', 20],
                ['Var', 10, '+/$+\\infty$', 30, `-/$${fx1s}$`, 50, '+/$+\\infty$', 30]
              ]
          })
          XMINI = Math.round(x2) - 3
          XMAXI = Math.round(x2) + 3
          YMINI = -10
          YMAXI = Math.max(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)), Math.round(mafonction(x2)))
          scalex = Math.abs(10 / (XMAXI - XMINI))
          scaley = 20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI)))
          A = point(x2 * scalex, mafonction(x2) * scaley)
          B = translation(A, vecteur(1 * scalex, maderivee(x2) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'blue')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
        } else { // f(x)=0 a une solution unique : minima=0
          tableau = tableauDeVariation({
            colorBackground: 'white',
            escpl: 3.5,
            delatcl: 0.8,
            lgt: 3.5,
            hauteurLignes: [20, 20, 20, 20, 20],
            tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
              ['$-\\infty$', 30, `$${x2s}$`, 60, '$+\\infty$', 30]],
            tabLines:
              [['Line', 30, 'R/', 0, '-', 20, 'z', 20, '+', 20],
                ['Var', 10, '+/$+\\infty$', 30, '-/$0$', 50, '+/$+\\infty$', 30]
              ]
          })
          XMINI = Math.round(x2) - 3
          XMAXI = Math.round(x2) + 3
          YMINI = -10
          YMAXI = Math.max(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)), Math.round(mafonction(x2)))
          scalex = Math.abs(10 / (XMAXI - XMINI))
          scaley = 20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI)))
          A = point(x2 * scalex, mafonction(x2) * scaley)
          B = translation(A, vecteur(1 * scalex, maderivee(x2) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'blue')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
        }
      } else { // a<0
        if (minima > 0) { // f(x)=0 a deux solutions
          rac = trouverLesRacines(a, b, c)
          tableau = tableauDeVariation({
            colorBackground: 'white',
            escpl: 3.5,
            delatcl: 0.8,
            lgt: 3.5,
            hauteurLignes: [20, 20, 20, 20, 20],
            tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
              ['$-\\infty$', 30, `$${rac[2]}$`, 60, `$${x2s}$`, 60, `$${rac[3]}$`, 60, '$+\\infty$', 30]],
            tabLines:
              [['Line', 30, 'R/', 0, 'R/', 0, '+', 20, 'R/', 0, 'z', 20, 'R/', 0, '-', 20, 'R/', 0],
                ['Var', 10, '-/$-\\infty$', 30, 'R/', 0, `+/$${fx1s}$`, 50, 'R/', 0, '-/$-\\infty$', 30],
                ['Ima', 1, 3, '$0$', 12],
                ['Ima', 3, 5, '$0$', 12]
              ]
          })
          XMINI = Math.round(x2) - 3
          XMAXI = Math.round(x2) + 3
          YMINI = Math.min(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)), Math.round(mafonction(x2)))
          YMAXI = Math.round(mafonction(x2)) + 2
          scalex = Math.abs(10 / (XMAXI - XMINI))
          scaley = 20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI)))
          A = point(x2 * scalex, mafonction(x2) * scaley)
          B = translation(A, vecteur(1 * scalex, maderivee(x2) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'blue')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
        } else if (minima < 0) { // f(x)=0 n'a pas de solution f(x)<0 pour tout x
          tableau = tableauDeVariation({
            colorBackground: 'white',
            escpl: 3.5,
            delatcl: 0.8,
            lgt: 3.5,
            hauteurLignes: [20, 20, 20, 20, 20],
            tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
              ['$-\\infty$', 30, `$${x2s}$`, 60, '$+\\infty$', 30]],
            tabLines:
              [['Line', 30, 'R/', 0, '+', 20, 'z', 20, '-', 20],
                ['Var', 10, '-/$-\\infty$', 30, `+/$${fx1s}$`, 50, '-/$-\\infty$', 30]
              ]
          })
          XMINI = Math.round(x2) - 3
          XMAXI = Math.round(x2) + 3
          YMINI = Math.min(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)), Math.round(mafonction(x2)))
          YMAXI = 10
          scalex = Math.abs(10 / (XMAXI - XMINI))
          scaley = 20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI)))
          A = point(x2 * scalex, mafonction(x2) * scaley)
          B = translation(A, vecteur(1 * scalex, maderivee(x2) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'blue')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
        } else { // f(x)=0 a une solution unique : minima=0 désigne ici un maximum
          tableau = tableauDeVariation({
            colorBackground: 'white',
            escpl: 3.5,
            delatcl: 0.8,
            lgt: 3.5,
            hauteurLignes: [20, 20, 20, 20, 20],
            tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
              ['$-\\infty$', 30, `$${x2s}$`, 60, '$+\\infty$', 30]],
            tabLines:
              [['Line', 30, 'R/', 0, '+', 20, 'z', 20, '-', 20],
                ['Var', 10, '-/$-\\infty$', 30, '+/$0$', 12, '-/$-\\infty$', 30]
              ]
          })
          XMINI = Math.round(x2) - 3
          XMAXI = Math.round(x2) + 3
          YMINI = Math.min(Math.round(mafonction(XMINI)), Math.round(mafonction(XMAXI)), Math.round(mafonction(x2)))
          YMAXI = 10
          scalex = Math.abs(10 / (XMAXI - XMINI))
          scaley = 20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI)))
          A = point(x2 * scalex, mafonction(x2) * scaley)
          B = translation(A, vecteur(1 * scalex, maderivee(x2) * scaley))
          C = rotation(B, A, 180)
          tangente = segment(C, B, 'blue')
          tangente.styleExtremites = '<->'
          vecteurs.push(tangente)
        }
      }
    } else if (c !== 0) { // degré 1
      mafonction = x => c * x + d
      maderivee = () => c
      x2 = -d / c
      if (c > 0) { // croissante
        tableau = tableauDeVariation({
          colorBackground: 'white',
          escpl: 3.5,
          delatcl: 0.8,
          lgt: 3.5,
          hauteurLignes: [20, 20, 20, 20, 20],
          tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
            ['$-\\infty$', 30, `$${texFractionSigne(-d, c)}$`, 60, '$+\\infty$', 30]],
          tabLines:
            [['Line', 30, 'R/', 0, 'R/', 0, '+', 20, 'R/', 0],
              ['Var', 10, '-/$-\\infty$', 30, 'R/', 0, '+/$+\\infty$', 30],
              ['Ima', 1, 3, '$0$', 12]
            ]
        })
        XMINI = Math.round(x2) - 4
        XMAXI = Math.round(x2) + 4
        YMINI = Math.round(mafonction(x2)) - 4
        YMAXI = Math.round(mafonction(x2)) + 4
      } else { // décroissante
        tableau = tableauDeVariation({
          colorBackground: 'white',
          escpl: 3.5,
          delatcl: 0.8,
          lgt: 3.5,
          hauteurLignes: [20, 20, 20, 20, 20],
          tabInit: [[['$x$', 1.5, 15], ["$f'(x)$", 1, 30], ['$f(x)$', 2.5, 25]],
            ['$-\\infty$', 30, `$${texFractionSigne(-d, c)}$`, 60, '$+\\infty$', 30]],
          tabLines:
            [['Line', 30, 'R/', 0, 'R/', 0, '-', 20, 'R/', 0],
              ['Var', 10, '+/$+\\infty$', 30, 'R/', 0, '-/$-\\infty$', 30],
              ['Ima', 1, 3, '$0$', 12]
            ]
        })
        XMINI = Math.round(x2) - 4
        XMAXI = Math.round(x2) + 4
        YMINI = Math.round(mafonction(x2)) - 4
        YMAXI = Math.round(mafonction(x2)) + 4
      }
    } else { // fonction constante
      mafonction = () => d
      maderivee = () => 0

      tableau = tableauDeVariation({
        colorBackground: 'white',
        escpl: 3.5,
        delatcl: 0.8,
        lgt: 3.5,
        tabInit: [[['$x$', 1.5, 30], ["$f'(x)$", 1, 60], ['$f(x)$', 1.5, 60]],
          ['$-\\infty$', 30, '$+\\infty$', 30]],
        tabLines:
          [['Line', 30, 'R/', 0, '$0$', 20, 'R/', 0],
            ['Var', 10, `+/$${d}$`, 30, `+/$${d}$`, 30]
          ]
      })
      XMINI = Math.round(x2) - 3
      XMAXI = Math.round(x2) + 3
      if (d > 0) { YMINI = 0 }
      YMAXI = 10 ** (Math.ceil(Math.log10(d)))
    }

    const pas = calcul(10 ** Math.ceil(Math.log10((Math.abs((YMAXI - YMINI) / 20)))) / 2)
    scalex = Math.abs(10 / (XMAXI - XMINI))
    scaley = calcul(20 / 10 ** Math.ceil(Math.log10(Math.abs(YMAXI - YMINI))))

    const monrepere = repere({
      xUnite: scalex,
      yUnite: scaley,
      xMin: XMINI,
      xMax: XMAXI,
      yMin: YMINI - YMINI % pas,
      yMax: YMAXI,
      grille: true,
      xThickDistance: 1,
      yThickDistance: pas
    })
    const macourbe = courbe(mafonction, { repere: monrepere, step: 0.1, epaisseur: 1 })
    texte = 'Étude des variations de la fonction $f(x)='
    texte += `${printlatex(fxstring)}$.<br>`
    texte += mathalea2d({ xmin: 0, ymin: -8, xmax: 21, ymax: 1, pixelsParCm: 30 }, tableau)
    if (this.sup2) {
      texte += '<br>' + mathalea2d({ xmin: (XMINI - 1) * scalex, ymin: (YMINI - 1) * scaley, xmax: (XMAXI + 2) * scalex, ymax: (YMAXI + 1) * scaley, pixelsParCm: 30 }, macourbe, monrepere, vecteurs) + '<br>'
      solutions = xcas('fsolve(' + fxstring + '=0,x)').replace('[', '').replace(']', '').split(',')
      if (solutions[0] === '') {
        texte += 'À la vue du tableau de variation de la fonction $f$, il n\'y a pas de solution à l\'équation $f(x)=0$.'
      } else {
        texte += 'Par lecture graphique on peut lire les solutions de $f(x)=0$ : '
        if (solutions.length === 1) {
          texte += `$x\\approx${texNombre(solutions[0], 1)}$`
        } else {
          if (solutions.length === 2) {
            texte += `$x\\approx${texNombre(solutions[0], 1)}$ et $x\\approx${texNombre(solutions[1], 1)}$`
          } else {
            texte += `$x\\approx${texNombre(solutions[0], 1)}$, $x\\approx${texNombre(solutions[1], 1)}$ et $x\\approx${texNombre(solutions[2], 1)}$`
          }
        }
      }
    }

    const texteCorr = ''

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Coefficients de $ax^3+bx^2+cx+d$ séparés par des /', '-1/-2/3/1 par exemple']
  this.besoinFormulaire2CaseACocher = ['Représentation graphique', true]
  this.besoinFormulaire3CaseACocher = ['Valeurs exactes', false]
}
