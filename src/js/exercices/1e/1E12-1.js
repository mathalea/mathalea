import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, lettreMinusculeDepuisChiffre } from '../../modules/outils.js'
import { mathalea2d, repere2, courbe2 } from '../../modules/2d.js'
import { calcule } from '../../modules/fonctionsMaths.js'
import { min, max } from 'mathjs'

export const titre = 'Lecture graphique d\'éléments caractéristiques d\'un trinôme'

/**
 * @author Jean-Léon Henry (modifié par EE pour corriger exo et remplacer Repere et Courbe par Repere2 et Courbe2 (juillet 2022))
 * Faire lire sur un graphique :
 * - le signe du coefficient dominant
 * - les racines
 * - les coordonnées du sommet et/ou la valeur de l'extremum
 * - les 3 trucs précédents
 * référence 1E12-1
 */
export default function LireElementsCarac () {
  Exercice.call(this)
  this.nbQuestions = 5 // Nombre de questions par défaut
  this.sup = 4

  this.nouvelleVersion = function (numeroExercice) {
    this.consigne = 'Répondre à '
    this.consigne += this.nbQuestions > 1 ? 'ces questions' : 'cette question'
    this.consigne += ' par lecture graphique.'
    const pixelsParCm = 20
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    if (this.sup < 4) typesDeQuestionsDisponibles = [parseInt(this.sup)]
    else typesDeQuestionsDisponibles = [1, 2, 3]
    const fName = []
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let Ymin; let Yscale; let Ymax
    let Xmin; let Xmax
    for (let i = 0, texte, texteCorr, a, b, c, x1, x2, alpha, beta, f, r, svgYmin, svgYmax, F, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      fName.push(lettreMinusculeDepuisChiffre(i + 6))
      texteCorr = ''
      a = randint(-2, 2, 0) // On prend a au hasard quoi qu'il arrive
      // Générons les coefficients du trinôme, la consigne, la correction
      switch (listeTypeDeQuestions[i]) {
        case 1: // Signe du coefficient dominant
          texte = 'Quel est le signe du coefficient dominant'
          // On choisit 2 racines entières distinctes dans [-10;10]
          x1 = randint(-10, 10)
          x2 = randint(-10, 10, x1)// Flemme de coder la gestion d'une racine double
          // On fabrique les coeffs à partir des racines
          b = -a * (x1 + x2)
          c = x1 * x2 * a

          texteCorr = `La parabole est orientée vers le ${a < 0 ? 'bas' : 'haut'}, on en déduit que le coefficient dominant de $\\mathscr{${fName[i]}}$ est ${a < 0 ? 'négatif' : 'positif'}.`
          break
        case 2: // Racines
          texte = 'Quelles sont les racines'
          // On choisit 2 racines entières distinctes dans [-10;10]
          x1 = randint(-10, 10)
          x2 = randint(-10, 10, x1)// Flemme de coder la gestion d'une racine double
          // On fabrique les coeffs à partir des racines
          b = -a * (x1 + x2)
          c = x1 * x2 * a

          texteCorr = `La courbe de $\\mathscr{${fName[i]}}$ coupe l'axe horizontal aux points $(${Math.min(x1, x2)};0)$ et $(${Math.max(x1, x2)};0)$. Les deux racines sont donc $${Math.min(x1, x2)}$ et $${Math.max(x1, x2)}$.`
          break
        case 3: // Coordonnées du sommet
          texte = 'Quelles sont les coordonnées du sommet'
          // On choisit le sommet au hasard
          alpha = randint(-5, 5)
          beta = randint(-5, 5)
          // On fabrique les coefficients
          b = -2 * a * alpha
          c = a * alpha ** 2 + beta

          texteCorr = `Le sommet, c'est-à-dire le point le plus ${a > 0 ? 'bas' : 'haut'} de la parabole, a pour coordonnées $(${alpha};${beta})$.`
          break
      }
      // Les coeffs sont générés, on peut donc créer la fonction
      f = function (x) {
        return calcule(a * x ** 2 + b * x + c)
      }
      texte += ` de la fonction polynomiale $\\mathscr{${fName[i]}}$ du second degré représentée ci-dessous ?<br>`
      /** Génération du graphique
       * a = randint(-2,2,0)
       * Q1,Q2 :
       *    deux racines dans [-9;9]
       * Q3 :
       *    le sommet dans le carré [-9;9]²
      */

      if (listeTypeDeQuestions[i] === 3) {
        Xmin = alpha - 5
        Xmax = alpha + 5
        Ymin = beta - 5
        Ymax = beta + 5
      } else {
        Xmin = Math.min(x1, x2) - 2
        Xmax = Math.max(x1, x2) + 2
        if (a < 0) {
          Ymax = Math.ceil(f(-b / (2 * a)) + 2)
          Ymin = f(Xmin)
        } else {
          Ymin = Math.floor(f(-b / (2 * a)) - 2)
          Ymax = f(Xmax)
        }
      }

      if (Ymax - Ymin < 10) Yscale = 2
      else Yscale = Math.max(1, calcule(Math.round(Math.ceil((Ymax - Ymin) / 10) / 5) * 5)) * 2
      if (listeTypeDeQuestions[i] === 3) {
        // Nécessaire pour permettre la lecture graphique
        Yscale = 1
      }
      Xmin = min(0, Xmin)
      Xmax = max(1, Xmax)
      const YminEE = Yscale * Math.floor(Ymin / Yscale)
      r = repere2({ xMin: Xmin, xMax: Xmax, yMin: YminEE - Yscale, yMax: Ymax + Yscale, xUnite: 1, yUnite: 1 / Yscale, yThickDistance: Yscale })

      svgYmin = Math.min(calcule(Ymin / Yscale), -1)
      svgYmax = Math.max(calcule(Ymax / Yscale), 1)

      F = x => a * x ** 2 + b * x + c

      texte += mathalea2d({
        xmin: Xmin - 1,
        xmax: Xmax + 1,
        ymin: svgYmin,
        ymax: svgYmax + 2,
        pixelsParCm,
        scale: 0.6
      },
      courbe2(F, { Xmin: Xmin, Xmax: Xmax, color: 'blue', epaisseur: 1.5, repere: r }), r)

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
