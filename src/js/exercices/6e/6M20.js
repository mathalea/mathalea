import { longueur, segment, mathalea2d, afficheLongueurSegment, afficheCoteSegment, codageAngleDroit, polygoneAvecNom, triangle2points1hauteur, point, rotation } from '../../modules/2d.js'
import { combinaisonListesSansChangerOrdre, creerNomDePolygone, listeQuestionsToContenu, randint, shuffle, texNombre, calcul, arrondi } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Grandeur from '../../modules/Grandeur.js'
export const titre = 'Calculer l\'aire de triangles'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Calculer l'aire de 3 triangles dont une hauteur est tracée.
 *
 * Une figure dynamique est disponible sur laquelle on peut déplacer le pied de la hauteur.
 *
 * @author Rémi Angot conversion mathalea2d Jean-Claude Lhote
 * Référence 6M20
 */
export default function AireDeTriangles () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.amcReady = amcReady
  this.amcType = amcType
  this.titre = titre
  this.consigne =
    "Calculer l'aire des 3 triangles suivants."
  this.spacing = 2
  // eslint-disable-next-line no-undef
  context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nbQuestionsModifiable = false
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false

  this.nouvelleVersion = function (numeroExercice) {
    this.listeCorrections = [] // Liste de questions corrigées
    this.listeQuestions = []
    this.autoCorrection = []
    const tableauDesCotes = shuffle([5, 6, 7, 8, 9]) // pour s'assurer que les 3 côtés sont différents
    const tableauDesHauteurs = shuffle([3, 4, 5, 6]) // pour s'assurer que les 3 hauteurs sont différents
    const cotes = combinaisonListesSansChangerOrdre(tableauDesCotes, this.nbQuestions)
    const hauteurs = combinaisonListesSansChangerOrdre(tableauDesHauteurs, this.nbQuestions)
    let triH; const A = point(0, 0); let B; let C; let H; let triangle; let polynom; let hauteurpoly; let d
    const objetsEnonce = []; const objetsCorrection = []; let xmin; let xmax; let ymin; let ymax
    let texte = ''; let texteCorr = ''

    const nom = creerNomDePolygone(20, 'QD')

    for (let i = 0; i < this.nbQuestions; i++) {
      objetsEnonce.length = 0
      objetsCorrection.length = 0
      A.nom = nom[i * 4]
      B = rotation(point(cotes[i], 0), A, randint(-60, 60), nom[i * 4 + 1])
      if (i % 3 === 2) {
        d = longueur(A, B) + randint(6, 9) / 3
      } else {
        d = calcul(randint(6, longueur(A, B) * 10 - 6) / 10)
      }
      triH = triangle2points1hauteur(A, B, hauteurs[i], d, 2)
      H = triH.pied
      H.nom = nom[i * 4 + 3]
      triangle = triH.triangle
      C = triangle.listePoints[2]
      C.nom = nom[i * 4 + 2]
      polynom = polygoneAvecNom(A, H, B, C)
      hauteurpoly = segment(C, H)
      hauteurpoly.pointilles = 2
      xmin = Math.min(A.x, B.x, C.x, H.x) - 1.5
      xmax = Math.max(A.x, B.x, C.x, H.x) + 1.5
      ymin = Math.min(A.y, B.y, C.y, H.y) - 2
      ymax = Math.max(A.y, B.y, C.y, H.y) + 1.5
      objetsEnonce.push(polynom[0], polynom[1], hauteurpoly, afficheCoteSegment(segment(B, A), '', 1), afficheLongueurSegment(A, C, 'black', 0.5), afficheLongueurSegment(C, B, 'black', 0.5), afficheLongueurSegment(C, H, 'black', 0.3), codageAngleDroit(A, H, C))
      objetsCorrection.push(polynom[0], polynom[1], hauteurpoly, afficheCoteSegment(segment(B, A), '', 1), afficheLongueurSegment(C, H, 'black', 0.3), codageAngleDroit(A, H, C))
      texte = mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, pixelsParCm: 20, scale: 0.5, mainlevee: false }, objetsEnonce) + '<br>'
      if (this.correctionDetaillee) { texteCorr = mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, pixelsParCm: 20, scale: 0.5, mainlevee: false }, objetsCorrection) + '<br>' } else texteCorr = ''
      texteCorr += `$\\mathcal{A}_{${A.nom}${B.nom}${C.nom}}=\\dfrac{1}{2}\\times ${A.nom}${B.nom}\\times ${H.nom}${C.nom}=\\dfrac{1}{2}\\times${cotes[i]}~\\text{cm}\\times ${hauteurs[i]}~\\text{cm}=${texNombre(
      calcul((cotes[i] * hauteurs[i]) / 2)
    )}~\\text{cm}^2$`
      setReponse(this, i, new Grandeur(arrondi(cotes[i] * hauteurs[i] / 2, 3), 'cm^2'), { formatInteractif: 'unites' })
      texte += ajouteChampTexteMathLive(this, i, 'unites[aires]')
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
}
