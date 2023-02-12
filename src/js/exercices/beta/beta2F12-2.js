import Exercice from '../Exercice.js'

import { mathalea2d } from '../../modules/2dGeneralites.js'

import { repere, texteParPosition, point, segment, courbe } from '../../modules/2d.js'
import { listeQuestionsToContenu, combinaisonListes, arrondi, choice, randint } from '../../modules/outils.js'
import { sqrt } from 'mathjs'
import { context } from '../../modules/context.js'
export const titre = 'Résoudre graphiquement $f(x)\\gt k \\quad (\\lt k)$ avec une fonction de référence'

/**
 * Description didactique de l'exercice
 * @author Gilles Mora
 * Référence
*/
export default function ResoudreGraphFonctionRef () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  // this.nbQuestionsModifiable = false
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 4
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.spacing = 1.5 // Interligne des questions
  this.spacingCorr = 1 // Interligne des réponses
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['typeE3', 'typeE4']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['typeE5', 'typeE6']
    } else if (this.sup === 4) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3', 'typeE4', 'typeE5', 'typeE6']
    }
    //
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'typeE1':// x^2<k
          {
            const a = randint(1, 30)
            const choix = choice([true, false])
            const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
            const A = point(1.73, 3)
            const Ax = point(A.x, 0)
            const sAAx = segment(A, Ax)
            sAAx.epaisseur = 2
            sAAx.pointilles = 5
            const B = point(-1.73, 3)
            const Bx = point(B.x, 0)
            const sBBx = segment(B, Bx)
            sBBx.epaisseur = 2
            sBBx.pointilles = 5
            const sAxBx = segment(Ax, Bx, 'red')
            sAxBx.epaisseur = 4
            const Texte1 = texteParPosition(`$y=${a}$`, 4, 2.3, 'milieu', 'green', 1)
            const Texte2 = texteParPosition('$y=x^2$', 3.5, 4.5, 'milieu', 'blue', 1)
            const Texte3 = texteParPosition(`$-\\sqrt{${a}}$`, -1.73, -1.5, 'milieu', 'red', 1)
            const Texte4 = texteParPosition(`$\\sqrt{${a}}$`, 1.73, -1.5, 'milieu', 'red', 1)
            const crochet1O = texteParPosition(']', -1.73, 0, 'milieu', 'red', 3)
            const crochet2O = texteParPosition('[', 1.73, 0, 'milieu', 'red', 3)
            const crochet1F = texteParPosition('[', -1.73, 0, 'milieu', 'red', 3)
            const crochet2F = texteParPosition(']', 1.73, 0, 'milieu', 'red', 3)
            const r1 = repere({
              xMin: -4,
              yMin: -1,
              yMax: 5,
              xMax: 4,
              xUnite: 1,
              yUnite: 1,
              axeXStyle: '->',
              axeYStyle: '->',
              grilleX: false,
              grilleY: false,
              xThickMax: -6,
              yThickMax: -1

            })
            const f = x => x ** 2
            const g = x => 3
            const graphique = mathalea2d({
              xmin: -5,
              xmax: 5,
              ymin: -1,
              ymax: 5,
              pixelsParCm: 30,
              scale: 0.7,
              style: 'margin: auto'
            }, r1, o)
            const graphiqueCO = mathalea2d({
              xmin: -6,
              xmax: 6,
              ymin: -2,
              ymax: 5.5,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }),
            courbe(g, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, sBBx, sAxBx, crochet1O, crochet2O, Texte1, Texte2, Texte3, Texte4)
            const graphiqueCF = mathalea2d({
              xmin: -6,
              xmax: 6,
              ymin: -2,
              ymax: 5.5,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }), courbe(g, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, sBBx, sAxBx, crochet1F, crochet2F, Texte1, Texte2, Texte3, Texte4)
            texte = `Résoudre graphiquement l'inéquation : $x^2${choix ? '<' : ' \\leqslant '}${a}$.<br>`
            if (!context.isHtml) {
              texte += 'On pourra utiliser le repère suivant.<br>'
              texte += `    ${graphique}`
            }
            texteCorr = `Pour résoudre graphiquement cette inéquation : <br>
            $\\bullet$ On trace la parabole d'équation $y=x^2$. <br>
            $\\bullet$ On trace la droite horizontale d'équation $y=${a}$. Cette droite coupe la parabole en $-\\sqrt{${a}}$ et $\\sqrt{${a}}$. <br>
            $\\bullet$  Les solutions de l'inéquation sont les abscisses des points de la courbe qui se situent ${choix ? 'strictement en dessous de' : ' sur ou sous '} la droite.<br>`
            if (choix === true) { texteCorr += `${graphiqueCO}<br>` } else { texteCorr += `    ${graphiqueCF}<br>` }

            if (a === 1 || a === 4 || a === 9 || a === 16 || a === 25) {
              texteCorr += `Comme la fonction carré est définie sur $\\mathbb{R}$ et que $\\sqrt{${a}}=${arrondi(Math.sqrt(a), 0)}$, l'ensemble des solutions de l'inéquation $x^2${choix ? '<' : ' \\leqslant '}${a}$ est :
            ${choix ? `$S=]-${arrondi(Math.sqrt(a), 0)}\\,;\\,${arrondi(Math.sqrt(a), 0)}[$.` : `$S=[-${arrondi(Math.sqrt(a), 0)}\\,;\\,${arrondi(Math.sqrt(a), 0)}]$.`} `
            } else { texteCorr += `Comme la fonction carré est définie sur $\\mathbb{R}$, l'ensemble des solutions de l'inéquation $x^2${choix ? '<' : ' \\leqslant '}${a}$ est : ${choix ? `$S=]-\\sqrt{${a}}\\,;\\,\\sqrt{${a}}[$` : `$S=[-\\sqrt{${a}}\\,;\\,\\sqrt{${a}}]$`}.` }
          }
          break

        case 'typeE2':// x^2>k
          {
            const a = randint(1, 30)
            const choix = choice([true, false])
            const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
            const A = point(1.73, 3)
            const Ax = point(A.x, 0)
            const sAAx = segment(A, Ax)
            sAAx.epaisseur = 2
            sAAx.pointilles = 5
            const B = point(-1.73, 3)
            const Bx = point(B.x, 0)
            const sBBx = segment(B, Bx)
            sBBx.epaisseur = 2
            sBBx.pointilles = 5
            const BxI = point(-4, 0)
            const sBxBxI = segment(Bx, BxI, 'red')
            sBxBxI.epaisseur = 2
            const AxI = point(4, 0)
            const sAxAxI = segment(Ax, AxI, 'red')
            sAxAxI.epaisseur = 2

            const Texte1 = texteParPosition(`$y=${a}$`, 4, 2.3, 'milieu', 'green', 1)
            const Texte2 = texteParPosition('$y=x^2$', 3.5, 4.5, 'milieu', 'blue', 1)
            const Texte3 = texteParPosition(`$-\\sqrt{${a}}$`, -1.73, -1.5, 'milieu', 'red', 1)
            const Texte4 = texteParPosition(`$\\sqrt{${a}}$`, 1.73, -1.5, 'milieu', 'red', 1)
            const crochet1O = texteParPosition('[', -1.73, 0, 'milieu', 'red', 3)
            const crochet2O = texteParPosition(']', 1.73, 0, 'milieu', 'red', 3)
            const crochet1F = texteParPosition(']', -1.73, 0, 'milieu', 'red', 3)
            const crochet2F = texteParPosition('[', 1.73, 0, 'milieu', 'red', 3)
            const r1 = repere({
              xMin: -4,
              yMin: -1,
              yMax: 5,
              xMax: 4,
              xUnite: 1,
              yUnite: 1,
              axeXStyle: '->',
              axeYStyle: '->',
              grilleX: false,
              grilleY: false,
              xThickMax: -6,
              yThickMax: -1

            })
            const f = x => x ** 2
            const g = x => 3
            const graphique = mathalea2d({
              xmin: -5,
              xmax: 6,
              ymin: -1,
              ymax: 5,
              pixelsParCm: 30,
              scale: 0.7,
              style: 'margin: auto'
            }, r1, o)
            const graphiqueCO = mathalea2d({
              xmin: -5,
              xmax: 6,
              ymin: -2,
              ymax: 5.5,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }),
            courbe(g, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, sBBx, sAxAxI, sBxBxI, crochet1O, crochet2O, Texte1, Texte2, Texte3, Texte4)
            const graphiqueCF = mathalea2d({
              xmin: -5,
              xmax: 6,
              ymin: -2,
              ymax: 5.5,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }), courbe(g, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, sBBx, sAxAxI, sBxBxI, crochet1F, crochet2F, Texte1, Texte2, Texte3, Texte4)
            texte = `Résoudre graphiquement l'inéquation : $x^2${choix ? '>' : ' \\geqslant '}${a}$.<br>`
            if (!context.isHtml) {
              texte += 'On pourra utiliser le repère suivant.<br>'
              texte += `    ${graphique}`
            }
            texteCorr = `Pour résoudre graphiquement cette inéquation : <br>
            $\\bullet$ On trace la parabole d'équation $y=x^2$. <br>
            $\\bullet$ On trace la droite horizontale d'équation $y=${a}$. <br>
            $\\bullet$    Les solutions de l'inéquation sont les abscisses des points de la courbe qui se situent ${choix ? 'strictement au dessus de' : ' sur ou au dessus de '} la droite.<br>`
            if (choix === true) { texteCorr += `${graphiqueCO}<br>` } else { texteCorr += `    ${graphiqueCF}<br>` }

            if (a === 1 || a === 4 || a === 9 || a === 16 || a === 25) {
              texteCorr += `Comme la fonction carré est définie sur $\\mathbb{R}$ et que $\\sqrt{${a}}=${arrondi(Math.sqrt(a), 0)}$, l'ensemble des solutions de l'inéquation $x^2${choix ? '>' : ' \\geqslant '}${a}$ est :
            ${choix ? `$S=]-\\infty\\,;\\,-${arrondi(Math.sqrt(a), 0)}[\\cup ]${arrondi(Math.sqrt(a), 0)}\\,;\\, +\\infty[$.` : `$S=]-\\infty\\,;\\,-${arrondi(Math.sqrt(a), 0)}]\\cup [${arrondi(Math.sqrt(a), 0)}\\,;\\, +\\infty[$.`} `
            } else { texteCorr += `Comme la fonction carré est définie sur $\\mathbb{R}$, l'ensemble des solutions de l'inéquation $x^2${choix ? '>' : ' \\geqslant '}${a}$ est : ${choix ? `$S=]-\\infty\\,;\\,-\\sqrt{${a}}[\\cup ]\\sqrt{${a}}\\,;\\, +\\infty[$` : `$S=]-\\infty\\,;\\,-\\sqrt{${a}}]\\cup [\\sqrt{${a}}\\,;\\, +\\infty[$`}.` }
          }
          break

        case 'typeE3':// 1/x<k
          {
            const a = randint(-9, 9, [-1, 0, 1])
            const choix = choice([true, false])
            const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
            const O = point(0, 0)
            const A = point(0.5, 2)
            const A2 = point(-1, -1)
            const Ax = point(A.x, 0)
            const A2x = point(A2.x, 0)
            const sAAx = segment(A, Ax)
            const sA2A2x = segment(A2, A2x)
            sAAx.epaisseur = 2
            sAAx.pointilles = 5
            sA2A2x.epaisseur = 2
            sA2A2x.pointilles = 5
            const AxI = point(-4, 0)
            const sAxIAx = segment(AxI, Ax, 'red')
            sAxIAx.epaisseur = 2
            const sA2xO = segment(A2x, O, 'red')
            sA2xO.epaisseur = 2
            const sAxIO = segment(AxI, O, 'red')
            sAxIO.epaisseur = 2
            const AxI2 = point(4, 0)
            const sAxI2Ax = segment(AxI2, Ax, 'red')
            sAxI2Ax.epaisseur = 2
            const Texte1 = texteParPosition(`$y=${a}$`, 4, 2.3, 'milieu', 'green', 1)
            const Texte1B = texteParPosition(`$y=${a}$`, 4, -1.7, 'milieu', 'green', 1)
            const Texte2 = texteParPosition('$y=\\dfrac{1}{x}$', 1, 3, 'milieu', 'blue', 1)
            const Texte3 = texteParPosition(`$\\dfrac{1}{${a}}$`, 0.7, -1, 'milieu', 'red', 1)
            const Texte3B = texteParPosition(`$-\\dfrac{1}{${-a}}$`, -1.5, 0.7, 'milieu', 'red', 1)
            const crochet1O = texteParPosition('[', 0, 0, 'milieu', 'red', 3)
            const crochet1O2 = texteParPosition(']', -1, 0, 'milieu', 'red', 3)
            const crochet1F2 = texteParPosition('[', -1, 0, 'milieu', 'red', 3)
            const crochet1F = texteParPosition(']', 0.5, 0, 'milieu', 'red', 3)
            const crochet1F3 = texteParPosition('[', 0.5, 0, 'milieu', 'red', 3)

            const r1 = repere({
              xMin: -4,
              yMin: -3,
              yMax: 4,
              xMax: 4,
              xUnite: 1,
              yUnite: 1,
              axeXStyle: '->',
              axeYStyle: '->',
              grilleX: false,
              grilleY: false,
              xThickMax: -6,
              yThickMax: -5

            })
            const f = x => 1 / x
            const g1 = x => 2
            const g2 = x => -1
            const graphique = mathalea2d({
              xmin: -5,
              xmax: 5,
              ymin: -3,
              ymax: 4,
              pixelsParCm: 30,
              scale: 0.7,
              style: 'margin: auto'
            }, r1, o)

            const graphiqueCO1 = mathalea2d({ // 1/x<k avec k>0
              xmin: -6,
              xmax: 6,
              ymin: -3,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }),
            courbe(g1, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, crochet1O, crochet1F, sAxIO, sAxI2Ax, Texte1, Texte2, Texte3)

            const graphiqueCF1 = mathalea2d({ // 1/x<=k avec k>0
              xmin: -6,
              xmax: 6,
              ymin: -3,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }), courbe(g1, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, crochet1O, crochet1F3, sAxIO, sAxI2Ax, Texte1, Texte2, Texte3)

            const graphiqueCO2 = mathalea2d({ // 1/x<k avec k<0
              xmin: -6,
              xmax: 6,
              ymin: -3,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }),
            courbe(g2, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, crochet1O2, sA2A2x, crochet1O, sA2xO, Texte1B, Texte2, Texte3B)
            const graphiqueCF2 = mathalea2d({ // 1/x<=k avec k<0
              xmin: -6,
              xmax: 6,
              ymin: -3,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }), courbe(g2, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, crochet1F2, sA2A2x, sA2xO, crochet1O, Texte1B, Texte2, Texte3B)

            texte = `Résoudre graphiquement l'inéquation : $\\dfrac{1}{x}${choix ? '<' : ' \\leqslant '}${a}$.<br>`
            if (!context.isHtml) {
              texte += 'On pourra utiliser le repère suivant.<br>'
              texte += `    ${graphique}`
            }
            texteCorr = `Pour résoudre graphiquement cette inéquation : <br>
            $\\bullet$ On trace l'hyperbole d'équation $y=\\dfrac{1}{x}$. <br>
            $\\bullet$ On trace la droite horizontale d'équation $y=${a}$. Cette droite coupe l'hyperbole en un point dont l'abscisse est : ${a > 0 ? `$\\dfrac{1}{${a}}$` : `$-\\dfrac{1}{${-a}}$`}.<br>
            $\\bullet$    Les solutions de l'inéquation sont les abscisses des points de la courbe qui se situent ${choix ? 'strictement en dessous de' : ' sur ou sous '} la droite.<br>`
            if (a > 0) {
              if (choix === true) { texteCorr += `${graphiqueCO1}<br>` } else { texteCorr += `    ${graphiqueCF1}<br>` }
              texteCorr += `Comme la fonction inverse est définie sur $\\mathbb{R}^*$, $0$ est une valeur interdite et donc l'ensemble des solutions de l'inéquation $\\dfrac{1}{x}${choix ? '<' : ' \\leqslant '}${a}$ est :
            ${choix ? `$S=]-\\infty\\,;\\,0[\\cup\\left]\\dfrac{1}{${a}}\\,;\\,+\\infty\\right[$.` : `$S=]-\\infty\\,;\\,0[\\cup\\left[\\dfrac{1}{${a}}\\,;\\,+\\infty\\right[$.`} `
            } else {
              if (choix === true) { texteCorr += `${graphiqueCO2}<br>` } else { texteCorr += `    ${graphiqueCF2}<br>` }
              texteCorr += `Comme la fonction inverse est définie sur $\\mathbb{R}^*$, $0$ est une valeur interdite et donc l'ensemble des solutions de l'inéquation $\\dfrac{1}{x}${choix ? '<' : ' \\leqslant '}${a}$ est :
              ${choix ? `$S=\\left]-\\dfrac{1}{${-a}}\\,;\\,0\\right[$.` : `$S=\\left[-\\dfrac{1}{${-a}}\\,;\\,0\\right[$.`} `
            }
          }

          break

        case 'typeE4':// 1/x>k
          {
            const a = randint(-9, 9, [-1, 0, 1])
            const choix = choice([true, false])
            const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
            const O = point(0, 0)
            const A = point(0.5, 2)
            const A2 = point(-1, -1)
            const Ax = point(A.x, 0)
            const A2x = point(A2.x, 0)
            const sAAx = segment(A, Ax)
            const sA2A2x = segment(A2, A2x)
            sAAx.epaisseur = 2
            sAAx.pointilles = 5
            sA2A2x.epaisseur = 2
            sA2A2x.pointilles = 5
            const AxI = point(-4, 0)
            const sAxIAx = segment(AxI, Ax, 'red')
            sAxIAx.epaisseur = 2
            const AxIP = point(4, 0)
            const sAxIPAx = segment(AxIP, O, 'red')
            sAxIPAx.epaisseur = 2
            const sAxIA2x = segment(AxI, A2x, 'red')
            sAxIA2x.epaisseur = 2
            const sA2xO = segment(A2x, O, 'red')
            sA2xO.epaisseur = 2
            const sAxO = segment(Ax, O, 'red')
            sAxO.epaisseur = 2
            const Texte1 = texteParPosition(`$y=${a}$`, 4, 2.3, 'milieu', 'green', 1)
            const Texte1B = texteParPosition(`$y=${a}$`, 4, -1.7, 'milieu', 'green', 1)
            const Texte2 = texteParPosition('$y=\\dfrac{1}{x}$', 1, 3, 'milieu', 'blue', 1)
            const Texte3 = texteParPosition(`$\\dfrac{1}{${a}}$`, 0.7, -1, 'milieu', 'red', 1)
            const Texte3B = texteParPosition(`$-\\dfrac{1}{${-a}}$`, -1.5, 0.7, 'milieu', 'red', 1)
            const crochet1O = texteParPosition('[', 0.5, 0, 'milieu', 'red', 3)
            const crochet1O2 = texteParPosition(']', 0.5, 0, 'milieu', 'red', 3)
            const crochet1O2B = texteParPosition(']', 0, 0, 'milieu', 'red', 3)
            const crochet1F2 = texteParPosition('[', -1, 0, 'milieu', 'red', 3)
            const crochet1F2B = texteParPosition(']', -1, 0, 'milieu', 'red', 3)
            const r1 = repere({
              xMin: -4,
              yMin: -3,
              yMax: 4,
              xMax: 4,
              xUnite: 1,
              yUnite: 1,
              axeXStyle: '->',
              axeYStyle: '->',
              grilleX: false,
              grilleY: false,
              xThickMax: -6,
              yThickMax: -5

            })
            const f = x => 1 / x
            const g1 = x => 2
            const g2 = x => -1
            const graphique = mathalea2d({
              xmin: -5,
              xmax: 5,
              ymin: -3,
              ymax: 4,
              pixelsParCm: 30,
              scale: 0.7,
              style: 'margin: auto'
            }, r1, o)

            const graphiqueCO1 = mathalea2d({ // 1/x>k avec a>0
              xmin: -6,
              xmax: 6,
              ymin: -3,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }),
            courbe(g1, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, sAxO, Texte1, Texte2, Texte3, crochet1O, crochet1O2B)

            const graphiqueCF1 = mathalea2d({ // 1/x>=k avec a>0
              xmin: -6,
              xmax: 6,
              ymin: -3,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }), courbe(g1, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, sAxO, Texte1, Texte2, Texte3, crochet1O2, crochet1O2B)

            const graphiqueCO2 = mathalea2d({ // 1/x>k avec a<0
              xmin: -6,
              xmax: 6,
              ymin: -3,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }),
            courbe(g2, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sA2A2x, sAxIA2x, sAxIPAx, crochet1F2, crochet1O2B, Texte1B, Texte2, Texte3B)
            const graphiqueCF2 = mathalea2d({ // 1/x>=k avec a<0
              xmin: -6,
              xmax: 6,
              ymin: -3,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }), courbe(g2, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sA2A2x, sAxIA2x, sAxIPAx, crochet1F2B, crochet1O2B, Texte1B, Texte2, Texte3B)

            texte = `Résoudre graphiquement l'inéquation : $\\dfrac{1}{x}${choix ? '>' : ' \\geqslant '}${a}$.<br>`
            if (!context.isHtml) {
              texte += 'On pourra utiliser le repère suivant.<br>'
              texte += `    ${graphique}`
            }
            texteCorr = `Pour résoudre graphiquement cette inéquation : <br>
            $\\bullet$ On trace l'hyperbole d'équation $y=\\dfrac{1}{x}$. <br>
            $\\bullet$ On trace la droite horizontale d'équation $y=${a}$. Cette droite coupe l'hyperbole en un point dont l'abscisse est : ${a > 0 ? `$\\dfrac{1}{${a}}$` : `$-\\dfrac{1}{${-a}}$`}. <br>
            $\\bullet$    Les solutions de l'inéquation sont les abscisses des points de la courbe qui se situent ${choix ? 'strictement au dessus de' : ' sur ou au dessus de '} la droite.<br>`
            if (a > 0) {
              if (choix === true) { texteCorr += `${graphiqueCO1}<br>` } else { texteCorr += `    ${graphiqueCF1}<br>` }
              texteCorr += `Comme la fonction inverse est définie sur $\\mathbb{R}^*$, $0$ est une valeur interdite et donc l'ensemble des solutions de l'inéquation $\\dfrac{1}{x}${choix ? '>' : ' \\geqslant '}${a}$ est :
            ${choix ? `$S=\\left]0\\,;\\,\\dfrac{1}{${a}}\\right[$.` : `$S=\\left]0\\,;\\,\\dfrac{1}{${a}}\\right]$.`} `
            } else {
              if (choix === true) { texteCorr += `${graphiqueCO2}<br>` } else { texteCorr += `    ${graphiqueCF2}<br>` }
              texteCorr += `Comme la fonction inverse est définie sur $\\mathbb{R}^*$, $0$ est une valeur interdite et donc l'ensemble des solutions de l'inéquation $\\dfrac{1}{x}${choix ? '>' : ' \\geqslant '}${a}$ est :
              ${choix ? `$S=\\left]-\\infty\\,;\\,-\\dfrac{1}{${-a}}\\right[\\cup ]0\\,;\\,+\\infty[$.` : `$S=\\left]-\\infty\\,;\\,-\\dfrac{1}{${-a}}\\right]\\cup ]0\\,;\\,+\\infty[$.`} `
            }
          }

          break

        case 'typeE5':// sqrt(x)<k
          {
            const a = randint(1, 12)
            const choix = choice([true, false])
            const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
            const A = point(2.25, 1.5)
            const O = point(0, 0)
            const Ax = point(A.x, 0)
            const sAAx = segment(A, Ax)
            sAAx.epaisseur = 2
            sAAx.pointilles = 5
            const sAxBx = segment(Ax, O, 'red')
            sAxBx.epaisseur = 4
            const Texte1 = texteParPosition(`$y=${a}$`, 4, 0.9, 'milieu', 'green', 1)
            const Texte2 = texteParPosition('$y=\\sqrt{x}$', 4, 2.3, 'milieu', 'blue', 1)
            const Texte3 = texteParPosition(`$${a ** 2}$`, 2.7, -0.6, 'milieu', 'red', 1)
            const crochet2O = texteParPosition('[', 2.25, 0, 'milieu', 'red', 3)
            const crochet1F = texteParPosition(']', 2.25, 0, 'milieu', 'red', 3)
            const r1 = repere({
              xMin: -1,
              yMin: -1,
              yMax: 4,
              xMax: 5,
              xUnite: 1,
              yUnite: 1,
              axeXStyle: '->',
              axeYStyle: '->',
              grilleX: false,
              grilleY: false,
              xThickMax: -6,
              yThickMax: -1

            })
            const f = x => sqrt(x)
            const g = x => 1.5
            const graphique = mathalea2d({
              xmin: -2,
              xmax: 6,
              ymin: -1,
              ymax: 4,
              pixelsParCm: 30,
              scale: 0.7,
              style: 'margin: auto'
            }, r1, o)
            const graphiqueCO = mathalea2d({
              xmin: -1,
              xmax: 5,
              ymin: -1,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }),
            courbe(g, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, sAxBx, crochet2O, Texte1, Texte2, Texte3)
            const graphiqueCF = mathalea2d({
              xmin: -1,
              xmax: 5,
              ymin: -1,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }), courbe(g, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, sAxBx, crochet1F, Texte1, Texte2, Texte3)
            texte = `Résoudre graphiquement l'inéquation : $\\sqrt{x}${choix ? '<' : ' \\leqslant '}${a}$.<br>`
            if (!context.isHtml) {
              texte += 'On pourra utiliser le repère suivant.<br>'
              texte += `    ${graphique}`
            }
            texteCorr = `Pour résoudre graphiquement cette inéquation : <br>
            $\\bullet$ On trace la courbe d'équation $y=\\sqrt{x}$. <br>
            $\\bullet$ On trace la droite horizontale d'équation $y=${a}$. Cette droite coupe la courbe en $${a}^2=${a ** 2}$. <br>
            $\\bullet$  Les solutions de l'inéquation sont les abscisses des points de la courbe qui se situent ${choix ? 'strictement en dessous de' : ' sur ou sous '} la droite.<br>`
            if (choix === true) { texteCorr += `${graphiqueCO}<br>` } else { texteCorr += `    ${graphiqueCF}<br>` }

            texteCorr += `Comme la fonction racine carrée est définie sur $[0\\,;\\,+\\infty[$, l'ensemble des solutions de l'inéquation $\\sqrt{x}${choix ? '<' : ' \\leqslant '}${a}$ est :
            ${choix ? `$S=[0\\,;\\,${a ** 2}[$.` : `$S=[0\\,;\\,${a ** 2}]$.`} `
          }
          break
        case 'typeE6':// sqrt(x)>k
          {
            const a = randint(1, 12)
            const choix = choice([true, false])
            const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
            const A = point(2.25, 1.5)
            const AInf = point(5, 0)
            const O = point(0, 0)
            const Ax = point(A.x, 0)
            const sAAx = segment(A, Ax)
            sAAx.epaisseur = 2
            sAAx.pointilles = 5
            const sAxBx = segment(Ax, O, 'red')
            sAxBx.epaisseur = 4
            const sAxAInf = segment(Ax, AInf, 'red')
            sAxAInf.epaisseur = 4
            const Texte1 = texteParPosition(`$y=${a}$`, 4, 0.9, 'milieu', 'green', 1)
            const Texte2 = texteParPosition('$y=\\sqrt{x}$', 4, 2.3, 'milieu', 'blue', 1)
            const Texte3 = texteParPosition(`$${a ** 2}$`, 2.7, -0.6, 'milieu', 'red', 1)
            const crochet2O = texteParPosition('[', 2.25, 0, 'milieu', 'red', 3)
            const crochet1F = texteParPosition(']', 2.25, 0, 'milieu', 'red', 3)
            const r1 = repere({
              xMin: -1,
              yMin: -1,
              yMax: 4,
              xMax: 5,
              xUnite: 1,
              yUnite: 1,
              axeXStyle: '->',
              axeYStyle: '->',
              grilleX: false,
              grilleY: false,
              xThickMax: -6,
              yThickMax: -1

            })
            const f = x => sqrt(x)
            const g = x => 1.5
            const graphique = mathalea2d({
              xmin: -2,
              xmax: 6,
              ymin: -1,
              ymax: 4,
              pixelsParCm: 30,
              scale: 0.7,
              style: 'margin: auto'
            }, r1, o)
            const graphiqueCO = mathalea2d({
              xmin: -1,
              xmax: 5,
              ymin: -1,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }),
            courbe(g, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, sAxAInf, crochet1F, Texte1, Texte2, Texte3)
            const graphiqueCF = mathalea2d({
              xmin: -1,
              xmax: 5,
              ymin: -1,
              ymax: 4,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }), courbe(g, {
              repere: r1,
              color: 'green',
              epaisseur: 2
            })
            , r1, o, sAAx, sAxAInf, crochet2O, Texte1, Texte2, Texte3)
            texte = `Résoudre graphiquement l'inéquation : $\\sqrt{x}${choix ? '>' : ' \\geqslant '}${a}$.<br>`
            if (!context.isHtml) {
              texte += 'On pourra utiliser le repère suivant.<br>'
              texte += `    ${graphique}`
            }
            texteCorr = `Pour résoudre graphiquement cette inéquation : <br>
            $\\bullet$ On trace la courbe d'équation $y=\\sqrt{x}$. <br>
            $\\bullet$ On trace la droite horizontale d'équation $y=${a}$. Cette droite coupe la courbe en $${a}^2=${a ** 2}$. <br>
            $\\bullet$  Les solutions de l'inéquation sont les abscisses des points de la courbe qui se situent ${choix ? 'strictement au dessus de' : ' sur ou au dessus de'} la droite.<br>`
            if (choix === true) { texteCorr += `${graphiqueCO}<br>` } else { texteCorr += `    ${graphiqueCF}<br>` }

            texteCorr += `Comme la fonction racine carrée est définie sur $[0\\,;\\,+\\infty[$, l'ensemble des solutions de l'inéquation $\\sqrt{x}${choix ? '>' : ' \\geqslant '}${a}$ est :
            ${choix ? `$S=]${a ** 2}\\,;\\,+\\infty[$.` : `$S=[${a ** 2}\\,;\\,+\\infty[$.`} `
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
  this.besoinFormulaireNumerique = ['Choix des questions', 4, '1 : Avec la fonction carré\n2 : Avec la fonction inverse\n3 : Avec la fonction racine carrée\n4 : Mélange']
}
