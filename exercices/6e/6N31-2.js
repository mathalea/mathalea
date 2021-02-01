import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,shuffle,combinaison_listes_sans_changer_ordre,tex_nombre,mise_en_evidence,tab_C_L} from "/modules/outils.js"
/** 
 * * Ordre de grandeur d'une opération entre décimaux
 * * 6N31-2
 * @author Sébastien Lozano
 */

export default function Ordre_de_grandeur_operations_decimaux() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.beta = false;
  if (this.beta) {
    this.nb_questions = 1;
  } else {
    this.nb_questions = 1;
  };

  this.titre = "Ordre de grandeur et opérations sur les décimaux";
  this.consigne = `Pour chaque opération proposée dans la première colonne, cocher la case correspondant à l'ordre de grandeur du résultat.`;

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? this.spacing = 2.5 : this.spacing = 1.5;
  sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
    if (this.beta) {
      type_de_questions_disponibles = [0];
    } else {
      //type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      type_de_questions_disponibles = shuffle([0]);

    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

      let ligne_entete = ['\\text{Opération}', `\\phantom{000}` + tex_nombre('1') + `\\phantom{000}`, `\\phantom{00}` + tex_nombre('10') + `\\phantom{00}`, `\\phantom{00}` + tex_nombre('100') + `\\phantom{00}`, `\\phantom{0}` + tex_nombre('1000') + `\\phantom{0}`, tex_nombre('10000'), tex_nombre('100000')];
      let ligne_entete_corr = ['\\text{Opération}', `\\phantom{000}` + tex_nombre('1') + `\\phantom{000}`, `\\phantom{00}` + tex_nombre('10') + `\\phantom{00}`, `\\phantom{00}` + tex_nombre('100') + `\\phantom{00}`, `\\phantom{0}` + tex_nombre('1000') + `\\phantom{0}`, tex_nombre('10000'), tex_nombre('100000')];

      let m = randint(1, 9, [4, 5, 6]),
        c1 = randint(1, 9),
        c2 = randint(1, 9),
        c3 = randint(1, 9, [4, 5, 6]),
        c4 = randint(1, 4),
        d = randint(1, 9),
        d1 = randint(1, 9),
        d2 = randint(1, 9),
        d3 = randint(1, 9),
        u = randint(1, 9),
        u1 = randint(1, 9),
        u2 = randint(1, 9),
        u3 = randint(1, 9);

      let cbis, d1bis;
      do {
        cbis = randint(2, 9);
        d1bis = randint(2, 9);
      } while (cbis * d1bis > 3 && cbis * d1bis < 7);

      let div_aleatoire_ope_3 = choice([10, 100]);
      let div_aleatoire_ope_5 = choice([1, 10, 100, 1000]);
      let mult_aleatoire_ope_4 = choice([0.1, 0.01, 0.001]);

      // une fonction pour ordre de grandeur en fonction de ... opération 1
      function myOrdreOpe1(c, d) {
        if (c * d >= 60) {
          return ['', '', '', '', '', mise_en_evidence(`X`)];
        } else {
          return ['', '', '', '', mise_en_evidence(`X`), ''];
        };
      };

      // une fonction pour ordre de grandeur en fonction de ... opération 2
      function myOrdreOpe2(c1, c2) {
        if (c1 + c2 / 10 >= 600) {
          return ['', '', '', mise_en_evidence(`X`), '', ''];
        } else {
          return ['', '', mise_en_evidence(`X`), '', '', ''];
        };
      };

      // une fonction pour ordre de grandeur en fonction de ... opération 3
      function myOrdreOpe3(n) {
        if (n >= 7) {
          return ['', '', '', mise_en_evidence(`X`), '', ''];
        } else {
          return ['', '', mise_en_evidence(`X`), '', '', ''];
        };
      };

      // une fonction pour ordre de grandeur en fonction de ... opération 4
      function myOrdreOpe4(d, n) {
        let sortie;
        switch (d) {
          case 0.1:
            if (n >= 7) {
              sortie = ['', '', '', mise_en_evidence(`X`), '', ''];
            } else {
              sortie = ['', '', mise_en_evidence(`X`), '', '', ''];
            };
            break;
          case 0.01:
            if (n >= 7) {
              sortie = ['', '', mise_en_evidence(`X`), '', '', ''];
            } else {
              sortie = ['', mise_en_evidence(`X`), '', '', '', ''];
            };
            break;
          case 0.001:
            if (n >= 7) {
              sortie = ['', mise_en_evidence(`X`), '', '', '', ''];
            } else {
              sortie = [mise_en_evidence(`X`), '', '', '', '', ''];
            };
            break;
        }
        return sortie;
      };

      // une fonction pour ordre de grandeur en fonction de ... opération 5
      function myOrdreOpe5(mult) {
        let sortie;
        switch (mult) {
          case 1:
            return sortie = ['', '', '', mise_en_evidence(`X`), '', ''];
            break;
          case 10:
            return sortie = ['', '', mise_en_evidence(`X`), '', '', ''];
            break;
          case 100:
            return sortie = ['', mise_en_evidence(`X`), '', '', '', ''];
            break;
          case 1000:
            return sortie = [mise_en_evidence(`X`), '', '', '', '', ''];
            break;
        };
        return sortie;
      };

      let situations = [
        {
          operation: `${cbis * 100 + d * 10 + u * 1}\\times ${d1bis * 10 + u1 * 1}`,
          operation_corr: `${cbis * 100 + d * 10 + u * 1}\\times ${d1bis * 10 + u1 * 1} \\simeq  ${(cbis * 100)}\\times ${(d1bis * 10)} \\text{ soit } ${tex_nombre((cbis * 100) * (d1bis * 10))}`,
          operation_coche: myOrdreOpe1(cbis, d1bis),
        },
        {
          operation: `${tex_nombre((c2 * 100 + d2 * 10 + u1 * 1) / 10)}+${c1 * 100 + d1 * 10 + u1 * 1}`,
          operation_corr: `${tex_nombre((c2 * 100 + d2 * 10 + u1 * 1) / 10)}+${c1 * 100 + d1 * 10 + u1 * 1} \\simeq ${c2 * 100 / 10}+${c1 * 100} \\text{ soit } ${c2 * 100 / 10 + c1 * 100}`,
          operation_coche: myOrdreOpe2(c1 * 100, c2 * 100),
        },
        {
          operation: `${c3 * 100 + d3 * 10 + u3 * 1}-${tex_nombre((c2 * 100 + d2 * 10 + u2 * 1) / div_aleatoire_ope_3)}`,
          operation_corr: `${c3 * 100 + d3 * 10 + u3 * 1}-${tex_nombre((c2 * 100 + d2 * 10 + u2 * 1) / div_aleatoire_ope_3)} \\simeq ${c3 * 100 + d3 * 10}-${tex_nombre((c2 * 100) / div_aleatoire_ope_3)} \\text{ soit } ${c3 * 100 + d3 * 10 - (c2 * 100) / div_aleatoire_ope_3}`,
          operation_coche: myOrdreOpe3(c3),
        },
        {
          operation: `${tex_nombre(m * 1000 + c3 * 100 + d2 * 10 + u1 * 1)}\\times ${tex_nombre(mult_aleatoire_ope_4)}`,
          operation_corr: `${tex_nombre(m * 1000 + c3 * 100 + d2 * 10 + u1 * 1)}\\times ${tex_nombre(mult_aleatoire_ope_4)} \\simeq ${tex_nombre(m * 1000)}\\times ${tex_nombre(mult_aleatoire_ope_4)} \\text{ soit } ${tex_nombre(m * 1000 * mult_aleatoire_ope_4)}`,
          operation_coche: myOrdreOpe4(mult_aleatoire_ope_4, m),
        },
        {
          operation: `${tex_nombre((m * 1000 + c4 * 100 + d3 * 10 + u * 1) / div_aleatoire_ope_5)}\\div ${m}`,
          operation_corr: `${tex_nombre((m * 1000 + c4 * 100 + d3 * 10 + u * 1) / div_aleatoire_ope_5)}\\div ${m} \\simeq ${tex_nombre((m * 1000) / div_aleatoire_ope_5)}\\div ${m} \\text{ soit } ${tex_nombre((m * 1000) / div_aleatoire_ope_5 / m)}`,
          operation_coche: myOrdreOpe5(div_aleatoire_ope_5),
        },

      ];

      situations = shuffle(situations);

      let enonces = [];
      for (let k = 0; k < 1; k++) {
        enonces.push({
          enonce: `
          ${tab_C_L(ligne_entete, [situations[0].operation, situations[1].operation, situations[2].operation, situations[3].operation, situations[4].operation],
            [
              '', '', '', '', '', '',
              '', '', '', '', '', '',
              '', '', '', '', '', '',
              '', '', '', '', '', '',
              '', '', '', '', '', '',
            ]
          )}
          `,
          question: ``,
          correction: `
          Commençons par calculer un ordre de grandeur du résultat de chaque opération dans la première colonne du tableau.
          <br>
          ${tab_C_L(ligne_entete_corr, [situations[0].operation_corr, situations[1].operation_corr, situations[2].operation_corr, situations[3].operation_corr, situations[4].operation_corr,],
            [
              situations[0].operation_coche[0], situations[0].operation_coche[1], situations[0].operation_coche[2], situations[0].operation_coche[3], situations[0].operation_coche[4], situations[0].operation_coche[5],
              situations[1].operation_coche[0], situations[1].operation_coche[1], situations[1].operation_coche[2], situations[1].operation_coche[3], situations[1].operation_coche[4], situations[1].operation_coche[5],
              situations[2].operation_coche[0], situations[2].operation_coche[1], situations[2].operation_coche[2], situations[2].operation_coche[3], situations[2].operation_coche[4], situations[2].operation_coche[5],
              situations[3].operation_coche[0], situations[3].operation_coche[1], situations[3].operation_coche[2], situations[3].operation_coche[3], situations[3].operation_coche[4], situations[3].operation_coche[5],
              situations[4].operation_coche[0], situations[4].operation_coche[1], situations[4].operation_coche[2], situations[4].operation_coche[3], situations[4].operation_coche[4], situations[4].operation_coche[5],
            ]
          )}				
          `
        });
      };

      // autant de case que d'elements dans le tableau des situations
      switch (liste_type_de_questions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte += `             `
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          break;
      };

      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);

  }
};
