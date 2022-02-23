import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, numAlpha, stringNombre } from '../../modules/outils.js'
import { texteSurSegment, polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, texteParPosition, milieu, mathalea2d } from '../../modules/2d.js'
export const titre = 'Calculer la largeur d’une rivière'

/**
 * Propose de calculer la largeur d'une rivière
 * @author Jean-Claude Lhote
 * Référence 3G32
*/
export default function CalculsTrigonometriques () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = true
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.nbQuestions = 1
  this.spacingCorr = 2
  this.spacing = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let distance; let alfa; let baita; let beta; let alpha; let taille; let A; let B; let S; let C; let R; let objets = []; let p
    if (context.isHtml) {
      alfa = 'α'
      baita = 'β'
    } else {
      alfa = '\\alpha'
      baita = '\\beta'
    }
    for (let i = 0, texte, texteCorr, j, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objets = []
      alpha = randint(25, 65)
      j = 0
      beta = alpha + randint(2, 5)
      distance = randint(7, 15) * 10
      taille = Math.round(distance * (Math.tan(beta * Math.PI / 180) - Math.tan(alpha * Math.PI / 180)))
      A = point(0, 7, 'A')
      B = point(0, 0, 'B')
      C = point(7, 0, 'C')
      S = point(12, 0, 'S')
      p = polygoneAvecNom(A, B, C, S)
      R = polygoneAvecNom(point(7, -1), point(12, -1), point(12, 8), point(7, 8))
      R[0].color = 'blue'
      R[0].couleurDeRemplissage = 'blue'
      R[0].opaciteDeRemplissage = 0.5
      R[0].opacite = 0.5
      objets.push(p[1], p[0], R[0], segment(A, C), codageAngleDroit(A, B, C))
      objets.push(afficheMesureAngle(B, A, C, 'black', 1, `${alfa}`), afficheMesureAngle(B, A, S, 'black', 2, `${baita}`))
      objets.push(texteSurSegment(`${stringNombre(distance)} m`, A, B, 'black', -0.5), texteParPosition('l', milieu(C, S).x, milieu(C, S).y + 0.5, 0, 'black', 2, 'middle', true))

      texte = 'Un géomètre veut mesurer la largeur d\'une rivière.<br>'
      texte += 'Pour cela, il remarque une souche notée $S$ sur la rive opposée.<br>'
      texte += 'Il a placé un cône sur sa rive en face de la souche, son emplacement est noté $C$.<br>'
      texte += 'Ensuite il s\'est éloigné de la berge en restant aligné avec la souche $S$ et le cône $C$ jusqu\'à un endroit où il place un bâton noté $B$.<br>'
      texte += `Du bâton, il effectue un quart de tour et s'éloigne d'une distance de $${distance}$ m jusqu'à son appareil de mesure noté $A$.<br>`
      texte += `À l'aide de son appareil, il mesure l'angle $\\widehat{BAC}$ noté $${alfa}$  et l'angle $\\widehat{BAS}$ noté $${baita}$.<br>`
      if (this.sup) {
        texte += `${numAlpha(j)}Exprimer $BC$ en fonction de $AB$ et de $${alfa}$.<br>`
        j++
        texte += `${numAlpha(j)}Exprimer $BS$ en fonction de $AB$ et de $${baita}$.<br>`
        j++
      }
      texte += `${numAlpha(j)}Exprimer $CS$ en fonction de $AB$, de $${alfa}$ et de $${baita}$.<br>`
      j++
      texte += `${numAlpha(j)}Calculer la largeur de la rivière au mètre près sachant que $${alfa}=${alpha}\\degree$ et $${baita}=${beta}\\degree$.<br>`
      texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
      j = 0
      texteCorr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
      if (this.sup) {
        texteCorr += `${numAlpha(j)}Dans le triangle $ABC$ rectangle en $B$ on a : $\\tan(${alfa})=\\dfrac{BC}{AB}$ d'où $BC=AB\\times \\tan(${alfa})$.<br>`
        j++
        texteCorr += `${numAlpha(j)}Dans le triangle $ABS$ rectangle en $B$ on a : $\\tan(${baita})=\\dfrac{BS}{AB}$ d'où $BS=AB\\times \\tan(${baita})$.<br>`
        j++
      }
      texteCorr += `${numAlpha(j)}Comme $BS=AB\\times \\tan(${baita})$ et $BC=AB\\times \\tan(${alfa})$, alors $CS=AB\\times (\\tan(${baita})-\\tan(${alfa}))$.<br>`
      j++
      texteCorr += `${numAlpha(j)}Donc $CS=${distance}\\times (\\tan(${beta})-\\tan(${alpha}))\\approx ${taille}$ m.<br>`

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
  this.besoinFormulaireCaseACocher = ['Afficher un schéma et des questions intermédiaires']
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu
