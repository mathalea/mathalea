import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,arrondi,tex_nombre,texte_en_couleur,num_alpha} from "/modules/outils.js"
import {point,tracePoint,pointSurDroite,pointIntersectionDD,labelPoint,droite,droiteParPointEtParallele,droiteParPointEtPerpendiculaire,segment,rotation,codageAngleDroit,afficheCoteSegment,grille,seyes,longueur,mathalea2d} from "/modules/2d.js"
import Alea2iep from "/modules/Alea2iep.js"

/**
 * Fonction générale pour exercices de constructions de parallèles et perpendiculaires
 * références 6G11, 6G12 et 6G12-1
 * Animation de la correction ajoutée le 16/04/2021
 * @Auteur Jean-Claude Lhote
 */
export default function Parallele_et_Perpendiculaires() {
  "use strict";
  Exercice.call(this);
  this.titre = "Tracer des parallèles et des perpendiculaires";
  this.nb_questions = 1;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1;
  this.type=3;
  this.type_exercice = "IEP";
  this.nouvelle_version = function (numero_de_l_exercice) {
    let type_de_questions_disponibles;
    type_de_questions_disponibles = [this.type]; // Le choix 1 ou 2 ou 3 : 1=perpendiculaires, 2=parallèles, 3=des perpendiculaires et des paralèlles
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    );
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let Xmin, Xmax, Ymin, Ymax, ppc = 20, sc;
let anim;

    let A,
      B,
      C,
      D,
      xE,
      E,
      F,
      CC,
      DD,
      EE,
      d,
      s1,
      s2,
      enonce,
      correction,
      dB,
      dC,
      dD,
      dE,
      g,
      lC,
      lD,
      lE,
      cB,
      cC,
      cD,
      cE,
      cF,
      cG,
      FF,
      BB,
      carreaux,
      k,
      objets_enonce = [],
      objets_correction = [],

      p;
    for (
      let i = 0, texte, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      anim=new Alea2iep()
      anim.equerreZoom(150)
      objets_enonce.length=0
      objets_correction.length=0
      if (this.sup == 2)
        k = 0.8;
      else
        k = 0.5;
      switch (liste_type_de_questions[i]) {
        case 1:
          A = point(0, 0, "A", "above left");
          B = point(10, randint(-4, 4, [-1, 0, 1]), "B", "above right");
          d = droite(A, B);
          d.isVisible = true;
          C = point(randint(2, 3), randint(3, 4), "C", "above left");
          D = point(randint(7, 8), randint(-7, -6), "D");
          dB = droiteParPointEtPerpendiculaire(B, d);
          xE = 11;
          E = pointSurDroite(dB, 11, "E", "left");
          while (!Number.isInteger(E.y)) {
            xE++;
            E = pointSurDroite(dB, xE, "E", "left");
          }
          F = point(E.x, B.y);
          s1 = segment(B, F, "red");
          s1.epaisseur = 2;
          s1.pointilles = true;
          s2 = segment(F, E, "blue");
          s2.epaisseur = 2;
          s2.pointilles = true;
          dC = droiteParPointEtPerpendiculaire(C, d);
          dD = droiteParPointEtPerpendiculaire(D, d);
          BB = rotation(A, B, 90);
          CC = pointIntersectionDD(dC, d, "M", "below right");
          DD = pointIntersectionDD(dD, d, "N", "above left");
          lC = arrondi(longueur(CC, A) * k, 1);
          lD = arrondi(longueur(DD, A) * k, 1);
          cB = codageAngleDroit(A, B, BB);
          cC = codageAngleDroit(C, CC, B);
          cD = codageAngleDroit(D, DD, B);
          objets_correction.push(s1,
            s2,
            dC,
            dD,
            dB,
            cB,
            cC,
            cD,
            d,
            tracePoint(A, B, C, D, E, CC, DD),
            labelPoint(A, B, C, D, E, CC, DD),
            afficheCoteSegment(
              segment(A, CC),
              `${tex_nombre(lC)} cm`,
              0.5,
              "red",
              1,
              0.5,
              "red"
            ),
            afficheCoteSegment(
              segment(A, DD),
              `${tex_nombre(lD)} cm`,
              -0.5,
              "red",
              1,
              -0.5,
              "red"
            )
          );
          objets_enonce.push(
            tracePoint(A, B, C, D),
            labelPoint(A, B, C, D),
            d,
          );
          if (sortie_html) enonce = num_alpha(0) + ` Reproduire la figure ci-dessous.<br>`;
          else enonce = num_alpha(0) + ` Utiliser un crayon à papier afin de pouvoir gommer si besoin.<br>`;
          enonce +=
            num_alpha(1) +
            ` Tracer la droite perpendiculaire à $(AB)$ passant par $B$.<br>`;
          enonce +=
            num_alpha(2) +
            ` Tracer la droite perpendiculaire à $(AB)$ passant par $C$ et nommer $M$ le point d'intersection de cette droite avec la droite $(AB)$.<br>`;
          enonce +=
            num_alpha(3) +
            ` Tracer la droite perpendiculaire à $(AB)$ passant par $D$ et nommer $N$ le point d'intersection de cette droite avec la droite $(AB)$.<br>`;
          enonce +=
            num_alpha(4) +
            ` Mesurer ensuite les distances $AM$ et $AN$.<br> Pour l'auto-correction comparer ces mesures avec celles données dans la correction<br>`;
          correction = `<br>$AM \\approx ${tex_nombre(
            lC
          )}$ cm et $AN \\approx ${tex_nombre(lD)}$ cm.<br>`;
          correction += `Pour la perpendiculaire en $B$, contrôle la position du point $E$.<br>`;
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, CC.y, DD.y) + 1)
          anim.recadre(Xmin - 3, Ymax)
          anim.pointsCreer(A,B,C,D)
          anim.regleDroite(A,B)
          anim.perpendiculaireRegleEquerre2points3epoint(A,B,B)
          anim.perpendiculaireRegleEquerre2points3epoint(A,B,C)
          anim.perpendiculaireRegleEquerre2points3epoint(A,B,D)
           break;
        case 2:
          A = point(2, 0, "A", 'below left');
          B = point(12, randint(-4, 4, 0), "B");
          d = droite(A, B);
          d.isVisible = true;
          C = point(0, randint(3, 4), "C", 'above');
          D = point(randint(7, 8), randint(-7, -6), "D", 'below right');
          E = point(randint(4, 5), randint(5, 6), "E", 'below right');
          F = point(2, -3, "F", "left");

          dE = droiteParPointEtParallele(E, d);
          dC = droiteParPointEtParallele(C, d);
          dD = droiteParPointEtParallele(D, d);
          p = droite(A, F);
          p.isVisible = true;
          CC = pointIntersectionDD(dC, p, 'M', 'above left');
          DD = pointIntersectionDD(dD, p, 'N', 'above left');
          EE = pointIntersectionDD(dE, p, 'O', 'above left');
          lC = arrondi(longueur(CC, A) * k, 1);
          lD = arrondi(longueur(DD, A) * k, 1);
          lE = arrondi(longueur(EE, A) * k, 1);
          objets_correction.push(dC, dD, dE, d, p, tracePoint(A, B, C, D, E, F), labelPoint(A, B, C, D, E, F, CC, DD, EE), afficheCoteSegment(segment(A, CC), `${tex_nombre(lC)} cm`, .2, 'red', 1, 0.5, 'red'), afficheCoteSegment(segment(DD, A), `${tex_nombre(lD)} cm`, -0.2, 'green', 1, -0.5, 'green'), afficheCoteSegment(segment(A, EE), `${tex_nombre(lE)} cm`, -0.2, 'blue', 1, -0.5, 'blue'))
          objets_enonce.push(tracePoint(A, B, C, D, E, F), labelPoint(A, B, C, D, E, F), d, p);

          if (sortie_html) enonce = num_alpha(0) + ` Reproduire la figure ci-dessous.<br>`;
          else enonce = num_alpha(0) + ` Utiliser un crayon à papier afin de pouvoir gommer si besoin.<br>`;
          enonce += num_alpha(1) + ` Tracer la droite parallèle à $(AB)$ passant par $C$ et nommer $M$, le point d'intersection de cette droite avec la droite $(AF)$.<br>`;
          enonce += num_alpha(2) + ` Tracer la droite parallèle à $(AB)$ passant par $D$ et nommer $N$, le point d'intersection de cette droite avec la droite $(AF)$.<br>`;
          enonce += num_alpha(3) + ` Tracer la droite parallèle à $(AB)$ passant par $E$ et nommer $O$, le point d'intersection de cette droite avec la droite $(AF)$.<br>`;
          enonce += num_alpha(4) + ` Mesurer les distances $AM$, $AN$ et $AO$. Pour l'auto-correction, comparer ces mesures avec celles données par  l'ordinateur dans la correction.<br>`;

          correction = `<br>$AM \\approx ${tex_nombre(
            lC
          )}$ cm, $AN \\approx ${tex_nombre(
            lD
          )}$ cm et $AO \\approx${tex_nombre(
            lE
          )}$ cm.<br>`;
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, F.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, F.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, F.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, F.y, EE.y, CC.y, DD.y) + 1)
          anim.recadre(Xmin - 3, Ymax)
          anim.pointsCreer(A,B,C,D,E)
          anim.regleDroite(A,B)
          anim.paralleleRegleEquerre2points3epoint(A,B,C)
          anim.paralleleRegleEquerre2points3epoint(A,B,D)
          anim.paralleleRegleEquerre2points3epoint(A,B,E)
       
          break;
        case 3:
          A = point(0, 0, "A", "above left");
          B = point(10, randint(-4, 4, [-1, 0, 1]), "B", "above right");
          d = droite(A, B);
          d.isVisible = true;
          C = point(randint(2, 3), randint(3, 4), "C", "above left");
          D = point(randint(7, 8), randint(-7, -6), "D");
          dB = droiteParPointEtPerpendiculaire(B, d);
          xE = 11;
          E = pointSurDroite(dB, 11, "E", "left");
          while (!Number.isInteger(E.y)) {
            xE++;
            E = pointSurDroite(dB, xE, "E", "left");
          }
          F = point(E.x, B.y);
          dE = droiteParPointEtParallele(E, d);
          dD = droiteParPointEtParallele(D, d);
          dC = droiteParPointEtPerpendiculaire(C, d)
          BB = rotation(A, B, 90);
          CC = pointIntersectionDD(dC, d, "M", "below right");
          DD = pointIntersectionDD(dD, dB, "N", "above left");
          EE = pointIntersectionDD(dC, dE, 'O', 'above left');
          FF = pointIntersectionDD(dD, dC)

          lC = arrondi(longueur(CC, A) * k, 1);
          lD = arrondi(longueur(DD, A) * k, 1);
          lE = arrondi(longueur(EE, A) * k, 1);
          cB = codageAngleDroit(A, B, BB);
          cC = codageAngleDroit(C, CC, B);
          cD = codageAngleDroit(D, DD, B, 'red');
          cE = codageAngleDroit(B, E, EE, 'red')
          cF = codageAngleDroit(C, EE, E, 'red')
          cG = codageAngleDroit(C, FF, D, 'red')

          objets_correction.push(dC, dD, dB, dE, cB, cC, cD, cE, cF, cG, d, tracePoint(A, B, C, D, E, CC, DD, EE), labelPoint(A, B, C, D, E, CC, DD, EE), afficheCoteSegment(
            segment(A, CC),
            `${tex_nombre(lC)} cm`,
            0.5,
            "red",
            1,
            0.5,
            "red"
          ),
            afficheCoteSegment(
              segment(A, DD),
              `${tex_nombre(lD)} cm`,
              0,
              "blue",
              1,
              -0.5,
              "blue"
            ),
            afficheCoteSegment(
              segment(A, EE),
              `${tex_nombre(lE)} cm`,
              0,
              "green",
              1,
              -0.5,
              "green"
            ));
          objets_enonce.push(tracePoint(A, B, C, D, E), labelPoint(A, B, C, D, E), d);
          if (sortie_html) enonce = num_alpha(0) + ` Reproduire la figure ci-dessous.<br>`;
          else enonce = num_alpha(0) + ` Utiliser un crayon à papier afin de pouvoir gommer si besoin.<br>`;
          enonce += num_alpha(1) + ` Tracer la droite perpendiculaire à $(AB)$ passant par $B$.<br>`;
          enonce += num_alpha(2) + ` Tracer la droite perpendiculaire à $(AB)$ passant par $C$ et nomme $M$, le point d'intersection de cette droite avec la droite $(AB)$.<br>`
          enonce += num_alpha(3) + ` Tracer la droite parallèle à $(AB)$ passant par $D$ et nomme $N$, le point d'intersection de cette droite avec la droite $(BE)$.<br>`;
          enonce += num_alpha(4) + ` Tracer la droite parallèle à $(AB)$ passant par $E$ et nomme $O$, le point d'intersection de cette droite avec la droite $(CM)$.<br>`
          enonce += num_alpha(5) + ` Mesurer les distances $AM$, $AN$ et $AO$. Pour l'auto-correction, comparer ces mesures avec celles données par  l'ordinateur dans la correction.<br>`;

          correction = `<br>$AM \\approx ${tex_nombre(
            lC
          )}$ cm, $AN \\approx ${tex_nombre(
            lD
          )}$ cm et $AO \\approx${tex_nombre(
            lE
          )}$ cm.<br>`;
          correction += `Les angle droits en rouge se justifient par la propriété :<br> ${texte_en_couleur(`Si deux droites sont parallèles, alors toute droite perpendiculaire à l'une est aussi perpendiculaire à l'autre`, 'red')}.<br>`
          correction += `Vérifier les angles droits à l'équerre.<br>`
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, F.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, F.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, F.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, F.y, EE.y, CC.y, DD.y) + 1)
          anim.recadre(Xmin - 3, Ymax)
          anim.pointsCreer(A,B,C,D,E)
          anim.regleDroite(A,B)
         anim.perpendiculaireRegleEquerre2points3epoint(A,B,B)
          anim.perpendiculaireRegleEquerre2points3epoint(A,B,C)
          anim.paralleleRegleEquerre2points3epoint(A,B,D)
          anim.paralleleRegleEquerre2points3epoint(A,B,E)

          break
      }
      if (this.sup < 3) g = grille(Xmin, Ymin, Xmax, Ymax, "gray", 0.7);
      else g = "";
      if (this.sup == 2) {
        sc = 0.8;
        carreaux = seyes(Xmin, Ymin, Xmax, Ymax);
      } else {
        sc = 0.5;
        carreaux = "";
      }
      objets_enonce.push(g, carreaux)
      objets_correction.push(g, carreaux)

      enonce += mathalea2d(
        {
          xmin: Xmin,
          ymin: Ymin,
          xmax: Xmax,
          ymax: Ymax,
          pixelsParCm: ppc,
          scale: sc,
        },
        objets_enonce
      );
      correction += mathalea2d(
        {
          xmin: Xmin,
          ymin: Ymin,
          xmax: Xmax,
          ymax: Ymax,
          pixelsParCm: ppc,
          scale: sc,
        },
        objets_correction
      );
      correction += anim.htmlBouton(numero_de_l_exercice, i)
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
  this.besoin_formulaire_numerique = [
    "Type de cahier",
    3,
    `1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`,
  ];
}


