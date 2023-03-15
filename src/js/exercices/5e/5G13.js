import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre, choisitLettresDifferentes } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, symetrieAxiale, translation, vecteur, triangle2points2longueurs, droite, pointAdistance, rotation, afficheLongueurSegment, segment, afficheMesureAngle, longueur, droiteParPointEtParallele, angle, polygoneAvecNom, texteParPoint, positionLabelDroite, distancePointDroite, translation2Points } from '../../modules/2d.js'
import { getVueFromUrl } from '../../modules/gestionUrl.js'
import { context } from '../../modules/context.js'
export const titre = 'Utiliser les propriétés de conservation du parallélisme, des longueurs et des angles'

export const dateDeModifImportante = '06/03/2023'

/**
 * Compléter le symétrique d'une figure en utilisant les propriétés de conservation de la symétrie et de la translation et en justifiant ses démarches
 * @author Guillaume Valmont
 * Référence 5G13
 * Date de publication 05/08/2021
 * Ajout de la translation par Guillaume Valmont le 16/05/2022
 * Les noms des points sont maintenant aléatoires par Guillaume Valmont le 06/03/2023
*/
export const uuid = '07d1a'
export const ref = '5G13'
export default function ConservationTransformation () {
  Exercice.call(this)
  this.consigne = ''
  this.nbQuestions = 2

  this.besoinFormulaireNumerique = ['Transformations', 4, '1 : Symétrie axiale\n2 : Symétrie centrale\n3 : Symétrie axiale ou centrale\n4 : Translation'] // Je n'ajoute pas de nouvelle option de mélange, ce serait bien d'ajouter la rotation avant.
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
      case 4:
        typesDeTransformationsDisponibles = ['translation']
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
    for (let i = 0, texte, texteCorr, figure, transformation, enonceTransformation, d, d1, A, B, C, D, E, imageA, imageB, imageC, figureRetournee, O, poly, imPoly, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objetsEnonceOnly = []
      objetsCorrectionOnly = []
      objetsEnonceEtCorr = []
      const lettres = choisitLettresDifferentes(5, 'O')
      A = point(0, 0, lettres[0], 'below')
      B = pointAdistance(A, randint(30, 60) / 10, randint(0, 45), lettres[1])
      C = triangle2points2longueurs(A, B, randint(40, 60) / 10, randint(30, 50) / 10).listePoints[2]
      C.nom = lettres[2]
      D = point(0, 0)
      E = point(0, 0)
      d1 = droiteParPointEtParallele(C, droite(A, B))
      poly = polygoneAvecNom(A, B, C) // pour bien placer les labels
      objetsEnonceEtCorr.push(segment(A, B), afficheLongueurSegment(B, A), poly[1])
      // On prépare la transformation
      switch (listeTypeDeTransformations[i]) {
        case 'symetrieAxiale':
          transformation = 'symétrie axiale'
          enonceTransformation = 'par la symétrie d\'axe $(d)$'
          d = droite(translation(A, vecteur(-randint(30, 40) / 10, 0)), translation(C, vecteur(-randint(30, 40) / 10, 0)))
          d.angleAvecHorizontale = d.angleAvecHorizontale + randint(-10, 10)
          objetsEnonceEtCorr.push(d)
          imageA = symetrieAxiale(A, d, `${A.nom}'`)
          imageB = symetrieAxiale(B, d, `${B.nom}'`)
          imageC = symetrieAxiale(C, d, `${C.nom}'`)
          if (listeTypeDeQuestions[i] === 'parallelisme') {
            objetsCorrectionOnly.push(droite(symetrieAxiale(point(d1.x1, d1.y1), d), symetrieAxiale(point(d1.x2, d1.y2), d), '$(d_1\')$'))
          }
          figureRetournee = false
          break
        case 'symetrieCentrale':
          transformation = 'symétrie centrale'
          enonceTransformation = 'par la symétrie de centre $O$'
          do {
            O = point(randint(25, 45) / 10, randint(35, 65) / 10, 'O')
            imageA = rotation(A, O, 180, `${A.nom}'`)
            imageB = rotation(B, O, 180, `${B.nom}'`)
            imageC = rotation(C, O, 180, `${C.nom}'`)
          } while (distancePointDroite(O, d1) < 1 || longueur(O, B) < 1 || Math.abs(Math.round(angle(B, A, imageC)) - 90) > 85)
          objetsEnonceEtCorr.push(tracePoint(O), labelPoint(O))
          if (listeTypeDeQuestions[i] === 'parallelisme') {
            objetsCorrectionOnly.push(droite(rotation(point(d1.x1, d1.y1), O, 180), rotation(point(d1.x2, d1.y2), O, 180)))
          }
          figureRetournee = true
          break
        case 'translation':
          transformation = 'translation'
          D = point(B.x + 1, B.y + 8 + randint(-10, 10) / 10, lettres[3])
          E = point(B.x + 8, B.y + 8 + randint(-20, 20) / 10, lettres[4])
          enonceTransformation = `par la translation qui transforme $${D.nom}$ en $${E.nom}$`
          imageA = translation2Points(A, D, E, `${A.nom}'`)
          imageB = translation2Points(B, D, E, `${B.nom}'`)
          imageC = translation2Points(C, D, E, `${C.nom}'`)
          objetsEnonceEtCorr.push(vecteur(D, E).representant(D), tracePoint(D, E), labelPoint(D, E))
          if (listeTypeDeQuestions[i] === 'parallelisme') {
            objetsCorrectionOnly.push(droite(translation2Points(point(d1.x1, d1.y1), D, E), translation2Points(point(d1.x2, d1.y2), D, E)))
          }
          break
      }
      switch (listeTypeDeQuestions[i]) {
        case 'parallelisme':
          objetsEnonceEtCorr.push(tracePoint(A, B, C))
          objetsEnonceEtCorr.push(d1)
          texte = `Les points $${A.nom}'$, $${B.nom}'$ et $${C.nom}'$ sont les images respectives de $${A.nom}$, $${B.nom}$ et $${C.nom}$ ${enonceTransformation}.<br>`
          texte += `La droite $(d_1)$ est parallèle au segment [$${A.nom + B.nom}$] et passe par le point $${C.nom}$.<br>`
          figure = 'de la droite $(d_1)$'
          texteCorr = texte
          texteCorr += `Or, la ${transformation} conserve le parallélisme.<br>`
          texteCorr += `Donc la droite $(d_1')$ est parallèle au segment [$${A.nom}'${B.nom}'$] et passe par le point $${C.nom}'$.<br>`
          break
        case 'longueurEtAngle':
          objetsEnonceEtCorr.push(segment(A, C), segment(B, C))
          objetsEnonceEtCorr.push(afficheLongueurSegment(C, B))
          objetsEnonceEtCorr.push(afficheMesureAngle(A, B, C, 'black', 1, Math.round(angle(A, B, C)) + '°'))
          texte = `Les points $${A.nom}'$ et $${B.nom}'$ sont les images respectives de $${A.nom}$ et $${B.nom}$ ${enonceTransformation}.<br>`
          texte += `L'angle $\\widehat{${A.nom + B.nom + C.nom}}$ mesure $${texNombre(Math.round(angle(A, B, C)))}$ °.<br>`
          figure = `du triangle $${A.nom + B.nom + C.nom}$`
          texteCorr = texte
          texteCorr += `Or, la ${transformation} conserve les angles.<br>`
          texteCorr += `Donc l'angle $\\widehat{${A.nom}'${B.nom}'${C.nom}'}$ mesure lui aussi $${texNombre(Math.round(angle(A, B, C)))}$ °.<br><br>`
          texteCorr += `Le segment [$${B.nom + C.nom}$] mesure $${texNombre(longueur(B, C, 1))}$ cm.<br>`
          texteCorr += `Or, la ${transformation} conserve les longueurs.<br>`
          texteCorr += `Donc le segment [$${B.nom}'${C.nom}'$] mesure lui aussi $${texNombre(longueur(B, C, 1))}$ cm.<br>`
          break
      }
      texte += `Compléter l'image ${figure} ${enonceTransformation} en utilisant les propriétés de${getVueFromUrl() === 'multi' ? '<br>' : ' '}conservation de la ${transformation} et en justifiant ses démarches.<br>`
      // On applique la transformation
      imPoly = polygoneAvecNom(imageA, imageB, imageC)
      const imPolyEnonce = polygoneAvecNom(imageA, imageB)
      objetsCorrectionOnly.push(imPoly[1])
      objetsEnonceEtCorr.push(segment(imageA, imageB))
      objetsEnonceOnly.push(tracePoint(imageA, imageB), imPolyEnonce[1])
      if (figureRetournee) {
        objetsEnonceOnly.push(afficheLongueurSegment(imageA, imageB))
        objetsCorrectionOnly.push(afficheLongueurSegment(imageB, imageA))
      } else {
        objetsEnonceOnly.push(afficheLongueurSegment(imageB, imageA))
        objetsCorrectionOnly.push(afficheLongueurSegment(imageA, imageB))
      }
      if (listeTypeDeQuestions[i] === 'longueurEtAngle') {
        objetsCorrectionOnly.push(segment(imageA, imageC), segment(imageB, imageC))
        objetsCorrectionOnly.push(afficheMesureAngle(imageA, imageB, imageC, 'black', 1, Math.round(angle(A, B, C)) + '°'))
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
      const xmin = Math.min(A.x, B.x, C.x, D.x, E.x, imageA.x, imageB.x, imageC.x) - 2
      const xmax = Math.max(A.x, B.x, C.x, D.x, E.x, imageA.x, imageB.x, imageC.x) + 2
      const ymin = Math.min(A.y, B.y, C.y, D.x, E.x, imageA.y, imageB.y, imageC.y) - 2
      const ymax = Math.max(A.y, B.y, C.y, D.x, E.x, imageA.y, imageB.y, imageC.y) + 2
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      paramsEnonce = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 1 }
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
