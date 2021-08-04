import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, arrondi } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, mathalea2d, segment, mediatrice, pointSurDroite, longueur, afficheLongueurSegment, pointIntersectionDD, droite, codageAngleDroit, codageMilieu } from '../../modules/2d.js'
export const titre = 'Utiliser les propriétés de la médiatrice'

/**
 * Utiliser les propriétés de la médiatrice
 * @author Guillaume Valmont
 * Référence 5G22-1
 * Date de publication
*/
export default function ProprietesMediatrice () {
  Exercice.call(this)
  this.nbQuestions = 4

  this.besoinFormulaireNumerique = ['Situation', 3, '1 : C appartenant (ou pas) à la médiatrice\n2 : C équidistant (ou pas) à A et B\n3 : L\'un ou l\'autre']
  this.sup = 1
  this.besoinFormulaire2CaseACocher = ['Inclure des situations où le point C n\'appartient pas à la médiatrice']
  this.sup2 = true
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.sup = parseInt(this.sup)
    let typesDeQuestionsDisponibles, listeSurLaMediatrice
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = ['appartient']
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = ['equidistant']
    } else {
      typesDeQuestionsDisponibles = ['appartient', 'equidistant']
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    if (this.sup2 === true) {
      listeSurLaMediatrice = combinaisonListes([true, false], this.nbQuestions)
    } else {
      listeSurLaMediatrice = combinaisonListes([true], this.nbQuestions)
    }
    let A, B, C, D, segmentAB, segmentAC, segmentBC, mediatriceAB, affLongueurAC, affLongueurBC
    let objetsEnonce, objetsCorrection, paramsEnonce, paramsCorrection
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Construction des objets
      objetsEnonce = []
      objetsCorrection = []
      A = point(randint(-20, 20) / 10, randint(-20, 20) / 10, 'A', 'left')
      B = point(randint(25, 45) / 10, randint(25, 45) / 10, 'B', 'right')
      mediatriceAB = mediatrice(A, B, '', 'red')
      C = point(-50, 50)
      while (C.y < -3.5 || C.y > 5.5 || C.x < -4.5 || C.x > 8.5) { // On fait en sorte que le point C soit dans le cadre avec une marge
        C = pointSurDroite(mediatriceAB, randint(-30, 55) / 10, 'C', 'above')
      }
      if (!listeSurLaMediatrice[i]) C = point(C.x + randint(-10, 10, 0) / 10, C.y + randint(-10, 10, 0) / 10, 'C', 'above') // s'il ne doit pas être sur la médiatrice, on l'en éloigne
      segmentAB = segment(A, B)
      segmentAC = segment(A, C)
      segmentBC = segment(B, C)
      segmentAC.pointilles = 2
      segmentBC.pointilles = 2
      // Affiche les longueurs au-dessous ou en dessous selon si C est au-dessus ou en dessous de A
      if (C.y > A.y) {
        affLongueurAC = afficheLongueurSegment(A, C, 'black', 0.5)
        affLongueurBC = afficheLongueurSegment(C, B, 'black', 0.5)
      } else {
        affLongueurAC = afficheLongueurSegment(C, A, 'black', 0.5)
        affLongueurBC = afficheLongueurSegment(B, C, 'black', 0.5)
      }
      // Construction des énoncés et des corrections
      if (listeTypeDeQuestions[i] === 'appartient') {
        objetsEnonce.push(segmentAC, segmentBC, affLongueurAC, affLongueurBC) // On affiche les longueurs dans l'énoncé
        texte = 'Le point $C$ appartient-il à la médiatrice du segment [$AB$] ? Justifier.<br>'
        // On construit et code la médiatrice puis on la push dans la correction
        D = pointIntersectionDD(mediatriceAB, droite(A, B))
        if (C.x > A.x) {
          objetsCorrection.push(codageAngleDroit(A, D, C, 'red', 0.4))
        } else {
          objetsCorrection.push(codageAngleDroit(C, D, A, 'red', 0.4))
        }
        objetsCorrection.push(codageMilieu(A, B, 'red', '||', false), mediatriceAB)
        if (listeSurLaMediatrice[i]) { // S'il est sur la médiatrice
          texteCorr = `$CA = CB = ${arrondi(longueur(C, A), 1)}$ donc le point $C$ est équidistant à $A$ et $B$.<br>`
          texteCorr += 'Comme un point équidistant à $A$ et $B$ appartient à la médiatrice du segment [$AB$],<br>'
          texteCorr += 'alors, le point $C$ appartient à la médiatrice du segment [$AB$]'
        } else { // Si le point C doit ne pas être sur la médiatrice,
          texteCorr = `$CA = ${arrondi(longueur(C, A), 1)}$ alors que $CB = ${arrondi(longueur(C, B), 1)}$ donc le point C n'est pas équidistant à A et B.<br>`
          texteCorr += 'Comme un point qui n\'est pas équidistant à A et B n\'appartient pas à la médiatrice du segment [AB],<br>'
          texteCorr += 'alors, le point C n\'appartient pas à la médiatrice du segment [AB]'
        }
      } else if (listeTypeDeQuestions[i] === 'equidistant') {
        objetsCorrection.push(segmentAC, segmentBC, affLongueurAC, affLongueurBC) // On affiche les longueurs dans la correction
        texte = 'Le point C est-il équidistant à A et B ? Justifier.<br>'
        // On construit et code la médiatrice puis on la push dans l'énoncé
        D = pointIntersectionDD(mediatriceAB, droite(A, B))
        if (C.x > A.x) {
          objetsEnonce.push(codageAngleDroit(A, D, C, 'red', 0.4))
        } else {
          objetsEnonce.push(codageAngleDroit(C, D, A, 'red', 0.4))
        }
        objetsEnonce.push(codageMilieu(A, B, 'red', '||', false), mediatriceAB)
        if (listeSurLaMediatrice[i]) { // S'il est sur la médiatrice
          texteCorr = 'Le point C appartient à la médiatrice du segment [AB].<br>'
          texteCorr += 'Comme un point qui appartient à la médiatrice d\'un segment est équidistant aux extrémités de ce segment,<br>'
          texteCorr += 'alors le point C est équidistant à A et B.'
        } else { // Si le point C doit ne pas être sur la médiatrice,
          texteCorr = 'Le point C n\'appartient pas à la médiatrice du segment [AB].<br>'
          texteCorr += 'Comme un point qui n\'appartient pas à la médiatrice d\'un segment n\'est pas équidistant aux extrémités de ce segment,<br>'
          texteCorr += 'alors le point C n\'est pas équidistant à A et B.'
        }
      }
      // On push les objets
      objetsEnonce.push(tracePoint(A, B, C), labelPoint(A, B, C), segmentAB)
      objetsEnonce.forEach(obj => {
        objetsCorrection.push(obj)
      })
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      paramsEnonce = { xmin: -5, ymin: -4, xmax: 9, ymax: 6, pixelsParCm: 20, scale: 1, mainlevee: false }
      // paramètres de la fenêtre Mathalea2d pour la correction
      paramsCorrection = { xmin: -5, ymin: -4, xmax: 9, ymax: 6, pixelsParCm: 20, scale: 1 }
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
