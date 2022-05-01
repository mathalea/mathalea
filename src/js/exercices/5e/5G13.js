import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, arrondiVirgule, texNombre } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, mathalea2d, symetrieAxiale, translation, vecteur, triangle2points2longueurs, droite, pointAdistance, rotation, afficheLongueurSegment, segment, afficheMesureAngle, longueur, droiteParPointEtParallele, angle, polygoneAvecNom, texteParPoint, positionLabelDroite } from '../../modules/2d.js'
import { getVueFromUrl } from '../../modules/gestionUrl.js'
import { context } from '../../modules/context.js'
export const titre = 'Utiliser les propriétés de conservation du parallélisme, des longueurs et des angles'

/**
 * Compléter le symétrique d'une figure en utilisant les propriétés de conservation de la symétrie et en justifiant ses démarches
 * @author Guillaume Valmont
 * Référence 5G13
 * Date de publication 05/08/2021
*/
export default function ConservationSymetrie () {
  Exercice.call(this)
  this.consigne = ''
  this.nbQuestions = 2

  this.besoinFormulaireNumerique = ['Transformations', 3, '1 : Symétries axiales\n2 : Symétries centrales\n3 : Mélange']
  this.besoinFormulaire2Numerique = ['Propriétés conservées', 3, '1 : Parallélisme\n2 : Longueurs et Angles\n3 : Mélange']
  this.sup = 1
  this.sup2 = 3
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function (numeroExercice) {
    context.fenetreMathalea2d = [-6, -6, 6, 6]
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    this.sup = Number(this.sup)
    this.sup2 = Number(this.sup2)
    let typesDeTransformationsDisponibles
    switch (this.sup) {
      case 1:
        typesDeTransformationsDisponibles = ['symetrieAxiale']
        break
      case 2:
        typesDeTransformationsDisponibles = ['symetrieCentrale']
        break
      case 3:
        typesDeTransformationsDisponibles = ['symetrieAxiale', 'symetrieCentrale']
        break
    }
    const listeTypeDeTransformations = combinaisonListes(typesDeTransformationsDisponibles, this.nbQuestions)
    let typesDeQuestionsDisponibles
    switch (this.sup2) {
      case 1:
        typesDeQuestionsDisponibles = ['parallelisme']
        break
      case 2:
        typesDeQuestionsDisponibles = ['longueurEtAngle']
        break
      case 3:
        typesDeQuestionsDisponibles = ['parallelisme', 'longueurEtAngle']
        break
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let objetsEnonceEtCorr, objetsEnonceOnly, objetsCorrectionOnly, paramsEnonce, paramsCorrection
    for (let i = 0, texte, texteCorr, centreOuPoint, d, d1, A, B, C, imageA, imageB, imageC, figureRetournee, O, poly, imPoly, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objetsEnonceOnly = []
      objetsCorrectionOnly = []
      objetsEnonceEtCorr = []
      d1 = ''
      A = point(0, 0, 'A', 'below')
      B = pointAdistance(A, randint(30, 60) / 10, randint(0, 45), 'B')
      C = triangle2points2longueurs(A, B, randint(40, 60) / 10, randint(30, 50) / 10).listePoints[2]
      C.nom = 'C'
      poly = polygoneAvecNom(A, B, C) // pour bien placer les labels
      objetsEnonceEtCorr.push(segment(A, B), afficheLongueurSegment(B, A), poly[1])
      switch (listeTypeDeQuestions[i]) {
        case 'parallelisme':
          objetsEnonceEtCorr.push(tracePoint(A, B, C))
          d1 = droiteParPointEtParallele(C, droite(A, B))
          objetsEnonceEtCorr.push(d1)
          texte = 'La droite $(d_1)$ est parallèle au segment [$AB$] et passe par le point $C$.<br>'
          texteCorr = texte
          texteCorr += 'Or, la symétrie conserve le parallélisme.<br>'
          texteCorr += 'Donc la droite $(d_1\')$ est parallèle au segment [$A\'B\'$] et passe par le point $C\'$.<br>'
          break
        case 'longueurEtAngle':
          objetsEnonceEtCorr.push(segment(A, C), segment(B, C))
          objetsEnonceEtCorr.push(afficheLongueurSegment(C, B))
          objetsEnonceEtCorr.push(afficheMesureAngle(A, B, C, 'black', 1, arrondiVirgule(angle(A, B, C), 0) + '°'))
          texte = `L'angle $\\widehat{ABC}$ mesure $${texNombre(arrondiVirgule(angle(A, B, C), 0))}$ °.<br>`
          texteCorr = texte
          texteCorr += 'Or, la symétrie conserve les angles.<br>'
          texteCorr += `Donc l'angle $\\widehat{A'B'C'}$ mesure lui aussi $${texNombre(arrondiVirgule(angle(A, B, C), 0))}$ °.<br>`
          texteCorr += `Le segment [BC] mesure $${texNombre(longueur(B, C, 1))}$ cm.<br>`
          texteCorr += 'Or, la symétrie conserve les longueurs.<br>'
          texteCorr += `Donc le segment [B'C'] mesure lui aussi $${texNombre(longueur(B, C, 1))}$ cm.<br>`
          break
      }
      // On applique prépare la transformation
      switch (listeTypeDeTransformations[i]) {
        case 'symetrieAxiale':
          centreOuPoint = 'à la droite $(d)$'
          d = droite(translation(A, vecteur(-randint(30, 40) / 10, 0)), translation(C, vecteur(-randint(30, 40) / 10, 0)))
          d.angleAvecHorizontale = d.angleAvecHorizontale + randint(-10, 10)
          objetsEnonceEtCorr.push(d)
          imageA = symetrieAxiale(A, d, 'A\'')
          imageB = symetrieAxiale(B, d, 'B\'')
          imageC = symetrieAxiale(C, d, 'C\'')
          if (d1 !== '') {
            objetsCorrectionOnly.push(droite(symetrieAxiale(point(d1.x1, d1.y1), d), symetrieAxiale(point(d1.x2, d1.y2), d), '$(d_1\')$'))
          }
          figureRetournee = false
          break
        case 'symetrieCentrale':
          centreOuPoint = 'au point $O$'
          O = point(randint(30, 40) / 10, randint(40, 60) / 10, 'O')
          objetsEnonceEtCorr.push(tracePoint(O), labelPoint(O))
          imageA = rotation(A, O, 180, 'A\'')
          imageB = rotation(B, O, 180, 'B\'')
          imageC = rotation(C, O, 180, 'C\'')
          if (d1 !== '') {
            objetsCorrectionOnly.push(droite(rotation(point(d1.x1, d1.y1), O, 180), rotation(point(d1.x2, d1.y2), O, 180)))
          }
          figureRetournee = true
          break
      }
      texte += `Compléter le symétrique de la figure par rapport ${centreOuPoint} en utilisant les propriétés de${getVueFromUrl() === 'multi' ? '<br>' : ' '}conservation de la symétrie et en justifiant ses démarches.<br>`
      // On applique la transformation
      imPoly = polygoneAvecNom(imageA, imageB, imageC)
      objetsCorrectionOnly.push(imPoly[1])
      objetsEnonceEtCorr.push(segment(imageA, imageB))
      objetsEnonceOnly.push(tracePoint(imageA, imageB), labelPoint(imageA, imageB))
      if (figureRetournee) {
        objetsEnonceOnly.push(afficheLongueurSegment(imageA, imageB))
        objetsCorrectionOnly.push(afficheLongueurSegment(imageB, imageA))
      } else {
        objetsEnonceOnly.push(afficheLongueurSegment(imageB, imageA))
        objetsCorrectionOnly.push(afficheLongueurSegment(imageA, imageB))
      }
      if (listeTypeDeQuestions[i] === 'longueurEtAngle') {
        objetsCorrectionOnly.push(segment(imageA, imageC), segment(imageB, imageC))
        objetsCorrectionOnly.push(afficheMesureAngle(imageA, imageB, imageC, 'black', 1, arrondiVirgule(angle(A, B, C), 0) + '°'))
        if (figureRetournee) {
          objetsCorrectionOnly.push(afficheLongueurSegment(imageC, imageB))
        } else {
          objetsCorrectionOnly.push(afficheLongueurSegment(imageB, imageC))
        }
      } else if (listeTypeDeQuestions[i] === 'parallelisme') {
        objetsEnonceEtCorr.push(tracePoint(imageC))
        objetsEnonceOnly.push(labelPoint(imageC))
        objetsCorrectionOnly.push(tracePoint(imageA, imageB))
      }
      const xmin = Math.min(A.x, B.x, C.x, imageA.x, imageB.x, imageC.x) - 2
      const xmax = Math.max(A.x, B.x, C.x, imageA.x, imageB.x, imageC.x) + 2
      const ymin = Math.min(A.y, B.y, C.y, imageA.y, imageB.y, imageC.y) - 2
      const ymax = Math.max(A.y, B.y, C.y, imageA.y, imageB.y, imageC.y) + 2
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      paramsEnonce = { xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, scale: 1 }
      // paramètres de la fenêtre Mathalea2d pour la correction
      paramsCorrection = paramsEnonce
      // On ajoute les noms des droites si besoin
      if (listeTypeDeTransformations[i] === 'symetrieAxiale') objetsEnonceEtCorr.push(texteParPoint('$(d)$', positionLabelDroite(d, paramsEnonce), 'milieu', 'black', 1, 'middle', true))
      if (listeTypeDeQuestions[i] === 'parallelisme') objetsEnonceEtCorr.push(texteParPoint('$(d_1)$', positionLabelDroite(d1, paramsEnonce), 'milieu', 'black', 1, 'middle', true))
      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += mathalea2d(paramsEnonce, objetsEnonceOnly, objetsEnonceEtCorr)
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += mathalea2d(paramsCorrection, objetsCorrectionOnly, objetsEnonceEtCorr)
      if (this.listeQuestions.indexOf(texte) === -1) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
