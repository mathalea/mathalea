import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,combinaison_listes,calcul,tex_nombrec,creerNomDePolygone,tex_nombre} from "/modules/outils.js"
/**
 * À partir de la donnée des 3 longueurs d'un triangle, déterminer si il est rectangle ou pas.
 * @Auteur Rémi Angot
 * 4G21
 */
export default function Reciproque_Pythagore() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Déterminer si un triangle est rectangle ou pas.";
  this.consigne = "";
  this.nb_questions = 3;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 3;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1);

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions = []
    if (this.sup == 1) {
      liste_type_de_questions = combinaison_listes(["rectangle"], this.nb_questions);
    }
    if (this.sup == 2) {
      liste_type_de_questions = combinaison_listes(["pas_rectangle"], this.nb_questions);
    }
    if (this.sup == 3) {
      liste_type_de_questions = combinaison_listes(["rectangle", "pas_rectangle"], this.nb_questions);
    }
    let liste_triplets_pythagoriciens = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [7, 24, 25],
      [8, 15, 17],
      [9, 12, 15],
      [9, 40, 41],
      [10, 24, 26],
      [11, 60, 61],
      [12, 16, 20],
      [12, 35, 37],
      [13, 84, 85],
      [14, 48, 50],
      [15, 20, 25],
      [15, 36, 39],
      [16, 30, 34],
      [16, 63, 65],
      [18, 24, 30],
      [18, 80, 82],
      [20, 21, 29],
      [20, 48, 52],
      [21, 28, 35],
      [21, 72, 75],
      [24, 32, 40],
      [24, 45, 51],
      [24, 70, 74],
      [25, 60, 65],
      [27, 36, 45],
      [28, 45, 53],
      [28, 96, 100],
      [30, 40, 50],
      [30, 72, 78],
      [32, 60, 68],
      [33, 44, 55],
      [33, 56, 65],
      [35, 84, 91],
      [36, 48, 60],
      [36, 77, 85],
      [39, 52, 65],
      [39, 80, 89],
      [40, 42, 58],
      [40, 75, 85],
      [42, 56, 70],
      [45, 60, 75],
      [48, 55, 73],
      [48, 64, 80],
      [51, 68, 85],
      [54, 72, 90],
      [57, 76, 95],
      [60, 63, 87],
      [60, 80, 100],
      [65, 72, 97],
    ];
    let liste_noms_triangles = []; // on mémorise les noms des triangles pour ne pas les redonner
    for (
      let i = 0,
      texte,
      texte_corr,
      a,
      b,
      c,A,B,C,
      nom_triangle,
      triplet,
      ordre_des_cotes,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      nom_triangle = creerNomDePolygone(3, liste_noms_triangles);
      liste_noms_triangles.push(nom_triangle);
      A = nom_triangle[0];
      B = nom_triangle[1];
      C = nom_triangle[2];
      triplet = choice(liste_triplets_pythagoriciens);
      enleve_element(liste_triplets_pythagoriciens, triplet); // Supprime le triplet pour les prochaines questions
      a = triplet[0];
      b = triplet[1];
      c = triplet[2];
      if (liste_type_de_questions[i] == "pas_rectangle") {
        c = randint(Math.max(c - 3, b + 1), c + 3) // on modifie c en faisant attention à ce qu'il reste plus grand que b
        while (a ** 2 + b ** 2 == c ** 2) {
          // si par hasard (est-ce possible ?) on retombe sur un triplet pythagoricien on change les valeurs
          c = randint(Math.max(c - 3, b + 1), c + 3) // on modifie c en faisant attention à ce qu'il reste plus grand que b
        }
      }
      if (a > 9 && choice([true, true, true, false])) {
        //le plus souvent on utilise des décimaux
        a = calcul(a / 10);
        b = calcul(b / 10);
        c = calcul(c / 10);
      }
      ordre_des_cotes = randint(1, 3);
      switch (ordre_des_cotes) {
        case 1:
          texte = `Le triangle $${nom_triangle}$ est tel que $${A + B
            }=${tex_nombre(c)}$ cm, $${A + C}=${tex_nombre(b)}$ cm et $${B + C
            }=${tex_nombre(a)}$ cm.`;
          break;
        case 2:
          texte = `Le triangle $${nom_triangle}$ est tel que  $${B + C
            }=${tex_nombre(a)}$ cm, $${A + C}=${tex_nombre(b)}$ cm et $${A + B
            }=${tex_nombre(c)}$ cm.`;
          break;
        case 3:
          texte = `Le triangle $${nom_triangle}$ est tel que $${A + C
            }=${tex_nombre(b)}$ cm, $${A + B}=${tex_nombre(c)}$ cm,  et $${B + C
            }=${tex_nombre(a)}$ cm.`;
          break;
      }
      texte += `<br>Ce triangle est-il rectangle ?`;
      texte_corr = `Dans le triangle $${nom_triangle}$, le plus grand côté est $[${A + B
        }]$.`;
      texte_corr += `<br>$${A + B}^2=${tex_nombre(c)}^2=${tex_nombrec(
        c ** 2
      )}$`;
      texte_corr += `<br>$${A + C}^2+${B + C}^2=${tex_nombre(b)}^2+${tex_nombre(
        a
      )}^2=${tex_nombrec(b ** 2 + a ** 2)}$`;
      if (liste_type_de_questions[i] == "rectangle") {
        texte_corr += `<br>On constate que $${A + B}^2=${A + C}^2+${B + C
          }^2$, l'égalité de Pythagore est vérifiée donc $${nom_triangle}$ est rectangle en $${C}$.`;
      } else {
        texte_corr += `<br>On constate que $${A + B}^2\\not=${A + C}^2+${B + C
          }^2$, l'égalité de Pythagore n'est pas vérifiée donc $${nom_triangle}$ n'est pas rectangle.`;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Type de questions', 3, "1 : Démontrer qu'un triangle est rectangle\n2 : Démontrer qu'un triangle n'est pas rectangle\n3 : Déterminer si un triangle est rectangle ou pas "];
}

