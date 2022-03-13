import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, reduireAxPlusB, choice, ecritureAlgebrique, ecritureParentheseSiNegatif, texFractionReduite } from '../../modules/outils.js'
import { repere2, droite, mathalea2d, point, tracePoint, labelPoint, texteParPosition } from '../../modules/2d.js'
import { min, max } from 'mathjs'

export const titre = 'Représentation graphique d’une fonction affine'

/**
* @author Stéphane Guyon
* 2F10-3
*/
export default function representerfonctionaffine () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = 'Représenter graphiquement la fonction affine $f$ définie sur $\\mathbb R$ par :'
  this.nbQuestions = 3 // On complète le nb de questions
  this.nbCols = 1
  this.nbColsCorr = 1
  this.tailleDiaporama = 3
  this.video = ''
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = []
    this.listeCorrections = []
    // let typesDeQuestionsDisponibles = []
    // typesDeQuestionsDisponibles = [1, 2]// On complète selon le nb de cas dans l'exo (switch)

    // const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const o = texteParPosition('O', -0.5, -0.5, 'milieu', 'black', 1)
    for (let i = 0, a, b, r, c, d, tA, lA, tB, lB, xA, yA, xB, yB, f, lC, texte, texteCorr, cadreRepere, cadreFenetreSvg, cpt = 0;
      i < this.nbQuestions && cpt < 50;) { // on rajoute les variables dont on a besoin
      // typesDeQuestions = listeTypeDeQuestions[i]
      if (this.sup === 1) {
        // TODO: Puis faire une grosse factorisation car le code se répète bcp
        f = (x) => a * x + b
        a = randint(0, 3) * choice([-1, 1])// coefficient a de la fonction affine
        b = randint(0, 3, [0]) * choice([-1, 1])// ordonnée à l'origine b non nulle de la fonction affine
        f = (x) => a * x + b
        //! Pourquoi ?
        if (a === 0) { // On évite les droites horizontales
          a = 1
        }

        xA = 0
        yA = f(xA)
        xB = randint(1, 3) * choice([-1, 1])// Abscisse de B
        yB = f(xB)// Ordonnée de B

        const A = point(xA, yA, 'A')
        const B = point(xB, yB, 'B')
        c = droite(A, B)
        c.color = 'red'
        c.epaisseur = 2

        cadreRepere = {
          xMin: min(-1, xA - 1, xB - 1),
          yMin: min(-1, yA - 1, yB - 1),
          xMax: max(1, xA + 1, xB + 1),
          yMax: max(1, yA + 1, yB + 1)
        }

        cadreFenetreSvg = {
          xMin: min(-2, xA - 2, xB - 2),
          yMin: min(-2, yA - 2, yB - 2),
          xMax: max(2, xA + 2, xB + 2),
          yMax: max(2, yA + 2, yB + 2)
        }
        /* cadreFenetreSvg = {
          xMin: -6,
          yMin: min(-8, yA - 2),
          xMax: 6,
          yMax: max(8, yA + 2)
        } */
        /*  cadreFenetreSvg = {
          xMin: -10,
          yMin: -10,
          xMax: 10,
          yMax: 10
        } */
        console.log(`------------------------${i}-------------------------------`)
        console.log(`xA: ${xA}`)
        console.log(`yA: ${yA}`)
        console.log(`xB: ${xB}`)
        console.log(`yB: ${yB}`)
        console.log(`cadreRepere.xMin: ${cadreRepere.xMin}`)
        console.log(`cadreRepere.yMin: ${cadreRepere.yMin}`)
        console.log(`cadreRepere.xMax: ${cadreRepere.xMax}`)
        console.log(`cadreRepere.yMax: ${cadreRepere.yMax}`)
        console.log(`cadreFenetreSvg.xMin: ${cadreFenetreSvg.xMin}`)
        console.log(`cadreFenetreSvg.yMin: ${cadreFenetreSvg.yMin}`)
        console.log(`cadreFenetreSvg.xMax: ${cadreFenetreSvg.xMax}`)
        console.log(`cadreFenetreSvg.yMax: ${cadreFenetreSvg.yMax}`)
        r = repere2(cadreRepere)

        tA = tracePoint(A, 'red') // Variable qui trace les points avec une croix
        tB = tracePoint(B, 'red') // Variable qui trace les points avec une croix
        lA = labelPoint(A, 'red')// Variable qui trace les nom s A et B
        lB = labelPoint(B, 'red')// Variable qui trace les nom s A et B

        tA.taille = 5
        tA.epaisseur = 2

        tB.taille = 5
        tB.epaisseur = 2
        texte = `$f(x)=${reduireAxPlusB(a, b)}$ <br>`
        if (a !== 0) {
          texteCorr = 'On sait que la représentation graphique d\'une fonction affine est une droite.<br>'
          texteCorr += 'Il suffit donc de déterminer les coordonnées de deux points pour pouvoir représenter $f$.<br>'
          texteCorr += `Comme $f(${xA})=${yA}$, on a  $A(${xA};${yA}) \\in \\mathcal{C_f}$.<br>`
          texteCorr += 'On cherche un deuxième point, et on prend un antécédent au hasard :<br>'
          texteCorr += `Soit $x=${xB}$ :<br>`
          texteCorr += `On calcule : $f(${xB})=${a} \\times ${ecritureParentheseSiNegatif(xB)}${ecritureAlgebrique(b)}=${yB}$.<br>`
          texteCorr += `On en déduit que $B(${xB};${yB}) \\in \\mathcal{C_f}$.`
        } else {
          texteCorr = 'On observe que $f$ est une fonction constante.<br>'
          texteCorr += `Sa représentation graphique est donc une droite parallèle à l'axe des abscisses, d'équation $y=${yA}$.<br>`
        }
        texteCorr += mathalea2d(cadreFenetreSvg,
          lA, lB, r, c, tA, tB, o)
      }

      if (this.sup === 2) { // cas du coefficient directeur fractionnaire
        a = randint(-5, 5, [0]) // numérateur coefficient directeur non nul
        b = randint(-5, 5, [0]) // ordonnée à l'origine non nulle
        d = randint(2, 5, [a, 2 * a, -a, -2 * a]) // dénominateur coefficient directeur non multiple du numérateur pour éviter nombre entier
        f = (x) => a / d * x + b
        xA = 0 // Abscisse de A
        yA = f(xA)// Ordonnée de A
        xB = d
        yB = f(xB)

        const A1 = point(xA, yA, 'A')
        const B1 = point(xB, yB, 'B')

        // const f = point(xA / 2, (b + yA) / 2)
        r = repere2(cadreRepere)// On définit le repère
        c = droite(A1, B1)
        c.color = 'red'
        c.epaisseur = 2

        texte = `$f(x)=${texFractionReduite(a, d)}x ${ecritureAlgebrique(b)}$ <br>`

        texteCorr = 'On sait que la représentation graphique d\'une fonction affine est une droite.<br>'
        texteCorr += 'Il suffit donc de déterminer les coordonnées de deux points pour pouvoir représenter $f$.<br>'
        texteCorr += `Comme $f(${xA})=${yA}$, on a : $A(${xA};${yA}) \\in \\mathcal{C_f}$.<br>`
        texteCorr += 'On cherche un deuxième point, et on prend un antécédent qui facilite les calculs :<br>'
        texteCorr += `Par exemple $x=${xB}$ :<br>`
        texteCorr += `On calcule : $f(${xB})=${texFractionReduite(a, d)} \\times ${ecritureParentheseSiNegatif(xB)}${ecritureAlgebrique(b)}=${yB}$.<br>`
        texteCorr += `On en déduit que $B(${xB};${yB}) \\in \\mathcal{C_f}$.`

        tA = tracePoint(A1, 'red') // Variable qui trace les points avec une croix
        lA = labelPoint(A1, 'red')// Variable qui trace les nom s A et B
        tB = tracePoint(B1, 'red') // Variable qui trace les points avec une croix
        lB = labelPoint(B1, 'red')// Variable qui trace les nom s A et B
        // lC = labelPoint(f, 'C_f')// Variable qui trace les nom s A et B
        texteCorr += mathalea2d(
          cadreFenetreSvg,
          r, c, tA, lA, tB, lB, lC, o)
        // On trace le graphique
      }

      if (this.questionJamaisPosee(i, this.sup, a, b)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Types de question ', 2, '1 : Valeurs entières\n2 : Valeurs fractionnaires.']
}
