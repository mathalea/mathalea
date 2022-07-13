import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, Triangles } from '../../modules/outils.js'
import { point, mediatrice, codageMediatrice, codageBissectrice, bissectrice, polygone, nommePolygone, rotation, similitude, medianeTriangle, centreGraviteTriangle, hauteurTriangle, codageHauteurTriangle, codageMedianeTriangle, mathalea2d } from '../../modules/2d.js'
export const titre = 'Déterminer la nature d\'une droite remarquable'

/**
 * 5G22
 * @author Jean-Claude Lhote
 * Les droites remarquables du triangle : hauteurs médiatrices....médianes et bissectrices
 */
export default function DroiteRemarquableDuTriangle () {
  Exercice.call(this) // Héritage de la classe Exercice()

  this.titre = titre
  this.consigne = 'Définir :'
  this.spacing = 2
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const triangles = []
    const sommets = [[]]
    const A = []
    const B = []
    const C = []
    const t = []
    const d = []
    const n = []
    const c = []
    const objets = []
    let A0, B0, C0, G
    let typesDeQuestionsDisponibles
    if (this.sup === 1) typesDeQuestionsDisponibles = [1, 2]
    if (this.sup === 2) typesDeQuestionsDisponibles = [3, 4]
    if (this.sup === 3) typesDeQuestionsDisponibles = [1, 2, 3, 4]
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, angle, rapport, texte, texteCorr; i < this.nbQuestions; i++) { // this.nbQuestions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      triangles[i] = new Triangles()
      sommets[i] = triangles[i].getSommets(false)

      A0 = point(3, randint(1, 2))
      B0 = point(6, randint(1, 2))
      angle = choice([50, 60, 70, 75, 80, 100, 110, 120])
      rapport = randint(7, 13) / 10
      C0 = similitude(B0, A0, angle, rapport)
      G = centreGraviteTriangle(A0, B0, C0)
      a = randint(0, 30) * 12 - 180
      A[i] = rotation(A0, G, a, sommets[i][0], 'below left')
      B[i] = rotation(B0, G, a, sommets[i][1], 'below right')
      C[i] = rotation(C0, G, a, sommets[i][2], 'above')
      t[i] = polygone([A[i], B[i], C[i]])
      n[i] = nommePolygone(t[i], `${sommets[i][0]}${sommets[i][1]}${sommets[i][2]}`)
      switch (listeTypeDeQuestions[i]) {
        case 1:
          d[i] = hauteurTriangle(C[i], B[i], A[i], 'blue')
          d[i].epaisseur = 1
          c[i] = codageHauteurTriangle(C[i], B[i], A[i])
          objets[i] = [A[i], B[i], C[i], t[i], d[i], n[i], c[i]]
          texteCorr = `La droite tracée est la hauteur issue de $${sommets[i][2]}$ dans le triangle ${triangles[i].getNom()}.<br>`
          texteCorr += mathalea2d({ xmin: -3, ymin: -3, xmax: 8, ymax: 8, scale: 0.5, pixelsParCm: 20 }, ...objets[i])
          break
        case 2:
          d[i] = mediatrice(A[i], B[i], '', 'blue')
          d[i].epaisseur = 1
          c[i] = codageMediatrice(A[i], B[i])
          objets[i] = [A[i], B[i], C[i], t[i], d[i], n[i], c[i]]
          texteCorr = `La droite tracée est la médiatrice du segment [$${sommets[i][0]}${sommets[i][1]}]$.<br>`
          texteCorr += mathalea2d({ xmin: -3, ymin: -3, xmax: 8, ymax: 8, scale: 0.5, pixelsParCm: 20 }, ...objets[i], mediatrice(A[i], B[i], '', 'blue', 'gray', 'green', true, true, '×', '||', 1))
          break
        case 3:
          d[i] = medianeTriangle(C[i], B[i], A[i], 'blue')
          d[i].epaisseur = 1
          c[i] = codageMedianeTriangle(B[i], A[i], 'black', '//')
          objets[i] = [A[i], B[i], C[i], t[i], d[i], n[i], c[i]]
          texteCorr = `La droite tracée est la médiane issue de $${sommets[i][2]}$ dans le triangle ${triangles[i].getNom()}.<br>`
          texteCorr += mathalea2d({ xmin: -3, ymin: -3, xmax: 8, ymax: 8, scale: 0.5, pixelsParCm: 20 }, ...objets[i])
          break
        case 4:
          d[i] = bissectrice(A[i], B[i], C[i], 'blue')
          d[i].epaisseur = 1
          c[i] = codageBissectrice(A[i], B[i], C[i])
          objets[i] = [A[i], B[i], C[i], t[i], d[i], n[i], c[i]]
          texteCorr = `La droite tracée est la bissectrice de l'angle $\\widehat{${sommets[i][0]}${sommets[i][1]}${sommets[i][2]}}$.<br>`
          texteCorr += mathalea2d({ xmin: -3, ymin: -3, xmax: 8, ymax: 8, scale: 0.5, pixelsParCm: 20 }, ...objets[i], bissectrice(A[i], B[i], C[i], 'blue', 'red', 'green', true, true, '×', 3, 1))
          break
      }

      texte = `Quelle est la nature de la droite tracée en bleu pour le triangle ${triangles[i].getNom()} ?<br>` + mathalea2d({ xmin: -3, ymin: -3, xmax: 8, ymax: 8, scale: 0.5, pixelsParCm: 20 }, ...objets[i])

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
      }
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de droites', 3, '1 : Hauteurs et Médiatrices\n2 : Médianes et Bissectrices\n3 : Mélange']
}
