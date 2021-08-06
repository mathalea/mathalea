import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, reduireAxPlusB, choice, ecritureAlgebrique, ecritureParentheseSiNegatif, texFractionReduite } from '../../modules/outils.js'
import { repere2, droite, mathalea2d, point, tracePoint, labelPoint, texteParPosition } from '../../modules/2d.js'

export const titre = 'Représentation graphique d’une fonction affine'

/**

*/
export default function representerfonctionaffine () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3// On complète le nb de questions
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 100
  this.video = ''
  this.spacing = 1
  this.spacingCorr = 1
  this.spacingCorr = 3
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    // let typesDeQuestionsDisponibles = []
    // typesDeQuestionsDisponibles = [1, 2]// On complète selon le nb de cas dans l'exo (switch)

    // const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    this.sup = parseInt(this.sup)
    const o = texteParPosition('O', -0.5, -0.5, 'milieu', 'black', 1)

    for (let i = 0, a, b, r, c, d, tA, lA, tB, lB, xB, yB, lC, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;) { // on rajoute les variables dont on a besoin
      // typesDeQuestions = listeTypeDeQuestions[i]
      if (this.sup === 1) {
        a = randint(0, 3) * choice([-1, 1])// coefficient a de la fonction affine
        b = randint(0, 3) * choice([-1, 1])// coefficient b de la fonction affine

        if (a === 0 && b === 0) { // On évite la fonction nulle
          a = randint(1, 3) * choice([-1, 1])
        }
        xB = randint(1, 3) * choice([-1, 1])// Abscisse de B
        yB = a * xB + b// Ordonnée de B
        c = droite(a, -1, b)
        texte = `Représenter graphiquement la fonction affinne $f$ défiie sur $\\mathbb R$ par $f(x)=${reduireAxPlusB(a, b)}$ <br>`
        if (a !== 0) {
          texteCorr = 'On sait que la représentation graphique d\'une fonction affine est une droite.<br>'
          texteCorr += 'Il suffit donc de déterminer les coordonnées de deux points pour pouvoir représenter $f$.<br>'
          texteCorr += `Comme $f(0)=${b}$, on a  $A(0;${b}) \\in \\mathcal{C_f}$.<br>`
          texteCorr += 'On cherche un deuxième point, et on prend un antécédent au hasard :<br>'
          texteCorr += `Soit $x=${xB}$ :<br>`
          texteCorr += `On calcule : $f(${xB})=${a} \\times ${ecritureParentheseSiNegatif(xB)}${ecritureAlgebrique(b)}=${yB}$<br>`
          texteCorr += `On en déduit que $B(${xB};${yB}) \\in \\mathcal{C_f}$.`
        } else {
          texteCorr = 'On oberve que $f$ est une fonction constante<br>'
          texteCorr += `Sa représentation graphique est donc une droite parallèle à l'axe des abscisses, d'équation $y=${b}$.<br>`
        }
      }
      if (this.sup === 2) { // cas du coeff directeur fractionnaire
        a = randint(1, 5) // numérateut coefficient directeur non nul
        b = randint(-5, 5) // ordonnée à l'origine
        d = randint(2, 5, [a, 2 * a]) // dénominateur coefficient directeur non multiple du numérateur pour éviter nombre entier
        a *= choice([-1, 1]) // on choisir a négatif ou positif.
        xB = d // Abscisse de B
        yB = a / d * xB + b// Ordonnée de B
        c = droite(a / d, -1, b)
        texte = `Représenter graphiquement la fonction affinne $f$ défiie sur $\\mathbb R$ par $f(x)=${texFractionReduite(a, d)}x ${ecritureAlgebrique(b)}$ <br>`

        texteCorr = 'On sait que la représentation graphique d\'une fonction affine est une droite.<br>'
        texteCorr += 'Il suffit donc de déterminer les coordonnées de deux points pour pouvoir représenter $f$.<br>'
        texteCorr += `Comme $f(0)=${b}$, on a : $A(0;${b}) \\in \\mathcal{C_f}$.<br>`
        texteCorr += 'On cherche un deuxième point, et on prend un antécédent qui facilite les calculs :<br>'
        texteCorr += `Par exemple $x=${xB}$ :<br>`
        texteCorr += `On calcule : $f(${xB})=${texFractionReduite(a, d)} \\times ${ecritureParentheseSiNegatif(xB)}${ecritureAlgebrique(b)}=${yB}$<br>`
        texteCorr += `On en déduit que $B(${xB};${yB}) \\in \\mathcal{C_f}$.`
      }
      r = repere2()

      c.color = 'red'
      c.epaisseur = 2

      const B = point(xB, yB, 'B')
      const A = point(0, b, 'A')

      tA = tracePoint(A, 'red') // Variable qui trace les points avec une croix
      tB = tracePoint(B, 'red') // Variable qui trace les points avec une croix
      lA = labelPoint(A, 'red')// Variable qui trace les nom s A et B
      lB = labelPoint(B, 'red')// Variable qui trace les nom s A et B
      tA.taille = 5
      tA.epaisseur = 2
      tB.taille = 5
      tB.epaisseur = 2
      texteCorr += mathalea2d({
        xmin: -8,
        ymin: -10,
        xmax: 8,
        ymax: 8
      }, r, c, o, tA, lA, tB, lB, lC)
      // On trace le graphique
      if (this.listeQuestions.indexOf(texte) === -1) {
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
