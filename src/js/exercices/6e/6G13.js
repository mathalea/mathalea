import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, creerNomDePolygone, texNombre } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, polygoneRegulier, codageAngleDroit, pointAdistance, polygone, longueur, segment, afficheLongueurSegment } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'
export const titre = 'Tracer des carrés et des rectangles de longueurs données'

export const dateDePublication = '10/09/2022'

/**
 * Simple construction de rectangles et de carrés dont les longueur des côtés sont données avec pour autocorrection une vérification des mesures des diagonales.
 * @author Guillaume Valmont
 * Référence 6G13
*/
export default class TracerCarresRectangleslongueurDonnees extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 2

    this.besoinFormulaireNumerique = ['Figure à tracer', 2, '1 : Carré\n2 : Rectangle\n3 : Mélange']
    this.sup = 3
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    let typesDeQuestionsDisponibles = ['Carré', 'Rectangle']
    if (this.sup === 1) typesDeQuestionsDisponibles = ['Carré']
    if (this.sup === 2) typesDeQuestionsDisponibles = ['Rectangle']

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const objetsCorrection = []
      const nomPoly = creerNomDePolygone(4)
      let longueurFigure = randint(30, 60)
      let largeurFigure = randint(20, 50, [longueurFigure])
      longueurFigure /= 10
      largeurFigure /= 10

      const A = point(0, 0, nomPoly.charAt(0), 'below left')
      const B = point(longueurFigure, 0, nomPoly.charAt(1), 'below right')
      let C, D, naturePoly, figure
      switch (listeTypeDeQuestions[i]) {
        case 'Carré': {
          naturePoly = 'carré'
          figure = polygoneRegulier(A, B, 4)
          C = point(figure.listePoints[2].x, figure.listePoints[2].y, nomPoly.charAt(2), 'above right')
          D = point(figure.listePoints[3].x, figure.listePoints[3].y, nomPoly.charAt(3), 'above left')
          break
        }

        case 'Rectangle':
          naturePoly = 'rectangle'
          C = pointAdistance(B, largeurFigure, 90, nomPoly.charAt(2))
          D = pointAdistance(C, longueurFigure, 180, nomPoly.charAt(3))
          figure = polygone(A, B, C, D)
          break
      }
      const aA = codageAngleDroit(B, A, D, 'red', 0.7, 1, 0.6, 'red', 0.2)
      const aB = codageAngleDroit(A, B, C, 'red', 0.7, 1, 0.6, 'red', 0.2)
      const aC = codageAngleDroit(B, C, D, 'red', 0.7, 1, 0.6, 'red', 0.2)
      const aD = codageAngleDroit(C, D, A, 'red', 0.7, 1, 0.6, 'red', 0.2)
      const segmentAC = segment(A, C, 'blue')
      const segmentBC = segment(B, D, 'blue')
      const traces2 = tracePoint(A, B, C, D)
      const labels2 = labelPoint(A, B, C, D)
      figure.epaisseur = 2
      const longueurAC = longueur(A, C)
      objetsCorrection.push(traces2, labels2, figure, aA, aB, aC, aD, segmentAC, segmentBC)
      objetsCorrection.push(afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(D, C), afficheLongueurSegment(A, D), afficheLongueurSegment(A, C, 'blue'))
      const anim = new Alea2iep()
      anim.recadre(-longueurFigure, 2 * largeurFigure) // Déplace l'origine du repère (à mettre en premier obligatoirement)
      anim.pointCreer(A, { dx: -0.5, dy: -0.5 }) // On déplace les labels des points avec dx et dy
      anim.regleMontrer(A)
      anim.regleSegment(A, B)
      anim.pointCreer(B, { dx: 0.2, dy: -0.5 })
      anim.equerreMontrer(B)
      anim.equerreRotation(90)
      anim.regleDeplacer(B)
      anim.regleRotation(90)
      anim.equerreMasquer()
      anim.pointCreer(C, { dx: 0.2, dy: 0.8 })
      anim.tracer(C)
      anim.equerreMontrer(C)
      anim.equerreRotation(90)
      const D2 = point(D.x - 2, D.y)
      anim.tracer(D2)
      anim.equerreMasquer()
      anim.regleDeplacer(C)
      anim.regleRotation(180)
      anim.pointCreer(D, { dx: -0.5, dy: 0.8 })
      anim.regleSegment(D, A)
      anim.regleMasquer()
      anim.crayonMasquer()
      texte = `Construire le ${naturePoly} $${nomPoly}$ avec $${A.nom + B.nom} = ${texNombre(longueurFigure, 2)}~\\text{cm}$`
      if (listeTypeDeQuestions[i] === 'Rectangle') texte += ` et $${B.nom + C.nom} = ${texNombre(largeurFigure, 2)}~\\text{cm}$`
      texte += '.<br>'
      texteCorr = ''
      texteCorr += anim.htmlBouton()
      texteCorr += `<br><br>Pour l'auto-correction, on peut vérifier que $[${A.nom + C.nom}]$ et $[${B.nom + D.nom}]$ mesurent bien tous les deux $${texNombre(longueurAC, 1)}~\\text{cm}$`
      // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
      const xmin = Math.min(A.x, B.x, C.x, D.x) - 2
      const xmax = Math.max(A.x, B.x, C.x, D.x) + 2
      const ymin = Math.min(A.y, B.y, C.y, D.y) - 2
      const ymax = Math.max(A.y, B.y, C.y, D.y) + 2
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      const paramsCorrection = { xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, scale: 1 }
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        // Dans cet exercice, on n'utilise pas a, b, c et d mais A, B, C et D alors remplace-les !
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
