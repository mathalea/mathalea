import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,choice,shuffle,shuffle2tableaux} from "/modules/outils.js"
import {point,segment,polygone,codageAngleDroit,codeSegments,mathalea2d} from "/modules/2d.js"
/**
 * Reconnaitre un quadrilatère particulier à partir de ses propriétés
 * @Auteur Rémi Angot
 * Référence 6G33
*/
export default function Reconnaitre_quadrilatere_particulier() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Reconnaitre un quadrilatère particulier à partir de ses propriétés";
  this.consigne = "";
  this.nb_questions = 3;
  this.nb_questions_modifiable = false;
  this.nb_cols = 2; // Nombre de colonnes pour la sortie LaTeX
  this.nb_cols_corr = 2; // Nombre de colonnes dans la correction pour la sortie LaTeX
  this.correction_detaillee_disponible = true;
  sortie_html ? this.correction_detaillee = true : this.correction_detaillee = false
  this.QCM_disponible=true
  this.ModeQCM=false

  this.nouvelle_version = function () {
    this.QCM=['6G33',[],"Trouver la nature d'un quadrilatère."]
    let espace =``;
    if (sortie_html) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let liste_de_questions = shuffle([choice(['losange1','losange2']),choice(['rectangle1','rectangle2']),choice(['carre1','carre2','carre3'])])
    for (let i = 0, texte, texte_corr,cpt = 0; i < this.nb_questions && cpt < 50;)
     {
      texte = '';
      texte_corr = '';
      let A,B,C,D,O,ABCD,codage,codage1,codage2,codage3,sAC,sBD,marquesDemiDiagonales,marquesDemiDiagonales1,marquesDemiDiagonales2,marquesCotes,tabrep,tabicone;
      switch (liste_de_questions[i]) {
          case 'losange1':
              texte = "Quelle est la nature d'un quadrilatère ayant 4 côtés de même longueur ?";
              tabrep=['losange','rectangle','carré','trapèze','parallélogramme']
              tabicone=[1,0,0,0,0]
              this.QCM[1].push([`Quelle est la nature d'un quadrilatère ayant 4 côtés de même longueur ? \\\\ \n Réponses possibles : `,
              tabrep,
              tabicone]) 
              A = point(0, 0);
              B = point(2, 3);
              C = point(0, 6);
              D = point(-2, 3);
              O = point(0, 3);
              ABCD = polygone(A, B, C, D);
              //codage = codageAngleDroit(C, O, B);
              marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
              // sAC = segment(A, C);
              // sBD = segment(B, D);
              // sOA = segment(O, A);
              // sOB = segment(O, B);
              // sOC = segment(O, C);
              // sOD = segment(O, D);
              // sAC.pointilles = true;
              // sBD.pointilles = true;
              // marquesDemiDiagonales = codeSegments("|", "blue", O, A, O, B, O, C, O, D);
              if (this.correction_detaillee) {texte_corr = mathalea2d({xmin:-3,xmax:3,ymin:-1,ymax:7},ABCD,marquesCotes)+"<br>"}
              texte_corr += "C'est un losange."
              break;
          case 'losange2':
              texte = "Quelle est la nature d'un quadrilatère ayant ses diagonales perpendiculaires et sécantes en leur milieu ?";
              tabrep=['losange','rectangle','carré','trapèze','parallélogramme']
              tabicone=[1,0,0,0,0]
              this.QCM[1].push([`Quelle est la nature d'un quadrilatère ayant ses diagonales perpendiculaires et sécantes en leur milieu ? \\\\ \n Réponses possibles : `,
              tabrep,
              tabicone]) 
              A = point(0, 0);
              B = point(2, 3);
              C = point(0, 6);
              D = point(-2, 3);
              O = point(0, 3);
              ABCD = polygone(A, B, C, D);
              codage = codageAngleDroit(C, O, B);
              //marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
              sAC = segment(A, C);
              sBD = segment(B, D);
              sAC.pointilles = true;
              sBD.pointilles = true;
              marquesDemiDiagonales1 = codeSegments("|", "blue", O, A, O, C);
              marquesDemiDiagonales2 = codeSegments("|||", "blue", O, B, O, D);
              if (this.correction_detaillee) {texte_corr = mathalea2d({xmin:-3,xmax:3,ymin:-1,ymax:7},ABCD,codage,sAC,sBD,marquesDemiDiagonales1,marquesDemiDiagonales2)+"<br>"}
              texte_corr += "C'est un losange."
              break;
          case 'rectangle1':
              texte = "Quelle est la nature d'un quadrilatère ayant 3 angles droits ?";
              tabrep=['losange','rectangle','carré','trapèze','parallélogramme']
              tabicone=[0,1,0,0,0]
              this.QCM[1].push([`Quelle est la nature d'un quadrilatère ayant 3 angles droits ? \\\\ \n Réponses possibles : `,
              tabrep,
              tabicone]) 
              A = point(0, 0);
              B = point(5, 0);
              C = point(5, 3);
              D = point(0, 3);
              O = point(2.5, 1.5);
              ABCD = polygone(A, B, C, D);
              codage1 = codageAngleDroit(A,B,C);
              codage2 = codageAngleDroit(B,C,D);
              codage3 = codageAngleDroit(C,D,A);
              //marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
              // sAC = segment(A, C);
              // sBD = segment(B, D);
              // sOA = segment(O, A);
              // sOB = segment(O, B);
              // sOC = segment(O, C);
              // sOD = segment(O, D);
              // sAC.pointilles = true;
              // sBD.pointilles = true;
              // marquesDemiDiagonales = codeSegments("||", "blue", O, A, O, B, O, C, O, D);
              if (this.correction_detaillee) {texte_corr = mathalea2d({xmin:-1,xmax:6,ymin:-1,ymax:4},ABCD,codage1,codage2,codage3)+"<br>"}
              texte_corr += "C'est un rectangle."
              break;
          case 'rectangle2':
              texte = "Quelle est la nature d'un quadrilatère ayant ses diagonales de même longueur et sécantes en leur milieu ?";
              tabrep=['losange','rectangle','carré','trapèze','parallélogramme']
              tabicone=[0,1,0,0,0]
              this.QCM[1].push([`Quelle est la nature d'un quadrilatère ayant ses diagonales de même longueur et sécantes en leur milieu ? \\\\ \n Réponses possibles : `,
              tabrep,
              tabicone]) 
              A = point(0, 0);
              B = point(5, 0);
              C = point(5, 3);
              D = point(0, 3);
              O = point(2.5, 1.5);
              ABCD = polygone(A, B, C, D);
              // codage1 = codageAngleDroit(A,B,C);
              // codage2 = codageAngleDroit(B,C,D);
              // codage3 = codageAngleDroit(C,D,A);
              //marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
              sAC = segment(A, C);
              sBD = segment(B, D);
              // sOA = segment(O, A);
              // sOB = segment(O, B);
              // sOC = segment(O, C);
              // sOD = segment(O, D);
              // sAC.pointilles = true;
              // sBD.pointilles = true;
              marquesDemiDiagonales = codeSegments("||", "blue", O, A, O, B, O, C, O, D);
              if (this.correction_detaillee) {texte_corr = mathalea2d({xmin:-1,xmax:6,ymin:-1,ymax:4},ABCD,marquesDemiDiagonales,sAC,sBD)+"<br>"}
              texte_corr += "C'est un rectangle."
              break;
          case 'carre1':
              texte = "Quelle est la nature d'un quadrilatère ayant ses 4 côtés de même longueur et 4 angles droits ?";
              tabrep=['losange','rectangle','carré','trapèze','parallélogramme']
              tabicone=[0,0,1,0,0]
              this.QCM[1].push([`Quelle est la nature d'un quadrilatère ayant ses 4 côtés de même longueur et 4 angles droits ? \\\\ \n Réponses possibles : `,
              tabrep,
              tabicone]) 
              A = point(0, 0);
              B = point(3, 0);
              C = point(3, 3);
              D = point(0, 3);
              O = point(1.5, 1.5);
              ABCD = polygone(A, B, C, D);
              codage1 = codageAngleDroit(A,B,C);
              codage2 = codageAngleDroit(B,C,D);
              codage3 = codageAngleDroit(C,D,A);
              marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
              // sAC = segment(A, C);
              // sBD = segment(B, D);
              // sOA = segment(O, A);
              // sOB = segment(O, B);
              // sOC = segment(O, C);
              // sOD = segment(O, D);
              // sAC.pointilles = true;
              // sBD.pointilles = true;
              // marquesDemiDiagonales = codeSegments("||", "blue", O, A, O, B, O, C, O, D);
              if (this.correction_detaillee) {texte_corr = mathalea2d({xmin:-1,xmax:4,ymin:-1,ymax:4},ABCD,codage1,codage2,codage3,marquesCotes)+"<br>"}
              texte_corr += "C'est un carré."
              break;
          case 'carre2':
              texte = "Quelle est la nature d'un quadrilatère ayant ses ses diagonales perpendiculaires, de même longueur et sécantes en leur milieu ?";
              tabrep=['losange','rectangle','carré','trapèze','parallélogramme']
              tabicone=[0,0,1,0,0]
              this.QCM[1].push([`Quelle est la nature d'un quadrilatère ayant ses ses diagonales perpendiculaires, de même longueur et sécantes en leur milieu ? \\\\ \n Réponses possibles : `,
              tabrep,
              tabicone]) 
              A = point(0, 0);
              B = point(3, 0);
              C = point(3, 3);
              D = point(0, 3);
              O = point(1.5, 1.5);
              ABCD = polygone(A, B, C, D);
              codage = codageAngleDroit(C,O,D);
              // codage2 = codageAngleDroit(B,C,D);
              // codage3 = codageAngleDroit(C,D,A);
              // codage4 = codageAngleDroit(D,A,B);
              // marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
              sAC = segment(A, C);
              sBD = segment(B, D);
              sAC.pointilles = true;
              sBD.pointilles = true;
              marquesDemiDiagonales = codeSegments("||", "blue", O, A, O, B, O, C, O, D);
              if (this.correction_detaillee) {texte_corr = mathalea2d({xmin:-1,xmax:4,ymin:-1,ymax:4},ABCD,codage,marquesDemiDiagonales,sAC,sBD)+"<br>"}
              texte_corr += "C'est un carré."
              break;
          case 'carre3':
              texte = "Quelle est la nature d'un quadrilatère ayant ses 4 côtés de même longueur et un angle droit ?";
              tabrep=['losange','rectangle','carré','trapèze','parallélogramme']
              tabicone=[0,0,1,0,0]
              this.QCM[1].push([`Quelle est la nature d'un quadrilatère ayant ses 4 côtés de même longueur et un angle droit ? \\\\ \n Réponses possibles : `,
              tabrep,
              tabicone])
              A = point(0, 0);
              B = point(3, 0);
              C = point(3, 3);
              D = point(0, 3);
              O = point(1.5, 1.5);
              ABCD = polygone(A, B, C, D);
              codage = codageAngleDroit(A,B,C);
              // codage2 = codageAngleDroit(B,C,D);
              // codage3 = codageAngleDroit(C,D,A);
              // codage4 = codageAngleDroit(D,A,B);
              marquesCotes = codeSegments("||", "blue", A, B, B, C, C, D, D, A);
              // sAC = segment(A, C);
              // sBD = segment(B, D);
              // sOA = segment(O, A);
              // sOB = segment(O, B);
              // sOC = segment(O, C);
              // sOD = segment(O, D);
              // sAC.pointilles = true;
              // sBD.pointilles = true;
              // marquesDemiDiagonales = codeSegments("||", "blue", O, A, O, B, O, C, O, D);
              if (this.correction_detaillee) {texte_corr = mathalea2d({xmin:-1,xmax:4,ymin:-1,ymax:4},ABCD,codage,marquesCotes)+"<br>"}
              texte_corr += "C'est un carré."
              break;
      }
      if (this.ModeQCM) {
        texte+=`<br>  Réponses possibles : ${espace}  `
        shuffle2tableaux(tabrep, tabicone);
        texte_corr=''
        for (let i=0; i<5; i++) {
          texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
         if (tabicone[i]==1) {
           texte_corr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
         } else {
           texte_corr += `$\\square\\;$ ${tabrep[i]}` + espace ;
         }
       }
      }
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : ....\n2 : .....,\n3 : .....];
}


// Exercices paramétrés pour correspondre au référentiel
// Référence 5P10
//function Proportionnalite_pas_proportionnalite_5e(){
//  Proportionnalite_pas_proportionnalite.call(this)
// Pas de paramètres Sup
//}

// Référence 6C23

