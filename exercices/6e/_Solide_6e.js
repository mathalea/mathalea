import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,creerNomDePolygone} from "/modules/outils.js"
import {point,labelPoint,segment,polygone,translation2Points,similitude,codeSegments,grille,seyes,mathalea2d} from "/modules/2d.js"
/**
 * fonction servant à plusieurs exercice autour du cube et du pavé droit
 * références : 6G42 et 6G43
 * @Auteur Jean-Claude Lhote
 */
export default function Solide_6e() {
  "use strict";
  Exercice.call(this);
  this.nb_questions = 1;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1;
  this.sup2 = 1;
  this.titre = "";
  this.nouvelle_version = function () {
    let type_de_questions_disponibles;
    if (this.sup == 3) type_de_questions_disponibles = [1, 2]
    else type_de_questions_disponibles = [parseInt(this.sup)];

    if (this.type == "vocabulaire")
      for (let n = 0; n < type_de_questions_disponibles.length; n++)
        type_de_questions_disponibles[n] += 2
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    );
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let Xmin, Xmax, Ymin, Ymax, ppc, sc;

    if (this.sup2 == 1) sc = 0.5;
    else sc = 0.8;

    let A, B, C, D, E, F, G, H,
      AB, BC, CD, DA, EF, FG, GH, HE, AE, BF, CG, DH,
      coeffpersp,
      codesseg = [],
      enonce,
      correction,
      carreaux, g,
      objets_enonce = [],
      objets_correction = [],
      p;
    for (
      let i = 0, texte, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      let nom = creerNomDePolygone(8, "PQ"),
        anglepersp = choice([30, 45, -30, -45, 150, 135, -150, -135])
      if (anglepersp % 10 == 0) coeffpersp = 0.6
      else coeffpersp = 0.4
      objets_correction = []
      objets_enonce = []
      switch (liste_type_de_questions[i]) {
        case 1: //cube
          enonce = `${nom} est un cube.<br>`
          if (sortie_html) enonce += ` Reproduire la figure ci-dessous sur le cahier.<br>`;
          enonce += ` Repasse tous les segments de même longueur dans une même couleur.<br>`;
          correction = `Le cube ${nom}.<br>`
          break;

        case 2:
          enonce = `${nom} est un pavé droit.<br>`
          if (sortie_html) enonce += ` Reproduire la figure ci-dessous sur le cahier.<br>`;
          enonce += ` Repasse tous les segments de même longueur dans une même couleur.<br>`;
          correction = `Le pavé droit ${nom}.<br>`
          break;

        case 3:
          enonce = `${nom} est un cube.<br>`
          break;

        case 4:
          enonce = `${nom} est un pavé droit.<br>`
          break;
      }
      let aretes_paralleles = [[[0, 1], [3, 2], [4, 5], [7, 6]], [[0, 3], [1, 2], [4, 7], [5, 6]], [[0, 4], [1, 5], [2, 6], [3, 7]]]
      let faces_paralleles = [[[0, 1, 2, 3], [4, 5, 6, 7]], [[0, 4, 7, 3], [1, 5, 6, 2]], [[0, 1, 5, 4], [3, 2, 6, 7]]]
      let aretes_perp = [[[0, 1], [0, 4], [0, 3], [1, 5], [1, 2]], [[0, 4], [0, 1], [0, 3], [4, 5], [4, 7]], [[0, 3], [0, 1], [0, 4], [3, 2], [3, 7]], [[1, 2], [1, 0], [1, 5], [2, 3], [2, 6]], [[1, 5], [1, 0], [1, 2],
      [5, 4], [5, 6]], [[5, 4], [5, 1], [5, 6], [4, 0], [4, 7]], [[5, 6], [5, 1], [5, 4], [6, 2], [6, 7]]
        , [[6, 2], [6, 5], [6, 7], [2, 1], [2, 3]], [[2, 3], [2, 1], [2, 6], [3, 0], [3, 7]], [[3, 7], [3, 2], [3, 0], [7, 4], [7, 6]], [[7, 4], [4, 0], [4, 5], [7, 3], [7, 6]], [[7, 6], [6, 2], [6, 5], [7, 3], [7, 4]]]
      let faces_perp = [[[0, 1, 2, 3], [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0], [0, 1, 5, 4]], [[1, 5, 6, 2], [0, 1, 2, 3], [2, 6, 7, 3], [5, 6, 7, 4], [1, 5, 4, 0]], [[0, 1, 5, 4], [1, 5, 6, 2], [4, 5, 6, 7], [0, 4, 7, 3], [0, 1, 2, 3]],
      [[4, 5, 6, 7], [0, 1, 5, 4], [1, 5, 6, 2], [2, 6, 7, 3], [0, 4, 7, 3]], [[0, 4, 7, 3], [0, 1, 2, 3], [0, 1, 5, 4], [4, 5, 6, 7], [3, 2, 6, 7]], [[3, 2, 6, 7], [0, 1, 2, 3], [1, 5, 6, 2], [4, 5, 6, 7], [0, 4, 7, 3]]]
      let k, l, s

      switch (randint(1, 4)) {

        case 1: // citer les arêtes parallèles à une arrête donnée
          [k, l, s] = [randint(0, 2), randint(0, 3), randint(0, 1)]
          enonce += `Citer toutes les arêtes parallèles à [$${nom[aretes_paralleles[k][l][s]] + nom[aretes_paralleles[k][l][(s + 1) % 2]]}$].<br>`
          correction = `Les arêtes parallèles à [$${nom[aretes_paralleles[k][l][s]] + nom[aretes_paralleles[k][l][(s + 1) % 2]]}$] sont [$${nom[aretes_paralleles[k][(l + 1) % 4][s]] + nom[aretes_paralleles[k][(l + 1) % 4][(s + 1) % 2]]}$], [$${nom[aretes_paralleles[k][(l + 2) % 4][s]] + nom[aretes_paralleles[k][(l + 2) % 4][(s + 1) % 2]]}$] et [$${nom[aretes_paralleles[k][(l + 3) % 4][s]] + nom[aretes_paralleles[k][(l + 3) % 4][(s + 1) % 2]]}$].<br>`
          break;

        case 2: // citer la face parallèle à une face donnée
          [k, l, s] = [randint(0, 2), randint(0, 1), randint(0, 3)]
          enonce += `Quelle est la face parallèle à $${nom[faces_paralleles[k][l][s]] + nom[faces_paralleles[k][l][(s + 1) % 4]] + nom[faces_paralleles[k][l][(s + 2) % 4]] + nom[faces_paralleles[k][l][(s + 3) % 4]]}$ ?<br>`
          correction = `La face parallèle à $${nom[faces_paralleles[k][l][s]] + nom[faces_paralleles[k][l][(s + 1) % 4]] + nom[faces_paralleles[k][l][(s + 2) % 4]] + nom[faces_paralleles[k][l][(s + 3) % 4]]}$ est la face $${nom[faces_paralleles[k][(l + 1) % 2][s]] + nom[faces_paralleles[k][(l + 1) % 2][(s + 1) % 4]] + nom[faces_paralleles[k][(l + 1) % 2][(s + 2) % 4]] + nom[faces_paralleles[k][(l + 1) % 2][(s + 3) % 4]]}$.<br>`
          break;

        case 3: // citer les arêtes perpendiculaires à une arête donnée
          [k, l, s] = [randint(0, 11), 0, randint(0, 1)]
          enonce += `Quelles sont les arêtes peprendiculaires à l'arête [$${nom[aretes_perp[k][l][s]] + nom[aretes_perp[k][l][(s + 1) % 2]]}$] ?<br>`
          correction = `Les arêtes perpendiculaires à l'arête [$${nom[aretes_perp[k][l][s]] + nom[aretes_perp[k][l][(s + 1) % 2]]}$] sont [$${nom[aretes_perp[k][1][s]] + nom[aretes_perp[k][1][(s + 1) % 2]]}$], [$${nom[aretes_perp[k][2][s]] + nom[aretes_perp[k][2][(s + 1) % 2]]}$], [$${nom[aretes_perp[k][3][s]] + nom[aretes_perp[k][3][(s + 1) % 2]]}$] et [$${nom[aretes_perp[k][4][s]] + nom[aretes_perp[k][4][(s + 1) % 2]]}$].`
          break;

        case 4: // citer les faces perpendiculaires à une face donnée
          [k, l, s] = [randint(0, 5), 0, randint(0, 3)]
          enonce += `Quelles sont les faces perpendiculaires à la face $${nom[faces_perp[k][l][s]] + nom[faces_perp[k][l][(s + 1) % 4]] + nom[faces_perp[k][l][(s + 2) % 4]] + nom[faces_perp[k][l][(s + 3) % 4]]}$ ?<br>`
          correction = `Les faces perpendiculaires à la face $${nom[faces_perp[k][l][s]] + nom[faces_perp[k][l][(s + 1) % 4]] + nom[faces_perp[k][l][(s + 2) % 4]] + nom[faces_perp[k][l][(s + 3) % 4]]}$ `
          correction += `sont les faces $${nom[faces_perp[k][l + 1][s]] + nom[faces_perp[k][l + 1][(s + 1) % 4]] + nom[faces_perp[k][l + 1][(s + 2) % 4]] + nom[faces_perp[k][l + 1][(s + 3) % 4]]}$, `
          correction += `$${nom[faces_perp[k][l + 2][s]] + nom[faces_perp[k][l + 2][(s + 1) % 4]] + nom[faces_perp[k][l + 2][(s + 2) % 4]] + nom[faces_perp[k][l + 2][(s + 3) % 4]]}$, `
          correction += `$${nom[faces_perp[k][l + 3][s]] + nom[faces_perp[k][l + 3][(s + 1) % 4]] + nom[faces_perp[k][l + 3][(s + 2) % 4]] + nom[faces_perp[k][l + 3][(s + 3) % 4]]}$ et `
          correction += `$${nom[faces_perp[k][l + 4][s]] + nom[faces_perp[k][l + 4][(s + 1) % 4]] + nom[faces_perp[k][l + 4][(s + 2) % 4]] + nom[faces_perp[k][l + 4][(s + 3) % 4]]}$.`
          break;
      }

      switch (liste_type_de_questions[i] % 2) {
        case 1:
          A = point(6, 0, nom[0], "left");
          B = point(11, 0, nom[1], "right");
          C = point(11, 5, nom[2], "right");
          D = point(6, 5, nom[3], "left");
          p = polygone(A, B, C, D)
          E = similitude(B, A, anglepersp, coeffpersp, nom[4], 'left')
          E.x = Math.round(E.x)
          E.y = Math.round(E.y)
          break;

        case 0:
          A = point(5, 0, nom[0], "left");
          B = point(9 + randint(1, 3), 0, nom[1], "right");
          C = point(B.x, randint(3, 7), nom[2], "right");
          D = point(A.x, C.y, nom[3], "left");
          p = polygone(A, B, C, D)
          E = similitude(B, A, anglepersp, coeffpersp * randint(5, 12) / 10, nom[4], 'left')
          E.x = Math.round(E.x)
          E.y = Math.round(E.y)
          break;
      }

      p = polygone(A, B, C, D)
      F = translation2Points(E, A, B, nom[5], 'right')
      G = translation2Points(F, B, C, nom[6], 'right')
      H = translation2Points(G, C, D, nom[7], 'left')
      AB = segment(A, B)
      BC = segment(B, C)
      CD = segment(C, D)
      DA = segment(D, A)
      EF = segment(E, F)
      FG = segment(F, G)
      GH = segment(G, H)
      HE = segment(H, E)
      AE = segment(A, E)
      BF = segment(B, F)
      CG = segment(C, G)
      DH = segment(D, H)
      AB.epaisseur = 2
      BC.epaisseur = 2
      CD.epaisseur = 2
      DA.epaisseur = 2
      EF.epaisseur = 2
      FG.epaisseur = 2
      GH.epaisseur = 2
      HE.epaisseur = 2
      AE.epaisseur = 2
      BF.epaisseur = 2
      CG.epaisseur = 2
      DH.epaisseur = 2
      AB.color = 'black'
      BC.color = 'black'
      CD.color = 'black'
      DA.color = 'black'
      EF.color = 'black'
      FG.color = 'black'
      GH.color = 'black'
      HE.color = 'black'
      AE.color = 'black'
      BF.color = 'black'
      CG.color = 'black'
      if (G.y < C.y && G.x < C.x) {
        CG.pointilles = true
        CG.color = 'gray'
        CG.opacite = 0.7
        GH.pointilles = true
        GH.color = 'gray'
        GH.opacite = 0.7
        FG.pointilles = true
        FG.color = 'gray'
        FG.opacite = 0.7
      }
      else if (E.y > A.y && E.x > A.x) {
        AE.pointilles = true
        EF.pointilles = true
        HE.pointilles = true
        AE.color = 'gray'
        EF.color = 'gray'
        HE.color = 'gray'
        AE.opacite = 0.7
        EF.opacite = 0.7
        HE.opacite = 0.7
      }
      else if (F.x < B.x && F.y > B.y) {
        BF.pointilles = true
        FG.pointilles = true
        EF.pointilles = true
        BF.color = 'gray'
        FG.color = 'gray'
        EF.color = 'gray'
        BF.opacite = 0.7
        FG.opacite = 0.7
        EF.opacite = 0.7
      }
      else if (H.x > D.x && H.y < D.y) {
        DH.pointilles = true
        GH.pointilles = true
        HE.pointilles = true
        DH.color = 'gray'
        GH.color = 'gray'
        HE.color = 'gray'
        DH.opacite = 0.7
        GH.opacite = 0.7
        HE.opacite = 0.7
      }
      Xmin = Math.min(A.x, E.x) - 1;
      Ymin = Math.min(A.y, E.y) - 1;
      Xmax = Math.max(B.x, F.x) + 2;
      Ymax = Math.max(D.y, H.y) + 1;
      ppc = 20;

      if (this.sup2 < 3) g = grille(Xmin, Ymin, Xmax, Ymax, "gray", 0.7);
      else g = "";
      if (this.sup2 == 2) {
        carreaux = seyes(Xmin, Ymin, Xmax, Ymax);
        sc = 0.8
      }
      else {
        carreaux = "";
        sc = 0.5
      }
      objets_enonce.push(AB, BC, CD, DA, EF, FG, GH, HE, AE, BF, CG, DH, labelPoint(A, B, C, D, E, F, G, H), p,
        g,
        carreaux
      );

      let params = {
        xmin: Xmin,
        ymin: Ymin,
        xmax: Xmax,
        ymax: Ymax,
        pixelsParCm: ppc,
        scale: sc,
      }

      enonce += mathalea2d(params, objets_enonce);
      if (liste_type_de_questions[i] == 1) {
        codesseg = [codeSegments('||', 'green', [A, B, C, D, A, E, F, G, H, E]), codeSegments('||', 'green', B, F, C, G, D, H)]
        AB.color = 'green'
        BC.color = 'green'
        CD.color = 'green'
        DA.color = 'green'
        EF.color = 'green'
        FG.color = 'green'
        GH.color = 'green'
        HE.color = 'green'
        AE.color = 'green'
        BF.color = 'green'
        CG.color = 'green'
        DH.color = 'green'
      }
      else {
        codesseg = [codeSegments('||', 'green', A, B, C, D, E, F, G, H), codeSegments('O', 'red', A, E, B, F, C, G, D, H), codeSegments('×', 'blue', D, A, B, C, F, G, H, E)]
        AB.color = 'green'
        BC.color = 'blue'
        CD.color = 'green'
        DA.color = 'blue'
        EF.color = 'green'
        FG.color = 'blue'
        GH.color = 'green'
        HE.color = 'blue'
        AE.color = 'red'
        BF.color = 'red'
        CG.color = 'red'
        DH.color = 'red'
      }

      objets_correction.push(AB, BC, CD, DA, EF, FG, GH, HE, AE, BF, CG, DH, labelPoint(A, B, C, D, E, F, G, H),
        g,
        carreaux
      );

      if (liste_type_de_questions[i] < 3) correction += mathalea2d(params, objets_correction, codesseg);

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(enonce + "<br>");
        this.liste_corrections.push(correction + "<br>");
        i++;
      }
      cpt++;
    }

    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Type de solides', 3, `1 : Cubes\n 2 : Pavés droits\n 3 : Mélange`]
  this.besoin_formulaire2_numerique = [
    "Type de cahier",
    3,
    `1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`,
  ];
}

