/* global sortieHtml mathalea */
import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, choice, shuffle, shuffle2tableaux } from '../../modules/outils.js'
import { point, segment, polygone, codageAngleDroit, codeSegments, mathalea2d } from '../../modules/2d.js'
import { gestionQcmInteractif, propositionsQcm } from '../../modules/gestionQcm.js'
export const amcReady = true

export const titre = 'Reconnaitre un quadrilatère particulier à partir de ses propriétés'

/**
 * Reconnaitre un quadrilatère particulier à partir de ses propriétés
 * @Auteur Rémi Angot
 * Référence 6G33
*/
export default function ReconnaitreQuadrilatereParticulier () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Nombre de colonnes pour la sortie LaTeX
  this.nbColsCorr = 2 // Nombre de colonnes dans la correction pour la sortie LaTeX
  this.correctionDetailleeDisponible = true
  sortieHtml ? this.correctionDetaillee = true : this.correctionDetaillee = false
  this.qcmDisponible = true
  this.modeQcm = false

  this.nouvelleVersion = function (numeroExercice) {
    this.numeroExercice = numeroExercice
    this.qcm = ['6G33', [], "Trouver la nature d'un quadrilatère.", 1]
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const listeDeQuestions = shuffle([choice(['losange1', 'losange2']), choice(['rectangle1', 'rectangle2']), choice(['carre1', 'carre2', 'carre3'])])
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      let A, B, C, D, O, ABCD, codage, codage1, codage2, codage3, sAC, sBD, marquesDemiDiagonales, marquesDemiDiagonales1, marquesDemiDiagonales2, marquesCotes, tabrep, tabicone
      switch (listeDeQuestions[i]) {
        case 'losange1':
          texte = "Quelle est la nature d'un quadrilatère ayant 4 côtés de même longueur ?"
          tabrep = ['Losange', 'Rectangle', 'Carré', 'Trapèze', 'Parallélogramme']
          tabicone = [1, 0, 0, 0, 0]
          this.qcm[1].push(['Quelle est la nature d\'un quadrilatère ayant 4 côtés de même longueur ? \\\\ \n Réponses possibles : ',
            tabrep,
            tabicone])
          A = point(0, 0)
          B = point(2, 3)
          C = point(0, 6)
          D = point(-2, 3)
          O = point(0, 3)
          ABCD = polygone(A, B, C, D)
          // codage = codageAngleDroit(C, O, B);
          marquesCotes = codeSegments('||', 'blue', A, B, B, C, C, D, D, A)
          // sAC = segment(A, C);
          // sBD = segment(B, D);
          // sOA = segment(O, A);
          // sOB = segment(O, B);
          // sOC = segment(O, C);
          // sOD = segment(O, D);
          // sAC.pointilles = true;
          // sBD.pointilles = true;
          // marquesDemiDiagonales = codeSegments("|", "blue", O, A, O, B, O, C, O, D);
          if (this.correctionDetaillee) { texteCorr = mathalea2d({ xmin: -3, xmax: 3, ymin: -1, ymax: 7 }, ABCD, marquesCotes) + '<br>' }
          texteCorr += "C'est un losange."
          break
        case 'losange2':
          texte = "Quelle est la nature d'un quadrilatère ayant ses diagonales perpendiculaires et sécantes en leur milieu ?"
          tabrep = ['Losange', 'Rectangle', 'Carré', 'Trapèze', 'Parallélogramme']
          tabicone = [1, 0, 0, 0, 0]
          this.qcm[1].push(['Quelle est la nature d\'un quadrilatère ayant ses diagonales perpendiculaires et sécantes en leur milieu ? \\\\ \n Réponses possibles : ',
            tabrep,
            tabicone])
          A = point(0, 0)
          B = point(2, 3)
          C = point(0, 6)
          D = point(-2, 3)
          O = point(0, 3)
          ABCD = polygone(A, B, C, D)
          codage = codageAngleDroit(C, O, B)
          // marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
          sAC = segment(A, C)
          sBD = segment(B, D)
          sAC.pointilles = true
          sBD.pointilles = true
          marquesDemiDiagonales1 = codeSegments('|', 'blue', O, A, O, C)
          marquesDemiDiagonales2 = codeSegments('|||', 'blue', O, B, O, D)
          if (this.correctionDetaillee) { texteCorr = mathalea2d({ xmin: -3, xmax: 3, ymin: -1, ymax: 7 }, ABCD, codage, sAC, sBD, marquesDemiDiagonales1, marquesDemiDiagonales2) + '<br>' }
          texteCorr += "C'est un losange."
          break
        case 'rectangle1':
          texte = "Quelle est la nature d'un quadrilatère ayant 3 angles droits ?"
          tabrep = ['Losange', 'Rectangle', 'Carré', 'Trapèze', 'Parallélogramme']
          tabicone = [0, 1, 0, 0, 0]
          this.qcm[1].push(['Quelle est la nature d\'un quadrilatère ayant 3 angles droits ? \\\\ \n Réponses possibles : ',
            tabrep,
            tabicone])
          A = point(0, 0)
          B = point(5, 0)
          C = point(5, 3)
          D = point(0, 3)
          O = point(2.5, 1.5)
          ABCD = polygone(A, B, C, D)
          codage1 = codageAngleDroit(A, B, C)
          codage2 = codageAngleDroit(B, C, D)
          codage3 = codageAngleDroit(C, D, A)
          // marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
          // sAC = segment(A, C);
          // sBD = segment(B, D);
          // sOA = segment(O, A);
          // sOB = segment(O, B);
          // sOC = segment(O, C);
          // sOD = segment(O, D);
          // sAC.pointilles = true;
          // sBD.pointilles = true;
          // marquesDemiDiagonales = codeSegments("||", "blue", O, A, O, B, O, C, O, D);
          if (this.correctionDetaillee) { texteCorr = mathalea2d({ xmin: -1, xmax: 6, ymin: -1, ymax: 4 }, ABCD, codage1, codage2, codage3) + '<br>' }
          texteCorr += "C'est un rectangle."
          break
        case 'rectangle2':
          texte = "Quelle est la nature d'un quadrilatère ayant ses diagonales de même longueur et sécantes en leur milieu ?"
          tabrep = ['Losange', 'Rectangle', 'Carré', 'Trapèze', 'Parallélogramme']
          tabicone = [0, 1, 0, 0, 0]
          this.qcm[1].push(['Quelle est la nature d\'un quadrilatère ayant ses diagonales de même longueur et sécantes en leur milieu ? \\\\ \n Réponses possibles : ',
            tabrep,
            tabicone])
          A = point(0, 0)
          B = point(5, 0)
          C = point(5, 3)
          D = point(0, 3)
          O = point(2.5, 1.5)
          ABCD = polygone(A, B, C, D)
          // codage1 = codageAngleDroit(A,B,C);
          // codage2 = codageAngleDroit(B,C,D);
          // codage3 = codageAngleDroit(C,D,A);
          // marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
          sAC = segment(A, C)
          sBD = segment(B, D)
          // sOA = segment(O, A);
          // sOB = segment(O, B);
          // sOC = segment(O, C);
          // sOD = segment(O, D);
          // sAC.pointilles = true;
          // sBD.pointilles = true;
          marquesDemiDiagonales = codeSegments('||', 'blue', O, A, O, B, O, C, O, D)
          if (this.correctionDetaillee) { texteCorr = mathalea2d({ xmin: -1, xmax: 6, ymin: -1, ymax: 4 }, ABCD, marquesDemiDiagonales, sAC, sBD) + '<br>' }
          texteCorr += "C'est un rectangle."
          break
        case 'carre1':
          texte = "Quelle est la nature d'un quadrilatère ayant ses 4 côtés de même longueur et 4 angles droits ?"
          tabrep = ['Losange', 'Rectangle', 'Carré', 'Trapèze', 'Parallélogramme']
          tabicone = [0, 0, 1, 0, 0]
          this.qcm[1].push(['Quelle est la nature d\'un quadrilatère ayant ses 4 côtés de même longueur et 4 angles droits ? \\\\ \n Réponses possibles : ',
            tabrep,
            tabicone])
          A = point(0, 0)
          B = point(3, 0)
          C = point(3, 3)
          D = point(0, 3)
          O = point(1.5, 1.5)
          ABCD = polygone(A, B, C, D)
          codage1 = codageAngleDroit(A, B, C)
          codage2 = codageAngleDroit(B, C, D)
          codage3 = codageAngleDroit(C, D, A)
          marquesCotes = codeSegments('||', 'blue', A, B, B, C, C, D, D, A)
          // sAC = segment(A, C);
          // sBD = segment(B, D);
          // sOA = segment(O, A);
          // sOB = segment(O, B);
          // sOC = segment(O, C);
          // sOD = segment(O, D);
          // sAC.pointilles = true;
          // sBD.pointilles = true;
          // marquesDemiDiagonales = codeSegments("||", "blue", O, A, O, B, O, C, O, D);
          if (this.correctionDetaillee) { texteCorr = mathalea2d({ xmin: -1, xmax: 4, ymin: -1, ymax: 4 }, ABCD, codage1, codage2, codage3, marquesCotes) + '<br>' }
          texteCorr += "C'est un carré."
          break
        case 'carre2':
          texte = "Quelle est la nature d'un quadrilatère ayant ses ses diagonales perpendiculaires, de même longueur et sécantes en leur milieu ?"
          tabrep = ['Losange', 'Rectangle', 'Carré', 'Trapèze', 'Parallélogramme']
          tabicone = [0, 0, 1, 0, 0]
          this.qcm[1].push(['Quelle est la nature d\'un quadrilatère ayant ses ses diagonales perpendiculaires, de même longueur et sécantes en leur milieu ? \\\\ \n Réponses possibles : ',
            tabrep,
            tabicone])
          A = point(0, 0)
          B = point(3, 0)
          C = point(3, 3)
          D = point(0, 3)
          O = point(1.5, 1.5)
          ABCD = polygone(A, B, C, D)
          codage = codageAngleDroit(C, O, D)
          // codage2 = codageAngleDroit(B,C,D);
          // codage3 = codageAngleDroit(C,D,A);
          // codage4 = codageAngleDroit(D,A,B);
          // marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
          sAC = segment(A, C)
          sBD = segment(B, D)
          sAC.pointilles = true
          sBD.pointilles = true
          marquesDemiDiagonales = codeSegments('||', 'blue', O, A, O, B, O, C, O, D)
          if (this.correctionDetaillee) { texteCorr = mathalea2d({ xmin: -1, xmax: 4, ymin: -1, ymax: 4 }, ABCD, codage, marquesDemiDiagonales, sAC, sBD) + '<br>' }
          texteCorr += "C'est un carré."
          break
        case 'carre3':
          texte = "Quelle est la nature d'un quadrilatère ayant ses 4 côtés de même longueur et un angle droit ?"
          tabrep = ['Losange', 'Rectangle', 'Carré', 'Trapèze', 'Parallélogramme']
          tabicone = [0, 0, 1, 0, 0]
          this.qcm[1].push(['Quelle est la nature d\'un quadrilatère ayant ses 4 côtés de même longueur et un angle droit ? \\\\ \n Réponses possibles : ',
            tabrep,
            tabicone])
          A = point(0, 0)
          B = point(3, 0)
          C = point(3, 3)
          D = point(0, 3)
          O = point(1.5, 1.5)
          ABCD = polygone(A, B, C, D)
          codage = codageAngleDroit(A, B, C)
          // codage2 = codageAngleDroit(B,C,D);
          // codage3 = codageAngleDroit(C,D,A);
          // codage4 = codageAngleDroit(D,A,B);
          marquesCotes = codeSegments('||', 'blue', A, B, B, C, C, D, D, A)
          // sAC = segment(A, C);
          // sBD = segment(B, D);
          // sOA = segment(O, A);
          // sOB = segment(O, B);
          // sOC = segment(O, C);
          // sOD = segment(O, D);
          // sAC.pointilles = true;
          // sBD.pointilles = true;
          // marquesDemiDiagonales = codeSegments("||", "blue", O, A, O, B, O, C, O, D);
          if (this.correctionDetaillee) { texteCorr = mathalea2d({ xmin: -1, xmax: 4, ymin: -1, ymax: 4 }, ABCD, codage, marquesCotes) + '<br>' }
          texteCorr += "C'est un carré."
          break
      }
      shuffle2tableaux(tabrep, tabicone)
      if (this.modeQcm && !mathalea.sortieAMC) {
        if (texteCorr.lastIndexOf('\n') > 0) {
          texteCorr = texteCorr.substring(0, texteCorr.lastIndexOf('\n'))
        }
        this.tableauSolutionsDuQcm[i] = tabicone
        texte += propositionsQcm(numeroExercice, i, tabrep, tabicone).texte
        texteCorr += '<br>' + propositionsQcm(numeroExercice, i, tabrep, tabicone).texteCorr
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  gestionQcmInteractif(this)
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3,'1 : ....\n2 : .....,\n3 : .....];
}

// Exercices paramétrés pour correspondre au référentiel
// Référence 5P10
// function Proportionnalite_pas_proportionnalite_5e(){
//  Proportionnalite_pas_proportionnalite.call(this)
// Pas de paramètres Sup
// }

// Référence 6C23
