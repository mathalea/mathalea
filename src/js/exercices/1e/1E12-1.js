import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, lettreMinusculeDepuisChiffre } from '../../modules/outils.js'
import { repere, courbe, mathalea2d } from '../../modules/2d.js'
import { calcule } from '../../modules/fonctionsMaths.js'

export const titre = 'Lecture graphique d\'éléments caractéristiques d\'un trinôme'

/**
 * @author Jean-Léon Henry
 * Faire lire sur un graphique :
 * - le signe du coefficient dominant
 * - les racines
 * - les coordonnées du sommet et/ou la valeur de l'extremum
 * - les 3 trucs précédents
 * référence 1E12-1
 */
export default function LireElementsCarac () {
  Exercice.call(this)
  this.consigne = 'Lecture graphique'
  this.nbQuestions = 5 // Nombre de questions par défaut
  // this.nbCols = 2 // Uniquement pour la sortie LaTeX
  // this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  // this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function (numeroExercice) {
    const pixelsParCm = 20
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    if (this.sup < 4) typesDeQuestionsDisponibles = [parseInt(this.sup)]
    else typesDeQuestionsDisponibles = [1, 2, 3]
    const fName = []; let Ymin; let Yscale; let Ymax
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, a, b, c, x1, x2, alpha, beta, f, r, svgYmin, svgYmax, F, orientation, signeA, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      fName.push(lettreMinusculeDepuisChiffre(i + 6))
      texteCorr = ''
      a = randint(-2, 2, 0)
      switch (listeTypeDeQuestions[i]) {
        case 1: // Signe du coefficient dominant
          texte = 'Quel est le signe du coefficient dominant'
          x1 = randint(-10, 10)
          x2 = randint(-10, 10, x1)// Flemme de coder la gestion d'une racine double
          b = -a * (x1 + x2)
          c = x1 * x2 * a
          f = function (x) {
            return calcule(a * x ** 2 + b * x + c)
          }
          if (a < 0) {
            orientation = 'bas'
            signeA = 'négatif'
          } else {
            orientation = 'haut'
            signeA = 'positif'
          }
          texteCorr = `La parabole est orientée vers le ${orientation}, on en déduit que le coefficient dominant de $\\mathscr{${fName[i]}}$ est ${signeA}.`
          break
        case 2: // Racines
          texte = 'Quelles sont les racines'
          x1 = randint(-10, 10)
          x2 = randint(-10, 10, x1)// Flemme de coder la gestion d'une racine double
          b = -a * (x1 + x2)
          c = x1 * x2 * a

          f = function (x) {
            return calcule(a * x ** 2 + b * x + c)
          }
          texteCorr = `La courbe de $\\mathscr{${fName[i]}}$ coupe l'axe horizontal aux points $(${x1};0)$ et $(${x2};0)$. Les deux racines sont donc $${x1}$ et $${x2}$.`
          break
        case 3: // Coordonnées du sommet
          texte = 'Quelles sont les coordonnées du sommet'
          alpha = randint(-9, 9)
          beta = randint(-9, 9)
          b = -2 * a * alpha
          c = a * alpha ** 2 + beta
          f = function (x) {
            return calcule(a * x ** 2 + b * x + c)
          }
          if (a > 0) {
            orientation = 'bas' // la variable ne désigne plus l'orientation de la parabole, flemme d'en déclarer une autre.
          } else {
            orientation = 'haut'
          }
          texteCorr = `Le sommet, c'est-à-dire le point le plus ${orientation} de la parabole, a pour coordonnées $(${alpha};${beta})$.`
          break
      }
      texte += ` de la fonction polynomiale $\\mathscr{${fName[i]}}$ du second degré représentée ci-dessous ?<br>`
      // Génération du graphique
      if (a < 0) {
        Ymax = Math.ceil(f(-b / (2 * a)) + 2)
        Ymin = Math.min(f(x1), f(x2), f(-x1), f(0), f(-6), f(6))
      } else {
        Ymin = Math.floor(f(-b / (2 * a)) - 2)
        Ymax = Math.max(f(x1), f(x2), f(-x1), f(0), f(-6), f(6))
      }

      if (Ymax - Ymin < 10) Yscale = 2
      else Yscale = Math.max(1, calcule(Math.round(Math.ceil((Ymax - Ymin) / 10) / 5) * 5)) * 2
      r = repere({
        xmin: -10,
        ymin: Ymin - Yscale,
        ymax: Ymax + Yscale,
        xmax: 10,
        xscale: 1,
        yscale: Yscale,
        positionLabelY: -0.8
      })

      svgYmin = Math.min(calcule(Ymin / Yscale), -1)
      svgYmax = Math.max(calcule(Ymax / Yscale), 1)

      F = x => a * x ** 2 + b * x + c

      texte += mathalea2d({ xmin: -11, xmax: 11, ymin: svgYmin, ymax: svgYmax + 2, pixelsParCm: pixelsParCm, scale: 0.6 }, courbe(F, -10, 10, 'blue', 1.5, r), r)

      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de questions ', 4, '1 : Signe du coefficient dominant\n2 : Racines\n3 : Coordonnées du sommet\n4 : Mélange des trois type de questions']
}
