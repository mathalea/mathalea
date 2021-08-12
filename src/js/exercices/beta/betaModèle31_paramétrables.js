import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, creerNomDePolygone } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, polygoneRegulier, codageAngleDroit, mathalea2d } from '../../modules/2d.js'
export const titre = 'Nom de l\'exercice'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
 * Date de publication
*/
export default function NomExercice () {
  Exercice.call(this)
  this.consigne = 'consigne'
  this.nbQuestions = 1

  this.besoinFormulaireNumerique = ['Figure à tracer', 2, '1 : Carré\n2 : Triangle'] // le paramètre sera numérique de valeur max 2 (le 2 en vert)
  this.sup = 1 // Valeur du paramètre par défaut
  // Remarques : le paramètre peut aussi être un texte avec : this.besoinFormulaireTexte = [texte, tooltip]
  //              il peut aussi être une case à cocher avec : this.besoinFormulaireCaseACocher = [texte] (dans ce cas, this.sup = true ou this.sup = false)

  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []

    this.sup = parseInt(this.sup) // Lorsqu'il est récupéré de l'url, le paramètre peut être un texte, dans le doute on le convertit en nombre

    const typesDeQuestionsDisponibles = [1] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let A, B, C, D, traces1, traces2, labels1, labels2, figure, aA, aB, aC, aD
    let objetsEnonce, objetsEnonceml, objetsCorrection, paramsEnonce, paramsEnonceml, paramsCorrection
    for (let i = 0, texte, texteCorr, cotes, nomPoly, naturePoly, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      objetsEnonceml = [] // Idem pour l'enoncé à main levée si besoin
      objetsCorrection = [] // Idem pour la correction

      if (this.sup === 1) { // On a un comportement différent selon le paramètre.
        cotes = 4
        naturePoly = 'carré'
        texteCorr = 'Pour cette construction on peut utiliser la règle et l\'équerre.<br>'
      } else if (this.sup === 2) {
        cotes = 3
        naturePoly = 'triangle équilatéral'
        texteCorr = 'Pour cette construction on peut utiliser la règle et le compas.<br>'
      }
      nomPoly = creerNomDePolygone(cotes, 'GPT') // Permet de choisir un nom de polygone de cotes lettres qui se suivent à l'exclusion de la séquence GPT
      texte = `Construire le ${naturePoly} $${nomPoly}$.<br>`

      switch (listeTypeDeQuestions[i]) {
        case 1:
          A = point(0, 0, nomPoly.charAt(0), 'below') // nomPoly.charAt(0) renvoie le premier caractère de nomPoly
          B = point(5, randint(-30, 30) / 10, nomPoly.charAt(1), 'below') // nomPoly.charAt(1) renvoie le deuxième caractère de nomPoly

          figure = polygoneRegulier(A, B, cotes) // Trace le polygone régulier direct à n côtés qui a pour côté [AB]
          // En tant que polygone, figure a de nombreux attributs. En particulier :
          // figure.listePoints[] contient l'ensemble des points du polygone
          // figure.listePoints[0] contient le premier point
          // figure.listePoints[1] contient le deuxième point etc
          // Voir l'exercice 5S12 pour voir comment colorier et hachurer une figure

          // Les points créés avec polygoneRegulier n'ont pas de nom donc pour leur ajouter un nom on peut faire
          C = figure.listePoints[2]
          C.nom = nomPoly.charAt(2)
          C.positionLabel = 'above'
          // ou alors
          C = point(figure.listePoints[2].x, figure.listePoints[2].y, nomPoly.charAt(2), 'above')

          if (cotes === 3) {
            traces2 = tracePoint(A, B, C)
            labels2 = labelPoint(A, B, C)
          } else {
            D = point(figure.listePoints[3].x, figure.listePoints[3].y, nomPoly.charAt(3), 'above')
            aA = codageAngleDroit(B, A, D)
            aB = codageAngleDroit(A, B, C)
            aC = codageAngleDroit(B, C, D)
            aD = codageAngleDroit(C, D, A)
            traces2 = tracePoint(A, B, C, D)
            labels2 = labelPoint(A, B, C, D)
          }
          figure.epaisseur = 2
          traces1 = tracePoint(A, B)
          labels1 = labelPoint(A, B)

          objetsEnonce.push(traces1, labels1)
          objetsEnonceml.push(traces2, labels2, figure, aA, aB, aC, aD)
          objetsCorrection.push(traces2, labels2, figure, aA, aB, aC, aD)
          // ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
          break

        case 2:
          // Idem Cas1 mais avec d'autres texte, texteCorr...
          break

        case 3:

          break

        case 4:

          break
      }
      // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
      const xmin = Math.min(A.x, B.x, C.x, D.x) - 2
      const xmax = Math.max(A.x, B.x, C.x, D.x) + 2
      const ymin = Math.min(A.y, B.y, C.y, D.y) - 2
      const ymax = Math.max(A.y, B.y, C.y, D.y) + 2
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      paramsEnonce = { xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, scale: 1 }
      // paramètres de la fenêtre Mathalea2d pour l'énoncé main levée
      paramsEnonceml = { xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 1 }
      // paramètres de la fenêtre Mathalea2d pour la correction
      paramsCorrection = paramsEnonce
      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += mathalea2d(paramsEnonce, objetsEnonce) + mathalea2d(paramsEnonceml, objetsEnonceml)
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
