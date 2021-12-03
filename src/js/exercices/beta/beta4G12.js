import Exercice from '../Exercice.js'
import { choice, lettreDepuisChiffre, listeQuestionsToContenu } from '../../modules/outils.js'
import { grille, labelPoint, mathalea2d, point, segment, tracePoint, homothetie, polygone, symetrieAxiale, translation, droite, vecteur, rotation } from '../../modules/2d.js'

export const titre = 'Exo zéro Mathalea2d'

export default function SuperExoMathalea2d () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  const maGrille = grille(0, 0, 16, 16, 'gray', 0.4, 0.4)
  const A = point(0, 0)
  const transfos = ['symax', 'trans', 'rot90', 'symcen']
  const motifs = [
    polygone([point(1, 1), point(2, 1), point(2, 4), point(6, 4), point(6, 5), point(3, 5), point(3, 6), point(1, 6)]),
    polygone([point(1, 1), point(3, 1), point(3, 4), point(6, 4), point(6, 6), point(3, 6), point(3, 5), point(1, 5)])
  ]
  const parcours = [ // différents parcours pour aller de la figure de départ à celle d'arrivée.
    [0, 1, 2, 3, 4, 10, 16, 22, 28],
    [0, 1, 2, 3, 9, 10, 16, 22, 28],
    [0, 1, 2, 3, 9, 15, 16, 22, 28],
    [0, 1, 2, 3, 9, 15, 21, 22, 28],
    [0, 1, 2, 3, 9, 15, 21, 27, 28],
    [0, 1, 2, 8, 9, 10, 16, 22, 28],
    [0, 1, 2, 8, 9, 15, 16, 22, 28],
    [0, 1, 2, 8, 9, 15, 21, 22, 28],
    [0, 1, 2, 8, 9, 15, 21, 27, 28],
    [0, 1, 2, 8, 14, 15, 16, 22, 28],
    [0, 1, 2, 8, 14, 15, 21, 22, 28],
    [0, 1, 2, 8, 14, 15, 21, 27, 28],
    [0, 1, 2, 8, 14, 20, 21, 22, 28],
    [0, 1, 2, 8, 14, 20, 21, 27, 28],
    [0, 1, 2, 8, 14, 20, 26, 27, 28],
    [0, 1, 7, 8, 9, 10, 16, 22, 28],
    [0, 1, 7, 8, 9, 15, 16, 22, 28],
    [0, 1, 7, 8, 9, 15, 21, 22, 28],
    [0, 1, 7, 8, 9, 15, 21, 27, 28],
    [0, 1, 7, 8, 14, 15, 16, 22, 28],
    [0, 1, 7, 8, 14, 15, 21, 22, 28],
    [0, 1, 7, 8, 14, 15, 21, 27, 28],
    [0, 1, 7, 8, 14, 20, 21, 22, 28],
    [0, 1, 7, 8, 14, 20, 21, 27, 28],
    [0, 1, 7, 8, 14, 20, 26, 27, 28],
    [0, 1, 7, 13, 14, 15, 16, 22, 28],
    [0, 1, 7, 13, 14, 15, 21, 22, 28],
    [0, 1, 7, 13, 14, 15, 21, 27, 28],
    [0, 1, 7, 13, 14, 20, 21, 22, 28],
    [0, 1, 7, 13, 14, 20, 21, 22, 28],
    [0, 1, 7, 13, 14, 20, 21, 27, 28],
    [0, 1, 7, 13, 14, 20, 26, 27, 28],
    [0, 1, 7, 13, 19, 20, 21, 22, 28],
    [0, 1, 7, 13, 19, 20, 21, 27, 28],
    [0, 1, 7, 13, 19, 20, 26, 27, 28],
    [0, 1, 7, 13, 19, 25, 26, 27, 28],
    [0, 6, 7, 8, 9, 10, 16, 22, 28],
    [0, 6, 7, 8, 9, 15, 16, 22, 28],
    [0, 6, 7, 8, 9, 15, 21, 22, 28],
    [0, 6, 7, 8, 9, 15, 21, 27, 28],
    [0, 6, 7, 8, 14, 15, 16, 22, 28],
    [0, 6, 7, 8, 14, 15, 21, 22, 28],
    [0, 6, 7, 8, 14, 15, 21, 27, 28],
    [0, 6, 7, 8, 14, 20, 21, 22, 28],
    [0, 6, 7, 8, 14, 20, 21, 27, 28],
    [0, 6, 7, 8, 14, 20, 26, 27, 28],
    [0, 6, 7, 13, 14, 15, 16, 22, 28],
    [0, 6, 7, 13, 14, 15, 21, 22, 28],
    [0, 6, 7, 13, 14, 15, 21, 27, 28],
    [0, 6, 7, 13, 14, 20, 21, 22, 28],
    [0, 6, 7, 13, 14, 20, 21, 22, 28],
    [0, 6, 7, 13, 14, 20, 21, 27, 28],
    [0, 6, 7, 13, 14, 20, 26, 27, 28],
    [0, 6, 7, 13, 19, 20, 21, 22, 28],
    [0, 6, 7, 13, 19, 20, 21, 27, 28],
    [0, 6, 7, 13, 19, 20, 26, 27, 28],
    [0, 6, 7, 13, 19, 25, 26, 27, 28],
    [0, 6, 12, 13, 14, 15, 16, 22, 28],
    [0, 6, 12, 13, 14, 15, 21, 22, 28],
    [0, 6, 12, 13, 14, 15, 21, 27, 28],
    [0, 6, 12, 13, 14, 20, 21, 22, 28],
    [0, 6, 12, 13, 14, 20, 21, 22, 28],
    [0, 6, 12, 13, 14, 20, 21, 27, 28],
    [0, 6, 12, 13, 14, 20, 26, 27, 28],
    [0, 6, 12, 13, 19, 20, 21, 22, 28],
    [0, 6, 12, 13, 19, 20, 21, 27, 28],
    [0, 6, 12, 13, 19, 20, 26, 27, 28],
    [0, 6, 12, 13, 19, 25, 26, 27, 28],
    [0, 6, 12, 18, 19, 20, 21, 22, 28],
    [0, 6, 12, 18, 19, 20, 21, 27, 28],
    [0, 6, 12, 18, 19, 20, 26, 27, 28],
    [0, 6, 12, 18, 19, 25, 26, 27, 28],
    [0, 6, 12, 18, 24, 25, 26, 27, 28]
  ]

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    for (let i = 0, texte, texteCorr, chemin, objetsEnonce, objetsCorrection, polys; i < this.nbQuestions; i++) {
      polys = []
      polys[0] = choice(motifs)
      chemin = choice(parcours)
      objetsEnonce = []
      objetsCorrection = []
      texte = ''
      texteCorr = ''
      // construction de la grille
      const p1 = homothetie(polygone([
        point(1, 1),
        point(2, 1),
        point(2, 4),
        point(6, 4),
        point(6, 5),
        point(3, 5),
        point(3, 6),
        point(1, 6)
      ], 'blue'
      ), A, 0.4)
      p1.couleurDeRemplissage = 'blue'
      p1.opaciteDeRemplissage = 0.5
      const noeuds = []
      const labels = []
      objetsEnonce.push(maGrille)
      objetsCorrection.push(maGrille)
      for (let i = 0; i < 6; i++) {
        objetsEnonce.push(segment(i * 3.2, 0, i * 3.2, 16))
        objetsEnonce.push(segment(0, i * 3.2, 16, i * 3.2))
        for (let j = 0; j < 6; j++) {
        // labels[i * 6 + j] = i * 6 + j < 26 ? lettreDepuisChiffre(i * 6 + j + 1) : lettreDepuisChiffre((i * 6 + j) % 26 + 1) + "'"
          labels[i * 6 + j] = Number(i * 6 + j).toString()
          noeuds[i * 6 + j] = point(i * 3.2, j * 3.2, labels[i * 6 + j], 'above right')
          objetsEnonce.push(tracePoint(noeuds[i * 6 + j]), labelPoint(noeuds[i * 6 + j]))
        }
      }
      const p2 = symetrieAxiale(p1, droite(noeuds[6], noeuds[7]))
      const p3 = translation(p2, vecteur(noeuds[6], noeuds[7]))
      const p4 = rotation(p3, noeuds[14], -90)
      const p5 = symetrieAxiale(p4, droite(noeuds[9], noeuds[15]))
      const p55 = symetrieAxiale(p5, droite(noeuds[10], noeuds[16]))
      const p6 = rotation(p5, noeuds[16], 180)
      const p7 = translation(p6, vecteur(noeuds[16], noeuds[22]))
      const p8 = rotation(p7, noeuds[28], -90)

      objetsEnonce.push(p1, p2, p3, p4, p5, p6, p7, p8, p55)
      const paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: 18, ymax: 18, pixelsParCm: 20, scale: 1, mainlevee: false }

      const paramsCorrection = { xmin: -0.5, ymin: -0.5, xmax: 18, ymax: 18, pixelsParCm: 20, scale: 1 }

      texte += mathalea2d(paramsEnonce, objetsEnonce)

      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
}
