import { courbeSpline, point, repere, tracePoint } from '../../modules/2d.js'
import { splineCatmullRom } from '../../modules/fonctionsMaths.js'
import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
export const titre = 'Interpollation de Catmull-Rom'

/**
 * Trace une courbe interpolee par des splines.
 * @author Jean-Claude Lhote
 * Référence P014
*/
export default function TraceCourbeInterpolee1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = '3;5;2;1;-2;-1;0' // liste de points
  this.sup2 = '-5;2'
  this.sup3 = 1
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    const liste = this.sup.split(';')
    const ordonnees = []
    const objets = []
    const couleurs = [
      { colPoint: 'red', colCourbe: 'black' },
      { colPoint: 'blue', colCourbe: 'red' },
      { colPoint: 'green', colCourbe: 'blue' }]
    for (let i = 0; i < liste.length; i++) {
      ordonnees.push(parseFloat(liste[i]))
    }
    const xMin = parseFloat(this.sup2.split(';')[0])
    const pas = parseFloat(this.sup2.split(';')[1])
    const xMax = xMin + liste.length * pas
    let yMin = 100
    let yMax = -100

    for (let i = 0; i < liste.length; i++) {
      yMin = Math.min(yMin, ordonnees[i])
      yMax = Math.max(yMax, ordonnees[i])
    }
    const r = repere({ xMin: xMin - 1, xMax: xMax + 1, yMin: yMin - 1, yax: yMax - 1 })
    const f = splineCatmullRom({
      tabY: ordonnees,
      x0: xMin,
      step: pas
    })
    const c = courbeSpline(f, { repere: r, step: 0.1, xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, tracenoeuds: true, color: couleurs[parseInt(this.sup3) - 1].colCourbe })
    objets.push(r, c)

    if (this.sup2) {
      for (let i = 0, p; i < liste.length; i++) {
        p = tracePoint(point(xMin + i * pas, ordonnees[i]))
        p.style = '+'
        p.epaisseur = 2
        p.color = couleurs[parseInt(this.sup3) - 1].colPoint
        objets.push(p)
      }
    }
    this.contenu = mathalea2d({ xmin: xMin - 1, xmax: xMax + 1, ymin: yMin - 1, ymax: yMax + 1 }, objets)
  }
  this.besoinFormulaireTexte = ['Liste des ordonnées sous la forme: y0;y1;y2;...']
  this.besoinFormulaire2Texte = ['Première abscisse et incrément séparés par ; (séparateur décimal = . ) exemple : -5;0.5']
  this.besoinFormulaire3Numerique = ['Modèles de couleur ', 3, '1 : Points rouges sur courbe noire\n2 : Points bleus sur courbe rouge\n3 : Points verts sur courbe bleue']
}
