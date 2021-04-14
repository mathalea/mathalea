import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,creerNomDePolygone} from "/modules/outils.js"
import {point,tracePoint,milieu,labelPoint,segment,translation2Points,similitude,grille,seyes,mathalea2d,} from "/modules/2d.js"


/**
 * fonction servant à compléter des solides, inspirée des fonctions de 6G42 et 6G43
 * référence : 6G41
 * @Auteur Mireille Gain, s'inspirant fortement de Jean-Claude Lhote
 */
export default function Representer_un_solide() {
  Exercice.call(this); // Héritage de la classe Exercice ()
  this.titre = "Compléter une représentation en perspective cavalière";
  this.nb_questions = 1;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1;
  this.sup2 = 1;
  this.classe=6;

  this.nouvelle_version = function () {
    this.QCM=['6G41',[],'Compléter une représentation en perspective cavalière',3,{}]
    let type_de_questions_disponibles;

    if (this.sup == 3)
      type_de_questions_disponibles = [1, 2];
    else if (this.sup == 5)
      type_de_questions_disponibles = [1, 2, 4];
    else if (this.sup == 7)
      type_de_questions_disponibles = [1, 2, 4, 6];
    else
      type_de_questions_disponibles = [parseInt(this.sup)];

    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let Xmin, Xmax, Ymin, Ymax, ppc, sc;

    // sixième : cube et pavé droit
    if (this.classe == 6)
      type_de_questions_disponibles = [1, 2];

    // cinquième : on ajoute le prisme
    else if (this.classe == 5)
      type_de_questions_disponibles = [1, 2, 4];

    // Quatrième : on ajoute la pyramide
    else if (this.classe == 4)
      type_de_questions_disponibles = [1, 2, 4, 6];

    if (this.sup2 == 1)
      sc = 0.5;
    else
      sc = 0.8;

    let A, B, C, D, E, F, G, H, I,
      AB, BC, CD, DA, EF, FG, GH, HE, AE, BF, CG, DH, IA, IB, IE, IF, BD, FH,
      coeffpersp,
      enonce,
      correction,
      carreaux, g,
      objets_enonce = [],
      objets_correction = [], matrace = tracePoint(I);

    for (let i = 0, texte, cpt = 0; i < this.nb_questions && cpt < 50;) {
      let nom = creerNomDePolygone(8, "PQ"),
        anglepersp = choice([30, 45, -30, -45, 150, 135, -150, -135]);
      if (anglepersp % 10 == 0)
        coeffpersp = 0.6;
      else
        coeffpersp = 0.4;
      objets_correction = [];
      objets_enonce = [];

      switch (liste_type_de_questions[i]) {
        case 1: //cube
          enonce = `$${nom}$ est un cube.<br>`;
          if (sortie_html)
            enonce += `Reproduire et compléter la figure ci-dessous, en repassant de la même couleur les segments parallèles et de même longueur.<br>`;
          correction = `Figure complétée :<br>`;
          break;

        case 2: //pavé droit
          enonce = `$${nom}$ est un pavé droit.<br>`;
          if (sortie_html)
            enonce += `Reproduire et compléter la figure ci-dessous, en repassant de la même couleur les segments parallèles et de même longueur.<br>`;
          correction = `Figure complétée :<br>`;
          break;

        case 4: //prisme
          enonce = `On considère un prisme à base triangulaire.<br>Reproduire et compléter la figure ci-dessous, en repassant de la même couleur les segments parallèles et de même longueur.<br>`;
          correction = `Figure complétée :<br>`;
          break;

        case 6: //pyramide
          enonce = `On considère une pyramide à base rectangulaire.<br>Reproduire et compléter la figure ci-dessous, en repassant de la même couleur les segments parallèles et de même longueur.<br>`;
          correction = `Figure complétée :<br>`;
          break;
      }

      switch (liste_type_de_questions[i] % 2) {
        case 1:
          A = point(6, 0, nom[0], "left");
          B = point(11, 0, nom[1], "right");
          C = point(11, 5, nom[2], "right");
          D = point(6, 5, nom[3], "left");
          E = similitude(B, A, anglepersp, coeffpersp, nom[4], 'left');
          E.x = Math.round(E.x);
          E.y = Math.round(E.y);
          break;

        case 0:
          A = point(5, 0, nom[0], "left");
          B = point(9 + randint(1, 3), 0, nom[1], "right");
          C = point(B.x, randint(3, 7), nom[2], "right");
          D = point(A.x, C.y, nom[3], "left");
          E = similitude(B, A, anglepersp, coeffpersp * randint(5, 12) / 10, nom[4], 'left');
          E.x = Math.round(E.x);
          E.y = Math.round(E.y);
          break;
      }

      F = translation2Points(E, A, B, nom[5], 'right');
      G = translation2Points(F, B, C, nom[6], 'right');
      H = translation2Points(G, C, D, nom[7], 'left');
      I = milieu(D, G);
      matrace.taille = 4;
      matrace.opacite = 0.9;
      matrace.epaisseur = 5;
      matrace.style = 'x';
      AB = segment(A, B);
      BC = segment(B, C);
      CD = segment(C, D);
      DA = segment(D, A);
      EF = segment(E, F);
      FG = segment(F, G);
      GH = segment(G, H);
      HE = segment(H, E);
      AE = segment(A, E);
      BF = segment(B, F);
      CG = segment(C, G);
      DH = segment(D, H);
      IA = segment(A, I);
      IB = segment(B, I);
      IE = segment(E, I);
      IF = segment(F, I);
      BD = segment(B, D);
      FH = segment(F, H);
      AB.epaisseur = 2;
      BC.epaisseur = 2;
      CD.epaisseur = 2;
      DA.epaisseur = 2;
      EF.epaisseur = 2;
      FG.epaisseur = 2;
      GH.epaisseur = 2;
      HE.epaisseur = 2;
      AE.epaisseur = 2;
      BF.epaisseur = 2;
      CG.epaisseur = 2;
      DH.epaisseur = 2;
      IA.epaisseur = 1;
      IB.epaisseur = 1;
      IE.epaisseur = 1;
      IF.epaisseur = 1;
      BD.epaisseur = 2;
      FH.epaisseur = 2;
      AB.color = 'black';
      BC.color = 'black';
      CD.color = 'black';
      DA.color = 'black';
      EF.color = 'black';
      FG.color = 'black';
      GH.color = 'black';
      HE.color = 'black';
      AE.color = 'black';
      BF.color = 'black';
      CG.color = 'black';
      IA.color = 'black';

      if (G.y < C.y && G.x < C.x) {
        CG.pointilles = true;
        GH.pointilles = true;
        FG.pointilles = true;
        IF.pointilles = true;
        FH.pointilles = true;
        CG.color = 'gray';
        GH.color = 'gray';
        FG.color = 'gray';
        CG.opacite = 0.7;
        GH.opacite = 0.7;
        FG.opacite = 0.7;
      }
      else if (E.y > A.y && E.x > A.x) {
        AE.pointilles = true;
        EF.pointilles = true;
        HE.pointilles = true;
        IE.pointilles = true;
        FH.pointilles = true;
        AE.color = 'gray';
        EF.color = 'gray';
        HE.color = 'gray';
        AE.opacite = 0.7;
        EF.opacite = 0.7;
        HE.opacite = 0.7;
      }
      else if (F.x < B.x && F.y > B.y) {
        BF.pointilles = true;
        FG.pointilles = true;
        EF.pointilles = true;
        IF.pointilles = true;
        FH.pointilles = true;
        BF.color = 'gray';
        FG.color = 'gray';
        EF.color = 'gray';
        BF.opacite = 0.7;
        FG.opacite = 0.7;
        EF.opacite = 0.7;
      }
      else if (H.x > D.x && H.y < D.y) {
        DH.pointilles = true;
        GH.pointilles = true;
        HE.pointilles = true;
        IE.pointilles = true;
        FH.pointilles = true;
        DH.color = 'gray';
        GH.color = 'gray';
        HE.color = 'gray';
        DH.opacite = 0.7;
        GH.opacite = 0.7;
        HE.opacite = 0.7;
      }
      Xmin = Math.min(A.x, E.x) - 1;
      Ymin = Math.min(A.y, E.y) - 1;
      Xmax = Math.max(B.x, F.x) + 2;
      Ymax = Math.max(D.y, H.y) + 1;
      ppc = 20;

      if (this.sup2 < 3) { g = grille(Xmin, Ymin, Xmax, Ymax, "gray", 0.7); }
      else
        g = "";
      if (this.sup2 == 2) { carreaux = seyes(Xmin, Ymin, Xmax, Ymax); sc = 0.8; }
      else { carreaux = ""; sc = 0.5; }

      let params = {
        xmin: Xmin,
        ymin: Ymin,
        xmax: Xmax,
        ymax: Ymax,
        pixelsParCm: ppc,
        scale: sc,
      };

      if (liste_type_de_questions[i] == 1) {
        objets_enonce.push(AB, BC, CD, DA, AE, labelPoint(A, B, C, D, E),
          g,
          carreaux
        );
      }

      if (liste_type_de_questions[i] == 2) {
        objets_enonce.push(AB, BC, CD, DA, AE, labelPoint(A, B, C, D, E),
          g,
          carreaux
        );
      }

      if (liste_type_de_questions[i] == 4) {
        objets_enonce.push(AB, DA, BD, AE,
          g,
          carreaux
        );
      }

      if (liste_type_de_questions[i] == 6) {
        objets_enonce.push(AB, BF, tracePoint(I, .5, 'red'), labelPoint(I),
          g,
          carreaux
        );
      }

      enonce += mathalea2d(params, objets_enonce);
      if (liste_type_de_questions[i] == 1) {
        AB.color = 'green';
        BC.color = 'red';
        CD.color = 'green';
        DA.color = 'red';
        EF.color = 'green';
        FG.color = 'red';
        GH.color = 'green';
        HE.color = 'red';
        AE.color = 'blue';
        BF.color = 'blue';
        CG.color = 'blue';
        DH.color = 'blue';
        objets_correction.push(AB, BC, CD, DA, EF, FG, GH, HE, AE, BF, CG, DH, labelPoint(A, B, C, D, E, F, G, H),
          g,
          carreaux
        );
      }

      if (liste_type_de_questions[i] == 2) {
        AB.color = 'green';
        BC.color = 'red';
        CD.color = 'green';
        DA.color = 'red';
        EF.color = 'green';
        FG.color = 'red';
        GH.color = 'green';
        HE.color = 'red';
        AE.color = 'blue';
        BF.color = 'blue';
        CG.color = 'blue';
        DH.color = 'blue';
        objets_correction.push(AB, BC, CD, DA, EF, FG, GH, HE, AE, BF, CG, DH, labelPoint(A, B, C, D, E, F, G, H),
          g,
          carreaux
        );
      }

      if (liste_type_de_questions[i] == 4) {
        AB.color = 'green';
        BC.color = 'red';
        CD.color = 'green';
        DA.color = 'red';
        EF.color = 'green';
        FG.color = 'red';
        GH.color = 'green';
        HE.color = 'red';
        AE.color = 'blue';
        BF.color = 'blue';
        CG.color = 'blue';
        DH.color = 'blue';
        objets_correction.push(AB, DA, BD, EF, HE, AE, BF, DH, FH,
          g,
          carreaux
        );
      }

      if (liste_type_de_questions[i] == 6) {
        AB.color = 'green';
        BC.color = 'red';
        CD.color = 'green';
        DA.color = 'red';
        EF.color = 'green';
        FG.color = 'red';
        GH.color = 'green';
        HE.color = 'red';
        AE.color = 'blue';
        BF.color = 'blue';
        CG.color = 'blue';
        DH.color = 'blue';
        objets_correction.push(AB, EF, AE, BF, IA, IB, IE, IF, tracePoint(I),
          g,
          carreaux
        );
      }

      correction += mathalea2d(params, objets_correction);
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(enonce + "<br>");
        this.liste_corrections.push(correction + "<br>");
        this.QCM[1][0]=[enonce,[correction],[5]] 
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };

    this.besoin_formulaire_numerique = ['Type de solides', 3, `1 : Cubes\n 2 : Pavés droits\n 3 : Mélange cubes et pavés`];

  this.besoin_formulaire2_numerique = [
    "Type de cahier",
    3,
    `1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`,
  ];
}
