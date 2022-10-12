import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../modules/outils/ecritures.js'
import { repere } from '../../modules/2d/reperes.js'
import { courbe } from '../../modules/2d/courbes.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texFractionReduite } from '../../modules/outils/arrayFractions.js'
import { calcul, texNombre } from '../../modules/outils/texNombres.js'
import { lettreMinusculeDepuisChiffre } from '../../modules/outils/lettres.js'
import { texRacineCarree } from '../../modules/outils/factorisation.js'
import { floor, simplify } from 'mathjs'

const EgalEnviron = (v, d = 3) => ((Math.abs(v) * 10 ** d) % 1 > 0 ? '\\approx' : '=') + texNombre(calcul(v, 3))

export const titre = 'Etude d\'une parabole'

/**
 * @author Eric Schrafstetter
 */
export default function TrouverEquationDeParabole () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Etude d\'une parabole'
  this.nbQuestions = 2
  this.nbCols = 1
  this.nbColsCorr = 1
  context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 1)
  this.sup = 1
  this.correctionDetailleeDisponible = true

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    if (this.sup < 4) typesDeQuestionsDisponibles = [parseInt(this.sup)]
    else typesDeQuestionsDisponibles = [1]
    const fName = []
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, a, b, c, P, xs, ys, x, Psimp, d, x1, x2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      fName.push(lettreMinusculeDepuisChiffre(i + 6))
      texte = 'Faire l\'étude et la représentation graphique de la parabole $P$ d\'équation :'
      switch (listeTypeDeQuestions[i]) {
        case 1 : // passe par 3 points à coordonnées entières dont -x1, 0 et x1.
          a = randint(-4, 4, 0)
          b = randint(-4, 4)
          c = randint(-5, 5)
          d = b * b - 4 * a * c
          xs = texFractionReduite(-b, 2 * a)
          ys = texFractionReduite(-d, 4 * a)
          P = `${a}*x^2${ecritureAlgebrique(b)}*x${ecritureAlgebrique(c)}`
          Psimp = `${simplify(P).toString().replaceAll('*', '\\times ')}`
          P = P.replaceAll('*', '\\times ')
          texte = `$P : y = ${Psimp}$`

          texteCorr = `Le coefficient $a=${a}$ devant le terme en $x^2$ est ${['négatif', 'positif'][1 * (a > 0)]}, la parabole $P$ a donc ses branches dirigées vers le ${['bas', 'haut'][1 * (a > 0)]}`

          texteCorr += `<br>Regardons si la parabole $P$ coupe l'axe des abscisses, pour cela cherchons les $x$ tels que : $${Psimp}=0$`
          if (d > 0) {
            x1 = (-b - Math.sqrt(d)) / 2 / a
            x2 = (-b + Math.sqrt(d)) / 2 / a
            if (c === 0) {
              texteCorr += `<br>On peut factoriser l'expression en : $x(${a}\\times x${ecritureAlgebrique(b)})=0$`
              texteCorr += '<br>On en déduit que la parabole $P$ coupe l\'axe des abscisses en '
              texteCorr += `$x_1=0$ et $x_2=${texFractionReduite(-b, a)}$`
            } else {
              texteCorr += `<br>C'est une équation du second degré : $${P}=0$ avec $a=${a}$, $b=${b}$ et $c=${c}$`
              texteCorr += `<br>Calculons le discriminant : $\\Delta=b^2-4ac=${d} > 0$`
              texteCorr += '<br>On en déduit que la parabole $P$ coupe l\'axe des abscisses en '
              texteCorr += `$x=\\dfrac{${ecritureAlgebrique(-b)}-${texRacineCarree(d)}}{2\\times ${ecritureParentheseSiNegatif(a)}}${EgalEnviron(x1)}$`
              texteCorr += ` et $x=\\dfrac{${ecritureAlgebrique(-b)}+${texRacineCarree(d)}}{2\\times ${ecritureParentheseSiNegatif(a)}}${EgalEnviron(x2)}$`
            }
          } else if (d === 0) {
            texteCorr += `<br>Il n'y a qu'une solution donnée par $x=${texFractionReduite(-b, 2 * a)}$`
          } else {
            texteCorr += `<br>C'est une équation du second degré : $${P}=0$ avec $a=${a}$, $b=${b}$ et $c=${c}$`
            texteCorr += `<br>Calculons le discriminant : $\\Delta=b^2-4ac=${d} < 0$`
            texteCorr += '<br>Il n\'y a pas de solution et donc la parabole $P$ ne coupe pas l\'axe des abscisses'
          }
          texteCorr += '<br>$\\underline{\\text{Coordonnées } S(x_S,y_S) \\text{ du sommet de la parabole } P}$ :'
          texteCorr += `<br>L'abscisse du sommet $S$ est donné par la formule $x_S=\\dfrac{-b}{2a}=${xs}$`
          texteCorr += '<br>Et son ordonnée peut être calculé en utilisant la formule $y_S=\\dfrac{-\\Delta}{4a}$ (ou en remplaçant $x$ par $x_S$ dans l\'équation de la parabole)'
          texteCorr += `<br>$y_S=\\dfrac{-\\Delta}{4a}=\\dfrac{${-d}}{${ecritureParentheseSiNegatif(4 * a)}}=${ys}$`
          texteCorr += `<br>Le sommet $S$ a donc pour coordonnées $\\left(${xs}, ${ys}\\right)$`
      }
      texteCorr += '<br>$\\underline{\\text{Recherche de points supplémentaires}}$ :'
      let tableau = '<br>$\\begin{array}{c|c|c|c|c|c|c|c}'
      const points = []
      const g = x => a * x ** 2 + b * x + c
      if (d <= 0) { // On n'a que le sommet, on cherche 3 points avant et 3 points après
        texteCorr += '<br>Les coordonnées du sommet $S$ et le sens des branches de la parabole ne sont pas suffisants pour faire un tracé correct.'
        texteCorr += '<br>Cherchons les images d\'abscisses à gauche et à droite du sommet :'
        for (let k = -3; k < 4; k++) {
          x = floor(-b / 2 / a) + k
          points.push([k === 0 ? `x_S${EgalEnviron(-b / 2 / a)}` : x, k === 0 ? `y_S${EgalEnviron(-d / 4 / a)}` : g(x)])
        }
      } else { // on a le sommet et les 2 racines x1 et x2. On ajoute 2 points avant x1 et 2 points après x2
        const xmin = Math.min(x1, x2)
        x2 = Math.max(x1, x2)
        x1 = xmin
        points.push([`x_1${EgalEnviron(x1)}`, '0'])
        points.push([`x_S${EgalEnviron(-b / 2 / a)}`, `y_S${EgalEnviron(-d / 4 / a)}`])
        points.push([`x_2${EgalEnviron(x2)}`, '0'])
        for (let k = 1; k < 3; k++) {
          x = Math.floor(x1 - k)
          points.unshift([x, g(x)])
          x = Math.floor(x2 + k)
          points.push([x, g(x)])
        }
      }
      points.unshift(['x', 'y'])
      tableau += points.map(v => v[0]).join('&') + '\\\\ \\hline '
      tableau += points.map(v => v[1]).join('&') + '\\end{array}$'
      texteCorr += tableau
      texteCorr += '<br>On obtient finalement le graphique suivant :<br>'

      // Représentation graphique

      const xmin = Math.min(-1, points[1][0]) // -1 pour être voir l'axe des y si le min est positif
      const xmax = Math.max(1, points.slice(-1)[0][0]) // 1 pour être voir l'axe des y si le max est négatif
      const ymin = 0 | Math.min(-1, -1 + (a > 0 ? -d / 4 / a : Math.min(g(xmin + 1), g(xmax - 1)))) // ymin pour parabole (valeur entière)
      const ymax = 0 | Math.max(1, 1 + (a < 0 ? -d / 4 / a : Math.max(g(xmin + 1), g(xmax - 1)))) // ymax pour parabole

      const r = repere({ xMin: xmin, xMax: xmax, yMin: ymin, yMax: ymax })

      const cg = courbe(g, { repere: r, xMin: xmin, xMax: xmax })
      texteCorr += mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, pixelsParCm: 30, scale: 0.8 }, r, cg)

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
  // this.besoinFormulaireNumerique = ['Type de questions ',4,"1 : Passant par trois points à coordonnées entières 1\n2 : Connaissant le sommet et un point de passage\n3 : Connaissant les deux racines et un point de passage\n4 : Mélange des trois type de questions"];
}
