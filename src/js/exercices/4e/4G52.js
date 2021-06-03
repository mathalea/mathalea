import { labelPoint, mathalea2d, tracePoint } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { lettreDepuisChiffre, listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { radians, sin } from '../../modules/fonctionsMaths.js'
import { point3d, arete3d } from '../../modules/3d.js'
import Exercice from '../Exercice.js'
export const titre = 'Exercice de repérage dans un pavé droit'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Placer les points sur le pavé ci-dessous dans le repère $(A;I,J,K)$ : '
  this.nbQuestions = 3
  this.nbQuestionsModifiable = false // à modifier si besoin
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // 30+ pour la persperctive
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () { // c'est ici que les données sont relatives
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.introduction = '' // consigne avant les question y mettre le dessin + texte

    const hauteur = 12
    const largeur = 12
    const profondeur = 12
    if (parseInt(this.sup) === 3) {
      context.anglePerspective = 60
      context.coeffPerspective = 0.4
    } else if (parseInt(this.sup) === 2) {
      context.anglePerspective = 25
      context.coeffPerspective = 0.3
    } else if (parseInt(this.sup) === 1) {
      context.anglePerspective = 30
      context.coeffPerspective = 0.4
    }
    const A = point3d(0, 0, 0, true, 'A', 'below left')
    const B = point3d(largeur, 0, 0, true, 'B', 'below right')
    const C = point3d(largeur, profondeur, 0, true, 'C', 'above right')
    const D = point3d(0, profondeur, 0, true, 'D', 'above left')
    const E = point3d(0, 0, hauteur, true, 'E', 'above left')
    const F = point3d(largeur, 0, hauteur, true, 'F', 'above right')
    const G = point3d(largeur, profondeur, hauteur, true, 'G', 'above right')
    const H = point3d(0, profondeur, hauteur, true, 'H', 'above left')

    const objetsAtracer = []
    let nbgraduationx = randint(2, 4)
    let nbgraduationy = randint(2, 3)
    let nbgraduationz = randint(2, 4)
    while ((nbgraduationx >= 3) && (nbgraduationy >= 3)) {
      nbgraduationx = randint(2, 4)
      nbgraduationy = randint(2, 3)
      nbgraduationz = randint(2, 4)
    }
    const deltax = largeur / nbgraduationx
    const deltay = profondeur / nbgraduationy
    const deltaz = hauteur / nbgraduationz
    const I = point3d(deltax, 0, 0, true, 'I', 'below right')
    const J = point3d(0, deltay, 0, false, 'J', 'left')
    const K = point3d(0, 0, deltaz, true, 'K', 'left')

    objetsAtracer.push(labelPoint(A, B, C, D, E, F, G, H, I, J, K))

    for (let i = 0; i <= nbgraduationy; i++) {
      for (let j = 0, M, N, s; j <= nbgraduationz; j++) {
        M = point3d(0, i * deltay, j * deltaz)
        N = point3d(largeur, i * deltay, j * deltaz)

        if ((i === 0) || (j === nbgraduationz)) {
          s = arete3d(M, N, 'black', true)
        } else {
          s = arete3d(M, N, 'black', false)
        }
        objetsAtracer.push(s.p2d)
      }
    }
    for (let i = 0; i <= nbgraduationx; i++) {
      for (let j = 0, M, N, s; j <= nbgraduationz; j++) {
        M = point3d(i * deltax, 0, j * deltaz)
        N = point3d(i * deltax, profondeur, j * deltaz)
        if ((i === nbgraduationx) || (j === nbgraduationz)) {
          s = arete3d(M, N, 'black', true)
        } else {
          s = arete3d(M, N, 'black', false)
        }
        objetsAtracer.push(s.p2d)
      }
    }

    for (let i = 0, M, N, s; i <= nbgraduationx; i++) {
      M = point3d(i * deltax, 0, 0)
      N = point3d(i * deltax, 0, hauteur)
      s = arete3d(M, N, 'black', true)
      objetsAtracer.push(s.p2d)
      M = point3d(i * deltax, profondeur, 0)
      N = point3d(i * deltax, profondeur, hauteur)
      if (i < nbgraduationx) {
        s = arete3d(M, N, 'black', false)
      } else {
        s = arete3d(M, N, 'black', true)
      }
      objetsAtracer.push(s.p2d)
    }
    for (let i = 1, M, N, s; i < nbgraduationy; i++) {
      M = point3d(0, i * deltay, 0)
      N = point3d(0, i * deltay, hauteur)
      s = arete3d(M, N, 'black', false)
      objetsAtracer.push(s.p2d)
      M = point3d(largeur, i * deltay, 0)
      N = point3d(largeur, i * deltay, hauteur)
      s = arete3d(M, N, 'black', true)
      objetsAtracer.push(s.p2d)
    }

    for (let i = 0, texte, texteCorr, cpt = 0, pointCoord, s1, s2, s3, x, y, z, t, pointAplacer, objetsAtracerCorr; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      x = 0
      y = 0
      z = 0
      while (x === 0 && y === 0 && z === 0) {
        x = randint(0, nbgraduationx)
        y = randint(0, nbgraduationy)
        z = randint(0, nbgraduationz)
      }
      pointCoord = [x, y, z]
      texte = `Placer le point $${lettreDepuisChiffre(i + 12)}$ de coordonnées $(${pointCoord[0]},${pointCoord[1]},${pointCoord[2]})$`
      pointAplacer = point3d(pointCoord[0] * deltax, pointCoord[1] * deltay, pointCoord[2] * deltaz, lettreDepuisChiffre(i + 12), `${lettreDepuisChiffre(i + 12)}`, 'below right')
      s1 = arete3d(A, point3d(pointAplacer.x, 0, 0), 'red', true)
      s2 = arete3d(point3d(pointAplacer.x, 0, 0), point3d(pointAplacer.x, pointAplacer.y, 0), 'red', true)
      s3 = arete3d(point3d(pointAplacer.x, pointAplacer.y, 0), pointAplacer, 'red', true)
      s1.p2d.epaisseur = 3
      s2.p2d.epaisseur = 3
      s3.p2d.epaisseur = 3
      t = tracePoint(pointAplacer)
      t.epaisseur = 2
      t.color = 'red'
      t.taille = 6
      objetsAtracerCorr = [s1.p2d, s2.p2d, s3.p2d, t, labelPoint(pointAplacer)].concat(objetsAtracer)
      texteCorr = mathalea2d({ xmin: -1, xmax: 1 + largeur + profondeur * Math.cos(radians(context.anglePerspective)), ymin: -1, ymax: hauteur + profondeur * context.coeffPerspective * sin(context.anglePerspective) }, objetsAtracerCorr)
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    this.introduction = mathalea2d({ xmin: -1, xmax: 1 + largeur + profondeur * Math.cos(radians(context.anglePerspective)), ymin: -1, ymax: hauteur + profondeur * context.coeffPerspective * sin(context.anglePerspective) }, objetsAtracer)

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Angle de la perspective', 3, '1 : 30\n2 : 45\n3 : 60']
}
