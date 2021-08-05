import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, arrondiVirgule } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, mathalea2d, symetrieAxiale, droite, rotation, segment, afficheMesureAngle, texteSurSegment, longueur, droiteParPointEtParallele, angle } from '../../modules/2d.js'
export const titre = 'Utiliser les propriétés de conservation du parallélisme, des longueurs et des angles.'

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

  this.besoinFormulaireNumerique = ['Transformation', 2, '1 : Symétrie Axiale\n2 : Symétrie centrale']
  this.besoinFormulaire2Numerique = ['Propriétés conservées', 3, '1 : Parallélisme\n2 : Longueur et Angle\n3 : Parallélisme, Longueur et Angle']
  this.sup = 1
  this.sup2 = 3
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
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
    let objetsEnonce, objetsCorrection, paramsEnonce, paramsCorrection
    let listePoints, listeSegments, listeDroites, listeAngles, listeLabels
    for (let i = 0, texte, texteCorr, d, A, B, C, O, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      objetsCorrection = [] // idem pour la correction
      listePoints = []
      listeSegments = []
      listeDroites = []
      listeAngles = []
      listeLabels = []
      A = point(5, 2, 'A', 'below')
      B = point(8, randint(-10, 50) / 10, 'B', 'below')
      C = point(7, randint(40, 80) / 10, 'C', 'left')
      listePoints.push(A, B, C)
      listeSegments.push(segment(A, B))
      listeLabels.push(texteSurSegment(`${calcul(longueur(A, B, 1) / 1.7, 1)} cm`, B, A))
      switch (listeTypeDeQuestions[i]) {
        case 'parallelisme':
          listeDroites.push(droiteParPointEtParallele(C, droite(A, B)))
          texte = 'La droite $(d_1)$ est parallèle au segment [$AB$] et passe par le point $C$.<br>'
          texteCorr = texte
          texteCorr += 'Or, la symétrie conserve le parallélisme.<br>'
          texteCorr += 'Donc la droite $(d_1\')$ est parallèle au segment [$A\'B\'$] et passe par le point $C\'$.<br>'
          break

        case 'longueurEtAngle':
          listeSegments.push(segment(A, C), segment(B, C))
          listeLabels.push(texteSurSegment(`${calcul(longueur(B, C, 1) / 1.7, 1)} cm`, C, B))
          listeAngles.push(afficheMesureAngle(A, B, C, 'black', 1, arrondiVirgule(angle(A, B, C), 0) + '°'))
          texte = `L'angle $\\widehat{ABC}$ mesure ${arrondiVirgule(angle(A, B, C), 0)} °.<br>`
          texteCorr = texte
          texteCorr += 'Or, la symétrie conserve les angles.<br>'
          texteCorr += `Donc l'angle $\\widehat{A'B'C'}$ mesure lui aussi ${arrondiVirgule(angle(A, B, C), 0)} °.<br>`
          texteCorr += `Le segment [BC] mesure ${calcul(longueur(B, C, 1) / 1.7, 1)} cm.<br>`
          texteCorr += 'Or, la symétrie conserve les longueurs.<br>'
          texteCorr += `Donc le segment [B'C'] mesure lui aussi ${calcul(longueur(B, C, 1) / 1.7, 1)} cm.<br>`
          break
      }
      texte += 'Compléter le symétrique de la figure en utilisant les propriétés de conservation de la symétrie et en justifiant ses démarches.<br>'
      // On applique la transformation et on la push dans la correction
      if (this.sup === 1) { // Symétrie axiale
        d = droite(randint(10, 30) / 10, -1, randint(-30, 0) / 10, '(d)')
        objetsEnonce.push(d)
        // On applique la transformation de tous les objets dans la correction
        listePoints.forEach((point) => {
          objetsCorrection.push(tracePoint(symetrieAxiale(point, d, point.nom + '\'')), labelPoint(symetrieAxiale(point, d, point.nom + '\'')))
        })
        listeSegments.forEach(seg => {
          objetsCorrection.push(segment(symetrieAxiale(seg.extremite1, d), symetrieAxiale(seg.extremite2, d)))
        })
        listeDroites.forEach(drt => {
          objetsCorrection.push(droite(symetrieAxiale(point(drt.x1, drt.y1), d), symetrieAxiale(point(drt.x2, drt.y2), d)))
        })
        listeAngles.forEach(ang => {
          objetsCorrection.push(afficheMesureAngle(symetrieAxiale(ang.depart, d), symetrieAxiale(ang.sommet, d), symetrieAxiale(ang.arrivee, d), 'black', 1, arrondiVirgule(angle(ang.depart, ang.sommet, ang.arrivee), 0) + '°'))
        })
        listeLabels.forEach(lab => {
          objetsCorrection.push(texteSurSegment(`${calcul(longueur(lab.extremite2, lab.extremite1, 1) / 1.7, 1)} cm`, symetrieAxiale(lab.extremite2, d), symetrieAxiale(lab.extremite1, d), 'black', 1))
        })
        // Et uniquement du segment [AB] dans l'énoncé (et C dans le cas du parallélisme)
        objetsEnonce.push(tracePoint(symetrieAxiale(A, d, 'A\'')), labelPoint(symetrieAxiale(A, d, 'A\'')), tracePoint(symetrieAxiale(B, d, 'B\'')), labelPoint(symetrieAxiale(B, d, 'B\'')))
        objetsEnonce.push(segment(symetrieAxiale(A, d), symetrieAxiale(B, d)))
        if (listeTypeDeQuestions[i] === 'parallelisme') objetsEnonce.push(tracePoint(symetrieAxiale(C, d, 'C\'')), labelPoint(symetrieAxiale(C, d, 'C\'')))
      } else if (this.sup === 2) { // Symétrie centrale
        O = point(randint(20, 70) / 30, randint(20, 80) / 30, 'O')
        objetsEnonce.push(tracePoint(O), labelPoint(O))
        // On applique la transformation de tous les objets dans la correction
        listePoints.forEach((point) => {
          objetsCorrection.push(tracePoint(rotation(point, O, 180, point.nom + '\'')), labelPoint(rotation(point, O, 180, point.nom + '\'')))
        })
        listeSegments.forEach(seg => {
          objetsCorrection.push(segment(rotation(seg.extremite1, O, 180), rotation(seg.extremite2, O, 180)))
        })
        listeDroites.forEach(drt => {
          objetsCorrection.push(droite(rotation(point(drt.x1, drt.y1), O, 180), rotation(point(drt.x2, drt.y2), O, 180)))
        })
        listeAngles.forEach(ang => {
          objetsCorrection.push(afficheMesureAngle(rotation(ang.depart, O, 180), rotation(ang.sommet, O, 180), rotation(ang.arrivee, O, 180), 'black', 1, arrondiVirgule(angle(ang.depart, ang.sommet, ang.arrivee), 0) + '°'))
        })
        listeLabels.forEach(lab => {
          objetsCorrection.push(texteSurSegment(`${calcul(longueur(lab.extremite2, lab.extremite1, 1) / 1.7, 1)} cm`, rotation(lab.extremite1, O, 180), rotation(lab.extremite2, O, 180), 'black', 0.5))
        })
        // Et uniquement du segment [AB] dans l'énoncé (et C dans le cas du parallélisme)
        objetsEnonce.push(tracePoint(rotation(A, O, 180, 'A\'')), labelPoint(rotation(A, O, 180, 'A\'')), tracePoint(rotation(B, O, 180, 'B\'')), labelPoint(rotation(B, O, 180, 'B\'')))
        objetsEnonce.push(segment(rotation(A, O, 180), rotation(B, O, 180)))
        if (listeTypeDeQuestions[i] === 'parallelisme') objetsEnonce.push(tracePoint(rotation(C, O, 180, 'C\'')), labelPoint(rotation(C, O, 180, 'C\'')))
      }
      // On push tous les objets de l'énoncé
      listePoints.forEach(point => {
        objetsEnonce.push(tracePoint(point), labelPoint(point))
      })
      listeSegments.forEach(seg => {
        objetsEnonce.push(seg)
      })
      listeDroites.forEach(drt => {
        objetsEnonce.push(drt)
      })
      listeAngles.forEach(ang => {
        objetsEnonce.push(ang)
      })
      listeLabels.forEach(lab => {
        objetsEnonce.push(lab)
      })
      // On copie l'énoncé dans la correction
      objetsEnonce.forEach(obj => {
        objetsCorrection.push(obj)
      })
      // On enlève A', B', C' et [A'B'] qui apparaissent deux fois dans objetsCorrection
      objetsCorrection = objetsCorrection.slice(5)
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      paramsEnonce = { xmin: -10, ymin: -7, xmax: 15, ymax: 12, pixelsParCm: 20, scale: 1 }
      // paramètres de la fenêtre Mathalea2d pour la correction
      paramsCorrection = { xmin: -10, ymin: -7, xmax: 15, ymax: 12, pixelsParCm: 20, scale: 1 }
      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += mathalea2d(paramsEnonce, objetsEnonce)
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
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
